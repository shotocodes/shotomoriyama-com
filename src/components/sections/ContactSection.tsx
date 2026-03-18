// src/components/sections/ContactSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import { Mail, FileText, Calculator, ArrowRight } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useResponsive';

// Instagram アイコン
const InstagramIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
);

// LINE アイコン
const LineIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
      fill="currentColor"
    />
  </svg>
);

// ============================================================
// データ定義
// ============================================================
const quickContactOptions = [
  {
    icon: LineIcon,
    title: 'LINE',
    value: '@shoto0720',
    description: '最速返信',
    priority: 1,
    color: '#10B981',
    link: 'https://line.me/ti/p/shoto0720',
  },
  {
    icon: InstagramIcon,
    title: 'Instagram',
    value: '@sh0t0x72',
    description: 'DM歓迎',
    priority: 2,
    color: '#E1306C',
    link: 'https://www.instagram.com/sh0t0x72/',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'メール',
    description: '24時間受付',
    priority: 3,
    color: '#FF6B6B',
    link: 'mailto:0sdm0.moriyama@gmail.com',
  }
];

const detailOptions = [
  {
    icon: FileText,
    title: 'ご依頼の流れ',
    description: '初めての方はこちら',
    href: '/order',
    color: '#0066FF'
  },
  {
    icon: Calculator,
    title: 'かんたん見積もり',
    description: '概算をすぐに確認',
    href: '/estimate',
    color: '#10B981'
  },
  {
    icon: Mail,
    title: 'フォームで相談',
    description: '詳しくお問い合わせ',
    href: '/contact',
    color: '#FF6B6B'
  }
];

