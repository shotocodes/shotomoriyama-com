import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Works - 制作実績',
  description:
    'Webサイト制作・デザインの制作実績と個人プロジェクトをご紹介します。クライアントの声も掲載しています。',
};

export default function WorksLayout({ children }: { children: ReactNode }) {
  return children;
}
