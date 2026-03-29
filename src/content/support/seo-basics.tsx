import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
  title: 'SEO基礎知識',
  category: '技術',
  categoryColor: '#A0C4FF',
  date: '2026-03-29',
  readTime: '10分',
  content: (
    <>
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          SEOって何？難しそう…と思っている方へ
        </h2>
        <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
          「SEO」という言葉は聞いたことがあるけど、なんだか難しそう…
          そう感じている方は多いと思います。
        </p>
        <p className="text-text-secondary leading-relaxed">
          でも基本的な考え方はとてもシンプルです。
          この記事では、専門用語をできるだけ使わずに、
          SEOの基礎をわかりやすく解説します。
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          1. SEOとは？
        </h2>

        <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            一言でいうと…
          </h3>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            <strong className="text-primary">「Googleで検索したときに、上位に表示されるようにする取り組み」</strong>
            のことです。
          </p>
          <p className="text-text-secondary leading-relaxed">
            SEOとは「Search Engine Optimization（検索エンジン最適化）」の略。
            難しい言葉ですが、要は「検索結果の上位に出やすくすること」です。
          </p>
        </div>

        <div className="bg-primary text-background" style={{ padding: '1.5rem' }}>
          <p className="font-bold" style={{ marginBottom: '0.5rem' }}>
            💡 なぜ上位表示が重要なの？
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            Googleで検索したとき、多くの人は1ページ目しか見ません。
            さらに、上位3件のクリック率は全体の約60%を占めると言われています。
          </p>
          <p className="text-sm" style={{ opacity: 0.8 }}>
            つまり、2ページ目以降に表示されるサイトは、ほとんど見てもらえないということです。
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          2. Googleはどうやってサイトを評価しているの？
        </h2>

        <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
          Googleは主に以下の3つの観点でサイトを評価しています。
        </p>

        {[
          {
            title: '① コンテンツの質',
            color: '#A0C4FF',
            description: '検索した人の疑問に、しっかり答えているか？',
            details: [
              'ユーザーが知りたいことが書かれているか',
              '情報が正確で信頼できるか',
              '定期的に更新されているか',
              '読みやすい文章・構成か'
            ]
          },
          {
            title: '② サイトの技術的な品質',
            color: '#B4D4FF',
            description: 'サイトが使いやすく、快適に動くか？',
            details: [
              '表示速度が速いか',
              'スマホで見やすいか（レスポンシブ対応）',
              'SSL（https）に対応しているか',
              'リンク切れや404エラーがないか'
            ]
          },
          {
            title: '③ サイトの信頼性・権威性',
            color: '#C5D5FF',
            description: '他のサイトから信頼されているか？',
            details: [
              '他のサイトからリンクされているか',
              '専門家・企業が運営しているか',
              'SNSでシェアされているか',
              '長期間運営されているか'
            ]
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-background-alt border-l-4"
            style={{ borderColor: item.color, padding: '2rem', marginBottom: '1.5rem' }}
          >
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
              {item.title}
            </h3>
            <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
              {item.description}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {item.details.map((detail, j) => (
                <li key={j} className="flex items-start text-text-secondary text-sm" style={{ gap: '0.5rem' }}>
                  <span style={{ color: item.color, flexShrink: 0 }}>✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          3. 今すぐできるSEO対策5選
        </h2>

        <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
          難しいことは抜きに、まずはここから始めてみてください。
        </p>

        {[
          {
            number: 1,
            title: 'タイトルにキーワードを入れる',
            easy: '★☆☆ 簡単',
            description: 'ページのタイトルに、検索されそうな言葉を入れましょう。',
            example: {
              bad: '「ホームページへようこそ」',
              good: '「東京・渋谷の美容室 | カット・カラー・パーマ』'
            },
            tip: '地域名 + サービス名 + 店舗名の組み合わせが効果的です。'
          },
          {
            number: 2,
            title: 'ページの説明文（メタディスクリプション）を設定する',
            easy: '★☆☆ 簡単',
            description: '検索結果に表示されるサイトの説明文を設定しましょう。',
            example: {
              bad: '（未設定）',
              good: '「渋谷駅から徒歩3分。髪に優しいオーガニックカラーが人気の美容室です。ご予約はお電話・LINEで受付中。」'
            },
            tip: '120文字以内で、サービスの特徴と行動を促す文章を入れましょう。'
          },
          {
            number: 3,
            title: '画像にalt（代替テキスト）を設定する',
            easy: '★★☆ 普通',
            description: '画像に説明文を設定すると、Googleが画像の内容を理解できます。',
            example: {
              bad: 'alt=""（空欄）',
              good: 'alt="渋谷の美容室でヘアカラーを施術する様子"'
            },
            tip: '画像の内容を具体的に説明する文章を入れましょう。'
          },
          {
            number: 4,
            title: 'コンテンツを定期的に更新する',
            easy: '★☆☆ 簡単',
            description: '新鮮な情報があるサイトはGoogleに評価されやすくなります。',
            example: {
              bad: '公開後ずっと更新なし',
              good: 'ブログやお知らせを月1〜2回更新'
            },
            tip: 'お客様からよく聞かれる質問をブログ記事にするのがおすすめです。'
          },
          {
            number: 5,
            title: 'Google Search Consoleを設定する',
            easy: '★★☆ 普通',
            description: 'Googleの無料ツールで、サイトの検索状況を確認できます。',
            example: {
              bad: 'データを見ずに感覚で運用',
              good: '毎月データを確認して改善'
            },
            tip: '「どのキーワードで来ているか」「どのページが人気か」を把握できます。'
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-background-alt"
            style={{ padding: '2rem', marginBottom: '1.5rem' }}
          >
            <div className="flex items-start" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div
                className="flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#A0C4FF',
                  borderRadius: '50%',
                  color: '#1a1a1a'
                }}
              >
                {item.number}
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <span className="text-xs text-text-secondary">{item.easy}</span>
              </div>
            </div>

            <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
              {item.description}
            </p>

            <div className="bg-background" style={{ padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p className="text-sm">
                  <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>❌ </span>
                  <span className="text-text-secondary">{item.example.bad}</span>
                </p>
                <p className="text-sm">
                  <span style={{ color: '#10B981', fontWeight: 'bold' }}>✅ </span>
                  <span className="text-text-secondary">{item.example.good}</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-text-secondary">
              💡 {item.tip}
            </p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          4. SEOでよくある誤解
        </h2>

        {[
          {
            myth: '「SEO対策をすればすぐ上位に表示される」',
            truth: 'SEOの効果が出るまでには、通常3〜6ヶ月かかります。地道な積み重ねが大切です。'
          },
          {
            myth: '「キーワードをたくさん詰め込めばいい」',
            truth: '同じキーワードを不自然に繰り返すと、逆にGoogleからペナルティを受けることがあります。自然な文章を心がけましょう。'
          },
          {
            myth: '「一度やれば終わり」',
            truth: 'Googleのアルゴリズムは常に変化しています。継続的な更新と改善が必要です。'
          },
          {
            myth: '「お金をかければ上位表示できる」',
            truth: '広告（リスティング広告）とSEOは別物です。SEOは基本的に無料でできますが、時間がかかります。'
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-background-alt"
            style={{ padding: '1.5rem', marginBottom: '1rem' }}
          >
            <p className="font-bold" style={{ color: '#FF6B6B', marginBottom: '0.75rem' }}>
              ❌ 誤解：{item.myth}
            </p>
            <p className="text-text-secondary text-sm">
              ✅ 実際：{item.truth}
            </p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          5. SEO対策の優先順位
        </h2>

        <div className="bg-background-alt" style={{ padding: '2rem' }}>
          <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
            全部一度にやろうとすると大変です。以下の順番で取り組むのがおすすめです。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { phase: 'まず最初に', items: ['タイトルとメタディスクリプションの設定', 'SSL（https）対応', 'スマホ対応'], color: '#10B981' },
              { phase: '次のステップ', items: ['画像のalt設定', 'Google Search Console登録', 'サイトマップの送信'], color: '#A0C4FF' },
              { phase: '継続的に', items: ['ブログやお知らせの定期更新', 'ページ表示速度の改善', '内部リンクの整理'], color: '#9333EA' }
            ].map((phase, i) => (
              <div
                key={i}
                className="border-l-4"
                style={{ borderColor: phase.color, paddingLeft: '1.5rem' }}
              >
                <p className="font-bold text-primary" style={{ marginBottom: '0.5rem', color: phase.color }}>
                  {phase.phase}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-text-secondary text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            💬 SEO対策もお任せできます
          </h3>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            サイト制作の際に、基本的なSEO対策も合わせて対応しています。
            「どのキーワードで上位を狙うか」「どんなコンテンツを作ればいいか」
            など、戦略的な部分もご相談ください。
          </p>
          <p className="text-text-secondary leading-relaxed">
            すでにサイトをお持ちの方の改善相談も承っています。
            まずはお気軽にご連絡ください。
          </p>
        </div>
      </section>
    </>
  )
};

export default article;
