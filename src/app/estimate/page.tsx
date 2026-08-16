// src/app/estimate/page.tsx
// 旧・料金シミュレーターは価格改定にともない非公開化し、
// 無料診断のご案内ページに差し替え（2026-08）。
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedButton from '@/components/ui/AnimatedButton';
import WaveGraphic from '@/components/graphics/WaveGraphic';
import { Smartphone, MessageCircle, Image as ImageIcon, Mail, ArrowRight } from 'lucide-react';
import {
  FREE_AUDIT_LABEL,
  FREE_AUDIT_MAILTO,
  CONTACT_EMAIL,
} from '@/lib/constants/site';
import { freeAudit } from '@/data/pricing';

const checks = [
  {
    icon: Smartphone,
    title: 'スマホ表示速度',
    description:
      'お客様の6〜7割はスマホから見ています。表示が遅いだけで、問い合わせ前に離脱されてしまいます。実際の計測データをもとに診断します。',
    color: '#0066FF',
  },
  {
    icon: MessageCircle,
    title: '問い合わせ導線',
    description:
      'サイトを見た人が「相談したい」と思ったとき、迷わず問い合わせにたどり着けるか。ボタンの位置・文言・入力のしやすさを確認します。',
    color: '#10B981',
  },
  {
    icon: ImageIcon,
    title: '実績の見せ方',
    description:
      '工務店・不動産会社への依頼は「実績への信頼」で決まります。施工事例や取扱物件が選ばれる見せ方になっているかを診断します。',
    color: '#FF8C42',
  },
];

// 診断の流れは pricing.ts の freeAudit（単一ソース）から
const steps = freeAudit.flow.map((item, i) => ({
  step: String(i + 1),
  title: item.title,
  text: item.text,
}));

export default function FreeAuditPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
        <PageHero
          title="FREE AUDIT"
          subtitle="無料診断"
          description="工務店・不動産会社のサイトの改善点を、3つの視点から無料で診断します"
          accentColor="#0066FF"
          graphic={<WaveGraphic color="#0066FF" opacity={0.8} animate={true} />}
          useAnimatedTitle={true}
          showGrid={true}
        />

        {/* 診断する3点 */}
        <section className="bg-background" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionTitle
                title="What We Check"
                subtitle="診断する3つのポイント"
                accentColor="#0066FF"
                marginBottom="0"
              />
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}
            >
              {checks.map((check) => {
                const Icon = check.icon;
                return (
                  <div
                    key={check.title}
                    className="border-2 border-border bg-background-alt"
                    style={{ padding: '2rem', textAlign: 'center' }}
                  >
                    <div
                      className="inline-flex items-center justify-center"
                      style={{
                        width: '4rem',
                        height: '4rem',
                        backgroundColor: `${check.color}20`,
                        marginBottom: '1.5rem',
                      }}
                    >
                      <Icon size={28} style={{ color: check.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                      {check.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{check.description}</p>
                  </div>
                );
              })}
            </div>

            {/* 実際の診断例 */}
            <div
              className="border-2 border-border bg-background-alt"
              style={{ maxWidth: '1100px', margin: '2rem auto 0', padding: '1.5rem 2rem' }}
            >
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong style={{ color: 'var(--color-text-primary)' }}>💡 </strong>
                {freeAudit.example}
                表示が遅いだけで、お客様は問い合わせの前に離れてしまいます。
              </p>
            </div>
          </div>
        </section>

        {/* 診断の流れ */}
        <section className="bg-background-alt" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionTitle
                title="How It Works"
                subtitle="診断の流れ"
                accentColor="#10B981"
                marginBottom="0"
              />
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}
            >
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="border-2 border-border bg-background"
                  style={{ padding: '2rem' }}
                >
                  <p className="text-3xl font-bold" style={{ color: '#10B981', marginBottom: '1rem' }}>
                    {item.step}
                  </p>
                  <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                まずは今のサイトの
                <br />
                「もったいない」を知ることから
              </h2>
              <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '2.5rem' }}>
                診断は無料です。結果を見てから、直すかどうかをゆっくりご判断ください。
              </p>
              <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '1.25rem' }}>
                <AnimatedButton href={FREE_AUDIT_MAILTO} icon={Mail}>
                  {FREE_AUDIT_LABEL}
                </AnimatedButton>
                <AnimatedButton href="/contact" icon={ArrowRight}>
                  フォームで相談する
                </AnimatedButton>
              </div>
              <p className="text-sm text-text-secondary" style={{ marginTop: '2rem' }}>
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer
        ctaText="サイトの改善、まずは無料診断から"
        ctaSubText="診断だけのご利用も歓迎です。お気軽にお申し込みください。"
      />
    </>
  );
}
