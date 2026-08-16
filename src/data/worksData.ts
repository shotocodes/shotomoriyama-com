// src/data/worksData.ts
//
// ============================================================
// 実績データの単一ソース
//
// ✅ 新規実績の追加は clientWorks / personalProjects の配列に
//    1件オブジェクトを足すだけ。一覧・詳細・サイトマップ・OG画像に自動反映される。
//
// 画像の置き場所（新規実績はこの規約に従う）:
//   /public/works/<クライアントslug>/main.webp   ← サムネイル（thumbnail）
//   /public/works/<クライアントslug>/logo.webp 等 ← 制作物ギャラリー（gallery）
//
// 画像ファイルがまだ存在しなくてもビルド・表示は壊れない
// （<WorkImage> がプレースホルダを表示する）。素材が用意でき次第
// /public/works/ に置けばそのまま表示される。
// ============================================================

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

// クライアントの声
export interface Testimonial {
  text: string;
  author: string;
  position: string;
}

// クライアントワーク（1クライアント＝複数成果物）
export interface ClientWork {
  id: string;
  title: string;
  category: WorkCategory;
  /** 技術タグ（WordPress 等） */
  tags: string[];
  /** 納品した成果物（カードにチップ表示）: 「Webサイト」「ロゴ」「看板」「名刺」等 */
  deliverables: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  year: string;
  duration: string;
  maintenance: boolean;
  client: string;
  industry: string;
  url?: string;
  /** サムネイル画像。/works/<slug>/main.webp（未配置ならプレースホルダ表示） */
  thumbnail: string;
  /** ロゴ・名刺・看板などの制作物画像（詳細ページにギャラリー表示） */
  gallery?: string[];
  /** 補足ひとこと（例: 設計から保守まで一式） */
  note?: string;
  testimonial?: Testimonial;
}

// 個人プロジェクト
export interface PersonalProject {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  purpose: string;
  features: string[];
  year: string;
  url?: string;
  articleUrl?: string;
  status: 'Active' | 'In Progress';
  thumbnail: string;
  codeSnippet?: string;
}

// クライアントワーク
export const clientWorks: ClientWork[] = [
  {
    id: 'client-1',
    title: '佐藤工務店サイトリニューアル',
    category: 'Web Development',
    tags: ['WordPress', 'PHP'],
    deliverables: ['Webサイト', '案内看板', '保守運用'],
    description: '企業のブランドリニューアルに伴うWebサイト制作。企画からデザイン、実装まで一貫して担当。案内看板のデザインも制作。',
    challenge: 'クライアントの要望を形にしながら、ユーザビリティを最優先に設計',
    solution: 'ヒアリングを重ね、プロトタイプを3回作成。最終的にクライアント満足度◎',
    result: '問い合わせ数が前月比150%増加。保守契約も獲得。',
    year: '2025',
    duration: '2ヶ月',
    maintenance: true,
    client: '株式会社佐藤工務店様',
    industry: '工務店',
    url: 'https://www.sato-kohmuten.com/',
    thumbnail: '/images/works/client1.png',
    gallery: ['/works/sato-kohmuten/kanban-1.webp', '/works/sato-kohmuten/kanban-2.webp'],
    note: '年間保守契約で継続サポート中',
    testimonial: {
      text: '丁寧なヒアリングで、私たちの想いを形にしていただきました。完成したサイトは想像以上の出来栄えで、お客様からの反響も上々です。',
      author: '株式会社佐藤工務店 工事部',
      position: '佐藤 匠 様'
    }
  },
  {
    id: 'client-2',
    title: 'おたからひろばコーポレートサイト作成',
    category: 'Design',
    tags: ['WordPress', 'PHP'],
    deliverables: ['Webサイト', '名刺', 'リンク集ページ'],
    description: 'サービスサイトのデザインとWordPress実装。短納期での納品後、名刺デザインとリンク集ページも追加でご依頼いただく。',
    challenge: '納期2週間という短期間での制作',
    solution: 'テンプレートをカスタマイズし、効率的に開発。週次で進捗報告。',
    result: '予定通り納品。その後、名刺4種とリンク集ページの制作もご依頼いただく。',
    year: '2026',
    duration: '2週間',
    maintenance: false,
    client: '株式会社エスケリア様',
    industry: '買取業',
    url: 'https://www.otakarahiroba05.com/',
    thumbnail: '/images/works/client2.png',
    gallery: ['/works/otakarahiroba/meishi.webp'],
    note: 'サイト納品後に名刺・リンク集ページを追加制作',
    testimonial: {
      text: '短納期にも関わらず、クオリティの高いサイトを制作していただきました。レスポンスも早く、安心してお任せできました。',
      author: '株式会社エスケリア 代表取締役',
      position: '坂爪 健祐 様'
    }
  },
  {
    id: 'client-3',
    title: 'Y-Kリアルティ コーポレートサイト制作',
    category: 'Web Development',
    tags: ['HTML/CSS/JS', '静的サイト'],
    deliverables: ['Webサイト', 'ロゴ', '名刺', 'QRデザイン'],
    description: '不動産会社の新規サイト立ち上げ。ロゴ・名刺・QRデザインまで会社の顔となるデザイン一式を担当。',
    challenge: '会社の立ち上げ期で、サイトだけでなくロゴ・名刺などブランドの土台をまとめて整える必要があった',
    solution: 'サイト・ロゴ・名刺を一貫したデザインで制作。表示速度を最優先に、WordPressを使わない軽量な静的サイト構成を採用。',
    result: 'スマホ表示速度91点・SEO100点を達成（PageSpeed Insights）。公開後の運用代行も継続中。',
    year: '2026',
    duration: '約3ヶ月',
    maintenance: true,
    client: 'Y-Kリアルティ株式会社様',
    industry: '不動産（埼玉県川口市）',
    url: 'https://yk-realty.jp',
    thumbnail: '/works/yk-realty/main.webp',
    gallery: ['/works/yk-realty/logo.webp', '/works/yk-realty/meishi.webp'],
    note: '設計から保守まで一式',
  },
];

