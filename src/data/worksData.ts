// src/data/worksData.ts

// ✅ カテゴリ定義（将来のフィルター用）
export const workCategories = [
  'All',
  'Web Development',
  'Design',
  'E-Commerce',
  'Branding',
  'WordPress'
] as const;

export type WorkCategory = typeof workCategories[number];

// クライアントワーク
export const clientWorks = [
  {
    id: 'client-1',
    title: '佐藤工務店サイトリニューアル',
    category: 'Web Development' as WorkCategory,
    tags: ['WordPress', 'PHP'],
    description: '企業のブランドリニューアルに伴うWebサイト制作。企画からデザイン、実装まで一貫して担当。',
    challenge: 'クライアントの要望を形にしながら、ユーザビリティを最優先に設計',
    solution: 'ヒアリングを重ね、プロトタイプを3回作成。最終的にクライアント満足度◎',
    result: '問い合わせ数が前月比150%増加。保守契約も獲得。',
    year: '2025',
    price: '50万円〜',
    duration: '2ヶ月',
    maintenance: true,
    client: '株式会社佐藤工務店様',
    industry: '工務店',
    url: 'https://www.sato-kohmuten.com/',
    image: '/images/works/client1.png',
    // ✅ 追加: クライアントの声
    testimonial: {
      text: '丁寧なヒアリングで、私たちの想いを形にしていただきました。完成したサイトは想像以上の出来栄えで、お客様からの反響も上々です。',
      author: '株式会社佐藤工務店 工事部',
      position: '佐藤 匠 様'
    }
  },
  {
    id: 'client-2',
    title: 'おたからひろばコーポレートサイト作成',
    category: 'Design' as WorkCategory,
    tags: ['WordPress', 'PHP'],
    description: 'サービスサイトのデザインとWordPress実装。短納期での納品を実現。',
    challenge: '納期2週間という短期間での制作',
    solution: 'テンプレートをカスタマイズし、効率的に開発。週次で進捗報告。',
    result: '予定通り納品。クライアントから高評価をいただく。',
    year: '2026',
    price: '20万円〜',
    duration: '2週間',
    maintenance: false,
    client: '株式会社エスケリア様',
    industry: '買取業',
    url: 'https://www.otakarahiroba05.com/',
    image: '/images/works/client2.png',
    // ✅ 追加: クライアントの声
    testimonial: {
      text: '短納期にも関わらず、クオリティの高いサイトを制作していただきました。レスポンスも早く、安心してお任せできました。',
      author: '株式会社エスケリア 代表取締役',
      position: '坂爪 健祐 様'
    }
  },
];

// 個人プロジェクト（testimonial なし）
export const personalProjects = [
  {
    id: 'personal-1',
    title: 'Sho-tolog',
    category: 'Personal Project',
    tags: ['WordPress', 'PHP'],
    description: 'Web開発や思考を発信しているプライベートブログ。技術記事を中心に更新中。',
    purpose: '学んだことをアウトプットし、同じ悩みを持つ人の助けになる',
    features: [
      'MDXによる記事管理',
      'ダークモード対応',
      'レスポンシブデザイン',
      'SEO最適化'
    ],
    year: '2024',
    url: 'https://sho-tolog.com/',
    status: 'Active',
    image: '/images/works/blog.png',
  },
  {
    id: 'personal-2',
    title: 'International Portfolio',
    category: 'Personal Project',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
    description: '英語圏向けのポートフォリオサイト（開発中）。3Dインタラクティブデザインを採用。',
    purpose: '海外クライアント獲得を目指し、技術力をアピール',
    features: [
      'Three.jsによる3D表現',
      'スムーズなアニメーション',
      '英語UI/UX',
      'モダンなデザイン'
    ],
    year: '2024',
    url: 'https://www.shoto.tech/',
    status: 'In Progress',
    image: '/images/works/portfolio-en.png',
  },
  {
    id: 'personal-3',
    title: 'ENSO — Design your days.',
    category: 'Personal Project',
    tags: ['Next.js', 'TypeScript'],
    description: '日々の暮らしをデザインするためのライフスタイルアプリ。',
    purpose: '毎日をより意図的に、豊かにデザインするためのツール',
    features: [
      'ライフスタイルデザイン',
      'モダンUI/UX',
      'レスポンシブデザイン',
    ],
    year: '2025',
    url: 'https://ensolife.app',
    status: 'Active',
    image: '/images/works/enso.png',
  },
];


// ✅ 将来のフィルター実装用（コメントアウト）
/*
export const getFilteredWorks = (category: WorkCategory) => {
  if (category === 'All') return clientWorks;
  return clientWorks.filter(work => work.category === category);
};
*/
