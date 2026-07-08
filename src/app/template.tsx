// src/app/template.tsx
// ルート遷移のたびに再マウントされ、ページ全体の入場アニメーションを付ける。
// MotionConfig(reducedMotion="user") 配下なので OS のモーション軽減設定にも従う。
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
