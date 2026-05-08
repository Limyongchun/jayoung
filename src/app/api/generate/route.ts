import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 120;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { prompt, referenceAnalysis } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

    let finalPrompt = prompt;

    if (referenceAnalysis) {
      finalPrompt = `${prompt}

━━ PRODUCT IDENTITY (from analyzed reference photos — MUST be consistent) ━━
${referenceAnalysis}

MANDATORY: Every visual element of the product in this image must exactly match the product identity above.
Same colors, same shape, same packaging, same brand details. Non-negotiable consistency.`;
    }

    const response = await openai.images.generate({
      model: "chatgpt-image-latest",
      prompt: finalPrompt,
      n: 1,
      size: "1024x1024",
      quality: "high",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: "No image returned" }, { status: 500 });
    return NextResponse.json({ url: `data:image/png;base64,${b64}` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Image generation failed";
    console.error("[generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
