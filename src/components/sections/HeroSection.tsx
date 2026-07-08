// src/components/sections/HeroSection.tsx
'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// three.js を含むキャンバスは初期バンドルから分離して遅延読み込みする
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

// Tilted horizontal ellipse with heartbeat
const TiltedEllipse = () => (
  <motion.svg
    className="absolute -inset-2 sm:-inset-32 md:-inset-48 lg:-inset-56 w-auto h-auto pointer-events-none"
    viewBox="0 0 600 400"
    style={{
      opacity: 0.25,
      transform: 'rotate(45deg)',
    }}
  >
    <motion.ellipse
      cx="200"
      cy="180"
      rx="160"
      ry="80"
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      className="text-accent"
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.04, 1, 1.02, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1],
      }}
    />
  </motion.svg>
);

// タイプライター + 文字分解アニメーション
const TypewriterLine = ({
  text,
  index,
  showEnglish,
  isDissolving,
}: {
  text: string;
  index: number;
  showEnglish: boolean;
  isDissolving: boolean;
}) => {
  const [displayedChars, setDisplayedChars] = useState(0);

  // 飛散方向は文字ごとに一度だけ生成（再レンダーで軌道が変わらないように）
  const scatter = useMemo(
    () =>
      text.split('').map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: (Math.random() - 0.5) * 720,
        };
      }),
    [text]
  );

  useEffect(() => {
    // 英語表示中かつ分解アニメーション前のみ実行
    if (!showEnglish || isDissolving) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const totalDelay = index * 800;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedChars(prev => {
          if (prev < text.length) {
            return prev + 1;
          }
          if (interval) clearInterval(interval);
          return prev;
        });
      }, 50);
    }, totalDelay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, index, showEnglish, isDissolving]);

  return (
    <div className="mb-4 relative inline-block">
      {text.split('').map((char, i) => {
        if (char === ' ') {
          return <span key={`char-${i}`} className="inline-block">&nbsp;</span>;
        }

        const { x: randomX, y: randomY, rotate: randomRotate } = scatter[i];

        return (
          <motion.span
            key={`char-${i}`}
            className="inline-block relative"
            style={{
              transformOrigin: 'center center',
            }}
          >
            {/* タイプライター表示用の文字（分解前） */}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isDissolving ? 0 : (i < displayedChars ? 1 : 0),
              }}
              transition={{
                duration: isDissolving ? 0.3 : 0.1,
              }}
            >
              {char}
            </motion.span>

            {/* 分解用の文字（粒子として飛散） */}
            {isDissolving && (
              <motion.span
                className="absolute inset-0 inline-block"
                initial={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 0.3,
                  x: randomX,
                  y: randomY,
                  rotate: randomRotate,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [showEnglish, setShowEnglish] = useState(true);
  const [isDissolving, setIsDissolving] = useState(false);

  // 英語→日本語の切り替えタイマー
  useEffect(() => {
    // モーション軽減設定時はタイプライター演出をスキップして本文を即表示
    if (prefersReducedMotion) {
      setShowEnglish(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsDissolving(true);
      setTimeout(() => {
        setShowEnglish(false);
      }, 1500); // ドット分解完了まで待つ
    }, 6000); // 英文表示時間

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-300">
      <HeroCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      {/* SSR 時点から存在する唯一の h1（演出用テキストは aria-hidden） */}
      <h1 className="sr-only">
        小さな想いも、丁寧なものづくりで、大きな未来に変わる。 — 森山翔登 | Web制作・デザイン
      </h1>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-5xl mx-auto"
        >
          {!showEnglish && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-text-muted mb-8 tracking-wider"
              aria-hidden="true"
            >
              W E B  D E S I G N  &  D E V E L O P M E N T
            </motion.p>
          )}

          <div
            className="mb-6 min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[200px] flex items-center justify-center"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              {showEnglish ? (
                <motion.div
                  key="english"
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed text-primary"
                >
                  <TypewriterLine text="Even small ideas," index={0} showEnglish={showEnglish} isDissolving={isDissolving} />
                  <TypewriterLine text="Through careful craftsmanship," index={1} showEnglish={showEnglish} isDissolving={isDissolving} />
                  <TypewriterLine text="Transform into a great future." index={2} showEnglish={showEnglish} isDissolving={isDissolving} />
                </motion.div>
              ) : (
                <motion.div
                  key="japanese"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-6xl font-light leading-relaxed text-primary"
                >
                  <p className="mb-1">小さな想いも、</p>
                  <p className="mb-1">丁寧なものづくりで、</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!showEnglish && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative inline-block mb-12"
                aria-hidden="true"
              >
                <TiltedEllipse />
                <p className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight px-8">
                  <span
                    className="bg-gradient-to-r from-[#0066FF] via-[#0891B2] to-[#E05252] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#EF4444] bg-clip-text text-transparent"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
                  >
                    大きな未来に<span className="whitespace-nowrap">変わる。</span>
                  </span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg sm:text-xl text-text-secondary font-light tracking-widest mb-12"
              >
                森山翔登
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-block m-4 bg-gradient-to-r from-[#0066FF] to-[#0E7490] dark:from-[#3B82F6] dark:to-[#8B5CF6] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg px-12 sm:px-20 py-3 sm:py-4 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  style={{
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <span className="inline-block group-hover:scale-110 transition-transform">
                    CONTACT
                  </span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="mt-24"
                aria-hidden="true"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs text-text-muted tracking-widest">S C R O L L</span>
                  <div className="w-[2px] h-12 bg-gradient-to-b from-text-muted to-transparent" />
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
