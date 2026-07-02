# CLAUDE.md — tutor.ly

AI-powered educational platform: AI tutor chat, flashcards, and animated educational videos.

## Architecture

- **Frontend**: Next.js 15 App Router (React 19, TypeScript, Tailwind 4)
- **Backend**: Python FastAPI for Manim video rendering
- **AI**: OpenRouter API with multiple model providers

## Key files

- `src/app/api/chat/route.ts` — Chat endpoint: LLaMA 4 Maverick via Cerebras
- `src/app/api/flashcards/route.ts` — Flashcard generator: Mistral Small 3.2 24B
- `src/app/api/videos/route.ts` — Video endpoint: generates Manim script, posts to FastAPI backend
- `backend/app.py` — FastAPI server: accepts Manim script, renders MP4, serves the file

## Running

```bash
# Terminal 1: frontend
npm install && npm run dev

# Terminal 2: video backend
cd backend && pip install -r requirements.txt && uvicorn app:app --port 8000
```

Requires `OPENROUTER_API_KEY` in `.env.local`.

## Key dependencies

- `framer-motion` — animations
- `react-markdown` — chat message rendering
- `manim` — video generation (backend)
- `lucide-react` — icons
