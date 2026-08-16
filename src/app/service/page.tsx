// src/app/service/page.tsx
// 工務店・不動産会社向けに特化したサービス紹介ページ（2026-08 Phase C）。
// 料金・納期・プラン内容は src/data/pricing.ts の単一ソースから参照する。
// 制作の流れは STEPS 配列を PC / モバイルで共用し、文言の二重定義を根絶している。
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  productionPackage,
  maintenancePlans,
  maintenanceCommon,
  maintenanceNotes,
} from '@/data/pricing';
import { FREE_AUDIT_LABEL, FREE_AUDIT_MAILTO, FREE_AUDIT_DESCRIPTION } from '@/lib/constants/site';
import {
  MessageCircle,
  Users,
  Code,
  CheckCircle,
  ChevronDown,
  Search,
  Hammer,
  Camera,
  PenLine,
  TrendingUp,
  Smartphone,
  Wrench,
  Mail,
  ArrowRight,
} from 'lucide-react';

// 制作の流れ（PC・モバイル共通の単一ソース）
const STEPS = [
  {
    number: 1,
    title: '無料診断',
    icon: Search,
    detail:
      '今のサイトの改善点を、スマホ表示速度・問い合わせ導線・実績の見せ方の3点から無料で診断します。3営業日以内に診断書PDFをお送りします。',
  },
  {
    number: 2,
    title: 'ヒアリング',
    icon: Users,
    detail:
      '会社の強みや載せたい実績を伺い、ページ構成と機能をこの段階で確定します。オンライン・対面どちらでも対応可能です。',
  },
  {
    number: 3,
    title: `制作（${productionPackage.delivery}）`,
    icon: Code,
    detail:
      '確定した構成にもとづき、デザイン・実装を進めます。デザインは2案までご提示。進捗は随時共有し、仮サイトでリアルタイムにご確認いただけます。',
  },
  {
    number: 4,
    title: '納品・公開',
    icon: CheckCircle,
    detail:
      '完成後、公開サポートと操作マニュアルをお渡しします。納品後1ヶ月間は無償サポートつきです。',
  },
  {
    number: 5,
    title: '保守・運用',
    icon: Wrench,
    detail:
      '公開してからが本番です。月額の保守・運用プランで、投稿・修正・サーバー管理まで継続的に支えます。',
  },
];

// こんなお悩みありませんか（共感セクション）
const PAIN_POINTS = [
  {
    icon: Camera,
    text: '施工事例を載せたいが、写真を撮る時間も文章を書く人もいない',
  },
  {
    icon: Smartphone,
    text: 'スマホで見ると表示が遅い・崩れている、とお客様に言われた',
  },
  {
    icon: MessageCircle,
    text: 'サイトはあるのに、問い合わせにつながらない',
  },
  {
    icon: Search,
    text: '直したい気持ちはあるが、どこに頼めばいいか分からずそのまま',
  },
];

// 現役大工の強み
const CRAFTSMAN_POINTS = [
  {
    icon: MessageCircle,
    title: '打ち合わせに「翻訳」が要らない',
    text: '納まり・工程・職人の段取りが分かるので、話が早い。専門用語をかみ砕いて説明する手間がありません。',
  },
  {
    icon: Camera,
    title: '伝わる施工事例の勘所',
    text: 'どの工程を、どの言葉で見せれば施主に伝わるか。現場側の目線で事例の見せ方を設計します。',
  },
  {
    icon: Hammer,
    title: '設計から保守まで窓口ひとつ',
    text: 'デザイン・実装・公開後の運用まで一人で完結。「言った言わない」や引き継ぎロスが起きません。',
  },
];

