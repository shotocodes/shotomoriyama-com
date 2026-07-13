// src/app/privacy/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '当サイトにおける個人情報の取り扱いについてご説明します。',
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: '1. 個人情報の取得',
    body: '当サイトでは、お問い合わせフォームおよびお見積もりフォームのご利用にあたり、お名前、メールアドレス、その他ご入力いただいた情報を取得します。',
  },
  {
    heading: '2. 個人情報の利用目的',
    body: '取得した個人情報は、お問い合わせへの回答、お見積もりのご提示、制作業務のご連絡のために利用し、これらの目的以外には利用しません。',
  },
  {
    heading: '3. 個人情報の第三者提供',
    body: '法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。なお、フォームの送信にはメール配信サービスを利用しており、送信内容は同サービスを経由して処理されます。',
  },
  {
    heading: '4. アクセス解析ツールについて',
    body: '当サイトでは、サービス向上のために Google Analytics を利用しています。Google Analytics は Cookie を使用してトラフィックデータを収集しますが、このデータは匿名で収集されており、個人を特定するものではありません。Cookie を無効にすることで収集を拒否できます。',
  },
  {
    heading: '5. 免責事項',
    body: '当サイトからリンクされた外部サイトで提供される情報・サービスについては、当サイトは責任を負いません。',
  },
  {
    heading: '6. プライバシーポリシーの変更',
    body: '本ポリシーの内容は、法令の変更や必要に応じて、予告なく改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。',
  },
  {
    heading: '7. お問い合わせ窓口',
    body: '個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-text-secondary mb-12 leading-relaxed">
            森山翔登（以下「当方」）は、当サイト（shotomoriyama.com）における個人情報の取り扱いについて、以下のとおり定めます。
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-primary mb-3">{section.heading}</h2>
                <p className="text-text-secondary leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
