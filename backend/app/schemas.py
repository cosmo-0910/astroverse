from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, time, datetime
from .models import BirthProfile, RelationshipMode, UserPrivacySettings

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    date_of_birth: date
    time_of_birth: time
    place_of_birth: str
    latitude: float
    longitude: float
    timezone: float
    gender: str
    interests: List[str] = []
    relationship_modes: RelationshipMode = RelationshipMode.BOTH

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    gender: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[List[str]] = None
    relationship_modes: Optional[RelationshipMode] = None
    privacy_settings: Optional[UserPrivacySettings] = None
    photos: Optional[List[str]] = None
    voice_introduction_url: Optional[str] = None

class ProfileResponse(BaseModel):
    user_id: str
    email: str
    name: str
    gender: str
    bio: Optional[str] = None
    interests: List[str] = []
    relationship_modes: RelationshipMode
    privacy_settings: UserPrivacySettings
    photos: List[str] = []
    voice_introduction_url: Optional[str] = None
    birth_profile: BirthProfile

class ForumPostCreate(BaseModel):
    category: str
    title: str
    content: str

class ForumCommentCreate(BaseModel):
    content: str

class ForumReactionCreate(BaseModel):
    reaction_type: str  # like, love, haha, wow, sad, angry

class MessageCreate(BaseModel):
    content: str

class MatchSwipe(BaseModel):
    target_user_id: str
    action: str  # like, dislike
