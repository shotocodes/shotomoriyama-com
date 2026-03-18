'use client';

import { Globe, Palette, Settings } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import { ScrollCircleCard, HoverCircleCard, MobileServiceCard } from '@/components/shared/CircleCard';
import { useResponsiveCircle, useScrollProgress } from '@/hooks/useResponsive';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const { circlePadding, cardSpacing, isMobile } = useResponsiveCircle();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


  const services = [
    {
      icon: Globe,
      title: 'Web制作',
      titleEn: 'WEB DEVELOPMENT',
      description: 'Next.js/Reactを活用したモダンなWebサイト制作。\nデザインから実装まで一貫してサポートします。',
      features: ['コーポレートサイト', 'ランディングページ', 'Next.js/React開発', 'WordPress構築', 'レスポンシブ対応'],
      color: '#0066FF',
    },
    {
      icon: Palette,
      title: 'デザイン',
      titleEn: 'DESIGN',
      description: 'UIデザイン、ロゴ制作、看板デザインなど。\nテンプレートに頼らず、一から丁寧にデザインします。',
      features: ['UIデザイン', 'ロゴ制作', '看板デザイン', 'ブランディング'],
      color: '#4ECDC4',
    },
    {
      icon: Settings,
      title: '保守運用',
      titleEn: 'MAINTENANCE',
      description: '安定稼働を支える継続的なサポート。\nセキュリティ対策・パフォーマンス最適化まで対応。',
      features: ['定期メンテナンス', 'セキュリティ対策', 'バックアップ管理', 'パフォーマンス最適化'],
      color: '#FF6B6B',
    },
  ];

  const showAllCards = scrollProgress >= 0.9;

  const calculateOpacity = (index: number) => {
    const cardStart = index / services.length;
    const cardEnd = (index + 1) / services.length;
    const fadeRange = 0.15;

    if (scrollProgress >= cardStart && scrollProgress < cardEnd) {
      if (scrollProgress < cardStart + fadeRange) {
        return (scrollProgress - cardStart) / fadeRange;
      } else if (scrollProgress > cardEnd - fadeRange) {
        return (cardEnd - scrollProgress) / fadeRange;
      }
      return 1;
    }
    return 0;
  };

  return (
    <>
      {/* ========== モバイル表示 ========== */}
      <div className="lg:hidden bg-background" style={{ padding: '4rem 1.25rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2
            className="text-4xl font-bold text-primary"
            style={{ marginBottom: '0.5rem' }}
          >
            SERVICE
          </h2>
          <div
            style={{
              height: '3px',
              width: '80px',
              background: 'linear-gradient(to right, #0066FF, #A8DADC)',
              marginBottom: '1rem'
            }}
          />
          <p className="text-base text-text-secondary leading-relaxed">
            企画・設計からデザイン、開発、運用まで一貫してサポートします
          </p>
        </div>

        {/* カード縦並び */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {services.map((service, index) => (
            <MobileServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              titleEn={service.titleEn}
              description={service.description}
              features={service.features}
              iconColor={service.color}
            />
          ))}
        </div>

        {/* CTAボタン */}
        <div className="text-center">
          <Link href="/service">
            <motion.button
              className="inline-flex items-center gap-2 font-bold border-2 border-primary text-primary"
              style={{ padding: '0.875rem 2rem' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>サービス内容を見る</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ========== PC表示（既存のスクロールアニメーション） ========== */}
      <div
        ref={containerRef}
        className="relative hidden lg:block mt-[60px]"
        style={{
          marginBottom: '100px',
          marginLeft: '20px',
          marginRight: '20px',
          height: '300vh'
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <section id="service" className="relative bg-background h-full">
            <GridBackground />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="right"
              color="#0066FF"
              gradientStart="#0066FF"
              gradientEnd="#A8DADC"
            />

            <GridButton href="/service" text="サービス内容を見る" position="left" desktopOnly />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                  <AnimatedText
                    text="SERVICE"
                    scrollProgress={scrollProgress}
                    orientation="vertical"
                    align="left"
                    accentColor="#0066FF"
                  />

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start justify-between mb-12 gap-6">
                      <div className="flex-1">
                        <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2">
                          企画・設計からデザイン、開発、運用まで<br />一貫してサポートします
                          <span
                            className="absolute bottom-0 left-0 w-full h-1"
                            style={{ background: 'linear-gradient(to right, #0066FF, #A8DADC)' }}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center min-h-[calc(500px+10px)]">
                      {!showAllCards ? (
                        services.map((service, index) => (
                          <ScrollCircleCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            titleEn={service.titleEn}
                            description={service.description}
                            features={service.features}
                            iconColor={service.color}
                            circlePadding={circlePadding}
                            opacity={calculateOpacity(index)}
                          />
                        ))
                      ) : (
                          <LayoutGroup>
                            <div className="relative w-full h-full flex items-center justify-center">
                          {services.map((service, index) => {
                            const isSelected = selectedIndex === index;

                            let translateX = (index - 1) * cardSpacing;
                            let scale = 1;
                            let opacity = 1;
                            let zIndex = 10;

                            if (selectedIndex !== null) {
                              if (isSelected) {
                                translateX = 0;
                                scale = 1;
                                zIndex = 50;
                              } else {
                                translateX = index < selectedIndex ? -400 : 400;
                                scale = 0.8;
                                opacity = 0.3;
                                zIndex = 5;
                              }
                            }

                            return (
                              <motion.div
                                key={index}
                                className="absolute"
                                animate={{ x: translateX, scale, opacity }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                onClick={() => setSelectedIndex(isSelected ? null : index)}
                                style={{ zIndex, cursor: 'pointer' }}
                              >
                                <HoverCircleCard
                                  icon={service.icon}
                                  title={service.title}
                                  titleEn={service.titleEn}
                                  description={service.description}
                                  features={service.features}
                                  iconColor={service.color}
                                  circlePadding={circlePadding}
                                  isHovered={isSelected}
                                  isMobile={false}
                                  index={index}
                                />
                              </motion.div>
                            );
                          })}
                            </div>
                            </LayoutGroup>
                      )}
                    </div>
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
