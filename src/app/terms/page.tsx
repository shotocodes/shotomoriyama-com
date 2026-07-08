// src/app/terms/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'サイト利用規約',
  description: '当サイトのご利用にあたっての規約です。',
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: '1. 適用',
    body: '本規約は、当サイト（shotomoriyama.com）の閲覧およびご利用に関する条件を定めるものです。当サイトをご利用いただいた時点で、本規約に同意いただいたものとみなします。',
  },
  {
    heading: '2. 著作権',
    body: '当サイトに掲載されている文章、画像、デザイン、コードなどの著作物の著作権は、特段の記載がない限り当方または正当な権利者に帰属します。無断転載・複製はご遠慮ください。',
  },
  {
    heading: '3. 禁止事項',
    body: '当サイトの運営を妨害する行為、他の利用者または第三者に不利益・損害を与える行為、法令または公序良俗に反する行為を禁止します。',
  },
  {
    heading: '4. 免責事項',
    body: '当サイトの情報は正確性の維持に努めていますが、その完全性・正確性を保証するものではありません。当サイトの利用により生じたいかなる損害についても、当方は責任を負いかねます。',
  },
  {
    heading: '5. 規約の変更',
    body: '本規約は、必要に応じて予告なく変更することがあります。変更後の規約は本ページに掲載した時点で効力を生じます。',
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            サイト利用規約
          </h1>
          <p className="text-text-secondary mb-12 leading-relaxed">
            当サイトをご利用いただく前に、以下の規約をご確認ください。
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