// よくある質問（確定データにもとづく）
const FAQS = [
  {
    q: '制作期間はどのくらいですか？',
    a: `${productionPackage.delivery}です。ページ構成・機能を事前に確定するスコープ固定方式のため、計画どおりに品質を保って制作できます。お急ぎの場合もまずはご相談ください。`,
  },
  {
    q: '料金はいくらですか？',
    a: `制作パッケージは${productionPackage.priceLabel}の固定価格です。お見積もり後の追加費用はありません。まずは無料診断で、今のサイトの改善点からご確認いただけます。`,
  },
  {
    q: '修正は何回まで可能ですか？',
    a: productionPackage.revisionPolicy +
      ' 制作範囲を超える仕様変更が必要になった場合は、事前にご相談の上で対応いたします。',
  },
  {
    q: '公開後のサポートはありますか？',
    a: '納品後1ヶ月間は無償でサポートいたします。その後は月額の保守・運用プラン（ライト / スタンダード / プレミアム / コンテンツ運用）で、投稿・修正からサーバー管理まで継続的に対応します。',
  },
  {
    q: '保守・運用プランだけの契約はできますか？',
    a: '保守・運用プランは制作パッケージとセットでのご契約となります。既存サイトをお持ちの場合は、まず無料診断で現状を確認するところからご相談ください。',
  },
  {
    q: 'ドメインは誰のものになりますか？',
    a: 'ドメインはお客様に帰属します。万一ご契約を終了される場合も、30日以内の移管に協力いたしますのでご安心ください。',
  },
  {
    q: '遠方でも対応可能ですか？',
    a: 'オンラインでのお打ち合わせに対応しておりますので、全国どこからでもご依頼いただけます。必要に応じて対面でのお打ち合わせも可能です。',
  },
];

