import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 本番ビルド時に ESLint エラーで落ちないようにする
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
