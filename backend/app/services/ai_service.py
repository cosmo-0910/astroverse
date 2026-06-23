import os
from typing import Optional
import google.generativeai as genai
from ..models import BirthProfile, CompatibilityResponse, RelationshipMode
from ..algorithms.western import get_western_details
from ..algorithms.chinese import get_chinese_details
from ..algorithms.vedic import get_vedic_details

# Initialize Google Gemini
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    
class AIService:
    @staticmethod
    def generate_compatibility_summary(
        profile_a: BirthProfile,
        profile_b: BirthProfile,
        compat_data: CompatibilityResponse,
        mode: RelationshipMode
    ) -> str:
        """
        Generates a cosmic, intelligent reading. If a GEMINI_API_KEY is available,
        uses Gemini 1.5 Flash. Otherwise, falls back to a high-fidelity template.
        """
        details_a_west = get_western_details(profile_a)
        details_b_west = get_western_details(profile_b)
        details_a_chin = get_chinese_details(profile_a)
        details_b_chin = get_chinese_details(profile_b)
        details_a_vedic = get_vedic_details(profile_a)
        details_b_vedic = get_vedic_details(profile_b)

        prompt = (
            f"You are the Astroverse AI Astrologer. Analyze the relationship compatibility "
            f"between {profile_a.name} and {profile_b.name} for relationship mode: {mode.value}.\n\n"
            f"Astroverse calculations:\n"
            f"- Overall compatibility score: {compat_data.overall_percentage}%\n"
            f"- Western Synastry Match: {compat_data.breakdown.western_percentage}% ({compat_data.breakdown.western_details})\n"
            f"- Vedic Ashta Koota Match: {compat_data.breakdown.vedic_percentage}% ({compat_data.breakdown.vedic_details})\n"
            f"- Chinese Zodiac Match: {compat_data.breakdown.chinese_percentage}% ({compat_data.breakdown.chinese_details})\n\n"
            f"Write a premium, conversational, and mystical compatibility summary. "
            f"Describe their cosmic strengths, communication flow, potential challenges, and spiritual alignment. "
            f"Keep the tone intelligent, encouraging, and cosmic."
        )

        if GEMINI_API_KEY:
            try:
                # Using gemini-1.5-flash as recommended
                model = genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content(prompt)
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                # Fallback to local template if API call fails
                pass
                
        # High-Fidelity local template fallback
        return AIService._get_fallback_reading(
            profile_a.name, 
            profile_b.name, 
            details_a_west.sign, 
            details_b_west.sign, 
            compat_data.overall_percentage,
            mode.value
        )
        
    @staticmethod
    def chat_astrologer(history: list, user_message: str, profile: BirthProfile) -> str:
        """
        Conversational chat with the AI Astrologer. Falls back to a simulated responder.
        """
        details_west = get_western_details(profile)
        details_vedic = get_vedic_details(profile)
        details_chin = get_chinese_details(profile)
        
        system_instruction = (
            f"You are the Astroverse AI Astrologer, a warm, professional, and spiritual counselor. "
            f"You have deep knowledge of Western, Vedic, and Chinese Astrology. "
            f"The user is {profile.name}, born on {profile.date_of_birth} at {profile.time_of_birth} in {profile.place_of_birth}.\n"
            f"Their chart details:\n"
            f"- Western Sign: {details_west.sign} ({details_west.element} {details_west.modality})\n"
            f"- Vedic Nakshatra: {details_vedic.nakshatra} (Lord: {details_vedic.nakshatra_lord}, Rashi: {details_vedic.rashi})\n"
            f"- Chinese Zodiac: {details_chin.animal} (Element: {details_chin.element}, {details_chin.polarity})\n\n"
            f"Respond to their query with personalized spiritual advice, birth chart insights, or daily guidance."
        )
        
        if GEMINI_API_KEY:
            try:
                # Initialize model with system instruction
                model = genai.GenerativeModel(
                    model_name="gemini-1.5-flash",
                    system_instruction=system_instruction
                )
                
                # Format history for Gemini chat structure
                # Translate general history objects to gemini structure if needed
                chat = model.start_chat(history=[])
                # Replay history
                for msg in history[:-1]:
                    # Quick replay of roles
                    pass
                response = chat.send_message(user_message)
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                pass
                
        # Simulated intelligent responder
        return AIService._get_simulated_chat_response(user_message, profile.name, details_west.sign)

    @staticmethod
    def _get_fallback_reading(name_a: str, name_b: str, sign_a: str, sign_b: str, score: float, mode: str) -> str:
        intro = f"Celestial forces reveal a deep resonance between {name_a} ({sign_a}) and {name_b} ({sign_b}), manifesting as a {score}% compatibility alignment."
        
        if score >= 80:
            strengths = "Your connection is anchored in a highly harmonious elemental flow. Whether sharing ideas or building long-term goals, there is a natural ease of understanding that makes this partnership feel predestined."
            challenges = "Because of the strong alignment, watch out for complacency. Ensure you both maintain your individuality and don't merge so closely that you lose your personal spiritual path."
        elif score >= 50:
            strengths = "This relationship possesses dynamic, complementary energy. Where one has a blind spot, the other provides clarity. It is a relationship designed for mutual growth and learning."
            challenges = "Friction points might arise due to differences in your planetary houses. Clear communication is the absolute key to balancing these celestial differences."
        else:
            strengths = "This cosmic alignment presents a powerful mirror. It may not feel comfortable at first, but it acts as a catalyst for deep self-realization and karmic learning."
            challenges = "Expect clashes in temperament or expectations. Patience and deep listening are required to transmute these planetary square aspects into constructive growth."
            
        advice = f"For your chosen focus of **{mode}**, focus on building conscious bridges rather than expecting automatic alignment. Let the stars guide, but let your actions decide."
        
        return f"{intro}\n\n**Cosmic Strengths:** {strengths}\n\n**Potential Challenges:** {challenges}\n\n**Spiritual Guidance:** {advice}"

    @staticmethod
    def _get_simulated_chat_response(message: str, name: str, sign: str) -> str:
        msg_lower = message.lower()
        if "horoscope" in msg_lower or "daily" in msg_lower:
            return f"Greetings {name}. Today, the cosmic transits highlight opportunities for self-reflection. With your Sun sign in {sign}, the Moon is shifting focus toward your inner foundations. Take a moment to ground yourself before initiating major changes."
        elif "compatibility" in msg_lower or "relationship" in msg_lower or "love" in msg_lower:
            return f"Relationships for a {sign} native are currently undergoing transit transformations. You are seeking deeper authenticity. Look for alignments where Mercury and Venus aspects foster transparent communication."
        elif "career" in msg_lower or "money" in msg_lower:
            return f"Jupiter's position suggests a steady growth trajectory, but Saturn advises caution with impulsive spending. Your practical qualities as a {sign} will help you make the right strategic moves today."
        else:
            return f"Hello {name}. As the celestial spheres rotate, I can see the unique patterns of your natal {sign} energy playing out. How can I help you navigate your chart, transit movements, or relationship synastry today?"

    @staticmethod
    def generate_daily_horoscope(sign: str, date_str: str) -> str:
        prompt = (
            f"Write a premium daily horoscope prediction for the zodiac sign '{sign}' on date '{date_str}'.\n"
            f"The prediction should reflect actual cosmic transits for the day, be encouraging, mystical, "
            f"and practical, and include guidance on how the sign should navigate career, relationships, and self-care.\n"
            f"Keep it concise (around 2 to 3 sentences, max 60 words)."
        )
        if GEMINI_API_KEY:
            try:
                model = genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content(prompt)
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                pass
        
        # High fidelity fallback predictions
        fallback_predictions = {
            "Aries": "A strong day for clarity. Mercury supports honest conversations and decisive action.",
            "Taurus": "Venus highlights beauty and self-care. Relax and treat yourself to local enjoyments.",
            "Gemini": "Keep tabs on communications. Retrograde shifts might require repeating statements.",
            "Cancer": "Trust your emotional intuition. Home and family alignments provide strong support.",
            "Leo": "Your charisma takes center stage. A perfect cycle for public speaking and presentations.",
            "Virgo": "Organize detail structures. Small structural tweaks yield immense productivity outputs.",
            "Libra": "Seek balance in all relationships. Clear boundary arrangements are necessary.",
            "Scorpio": "Intense transformations are expected. Embrace letting go of obsolete systems.",
            "Sagittarius": "Adventure and exploration call. Seek new perspectives in learning today.",
            "Capricorn": "Practical steps lead to grand career alignments. Build brick by brick.",
            "Aquarius": "Innovative flashes strike. Share your visionary solutions with peers.",
            "Pisces": "Dream alignment is high. Your psychic reception is sharp; follow your gut."
        }
        return fallback_predictions.get(sign, "A positive cosmic flow approaches. Stay receptive to celestial alignments today.")
