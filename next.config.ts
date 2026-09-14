// next.config.ts
import type { NextConfig } from "next";

// 全レスポンス共通のセキュリティヘッダー。
// HSTS は Vercel が本番ドメインに自動付与するためここでは持たない。
// CSP は Three.js / GA / インライン初期化スクリプトの棚卸しが必要なので別途。
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    // next/image 経由の画像を AVIF 優先（非対応ブラウザは WebP）で配信する
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
