from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, time
from enum import Enum

class RelationshipMode(str, Enum):
    FRIENDSHIP = "FRIENDSHIP"
    DATING = "DATING"
    BOTH = "BOTH"

class BirthProfile(BaseModel):
    name: str = Field(..., description="User's name")
    date_of_birth: date = Field(..., description="Date of birth (YYYY-MM-DD)")
    time_of_birth: time = Field(..., description="Time of birth (HH:MM)")
    place_of_birth: str = Field(..., description="City and country of birth")
    latitude: float = Field(..., description="Latitude of birth location")
    longitude: float = Field(..., description="Longitude of birth location")
    timezone: float = Field(..., description="Timezone offset in hours relative to UTC (e.g. +1.0 or -5.0)")

class UserPrivacySettings(BaseModel):
    hide_birth_info: bool = True

class UserProfile(BaseModel):
    name: str
    gender: str
    bio: Optional[str] = None
    interests: List[str] = []
    relationship_modes: RelationshipMode = RelationshipMode.BOTH
    privacy_settings: UserPrivacySettings = UserPrivacySettings()
    photos: List[str] = []
    voice_introduction_url: Optional[str] = None

class WesternZodiacDetails(BaseModel):
    sign: str
    element: str  # Fire, Earth, Air, Water
    modality: str  # Cardinal, Fixed, Mutable
    planetary_degrees: dict = {}

class ChineseZodiacDetails(BaseModel):
    animal: str
    element: str  # Wood, Fire, Earth, Metal, Water
    polarity: str  # Yin, Yang

class VedicZodiacDetails(BaseModel):
    nakshatra: str
    rashi: str  # Moon Sign
    nakshatra_lord: str

class AstrologyProfile(BaseModel):
    birth_profile: BirthProfile
    western: WesternZodiacDetails
    chinese: ChineseZodiacDetails
    vedic: VedicZodiacDetails

class CompatibilityRequest(BaseModel):
    profile_a: BirthProfile
    profile_b: BirthProfile
    mode: RelationshipMode = RelationshipMode.BOTH

class CompatibilityBreakdown(BaseModel):
    western_percentage: float
    vedic_percentage: float
    chinese_percentage: float
    western_details: str
    vedic_details: str
    chinese_details: str

class CompatibilityResponse(BaseModel):
    overall_percentage: float
    breakdown: CompatibilityBreakdown
    ai_summary: Optional[str] = None

# SQLAlchemy ORM Models for PostgreSQL / Supabase
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")
    is_verified = Column(Boolean, default=False)
    status = Column(String, default="active")  # active, suspended, banned
    plan = Column(String, default="free")  # free, premium
    premium_expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    email = Column(String, nullable=False)
    name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    bio = Column(String, default="")
    interests = Column(JSON, default=list)
    relationship_modes = Column(String, default="BOTH")
    photos = Column(JSON, default=list)
    voice_introduction_url = Column(String, nullable=True)
    birth_profile = Column(JSON, nullable=False)
    astrology_chart = Column(JSON, nullable=False)
    hide_birth_info = Column(Boolean, default=True)

    user = relationship("User", back_populates="profile")

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_a = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user_b = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status_a = Column(String, default="pending")  # liked, disliked, pending
    status_b = Column(String, default="pending")
    matched = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sender = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    receiver = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Boolean, default=False)

class ForumPost(Base):
    __tablename__ = "forum_posts"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    author_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    author_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    likes = Column(JSON, default=list)
    is_pinned = Column(Boolean, default=False)
    is_locked = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    comments = relationship("ForumComment", back_populates="post", cascade="all, delete-orphan")

class ForumComment(Base):
    __tablename__ = "forum_comments"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    post_id = Column(Integer, ForeignKey("forum_posts.id", ondelete="CASCADE"), nullable=False)
    author_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    author_name = Column(String, nullable=False)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    post = relationship("ForumPost", back_populates="comments")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    type = Column(String, nullable=False)  # match, message, system, forum
    timestamp = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    reporter_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_id = Column(String, nullable=False)
    content_type = Column(String, nullable=False)  # post, comment, profile
    reason = Column(String, nullable=False)
    status = Column(String, default="pending")  # pending, resolved, dismissed
    action_taken = Column(String, nullable=True)

class SystemSetting(Base):
    __tablename__ = "system_settings"
    key = Column(String, primary_key=True)
    value = Column(JSON, nullable=False)

class DailyHoroscope(Base):
    __tablename__ = "daily_horoscopes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sign = Column(String, index=True, nullable=False)
    prediction = Column(String, nullable=False)
    date = Column(String, index=True, nullable=False)  # Format: YYYY-MM-DD
    created_at = Column(DateTime, default=datetime.utcnow)



