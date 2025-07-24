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
    /* 2.  SEND SCRIPT TO RENDER.COM WORKER                               */
    /* ------------------------------------------------------------------ */
    const renderWorkerURL = process.env.RENDER_WORKER_URL ?? 'https://your-render-worker.onrender.com/render';

    const renderResp = await fetch(renderWorkerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: manimScript })
    });

    if (!renderResp.ok) {
      const err = await renderResp.text();
      return NextResponse.json({ error: `Render worker error: ${err}` }, { status: 502 });
    }

    const { videoUrl } = await renderResp.json();

    if (!videoUrl) {
      return NextResponse.json({ error: 'No videoUrl from worker', manimScript }, { status: 500 });
    }

    /* ------------------------------------------------------------------ */
    /* 3.  RETURN VIDEO URL AND SCRIPT TO FRONT-END                       */
    /* ------------------------------------------------------------------ */
    return NextResponse.json({ videoUrl, manimScript }, { status: 200 });

  } catch (err: unknown) {
    let message = 'Unexpected server error';
    if (err instanceof Error) message = err.message;
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
