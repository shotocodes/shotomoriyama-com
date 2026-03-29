import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
  title: 'AIでデザイン提案',
  category: 'AI活用',
  categoryColor: '#9333EA',
  date: '2026-03-29',
  readTime: '8分',
  content: (
    <>
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          AIツールで、デザインのイメージを形にしよう
        </h2>
        <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
          「こんなデザインにしたい」というイメージはあるけど、
          うまく言葉にできない…そんな経験はありませんか？
        </p>
        <p className="text-text-secondary leading-relaxed">
          実は今、AIツールを使えば、専門知識がなくても
          デザインのイメージを簡単に作れるようになっています。
          制作依頼の前に参考イメージを作っておくと、
          より理想に近いサイトが完成します。
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          1. おすすめAIデザインツール3選
        </h2>

        {[
          {
            name: 'Canva AI',
            level: '★★★ 初心者向け',
            color: '#9333EA',
            description: '日本語対応で直感的に操作できる。テンプレートも豊富で、AIが自動でデザインを提案してくれます。',
            useCase: 'バナー・SNS画像・名刺など幅広く使える',
            url: 'https://www.canva.com/ja_jp/',
            tips: [
              'テキストを入力するだけでデザインを自動生成',
              '無料プランでも十分使える',
              'スマホアプリもあり、外出先でも操作可能'
            ]
          },
          {
            name: 'Adobe Firefly',
            level: '★★☆ 中級者向け',
            color: '#8B5CF6',
            description: 'Adobeが提供するAI画像生成ツール。商用利用可能な高品質な画像を生成できます。',
            useCase: 'ホームページ用の背景画像・イメージ写真の生成',
            url: 'https://firefly.adobe.com/',
            tips: [
              '商用利用に安心な著作権クリアな画像',
              'プロンプト（指示文）を日本語で入力可能',
              'Photoshopとの連携が便利'
            ]
          },
          {
            name: 'Midjourney',
            level: '★☆☆ 上級者向け',
            color: '#7C3AED',
            description: '世界トップクラスの画像生成AI。プロンプトの書き方を覚えると、圧倒的にクオリティの高い画像が作れます。',
            useCase: 'サイトのメインビジュアル・コンセプト画像',
            url: 'https://www.midjourney.com/',
            tips: [
              '英語でのプロンプト入力が基本',
              '月額約3,000円〜のサブスクリプション',
              'Discord経由での操作が必要'
            ]
          }
        ].map((tool, i) => (
          <div
            key={i}
            className="bg-background-alt border-l-4"
            style={{ borderColor: tool.color, padding: '2rem', marginBottom: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 className="text-xl font-bold text-primary">{tool.name}</h3>
              <span
                className="text-sm font-bold"
                style={{ color: tool.color }}
              >
                {tool.level}
              </span>
            </div>
            <p className="text-text-secondary" style={{ marginBottom: '1rem' }}>
              {tool.description}
            </p>
            <div
              className="bg-background"
              style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}
            >
              <p className="text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                💡 こんな用途に
              </p>
              <p className="text-sm text-text-secondary">{tool.useCase}</p>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tool.tips.map((tip, j) => (
                <li key={j} className="text-text-secondary text-sm flex items-start" style={{ gap: '0.5rem' }}>
                  <span style={{ color: tool.color, flexShrink: 0 }}>✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          2. Canvaで参考デザインを作ってみよう
        </h2>
        <p className="text-text-secondary" style={{ marginBottom: '2rem' }}>
          一番簡単なCanvaを使って、実際にデザインイメージを作る手順を説明します。
        </p>

        {[
          {
            step: 1,
            title: 'Canvaにアクセスしてアカウントを作成',
            detail: 'canva.com にアクセスして、Googleアカウントで無料登録。メールアドレスでも登録できます。'
          },
          {
            step: 2,
            title: 'デザインの種類を選ぶ',
            detail: '「新しいデザインを作成」→ 作りたいもの（ホームページ・バナーなど）を選択。サイズが自動で設定されます。'
          },
          {
            step: 3,
            title: 'AIに生成してもらう',
            detail: '画面左の「アプリ」→「AI画像生成」を選択。「和食レストランの温かみのある雰囲気」のように日本語で入力するとAIが画像を生成してくれます。'
          },
          {
            step: 4,
            title: 'テンプレートを選んで編集',
            detail: '気に入ったテンプレートを選んで、生成した画像やテキストを当てはめて完成！'
          },
          {
            step: 5,
            title: '制作者に共有',
            detail: '右上の「共有」→「リンクをコピー」または「ダウンロード（PNG）」で共有できます。'
          }
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start"
            style={{ gap: '1.5rem', marginBottom: '1.5rem' }}
          >
            <div
              className="flex items-center justify-center font-bold text-white flex-shrink-0"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#9333EA',
                borderRadius: '50%',
                fontSize: '1rem'
              }}
            >
              {item.step}
            </div>
            <div className="bg-background-alt" style={{ padding: '1.5rem', flex: 1 }}>
              <h4 className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm">{item.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          3. デザインイメージを伝えるコツ
        </h2>

        <div className="bg-background-alt" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
            ✅ 伝わりやすい共有方法
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: '参考サイトのURL', desc: '「このサイトのような雰囲気にしたい」と一緒に送る' },
              { label: 'Canvaで作ったイメージ', desc: '色・レイアウト・雰囲気の参考として' },
              { label: 'キーワード', desc: '「シンプル・清潔感・信頼感」など5個以内で' },
              { label: '避けたいデザイン', desc: '「派手すぎるのはNG」など、逆の例も参考になる' }
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: '1rem' }}>
                <span style={{ color: '#9333EA', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                <div>
                  <p className="font-bold text-primary text-sm">{item.label}</p>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-background-alt border-l-4"
          style={{ borderColor: '#FF6B6B', padding: '1.5rem' }}
        >
          <h4 className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
            ❌ 伝わりにくい表現
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              '「おしゃれな感じで」→ 人によって解釈が異なる',
              '「いい感じにして」→ 基準が不明',
              '「よくあるデザインで」→ 逆に難しい'
            ].map((item, i) => (
              <p key={i} className="text-text-secondary text-sm">• {item}</p>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
          4. よくある質問
        </h2>

        {[
          {
            q: '無料で使えますか？',
            a: 'Canvaは無料プランがあります。Adobe FireflyもAdobeアカウントがあれば月25回まで無料。Midjourneyは有料（月約3,000円〜）です。'
          },
          {
            q: '作った画像を商用利用できますか？',
            a: 'Canvaと Adobe Firefly は商用利用可能です。Midjourneyも有料プランなら商用利用OKです。'
          },
          {
            q: 'AIが作った画像をそのまま使ってもいいですか？',
            a: '参考イメージとしては問題ありません。ただし、実際のサイトに使う場合は著作権や品質を確認してから使いましょう。'
          }
        ].map((item, i) => (
          <div key={i} className="bg-background-alt" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <p className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
              Q. {item.q}
            </p>
            <p className="text-text-secondary text-sm">A. {item.a}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '2rem' }}>
          <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
            💬 デザインのご相談はお気軽に
          </h3>
          <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
            「AIで作ってみたけど、これで合ってるかな？」
            「もっとこうしたいけど、どうすればいい？」
          </p>
          <p className="text-text-secondary leading-relaxed">
            作ったイメージをそのままLINEやメールで送ってください。
            一緒により良いデザインに仕上げていきます。
          </p>
        </div>
      </section>
    </>
  )
};

export default article;
