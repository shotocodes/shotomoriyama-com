import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
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
};

export default article;