export default function ServicePage() {
  const [openMobileStep, setOpenMobileStep] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-background"
        style={{ paddingTop: '80px', overflowX: 'hidden' }}
      >
        {/* ヒーローセクション */}
        <section
          className="relative"
          style={{
            padding: '5rem 0',
            paddingTop: '8rem',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* グリッド背景 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* 揺らぐ円形ダイアグラム - 超大型 */}
          <div
            className="hidden lg:block absolute"
            style={{
              top: '20%',
              right: '-25%',
              width: '1000px',
              height: '1000px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(0, 102, 255, 0.1))',
                opacity: 0.6,
              }}
            >
              <motion.circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-text-secondary"
                style={{ opacity: 0.8 }}
                animate={{ r: [175, 190, 175], strokeWidth: [0.4, 0.6, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="140"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="8 8"
                className="text-text-secondary"
                style={{ opacity: 0.6, transformOrigin: 'center' }}
                animate={{ r: [135, 148, 135], rotate: [0, 360] }}
                transition={{
                  r: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="6 6"
                className="text-text-secondary"
                style={{ opacity: 0.5, transformOrigin: 'center' }}
                animate={{ r: [95, 108, 95], rotate: [360, 0] }}
                transition={{
                  r: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-text-secondary"
                style={{ opacity: 0.7 }}
                animate={{
                  r: [55, 68, 55],
                  strokeWidth: [0.4, 0.6, 0.4],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="3"
                fill="#0066FF"
                animate={{ r: [2, 4, 2], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const x1 = 200 + 65 * Math.cos((angle * Math.PI) / 180);
                const y1 = 200 + 65 * Math.sin((angle * Math.PI) / 180);
                const x2 = 200 + 175 * Math.cos((angle * Math.PI) / 180);
                const y2 = 200 + 175 * Math.sin((angle * Math.PI) / 180);
                return (
                  <motion.line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className="text-text-secondary"
                    animate={{ opacity: [0.2, 0.7, 0.2], strokeWidth: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  />
                );
              })}
              <motion.circle
                cx="200"
                cy="200"
                r="0"
                fill="none"
                stroke="#0066FF"
                strokeWidth="0.5"
                opacity="0"
                animate={{ r: [0, 180], opacity: [0.6, 0], strokeWidth: [0.8, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
              />
              {[
                { radius: 180, duration: 15, size: 2.5, delay: 0 },
                { radius: 140, duration: 12, size: 2, delay: 2 },
                { radius: 100, duration: 10, size: 2, delay: 4 },
              ].map((orbit, i) => (
                <motion.circle
                  key={`orbit-${i}`}
                  r={orbit.size}
                  fill="#0066FF"
                  style={{ filter: 'blur(0.3px)', opacity: 0.7 }}
                  animate={{
                    cx: [200 + orbit.radius, 200, 200 - orbit.radius, 200, 200 + orbit.radius],
                    cy: [200, 200 - orbit.radius, 200, 200 + orbit.radius, 200],
                    opacity: [0.5, 0.9, 0.5, 0.9, 0.5],
                  }}
                  transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear', delay: orbit.delay }}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 120 + ((i * 37) % 41);
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="#0066FF"
                    animate={{ opacity: [0, 1, 0], r: [0.8, 2, 0.8] }}
                    transition={{
                      duration: 2 + ((i * 7) % 21) / 10,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}
            </svg>

            {/* テキストラベル */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ pointerEvents: 'none' }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-base text-text-secondary font-light">For Builders</p>
              <p className="text-sm text-text-secondary opacity-60">& Realtors</p>
            </motion.div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 10 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左側: タイトル + 全テキスト */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <AnimatedTitle text="SERVICE" accentColor="#0066FF" />
                </div>

                <p className="text-xl lg:text-2xl text-text-secondary font-light" style={{ marginBottom: '1rem' }}>
                  工務店・不動産会社向けサイト制作
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '120px' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    height: '3px',
                    background: 'linear-gradient(to right, #0066FF, transparent)',
                    marginBottom: '2rem',
                  }}
                />

                <p className="text-2xl lg:text-3xl text-primary font-light leading-relaxed" style={{ marginBottom: '1rem' }}>
                  仕事が取れるサイトを、
                  <br />
                  現場を知る制作者と
                </p>

                <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
                  現役大工のWeb制作者が、診断から制作・運用まで一貫して設計します。
                </p>
              </motion.div>

              {/* 右側: 空白 (サークル用のスペース) */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </section>

        {/* こんなお悩みありませんか */}
        <section className="bg-background-alt" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Common Problems"
              subtitle="こんなお悩みはありませんか"
              accentColor="#0066FF"
              marginBottom="4rem"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: '1.5rem', maxWidth: '56rem', margin: '0 auto' }}
            >
              {PAIN_POINTS.map((pain, index) => {
                const Icon = pain.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start bg-background border-2 border-border"
                    style={{ gap: '1rem', padding: '1.5rem' }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: '2.75rem', height: '2.75rem', backgroundColor: '#0066FF20' }}
                    >
                      <Icon size={20} style={{ color: '#0066FF' }} />
                    </div>
                    <p className="text-base text-text-secondary leading-relaxed">{pain.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-text-secondary leading-relaxed"
              style={{ marginTop: '3rem', maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}
            >
              ひとつでも当てはまったら、まずは無料診断から。
              <br />
              {FREE_AUDIT_DESCRIPTION}
            </motion.p>
          </div>
        </section>

        {/* Timeline - 診断から保守までの流れ */}
        <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Flow"
              subtitle="診断から保守までの流れ"
              accentColor="#0066FF"
              marginBottom="4rem"
            />

            {/* 背景の円形グラフィック */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                pointerEvents: 'none',
                opacity: 0.3,
                zIndex: 0,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 400 400">
                <motion.circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, rotate: 0 }}
                  whileInView={{ pathLength: 1, rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeWidth="0.5"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="100"
                  fill="none"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
                />
                {[
                  { radius: 180, duration: 15, size: 2.5, delay: 0 },
                  { radius: 140, duration: 12, size: 2, delay: 2 },
                  { radius: 100, duration: 10, size: 2, delay: 4 },
                ].map((orbit, i) => (
                  <motion.circle
                    key={`orbit-${i}`}
                    r={orbit.size}
                    fill="#0066FF"
                    style={{ filter: 'blur(0.3px)', opacity: 0.7 }}
                    animate={{
                      cx: [200 + orbit.radius, 200, 200 - orbit.radius, 200, 200 + orbit.radius],
                      cy: [200, 200 - orbit.radius, 200, 200 + orbit.radius, 200],
                      opacity: [0.5, 0.9, 0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear', delay: orbit.delay }}
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8;
                  const radius = 120 + ((i * 37) % 41);
                  const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                  return (
                    <motion.circle
                      key={`particle-${i}`}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#0066FF"
                      animate={{ opacity: [0, 1, 0], r: [0.8, 2, 0.8] }}
                      transition={{
                        duration: 2 + ((i * 7) % 21) / 10,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              {/* PC版 */}
              <div className="hidden lg:block">
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4rem',
                      left: '12%',
                      right: '12%',
                      height: '1px',
                      background:
                        'linear-gradient(to right, transparent, var(--color-border), var(--color-border), var(--color-border), transparent)',
                      zIndex: 0,
                    }}
                  />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '1rem',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {STEPS.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-center relative group"
                        >
                          <motion.div
                            className="mx-auto border-2 border-border flex items-center justify-center font-bold bg-background group-hover:bg-primary group-hover:text-background transition-all duration-300"
                            style={{
                              width: '8rem',
                              height: '8rem',
                              fontSize: '3rem',
                              color: '#0066FF',
                              marginBottom: '2rem',
                              position: 'relative',
                              cursor: 'pointer',
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {String(step.number).padStart(2, '0')}
                            <div
                              className="absolute transition-all duration-300 group-hover:bg-background"
                              style={{
                                bottom: '-0.75rem',
                                right: '-0.75rem',
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                backgroundColor: '#0066FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid var(--color-background)',
                              }}
                            >
                              <Icon
                                size={16}
                                className="group-hover:text-primary transition-colors duration-300"
                                style={{ color: 'white' }}
                              />
                            </div>
                          </motion.div>

                          <h4 className="font-bold text-primary" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                            {step.title}
                          </h4>

                          {/* テロップ (ホバー時) */}
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 bg-background border-2 border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                            style={{
                              top: 'calc(100% + 1rem)',
                              width: '40rem',
                              padding: '1rem',
                              borderRadius: '8px',
                              pointerEvents: 'none',
                            }}
                          >
                            <div
                              className="absolute bg-background border-t-2 border-l-2 border-border"
                              style={{
                                top: '-0.5rem',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(45deg)',
                                width: '1rem',
                                height: '1rem',
                              }}
                            />
                            <div style={{ overflow: 'hidden' }}>
                              <motion.p
                                key={`tooltip-${step.number}`}
                                className="text-sm text-text-secondary"
                                initial={{ x: '100%' }}
                                animate={{ x: '-100%' }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 1 }}
                                style={{ whiteSpace: 'nowrap' }}
                              >
                                {step.detail}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* モバイル版 - タップで開閉（STEPS を共用） */}
              <div className="lg:hidden">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isOpen = openMobileStep === index;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div
                          onClick={() => setOpenMobileStep(isOpen ? null : index)}
                          className="transition-all duration-300"
                          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }}
                        >
                          <div
                            className="flex-shrink-0 border-2 border-border flex items-center justify-center font-bold relative transition-all duration-300"
                            style={{
                              width: '5rem',
                              height: '5rem',
                              fontSize: '2rem',
                              backgroundColor: isOpen ? 'var(--color-text-primary)' : 'var(--color-background)',
                              color: isOpen ? 'var(--color-background)' : 'var(--color-text-primary)',
                            }}
                          >
                            {String(step.number).padStart(2, '0')}
                            <div
                              className="absolute transition-all duration-300"
                              style={{
                                bottom: '-0.5rem',
                                right: '-0.5rem',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                backgroundColor: isOpen ? 'var(--color-background)' : '#0066FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid var(--color-background)',
                              }}
                            >
                              <Icon
                                size={14}
                                style={{ color: isOpen ? 'var(--color-text-primary)' : 'white', transition: 'color 0.3s' }}
                              />
                            </div>
                          </div>

                          <h4 className="font-bold text-primary flex-1" style={{ fontSize: '1.125rem' }}>
                            {step.title}
                          </h4>

                          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown size={24} className="text-text-secondary" />
                          </motion.div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden', marginTop: '1rem', marginLeft: '6.5rem' }}
                        >
                          <div className="bg-background border-2 border-border" style={{ padding: '1rem', borderRadius: '8px' }}>
                            <p className="text-sm text-text-secondary">{step.detail}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 制作パッケージ（内容と価格） */}
        <section className="bg-background-alt" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Package"
              subtitle="制作パッケージ"
              accentColor="#0066FF"
              marginBottom="4rem"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-border bg-background"
              style={{ maxWidth: '56rem', margin: '0 auto', padding: '3rem 2rem' }}
            >
              <p className="text-sm font-medium" style={{ color: '#0066FF', marginBottom: '0.5rem' }}>
                固定価格・スコープ固定方式
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                {productionPackage.name}
              </h3>

              <div className="flex flex-wrap items-baseline" style={{ gap: '1rem', marginBottom: '0.75rem' }}>
                <span className="text-4xl lg:text-5xl font-bold text-primary">
                  {productionPackage.priceLabel}
                </span>
                <span className="text-base text-text-secondary">納期 {productionPackage.delivery}</span>
              </div>
              <p className="text-sm text-text-secondary" style={{ marginBottom: '2.5rem' }}>
                {productionPackage.deliveryNote}
              </p>

              <p className="text-sm font-bold text-text-secondary" style={{ marginBottom: '1rem' }}>
                パッケージに含まれるもの
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0.75rem', marginBottom: '2.5rem' }}>
                {productionPackage.includes.map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: '0.5rem' }}>
                    <CheckCircle size={18} style={{ color: '#0066FF', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span className="text-base text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>

              <div
                className="bg-background-alt border-l-4"
                style={{ padding: '1.25rem 1.5rem', borderColor: '#0066FF', marginBottom: '1rem' }}
              >
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong style={{ color: 'var(--color-text-primary)' }}>修正について: </strong>
                  {productionPackage.revisionPolicy}
                </p>
              </div>
              <div className="bg-background-alt border-l-4" style={{ padding: '1.25rem 1.5rem', borderColor: '#10B981' }}>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong style={{ color: 'var(--color-text-primary)' }}>納品後: </strong>
                  {productionPackage.aftercare}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 保守・運用プラン */}
        <section style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Maintenance"
              subtitle="保守・運用プラン（月額）"
              accentColor="#10B981"
              marginBottom="4rem"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{ gap: '1.5rem', maxWidth: '72rem', margin: '0 auto' }}
            >
              {maintenancePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.recommended && (
                    <div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-background text-xs font-bold px-4 py-1"
                      style={{ zIndex: 2 }}
                    >
                      おすすめ
                    </div>
                  )}
                  <div
                    className={`border-2 bg-background transition-all duration-300 hover:border-primary ${
                      plan.recommended ? 'border-primary' : 'border-border'
                    }`}
                    style={{ padding: '2rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                      {plan.monthlyLabel}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start" style={{ gap: '0.5rem' }}>
                          <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.2rem' }} />
                          <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 全プラン共通 + 注記 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ maxWidth: '72rem', margin: '2rem auto 0' }}
            >
              <div className="border-2 border-border bg-background-alt" style={{ padding: '1.5rem 2rem' }}>
                <p className="text-sm font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                  全プラン共通
                </p>
                <div className="flex flex-wrap" style={{ gap: '0.5rem 1.5rem', marginBottom: '1.25rem' }}>
                  {maintenanceCommon.map((item, i) => (
                    <span key={i} className="flex items-center text-sm text-text-secondary" style={{ gap: '0.4rem' }}>
                      <CheckCircle size={14} style={{ color: '#10B981' }} />
                      {item}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {maintenanceNotes.map((note, i) => (
                    <p key={i} className="text-xs text-text-secondary leading-relaxed">
                      ※ {note}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 施工事例・記事の制作代行（コンテンツ運用プラン） */}
        <section className="bg-background-alt" style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Content Support"
              subtitle="施工事例・記事の制作代行"
              accentColor="#FF8C42"
              marginBottom="4rem"
            />

            <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                  「施工事例が溜まらない」を、
                  <br className="lg:hidden" />
                  終わらせます
                </h3>
                <p className="text-text-secondary leading-relaxed" style={{ maxWidth: '40rem', margin: '0 auto' }}>
                  写真を撮る時間がない。文章を書く人がいない。
                  <br />
                  多くの工務店サイトは、そこで止まっています。
                  <br />
                  でも、工務店サイトの成果は施工事例の量と質でほぼ決まります。
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-background border-2 border-border"
                  style={{ padding: '2rem' }}
                >
                  <div
                    className="inline-flex items-center justify-center"
                    style={{ width: '3rem', height: '3rem', backgroundColor: '#FF8C4220', marginBottom: '1.25rem' }}
                  >
                    <PenLine size={22} style={{ color: '#FF8C42' }} />
                  </div>
                  <h4 className="text-lg font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                    現役大工が、現場の言葉で書く
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    どの工程を、どの言葉で伝えれば施主に響くか。現場を知っているから、取材も執筆も的確です。
                    専門用語の「翻訳」に時間を取らせません。
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-background border-2 border-border"
                  style={{ padding: '2rem' }}
                >
                  <div
                    className="inline-flex items-center justify-center"
                    style={{ width: '3rem', height: '3rem', backgroundColor: '#FF8C4220', marginBottom: '1.25rem' }}
                  >
                    <TrendingUp size={22} style={{ color: '#FF8C42' }} />
                  </div>
                  <h4 className="text-lg font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                    取材から公開まで、月2〜4本を代行
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    コンテンツ運用プラン（{maintenancePlans.find((p) => p.id === 'content')?.monthlyLabel}）では、
                    施工事例・記事の取材・執筆・公開までを丸ごと代行。社内の手を止めずに事例が増えていきます。
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center' }}
              >
                <p className="text-sm text-text-secondary" style={{ marginBottom: '1.5rem' }}>
                  まずは今のサイトの「実績の見せ方」から、無料で診断します。
                </p>
                <AnimatedButton href={FREE_AUDIT_MAILTO} icon={Mail}>
                  {FREE_AUDIT_LABEL}
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 現役大工の強み */}
        <section style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Why Me"
              subtitle="現役大工がつくる、という強み"
              accentColor="#0066FF"
              marginBottom="4rem"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: '2rem', maxWidth: '64rem', margin: '0 auto' }}
            >
              {CRAFTSMAN_POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className="mx-auto flex items-center justify-center"
                      style={{ width: '4rem', height: '4rem', backgroundColor: '#0066FF20', marginBottom: '1.5rem' }}
                    >
                      <Icon size={26} style={{ color: '#0066FF' }} />
                    </div>
                    <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
                      {point.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{point.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ textAlign: 'center', marginTop: '3rem' }}
            >
              <Link
                href="/works"
                className="inline-flex items-center text-sm font-bold text-primary hover:text-[#0066FF] transition-colors"
                style={{ gap: '0.5rem' }}
              >
                <span>制作実績を見る</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ セクション */}
        <section className="bg-background-alt" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="FAQ" subtitle="よくある質問" accentColor="#0066FF" marginBottom="4rem" />

            {/* 背景 - 放射線サークル (右上) */}
            <div
              style={{
                position: 'absolute',
                top: '-10%',
                right: '-8%',
                width: '800px',
                height: '800px',
                pointerEvents: 'none',
                opacity: 0.3,
                zIndex: 0,
              }}
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="3" fill="#0066FF" opacity="0.5" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                    const length = 180;
                    const x1 = 200 + 15 * Math.cos((angle * Math.PI) / 180);
                    const y1 = 200 + 15 * Math.sin((angle * Math.PI) / 180);
                    const x2 = 200 + length * Math.cos((angle * Math.PI) / 180);
                    const y2 = 200 + length * Math.sin((angle * Math.PI) / 180);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        className="text-text-secondary"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                    );
                  })}
                  <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-text-secondary" strokeWidth="0.5" />
                  <circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    className="text-text-secondary"
                    strokeWidth="0.5"
                    strokeDasharray="8 8"
                  />
                </svg>
              </motion.div>
            </div>

            {/* FAQ リスト */}
            <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-background border-2 border-border"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left"
                        style={{ padding: '1.25rem 1.5rem', gap: '1rem', cursor: 'pointer' }}
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-bold text-primary">{faq.q}</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown size={20} className="text-text-secondary" />
                        </motion.span>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="text-sm text-text-secondary leading-relaxed" style={{ padding: '0 1.5rem 1.25rem' }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 詳細ページへのボタン */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
                style={{ marginTop: '3rem' }}
              >
                <AnimatedButton href="/order?tab=faq" icon={CheckCircle}>
                  More Questions
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 診断CTA */}
        <section style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                まずは今のサイトの
                <br />
                「もったいない」を知ることから
              </h2>
              <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '2.5rem' }}>
                {FREE_AUDIT_DESCRIPTION}。
                <br />
                診断は無料です。結果を見てから、直すかどうかをゆっくりご判断ください。
              </p>
              <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '1.25rem' }}>
                <AnimatedButton href={FREE_AUDIT_MAILTO} icon={Mail}>
                  {FREE_AUDIT_LABEL}
                </AnimatedButton>
                <AnimatedButton href="/estimate" icon={ArrowRight}>
                  診断の詳細を見る
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer
        ctaText="工務店・不動産会社のサイト、まずは無料診断から"
        ctaSubText="診断だけのご利用も歓迎です。お気軽にお申し込みください。"
      />
    </>
  );
}
