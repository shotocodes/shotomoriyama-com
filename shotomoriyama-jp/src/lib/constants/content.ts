// src/lib/constants/content.ts

export const siteContent = {
  hero: {
    title: 'Web制作・デザイン承ります',
    subtitle: '一から丁寧に、想いを形に',
    cta: {
      primary: 'お問い合わせ',
      secondary: '実績を見る',
    },
  },

  about: {
    title: 'ABOUT',
    subtitle: '事業概要',
    content: `森山翔登と申します。
フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。

【得意なこと】
・企画・設計からデザイン、実装まで一貫対応
・WordPress等のCMS導入
・レスポンシブデザイン
・SEO対策、パフォーマンス最適化

お客様の「想い」や「価値」を理解し、それに相応しいデザインをご提案します。

制作後も安心してご利用いただけるよう、保守・運用サポートも行っております。

まずはお気軽にご相談ください。`,
    name: '森山翔登',
    role: 'Shoto Moriyama',
  },

  service: {
    title: 'SERVICE',
    subtitle: 'サービス内容',
    items: [
      {
        icon: '🌐',
        title: 'Web制作',
        description: 'コーポレートサイト、ランディングページ、WordPress構築など、目的に応じた最適なWebサイトを制作します。',
        features: [
          'コーポレートサイト',
          'ランディングページ',
          'WordPress構築',
          'レスポンシブ対応',
        ],
      },
      {
        icon: '🎨',
        title: 'デザイン',
        description: 'UIデザイン、グラフィックデザイン、ロゴ制作など、ブランディングに必要なデザインを提供します。',
        features: [
          'UIデザイン',
          'グラフィックデザイン',
          'ロゴ・看板制作',
          'ブランディング',
        ],
      },
      {
        icon: '🛠️',
        title: '保守・運用',
        description: 'セキュリティ対応、バックアップ、修正対応など、安心してサイトを運用できるようサポートします。',
        features: [
          'セキュリティ対応',
          'バックアップ',
          '修正対応',
          '相談サポート',
        ],
      },
    ],
  },

  works: {
    title: 'WORKS',
    subtitle: '実績',
    items: [
      {
        id: 1,
        title: '佐藤工務店',
        description: 'コーポレートサイト制作',
        image: '/images/works/sato-kohmuten.png',
        url: 'https://www.sato-kohmuten.com/',
        tags: ['コーポレート', 'WordPress'],
      },
      {
        id: 2,
        title: 'Solar System Portfolio',
        description: 'インタラクティブポートフォリオ',
        image: '/images/works/shoto-tech.png',
        url: 'https://shoto.tech',
        tags: ['ポートフォリオ', 'Three.js'],
      },
      {
        id: 3,
        title: 'ショートの暇つぶしブログ',
        description: '個人ブログサイト',
        image: '/images/works/blog.png',
        url: 'https://your-blog-url.com',
        tags: ['ブログ', 'Next.js'],
      },
    ],
  },

  howToOrder: {
    title: 'HOW TO ORDER',
    subtitle: 'ご依頼方法',
    steps: [
      {
        number: 1,
        icon: '📧',
        title: 'お問い合わせ',
        description: 'フォームまたはメールにて、お気軽にお問い合わせください。',
      },
      {
        number: 2,
        icon: '💬',
        title: 'ヒアリング・お見積り',
        description: 'ご要望をお伺いし、最適なプランとお見積りをご提案します。',
      },
      {
        number: 3,
        icon: '💻',
        title: '制作・進行管理',
        description: 'デザイン・開発を進め、定期的に進捗をご報告します。',
      },
      {
        number: 4,
        icon: '🎉',
        title: '納品・サポート',
        description: '納品後も安心してご利用いただけるようサポートします。',
      },
    ],
  },

  price: {
    title: 'PRICE',
    subtitle: '料金',
    note: '※ 詳細はお見積りにてご案内いたします',
    plans: [
      {
        icon: '🌟',
        title: '基本プラン',
        subtitle: 'LP制作',
        price: '¥150,000〜',
        features: [
          'レスポンシブ対応',
          'お問い合わせフォーム',
          'SEO基本対策',
        ],
      },
      {
        icon: '💼',
        title: 'スタンダードプラン',
        subtitle: 'コーポレートサイト',
        price: '¥400,000〜',
        features: [
          'WordPress導入',
          'レスポンシブ対応',
          'お問い合わせフォーム',
          'SEO対策',
          '更新マニュアル',
        ],
      },
      {
        icon: '🚀',
        title: 'プレミアムプラン',
        subtitle: 'フルカスタムサイト',
        price: '¥600,000〜',
        features: [
          '完全オーダーメイド',
          '高度な機能実装',
          'アニメーション',
          'SEO・パフォーマンス最適化',
        ],
      },
    ],
    maintenance: {
      title: '保守・運用',
      price: '¥5,000/月〜',
      features: [
        'セキュリティ対応',
        'バックアップ',
        '簡易的な修正対応',
      ],
    },
  },

  contact: {
    title: 'CONTACT',
    subtitle: 'お問い合わせ',
    description: 'お気軽にお問い合わせください',
  },
} as const;
