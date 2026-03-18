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

// メタデータ（一覧表示用）
export const supportArticleMeta = [
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

export const supportArticles: Record<string, SupportArticle> = {
  'copywriting': {
    title: '原稿の書き方',
    category: '準備',
    categoryColor: '#FF6B9D',
    date: '2026-02-27',
    readTime: '10分',
    content: (
      <>
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            なぜ原稿が重要なのか
          </h2>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            どんなに美しいデザインでも、伝える内容が明確でなければ意味がありません。
            サイトの原稿は、あなたのビジネスの「顔」です。
          </p>
          <p className="text-text-secondary leading-relaxed">
            でも安心してください。プロのライターでなくても、いくつかのポイントを押さえれば、
            魅力的な原稿を書くことができます。
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            1. キャッチコピーの作り方
          </h2>

          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            ✅ 良い例
          </h3>
          <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p className="text-primary font-bold" style={{ marginBottom: '0.5rem' }}>
              「たった3ステップで、理想のWebサイトが完成」
            </p>
            <p className="text-text-secondary text-sm">
              → 具体的な数字とベネフィットが明確
            </p>
          </div>

          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            ❌ 悪い例
          </h3>
          <div className="bg-background-alt border-l-4" style={{ borderColor: '#FF6B6B', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p className="text-primary font-bold" style={{ marginBottom: '0.5rem' }}>
              「最高のWebサイトを作ります」
            </p>
            <p className="text-text-secondary text-sm">
              → 抽象的で差別化できない
            </p>
          </div>

          <div className="bg-background-alt" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h4 className="font-bold text-primary" style={{ marginBottom: '1rem' }}>
              💡 キャッチコピーの公式
            </h4>
            <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li className="text-text-secondary">1. 誰のためのものか（ターゲット）</li>
              <li className="text-text-secondary">2. どんな問題を解決するか（課題）</li>
              <li className="text-text-secondary">3. どんな結果が得られるか（ベネフィット）</li>
            </ol>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            2. 説明文の書き方
          </h2>

          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            PREP法を使う
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
              <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                P（Point）: 結論
              </p>
              <p className="text-text-secondary text-sm">
                「当社のWebサイト制作は、初心者でも安心して依頼できます」
              </p>
            </div>

            <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
              <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                R（Reason）: 理由
              </p>
              <p className="text-text-secondary text-sm">
                「なぜなら、専門用語を使わず、丁寧にご説明するからです」
              </p>
            </div>

            <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
              <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                E（Example）: 具体例
              </p>
              <p className="text-text-secondary text-sm">
                「実際に、70代の方でも一緒にサイトを作り上げることができました」
              </p>
            </div>

            <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
              <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                P（Point）: 結論（再）
              </p>
              <p className="text-text-secondary text-sm">
                「だからこそ、どなたでも安心してご依頼いただけます」
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            3. 避けるべき表現
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { bad: '高品質', good: '10年の実績で培った技術', reason: '具体性がない' },
              { bad: '格安', good: '明朗会計・追加費用なし', reason: '安っぽい印象' },
              { bad: '業界No.1', good: '○○地域で100社以上の実績', reason: '根拠が不明' },
              { bad: 'お客様第一', good: '24時間以内の返信を保証', reason: '当たり前すぎる' }
            ].map((item, i) => (
              <div key={i} className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>❌ {item.bad}</span>
                  <span style={{ color: '#10B981', fontWeight: 'bold' }}>✅ {item.good}</span>
                </div>
                <p className="text-text-secondary text-sm">
                  理由：{item.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            4. 実践チェックリスト
          </h2>

          <div className="bg-primary text-background" style={{ padding: '2rem' }}>
            <h3 className="font-bold" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
              原稿を書いたら、これをチェック！
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                '□ 誰に向けたメッセージか明確か？',
                '□ 専門用語を使いすぎていないか？',
                '□ 具体的な数字が入っているか？',
                '□ お客様の声や実績を入れているか？',
                '□ 読んだ人が次にとる行動が明確か？',
                '□ 声に出して読んで、自然な日本語か？'
              ].map((item, i) => (
                <li key={i} className="text-background" style={{ fontSize: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              💬 原稿でお困りの場合は
            </h3>
            <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
              「何を書けばいいか分からない」「自信がない」という方も、ご安心ください。
            </p>
            <p className="text-text-secondary leading-relaxed">
              ヒアリングを通じて、あなたのビジネスの魅力を引き出し、
              一緒に原稿を作り上げることも可能です。お気軽にご相談ください。
            </p>
          </div>
        </section>
      </>
    )
  },

  'photo-tips': {
    title: '写真撮影のコツ',
    category: '準備',
    categoryColor: '#FF6B9D',
    date: '2026-02-27',
    readTime: '8分',
    content: (
      <>
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            スマホでもプロ並みの写真が撮れる
          </h2>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            「良い写真がない」「カメラマンに頼むのは予算的に厳しい」…そんな悩みをよく聞きます。
          </p>
          <p className="text-text-secondary leading-relaxed">
            でも、最近のスマホカメラは十分高性能。ちょっとしたコツさえ掴めば、
            Webサイトに使える写真を自分で撮影できます。
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            1. 光を味方につける
          </h2>

          <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              ✅ 自然光を使う（ベスト）
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <li className="text-text-secondary">• 窓際で撮影する</li>
              <li className="text-text-secondary">• 曇りの日がベスト（柔らかい光）</li>
              <li className="text-text-secondary">• 朝10時〜15時の間がおすすめ</li>
              <li className="text-text-secondary">• レースカーテン越しだとさらに◎</li>
            </ul>
          </div>

          <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              ❌ 避けるべき光
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <li className="text-text-secondary">• 真上からの蛍光灯（影が強く出る）</li>
              <li className="text-text-secondary">• 直射日光（コントラストが強すぎる）</li>
              <li className="text-text-secondary">• フラッシュ（不自然な白飛び）</li>
            </ul>
          </div>

          <div className="bg-primary text-background" style={{ padding: '1.5rem' }}>
            <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
              💡 プロの裏技
            </p>
            <p>
              白い紙やレフ板を反対側に置くと、影が柔らかくなります。
              100円ショップの白い発泡スチロールでOK！
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            2. 構図の基本
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                三分割法
              </h3>
              <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
                画面を縦横に3等分して、交点に被写体を配置します。
                スマホのグリッド線を表示させると簡単です。
              </p>
              <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <p className="text-primary font-bold" style={{ marginBottom: '0.5rem' }}>
                  設定方法（iPhone）
                </p>
                <p className="text-text-secondary text-sm">
                  設定 → カメラ → グリッド ON
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                余白を作る
              </h3>
              <p className="text-text-secondary">
                被写体をギリギリまで寄せるのではなく、適度な余白を残すと、
                洗練された印象になります。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                背景をシンプルに
              </h3>
              <p className="text-text-secondary">
                白い壁、木のテーブル、無地の布など、
                シンプルな背景を選ぶと被写体が引き立ちます。
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            3. 商品撮影の実践例
          </h2>

          {[
            {
              type: '食品・飲食',
              tips: [
                '湯気や水滴で"できたて感"を演出',
                '食器や小物で雰囲気を作る',
                '斜め45度から撮影すると立体感が出る',
                'できるだけ自然光で撮る'
              ]
            },
            {
              type: '雑貨・小物',
              tips: [
                '白い背景で商品を目立たせる',
                '複数個並べて楽しげに',
                '手に持った写真でサイズ感を伝える',
                '使用シーンの写真も用意する'
              ]
            },
            {
              type: 'サービス・人物',
              tips: [
                '自然な笑顔を心がける',
                '作業中の写真で臨場感を',
                'お客様との写真（許可を取って）',
                '店舗の雰囲気が分かる引きの写真'
              ]
            }
          ].map((item, i) => (
            <div key={i} className="bg-background-alt" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h4 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
                {item.type}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem' }}>
                {item.tips.map((tip, j) => (
                  <li key={j} className="text-text-secondary">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            4. 撮影後の仕上げ
          </h2>

          <div className="bg-background-alt" style={{ padding: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
              おすすめアプリ（無料）
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                  Snapseed（Google）
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1.5rem' }}>
                  <li className="text-text-secondary text-sm">• 明るさ・コントラストの調整</li>
                  <li className="text-text-secondary text-sm">• 不要物の削除</li>
                  <li className="text-text-secondary text-sm">• 傾き補正</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                  VSCO
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '1.5rem' }}>
                  <li className="text-text-secondary text-sm">• おしゃれなフィルター</li>
                  <li className="text-text-secondary text-sm">• 統一感のある色味に調整</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary text-background" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
              ⚠️ 注意点
            </p>
            <p>
              過度な加工は禁物。特に飲食店や商品販売の場合、
              実物と大きく異なる写真はトラブルの元です。
            </p>
          </div>
        </section>

        {/* <section>
          <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              📸 撮影代行も承ります
            </h3>
            <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
              「どうしても撮影が難しい」「プロに任せたい」という場合は、
              撮影代行サービスもご用意しております。
            </p>
            <p className="text-text-secondary leading-relaxed">
              予算やご希望に応じて、最適なプランをご提案いたします。
            </p>
          </div>
        </section> */}
      </>
    )
  },

  'production-flow': {
    title: 'サイト制作の流れ',
    category: '制作ガイド',
    categoryColor: '#FFD93D',
    date: '2026-02-27',
    readTime: '12分',
    content: (
      <>
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            全体の流れを把握しよう
          </h2>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            「Webサイト制作ってどんな流れで進むの？」
            初めての方が一番気になるポイントです。
          </p>
          <p className="text-text-secondary leading-relaxed">
            ここでは、お問い合わせから納品まで、
            実際にどのように進めていくのかを詳しく解説します。
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            STEP 1: お問い合わせ（即日〜1日）
          </h2>

          <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              何を伝えればいい？
            </h3>
            <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
              この段階では、詳細が決まっていなくても大丈夫です。
              以下のような情報があると、より具体的なご提案ができます。
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <li className="text-text-secondary">• どんなサイトを作りたいか（コーポレート、EC、LP など）</li>
              <li className="text-text-secondary">• ページ数の目安</li>
              <li className="text-text-secondary">• 希望の納期</li>
              <li className="text-text-secondary">• 大まかな予算感</li>
              <li className="text-text-secondary">• 参考にしたいサイト（あれば）</li>
            </ul>
          </div>

          <div className="bg-primary text-background" style={{ padding: '1.5rem' }}>
            <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
              📱 連絡方法
            </p>
            <p>
              LINE・Instagram・メールのいずれかで24時間受付中。
              通常、24時間以内にご返信いたします。
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            STEP 2: ヒアリング（1〜2週間）
          </h2>

          <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
            オンライン（Zoom）または対面でお打ち合わせ。
            ビジネスの目的や課題、ターゲットなどを詳しくお伺いします。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                q: 'サイトの目的は？',
                a: '問い合わせ獲得、商品販売、ブランディング、採用など'
              },
              {
                q: 'ターゲットは誰？',
                a: '年齢層、性別、職業、悩みなど'
              },
              {
                q: '競合はどこ？',
                a: '他社との違い、強みは何か'
              },
              {
                q: '必要な機能は？',
                a: 'お問い合わせフォーム、決済、会員機能など'
              }
            ].map((item, i) => (
              <div key={i} className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <p className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                  {item.q}
                </p>
                <p className="text-text-secondary text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background-alt" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <p className="text-text-secondary text-sm">
              💡 この段階で、サイトの方向性や全体像が見えてきます。
              不明点があれば、何でもお気軽にご質問ください。
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            STEP 3: お見積もり（1週間）
          </h2>

          <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
            ヒアリング内容をもとに、詳細なお見積もりをご提示します。
          </p>

          <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              お見積もりに含まれる項目
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem' }}>
              <li className="text-text-secondary">• デザイン費用</li>
              <li className="text-text-secondary">• コーディング費用</li>
              <li className="text-text-secondary">• 機能実装費用</li>
              <li className="text-text-secondary">• 素材準備費用（必要な場合）</li>
              <li className="text-text-secondary">• サーバー・ドメイン初期設定</li>
              <li className="text-text-secondary">• 納品後の無償保守期間</li>
            </ul>
          </div>

          <div className="bg-primary text-background" style={{ padding: '1.5rem' }}>
            <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
              💰 料金について
            </p>
            <p style={{ marginBottom: '1rem' }}>
              明朗会計を心がけており、追加費用は発生しません。
              分割払いにも対応しております。
            </p>
            <p className="text-sm">
              ※ 制作途中での大幅な仕様変更の場合のみ、
              事前にご相談の上、追加費用が発生する場合があります。
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            STEP 4: 制作開始（2週間〜2ヶ月）
          </h2>

          <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
            ご契約後、制作を開始します。進捗は随時共有し、
            確認しながら進めていきますのでご安心ください。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                4-1. 構成・設計（1週間）
              </h3>
              <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
                サイトの構成を決めていきます。
                どんなページが必要か、どこに何を配置するかを整理します。
              </p>
              <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <p className="text-text-secondary text-sm">
                  💡 この段階で大きな方向性を決定します。
                  後から変更するとコストがかかるため、じっくり確認してください。
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                4-2. コーディング・デザイン（1〜3週間）
              </h3>
              <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
                実際にコードを書いて、動くWebサイトを作成します。
                デザインもコードで同時に作り込んでいきます。
              </p>
              <div className="bg-background-alt" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h4 className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                  仮ドメインでの確認
                </h4>
                <p className="text-text-secondary text-sm">
                  制作途中のサイトを仮のドメインで公開し、
                  実際の画面を見ながら確認していただけます。
                  スマホやタブレットでもその場で確認可能です。
                </p>
              </div>
              <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <h4 className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                  テキスト・素材の送付
                </h4>
                <p className="text-text-secondary text-sm">
                  編集したいテキストや追加素材は、
                  LINEやメールで随時送っていただけます。
                  すぐに反映してご確認いただけます。
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                4-3. 機能実装・調整（1週間）
              </h3>
              <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
                お問い合わせフォーム、決済機能など、
                必要な機能を実装します。
                細かなデザインの調整も行います。
              </p>
              <div className="bg-background-alt" style={{ padding: '1.5rem' }}>
                <p className="text-text-secondary text-sm">
                  💡 修正回数に制限はありません。
                  仮サイトで確認しながら、納得いくまで調整します。
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                4-4. 最終テスト（1週間）
              </h3>
              <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
                すべての機能が正常に動作するか、
                各デバイス・ブラウザでの表示に問題がないかを確認します。
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            STEP 5: 納品・公開（1週間）
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                最終確認
              </h3>
              <p className="text-text-secondary">
                本番環境で最終確認を行います。
                すべてのページ、すべての機能が正常に動作するかをチェックします。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                公開サポート
              </h3>
              <p className="text-text-secondary">
                ドメイン設定、サーバー設定、SSL証明書の設定など、
                公開に必要な作業をすべて代行します。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                操作マニュアルのお渡し
              </h3>
              <p className="text-text-secondary">
                更新方法や管理画面の使い方をまとめた
                マニュアルをお渡しします。
              </p>
            </div>
          </div>

          <div className="bg-primary text-background" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
              🎁 納品後のサポート
            </p>
            <p>
              公開後1ヶ月間は無償で保守サポートいたします。
              不具合修正や簡単な更新作業に対応します。
            </p>
          </div>
        </section>

        <section>
          <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
              💬 不安なことはありませんか？
            </h3>
            <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
              「こんなこと聞いていいのかな」と思うような
              小さな疑問でも、お気軽にご相談ください。
            </p>
            <p className="text-text-secondary leading-relaxed">
              制作の流れや期間、費用について、
              丁寧にご説明いたします。
            </p>
          </div>
        </section>
      </>
    )
  }
};
