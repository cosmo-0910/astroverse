import datetime
from typing import Tuple
from ..models import BirthProfile, VedicZodiacDetails

NAKSHATRAS = [
    {"name": "Ashwini", "lord": "Ketu", "rashi": "Aries"},
    {"name": "Bharani", "lord": "Venus", "rashi": "Aries"},
    {"name": "Krittika", "lord": "Sun", "rashi": "Aries/Taurus"},
    {"name": "Rohini", "lord": "Moon", "rashi": "Taurus"},
    {"name": "Mrigashira", "lord": "Mars", "rashi": "Taurus/Gemini"},
    {"name": "Ardra", "lord": "Rahu", "rashi": "Gemini"},
    {"name": "Punarvasu", "lord": "Jupiter", "rashi": "Gemini/Cancer"},
    {"name": "Pushya", "lord": "Saturn", "rashi": "Cancer"},
    {"name": "Ashlesha", "lord": "Mercury", "rashi": "Cancer"},
    {"name": "Magha", "lord": "Ketu", "rashi": "Leo"},
    {"name": "Purva Phalguni", "lord": "Venus", "rashi": "Leo"},
    {"name": "Uttara Phalguni", "lord": "Sun", "rashi": "Leo/Virgo"},
    {"name": "Hasta", "lord": "Moon", "rashi": "Virgo"},
    {"name": "Chitra", "lord": "Mars", "rashi": "Virgo/Libra"},
    {"name": "Swati", "lord": "Rahu", "rashi": "Libra"},
    {"name": "Vishakha", "lord": "Jupiter", "rashi": "Libra/Scorpio"},
    {"name": "Anuradha", "lord": "Saturn", "rashi": "Scorpio"},
    {"name": "Jyeshtha", "lord": "Mercury", "rashi": "Scorpio"},
    {"name": "Mula", "lord": "Ketu", "rashi": "Sagittarius"},
    {"name": "Purva Ashadha", "lord": "Venus", "rashi": "Sagittarius"},
    {"name": "Uttara Ashadha", "lord": "Sun", "rashi": "Sagittarius/Capricorn"},
    {"name": "Shravana", "lord": "Moon", "rashi": "Capricorn"},
    {"name": "Dhanishta", "lord": "Mars", "rashi": "Capricorn/Aquarius"},
    {"name": "Shatabhisha", "lord": "Rahu", "rashi": "Aquarius"},
    {"name": "Purva Bhadrapada", "lord": "Jupiter", "rashi": "Aquarius/Pisces"},
    {"name": "Uttara Bhadrapada", "lord": "Saturn", "rashi": "Pisces"},
    {"name": "Revati", "lord": "Mercury", "rashi": "Pisces"},
]

def calculate_nakshatra(profile: BirthProfile) -> Tuple[dict, int]:
    """
    Simulates Nakshatra index mapping based on deterministic birth timestamp.
    """
    birth_dt = datetime.datetime.combine(profile.date_of_birth, profile.time_of_birth)
    timestamp = int(birth_dt.timestamp())
    
    # Deterministic index from 0 to 26 based on timestamp and coordinates
    idx = (timestamp + int(profile.latitude * 100) + int(profile.longitude * 100)) % 27
    return NAKSHATRAS[idx], idx

def get_vedic_details(profile: BirthProfile) -> VedicZodiacDetails:
    nakshatra_info, _ = calculate_nakshatra(profile)
    return VedicZodiacDetails(
        nakshatra=nakshatra_info["name"],
        rashi=nakshatra_info["rashi"],
        nakshatra_lord=nakshatra_info["lord"]
    )

def calculate_vedic_compatibility(profile_a: BirthProfile, profile_b: BirthProfile) -> Tuple[float, str]:
    """
    Calculates compatibility using a deterministic representation of Ashta Koota matching.
    Sums up 8 dimensions (Total 36 points).
    """
    _, idx_a = calculate_nakshatra(profile_a)
    _, idx_b = calculate_nakshatra(profile_b)
    
    # Compute deterministic scores for the 8 Kootas using index differences
    diff = abs(idx_a - idx_b)
    
    # 1. Varna (Work/Ego) - max 1 point
    varna = 1.0 if (diff % 4) != 0 else 0.0
    
    # 2. Vashya (Attraction) - max 2 points
    vashya = 2.0 if (diff % 3) != 0 else 1.0
    
    # 3. Tara (Destiny) - max 3 points
    tara = 3.0 if (diff % 9) in [1, 2, 4, 6, 8] else 1.5
    
    # 4. Yoni (Physical/Sexual compatibility) - max 4 points
    yoni = 4.0 if (diff % 5) in [0, 2] else (2.0 if (diff % 5) in [1, 3] else 0.0)
    
    # 5. Graha Maitri (Friendship/Mental affinity) - max 5 points
    graha_maitri = 5.0 if (diff % 6) in [0, 3, 4] else 2.5
    
    # 6. Gana (Temperament) - max 6 points
    gana = 6.0 if (diff % 3) == 0 else (1.5 if (diff % 3) == 1 else 0.0)
    
    # 7. Bhakoot (Emotional development) - max 7 points
    bhakoot = 7.0 if (diff % 7) != 0 else 0.0
    
    # 8. Nadi (Physiological match / health) - max 8 points
    nadi = 8.0 if (diff % 2) != 0 else 0.0
    
    koota_sum = varna + vashya + tara + yoni + graha_maitri + gana + bhakoot + nadi
    percentage = (koota_sum / 36.0) * 100.0
    
    details_text = f"Vedic Ashta Koota: Total Points: {koota_sum}/36 ({round(percentage, 1)}% matching). "
    if koota_sum >= 18:
        details_text += "Highly compatible union according to Vedic principles. Strong Nadi and Bhakoot connections."
    else:
        details_text += "Moderate to low score. Might face challenges in temperamental (Gana) and biological (Nadi) sync."
        
    return round(percentage, 1), details_text
