// src/components/graphics/CircleGrid.tsx
'use client';

import { motion } from 'framer-motion';
import { useMounted } from '@/hooks/useMounted';

interface CircleGridProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
  gridSize?: number;
  circleSize?: number;
}

export default function CircleGrid({
  color = '#10B981',
  opacity = 0.3,
  animate = true,
  gridSize = 8,
  circleSize = 4
}: CircleGridProps) {
  const mounted = useMounted();

  if (!mounted) return null;

  const circles = [];
  const spacing = 60;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      circles.push({
        id: `${row}-${col}`,
        x: col * spacing,
        y: row * spacing,
        delay: (row + col) * 0.1
      });
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${gridSize * spacing} ${gridSize * spacing}`}
      style={{ opacity }}
    >
      {circles.map((circle) => (
        <motion.circle
          key={circle.id}
          cx={(circle.x ?? 0) + spacing / 2}
          cy={(circle.y ?? 0) + spacing / 2}
          r={circleSize ?? 4}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            animate
              ? {
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }
              : { scale: 1, opacity: 1 }
          }
          transition={
            animate
              ? {
                  duration: 3,
                  repeat: Infinity,
                  delay: circle.delay ?? 0,
                  ease: 'easeInOut'
                }
              : {}
          }
        />
      ))}
    </svg>
  );
}
