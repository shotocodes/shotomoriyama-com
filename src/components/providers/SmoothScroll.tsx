// src/components/providers/SmoothScroll.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis による慣性スクロール。
 * - OS のモーション軽減設定時は無効（ネイティブスクロールのまま）
 * - タッチ操作はデフォルトでネイティブ挙動を維持（smoothWheel のみ）
 * - window スクロールをネイティブに駆動するので、既存の
 *   scroll リスナーや useScrollProgress はそのまま動く
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // 途中でモーション軽減が有効になったら止める
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    reducedMotionQuery.addEventListener('change', handleChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
