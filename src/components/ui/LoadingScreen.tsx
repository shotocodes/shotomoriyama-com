// src/components/ui/LoadingScreen.tsx
'use client';

// 初回訪問時のみのローディング演出。
// コンセプト「設計図から、引き渡しまで。」— 大工出身の制作フローをそのまま演出化。
// 製図グリッドの上でロゴタイプが線画で引かれ、工程ラベル（設計→施工→仕上げ→引き渡し）が進み、
// 100%で検収印が押されて、画面が上下に割れてサイトが現れる。
//
// - セッション内の2回目以降は表示しない（sessionStorage + globals.css の先行ガードで
//   ハイドレーション前のちらつきも防止）
// - クリック / ホイール / キー入力で即スキップ
// - prefers-reduced-motion では表示しない（CSS側でも display:none ）
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const LOADING_SEEN_KEY = 'smj-loading-seen';

const PHASES = [
  { until: 34, label: '設計中', en: 'DRAFTING' },
  { until: 68, label: '施工中', en: 'BUILDING' },
  { until: 94, label: '仕上げ中', en: 'FINISHING' },
  { until: 100, label: '引き渡し', en: 'HANDOVER' },
] as const;

const DURATION_MS = 2400;
const STAMP_MS = 650; // 検収印を見せてから割れるまで

