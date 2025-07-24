# tutor.ly Setup Instructions

## AI Tutor Chat Setup

### 1. Get OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Go to your dashboard and create an API key
4. Copy the API key

### 2. Environment Variables

Create a `.env.local` file in the root directory with:

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=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

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=tutor.ly
```

### 3. Model Information

The AI tutor uses the **Qwen 3 32B** model via OpenRouter with Groq provider:
- Model ID: `qwen/qwen3-32b`
- Provider: Groq (fast inference)
- Excellent for educational conversations
- High performance with 32B parameters
- Fast response times via Groq
- Supports long context conversations

### 4. Features

✅ **Full Chat Interface**
- Modern, responsive design
- Real-time messaging
- Message history
- Copy/feedback buttons
- Auto-scroll to latest message
- Typing indicators

✅ **AI Tutor Capabilities**
- Educational explanations
- Step-by-step breakdowns
- Examples and analogies
- Follow-up questions
- Adaptive teaching style
- Encouraging and supportive

✅ **Technical Features**
- OpenRouter API integration with Groq provider
- Error handling
- Loading states
- Message timestamps
- Back to dashboard navigation

### 5. Usage

1. Start the development server: `npm run dev`
2. Navigate to the dashboard
3. Click on "AI Tutor" card
4. Start chatting with your AI tutor!

### 6. API Endpoint

The chat functionality uses `/api/chat` which:
- Accepts POST requests with messages array
- Adds educational system prompt
- Calls OpenRouter API with Qwen 3 32B via Groq
- Returns formatted responses
- Handles errors gracefully

### 7. Model Configuration

The API is configured to:
- Use Groq provider specifically for fast inference
- No fallbacks (groq only)
- 2000 max tokens for longer responses
- Temperature 0.7 for balanced creativity/accuracy 