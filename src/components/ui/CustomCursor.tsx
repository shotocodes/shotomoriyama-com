// src/components/ui/CustomCursor.tsx
'use client';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const DOT_SIZE = 10; // px

/**
 * カスタムカーソル：「速度で変形するドット」＋「クリック波紋」
 *
 * - リングは持たない。1 つのドットが移動速度に応じて進行方向へ伸び（squash & stretch）、
 *   止まるとスプリングで丸に戻る。リンクやボタンの上では拡大して薄くなる
 * - クリックすると波紋がページに広がる（ヒーローの波と同じ「水面」のメタファー）
 * - 変形は「回転 → 伸縮」の順で入れ子にして、必ず進行方向に沿って伸びるようにしている
 * - ネイティブカーソル（矢印・ハンド）は非表示。テキスト入力系は
 *   I ビームを残す（globals.css の .has-custom-cursor ルール参照）
 * - 色はテーマ連動（ライト: #000 / ダーク: #fff）
 * - マウス環境（pointer: fine + hover）のみ。モーション軽減設定時は表示しない
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleId = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // ドットはわずかに遅れて追従させる（この遅れが伸びの「しなり」になる）
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 55, mass: 0.4 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 55, mass: 0.4 });

  // 速度と向きは pointermove から自前で算出する
  // （停止判定を確実にして、静止時に必ず真円へ戻す）
  const rawSpeed = useMotionValue(0);
  const angle = useMotionValue(0);
  const smoothSpeed = useSpring(rawSpeed, { stiffness: 350, damping: 40 });
  const scaleX = useTransform(smoothSpeed, [0, 3500], [1, 2.1]);
  const scaleY = useTransform(smoothSpeed, [0, 3500], [1, 0.55]);

  const lastPoint = useRef<{ x: number; y: number; t: number } | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // モーション軽減時はカスタムカーソル自体を出さない
    // （ネイティブカーソルだけ消えるのを防ぐため、ここでも必ずガードする）
    if (prefersReducedMotion) return;

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (finePointer.matches === false) return;
    setEnabled(true);

    // ネイティブカーソル（矢印・ハンド）を隠す（フォーム系は globals.css で除外）
    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      // 速度（px/秒）と進行方向を算出
      const now = performance.now();
      const prev = lastPoint.current;
      if (prev) {
        const dt = now - prev.t;
        if (dt > 0) {
          const dx = event.clientX - prev.x;
          const dy = event.clientY - prev.y;
          const speed = Math.min((Math.hypot(dx, dy) / dt) * 1000, 3500);
          rawSpeed.set(speed);
          // 低速時は角度を据え置き（ゼロ近傍で向きが暴れるのを防ぐ）
          if (speed > 250) {
            angle.set((Math.atan2(dy, dx) * 180) / Math.PI);
          }
        }
      }
      lastPoint.current = { x: event.clientX, y: event.clientY, t: now };

      // 動きが止まったら速度をゼロへ（真円に戻る）
      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => rawSpeed.set(0), 80);

      // インタラクティブ要素の上ではドットを広げる
      const target = event.target instanceof Element ? event.target : null;
      setIsInteractive(
        !!target?.closest('a, button, [role="button"], summary')
      );
    };

    // クリックで波紋を放つ（環境がカーソルに応える）
    const handleDown = (event: PointerEvent) => {
      const id = rippleId.current++;
      setRipples((prev) => [...prev.slice(-4), { id, x: event.clientX, y: event.clientY }]);
    };

    const handleLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    document.addEventListener('mouseout', handleLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      clearTimeout(stopTimer.current);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      document.removeEventListener('mouseout', handleLeave);
    };
  }, [cursorX, cursorY, rawSpeed, angle, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      {/* 変形するドット（位置 → 回転 → 伸縮 → ホバー拡大 の入れ子で変換順を保証） */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
      >
        <motion.div className="w-full h-full" style={{ rotate: angle }}>
          <motion.div className="w-full h-full" style={{ scaleX, scaleY }}>
            <motion.div
              className="w-full h-full rounded-full bg-black dark:bg-white"
              animate={{
                scale: isInteractive ? 3 : 1,
                opacity: visible ? (isInteractive ? 0.35 : 0.9) : 0,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* クリック波紋 */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            aria-hidden="true"
            className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-black dark:border-white"
            style={{ x: ripple.x, y: ripple.y }}
            initial={{ width: 8, height: 8, opacity: 0.5, marginLeft: -4, marginTop: -4 }}
            animate={{
              width: 160,
              height: 160,
              opacity: 0,
              marginLeft: -80,
              marginTop: -80,
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
            }
          />
        ))}
      </AnimatePresence>
    </>
  );
}
