import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Support - 制作ノート',
  description:
    'Webサイト制作をスムーズに進めるためのガイド集。原稿の書き方、写真撮影のコツ、AI活用、SEOの基礎などを解説します。',
};

export default function SupportLayout({ children }: { children: ReactNode }) {
  return children;
}
