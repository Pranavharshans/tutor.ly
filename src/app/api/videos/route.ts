import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('=== Videos API Route Called ===');
    const { topic } = await req.json() as { topic: string };
    console.log('Received topic:', topic);

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    /* ------------------------------------------------------------------ */
    /* 1.  CALL LLM → Generate Manim script                               */
    /* ------------------------------------------------------------------ */
    
    // Check API key
    let apiKey = process.env.OPENROUTER_API_KEY;
    
    // Fallback: if env var doesn't work, use the key directly (same as chat route)
    if (!apiKey) {
      console.log('Environment variable not found, using fallback API key');
      apiKey = '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';
    }
    
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);
    
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not found');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }
    
    const LLM_PROMPT = `
You are an expert math animator using the Manim Community library (v0.18.0).
Write a Python script that defines *one* Scene class which visually explains:
"${topic.trim()}".

Constraints:
- Use only Manim Community syntax.
- Name the scene class "VideoScene".
- Do NOT include \`\`\` fences or extra commentary.
- Keep the animation under 30 seconds.
- Return ONLY valid Python code without any markdown formatting.`;

    console.log('Calling OpenRouter API...');
    
    const llmResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/devstral-medium',
        messages: [{ role: 'user', content: LLM_PROMPT }],
        temperature: 0.6
      })
    });

    console.log('OpenRouter response status:', llmResponse.status);

    if (!llmResponse.ok) {
      const err = await llmResponse.text();
      console.error('OpenRouter API error:', err);
      return NextResponse.json({ error: `LLM error: ${err}` }, { status: 502 });
    }

    const llmData = await llmResponse.json();
    console.log('OpenRouter response received');
    
    const manimScript: string = llmData.choices?.[0]?.message?.content?.trim();

    console.log('Generated Manim script length:', manimScript?.length || 0);
    console.log('Generated Manim script preview:', manimScript?.substring(0, 200));

    if (!manimScript) {
      console.log('LLM returned empty script, using fallback');
      // Fallback script if LLM fails
      const fallbackScript = `from manim import *

class VideoScene(Scene):
    def construct(self):
        # Title about the topic
        title = Text("${topic.replace(/"/g, '\\"')}", font_size=48)
        self.play(Write(title))
        self.wait(1)
        
        # Add some basic explanation
        explanation = Text("An educational animation", font_size=24).next_to(title, DOWN)
        self.play(Write(explanation))
        self.wait(2)
        
        # Simple fade out
        self.play(FadeOut(title), FadeOut(explanation))
        self.wait(1)`;
        
      console.log('Using fallback script for topic:', topic);
      
      // Continue with fallback script
      const renderWorkerURL = process.env.LOCAL_RENDER_URL ?? 'http://127.0.0.1:8000/render';
      console.log('Sending fallback script to local backend:', renderWorkerURL);
      
      const renderResp = await fetch(renderWorkerURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: fallbackScript })
      });

      if (!renderResp.ok) {
        const err = await renderResp.text();
        console.error('Local backend error with fallback:', err);
        return NextResponse.json({ error: `Local backend error: ${err}` }, { status: 502 });
      }

      const renderData = await renderResp.json();
      console.log('Local backend response for fallback:', renderData);
      
      const { videoUrl } = renderData;

      if (!videoUrl) {
        return NextResponse.json({ error: 'No videoUrl from local backend (fallback)' }, { status: 500 });
      }

      const fullVideoUrl = videoUrl.startsWith('http') ? videoUrl : `http://127.0.0.1:8000${videoUrl}`;

      return NextResponse.json({ 
        videoUrl: fullVideoUrl, 
        manimScript: fallbackScript,
        notice: 'Generated using fallback script due to LLM unavailability'
      }, { status: 200 });
    }

    /* ------------------------------------------------------------------ */
    /* 2.  SEND SCRIPT TO LOCAL BACKEND WORKER                            */
    /* ------------------------------------------------------------------ */
    const renderWorkerURL = process.env.LOCAL_RENDER_URL ?? 'http://127.0.0.1:8000/render';

    console.log('Sending script to local backend:', renderWorkerURL);
    
    const renderResp = await fetch(renderWorkerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: manimScript })
    });

    if (!renderResp.ok) {
      const err = await renderResp.text();
      console.error('Local backend error:', err);
      return NextResponse.json({ error: `Local backend error: ${err}` }, { status: 502 });
    }

    const renderData = await renderResp.json();
    console.log('Local backend response:', renderData);
    
    const { videoUrl } = renderData;

    if (!videoUrl) {
      return NextResponse.json({ error: 'No videoUrl from local backend', manimScript }, { status: 500 });
    }

    // Convert relative URL to full URL for the local backend
    const fullVideoUrl = videoUrl.startsWith('http') ? videoUrl : `http://127.0.0.1:8000${videoUrl}`;

    /* ------------------------------------------------------------------ */
    /* 3.  RETURN VIDEO URL AND SCRIPT TO FRONT-END                       */
    /* ------------------------------------------------------------------ */
    return NextResponse.json({ videoUrl: fullVideoUrl, manimScript }, { status: 200 });

  } catch (err: unknown) {
    let message = 'Unexpected server error';
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
