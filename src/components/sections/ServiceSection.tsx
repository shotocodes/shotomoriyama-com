// src/components/sections/ServiceSection.tsx
'use client';

import { Globe, Palette, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';

export default function ServiceSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      icon: Wrench,
      title: '保守運用',
      titleEn: 'MAINTENANCE',
      description: '安定稼働を支える継続的なサポート。\nセキュリティ対策・パフォーマンス最適化まで対応。',
      features: ['定期メンテナンス', 'セキュリティ対策', 'バックアップ管理', 'パフォーマンス最適化'],
      color: '#FF6B6B',
    },
  ];

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

const [circlePadding, setCirclePadding] = useState({
  paddingLeft: '70px',
  paddingBottom: '30px'
});

useEffect(() => {
  const updatePadding = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setCirclePadding({
        paddingLeft: '38px',
        paddingBottom: '10px'
      });
    } else if (width < 768) {
      setCirclePadding({
        paddingLeft: '40px',
        paddingBottom: '20px'
      });
    } else if (width < 1024) {
      setCirclePadding({
        paddingLeft: '48px',
        paddingBottom: '25px'
      });
    } else {
      setCirclePadding({
        paddingLeft: '70px',
        paddingBottom: '30px'
      });
    }
  };

  updatePadding();
  window.addEventListener('resize', updatePadding);
  return () => window.removeEventListener('resize', updatePadding);
}, []);

  const [cardSpacing, setCardSpacing] = useState(600);

