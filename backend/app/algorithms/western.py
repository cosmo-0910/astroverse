import datetime
from typing import Dict, Tuple, List
from ..models import BirthProfile, WesternZodiacDetails

# Western Zodiac sign dates, elements, and modalities
ZODIAC_DATA = [
    {"sign": "Aries", "element": "Fire", "modality": "Cardinal", "start": (3, 21), "end": (4, 19)},
    {"sign": "Taurus", "element": "Earth", "modality": "Fixed", "start": (4, 20), "end": (5, 20)},
    {"sign": "Gemini", "element": "Air", "modality": "Mutable", "start": (5, 21), "end": (6, 20)},
    {"sign": "Cancer", "element": "Water", "modality": "Cardinal", "start": (6, 21), "end": (7, 22)},
    {"sign": "Leo", "element": "Fire", "modality": "Fixed", "start": (7, 23), "end": (8, 22)},
    {"sign": "Virgo", "element": "Earth", "modality": "Mutable", "start": (8, 23), "end": (9, 22)},
    {"sign": "Libra", "element": "Air", "modality": "Cardinal", "start": (9, 23), "end": (10, 22)},
    {"sign": "Scorpio", "element": "Water", "modality": "Fixed", "start": (10, 23), "end": (11, 21)},
    {"sign": "Sagittarius", "element": "Fire", "modality": "Mutable", "start": (11, 22), "end": (12, 21)},
    {"sign": "Capricorn", "element": "Earth", "modality": "Cardinal", "start": (12, 22), "end": (1, 19)},
    {"sign": "Aquarius", "element": "Air", "modality": "Fixed", "start": (1, 20), "end": (2, 18)},
    {"sign": "Pisces", "element": "Water", "modality": "Mutable", "start": (2, 19), "end": (3, 20)},
]

PLANETS = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"]

def get_zodiac_sign(dob: datetime.date) -> dict:
    month, day = dob.month, dob.day
    for z in ZODIAC_DATA:
        start_m, start_d = z["start"]
        end_m, end_d = z["end"]
        
        # Handle wrap around for Capricorn (Dec 22 - Jan 19)
        if start_m == 12 and end_m == 1:
            if (month == 12 and day >= start_d) or (month == 1 and day <= end_d):
                return z
        else:
            if (month == start_m and day >= start_d) or (month == end_m and day <= end_d):
                return z
    return ZODIAC_DATA[0] # Default fallback

def calculate_planetary_positions(profile: BirthProfile) -> Dict[str, float]:
    """
    Simulates high-precision planetary longitude degrees (0-360) 
    using deterministic calculation based on the birth timestamp, 
    latitude, and longitude.
    """
    # Create a seed using timestamp and coordinates
    birth_dt = datetime.datetime.combine(profile.date_of_birth, profile.time_of_birth)
    timestamp = birth_dt.timestamp()
    
    positions = {}
    # Base speeds for simulated cycles (approximate orbital offsets)
    rates = {
        "Sun": 360.0 / 365.25,
        "Moon": 360.0 / 27.3,
        "Mercury": 360.0 / 88.0,
        "Venus": 360.0 / 224.7,
        "Mars": 360.0 / 687.0,
        "Jupiter": 360.0 / 4333.0,
        "Saturn": 360.0 / 10759.0
    }
    
    # Calculate celestial longitude positions (0-360 degrees)
    for planet, rate in rates.items():
        # Apply a base orbital offset plus coordinate variations
        deg = (timestamp * rate / 86400.0 + (profile.latitude * 1.5) + (profile.longitude * 0.8)) % 360.0
        positions[planet] = round(deg, 2)
        
    return positions

def get_western_details(profile: BirthProfile) -> WesternZodiacDetails:
    sign_info = get_zodiac_sign(profile.date_of_birth)
    positions = calculate_planetary_positions(profile)
    return WesternZodiacDetails(
        sign=sign_info["sign"],
        element=sign_info["element"],
        modality=sign_info["modality"],
        planetary_degrees=positions
    )

def calculate_angular_difference(deg1: float, deg2: float) -> float:
    diff = abs(deg1 - deg2) % 360
    return diff if diff <= 180 else 360 - diff

def evaluate_aspects(deg_a: Dict[str, float], deg_b: Dict[str, float]) -> List[dict]:
    """
    Detects major aspects between two charts.
    Aspects: Conjunction (0), Sextile (60), Square (90), Trine (120), Opposition (180).
    """
    aspects = []
    aspect_definitions = [
        {"name": "Conjunction", "angle": 0, "orb": 8, "weight": 10, "desc": "Powerful energy fusion, boosting compatibility"},
        {"name": "Sextile", "angle": 60, "orb": 6, "weight": 7, "desc": "Friendly flow of expression and opportunity"},
        {"name": "Square", "angle": 90, "orb": 8, "weight": -5, "desc": "Creative friction, requires compromise"},
        {"name": "Trine", "angle": 120, "orb": 8, "weight": 12, "desc": "Harmonious flow of natural understanding"},
        {"name": "Opposition", "angle": 180, "orb": 8, "weight": -2, "desc": "Magnetic attraction but potential pull in opposite directions"}
    ]
    
    for p_a in PLANETS:
        for p_b in PLANETS:
            diff = calculate_angular_difference(deg_a[p_a], deg_b[p_b])
            for asp in aspect_definitions:
                if abs(diff - asp["angle"]) <= asp["orb"]:
                    aspects.append({
                        "planet_a": p_a,
                        "planet_b": p_b,
                        "aspect": asp["name"],
                        "weight": asp["weight"],
                        "description": f"{p_a} in profile A forms a {asp['name']} to {p_b} in profile B ({asp['desc']})"
                    })
    return aspects

def calculate_western_compatibility(profile_a: BirthProfile, profile_b: BirthProfile) -> Tuple[float, str]:
    details_a = get_western_details(profile_a)
    details_b = get_western_details(profile_b)
    
    aspects = evaluate_aspects(details_a.planetary_degrees, details_b.planetary_degrees)
    
    # Calculate score based on aspects
    pos_score = 0
    neg_score = 0
    
    # Baseline compatibility based on Sun Signs
    baseline = 50.0
    if details_a.element == details_b.element:
        baseline += 15.0 # Same element (highly compatible)
    elif (details_a.element in ["Fire", "Air"] and details_b.element in ["Fire", "Air"]) or \
         (details_a.element in ["Earth", "Water"] and details_b.element in ["Earth", "Water"]):
        baseline += 10.0 # Harmonizing elements
    else:
        baseline -= 5.0 # Clashing elements
        
    for asp in aspects:
        w = asp["weight"]
        if w > 0:
            pos_score += w
        else:
            neg_score += abs(w)
            
    # Normalize aspects score to add/subtract from baseline
    net_aspect_impact = (pos_score - neg_score) * 1.5
    final_score = max(10.0, min(100.0, baseline + net_aspect_impact))
    
    # Construct explanation text
    details_text = f"Western Synastry: {profile_a.name} ({details_a.sign} - {details_a.element}) and " \
                   f"{profile_b.name} ({details_b.sign} - {details_b.element}). "
    if len(aspects) > 0:
        highlights = [f"{asp['planet_a']} {asp['aspect']} {asp['planet_b']}" for asp in aspects[:3]]
        details_text += f"Key aspects found: {', '.join(highlights)}. "
    else:
        details_text += "No major planetary aspects found between coordinates."
        
    return round(final_score, 1), details_text