// ============================================================
// モバイル用コンポーネント
// ============================================================
function MobileContact() {
  return (
    <div className="bg-background" style={{ padding: '4rem 1.25rem' }}>
      {/* タイトル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 className="text-4xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
          CONTACT
        </h2>
        <div
          style={{
            height: '3px',
            width: '80px',
            background: 'linear-gradient(to right, #FF6B6B, #FF9A8B)',
            marginBottom: '1rem'
          }}
        />
        <p className="text-base text-text-secondary leading-relaxed">
          まずはお気軽にご相談ください
        </p>
        <p className="text-xs text-text-secondary opacity-70 mt-1">
          あなたのビジネスに最適なソリューションを提案します
        </p>
      </motion.div>

      {/* まずはお気軽に */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-lg font-bold text-primary"
        style={{ marginBottom: '1rem' }}
      >
        まずはお気軽に
      </motion.h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {quickContactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border-2 border-border hover:border-primary transition-all bg-background"
                style={{ padding: '1rem 1.25rem' }}
              >
                {/* 優先度バッジ + アイコン */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    className="text-xs font-bold"
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: option.color,
                      color: '#ffffff',
                      borderRadius: '50%',
                      zIndex: 10,
                      fontSize: '0.65rem'
                    }}
                  >
                    {option.priority}
                  </div>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: `${option.color}20`
                    }}
                  >
                    <Icon size={24} style={{ color: option.color }} />
                  </div>
                </div>

                {/* テキスト */}
                <div className="flex-1">
                  <h4 className="text-base font-bold text-primary">{option.title}</h4>
                  <p className="text-sm" style={{ color: option.color }}>{option.value}</p>
                </div>

                <span className="text-xs text-text-secondary">{option.description}</span>
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* 詳しく知りたい方 */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-lg font-bold text-primary"
        style={{ marginBottom: '1rem' }}
      >
        詳しく知りたい方
      </motion.h3>

      <div className="grid grid-cols-3" style={{ gap: '0.75rem', marginBottom: '2rem' }}>
        {detailOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={option.href}>
                <div
                  className="border-2 border-border flex flex-col items-center text-center bg-background"
                  style={{ padding: '1rem 0.5rem' }}
                >
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: `${option.color}20`,
                      marginBottom: '0.5rem'
                    }}
                  >
                    <Icon size={20} style={{ color: option.color }} />
                  </div>
                  <h4 className="text-xs font-bold text-primary" style={{ marginBottom: '0.25rem' }}>
                    {option.title}
                  </h4>
                  <p className="text-[10px] text-text-secondary">{option.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 注意事項 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center border-t-2 border-border"
        style={{ paddingTop: '1.5rem' }}
      >
        <p className="text-xs text-text-secondary" style={{ marginBottom: '0.5rem' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>返信優先度：</strong>
          LINE → Instagram → Email
        </p>
        <p className="text-xs text-text-secondary">
          電話・オンラインミーティングは上記方法で事前調整をお願いします
        </p>
      </motion.div>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // SSR対策
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // PC用カード進捗計算
  const calculateCardProgress = (index: number, section: 'quick' | 'detail') => {
    const baseThreshold = section === 'quick' ? 0.3 : 0.5;
    const cardThreshold = baseThreshold + (index * 0.15);
    if (scrollProgress <= cardThreshold) return 0;
    return Math.min(1, (scrollProgress - cardThreshold) / 0.15);
  };

  return (
    <>
      {/* ========== モバイル表示 ========== */}
      <div className="lg:hidden">
        <MobileContact />
      </div>

      {/* ========== PC表示（スクロールアニメーション） ========== */}
      <div
        ref={containerRef}
        className="relative hidden lg:block mt-[60px]"
        style={{
          marginBottom: '100px',
          marginLeft: '20px',
          marginRight: '20px',
          height: '250vh'
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <section id="contact" className="relative bg-background h-full">
            <GridBackground show={true} />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="left"
              color="#FF6B6B"
              gradientStart="#FF6B6B"
              gradientEnd="#FF9A8B"
            />

            <GridButton href="#hero" text="トップに戻る" position="right" desktopOnly />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-12">

                  <div className="flex-1 min-w-0 w-full">
                    {/* ヘッダー */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2 inline-block">
                        まずはお気軽にご相談ください
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{ background: 'linear-gradient(to right, #FF6B6B, #FF9A8B)' }}
                        />
                      </p>
                      <p className="text-base text-text-secondary opacity-70 mt-2">
                        あなたのビジネスに最適なソリューションを提案します
                      </p>
                    </div>

                    <div className="max-w-5xl mx-auto">

                      {/* 上段: まずはお気軽に */}
                      <div style={{ marginBottom: '2.5rem' }}>
                        <motion.h3
                          transition={{ duration: 0.6 }}
                          className="text-xl font-bold text-primary"
                          style={{
                            opacity: scrollProgress > 0.2 ? 1 : 0,
                            y: scrollProgress > 0.2 ? 0 : 20,
                            marginBottom: '1.5rem'
                          }}
                        >
                          まずはお気軽に
                        </motion.h3>

                        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
                          {quickContactOptions.map((option, index) => {
                            const Icon = option.icon;
                            const cardProgress = calculateCardProgress(index, 'quick');
                            const translateY = 60 * (1 - cardProgress);
                            const opacity = cardProgress;

                            return (
                              <motion.div
                                key={index}
                                style={{ y: translateY, opacity, scale: 0.9 + (cardProgress * 0.1) }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                              >
                                <a href={option.link} target="_blank" rel="noopener noreferrer">
                                  <div
                                    className="group border-2 border-border hover:border-primary transition-all hover:scale-105 cursor-pointer bg-background rounded-lg"
                                    style={{ padding: '2.5rem 2rem', minHeight: '220px' }}
                                  >
                                    <div className="flex flex-col items-center text-center">
                                      {/* アイコン + バッジ */}
                                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                                        <div
                                          className="text-xs font-bold"
                                          style={{
                                            position: 'absolute',
                                            top: '-6px',
                                            right: '-6px',
                                            width: '22px',
                                            height: '22px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: option.color,
                                            color: '#ffffff',
                                            borderRadius: '50%',
                                            zIndex: 10,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            fontSize: '0.75rem'
                                          }}
                                        >
                                          {option.priority}
                                        </div>
                                        <div
                                          className="rounded-full"
                                          style={{
                                            backgroundColor: `${option.color}20`,
                                            padding: '1.25rem'
                                          }}
                                        >
                                          <Icon size={40} style={{ color: option.color }} />
                                        </div>
                                      </div>

                                      <h4 className="text-xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                                        {option.title}
                                      </h4>
                                      <p className="text-base font-semibold" style={{ color: option.color, marginBottom: '0.5rem' }}>
                                        {option.value}
                                      </p>
                                      <p className="text-sm text-text-secondary">{option.description}</p>
                                    </div>
                                  </div>
                                </a>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 下段: 詳しく知りたい方 */}
                      <div style={{ marginBottom: '2rem' }}>
                        <motion.h3
                          transition={{ duration: 0.6 }}
                          className="text-xl font-bold text-primary"
                          style={{
                            opacity: scrollProgress > 0.45 ? 1 : 0,
                            y: scrollProgress > 0.45 ? 0 : 20,
                            marginBottom: '1.5rem'
                          }}
                        >
                          詳しく知りたい方
                        </motion.h3>

                        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
                          {detailOptions.map((option, index) => {
                            const Icon = option.icon;
                            const cardProgress = calculateCardProgress(index, 'detail');
                            const translateY = 60 * (1 - cardProgress);
                            const opacity = cardProgress;

                            return (
                              <motion.div
                                key={index}
                                style={{ y: translateY, opacity, scale: 0.9 + (cardProgress * 0.1) }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                              >
                                <Link href={option.href}>
                                  <div
                                    className="group border-2 border-border hover:border-primary transition-all hover:scale-105 cursor-pointer bg-background rounded-lg"
                                    style={{ padding: '2.5rem 2rem', minHeight: '220px' }}
                                  >
                                    <div className="flex flex-col items-center text-center">
                                      <div
                                        className="rounded-full"
                                        style={{
                                          backgroundColor: `${option.color}20`,
                                          padding: '1.25rem',
                                          marginBottom: '1.5rem'
                                        }}
                                      >
                                        <Icon size={40} style={{ color: option.color }} />
                                      </div>
                                      <h4 className="text-xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                                        {option.title}
                                      </h4>
                                      <p className="text-sm text-text-secondary">{option.description}</p>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 注意事項 */}
                      <motion.div
                        style={{
                          opacity: scrollProgress > 0.7 ? 1 : 0,
                          y: scrollProgress > 0.7 ? 0 : 20,
                          paddingTop: '1.5rem'
                        }}
                        transition={{ duration: 0.6 }}
                        className="text-center border-t-2 border-border"
                      >
                        <p className="text-sm text-text-secondary" style={{ marginBottom: '0.5rem' }}>
                          <strong style={{ color: 'var(--color-text-primary)' }}>返信優先度：</strong>
                          LINE → Instagram → Email
                        </p>
                        <p className="text-sm text-text-secondary">
                          電話・オンラインミーティングは上記方法で事前調整をお願いします
                        </p>
                      </motion.div>

                    </div>
                  </div>

                  {/* AnimatedText - PC右側 */}
                  <div className="hidden lg:block">
                    <AnimatedText
                      text="CONTACT"
                      scrollProgress={scrollProgress}
                      orientation="vertical"
                      align="right"
                      accentColor="#FF6B6B"
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
