import os
import shutil
import uuid
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from ..database import get_db
from ..schemas import ProfileUpdate
from ..security import get_current_user
from ..models import User, Profile

router = APIRouter(prefix="/api/profile", tags=["Profiles"])

# Base directory for local media storage
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile

@router.patch("/me")
def update_profile(
    data: ProfileUpdate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
        
    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update fields provided"
        )
        
    for key, value in update_data.items():
        if value is not None:
            setattr(profile, key, value)
            
    # Mark mutable fields as modified if changed
    if "interests" in update_data:
        flag_modified(profile, "interests")
    if "photos" in update_data:
        flag_modified(profile, "photos")
    if "privacy_settings" in update_data:
        # privacy_settings is part of hide_birth_info or other fields.
        # Let's map privacy_settings.hide_birth_info directly:
        hide = update_data["privacy_settings"].get("hide_birth_info")
        if hide is not None:
            profile.hide_birth_info = hide
            
    db.commit()
    db.refresh(profile)
    return profile

@router.post("/upload")
def upload_file(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
        
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in [".jpg", ".jpeg", ".png", ".webp", ".mp3", ".wav", ".m4a"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file extension. Only images and audio allowed."
        )
        
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    dest_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        with open(dest_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save file: {str(e)}"
        )
        
    file_url = f"/static/uploads/{unique_filename}"
    
    # Auto-add file url to profile
    if file_ext in [".mp3", ".wav", ".m4a"]:
        profile.voice_introduction_url = file_url
    else:
        # Create a new list copy to trigger SQLAlchemy modification detection
        new_photos = list(profile.photos or [])
        new_photos.append(file_url)
        profile.photos = new_photos
        flag_modified(profile, "photos")
        
    db.commit()
    return {
        "filename": unique_filename,
        "url": file_url,
        "status": "success"
    }
