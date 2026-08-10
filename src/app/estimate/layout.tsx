import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '無料診断 - 工務店・不動産会社のサイト診断',
  description:
    '工務店・不動産会社のサイトの改善点を、スマホ表示速度・問い合わせ導線・実績の見せ方の3点から無料で診断します。',
};

export default function EstimateLayout({ children }: { children: ReactNode }) {
  return children;
}
