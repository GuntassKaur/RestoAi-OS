# 🍽️ RestoAI OS
> **Agentic Business OS for HoReCa (Hotels, Restaurants, Cafes)**

![RestoAI OS Banner](https://via.placeholder.com/1200x400/0f172a/8b5cf6?text=RestoAI+OS)

An advanced, AI-powered operations dashboard that transforms how independent restaurant owners manage their business. Includes real-time pipeline monitoring, automated inventory tracking, full schedule management, and an integrated LangGraph-powered AI Agent.

---

## 🏗️ Architecture

```mermaid
graph TD;
    Client[Next.js 14 App Router] --> NextAuth[NextAuth JWT Auth]
    Client <--> |REST / WebSockets| API[FastAPI Backend - /app/api]
    API --> Models[/app/models]
    API --> Schemas[/app/schemas]
    API --> Agent[LangGraph AI Agent - /app/agents]
    API <--> PostgreSQL[(PostgreSQL / SQLite via SQLAlchemy)]
```

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 App Router
- TypeScript
- Tailwind CSS (Dark Glassmorphism UI)
- Framer Motion + Recharts

**Backend:**
- Python + FastAPI
- PostgreSQL with SQLAlchemy ORM + Alembic
- LangGraph (Agent with Tool Calling)

**Testing & CI/CD:**
- Playwright E2E Tests
- Pytest
- GitHub Actions

**Deployment:**
- Vercel (Frontend)
- Railway (Backend)

---

## ⚙️ Environment Variables

Copy `.env.example` -> `.env`

**Backend (`backend/.env`):**
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/restoai
OPENAI_API_KEY=sk-your-key-here
SECRET_KEY=your-jwt-secret
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🏃 Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate # Windows
pip install -r requirements.txt

# Run initial seed
python seed.py

# Start dev server
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

*(Placeholders for future screenshots)*
- [Dashboard View](#)
- [Live Order Pipeline](#)
- [AI Chat Assistant](#)

---

## 🌐 Live Demo

🚀 **[View Live Demo](#)** (Coming Soon)
