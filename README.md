# tutor.ly

AI-powered educational platform with three core features: an AI tutor chat, smart flashcard generation, and AI-generated animated educational videos.

## Features

- **AI Tutor Chat** — Conversational AI tutor using OpenRouter API (LLaMA 4 Maverick via Cerebras) with Markdown rendering and multi-turn context
- **Smart Flashcards** — Generate interactive flip-card study sets from any topic using Mistral Small 3.2 24B
- **AI-Generated Videos** — Educational animations rendered by Manim from LLM-generated scripts via a FastAPI backend

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Python FastAPI, Manim |
| AI | OpenRouter API (LLaMA 4 Maverick, Mistral Small 3.2, Qwen 3 32B) |

## Setup

### Frontend

```bash
npm install
```

Create `.env.local`:
```
OPENROUTER_API_KEY=sk-or-...
```

```bash
npm run dev
```

The frontend starts at `http://localhost:3000`.

### Backend (Video Rendering)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --port 8000
```

The video rendering backend starts at `http://localhost:8000`.

## Usage

1. Navigate to `http://localhost:3000`
2. Go to **Dashboard** to access all three tools
3. **AI Tutor**: Ask questions and get educational explanations
4. **Flashcards**: Enter a topic and study with interactive flip-cards
5. **Videos**: Enter a topic and watch a generated Manim animation

## Project Structure

```
tutor.ly/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Landing page
│   │   ├── dashboard/page.tsx      # Dashboard
│   │   ├── chat/page.tsx           # AI Tutor chat
│   │   ├── flashcards/page.tsx     # Flashcard generator and viewer
│   │   ├── videos/page.tsx         # Video generation page
│   │   └── api/
│   │       ├── chat/route.ts       # Chat API route
│   │       ├── flashcards/route.ts # Flashcard generation API
│   │       └── videos/route.ts     # Video generation API
│   ├── components/ui/              # UI components
│   └── lib/utils.ts                # Utility helpers
├── backend/
│   ├── app.py                      # FastAPI server for Manim rendering
│   └── requirements.txt
├── package.json
├── SETUP.md                        # Detailed setup guide
└── tsconfig.json
```

## API Keys

This project uses OpenRouter for AI inference. See [SETUP.md](SETUP.md) for detailed instructions on obtaining and configuring your API key.
