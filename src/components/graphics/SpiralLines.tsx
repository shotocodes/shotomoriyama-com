// src/components/graphics/SpiralLines.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SpiralLinesProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
  spiralCount?: number;
}

export default function SpiralLines({
  color = '#0066FF',
  opacity = 0.3,
  animate = true,
  spiralCount = 3
}: SpiralLinesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 螺旋のパスを生成
  const createSpiralPath = (turns: number, radiusMultiplier: number) => {
    const points = [];
    const totalPoints = 200;
    const centerX = 200;
    const centerY = 200;

    for (let i = 0; i <= totalPoints; i++) {
      const angle = (i / totalPoints) * turns * Math.PI * 2;
      const radius = (i / totalPoints) * 150 * radiusMultiplier;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${i === 0 ? 'M' : 'L'} ${x},${y}`);
    }

    return points.join(' ');
  };

  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      style={{ opacity }}
    >
      {Array.from({ length: spiralCount }).map((_, index) => (
        <motion.path
          key={index}
          d={createSpiralPath(3, 1 + index * 0.3)}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? {
                  pathLength: [0, 1],
                  opacity: [0, 1, 1, 0]
                }
              : { pathLength: 1, opacity: 1 }
          }
          transition={
            animate
              ? {
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: 'easeInOut'
                }
              : {}
          }
        />
      ))}
    </svg>
  );
}
