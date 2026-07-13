// src/data/supportArticles.tsx
import React from 'react';
import {
  Camera,
  FileText,
  Palette,
  Pencil,
  FolderOpen,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  RefreshCw,
  Server,
  Search,
  Sparkles,
  Wand2,
  Code2
} from 'lucide-react';

// 全記事のメタデータ（本文が未執筆のものも含むマスターリスト）
const allSupportArticleMeta = [
  // AI活用
  {
    icon: Sparkles,
    title: 'AI でデザイン提案',
    description: 'Claude、ChatGPT を使った最適なデザイン提案。人間では思いつかない視点も。',
    color: '#9333EA',
    category: 'ai',
    categoryLabel: 'AI活用',
    slug: 'ai-design'
  },
  {
    icon: Wand2,
    title: 'AI イラスト生成',
    description: 'MidJourney、DALL-E で高品質なオリジナル画像を作成。コストも時間も削減。',
    color: '#8B5CF6',
    category: 'ai',
    categoryLabel: 'AI活用',
    slug: 'ai-illustration'
  },
  {
    icon: Code2,
    title: 'AI コーディング',
    description: 'AI 支援でバグの少ない高品質なコード。レスポンシブ対応も完璧に。',
    color: '#A855F7',
    category: 'ai',
    categoryLabel: 'AI活用',
    slug: 'ai-coding'
  },

  // 制作ガイド
  {
    icon: FileText,
    title: 'サイト制作の流れ',
    description: '発注から納品までの全ステップを詳しく解説。初めての方も安心。',
    color: '#FFD93D',
    category: 'guide',
    categoryLabel: '制作ガイド',
    slug: 'production-flow'
  },
  {
    icon: Palette,
    title: 'デザインの決め方',
    description: 'イメージを言葉にするヒント。参考サイトの探し方も。',
    color: '#FFA559',
    category: 'guide',
    categoryLabel: '制作ガイド',
    slug: 'design-decision'
  },

  // 準備
  {
    icon: Pencil,
    title: '原稿の書き方',
    description: '魅力的なキャッチコピーと説明文の作り方。伝わる文章のコツ。',
    color: '#FF6B9D',
    category: 'prepare',
    categoryLabel: '準備',
    slug: 'copywriting'
  },
  {
    icon: Camera,
    title: '写真撮影のコツ',
    description: 'スマホでもOK！プロ並みの商品写真を撮る方法。',
    color: '#FF8AAE',
    category: 'prepare',
    categoryLabel: '準備',
    slug: 'photo-tips'
  },
  {
    icon: FolderOpen,
    title: '素材の準備方法',
    description: 'ロゴ、写真、テキスト。何をどう準備すればいい？完全ガイド。',
    color: '#C5A880',
    category: 'prepare',
    categoryLabel: '準備',
    slug: 'material-preparation'
  },

  // 戦略
  {
    icon: Users,
    title: 'ターゲット設定',
    description: '誰に届けたい？ペルソナ設定で効果的なサイトに。',
    color: '#4ECDC4',
    category: 'strategy',
    categoryLabel: '戦略',
    slug: 'target-setting'
  },
  {
    icon: Target,
    title: 'サイトの目的',
    description: '問い合わせ？販売？目的を明確にして成果を出す。',
    color: '#10B981',
    category: 'strategy',
    categoryLabel: '戦略',
    slug: 'site-purpose'
  },

  // 運用
  {
    icon: TrendingUp,
    title: 'SNS 連携のコツ',
    description: 'Instagram、X との連携で集客力アップ。',
    color: '#FFB4B4',
    category: 'operation',
    categoryLabel: '運用',
    slug: 'sns-integration'
  },
  {
    icon: MessageCircle,
    title: '問い合わせ対応',
    description: '初回返信のテンプレートと好印象を与えるコツ。',
    color: '#FFB4D5',
    category: 'operation',
    categoryLabel: '運用',
    slug: 'inquiry-response'
  },
  {
    icon: RefreshCw,
    title: '更新のタイミング',
    description: 'いつ何を更新する？効果的な情報発信のスケジュール。',
    color: '#D4A5A5',
    category: 'operation',
    categoryLabel: '運用',
    slug: 'update-timing'
  },

  // 技術
  {
    icon: Server,
    title: 'レンタルサーバー選び',
    description: '初心者向けサーバーの選び方と設定方法を解説。',
    color: '#A0C4FF',
    category: 'technical',
    categoryLabel: '技術',
    slug: 'rental-server'
  },
  {
    icon: Search,
    title: 'SEO 基礎知識',
    description: '検索エンジン最適化の基本を初心者向けに解説。',
    color: '#B4D4FF',
    category: 'technical',
    categoryLabel: '技術',
    slug: 'seo-basics'
  }
];

export interface SupportArticle {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
}

 import copywriting from '@/content/support/copywriting';
import photoTips from '@/content/support/photo-tips';
import productionFlow from '@/content/support/production-flow';
import aiDesign from '@/content/support/ai-design';
import seoBasics from '@/content/support/seo-basics';
import designCommunication from '@/content/support/design-communication';

export const supportArticles: Record<string, SupportArticle> = {
  'copywriting': copywriting,
  'photo-tips': photoTips,
  'production-flow': productionFlow,
  'ai-design': aiDesign,
  'seo-basics': seoBasics,
  'design-decision': designCommunication,
};

// 一覧・リンクには本文が存在する記事だけを公開する
// （マスターリストとのずれによる 404 リンクを防ぐ）
export const supportArticleMeta = allSupportArticleMeta.filter(
  (article) => article.slug in supportArticles
);
