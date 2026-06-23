import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
from typing import List, Optional

from ..database import get_db
from ..schemas import ForumPostCreate, ForumCommentCreate
from ..security import get_current_user
from ..models import User, Profile, ForumPost, ForumComment

router = APIRouter(prefix="/api/forums", tags=["Forums"])

VALID_CATEGORIES = [
    "Zodiac Signs", "Relationships", "Synastry", 
    "Spirituality", "Birth Charts", "Retrogrades", 
    "General Discussions"
]

@router.get("/posts")
def get_posts(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(ForumPost)
    if category:
        if category not in VALID_CATEGORIES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid category. Choose from: {', '.join(VALID_CATEGORIES)}"
            )
        query = query.filter(ForumPost.category == category)
        
    posts = query.order_by(ForumPost.timestamp.desc()).all()
    results = []
    for p in posts:
        results.append({
            "id": p.id,
            "author_id": p.author_id,
            "author_name": p.author_name,
            "category": p.category,
            "title": p.title,
            "content": p.content,
            "likes": p.likes or [],
            "is_pinned": p.is_pinned,
            "is_locked": p.is_locked,
            "timestamp": p.timestamp.isoformat() if p.timestamp else None
        })
            
    return results

@router.post("/posts", status_code=status.HTTP_201_CREATED)
def create_post(
    data: ForumPostCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if data.category not in VALID_CATEGORIES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid category. Choose from: {', '.join(VALID_CATEGORIES)}"
        )
        
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    author_name = profile.name if profile else "Anonymous Astrologer"
    
    post = ForumPost(
        author_id=current_user.id,
        author_name=author_name,
        category=data.category,
        title=data.title,
        content=data.content,
        likes=[],
        timestamp=datetime.datetime.utcnow()
    )
    
    db.add(post)
    db.commit()
    db.refresh(post)
    
    return {
        "id": post.id,
        "author_id": post.author_id,
        "author_name": post.author_name,
        "category": post.category,
        "title": post.title,
        "content": post.content,
        "likes": post.likes,
        "timestamp": post.timestamp.isoformat()
    }

@router.post("/posts/{post_id}/like")
def toggle_like_post(
    post_id: int, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    likes = list(post.likes or [])
    if user_id in likes:
        likes.remove(user_id)
        liked = False
    else:
        likes.append(user_id)
        liked = True
        
    post.likes = likes
    flag_modified(post, "likes")
    db.commit()
    
    return {"liked": liked, "likes_count": len(likes)}

@router.get("/posts/{post_id}/comments")
def get_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(ForumComment).filter(ForumComment.post_id == post_id).order_by(ForumComment.timestamp.asc()).all()
    results = []
    for c in comments:
        results.append({
            "id": c.id,
            "post_id": c.post_id,
            "author_id": c.author_id,
            "author_name": c.author_name,
            "content": c.content,
            "timestamp": c.timestamp.isoformat() if c.timestamp else None
        })
    return results

@router.post("/posts/{post_id}/comments", status_code=status.HTTP_201_CREATED)
def create_comment(
    post_id: int, 
    data: ForumCommentCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(ForumPost).filter(ForumPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    author_name = profile.name if profile else "Anonymous Astrologer"
    
    comment = ForumComment(
        post_id=post_id,
        author_id=current_user.id,
        author_name=author_name,
        content=data.content,
        timestamp=datetime.datetime.utcnow()
    )
    
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    return {
        "id": comment.id,
        "post_id": comment.post_id,
        "author_id": comment.author_id,
        "author_name": comment.author_name,
        "content": comment.content,
        "timestamp": comment.timestamp.isoformat()
    }
