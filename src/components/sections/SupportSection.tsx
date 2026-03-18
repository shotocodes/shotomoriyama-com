// src/components/sections/SupportSection.tsx
'use client';

import { Camera, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRef } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import { ScrollCircleCard, HoverCircleCard, MobileServiceCard } from '@/components/shared/CircleCard';
import { useResponsiveCircle, useScrollProgress } from '@/hooks/useResponsive';

export default function SupportSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const { circlePadding, cardSpacing } = useResponsiveCircle();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const supports = [
    {
      icon: Camera,
      title: '写真素材の準備',
      titleEn: 'PHOTO',
      description: 'プロ並みの写真を無料で。おすすめサイトと選び方のコツ',
      color: '#FF8C42',
      features: ['素材サイト紹介', '撮影のコツ', '画像選びのポイント']
    },
    {
      icon: Sparkles,
      title: 'AIイラスト活用',
      titleEn: 'AI',
      description: 'AIで簡単オリジナル画像。初心者でも使えるツール紹介',
      features: ['MidJourney', 'DALL-E', 'Stable Diffusion'],
      color: '#FFB347',
    },
    {
      icon: Lightbulb,
      title: '運用のヒント',
      titleEn: 'OPERATION',
      description: '公開後も安心。更新方法からSEO対策まで',
      features: ['更新のコツ', 'SEO基礎', 'SNS活用'],
      color: '#FFA500',
    },
  ];

  const showAllCards = scrollProgress >= 0.9;

  const calculateOpacity = (index: number) => {
    const cardStart = index / supports.length;
    const cardEnd = (index + 1) / supports.length;
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
            SUPPORT
          </h2>
          <div
            style={{
              height: '3px',
              width: '80px',
              background: 'linear-gradient(to right, #FF8C42, #FFB347)',
              marginBottom: '1rem'
            }}
          />
          <p className="text-base text-text-secondary leading-relaxed">
            サイト制作をスムーズに進めるためのお役立ち情報
          </p>
          <p className="text-xs text-text-secondary opacity-70 mt-1">
            ※ 他にも準備や運用のコツを詳細ページでご紹介しています
          </p>
        </div>

        {/* カード縦並び */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {supports.map((support, index) => (
            <MobileServiceCard
              key={index}
              icon={support.icon}
              title={support.title}
              titleEn={support.titleEn}
              description={support.description}
              features={support.features}
              iconColor={support.color}
            />
          ))}
        </div>

        {/* CTAボタン */}
        <div className="text-center">
          <Link href="/support">
            <motion.button
              className="inline-flex items-center gap-2 font-bold border-2 border-[#FF8C42] text-[#FF8C42]"
              style={{ padding: '0.875rem 2rem' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>サポート一覧を見る</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ========== PC表示（スクロールアニメーション） ========== */}
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
          <section id="support" className="relative bg-background h-full">
            <GridBackground />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="right"
              color="#FF8C42"
              gradientStart="#FF8C42"
              gradientEnd="#FF6B6B"
            />

            <GridButton href="/support" text="サポート一覧" position="left" desktopOnly />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                  <AnimatedText
                    text="SUPPORT"
                    scrollProgress={scrollProgress}
                    orientation="vertical"
                    align="left"
                    accentColor="#FF8C42"
                  />

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start justify-between mb-12 gap-6">
                      <div className="flex-1">
                        <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2 inline-block">
                          サイト制作をスムーズに進めるためのお役立ち情報
                          <span
                            className="absolute bottom-0 left-0 w-full h-1"
                            style={{
                              background: 'linear-gradient(to right, #FF8C42, #FFB347)',
                            }}
                          />
                        </p>
                        <p className="text-base text-text-secondary opacity-70 mt-2">
                          ※ 他にも準備や運用のコツを詳細ページでご紹介しています
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center min-h-[calc(500px+10px)]">
                      {!showAllCards ? (
                        // スクロール時の単一カード表示
                        supports.map((support, index) => (
                          <ScrollCircleCard
                            key={index}
                            icon={support.icon}
                            title={support.title}
                            titleEn={support.titleEn}
                            description={support.description}
                            features={support.features}
                            iconColor={support.color}
                            circlePadding={circlePadding}
                            opacity={calculateOpacity(index)}
                          />
                        ))
                      ) : (
                        // 並列カード表示（クリックでモーフィング）
                        <LayoutGroup>
                          <div className="relative w-full h-full flex items-center justify-center">
                            {supports.map((support, index) => {
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
                                  style={{ zIndex, cursor: 'pointer' }}
                                  animate={{ x: translateX, scale, opacity }}
                                  transition={{ duration: 0.5, ease: 'easeOut' }}
                                  onClick={() => setSelectedIndex(isSelected ? null : index)}
                                >
                                  <HoverCircleCard
                                    icon={support.icon}
                                    title={support.title}
                                    titleEn={support.titleEn}
                                    description={support.description}
                                    features={support.features}
                                    iconColor={support.color}
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
