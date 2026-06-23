import sys
import os

# Add the backend root folder to sys.path so we can import from app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Load env vars
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

from app.database import SessionLocal
from app.models import User
from app.security import verify_password, create_access_token

def test():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "admin@astroverse.com").first()
        if not user:
            print("User not found!")
            return
            
        print("User found:", user.email)
        print("Hashed password:", user.hashed_password)
        
        # Test password verification
        print("Testing password verification...")
        match = verify_password("adminpassword123", user.hashed_password)
        print("Password match result:", match)
        
        # Test token creation
        print("Testing token creation...")
        token = create_access_token(data={"sub": user.id})
        print("Token created:", token)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    test()
