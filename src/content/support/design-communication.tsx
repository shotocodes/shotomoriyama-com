import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
  title: 'デザインの方向性を正確に伝える方法',
  category: '制作ガイド',
  categoryColor: '#FF8C42',
  date: '2026-03-29',
  readTime: '8分',
  content: (
    <>
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          「なんかいい感じに」は伝わりません
        </h2>
        <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
          Web制作の依頼でもっとも多いすれ違いは、「デザインのイメージが共有できていない」ことです。
        </p>
        <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
          「おしゃれな感じで」「清潔感のある感じで」「いい感じに」…
          これらの言葉は、人によって思い浮かべるものが全然違います。
        </p>
        <div
          className="bg-background-alt border-l-4"
          style={{ borderColor: '#FF6B6B', padding: '1.5rem' }}
        >
          <p className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
            よくある失敗パターン
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p className="text-text-secondary text-sm">依頼者：「モダンでスタイリッシュな感じで」</p>
            <p className="text-text-secondary text-sm">制作者が想像：黒・グレーを基調としたクールなデザイン</p>
            <p className="text-text-secondary text-sm">依頼者が想像：白を基調とした明るくトレンディなデザイン</p>
            <p className="text-sm" style={{ color: '#FF6B6B', marginTop: '0.5rem' }}>
              → 完成後に「イメージと違う」となってしまう
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          1. 参考サイトを3つ以上集める
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
          一番効果的なのは、「こういうデザインが好き」というサイトを見せることです。
          言葉より視覚で伝える方が、ずっと正確に伝わります。
        </p>

        <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
            参考サイトの集め方
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Google検索', desc: '「業種 + ホームページ + デザイン」で検索' },
              { label: 'Pinterest', desc: '「web design」と検索すると海外の良いデザインが見つかる' },
              { label: 'Awwwards', desc: 'awwwards.com でデザイン受賞サイトを見る' },
              { label: '競合他社', desc: '「これは違う」という例も集めておくと参考になる' }
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: '0.75rem' }}>
                <span style={{ color: '#FF8C42', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                <div>
                  <p className="font-bold text-primary text-sm">{item.label}</p>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-background" style={{ padding: '1.5rem' }}>
          <p className="font-bold" style={{ marginBottom: '0.5rem' }}>💡 ポイント</p>
          <p className="text-sm">
            参考サイトを送るときは「このサイトの◯◯な部分が好き」と
            具体的な部分を指定するとさらに伝わりやすくなります。
            3〜5個で十分です。多すぎると方向性がブレます。
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          2. キーワードを5個以内に絞る
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
          デザインの雰囲気を言葉で伝えるなら、キーワードを使いましょう。
          ただし多すぎると方向性がブレるので5個以内に。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              label: '雰囲気系',
              color: '#9333EA',
              words: ['シンプル', 'ミニマル', '高級感', '温かみ', '親しみやすい', 'クール', 'スタイリッシュ']
            },
            {
              label: '色系',
              color: '#FF8C42',
              words: ['モノトーン', 'アースカラー', 'ビビッド', 'パステル', 'ダーク', 'ライト']
            },
            {
              label: '業種・スタイル系',
              color: '#0066FF',
              words: ['医療系', '食品系', 'IT系', 'ファッション系', '和風', '北欧風']
            }
          ].map((group, i) => (
            <div
              key={i}
              className="bg-background-alt border-l-4"
              style={{ borderColor: group.color, padding: '1.5rem' }}
            >
              <p className="font-bold text-primary text-sm" style={{ marginBottom: '0.75rem' }}>
                {group.label}
              </p>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {group.words.map((word, j) => (
                  <span
                    key={j}
                    className="text-xs font-bold"
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: `${group.color}15`,
                      color: group.color,
                      borderRadius: '4px'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          3. 「避けたいもの」も伝える
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
          好きなものだけでなく、嫌いなものも伝えると精度が上がります。
          ネガティブな情報も、デザイナーにとっては重要な手がかりです。
        </p>

        <div className="bg-background-alt" style={{ padding: '2rem' }}>
          <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
            例
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              '「派手な色は使わないでほしい」',
              '「アニメーションが多すぎるのは嫌」',
              '「古臭いデザインは避けたい」',
              '「文字が多すぎるのはNG」'
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: '0.5rem' }}>
                <span style={{ color: '#FF8C42', flexShrink: 0 }}>→</span>
                <p className="text-text-secondary text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          4. 色の伝え方
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
          色はデザインの印象を大きく左右します。「青っぽい感じ」では伝わりません。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              method: '好きなブランドのカラーを参考にする',
              example: '「Appleのサイトみたいな白・グレー系」「スターバックスのようなグリーン系」'
            },
            {
              method: 'カラーコードで指定する',
              example: 'Googleで「カラーピッカー」と検索すると、好きな色のコードを調べられます'
            },
            {
              method: '感情で伝える',
              example: '信頼感→青系 / 温かみ→オレンジ・ベージュ系 / 高級感→黒・ゴールド系'
            }
          ].map((item, i) => (
            <div key={i} className="bg-background-alt" style={{ padding: '1.5rem' }}>
              <p className="font-bold text-primary text-sm" style={{ marginBottom: '0.5rem' }}>
                方法 {i + 1}: {item.method}
              </p>
              <p className="text-text-secondary text-sm">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          5. そのまま使えるテンプレート
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '1.5rem' }}>
          以下をコピーして、埋めて送るだけでOKです。
        </p>

        <div className="bg-background-alt" style={{ padding: '2rem' }}>
          <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            📋 デザインイメージ共有シート
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { label: '好きな参考サイト（URL）', placeholder: '1.\n2.\n3.' },
              { label: '雰囲気キーワード（5個以内）', placeholder: '・\n・\n・' },
              { label: '避けたいデザイン', placeholder: '・' },
              { label: 'メインカラーのイメージ', placeholder: '色名・ブランド名・カラーコードなど' },
              { label: 'ターゲットユーザー', placeholder: '年齢・性別・職業など' },
              { label: '一言で表すなら？', placeholder: '例：「信頼できる街の歯医者」「おしゃれなカフェ」' }
            ].map((item, i) => (
              <div
                key={i}
                className="border-b border-color-border"
                style={{ paddingBottom: '1rem' }}
              >
                <p className="font-bold text-primary text-sm" style={{ marginBottom: '0.5rem' }}>
                  ■ {item.label}
                </p>
                <p className="text-text-secondary text-sm whitespace-pre-line" style={{ opacity: 0.6 }}>
                  {item.placeholder}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-background" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <p className="font-bold" style={{ marginBottom: '0.5rem' }}>💡 活用方法</p>
          <p className="text-sm">
            このシートをLINEやメールで送るだけで、デザイナーとのすれ違いが大幅に減ります。
            完璧に埋まらなくても大丈夫です。分かる範囲で送ってください。
          </p>
        </div>
      </section>

      <section>
        <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            💬 デザインの相談、お気軽にどうぞ
          </h3>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            「参考サイトを集めたけど、どうまとめればいいか分からない」
            「テンプレートを埋めたので見てほしい」
          </p>
          <p className="text-text-secondary leading-relaxed">
            そんなご相談も大歓迎です。LINEやメールでお気軽にご連絡ください。
          </p>
        </div>
      </section>
    </>
  )
};

export default article;
