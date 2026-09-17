# ATS CV Builder

**Build. Optimize. Get Hired.**

A full-stack, production-quality ATS CV Builder powered by Google Gemini AI.

## Features

- 🏗️ **Build from scratch** — Complete multi-step wizard with 14 sections
- 📤 **Upload & Parse** — Import existing PDF or DOCX with AI extraction
- 📊 **ATS Score Analysis** — Real-time 100-point compatibility scoring
- ✨ **AI Optimization** — Gemini-powered content improvement suggestions
- 🎨 **6 Professional Templates** — Classic ATS, Modern, Minimal, Executive, Technical, Academic
- ⬇️ **PDF & DOCX Export** — Download in any format

## Setup

### 1. Configure Gemini API Key

```bash
# Add your Gemini API key to server/.env
echo "GEMINI_API_KEY=your_key_here" > server/.env
```

Get a free API key at: https://aistudio.google.com/

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 3. Run Development Server

```bash
# From ats-cv-builder/ directory — runs both client and server
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### 4. Build for Production

```bash
npm run build          # Build frontend
npm run build:server   # Build backend
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| State | Zustand (localStorage persistence) |
| Backend | Node.js + Express + TypeScript |
| AI | Google Gemini API (backend only) |
| PDF Parse | pdf-parse + mammoth |
| PDF Generate | Puppeteer |
| DOCX Generate | docx npm package |

## Important Notes

- **ATS Compatibility Score** is an estimate only — it measures compliance with common ATS-friendly formatting practices, not the output of any specific ATS system.
- The AI assistant **never invents** roles, companies, degrees, or other credentials. It only improves the phrasing of information you provide.
- API keys are stored server-side only and never exposed to the browser.
