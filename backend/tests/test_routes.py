import pytest
from fastapi.testclient import TestClient
from datetime import date, time, datetime
import datetime as dt_module

from main import app
from app.models import User, Profile, ForumPost

client = TestClient(app)

def test_register_and_login_flow():
    register_payload = {
        "email": "test@astroverse.com",
        "password": "strongpassword123",
        "name": "Stella",
        "date_of_birth": "1998-06-15",
        "time_of_birth": "04:30:00",
        "place_of_birth": "Paris, France",
        "latitude": 48.8566,
        "longitude": 2.3522,
        "timezone": 1.0,
        "gender": "female",
        "interests": ["meditation", "astrology"],
        "relationship_modes": "BOTH"
    }
    
    # 1. Test register
    response = client.post("/api/auth/register", json=register_payload)
    assert response.status_code == 201
    assert "user_id" in response.json()
    
    # 2. Test Login
    login_payload = {
        "email": "test@astroverse.com",
        "password": "strongpassword123"
    }
    response = client.post("/api/auth/login", json=login_payload)
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    
    # Extract token
    token = token_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Test get own profile
    response = client.get("/api/profile/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Stella"
    assert data["email"] == "test@astroverse.com"

def test_forum_endpoints():
    # Create a dummy user for authorization
    register_payload = {
        "email": "forum@astroverse.com",
        "password": "password123",
        "name": "Luna",
        "date_of_birth": "1995-04-10",
        "time_of_birth": "12:00:00",
        "place_of_birth": "London, UK",
        "latitude": 51.5074,
        "longitude": -0.1278,
        "timezone": 1.0,
        "gender": "female",
        "interests": [],
        "relationship_modes": "BOTH"
    }
    client.post("/api/auth/register", json=register_payload)
    
    # Login
    login_resp = client.post("/api/auth/login", json={"email": "forum@astroverse.com", "password": "password123"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create a post
    post_payload = {
        "category": "Spirituality",
        "title": "Retrograde Prep",
        "content": "Get ready for Mercury retrograde!"
    }
    response = client.post("/api/forums/posts", json=post_payload, headers=headers)
    assert response.status_code == 201
    post_id = response.json()["id"]
    
    # Read posts
    response = client.get("/api/forums/posts?category=Spirituality")
    assert response.status_code == 200
    posts = response.json()
    assert len(posts) == 1
    assert posts[0]["title"] == "Retrograde Prep"
    
    # Create a comment
    comment_payload = {
        "content": "Good advice!"
    }
    response = client.post(f"/api/forums/posts/{post_id}/comments", json=comment_payload, headers=headers)
    assert response.status_code == 201
    
    # Read comments
    response = client.get(f"/api/forums/posts/{post_id}/comments")
    assert response.status_code == 200
    comments = response.json()
    assert len(comments) == 1
    assert comments[0]["content"] == "Good advice!"

def test_admin_endpoints():
    # Register user
    register_payload = {
        "email": "admin@astroverse.com",
        "password": "adminpassword123",
        "name": "Admin User",
        "date_of_birth": "1990-01-01",
        "time_of_birth": "12:00:00",
        "place_of_birth": "London, UK",
        "latitude": 51.5074,
        "longitude": -0.1278,
        "timezone": 0.0,
        "gender": "male",
        "interests": [],
        "relationship_modes": "BOTH"
    }
    resp = client.post("/api/auth/register", json=register_payload)
    user_id = resp.json()["user_id"]
    
    # Directly promote user to admin in the test DB
    from tests.conftest import TestingSessionLocal, engine
    from app.models import User, ForumPost
    db = TestingSessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        user.role = "admin"
        
        # Create a dummy post to test forum updates
        post = ForumPost(
            author_id=user_id,
            author_name="Admin User",
            category="Spirituality",
            title="Admin Test Post",
            content="Testing Pin Lock Feature",
            timestamp=dt_module.datetime.utcnow()
        )
        db.add(post)
        db.commit()
        post_id = post.id
    finally:
        db.close()
        
    # Login admin
    login_resp = client.post("/api/auth/login", json={"email": "admin@astroverse.com", "password": "adminpassword123"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 1. Test GET /api/admin/dashboard/stats
    response = client.get("/api/admin/dashboard/stats", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_users"] == 1
    assert "trends" in data
    
    # 2. Test PATCH /api/admin/users/{user_id} (e.g. ban user)
    response = client.patch(f"/api/admin/users/{user_id}?status=banned&plan=premium", headers=headers)
    assert response.status_code == 200
    assert response.json()["status"] == "banned"
    assert response.json()["plan"] == "premium"
    
    # 3. Test PATCH /api/admin/forums/posts/{post_id} (e.g. pin and lock post)
    response = client.patch(f"/api/admin/forums/posts/{post_id}?is_pinned=true&is_locked=true", headers=headers)
    assert response.status_code == 200
    assert response.json()["is_pinned"] is True
    assert response.json()["is_locked"] is True
    
    # 4. Test GET & PATCH /api/admin/settings
    settings_payload = {
        "key": "ai_astrologer_prompt",
        "value": {"prompt": "You are a mystical wizard"}
    }
    response = client.patch("/api/admin/settings", json=settings_payload, headers=headers)
    assert response.status_code == 200
    assert response.json()["ai_astrologer_prompt"]["prompt"] == "You are a mystical wizard"
    
    response = client.get("/api/admin/settings", headers=headers)
    assert response.status_code == 200
    assert "ai_astrologer_prompt" in response.json()

