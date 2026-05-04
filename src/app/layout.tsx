import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import StorageCleaner from "@/components/StorageCleaner";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jayoung | AI 상세페이지 빌더",
  description: "AI로 만드는 스마트스토어·쿠팡·자사몰 상품 상세페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <body>
        <StorageCleaner />
        {children}
      </body>
    </html>
  );
}
