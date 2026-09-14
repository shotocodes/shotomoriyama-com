// src/components/sections/HeroSection.tsx
'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
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

// 文字量を絞ったヒーロー（キャッチ1行＋グラデ見出し＋肩書き1行）。
// LCP対策: 主要テキストは opacity:0 から始めず、SSRの初期描画で即表示する。
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // スクロールでヒーローの文字が静かに退場する
  // （MotionValue 駆動なので React の再レンダーは発生しない）
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);

  // CONTACT ボタンのマグネティックホバー
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const magnetSpringX = useSpring(magnetX, { stiffness: 260, damping: 18 });
  const magnetSpringY = useSpring(magnetY, { stiffness: 260, damping: 18 });

  const handleMagnetMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    magnetX.set(Math.max(-10, Math.min(10, dx * 0.2)));
    magnetY.set(Math.max(-8, Math.min(8, dy * 0.3)));
  };

  const handleMagnetLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-300">
      <HeroCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      {/* SSR 時点から存在する唯一の h1（演出用テキストは aria-hidden） */}
      <h1 className="sr-only">
        小さな想いも、丁寧なものづくりで、大きな未来に変わる。 — 森山翔登 | Web制作・デザイン
      </h1>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={prefersReducedMotion ? undefined : { opacity: heroOpacity, y: heroY }}
      >
        {/* hero-copy: 案Fローディング中は非表示にし、波の組み上げ完了後にフェードイン */}
        <div className="text-center max-w-5xl mx-auto hero-copy" aria-hidden="true">
          {/* キャッチ（1行に圧縮） */}
          <p className="text-sm sm:text-base text-text-secondary font-light mb-10 sm:mb-12" style={{ letterSpacing: '0.35em' }}>
            小さな想いも、丁寧なものづくりで。
          </p>

          {/* メインコピー */}
          <div className="relative inline-block mb-14 sm:mb-16">
            <TiltedEllipse />
            <p className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight px-8">
              <span
                className="bg-gradient-to-r from-[#0066FF] via-[#0891B2] to-[#E05252] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#EF4444] bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
              >
                大きな未来に<span className="whitespace-nowrap">変わる。</span>
              </span>
            </p>
          </div>

          {/* 肩書き＋名前（英字1行） */}
          <p className="mb-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-display text-sm sm:text-base text-primary font-medium" style={{ letterSpacing: '0.25em' }}>
              SHOTO MORIYAMA
            </span>
            <span className="text-text-muted">/</span>
            <span className="font-display text-xs sm:text-sm text-text-secondary" style={{ letterSpacing: '0.3em' }}>
              WEB DESIGN &amp; DEVELOPMENT
            </span>
          </p>

          <div>
            <motion.button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPointerMove={handleMagnetMove}
              onPointerLeave={handleMagnetLeave}
              className="inline-block m-4 bg-gradient-to-r from-[#0066FF] to-[#0E7490] dark:from-[#3B82F6] dark:to-[#8B5CF6] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg px-12 sm:px-20 py-3 sm:py-4 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              style={{
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                x: magnetSpringX,
                y: magnetSpringY,
              }}
            >
              <span className="font-display inline-block group-hover:scale-110 transition-transform tracking-wide">
                CONTACT
              </span>
            </motion.button>
          </div>

          <div className="mt-24">
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-display text-xs text-text-muted tracking-widest">S C R O L L</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-text-muted to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
