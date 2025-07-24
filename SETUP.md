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
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=tutor.ly
```

### 3. Model Information

The AI tutor uses the **Qwen 2.5 14B Instruct** model via OpenRouter:
- Model ID: `qwen/qwen-2.5-14b-instruct`
- Great for educational conversations
- Balanced between performance and cost
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
- OpenRouter API integration
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
- Calls OpenRouter API with Qwen model
- Returns formatted responses
- Handles errors gracefully 