import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { toFile } from "openai";

export const maxDuration = 120;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/png";
  const buffer = Buffer.from(base64, "base64");
  return toFile(buffer, filename, { type: mime });
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { prompt, images } = await req.json();
    if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

    let b64: string | undefined;

    if (images && Array.isArray(images) && images.length > 0) {
      const imageFiles = await Promise.all(
        images.slice(0, 4).map((dataUrl: string, i: number) =>
          dataUrlToFile(dataUrl, `reference-${i}.png`)
        )
      );

      const response = await openai.images.edit({
        model: "gpt-image-1",
        image: imageFiles[0],
        ...(imageFiles.length > 1 ? { mask: undefined } : {}),
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "high",
      });
      b64 = response.data?.[0]?.b64_json;
    } else {
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "high",
      });
      b64 = response.data?.[0]?.b64_json;
    }

    if (!b64) return NextResponse.json({ error: "No image returned" }, { status: 500 });
    return NextResponse.json({ url: `data:image/png;base64,${b64}` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Image generation failed";
    console.error("[generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
