import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic, numCards } = await request.json();

    if (!topic || !numCards) {
      return NextResponse.json({ error: 'Topic and number of cards are required' }, { status: 400 });
    }

    // Same API key handling as in chat route
    let apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      apiKey = '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';
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nousresearch/nous-capybara-7b:free',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI that generates flashcards. Respond with a JSON array of objects, each with "front" and "back" strings.'
          },
          {
            role: 'user',
            content: `Generate exactly ${numCards} flashcards on the topic: ${topic}. Each flashcard should have a front (question or term) and back (answer or definition). Output only the JSON array.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: `API error: ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    let flashcards;
    try {
      flashcards = JSON.parse(content);
      if (!Array.isArray(flashcards) || flashcards.length !== numCards) {
        throw new Error('Invalid flashcards format');
      }
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to parse flashcards' }, { status: 500 });
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Flashcards API error:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
} 