import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Add system message to make the AI act as a helpful tutor
    const systemMessage: Message = {
      role: 'system',
      content: `You are an AI tutor designed to help students learn effectively. Your role is to:

1. Provide clear, educational explanations on any topic
2. Break down complex concepts into simple, understandable parts
3. Use examples and analogies to make learning easier
4. Encourage critical thinking by asking follow-up questions
5. Be patient, supportive, and motivating
6. Adapt your teaching style to the student's level of understanding
7. Provide step-by-step solutions when needed
8. Suggest additional resources or practice when appropriate

Always maintain a friendly, encouraging tone and focus on helping the student truly understand the material rather than just giving answers.`
    };

    const apiMessages = [systemMessage, ...messages];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'tutor.ly',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-32b',
        messages: apiMessages,
        provider: {
          order: ['groq'],
          allow_fallbacks: false
        },
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter');
    }

    return NextResponse.json({
      content: data.choices[0].message.content,
      usage: data.usage,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 