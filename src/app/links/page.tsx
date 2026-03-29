// src/app/links/page.tsx
import type { Metadata } from 'next';
import LinksContent from './LinksContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://shotomoriyama.com'),
  title: 'Shoto Moriyama | Links',
  description: 'AI × フルスタックエンジニア。大工→エンジニア。AIでWeb制作を爆速化。',
  openGraph: {
    type: 'website',
    url: 'https://shotomoriyama.com/links',
    title: 'Shoto Moriyama | Links',
    description: 'AI × フルスタックエンジニア。大工→エンジニア。AIでWeb制作を爆速化。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shoto Moriyama Links',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoto Moriyama | Links',
    description: 'AI × フルスタックエンジニア。大工→エンジニア。AIでWeb制作を爆速化。',
    images: ['/og-image.png'],
    creator: '@ShotoMoriyama',
  },
};

export default function LinksPage() {
  return <LinksContent />;
}
