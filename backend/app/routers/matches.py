import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List

from ..database import get_db
from ..schemas import MatchSwipe
from ..security import get_current_user
from ..models import User, Profile, Match, Notification, BirthProfile, RelationshipMode
from ..algorithms.matcher import calculate_aggregate_compatibility

router = APIRouter(prefix="/api/matches", tags=["Matches"])

@router.get("/discover")
def discover_matches(
    mode: str = "BOTH",  # DATING, FRIENDSHIP, BOTH
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    current_profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    if not current_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Current user profile not found"
        )
        
    birth_a = BirthProfile.model_validate(current_profile.birth_profile)
    
    # Query swiped records
    swiped_records = db.query(Match).filter(
        or_(Match.user_a == current_user.id, Match.user_b == current_user.id)
    ).all()
    
    swiped_user_ids = set()
    for rec in swiped_records:
        if rec.user_a == current_user.id:
            if rec.status_a in ["liked", "disliked"]:
                swiped_user_ids.add(rec.user_b)
        else:
            if rec.status_b in ["liked", "disliked"]:
                swiped_user_ids.add(rec.user_a)
                
    # Query other profiles
    query = db.query(Profile).filter(Profile.id != current_user.id)
    if swiped_user_ids:
        query = query.filter(~Profile.id.in_(list(swiped_user_ids)))
        
    # Filter by mode if applicable
    if mode in ["DATING", "FRIENDSHIP"]:
        query = query.filter(or_(Profile.relationship_modes == mode, Profile.relationship_modes == "BOTH"))
        
    other_profiles = query.limit(100).all()
    
    # Compute compatibility and sort
    results = []
    for op in other_profiles:
        try:
            birth_b = BirthProfile.model_validate(op.birth_profile)
            rel_mode = RelationshipMode(mode)
            compat = calculate_aggregate_compatibility(birth_a, birth_b, rel_mode)
            
            # Form response object respecting privacy settings
            hide_birth = op.hide_birth_info
            
            profile_summary = {
                "user_id": op.id,
                "name": op.name,
                "gender": op.gender,
                "bio": op.bio or "",
                "interests": op.interests or [],
                "photos": op.photos or [],
                "voice_introduction_url": op.voice_introduction_url,
                "astrology_summary": {
                    "western_sign": op.astrology_chart.get("western", {}).get("sign") if op.astrology_chart else None,
                    "vedic_rashi": op.astrology_chart.get("vedic", {}).get("rashi") if op.astrology_chart else None,
                    "chinese_animal": op.astrology_chart.get("chinese", {}).get("animal") if op.astrology_chart else None,
                }
            }
            if not hide_birth:
                profile_summary["birth_profile"] = op.birth_profile
                
            results.append({
                "profile": profile_summary,
                "compatibility_score": compat.overall_percentage,
                "breakdown": compat.breakdown.model_dump()
            })
        except Exception as e:
            continue
            
    results.sort(key=lambda x: x["compatibility_score"], reverse=True)
    return results

@router.post("/swipe")
def swipe(
    data: MatchSwipe, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    target_id = data.target_user_id
    
    if user_id == target_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot swipe on yourself"
        )
        
    first_id, second_id = sorted([user_id, target_id])
    
    record = db.query(Match).filter(Match.user_a == first_id, Match.user_b == second_id).first()
    
    is_match = False
    
    if not record:
        is_user_a = (user_id == first_id)
        new_record = Match(
            user_a=first_id,
            user_b=second_id,
            status_a="liked" if (is_user_a and data.action == "like") else ("disliked" if (is_user_a and data.action == "dislike") else "pending"),
            status_b="liked" if (not is_user_a and data.action == "like") else ("disliked" if (not is_user_a and data.action == "dislike") else "pending"),
            matched=False,
            updated_at=datetime.datetime.utcnow()
        )
        db.add(new_record)
    else:
        is_user_a = (user_id == first_id)
        if is_user_a:
            record.status_a = data.action + "d"
        else:
            record.status_b = data.action + "d"
            
        record.updated_at = datetime.datetime.utcnow()
        
        if record.status_a == "liked" and record.status_b == "liked":
            record.matched = True
            is_match = True
            
        # Trigger Match Notifications
        if is_match:
            notify_a = Notification(
                user_id=first_id,
                title="It's a Cosmic Match!",
                content="You matched with someone special! Go chat to check your alignment.",
                is_read=False,
                type="match",
                timestamp=datetime.datetime.utcnow()
            )
            notify_b = Notification(
                user_id=second_id,
                title="It's a Cosmic Match!",
                content="You matched with someone special! Go chat to check your alignment.",
                is_read=False,
                type="match",
                timestamp=datetime.datetime.utcnow()
            )
            db.add(notify_a)
            db.add(notify_b)
            
    db.commit()
    
    return {
        "matched": is_match,
        "status": "success"
    }

@router.get("/list")
def get_matches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    
    records = db.query(Match).filter(
        Match.matched == True,
        or_(Match.user_a == user_id, Match.user_b == user_id)
    ).all()
    
    matched_profiles = []
    for rec in records:
        match_id = rec.user_b if rec.user_a == user_id else rec.user_a
        profile = db.query(Profile).filter(Profile.id == match_id).first()
        if profile:
            matched_profiles.append({
                "user_id": profile.id,
                "name": profile.name,
                "photos": profile.photos or [],
                "astrology_summary": {
                    "western_sign": profile.astrology_chart.get("western", {}).get("sign") if profile.astrology_chart else None,
                }
            })
    return matched_profiles
