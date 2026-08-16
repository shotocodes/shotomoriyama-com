import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Service - 工務店・不動産会社向けサイト制作',
  description:
    '工務店・不動産会社向けホームページ制作パッケージ（398,000円(税別)・約2週間納品）。保守・運用プラン、施工事例の制作代行、無料診断のご案内。',
};

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
