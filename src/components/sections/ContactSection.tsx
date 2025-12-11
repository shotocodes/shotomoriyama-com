// src/components/sections/ContactSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from'@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import { Mail, FileText, Calculator, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const containerHeight = container.offsetHeight;
      const scrollableHeight = containerHeight - window.innerHeight;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: FileText,
      title: 'ご依頼の流れを見る',
      description: '初めての方はこちら',
      href: '/how-to-order',
      color: '#0066FF'
    },
    {
      icon: Calculator,
      title: 'かんたん見積もり',
      description: '概算をすぐに確認',
      href: '/order',
      color: '#4ECDC4'
    },
    {
      icon: MessageCircle,
      title: '詳しく相談する',
      description: 'フォームでお問い合わせ',
      href: '/contact',
      color: '#556270'
    }
  ];

  return (
    <div
      ref={containerRef}
      className="relative mt-[60px] md:mt-[30px] lg:mt-[60px]"
      style={{
        marginBottom: '100px',
        marginLeft: '20px',
        marginRight: '20px',
        height: '200vh'
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          id="contact"
          className="relative bg-background h-full"
        >
          {/* 背景グリッド */}
          <GridBackground show={true} />

          {/* スピードメーター - 左下 */}
          <SpeedMeter
            scrollProgress={scrollProgress}
            position="left"
            color="#556270"
            gradientStart="#556270"
            gradientEnd="#8892A0"
          />

          {/* ボタン - 右下 */}
          <GridButton
            href="#hero"
            text="TOP"
            position="right"
            mobileOnly
          />

          <GridButton
            href="#hero"
            text="トップに戻る"
            position="right"
            desktopOnly
          />

          <div className="h-full flex items-center">
            <div className="container !mx-auto !px-4 !sm:px-6 !lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                {/* 中央 */}
                <div className="flex-1 min-w-0 w-full">
                  {/* ヘッダー */}
                  <div className="flex flex-col lg:flex-row items-start justify-between !mb-12 !lg:mb-16 gap-6">
                    <div className="flex-1">
                      <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-light relative !pb-2">
                        まずはお気軽にご相談ください
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{
                            background: 'linear-gradient(to right, #556270, #8892A0)',
                          }}
                        />
                      </p>
                      <p className="text-sm lg:text-base text-text-secondary opacity-70 font-light !mt-3">
                        2営業日以内にご返信いたします
                      </p>
                    </div>
                  </div>

                  {/* コンタクトオプション */}
                  <div className="max-w-3xl !mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mb-12">
                      {contactOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                          >
                            <Link href={option.href}>
                              <div className="group h-full !p-8 rounded-lg border-2 border-border hover:border-[#556270] transition-all hover:scale-105 cursor-pointer bg-background">
                                <div className="flex flex-col items-center text-center">
                                  <div
                                    className="!mb-6 !p-4 rounded-full"
                                    style={{
                                      backgroundColor: `${option.color}20`
                                    }}
                                  >
                                    <Icon
                                      size={40}
                                      style={{ color: option.color }}
                                    />
                                  </div>
                                  <h3 className="text-xl font-bold text-primary !mb-3">
                                    {option.title}
                                  </h3>
                                  <p className="text-sm text-text-secondary">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* 代替連絡手段 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-center !pt-12 border-t-2 border-border"
                    >
                      <p className="text-sm text-text-secondary !mb-4">
                        または、直接メールでもお問い合わせいただけます
                      </p>
                      <a
                        href="mailto:0sdm0.moriyama@gmail.com"
                        className="inline-flex items-center gap-2 !px-6 !py-3 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                          borderColor: '#556270',
                          color: '#556270',
                          border: '2px solid'
                        }}
                      >
                        <Mail size={20} />
                        <span>0sdm0.moriyama@gmail.com</span>
                      </a>
                    </motion.div>
                  </div>
                </div>

                {/* 右: CONTACT */}
                <AnimatedText
                  text="CONTACT"
                  scrollProgress={scrollProgress}
                  orientation="vertical"
                  align="right"
                  accentColor="#556270"
                />

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
