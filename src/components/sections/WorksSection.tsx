// src/components/sections/WorksSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import GridBackground from '@/components/shared/GridBackground';
import SpeedMeter from '@/components/shared/SpeedMeter';

export default function WorksSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const works = [
  {
    id: 1,
    title: "コーポレートサイト制作",
    image: "https://placehold.co/600x400/0066FF/FFFFFF?text=Project+1",
    category: "Web制作",
    year: "2024"
  },
  {
    id: 2,
    title: "ECサイト構築",
    image: "https://placehold.co/600x400/4ECDC4/FFFFFF?text=Project+2",
    category: "Web制作",
    year: "2024"
  },
  {
    id: 3,
    title: "ロゴデザイン",
    image: "https://placehold.co/600x400/FF6B6B/FFFFFF?text=Project+3",
    category: "デザイン",
    year: "2023"
  },
  {
    id: 4,
    title: "ランディングページ",
    image: "https://placehold.co/600x400/FFD93D/000000?text=Project+4",
    category: "Web制作",
    year: "2023"
  },
  {
    id: 5,
    title: "ブランディング",
    image: "https://placehold.co/600x400/A8DADC/000000?text=Project+5",
    category: "デザイン",
    year: "2024"
  }
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

  interface Work {
  id: number;
  title: string;
  image: string;
  category: string;
  year: string;
}

interface FloatingWorksProps {
  works: Work[];
  scrollProgress: number;
}

function FloatingWorks({ works, scrollProgress }: FloatingWorksProps) {
  const getFloatingParams = (index: number) => {
    const seed = index * 123.456;
    return {
      initialX: (Math.sin(seed) * 60) + (index * 20) - 40,
      initialY: 120 + (index * 30),
      delay: index * 0.15, // 0.1 → 0.15 (もっとゆっくり)
      rotation: Math.sin(seed * 2) * 25,
      scale: 0.7 + (Math.sin(seed * 3) * 0.3),
    };
  };

  return (
    <div className="relative w-full h-full">
      {works.map((work, index) => {
        const params = getFloatingParams(index);

        // 各カードの進捗 (0-1)
        const cardProgress = Math.max(0, Math.min(1, (scrollProgress - params.delay) / 0.3));

        // フェーズ1: 出現 (0-30%)
        const appearProgress = Math.min(1, cardProgress / 0.3);

        // フェーズ2: 上昇 + 左移動 (30-100%)
        const moveProgress = Math.max(0, (cardProgress - 0.3) / 0.7);

        // Y位置: 下から中央へ上昇
        const translateY = params.initialY - (appearProgress * (params.initialY - 50));

        // X位置: 初期位置から左の整列位置へ
        const targetX = -250 + (index * 120); // 左端から25%ずつ
        const translateX = params.initialX + ((targetX - params.initialX) * moveProgress);

        // 回転: 徐々に0度へ
        const rotation = params.rotation * (1 - moveProgress);

        // スケール: 一定に
        const scale = params.scale + ((1 - params.scale) * moveProgress);

        // 透明度
        const opacity = appearProgress;

        return (
          <motion.div
            key={work.id}
            className="absolute left-1/2 cursor-pointer"
            style={{
              x: `${translateX}%`,
              y: translateY,
              opacity,
              scale,
              rotate: rotation,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            whileHover={{
              scale: scale * 1.1,
              y: translateY - 50,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              zIndex: 50,
              transition: { duration: 0.2 }
            }}
          >
            <div className="w-40 sm:w-48 md:w-56 lg:w-64 rounded-lg overflow-hidden shadow-2xl border-2 border-border">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover"
              />
              <div className="p-3 bg-background">
                <p className="text-xs text-text-secondary mb-1">{work.category} • {work.year}</p>
                <h3 className="text-sm font-bold text-primary truncate">{work.title}</h3>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


interface AutoSliderProps {
  works: Work[];
}

function AutoSlider({ works }: AutoSliderProps) {
  // 作品を2倍にして無限ループ
  const duplicatedWorks = [...works, ...works];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -((works.length * 280) + (works.length * 24))], // カード幅 + gap
        }}
        transition={{
          duration: works.length * 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedWorks.map((work, index) => (
          <div
            key={`${work.id}-${index}`}
            className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-xl border-2 border-border cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-background">
              <p className="text-xs text-text-secondary mb-2">{work.category} • {work.year}</p>
              <h3 className="text-base font-bold text-primary">{work.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
  return (
    <div
      ref={containerRef}
      className="relative mt-[60px] md:mt-[30px] lg:mt-[60px]"
      style={{
        marginBottom: '100px',
        marginLeft: '20px',
        marginRight: '20px',
        height: '300vh' // 仮の高さ
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          id="works"
          className="relative bg-background h-full"
        >
          {/* 背景グリッド - なし */}
          <GridBackground show={false} />

          {/* ボタン - スマホ用 */}
          <GridButton
            href="/works"
            text="VIEW"
            position="right"
            mobileOnly
          />

          {/* ボタン - PC用 */}
          <GridButton
            href="/works"
            text="実績一覧を見る"
            position="right"
            desktopOnly
          />

                    {/* スピードメーター */}
                    <SpeedMeter
  scrollProgress={scrollProgress}
  position="left"
  color="#4ECDC4"
  gradientStart="#4ECDC4"
            gradientEnd="#FF6B6B"
/>

          <div className="h-full flex items-center">
  <div className="container mx-auto !px-4 !sm:px-6 !lg:px-8 relative z-10">
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                {/* AnimatedText - スマホ・タブレット */}
                <div className="lg:hidden mb-8">
                  <AnimatedText
                    text="WORKS"
                    scrollProgress={scrollProgress}
                    orientation="horizontal"
                    align="right"
                    accentColor="#4ECDC4"
                  />
                </div>
                {/* 中央 */}
                <div className="flex-1 min-w-0 w-full">
                  {/* ヘッダー */}
                    <div className="mt-12 lg:mt-16 mb-8">
                      <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-light !mb-3 relative !pb-2 inline-block">
                        これまでの制作実績をご紹介します
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{
                            background: 'linear-gradient(to right, #4ECDC4, #FF6B6B)',
                          }}
                        />
                      </p>
                      <p className="text-sm lg:text-base text-text-secondary opacity-70 font-light">
                        ※ このポートフォリオサイト自体も制作実績としてご覧いただけます
                      </p>
                    </div>
                  {/* メインコンテンツエリア */}
                  <div className="relative flex items-center justify-center min-h-[calc(200px+70px)] sm:min-h-[calc(400px+50px)] md:min-h-[calc(400px+10px)] lg:min-h-[calc(500px+10px)]">
                    <FloatingWorks
                      works={works}
                      scrollProgress={scrollProgress}
                    />
                  </div>
                </div>

                        {/* AnimatedText - PC */}
                  <div className="hidden lg:block mb-8 lg:mb-0">
                    <AnimatedText
                      text="WORKS"
                      scrollProgress={scrollProgress}
                      orientation="vertical"
                      align="right"
                      accentColor="#4ECDC4"
                    />
                  </div>

    </div>
  </div>
</div>
        </section>
      </div>
    </div>
  );
}
