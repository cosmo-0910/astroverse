import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import get_db
from ..models import DailyHoroscope, User
from ..security import get_current_user
from ..services.ai_service import AIService
from .admin import require_admin_or_moderator

router = APIRouter(prefix="/api/content", tags=["Content Management"])

class HoroscopeUpdate(BaseModel):
    prediction: str
    date: str  # Format: YYYY-MM-DD

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

@router.get("/horoscopes")
def get_daily_horoscopes(date: str = None, db: Session = Depends(get_db)):
    # Default to today's date in UTC if not provided
    if not date:
        date = datetime.datetime.utcnow().strftime("%Y-%m-%d")
        
    # Query database for all horoscopes on the specified date
    records = db.query(DailyHoroscope).filter(DailyHoroscope.date == date).all()
    records_map = {r.sign: r for r in records}
    
    results = []
    
    # Ensure all 12 signs have a horoscope. If missing, generate dynamically
    for sign in ZODIAC_SIGNS:
        if sign in records_map:
            results.append({
                "sign": sign,
                "prediction": records_map[sign].prediction,
                "date": date,
                "created_at": records_map[sign].created_at.isoformat() if records_map[sign].created_at else None
            })
        else:
            # Generate dynamically via Gemini/fallback
            print(f"Generating dynamic horoscope for {sign} on {date}...")
            prediction = AIService.generate_daily_horoscope(sign, date)
            new_record = DailyHoroscope(
                sign=sign,
                prediction=prediction,
                date=date,
                created_at=datetime.datetime.utcnow()
            )
            db.add(new_record)
            db.commit()
            db.refresh(new_record)
            
            results.append({
                "sign": sign,
                "prediction": prediction,
                "date": date,
                "created_at": new_record.created_at.isoformat()
            })
            
    return results

@router.patch("/horoscopes/{sign}")
def update_horoscope(
    sign: str,
    payload: HoroscopeUpdate,
    admin_user: User = Depends(require_admin_or_moderator),
    db: Session = Depends(get_db)
):
    if sign not in ZODIAC_SIGNS:
        raise HTTPException(status_code=400, detail="Invalid zodiac sign name")
        
    # Find existing record
    record = db.query(DailyHoroscope).filter(
        DailyHoroscope.sign == sign,
        DailyHoroscope.date == payload.date
    ).first()
    
    if not record:
        # Create new if it doesn't exist
        record = DailyHoroscope(
            sign=sign,
            prediction=payload.prediction,
            date=payload.date,
            created_at=datetime.datetime.utcnow()
        )
        db.add(record)
    else:
        record.prediction = payload.prediction
        
    db.commit()
    db.refresh(record)
    return {
        "sign": record.sign,
        "prediction": record.prediction,
        "date": record.date,
        "created_at": record.created_at.isoformat()
    }
