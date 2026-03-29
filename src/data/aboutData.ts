// src/data/aboutData.ts
import { Globe, Code2, FileText, Zap, Award, Target, Github, Linkedin, Heart, Users, Lightbulb } from 'lucide-react';

import { LineIcon } from '@/components/icons/LineIcon';
import { XIcon } from '@/components/icons/XIcon';

// プロジェクトデータ
export const projects = [
  {
    title: 'International Portfolio',
    url: 'https://www.shoto.tech/',
    description: '英語圏向けのポートフォリオサイト（開発中）。Three.jsを使った3Dインタラクティブデザイン',
    icon: Globe,
    color: '#0066FF',
    tag: 'In Progress'
  },
  {
    title: 'Sho-tolog',
    url: 'https://sho-tolog.com/',
    description: 'Web開発や思考を発信しているプライベートブログ',
    icon: FileText,
    color: '#10B981',
    tag: 'Blog'
  }
];

// SNSデータ（4つ）
export const socialLinks = [
  {
    icon: LineIcon,
    label: 'LINE',
    url: 'https://line.me/ti/p/shoto0720',
    color: '#06C755'
  },
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/shotocodes',
    color: '#333'
  },
  {
    icon: XIcon,
    label: 'X',
    url: 'https://x.com/ShotoMoriyama',
    color: '#1DA1F2'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shotomoriyama/',
    color: '#0A66C2'
  },
];

// スキルデータ
export const skills = [
  { name: 'Next.js', level: 5, category: 'Frontend' },
  { name: 'React', level: 5, category: 'Frontend' },
  { name: 'TypeScript', level: 4, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 5, category: 'Design' },
  { name: 'Figma', level: 4, category: 'Design' },
  { name: 'Node.js', level: 3, category: 'Backend' },
  { name: 'WordPress', level: 4, category: 'CMS' },
  { name: 'Framer Motion', level: 5, category: 'Animation' }
];

// 経歴データ
export const timeline = [
  {
    year: '2020',
    title: 'Web開発を開始',
    description: '独学でプログラミングとデザインを学び始める',
    icon: Code2,
    color: '#0066FF'
  },
  {
    year: '2021',
    title: 'フリーランス活動開始',
    description: '企画・デザイン・コーディングを一貫して提供',
    icon: Zap,
    color: '#10B981'
  },
  {
    year: '2022',
    title: 'タイ移住',
    description: 'バンコクとチェンマイを拠点にリモートワーク開始',
    icon: Globe,
    color: '#9333EA'
  },
  {
    year: '2023',
    title: '保守契約開始',
    description: '継続的なサポート体制を確立し、長期パートナーとして活動',
    icon: Award,
    color: '#FF8C42'
  },
  {
    year: '2024',
    title: '現在',
    description: '厳選した案件のみ受注し、1件1件に全力投球',
    icon: Target,
    color: '#10B981'
  }
];

// 価値観データ
export const values = [
  {
    icon: Heart,
    title: '品質へのこだわり',
    description: '妥協のない品質で、お客様の期待を超える成果物をお届けします',
    color: '#FF6B6B'
  },
  {
    icon: Users,
    title: 'コミュニケーション',
    description: '丁寧なヒアリングと定期的な報告で、安心してお任せいただけます',
    color: '#4ECDC4'
  },
  {
    icon: Lightbulb,
    title: '創造性',
    description: '最新技術とデザインで、独自性のあるソリューションを提供します',
    color: '#FFE66D'
  },
  {
    icon: Zap,
    title: 'スピード',
    description: '迅速な対応と効率的な制作で、スケジュール通りに納品します',
    color: '#9333EA'
  }
];
