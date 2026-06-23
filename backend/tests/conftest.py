import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Recreate tables globally once
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Apply the override globally to the FastAPI app for all test sessions
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def clean_db():
    # Reset database schema before each test runs to keep tests isolated
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