export default function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'loading' | 'exiting' | 'done'>('loading');
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(LOADING_SEEN_KEY);
    } catch {
      /* プライベートモード等では毎回表示でよい */
    }

    if (seen || prefersReducedMotion) {
      setStatus('done');
      return;
    }

    try {
      sessionStorage.setItem(LOADING_SEEN_KEY, '1');
    } catch {
      /* noop */
    }

    // 表示中はスクロールさせない
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setProgress(100);
      // 検収印を一拍見せてから開く
      setTimeout(() => setStatus('exiting'), STAMP_MS);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setProgress(Math.min(100, Math.round(easeOutCubic(t) * 100)));
      if (t >= 1) {
        finish();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // 入力で即スキップ
    window.addEventListener('wheel', finish, { passive: true, once: true });
    window.addEventListener('touchstart', finish, { passive: true, once: true });
    window.addEventListener('pointerdown', finish, { once: true });
    window.addEventListener('keydown', finish, { once: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
    };
  }, [prefersReducedMotion]);

  // 開き終わったら完全にアンマウント
  useEffect(() => {
    if (status !== 'exiting') return;
    document.body.style.overflow = '';
    const timer = setTimeout(() => setStatus('done'), 900);
    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'done') return null;

  const phase = PHASES.find((p) => progress <= p.until) ?? PHASES[PHASES.length - 1];
  const complete = progress >= 100;
  const opening = status === 'exiting';
  // 割れ目の位置（画面中央）から上下に開く
  const panelTransition = { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <div
      id="loading-screen"
      className="fixed inset-0"
      style={{ zIndex: 100 }}
      role="status"
      aria-label="読み込み中"
    >
      {/* 上下パネル（100%で水面が割れるように開く） */}
      <motion.div
        className="absolute left-0 right-0 top-0 bg-background"
        style={{ height: '50%' }}
        animate={opening ? { y: '-100%' } : { y: 0 }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute left-0 right-0 bottom-0 bg-background"
        style={{ height: '50%' }}
        animate={opening ? { y: '100%' } : { y: 0 }}
        transition={panelTransition}
      />

      {/* 割れ目の水面ライン */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: '50%', height: '2px', background: 'var(--color-accent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={opening ? { scaleX: 1, opacity: [1, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.85 }}
      />

      {/* コンテンツ層 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={opening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* 製図グリッド */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.35,
          }}
        />

        {/* 進捗に追従する製図クロスヘア（縦横1本ずつ） */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${progress}%`,
            width: '1px',
            background: 'var(--color-accent)',
            opacity: 0.45,
            transition: 'left 0.2s ease-out',
          }}
        />
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${100 - progress * 0.72}%`,
            height: '1px',
            background: 'var(--color-accent)',
            opacity: 0.3,
            transition: 'top 0.2s ease-out',
          }}
        />

        {/* 四隅のブラケット＋図面注記 */}
        {[
          { pos: { top: '1.5rem', left: '1.5rem' }, border: 'borderTop borderLeft', label: 'BLUEPRINT No.001' },
          { pos: { top: '1.5rem', right: '1.5rem' }, border: 'borderTop borderRight', label: 'SCALE 1:1' },
          { pos: { bottom: '1.5rem', left: '1.5rem' }, border: 'borderBottom borderLeft', label: '' },
          { pos: { bottom: '1.5rem', right: '1.5rem' }, border: 'borderBottom borderRight', label: 'SHOTOMORIYAMA' },
        ].map((corner, i) => (
          <div key={i} className="absolute pointer-events-none" style={corner.pos as React.CSSProperties}>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderTop: corner.border.includes('borderTop') ? '2px solid var(--color-text-secondary)' : undefined,
                borderBottom: corner.border.includes('borderBottom') ? '2px solid var(--color-text-secondary)' : undefined,
                borderLeft: corner.border.includes('borderLeft') ? '2px solid var(--color-text-secondary)' : undefined,
                borderRight: corner.border.includes('borderRight') ? '2px solid var(--color-text-secondary)' : undefined,
                opacity: 0.6,
              }}
            />
            {corner.label && (
              <p
                className="font-display text-text-secondary"
                style={{ fontSize: '9px', letterSpacing: '0.25em', marginTop: '0.5rem', opacity: 0.7 }}
              >
                {corner.label}
              </p>
            )}
          </div>
        ))}

        {/* 中央: 線画で引かれるロゴタイプ */}
        <div className="relative text-center" style={{ width: 'min(90vw, 640px)' }}>
          <svg viewBox="0 0 640 120" className="w-full" aria-hidden="true">
            {/* 下書きのベースライン（寸法線風） */}
            <line x1="20" y1="96" x2="620" y2="96" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="20" y1="90" x2="20" y2="102" stroke="var(--color-border)" strokeWidth="1" />
            <line x1="620" y1="90" x2="620" y2="102" stroke="var(--color-border)" strokeWidth="1" />
            {/* ロゴタイプ: 線画 → 100%で塗りが入る */}
            <text
              x="320"
              y="78"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '52px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                fill: 'var(--color-text-primary)',
                fillOpacity: complete ? 1 : 0,
                stroke: 'var(--color-text-primary)',
                strokeWidth: 1,
                strokeDasharray: 400,
                strokeDashoffset: 400 - (progress / 100) * 400,
                transition: 'fill-opacity 0.4s ease, stroke-dashoffset 0.15s linear',
              }}
            >
              SHOTOMORIYAMA
            </text>
          </svg>

          {/* 工程ラベル */}
          <div className="relative" style={{ height: '2rem', marginTop: '0.5rem', overflow: 'hidden' }}>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={phase.label}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-text-secondary"
                style={{ letterSpacing: '0.4em' }}
              >
                {phase.label}
                <span className="font-display" style={{ fontSize: '10px', letterSpacing: '0.3em', marginLeft: '1em', opacity: 0.6 }}>
                  {phase.en}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 検収印（100%で押される） */}
          <AnimatePresence>
            {complete && (
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute"
                style={{ width: '84px', right: '-6px', top: '-34px', rotate: '-12deg' }}
                initial={{ scale: 2.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E05252" strokeWidth="3.5" opacity="0.9" />
                <text
                  x="50"
                  y="44"
                  textAnchor="middle"
                  style={{ fontSize: '26px', fontWeight: 700, fill: '#E05252', opacity: 0.9 }}
                >
                  森山
                </text>
                <text
                  x="50"
                  y="70"
                  textAnchor="middle"
                  style={{ fontSize: '13px', fill: '#E05252', letterSpacing: '0.2em', opacity: 0.9 }}
                >
                  検収済
                </text>
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* 左下: 巨大カウンター */}
        <div className="absolute" style={{ left: '1.5rem', bottom: '4rem' }}>
          <p className="font-display font-bold text-primary" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1 }}>
            {String(progress).padStart(3, '0')}
            <span className="text-text-secondary" style={{ fontSize: '0.25em', marginLeft: '0.3em' }}>%</span>
          </p>
        </div>

        {/* 右下: コンセプトコピー */}
        <p
          className="absolute text-text-secondary"
          style={{ right: '1.5rem', bottom: '4.5rem', fontSize: '11px', letterSpacing: '0.35em', writingMode: 'vertical-rl' }}
        >
          設計図から、引き渡しまで。
        </p>
      </motion.div>
    </div>
  );
}
