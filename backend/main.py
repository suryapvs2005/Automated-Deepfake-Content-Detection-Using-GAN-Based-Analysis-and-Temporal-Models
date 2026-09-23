from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio

app = FastAPI(title="TruthLens AI API")

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://suryapvs2005.github.io",
        "https://suryapvs2005.github.io/Automated-Deepfake-Content-Detection-Using-GAN-Based-Analysis-and-Temporal-Models",
        "https://deepfake-frontend-wj0r.onrender.com",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Root API
# -----------------------------
@app.get("/")
async def root():
    return {
        "message": "TruthLens AI Backend Running",
        "status": "online"
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "message": "Backend is healthy"
    }


# -----------------------------
# Analyze Image / Video
# -----------------------------
@app.post("/api/analyze/{media_type}")
async def analyze_media(
    media_type: str,
    file: UploadFile = File(...)
):

    # Check media type
    if media_type not in ["image", "video"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid media type. Use image or video."
        )

    # Check file
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )

    # Simulate processing
    await asyncio.sleep(2)

    # Mock detection logic
    # This is only for demonstration/testing.
    is_fake = len(file.filename) % 2 == 0

    # -----------------------------
    # FAKE RESULT
    # -----------------------------
    if is_fake:

        score = round(
            0.85 + (random.random() * 0.14),
            3
        )

        return {
            "display_label": "FAKE",
            "score": score,
            "confidence": round(score * 100, 1),

            "explanation": (
                f"This {media_type} shows significant signs of "
                "manipulation. Our models detected inconsistencies "
                "in the underlying data structure consistent with "
                "GAN-generated content."
            ),

            "indicators": [
                {
                    "label": "Artifact Detection",
                    "description": "High frequency noise patterns observed."
                },
                {
                    "label": "Consistency Check",
                    "description": "Structural anomalies found in metadata."
                }
            ]
        }

    # -----------------------------
    # REAL RESULT
    # -----------------------------
    else:

        score = round(
            0.92 + (random.random() * 0.07),
            3
        )

        return {
            "display_label": "REAL",
            "score": score,
            "confidence": round(score * 100, 1),

            "explanation": (
                f"This {media_type} appears to be authentic. "
                "No significant manipulation traces were found "
                "across our analysis pipeline."
            ),

            "indicators": [
                {
                    "label": "Digital Signature",
                    "description": (
                        "Consistent with original capture device signatures."
                    )
                },
                {
                    "label": "Error Level Analysis",
                    "description": (
                        "No localized compression variances detected."
                    )
                }
            ]
        }