from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random
import time

app = FastAPI(title="TruthLens AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "TruthLens AI Backend Running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/analyze/{media_type}")
async def analyze_media(media_type: str, file: UploadFile = File(...)):
    # Simulating processing delay
    time.sleep(2)
    
    # Mock Logic for Initial Verification
    # In a real scenario, this would call the respective Deepfake Detection Service
    
    # Deterministic mock based on filename length to allow testing both Real and Fake
    is_fake = len(file.filename) % 2 == 0
    
    if is_fake:
        return {
            "display_label": "FAKE",
            "score": 0.85 + (random.random() * 0.14),
            "explanation": f"This {media_type} shows significant signs of manipulation. Our models detected inconsistencies in the underlying data structure consistent with GAN-generated content.",
            "indicators": [
                {"label": "Artifact Detection", "description": "High frequency noise patterns observed."},
                {"label": "Consistency Check", "description": "Structural anomalies found in metadata."}
            ]
        }
    else:
        return {
            "display_label": "REAL",
            "score": 0.92 + (random.random() * 0.07),
            "explanation": f"This {media_type} appears to be authentic. No significant manipulation traces were found across our analysis pipeline.",
            "indicators": [
                {"label": "Digital Signature", "description": "Consistent with original capture device signatures."},
                {"label": "Error Level Analysis", "description": "No localized compression variances detected."}
            ]
        }
