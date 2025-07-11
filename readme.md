# 🧠 Emotion Analyzer

A simple web app where users write a reflection and get a mock emotion analysis. Built using **FastAPI** (Python) for the backend and **Next.js** (TypeScript) for the frontend.

---

## 🚀 Tech Stack

- **Backend**: FastAPI (`fastapi[standard]`)
- **Frontend**: Next.js + Tailwind CSS + TypeScript
- **API Response**: Mock emotion & confidence (randomly generated)

---

## 🔧 Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv              # Create virtual environment
source .venv/bin/activate         # On Windows: venv\Scripts\activate
pip install "fastapi[standard]"  # Install FastAPI + Uvicorn
fastapi dev main.py              # Start server
```
---

## Frontend setup(Nextjs)

```bash
cd frontend
npm install         # Install dependencies
npm run dev 

```