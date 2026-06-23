from typing import Tuple
from ..models import BirthProfile, RelationshipMode, CompatibilityBreakdown, CompatibilityResponse
from .western import calculate_western_compatibility
from .vedic import calculate_vedic_compatibility
from .chinese import calculate_chinese_compatibility

def calculate_aggregate_compatibility(
    profile_a: BirthProfile, 
    profile_b: BirthProfile, 
    mode: RelationshipMode = RelationshipMode.BOTH
) -> CompatibilityResponse:
    
    # 1. Run individual calculations
    west_score, west_desc = calculate_western_compatibility(profile_a, profile_b)
    vedic_score, vedic_desc = calculate_vedic_compatibility(profile_a, profile_b)
    chinese_score, chinese_desc = calculate_chinese_compatibility(profile_a, profile_b)
    
    # 2. Select weights based on relationship mode
    if mode == RelationshipMode.DATING:
        w_west = 0.45
        w_vedic = 0.35
        w_chinese = 0.20
    elif mode == RelationshipMode.FRIENDSHIP:
        w_west = 0.35
        w_vedic = 0.45
        w_chinese = 0.20
    else: # BOTH
        w_west = 0.40
        w_vedic = 0.40
        w_chinese = 0.20
        
    # 3. Calculate weighted sum
    overall_score = (west_score * w_west) + (vedic_score * w_vedic) + (chinese_score * w_chinese)
    overall_score = round(max(0.0, min(100.0, overall_score)), 1)
    
    # 4. Construct response
    breakdown = CompatibilityBreakdown(
        western_percentage=west_score,
        vedic_percentage=vedic_score,
        chinese_percentage=chinese_score,
        western_details=west_desc,
        vedic_details=vedic_desc,
        chinese_details=chinese_desc
    )
    
    return CompatibilityResponse(
        overall_percentage=overall_score,
        breakdown=breakdown
    )
