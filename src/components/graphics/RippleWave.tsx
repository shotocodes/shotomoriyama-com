// src/components/graphics/RippleWave.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMounted } from '@/hooks/useMounted';

interface Ripple {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

interface RippleWaveProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
  rippleCount?: number;
  maxRadius?: number;
  interval?: number;
  width?: number;
  height?: number;
}

export default function RippleWave({
  color = '#FF8C42',
  opacity = 0.3,
  animate = true,
  rippleCount = 5,
  maxRadius = 150,
  interval = 2000,
  width = 800,
  height = 800
}: RippleWaveProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mounted = useMounted();

  // 新しい波紋を生成
  const createRipple = (): Ripple => ({
    id: `ripple-${Date.now()}-${Math.random()}`,
    x: Math.random() * width,
    y: Math.random() * height,
    timestamp: Date.now()
  });

  // 定期的に波紋を発生
  useEffect(() => {
    if (!animate || !mounted) return;

    const addRipple = () => {
      setRipples((prev) => {
        // 古い波紋を削除（4秒以上経過）
        const now = Date.now();
        const filtered = prev.filter((ripple) => now - ripple.timestamp < 4000);

        // 新しい波紋を追加
        const newRipples = [...filtered];
        for (let i = 0; i < Math.min(rippleCount, 2); i++) {
          newRipples.push(createRipple());
        }

        return newRipples;
      });
    };

    // 初回実行
    addRipple();

    // 定期実行
    const timer = setInterval(addRipple, interval);

    return () => clearInterval(timer);
  }, [animate, mounted, rippleCount, interval]);

  if (!mounted) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity }}
    >
      {ripples.map((ripple) => (
        <g key={ripple.id}>
          {/* 中心の Dot */}
          <motion.circle
            cx={ripple.x ?? 0}
            cy={ripple.y ?? 0}
            r={4}
            fill={color}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              ease: 'easeOut'
            }}
          />

          {/* 波紋1 */}
          <motion.circle
            cx={ripple.x ?? 0}
            cy={ripple.y ?? 0}
            r={0}
            fill="none"
            stroke={color}
            strokeWidth={2}
            initial={{ r: 0, opacity: 0.8 }}
            animate={{
              r: maxRadius * 0.3,
              opacity: 0
            }}
            transition={{
              duration: 2,
              ease: 'easeOut'
            }}
          />

          {/* 波紋2 */}
          <motion.circle
            cx={ripple.x ?? 0}
            cy={ripple.y ?? 0}
            r={0}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            initial={{ r: 0, opacity: 0.6 }}
            animate={{
              r: maxRadius * 0.6,
              opacity: 0
            }}
            transition={{
              duration: 2.5,
              delay: 0.3,
              ease: 'easeOut'
            }}
          />

          {/* 波紋3 */}
          <motion.circle
            cx={ripple.x ?? 0}
            cy={ripple.y ?? 0}
            r={0}
            fill="none"
            stroke={color}
            strokeWidth={1}
            initial={{ r: 0, opacity: 0.4 }}
            animate={{
              r: maxRadius,
              opacity: 0
            }}
            transition={{
              duration: 3,
              delay: 0.6,
              ease: 'easeOut'
            }}
          />
        </g>
      ))}
    </svg>
  );
}
