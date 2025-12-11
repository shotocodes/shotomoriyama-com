import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "森山翔登 | Web制作・デザイン",
  description: "フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。一から丁寧に、想いを形に。",
  keywords: ["Web制作", "ホームページ制作", "デザイン", "フリーランス", "森山翔登"],
  authors: [{ name: "森山翔登" }],
  creator: "森山翔登",

  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://shotomoriyama.jp",
    siteName: "森山翔登 | Web制作・デザイン",
    title: "森山翔登 | Web制作・デザイン",
    description: "フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "森山翔登 Web制作・デザイン",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "森山翔登 | Web制作・デザイン",
    description: "フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。",
    images: ["/og-image.png"],
    creator: "@SOAR_C72",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
