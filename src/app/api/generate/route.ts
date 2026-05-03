import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_PROMPT_LENGTH = 4000;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

    const trimmedPrompt = prompt.length > MAX_PROMPT_LENGTH
      ? prompt.slice(0, MAX_PROMPT_LENGTH)
      : prompt;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: trimmedPrompt,
      n: 1,
      size: "1024x1792",
      quality: "standard",
      response_format: "b64_json",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: "No image returned" }, { status: 500 });

    const url = `data:image/png;base64,${b64}`;
    return NextResponse.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Image generation failed";
    console.error("[generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
