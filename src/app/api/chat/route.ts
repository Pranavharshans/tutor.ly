import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Chat API Route Called ===');
    console.log('All environment variables starting with OPENROUTER:', Object.keys(process.env).filter(key => key.startsWith('OPENROUTER')));
    console.log('process.env.OPENROUTER_API_KEY exists:', !!process.env.OPENROUTER_API_KEY);
    console.log('process.env.OPENROUTER_API_KEY length:', process.env.OPENROUTER_API_KEY?.length || 0);
    
    const { messages } = await request.json();
    console.log('Received messages:', messages?.length || 0);

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Use Groq API
    let apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('GROQ_API_KEY not found');
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    const systemMessage = {
      role: 'system',
      content: 'You are a helpful AI tutor that provides educational assistance, explanations, and guidance to students.'
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-405b-reasoning',
        messages: [systemMessage, ...messages]
      })
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