// src/app/links/linksData.ts

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: 'portfolio' | 'globe' | 'note' | 'x' | 'blog' | 'instagram' | 'contact' | 'enso';
  color: string;
  featured?: boolean;
}

export const profile = {
  name: 'Shoto',
  title: 'AI × フルスタックエンジニア',
  bio: 'フルスタックエンジニア。AIでWeb制作を爆速化。',
  avatar: '/c1fb44ab08feb4c5f1fd90ffdf44a2bb.jpeg',
};

export const links: LinkItem[] = [
  {
    id: 'portfolio-jp',
    label: 'Portfolio (JP)',
    url: 'https://shotomoriyama.com',
    icon: 'portfolio',
    color: '#0066FF',
    featured: true,
  },
  {
    id: 'portfolio-en',
    label: 'Portfolio (EN)',
    url: 'https://www.shoto.tech',
    icon: 'globe',
    color: '#4ECDC4',
  },
  {
    id: 'enso',
    label: 'ENSO — Design your days.',
    url: 'https://ensolife.app',
    icon: 'enso',
    color: '#10B981',
    featured: true,
  },
  {
    id: 'note',
    label: 'note',
    url: 'https://note.com/sh0t0',
    icon: 'note',
    color: '#41C9B4',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    url: 'https://x.com/ShotoMoriyama',
    icon: 'x',
    color: '#888888',
  },
  {
    id: 'blog',
    label: '雑記Blog',
    url: 'https://sho-tolog.com',
    icon: 'blog',
    color: '#FF8C42',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/sh0t0x72/',
    icon: 'instagram',
    color: '#E1306C',
  },
  {
    id: 'contact',
    label: 'お仕事のご相談',
    url: 'https://shotomoriyama.com/contact',
    icon: 'contact',
    color: '#FF6B6B',
    featured: true,
  },
];
