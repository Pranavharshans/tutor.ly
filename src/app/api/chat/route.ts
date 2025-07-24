import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Chat API Route Called ===');
    
    const { messages } = await request.json();
    console.log('Received messages:', messages?.length || 0);

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
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
    console.log('Sending to OpenRouter with', apiMessages.length, 'messages');

    const requestBody = {
      model: 'qwen/qwen3-32b',
      messages: apiMessages,
      provider: {
        order: ['groq'],
        allow_fallbacks: false
      },
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.9,
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'tutor.ly',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { 
          error: `OpenRouter API error: ${response.status} - ${errorData}`,
          status: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('OpenRouter response data:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenRouter response format:', data);
      return NextResponse.json(
        { error: 'Invalid response format from OpenRouter' },
        { status: 500 }
      );
    }

    const responseContent = data.choices[0].message.content;
    console.log('Returning content length:', responseContent?.length || 0);

    return NextResponse.json({
      content: responseContent,
      usage: data.usage,
    });

  } catch (error) {
    console.error('=== Chat API Route Error ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 