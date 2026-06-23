import sys
import os
import uuid
import random
import json
from datetime import datetime, timedelta

# Add the backend root folder to sys.path so we can import from app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Load env variables from .env file
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

from app.database import SessionLocal, Base, engine
from app.models import User, Profile, Match, Message, ForumPost, ForumComment, Report, DailyHoroscope
from app.security import get_password_hash
from app.algorithms.western import get_western_details
from app.algorithms.vedic import get_vedic_details
from app.algorithms.chinese import get_chinese_details
from app.models import BirthProfile

# List of dummy users
NAMES = [
    "Alice Vance", "Bob Miller", "Chloe Price", "Daniel Craig", "Emma Watson",
    "Frank Castle", "Grace Hopper", "Harry Potter", "Ivy Green", "Jack Ryan",
    "Kora Lin", "Leo Messi", "Mia Wong", "Noah Centineo", "Olivia Rodrigo",
    "Peter Parker", "Quinn Fabray", "Ryan Gosling", "Sophia Loren", "Tony Stark",
    "Ursula G", "Victor Stone", "Wanda Maximoff", "Xavier Woods", "Yara Grey",
    "Zendaya Coleman", "Bruce Wayne", "Clark Kent", "Diana Prince", "Barry Allen"
]

GENDERS = ["Female", "Male", "Non-Binary"]
ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