useEffect(() => {
  const updateSpacing = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setCardSpacing(120); // スマホ: 140px
    } else if (width < 768) {
      setCardSpacing(200); // タブレット: 200px
    } else if (width < 1024) {
      setCardSpacing(280); // PC小: 280px
    } else {
      setCardSpacing(400); // PC: 400px
    }
  };

  updateSpacing();
  window.addEventListener('resize', updateSpacing);
  return () => window.removeEventListener('resize', updateSpacing);
}, []);

  useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 1024);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

  const meterAngle = -135 + (scrollProgress * 270);
  const displayPercentage = Math.round(scrollProgress * 100);

  const showAllCards = scrollProgress >= 0.9;

  return (
    <div
  ref={containerRef}
  className="relative mt-[60px] md:mt-[30px] lg:mt-[60px]"
  style={{
    marginBottom: '100px',
    marginLeft: '20px',
    marginRight:'20px',
    height: '300vh'
  }}
>
      <div className="sticky top-0 h-screen overflow-hidden ">
        <section
          id="service"
          className="relative bg-background h-full"
        >
          {/* 背景グリッド */}
          <GridBackground />

          {/* スピードメーター */}
          <SpeedMeter
  scrollProgress={scrollProgress}
  position="right"
  color="#0066FF"
  gradientStart="#0066FF"
  gradientEnd="#A8DADC"
/>


 {/* ボタン */}
<GridButton
  href="#contact"
  text="VIEW"
  position="left"
  mobileOnly
/>

<GridButton
  href="/service"
  text="サービス内容を見る"
  position="left"
  desktopOnly
/>

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

                {/* 中央 */}
                <div className="flex-1 min-w-0 w-full">
                  {/* ヘッダー */}
                    <div className="flex flex-col lg:flex-row items-start justify-between !mb-12 !lg:mb-16 gap-6">
                      <div className="flex-1">
                        <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-light relative !pb-2">
                          企画・設計からデザイン、開発、運用まで<br />一貫してサポートします
                          <span
                            className="absolute bottom-0 left-0 w-full h-1"
                            style={{
                              background: 'linear-gradient(to right, #0066FF, #A8DADC)',
                            }}
                          />
                        </p>
                      </div>
                    </div>

                  {/* カードエリア */}
                  <div className="relative flex items-center justify-center min-h-[calc(200px+70px)] sm:min-h-[calc(400px+50px)] md:min-h-[calc(400px+10px)] lg:min-h-[calc(500px+10px)]">
                    {!showAllCards ? (
                      // 90%未満: スクロール時
                      services.map((service, index) => {
                        const Icon = service.icon;

                        let opacity = 0;
                        const cardStart = index / services.length;
                        const cardEnd = (index + 1) / services.length;
                        const fadeRange = 0.15;

                        if (scrollProgress >= cardStart && scrollProgress < cardEnd) {
                          if (scrollProgress < cardStart + fadeRange) {
                            opacity = (scrollProgress - cardStart) / fadeRange;
                          } else if (scrollProgress > cardEnd - fadeRange) {
                            opacity = (cardEnd - scrollProgress) / fadeRange;
                          } else {
                            opacity = 1;
                          }
                        }

                        return (
                          <div
                            key={index}
                            className="absolute bottom-20 left-3 md:left-20 lg:left-10 xl:left-[25%] 2xl:left-[35%] z-30"
                            style={{
                              opacity,
                              transition: 'opacity 0.3s ease-out',
                              pointerEvents: opacity > 0.5 ? 'auto' : 'none'
                            }}
                          >
                            <div className="relative flex items-center">
                              {/* 小さい円 - サイズ */}
                              <div className="relative z-20">
                                <div
                                  className="w-20 h-20 sm:w-35 sm:h-35 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full border-2 flex flex-col items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--circle-small-bg)',
                                    borderColor: 'rgba(128, 128, 128, 0.2)'
                                  }}>
                                  <Icon
                                    size={70}
                                    className="w-5 h-5 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] mb-2"
                                    strokeWidth={1.5}
                                    style={{ color: 'var(--circle-small-icon)' }}
                                  />
                                  <span
                                    className="text-[8px] md:text-[15px] lg:text-[15px] font-bold tracking-wider px-3 text-center leading-tight"
                                    style={{ color: 'var(--circle-small-text)' }}>
                                    {service.titleEn}
                                  </span>
                                </div>
                              </div>

                              {/* 大きい円 - サイズアップ & gap拡大 */}
                              <div
                                className="absolute left-12 sm:left-20 lg:left-35 rounded-full z-10 flex items-center justify-center w-[290px] h-[290px] sm:w-[480px] sm:h-[480px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px]"
                                style={{
                                  backgroundColor: 'var(--circle-large-bg)',
                                  border: '2px solid var(--circle-large-border)',
                                  paddingLeft: circlePadding.paddingLeft,

                                }}>
                                <div className="text-left px-12 pl-44">
                                  <h3
                                    className="text-[18px] md:text-4xl lg:text-5xl font-bold mb-6"
                                    style={{
                                      color: 'var(--circle-large-text)',
                                      paddingBottom:circlePadding.paddingBottom,
                                    }}>
                                    {service.title}
                                  </h3>
                                  <p
                                    className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-2xl leading-loose mb-8 whitespace-pre-line"
                                    style={{
                                      color: 'var(--circle-large-text-secondary)',
                                      paddingBottom: circlePadding.paddingBottom,
                                    }}>
                                    {service.description}
                                  </p>
                                  <ul className="list-disc list-inside ml-5">
                                    {service.features.map((feature, idx) => (
                                      <li
                                        key={idx}
                                        className="text-base"
                                        style={{ color: 'var(--circle-large-text-secondary)' }}>
                                        <span
                                          className="rounded-full mt-2 mr-3 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--circle-large-dot)' }}
                                        />
                                        <span
                                        className="text-[10px] lg:text-[20px] mb-2 leading-loose"
                                    style={{ color: 'var(--circle-large-text)' }}
                                        >{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // 90%以降: 3つ表示
                      <div className="relative w-full h-full flex items-center justify-center">
                        {services.map((service, index) => {
                          const Icon = service.icon;
                          const isHovered = hoveredIndex === index;

                          let translateX = 0;
                          let scale = 1;
                          let opacity = 1;
                          let zIndex = 10;

                          if (hoveredIndex === null) {
                            translateX = (index - 1) * cardSpacing;;
                          } else if (isHovered) {
                            translateX = 0;
                            scale = 1;
                            zIndex = 50;
                          } else {
                            translateX = index < hoveredIndex ? -400 : 400;
                            scale = 0.8;
                            opacity = 0.3;
                            zIndex = 5;
                          }

                          return (
                            <motion.div
                              key={index}
                              className='absolute'
                              style={{
                                zIndex,
                                ...(isMobile && isHovered ? {
                                  // position: 'fixed',
                                  left: '1%',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                } : {})
                              }}
                              animate={{
                                x: translateX,
                                scale,
                                opacity,
                              }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              onTouchStart={() => setHoveredIndex(index)}
                            >
                              <div className="relative flex items-center justify-center cursor-pointer">
                                {/* 小さい円 - サイズアップ */}
                                <motion.div
                                  className="relative z-20"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: 'spring', stiffness: 300 }}
                                >
                                  <div
                                    className="w-20 h-20 sm:w-35 sm:h-35 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-2 flex flex-col items-center justify-center"
                                    style={{
                                      backgroundColor: 'var(--circle-small-bg)',
                                      borderColor: 'rgba(128, 128, 128, 0.2)',
                                      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                    }}
                                  >
                                    <Icon
                                      size={60}
                                      className="w-5 h-5 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[60px] lg:h-[60px] mb-2"
                                      strokeWidth={1.5}
                                      style={{ color: 'var(--circle-small-icon)' }}
                                    />
                                    <span
                                      className="text-[8px] sm:text-[12px] md:text-[15px] lg:text-[15px] font-bold tracking-wider px-3 text-center leading-tight"
                                      style={{ color: 'var(--circle-small-text)' }}>
                                      {service.titleEn}
                                    </span>
                                  </div>
                                </motion.div>

                                {/* 大きい円 - サイズアップ */}
                                {isHovered && (
                                  <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full z-10 flex items-center justify-center"
                                    style={{
                                      width: isMobile ? (window.innerWidth < 640 ? '290px' : window.innerWidth < 768 ? '400px' : '500px') : '650px',
                                      height: isMobile ? (window.innerWidth < 640 ? '290px' : window.innerWidth < 768 ? '400px' : '500px') : '650px',
                                      left: isMobile
                                        ? (window.innerWidth < 640 ? '60px' : window.innerWidth < 768 ? '70px' : '80px')
                                        : (index === 0 ? 'auto' : '100px'),
                                      right: isMobile ? 'auto' : (index === 0 ? '100px' : 'auto'),
                                      backgroundColor: 'var(--circle-large-bg)',
                                      border: '2px solid var(--circle-large-border)',
                                      boxShadow: 'var(--circle-large-shadow)',
                                      paddingLeft: isMobile ? (window.innerWidth < 640 ? '25px' : window.innerWidth < 768 ? '35px' : '45px') : '60px'
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                      opacity: 1,
                                      scale: 1,
                                      rotate: [0, 1, -1, 0],
                                    }}
                                    transition={{
                                      opacity: { duration: 0.3 },
                                      scale: { duration: 0.3 },
                                      rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                                    }}
                                  >
                                    <div className={`text-left ${isMobile ? 'px-4 pl-16' : `px-12 ${index === 0 ? 'pr-44' : 'pl-44'}`}`}>
                                      <h3
                                    className="text-base sm:text-lg md:text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                                        style={{
                                          color: 'var(--circle-large-text)',
                                          paddingBottom: isMobile ? (window.innerWidth < 640 ? '8px' : window.innerWidth < 768 ? '12px' : '18px') : '30px'
                                        }}>
                                    {service.title}
                                  </h3>
                                  <p
                                    className="text-[10px] sm:text-sm md:text-base lg:text-[18px] leading-snug sm:leading-relaxed md:leading-loose mb-3 sm:mb-4 md:mb-5 lg:mb-8 whitespace-pre-line"
                                        style={{
                                          color: 'var(--circle-large-text-secondary)', paddingBottom: isMobile ? (window.innerWidth < 640 ? '8px' : window.innerWidth < 768 ? '12px' : '18px') : '30px'
                                    }}>
                                    {service.description}
                                  </p>
                                  <ul className="list-disc list-inside ml-2 sm:ml-3 md:ml-4 lg:ml-5 space-y-1 sm:space-y-1.5 md:space-y-2">
                                    {service.features.map((feature, idx) => (
                                      <li
                                        key={idx}
                                        className="text-[10px] sm:text-sm md:text-base"
                                        style={{ color: 'var(--circle-large-text-secondary)' }}>
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--circle-large-dot)' }}
                                        />
                                        <span
                                        className="text-1xl lg:text-1xl mb-2 leading-loose"
                                    style={{ color: 'var(--circle-large-text)' }}
                                        >{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
