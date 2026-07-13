// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image 経由の画像を AVIF 優先（非対応ブラウザは WebP）で配信する
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
