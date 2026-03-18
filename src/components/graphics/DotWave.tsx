// src/components/graphics/DotWave.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DotWaveProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
  dotCount?: number;
  waveAmplitude?: number;
}

export default function DotWave({
  color = '#10B981',
  opacity = 0.3,
  animate = true,
  dotCount = 20,
  waveAmplitude = 30
}: DotWaveProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const dots = [];
  const spacing = 40;

  for (let i = 0; i < dotCount; i++) {
    const x = i * spacing;
    const baseY = 200;

    dots.push({
      id: i,
      x,
      baseY,
      delay: i * 0.1
    });
  }

  return (
    <svg
      width="100%"
      height="400"
      viewBox={`0 0 ${dotCount * spacing} 400`}
      style={{ opacity }}
    >
      {dots.map((dot) => (
        <motion.circle
          key={dot.id}
          cx={dot.x}
          r={6}
          fill={color}
          initial={{ cy: dot.baseY }}
          animate={
            animate
              ? {
                  cy: [
                    dot.baseY,
                    dot.baseY - waveAmplitude,
                    dot.baseY + waveAmplitude,
                    dot.baseY
                  ]
                }
              : { cy: dot.baseY }
          }
          transition={
            animate
              ? {
                  duration: 4,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: 'easeInOut'
                }
              : {}
          }
        />
      ))}
    </svg>
  );
}
