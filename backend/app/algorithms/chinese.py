from typing import Tuple
from ..models import BirthProfile, ChineseZodiacDetails

ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
ELEMENTS = ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"]

# 12 animals mapped index: Rat=0, Ox=1, Tiger=2, etc.
# Base year for Rat is 1900 (1900 % 12 = 4)
# (Year - 1900) % 12 gives index if we align properly. 
# 1900 was a Rat year. So (Year - 1900) % 12 maps perfectly to ANIMALS:
# 1900 -> 0 (Rat)
# 1901 -> 1 (Ox)
# 1996 -> 96 % 12 = 0 (Rat)

TRINES = [
    {"Rat", "Dragon", "Monkey"},
    {"Ox", "Snake", "Rooster"},
    {"Tiger", "Horse", "Dog"},
    {"Rabbit", "Goat", "Pig"}
]

SIX_HARMONIES = [
    {"Rat", "Ox"},
    {"Tiger", "Pig"},
    {"Rabbit", "Dog"},
    {"Dragon", "Rooster"},
    {"Snake", "Monkey"},
    {"Horse", "Goat"}
]

CLASHES = [
    {"Rat", "Horse"},
    {"Ox", "Goat"},
    {"Tiger", "Monkey"},
    {"Rabbit", "Rooster"},
    {"Dragon", "Dog"},
    {"Snake", "Pig"}
]

def get_chinese_details(profile: BirthProfile) -> ChineseZodiacDetails:
    year = profile.date_of_birth.year
    
    # Calculate animal sign
    animal_idx = (year - 1900) % 12
    animal = ANIMALS[animal_idx]
    
    # Calculate element based on last digit of the year
    last_digit = year % 10
    element = ELEMENTS[last_digit]
    
    # Polarities: Even years are Yang, Odd are Yin
    polarity = "Yang" if (year % 2 == 0) else "Yin"
    
    return ChineseZodiacDetails(
        animal=animal,
        element=element,
        polarity=polarity
    )

def calculate_chinese_compatibility(profile_a: BirthProfile, profile_b: BirthProfile) -> Tuple[float, str]:
    details_a = get_chinese_details(profile_a)
    details_b = get_chinese_details(profile_b)
    
    sign_a, sign_b = details_a.animal, details_b.animal
    pair = {sign_a, sign_b}
    
    # Default score
    score = 65.0
    status = "neutral compatibility"
    
    # Check for perfect match (Six Harmonies)
    for harmony in SIX_HARMONIES:
        if pair == harmony:
            score = 95.0
            status = "excellent compatibility (Six Harmonies - secret friends)"
            break
            
    # Check for strong match (Trines)
    if score == 65.0:
        for trine in TRINES:
            if sign_a in trine and sign_b in trine:
                score = 85.0
                status = "highly compatible (Three Harmonies Trine)"
                break
                
    # Check for clash
    if score == 65.0:
        for clash in CLASHES:
            if pair == clash:
                score = 30.0
                status = "challenging relationship (Direct Zodiac Clash)"
                break
                
    # Same sign adjustment
    if sign_a == sign_b:
        score = 70.0
        status = "same animal sign compatibility"
        
    # Element harmony adjustment
    if details_a.element == details_b.element:
        score += 5.0
    elif (details_a.element, details_b.element) in [("Wood", "Fire"), ("Fire", "Earth"), ("Earth", "Metal"), ("Metal", "Water"), ("Water", "Wood")]:
        score += 3.0 # Productive cycle
    elif (details_a.element, details_b.element) in [("Wood", "Earth"), ("Earth", "Water"), ("Water", "Fire"), ("Fire", "Metal"), ("Metal", "Wood")]:
        score -= 5.0 # Destructive cycle
        
    score = max(10.0, min(100.0, score))
    
    details_text = f"Chinese Zodiac: {sign_a} ({details_a.element} {details_a.polarity}) and " \
                   f"{sign_b} ({details_b.element} {details_b.polarity}) show {status}."
                   
    return round(score, 1), details_text
