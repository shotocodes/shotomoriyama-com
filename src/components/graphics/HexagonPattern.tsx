// src/components/graphics/HexagonPattern.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HexagonPatternProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
  hexCount?: number;
}

export default function HexagonPattern({
  color = '#0066FF',
  opacity = 0.3,
  animate = true,
  hexCount = 12
}: HexagonPatternProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hexagons = [];
  const size = 60;
  const spacing = size * 1.5;

  for (let i = 0; i < hexCount; i++) {
    const angle = (i / hexCount) * Math.PI * 2;
    const radius = 150;
    const x = Math.cos(angle) * radius + 200;
    const y = Math.sin(angle) * radius + 200;

    hexagons.push({
      id: i,
      x,
      y,
      delay: i * 0.1
    });
  }

  // 六角形のパスを生成
  const createHexagonPath = (cx: number, cy: number, size: number) => {
    const points = [];
    const safeCx = cx ?? 200;
    const safeCy = cy ?? 200;
    const safeSize = size ?? 30;

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = safeCx + safeSize * Math.cos(angle);
      const y = safeCy + safeSize * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      style={{ opacity }}
    >
      {hexagons.map((hex) => (
        <motion.path
          key={hex.id}
          d={createHexagonPath(hex.x, hex.y, size / 2)}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? {
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0]
                }
              : { pathLength: 1, opacity: 1 }
          }
          transition={
            animate
              ? {
                  duration: 4,
                  repeat: Infinity,
                  delay: hex.delay ?? 0,
                  ease: 'easeInOut'
                }
              : {}
          }
        />
      ))}
    </svg>
  );
}
