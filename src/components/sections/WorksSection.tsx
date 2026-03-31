// src/components/sections/WorksSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import GridBackground from '@/components/shared/GridBackground';
import SpeedMeter from '@/components/shared/SpeedMeter';
import { useScrollProgress } from '@/hooks/useResponsive';

import { clientWorks, personalProjects } from '@/data/worksData';

interface Work {
  id: string;
  title: string;
  image: string;
  category: string;
  year: string;
}

// ============================================================
// PC用：浮遊カードアニメーション
// ============================================================
function FloatingWorks({ works, scrollProgress }: { works: Work[]; scrollProgress: number }) {
  const getFloatingParams = (index: number) => {
    const seed = index * 123.456;
    return {
      initialX: (Math.sin(seed) * 60) + (index * 20) - 40,
      initialY: 120 + (index * 30),
      delay: index * 0.15,
      rotation: Math.sin(seed * 2) * 25,
      scale: 0.7 + (Math.sin(seed * 3) * 0.3),
    };
  };

  return (
    <div className="relative w-full h-full">
      {works.map((work, index) => {
        const params = getFloatingParams(index);

        const cardProgress = Math.max(0, Math.min(1, (scrollProgress - params.delay) / 0.3));
        const appearProgress = Math.min(1, cardProgress / 0.3);
        const moveProgress = Math.max(0, (cardProgress - 0.3) / 0.7);

        const translateY = params.initialY - (appearProgress * (params.initialY - 50));
        const targetX = -250 + (index * 120);
        const translateX = params.initialX + ((targetX - params.initialX) * moveProgress);
        const rotation = params.rotation * (1 - moveProgress);
        const scale = params.scale + ((1 - params.scale) * moveProgress);
        const opacity = appearProgress;

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="absolute left-1/2 cursor-pointer block"
            style={{
              transform: `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
              opacity,
              transition: 'transform 0.5s ease-out',
            }}
          >
            <motion.div
              className="w-64 rounded-lg overflow-hidden shadow-2xl border-2 border-border"
              whileHover={{
                scale: 1.1,
                y: -10,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                zIndex: 50,
                transition: { duration: 0.2 }
              }}
            >
              <Image
                src={work.image}
                alt={work.title}
                width={256}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 bg-background">
                <p className="text-xs text-text-secondary mb-1">{work.category} • {work.year}</p>
                <h3 className="text-sm font-bold text-primary truncate">{work.title}</h3>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}

// ============================================================
// モバイル用：whileInView フェードイン
// ============================================================
function MobileWorks({ works }: { works: Work[] }) {
  return (
    <div className="w-full" style={{ padding: '4rem 1.25rem' }}>
      {/* タイトル */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="text-4xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
          WORKS
        </h2>
        <div
          style={{
            height: '3px',
            width: '80px',
            background: 'linear-gradient(to right, #4ECDC4, #FF6B6B)',
            marginBottom: '1rem'
          }}
        />
        <p className="text-base text-text-secondary leading-relaxed">
          これまでの制作実績をご紹介します
        </p>
        <p className="text-xs text-text-secondary opacity-70 mt-1">
          ※ このポートフォリオサイト自体も制作実績としてご覧いただけます
        </p>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '2rem' }}>
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/works/${work.id}`} className="block">
              <div className="rounded-lg overflow-hidden shadow-xl border-2 border-border">
                <Image
                  src={work.image}
                  alt={work.title}
                  width={400}
                  height={256}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2 bg-background">
                  <p className="text-[10px] text-text-secondary mb-1">{work.category} • {work.year}</p>
                  <h3 className="text-xs font-bold text-primary truncate">{work.title}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTAボタン */}
      <div className="text-center">
        <Link href="/works">
          <motion.button
            className="inline-flex items-center gap-2 font-bold border-2 border-[#4ECDC4] text-[#4ECDC4]"
            style={{ padding: '0.875rem 2rem' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>実績一覧を見る</span>
            <span>→</span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function WorksSection() {
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

  const allWorks = [...clientWorks, ...personalProjects];
  const works: Work[] = allWorks.map((work) => ({
    id: work.id,
    title: work.title,
    image: work.image,
    category: work.category,
    year: work.year,
  }));

  return (
    <>
      {/* ========== モバイル表示 ========== */}
      <div className="lg:hidden bg-background">
        <MobileWorks works={works} />
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
          <section id="works" className="relative bg-background h-full">
            <GridBackground show={false} />

            <GridButton href="/works" text="実績一覧を見る" position="right" desktopOnly />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="left"
              color="#4ECDC4"
              gradientStart="#4ECDC4"
              gradientEnd="#FF6B6B"
            />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                  <div className="flex-1 min-w-0 w-full">
                    <div className="mt-16 mb-12">
                      <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2 inline-block">
                        これまでの制作実績をご紹介します
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{ background: 'linear-gradient(to right, #4ECDC4, #FF6B6B)' }}
                        />
                      </p>
                      <p className="text-sm text-text-secondary opacity-70 mt-2">
                        ※ このポートフォリオサイト自体も制作実績としてご覧いただけます
                      </p>
                    </div>

                    <div className="relative flex items-center justify-center min-h-[510px]">
                      <FloatingWorks works={works} scrollProgress={scrollProgress} />
                    </div>
                  </div>

                  {/* AnimatedText - PC右側 */}
                  <div className="hidden lg:block">
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
    </>
  );
}
