import type { Metadata } from "next";
import "@/design-system/tokens.css";
import "@/design-system/globals.css";
import "@/design-system/components.css";
import "@/features/live/live.css";

export const metadata: Metadata = {
  title: "SunSun AI | 授業改善支援システム",
  description:
    "リアルタイム文字起こし、弾幕コメント、AI授業改善レポートを扱う教員向けMVPです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
