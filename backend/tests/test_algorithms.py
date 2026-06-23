import pytest
from datetime import date, time
from fastapi.testclient import TestClient

from app.models import BirthProfile, RelationshipMode
from app.algorithms.western import get_zodiac_sign, get_western_details, calculate_western_compatibility
from app.algorithms.chinese import get_chinese_details, calculate_chinese_compatibility
from app.algorithms.vedic import get_vedic_details, calculate_vedic_compatibility
from app.algorithms.matcher import calculate_aggregate_compatibility
from main import app

client = TestClient(app)

# Test data profiles
@pytest.fixture
def profile_aries():
    return BirthProfile(
        name="Alex",
        date_of_birth=date(1995, 4, 10),  # Aries, Pig (Wood Yin)
        time_of_birth=time(12, 0),
        place_of_birth="London, UK",
        latitude=51.5074,
        longitude=-0.1278,
        timezone=1.0
    )

@pytest.fixture
def profile_leo():
    return BirthProfile(
        name="Jordan",
        date_of_birth=date(1996, 8, 15),  # Leo, Rat (Fire Yang)
        time_of_birth=time(8, 30),
        place_of_birth="New York, US",
        latitude=40.7128,
        longitude=-74.0060,
        timezone=-4.0
    )

def test_western_zodiac_sign(profile_aries, profile_leo):
    aries_info = get_zodiac_sign(profile_aries.date_of_birth)
    leo_info = get_zodiac_sign(profile_leo.date_of_birth)
    
    assert aries_info["sign"] == "Aries"
    assert aries_info["element"] == "Fire"
    assert aries_info["modality"] == "Cardinal"
    
    assert leo_info["sign"] == "Leo"
    assert leo_info["element"] == "Fire"
    assert leo_info["modality"] == "Fixed"

def test_chinese_details(profile_aries, profile_leo):
    aries_chin = get_chinese_details(profile_aries)
    leo_chin = get_chinese_details(profile_leo)
    
    # 1995 -> Pig, Wood, Yin
    assert aries_chin.animal == "Pig"
    assert aries_chin.element == "Wood"
    assert aries_chin.polarity == "Yin"
    
    # 1996 -> Rat, Fire, Yang
    assert leo_chin.animal == "Rat"
    assert leo_chin.element == "Fire"
    assert leo_chin.polarity == "Yang"

def test_vedic_details(profile_aries):
    vedic_details = get_vedic_details(profile_aries)
    assert vedic_details.nakshatra is not None
    assert vedic_details.rashi is not None

def test_compatibility_scoring(profile_aries, profile_leo):
    # Test individual calculators
    west_score, _ = calculate_western_compatibility(profile_aries, profile_leo)
    vedic_score, _ = calculate_vedic_compatibility(profile_aries, profile_leo)
    chinese_score, _ = calculate_chinese_compatibility(profile_aries, profile_leo)
    
    assert 0 <= west_score <= 100
    assert 0 <= vedic_score <= 100
    assert 0 <= chinese_score <= 100
    
    # Test aggregate
    res_both = calculate_aggregate_compatibility(profile_aries, profile_leo, RelationshipMode.BOTH)
    res_dating = calculate_aggregate_compatibility(profile_aries, profile_leo, RelationshipMode.DATING)
    
    assert 0 <= res_both.overall_percentage <= 100
    assert 0 <= res_dating.overall_percentage <= 100

def test_endpoints(profile_aries, profile_leo):
    # 1. Test generate chart
    payload_chart = profile_aries.model_dump()
    # Serialize date and time fields to string for JSON payload
    payload_chart["date_of_birth"] = payload_chart["date_of_birth"].isoformat()
    payload_chart["time_of_birth"] = payload_chart["time_of_birth"].isoformat()
    
    response = client.post("/api/chart/generate", json=payload_chart)
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["western"]["sign"] == "Aries"
    
    # 2. Test compatibility comparison endpoint
    payload_compat = {
        "profile_a": payload_chart,
        "profile_b": {
            **profile_leo.model_dump(),
            "date_of_birth": profile_leo.date_of_birth.isoformat(),
            "time_of_birth": profile_leo.time_of_birth.isoformat()
        },
        "mode": "DATING"
    }
    response = client.post("/api/compatibility/compare", json=payload_compat)
    assert response.status_code == 200
    json_data = response.json()
    assert "overall_percentage" in json_data
    assert "ai_summary" in json_data
