
import React from 'react';
import { SupportArticle } from '@/data/supportArticles';

const article: SupportArticle = {
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
};

export default article;
