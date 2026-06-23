import sys
import os
import uuid
from datetime import datetime

# Add the backend root folder to sys.path so we can import from app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Manually load environment variables from .env file
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

from app.database import SessionLocal, Base, engine
from app.models import User, Profile
from app.security import get_password_hash

def seed_admin():
    # 1. Create tables if they do not exist
    print("Creating database tables if not exists...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Check if admin user already exists
        admin_email = "admin@astroverse.com"
        admin_password = "adminpassword123" # Secure temporary password
        
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        if existing_admin:
            print(f"Admin user '{admin_email}' already exists. Resetting password to 'adminpassword123'...")
            existing_admin.hashed_password = get_password_hash(admin_password)
            db.commit()
            print("SUCCESS: Admin password reset successfully!")
            return
            
        print(f"Creating default admin user with email '{admin_email}'...")
        user_id = str(uuid.uuid4())
        hashed_password = get_password_hash(admin_password)
        
        # 3. Create User
        new_admin = User(
            id=user_id,
            email=admin_email,
            hashed_password=hashed_password,
            role="admin",
            is_verified=True,
            status="active",
            plan="premium",
            created_at=datetime.utcnow()
        )
        
        # 4. Create Profile dummy data
        dummy_birth = {
            "name": "Wolf Pixel",
            "date_of_birth": "1990-01-01",
            "time_of_birth": "12:00:00",
            "place_of_birth": "London, UK",
            "latitude": 51.5074,
            "longitude": -0.1278,
            "timezone": 0.0
        }
        
        new_profile = Profile(
            id=user_id,
            email=admin_email,
            name="Wolf Pixel",
            gender="Male",
            bio="Administrator of Astroverse platform.",
            interests=["Astrology", "Technology"],
            relationship_modes="BOTH",
            photos=[],
            birth_profile=dummy_birth,
            astrology_chart={
                "western": {"sign": "Capricorn", "element": "Earth", "modality": "Cardinal"},
                "vedic": {"nakshatra": "Uttara Ashadha", "rashi": "Capricorn", "nakshatra_lord": "Sun"},
                "chinese": {"animal": "Horse", "element": "Metal", "polarity": "Yang"}
            },
            hide_birth_info=True
        )
        
        db.add(new_admin)
        db.add(new_profile)
        db.commit()
        print("--------------------------------------------------")
        print("SUCCESS: Default Admin User created successfully!")
        print(f"Email: {admin_email}")
        print(f"Password: {admin_password}")
        print("--------------------------------------------------")
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_admin()
