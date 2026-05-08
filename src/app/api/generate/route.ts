import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 120;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeReferenceImages(images: string[]): Promise<string> {
  const content: OpenAI.Chat.ChatCompletionContentPart[] = [
    {
      type: "text",
      text: `You are a professional product analyst. Analyze these reference images and extract precise details for use in image generation.

Extract and describe in English:
1. PRODUCT: exact shape, size, form factor, packaging type
2. COLORS: primary colors, accent colors, gradients, metallic/matte finishes
3. TEXTURES: surface materials, finish quality, tactile impressions
4. BRANDING: logo placement, label design, typography on packaging
5. STYLE SIGNALS: overall aesthetic (luxury/casual/clinical/natural etc.)
6. KEY VISUAL ELEMENTS: unique design details that must be preserved

Be specific and concrete. This description will be used to generate a matching product image.`,
    },
    ...images.slice(0, 4).map(
      (url): OpenAI.Chat.ChatCompletionContentPart => ({
        type: "image_url",
        image_url: { url, detail: "high" },
      })
    ),
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content }],
    max_tokens: 600,
  });

  return response.choices[0]?.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { prompt, images } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

    let finalPrompt = prompt;

    if (images && Array.isArray(images) && images.length > 0) {
      const analysis = await analyzeReferenceImages(images);
      finalPrompt = `${prompt}

━━ REFERENCE PRODUCT ANALYSIS (from uploaded images) ━━
${analysis}

CRITICAL: The product shown in the generated image must visually match the reference analysis above. Preserve the exact product colors, packaging shape, and brand identity described.`;
    }

    const response = await openai.images.generate({
      model: "gpt-image-1",
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
