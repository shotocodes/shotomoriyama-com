import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
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
};

export default article;
