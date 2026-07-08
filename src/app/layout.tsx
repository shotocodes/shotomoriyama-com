import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants/site'

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | 森山翔登`,
  },
  icons: {
  icon: '/favicon.png',
  apple: '/apple-touch-icon.png',
 },
  description: SITE_DESCRIPTION,
  keywords: ["Web制作", "ホームページ制作", "デザイン", "フリーランス", "森山翔登"],
  authors: [{ name: "森山翔登" }],
  creator: "森山翔登",
  alternates: {
    canonical: './',
  },

  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
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
    title: SITE_NAME,
    description: "フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。",
    images: ["/og-image.png"],
    creator: "@SOAR_C72",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: '8Da6L5wPaTelDi1AJvolxMsRJlLjk9hpb3IFyr8rTCU',
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
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
