import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Flashcards API Route Called ===');
    const { topic, numCards } = await request.json();
    console.log('Received topic:', topic, 'numCards:', numCards);

    if (!topic || !numCards) {
      return NextResponse.json({ error: 'Topic and number of cards are required' }, { status: 400 });
    }

    // Same API key handling as in chat route
    let apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.log('Environment variable not found, using fallback API key');
      apiKey = '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';
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const requestBody = {
      model: 'mistralai/mistral-small-3.2-24b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are an educational AI that generates flashcards. Always respond with a valid JSON array of objects, each with "front" and "back" strings. Do not include any other text or formatting.'
        },
        {
          role: 'user',
          content: `Generate exactly ${numCards} flashcards on the topic: ${topic}. Each flashcard should have a front (question or term) and back (answer or definition). Respond only with a JSON array in this format: [{"front": "question", "back": "answer"}]`
        }
      ],
      temperature: 0.7,
      max_tokens: 8192
    };

    console.log('Sending request to OpenRouter...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'tutor.ly',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json({ error: `API error: ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('OpenRouter response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenRouter response format:', data);
      return NextResponse.json({ error: 'Invalid response format from OpenRouter' }, { status: 500 });
    }

    const content = data.choices[0].message.content;
    console.log('Raw content length:', content?.length);

    // Clean the content and try to extract JSON
    let cleanContent = content.trim();
    
    // Remove markdown code blocks if present
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse the JSON response
    let flashcards;
    try {
      flashcards = JSON.parse(cleanContent);
      
      if (!Array.isArray(flashcards)) {
        throw new Error('Response is not an array');
      }
      
      // Validate each flashcard
      const validFlashcards = flashcards.filter(card => 
        card && typeof card === 'object' && 
        typeof card.front === 'string' && 
        typeof card.back === 'string' &&
        card.front.trim() !== '' && 
        card.back.trim() !== ''
      );

      if (validFlashcards.length === 0) {
        throw new Error('No valid flashcards found');
      }

      console.log(`Successfully parsed ${validFlashcards.length} flashcards`);
      return NextResponse.json({ flashcards: validFlashcards });
      
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Content that failed to parse:', cleanContent);
      
      // Fallback: create default flashcards if parsing fails
      const fallbackCards = Array.from({ length: Math.min(numCards, 5) }, (_, i) => ({
        front: `Question ${i + 1} about ${topic}`,
        back: `Answer ${i + 1} related to ${topic}`
      }));
      
      return NextResponse.json({ 
        flashcards: fallbackCards,
        warning: 'Used fallback flashcards due to parsing error'
      });
    }

  } catch (error) {
    console.error('Flashcards API error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate flashcards',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 