import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { images } = await req.json();
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "images required" }, { status: 400 });
    }

    const content: OpenAI.Chat.ChatCompletionContentPart[] = [
      {
        type: "text",
        text: `You are a professional product visual analyst for Korean e-commerce.
Analyze these product reference images and extract an exhaustive, precise product identity document.
This document will be used to ensure EVERY generated detail page section shows the EXACT SAME product consistently.

Extract and describe:

PRODUCT FORM:
- Exact shape and silhouette (bottle, box, tube, pouch, jar, etc.)
- Dimensions and proportions (tall/wide/slim/compact)
- Any special structural features (pump cap, flip lid, embossed details)

COLORS (be very specific with hex-like descriptions):
- Primary body color(s)
- Cap/closure color
- Label/packaging colors
- Any metallic, matte, or glossy finish distinctions
- Accent colors

BRAND & TYPOGRAPHY ON PACKAGING:
- Brand name exact text and placement
- Logo style (icon-only, wordmark, combination)
- Any Korean/English text visible on packaging
- Label design pattern (minimal, illustrated, typographic)

MATERIALS & FINISH:
- Packaging material (glass, plastic, matte paper, foil)
- Surface finish (glossy, matte, satin, metallic)
- Transparency (opaque, frosted, clear)

UNIQUE IDENTIFIERS:
- Any distinctive design details that make this product instantly recognizable
- What makes this product visually unique vs. generic versions

Write in English. Be extremely specific and concrete. Avoid vague descriptions.`,
      },
      ...images.slice(0, 4).map(
        (url: string): OpenAI.Chat.ChatCompletionContentPart => ({
          type: "image_url",
          image_url: { url, detail: "high" },
        })
      ),
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content }],
      max_tokens: 800,
    });

    const analysis = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ analysis });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    console.error("[analyze]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
