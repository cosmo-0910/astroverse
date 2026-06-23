import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import UserRegister, Token, UserLogin
from ..security import get_password_hash, verify_password, create_access_token
from ..models import BirthProfile, UserPrivacySettings, User, Profile
from ..algorithms.western import get_western_details
from ..algorithms.vedic import get_vedic_details
from ..algorithms.chinese import get_chinese_details

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
        
    # Generate unique user ID
    user_id = str(uuid.uuid4())
    
    # Hash password
    hashed_pwd = get_password_hash(data.password)
    
    # Store user core info
    new_user = User(
        id=user_id,
        email=data.email,
        hashed_password=hashed_pwd,
        role="user",
        is_verified=True,  # Mocked success
        created_at=datetime.utcnow()
    )
    
    # Construct BirthProfile model
    birth_profile = BirthProfile(
        name=data.name,
        date_of_birth=data.date_of_birth,
        time_of_birth=data.time_of_birth,
        place_of_birth=data.place_of_birth,
        latitude=data.latitude,
        longitude=data.longitude,
        timezone=data.timezone
    )
    
    # Pre-generate astrology details using matching algorithms
    try:
        w_details = get_western_details(birth_profile)
        v_details = get_vedic_details(birth_profile)
        c_details = get_chinese_details(birth_profile)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Astrology chart computation failed: {str(e)}"
        )
        
    # Store profile info
    import json
    birth_profile_json = json.loads(birth_profile.model_dump_json())
    
    new_profile = Profile(
        id=user_id,
        email=data.email,
        name=data.name,
        gender=data.gender,
        bio="",
        interests=data.interests,
        relationship_modes=data.relationship_modes.value,
        photos=[],
        voice_introduction_url=None,
        birth_profile=birth_profile_json,
        astrology_chart={
            "western": json.loads(w_details.model_dump_json()),
            "vedic": json.loads(v_details.model_dump_json()),
            "chinese": json.loads(c_details.model_dump_json())
        },
        hide_birth_info=True
    )
    
    # Insert in DB
    db.add(new_user)
    db.add(new_profile)
    db.commit()
    
    return {"message": "User registered successfully", "user_id": user_id}

@router.post("/token", response_model=Token)
def login_oauth2(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login_json(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
        
    access_token = create_access_token(data={"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
