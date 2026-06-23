import datetime
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Dict, List
from jose import jwt

from ..database import get_db, SessionLocal
from ..security import SECRET_KEY, ALGORITHM
from ..models import Message, Match, Profile, User

router = APIRouter(prefix="/api/chat", tags=["Chat"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, receiver_id: str):
        if receiver_id in self.active_connections:
            await self.active_connections[receiver_id].send_json(message)

manager = ConnectionManager()

def verify_match(db: Session, user_a: str, user_b: str):
    first_id, second_id = sorted([user_a, user_b])
    match = db.query(Match).filter(
        Match.user_a == first_id, 
        Match.user_b == second_id, 
        Match.matched == True
    ).first()
    if not match:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Users are not matched"
        )

@router.get("/history/{target_user_id}")
def get_chat_history(
    target_user_id: str,
    token: str,
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        current_user_id: str = payload.get("sub")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )

    verify_match(db, current_user_id, target_user_id)
    
    messages = db.query(Message).filter(
        or_(
            (Message.sender == current_user_id) & (Message.receiver == target_user_id),
            (Message.sender == target_user_id) & (Message.receiver == current_user_id)
        )
    ).order_by(Message.timestamp.asc()).all()
    
    results = []
    for m in messages:
        results.append({
            "id": m.id,
            "sender": m.sender,
            "receiver": m.receiver,
            "content": m.content,
            "timestamp": m.timestamp.isoformat() if m.timestamp else None,
            "is_read": m.is_read
        })
            
    return results

@router.websocket("/ws/{token}")
async def websocket_chat_endpoint(websocket: WebSocket, token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    db = SessionLocal()
    try:
        profile = db.query(Profile).filter(Profile.id == user_id).first()
        if not profile:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
    finally:
        db.close()

    await manager.connect(user_id, websocket)
    
    try:
        while True:
            data = await websocket.receive_json()
            
            receiver_id = data.get("receiver_id")
            content = data.get("content")
            
            if not receiver_id or not content:
                continue
                
            db = SessionLocal()
            try:
                # Verify they are matched
                first_id, second_id = sorted([user_id, receiver_id])
                match = db.query(Match).filter(
                    Match.user_a == first_id, 
                    Match.user_b == second_id, 
                    Match.matched == True
                ).first()
                if not match:
                    await websocket.send_json({"error": "Cannot message unmatched users"})
                    continue
                    
                timestamp = datetime.datetime.utcnow()
                msg = Message(
                    sender=user_id,
                    receiver=receiver_id,
                    content=content,
                    timestamp=timestamp,
                    is_read=False
                )
                
                db.add(msg)
                db.commit()
                db.refresh(msg)
                
                msg_doc = {
                    "id": msg.id,
                    "sender": user_id,
                    "receiver": receiver_id,
                    "content": content,
                    "timestamp": timestamp.isoformat(),
                    "is_read": False
                }
                
                await manager.send_personal_message(msg_doc, receiver_id)
                await websocket.send_json(msg_doc)
            finally:
                db.close()
            
    except WebSocketDisconnect:
        manager.disconnect(user_id)
    except Exception as e:
        manager.disconnect(user_id)
