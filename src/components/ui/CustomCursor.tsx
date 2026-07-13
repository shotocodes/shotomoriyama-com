// src/components/ui/CustomCursor.tsx
'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * カスタムカーソル（控えめ設計）
 * - ネイティブカーソルは消さない（テキスト I ビームやフォーム操作を壊さないため）
 * - 中心のドット＋遅れて追従するリング。リンクやボタンの上でリングが拡大する
 * - mix-blend-difference でライト/ダークどちらの背景でも視認できる
 * - マウス環境（pointer: fine + hover）のみ。モーション軽減設定時は表示しない
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!finePointer.matches) return;
    setEnabled(true);

    const handleMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      // インタラクティブ要素の上ではリングを広げる
      const target = event.target instanceof Element ? event.target : null;
      setIsInteractive(
        !!target?.closest('a, button, [role="button"], input, textarea, select, summary')
      );
    };

    const handleLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseout', handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      {/* 中心ドット（カーソルに密着） */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* 追従リング */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="w-7 h-7 rounded-full border border-white mix-blend-difference"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: isInteractive ? 1.8 : 1,
            opacity: visible ? 0.9 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  );
}
