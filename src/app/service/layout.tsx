import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { productionPackage } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Service - 工務店・不動産会社向けサイト制作',
  description: `工務店・不動産会社向けホームページ制作パッケージ（${productionPackage.priceLabel}・${productionPackage.delivery}納品）。保守・運用プラン、施工事例の制作代行、無料診断のご案内。`,
};

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
