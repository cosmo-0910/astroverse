from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from fastapi.staticfiles import StaticFiles

from app.models import BirthProfile, CompatibilityRequest, CompatibilityResponse, AstrologyProfile, RelationshipMode
from app.algorithms.western import get_western_details
from app.algorithms.vedic import get_vedic_details
from app.algorithms.chinese import get_chinese_details
from app.algorithms.matcher import calculate_aggregate_compatibility
from app.services.ai_service import AIService

# Import new routers
from app.routers.auth import router as auth_router
from app.routers.profile import router as profile_router
from app.routers.matches import router as matches_router
from app.routers.chat import router as chat_router
from app.routers.forums import router as forums_router
from app.routers.admin import router as admin_router
from app.routers.content import router as content_router

app = FastAPI(
    title="Astroverse API",
    description="Backend and Astrology Compatibility Engines for the Astroverse Platform",
    version="1.0.0"
)

# CORS middleware config to allow easy frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files folder
import os
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Create database tables using SQLAlchemy
try:
    from app.database import Base, engine
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Database table creation skipped (offline/testing): {e}")

# Include new routers
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(matches_router)
app.include_router(chat_router)
app.include_router(forums_router)
app.include_router(admin_router)
app.include_router(content_router)

# Model for chat request
class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []
    profile: BirthProfile

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "Astroverse Backend Engine",
        "endpoints": {
            "swagger": "/docs",
            "redoc": "/redoc"
        }
    }

@app.post("/api/chart/generate", response_model=AstrologyProfile)
def generate_chart(profile: BirthProfile):
    """
    Accepts birth metadata (date, time, place, coordinates, timezone)
    and returns a complete Astrology Profile containing Western, Vedic,
    and Chinese Zodiac details.
    """
    try:
        w_details = get_western_details(profile)
        v_details = get_vedic_details(profile)
        c_details = get_chinese_details(profile)
        
        return AstrologyProfile(
            birth_profile=profile,
            western=w_details,
            vedic=v_details,
            chinese=c_details
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate birth chart: {str(e)}")

@app.post("/api/compatibility/compare", response_model=CompatibilityResponse)
def compare_compatibility(request: CompatibilityRequest):
    """
    Compares two birth charts using Western, Vedic, and Chinese algorithms,
    generates a weighted compatibility rating, and appends an AI-generated
    cosmic summary (with fallback support).
    """
    try:
        # 1. Compute quantitative scores & details
        response = calculate_aggregate_compatibility(request.profile_a, request.profile_b, request.mode)
        
        # 2. Append AI-synthesized reading
        ai_summary = AIService.generate_compatibility_summary(
            request.profile_a,
            request.profile_b,
            response,
            request.mode
        )
        response.ai_summary = ai_summary
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate compatibility: {str(e)}")

@app.post("/api/chat/astrologer")
def chat_with_astrologer(request: ChatRequest):
    """
    Interactive chat session endpoint with the AI Astrologer.
    Keeps conversation context and matches response to birth profile coordinates.
    """
    try:
        reply = AIService.chat_astrologer(request.history, request.message, request.profile)
        return {
            "reply": reply,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Astrologer chat failure: {str(e)}")
