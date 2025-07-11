from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uvicorn
import random

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.get("/")
def hello():
    return {"hello":"world"}

@app.post("/analyze")
async def analyze_emotion(input: TextInput):
    emotions = ["Happy", "Sad", "Anxious", "Excited", "Angry"]
    emotion = random.choice(emotions)
    confidence = round(random.uniform(0.7, 0.99), 2)

    return {"emotion": emotion, "confidence": confidence}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  
    uvicorn.run("main:app", host="0.0.0.0", port=port)