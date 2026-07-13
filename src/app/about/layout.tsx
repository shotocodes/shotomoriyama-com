import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About - 私について',
  description:
    'フリーランス Web デザイナー・エンジニア 森山翔登のプロフィール。経歴、スキル、制作で大切にしていることをご紹介します。',
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
