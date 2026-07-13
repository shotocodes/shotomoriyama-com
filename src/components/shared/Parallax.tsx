// src/components/shared/Parallax.tsx
'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  /**
   * 視差の強さと向き。正の値で背景らしくゆっくり（スクロールに遅れて）動き、
   * 負の値で手前らしく先行して動く。目安は -0.5〜0.5。
   */
  speed?: number;
  className?: string;
}

/**
 * スクロール視差ラッパー。
 * MotionValue 駆動なのでスクロール中の React 再レンダーは発生しない。
 * モーション軽減設定時は視差なしでそのまま描画する。
 */
export default function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
