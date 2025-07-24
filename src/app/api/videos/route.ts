import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json() as { topic: string };

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    /* ------------------------------------------------------------------ */
    /* 1.  CALL LLM → Generate Manim script                               */
    /* ------------------------------------------------------------------ */
    const LLM_PROMPT = `
You are an expert math animator using the Manim Community library (v0.18.0).
Write a Python script that defines *one* Scene class which visually explains:
"${topic.trim()}".

Constraints:
- Use only Manim Community syntax.
- Name the scene class "VideoScene".
- Do NOT include \`\`\` fences or extra commentary.
- Keep the animation under 30 seconds.`;

    const llmResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/devstral-medium',
        messages: [{ role: 'user', content: LLM_PROMPT }],
        temperature: 0.6
      })
    });

    if (!llmResponse.ok) {
      const err = await llmResponse.text();
      return NextResponse.json({ error: `LLM error: ${err}` }, { status: 502 });
    }

    const llmData = await llmResponse.json();
    const manimScript: string = llmData.choices?.[0]?.message?.content?.trim();

    console.log('Generated Manim script:', manimScript);

    if (!manimScript) {
      return NextResponse.json({ error: 'LLM returned empty script' }, { status: 500 });
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
