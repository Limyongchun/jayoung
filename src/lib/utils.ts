import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SectionType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function downloadImage(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function stitchImages(urls: string[], width = 860): Promise<string> {
  const images = await Promise.all(
    urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        })
    )
  );
  const totalHeight = images.reduce((h, img) => h + (img.height * width) / img.width, 0);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(totalHeight);
  const ctx = canvas.getContext("2d")!;
  let y = 0;
  for (const img of images) {
    const h = (img.height * width) / img.width;
    ctx.drawImage(img, 0, y, width, h);
    y += h;
  }
  return canvas.toDataURL("image/png");
}

export function generatePlaceholderDataUrl(label: string, color: string, width = 860, height = 1000): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = color + "22";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = color + "55";
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.strokeRect(10, 10, width - 20, height - 20);
  ctx.fillStyle = color;
  ctx.font = "bold 28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, width / 2, height / 2 - 16);
  ctx.font = "18px sans-serif";
  ctx.fillStyle = color + "bb";
  ctx.fillText("이미지 생성 완료", width / 2, height / 2 + 20);
  return canvas.toDataURL("image/png");
}

const SECTION_COLORS: Record<SectionType, string> = {
  hero: "#6366f1",
  problem: "#ef4444",
  benefits: "#10b981",
  lifestyle: "#f59e0b",
  detail: "#3b82f6",
  comparison: "#8b5cf6",
  trust: "#14b8a6",
  components: "#f97316",
  howto: "#06b6d4",
  cta: "#ec4899",
};

export function getSectionColor(type: SectionType) {
  return SECTION_COLORS[type] ?? "#6b7280";
}