def seed_all():
    print("Drop all tables and recreate to start fresh...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        print("Seeding default admin...")
        admin_id = str(uuid.uuid4())
        admin_user = User(
            id=admin_id,
            email="admin@astroverse.com",
            hashed_password=get_password_hash("adminpassword123"),
            role="admin",
            is_verified=True,
            status="active",
            plan="premium",
            created_at=datetime.utcnow() - timedelta(days=15)
        )
        dummy_birth = {
            "name": "Wolf Pixel",
            "date_of_birth": "1990-01-01",
            "time_of_birth": "12:00:00",
            "place_of_birth": "London, UK",
            "latitude": 51.5074,
            "longitude": -0.1278,
            "timezone": 0.0
        }
        admin_profile = Profile(
            id=admin_id,
            email="admin@astroverse.com",
            name="Wolf Pixel",
            gender="Male",
            bio="Lead Administrator of Astroverse.",
            interests=["Astrology", "Space"],
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
        db.add(admin_user)
        db.add(admin_profile)
        
        users_list = []
        
        print("Seeding 30 mock users...")
        for i, name in enumerate(NAMES):
            user_id = str(uuid.uuid4())
            email = f"{name.lower().replace(' ', '')}@astroverse.com"
            password = "password123"
            
            # Diverse roles, plans, statuses
            role = "user"
            if i == 0:
                role = "moderator"
            
            plan = "premium" if i % 3 == 0 else "free"
            status = "active"
            if i == 14:
                status = "suspended"
            elif i == 25:
                status = "banned"
                
            created_days_ago = random.randint(1, 14)
            created_at = datetime.utcnow() - timedelta(days=created_days_ago, hours=random.randint(0, 23))
            
            user = User(
                id=user_id,
                email=email,
                hashed_password=get_password_hash(password),
                role=role,
                is_verified=True if i % 2 == 0 else False,
                status=status,
                plan=plan,
                created_at=created_at
            )
            
            # Generate random birth details
            dob = datetime(1990 + random.randint(0, 15), random.randint(1, 12), random.randint(1, 28)).date()
            tob = datetime(2000, 1, 1, random.randint(0, 23), random.randint(0, 59)).time()
            
            birth = BirthProfile(
                name=name,
                date_of_birth=dob,
                time_of_birth=tob,
                place_of_birth="New York, USA",
                latitude=40.7128,
                longitude=-74.0060,
                timezone=-5.0
            )
            
            w_details = get_western_details(birth)
            v_details = get_vedic_details(birth)
            c_details = get_chinese_details(birth)
            
            profile = Profile(
                id=user_id,
                email=email,
                name=name,
                gender=random.choice(GENDERS),
                bio=f"Hey! I am {name}. Astroverse enthusiast interested in cosmic alignments.",
                interests=["Horoscopes", "Synastry", "Meditation", "Tarot"][:random.randint(1, 4)],
                relationship_modes=random.choice(["DATING", "FRIENDSHIP", "BOTH"]),
                photos=[],
                birth_profile=json.loads(birth.model_dump_json()),
                astrology_chart={
                    "western": json.loads(w_details.model_dump_json()),
                    "vedic": json.loads(v_details.model_dump_json()),
                    "chinese": json.loads(c_details.model_dump_json())
                },
                hide_birth_info=True
            )
            
            db.add(user)
            db.add(profile)
            users_list.append(user)
            
        db.commit()
        
        print("Seeding matches...")
        matches_count = 0
        for i in range(25):
            u_a = random.choice(users_list)
            u_b = random.choice(users_list)
            if u_a.id == u_b.id:
                continue
                
            matched = True if i % 2 == 0 else False
            status_a = "liked" if matched or i % 3 == 0 else "pending"
            status_b = "liked" if matched else "pending"
            
            new_match = Match(
                user_a=u_a.id,
                user_b=u_b.id,
                status_a=status_a,
                status_b=status_b,
                matched=matched,
                updated_at=datetime.utcnow() - timedelta(days=random.randint(0, 5))
            )
            db.add(new_match)
            matches_count += 1
            
        print("Seeding forum posts and comments...")
        categories = ["Birth Chart", "Relationship", "Daily", "Career", "Spiritual"]
        post_titles = [
            "Mercury Retrograde survival guide!", "How to read houses in Vedic chart?",
            "Vedic vs Western - which compatibility rating is more accurate?",
            "Does anyone here have an Aries Moon sign?", "Spiritual meditation techniques for Leo ascendants",
            "Career choices matching Taurus sun traits", "Water signs emotional depth analysis",
            "Spooky alignments this week!", "Vibe check for Capricorn natives during full moon"
        ]
        
        posts = []
        for i, title in enumerate(post_titles):
            u = random.choice(users_list)
            prof = db.query(Profile).filter(Profile.id == u.id).first()
            
            post = ForumPost(
                author_id=u.id,
                author_name=prof.name if prof else "Cosmic User",
                category=random.choice(categories),
                title=title,
                content="This is an interactive discussion regarding planetary transits and houses. Looking forward to reading your insights and opinions on how this current cosmic cycle is impacting you!",
                likes=[u.id for u in random.sample(users_list, random.randint(1, 5))],
                is_pinned=True if i == 0 else False,
                is_locked=False,
                is_featured=True if i == 1 else False,
                timestamp=datetime.utcnow() - timedelta(hours=random.randint(2, 48))
            )
            db.add(post)
            posts.append(post)
            
        db.commit()
        
        # Seed comments on forum posts
        for post in posts:
            for _ in range(random.randint(1, 3)):
                u = random.choice(users_list)
                prof = db.query(Profile).filter(Profile.id == u.id).first()
                comment = ForumComment(
                    post_id=post.id,
                    author_id=u.id,
                    author_name=prof.name if prof else "Astro Expert",
                    content="Totally agree with this! The current transit aligns perfectly with my chart experiences.",
                    timestamp=datetime.utcnow() - timedelta(minutes=random.randint(5, 120))
                )
                db.add(comment)
                
        print("Seeding reported content (moderation queue)...")
        # Reports
        reasons = ["Harassment", "Spam", "Fake Profile", "Abusive Language"]
        report_details = [
            {"type": "Posts", "text": "Astro reading is fake-rant"},
            {"type": "Comments", "text": "This user is trolling my thread"},
            {"type": "Users", "text": "Spam account advertising external links"},
            {"type": "Messages", "text": "Inappropriate chat behavior"}
        ]
        
        for i in range(8):
            u_reporter = random.choice(users_list)
            detail = report_details[i % len(report_details)]
            new_report = Report(
                reporter_id=u_reporter.id,
                target_id=f"target_{i}",
                content_type=detail["type"],
                reason=random.choice(reasons),
                status="pending",
                action_taken=None
            )
            db.add(new_report)
            
        print("Seeding daily horoscopes...")
        for sign in ZODIAC_SIGNS:
            today_str = datetime.utcnow().strftime("%Y-%m-%d")
            horoscope = DailyHoroscope(
                sign=sign,
                prediction=f"Cosmic energies guide {sign} toward clarity. Follow your intuitive flow and embrace changes in career and relationships today.",
                date=today_str,
                created_at=datetime.utcnow()
            )
            db.add(horoscope)
            
        print("Seeding messages...")
        for _ in range(15):
            u_sender = random.choice(users_list)
            u_receiver = random.choice(users_list)
            if u_sender.id == u_receiver.id:
                continue
            msg = Message(
                sender=u_sender.id,
                receiver=u_receiver.id,
                content="Hey! Our compatibility rating is really high. How do your signs align with your birth profile?",
                timestamp=datetime.utcnow() - timedelta(hours=random.randint(1, 24)),
                is_read=random.choice([True, False])
            )
            db.add(msg)
            
        db.commit()
        print("--------------------------------------------------")
        print("SUCCESS: Database fully populated with Astroverse mock data!")
        print(f"Total Users: {len(users_list)}")
        print(f"Total Matches: {matches_count}")
        print(f"Total Forum Posts: {len(post_titles)}")
        print(f"Admin Email: admin@astroverse.com")
        print(f"Admin Password: adminpassword123")
        print("--------------------------------------------------")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_all()