// 個人プロジェクト（testimonial なし）
export const personalProjects: PersonalProject[] = [
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
    thumbnail: '/images/works/blog.png',
    // ブループリント・レンズ（variant="code"）に流すコード
    codeSnippet: `<?php
// single.php — 記事テンプレート
get_header();

while ( have_posts() ) : the_post();
  $reading_time = ceil(
    str_word_count( strip_tags( get_the_content() ) ) / 200
  );
?>
  <article <?php post_class( 'post-entry' ); ?>>
    <header class="post-entry__header">
      <h1><?php the_title(); ?></h1>
      <time datetime="<?php echo get_the_date( 'c' ); ?>">
        <?php echo get_the_date(); ?> ・ 約<?php echo $reading_time; ?>分
      </time>
    </header>
    <div class="post-entry__content">
      <?php the_content(); ?>
    </div>
  </article>
<?php
endwhile;

get_footer();`,
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
    thumbnail: '/images/works/portfolio-en.png',
    // ブループリント・レンズ（variant="code"）に流すコード
    codeSnippet: `// hero wave — vertex shader
uniform float uTime;
uniform vec2 uMouse;

attribute vec3 aColor;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec3 pos = position;

  float dist = distance(pos.xy, uMouse);
  float ripple = sin(dist * 0.5 - uTime * 2.0) * 1.2;
  float swellX = sin(pos.x * 0.3 + uTime) * 0.5;
  float swellY = cos(pos.y * 0.3 + uTime * 0.7) * 0.5;

  pos.z = ripple + swellX + swellY;

  gl_Position = projectionMatrix
    * modelViewMatrix
    * vec4(pos, 1.0);
}`,
  },
  {
    id: 'personal-3',
    title: 'ENSO — Design your days.',
    category: 'Personal Project',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Claude API'],
    description: 'タイマー・タスク・集中・日記が連携する4アプリ統合ライフスタイルアプリ。目標から実行・振り返りまで1つに繋がったエコシステム。',
    purpose: '毎日をより意図的に、豊かにデザインするためのツール。アプリをいくつも行き来する非効率を解消する。',
    features: [
      'TIMER — 人生可視化・目標設定・残日数カウント',
      'TASK — 目標→マイルストーン→タスク自動分解（Claude API）',
      'FOCUS — ポモドーロ・環境音・タスク連携',
      'JOURNAL — 自動日記・AI日記生成（Claude API）',
    ],
    year: '2026',
    url: 'https://ensolife.app',
    articleUrl: '/blog/enso-productivity-app',
    status: 'Active',
    thumbnail: '/images/works/enso.png',
    // ブループリント・レンズ（variant="code"）に流すコード
    codeSnippet: `// FOCUS — ポモドーロセッションの保存
export async function completeSession(task: Task) {
  const { data: session } = await supabase
    .from('focus_sessions')
    .insert({
      task_id: task.id,
      duration_min: 25,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  // JOURNAL 連携 — 今日の記録に自動追記
  await appendJournalEntry({
    type: 'focus',
    summary: \`\${task.title} に25分集中\`,
    session_id: session.id,
  });

  return session;
}`,
  },
];
