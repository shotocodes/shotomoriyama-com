// src/components/graphics/WaveGraphic.tsx
'use client';

import { motion } from 'framer-motion';
import CircleDiagram from './CircleDiagram';

interface WaveGraphicProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
}

export default function WaveGraphic({
  color = '#4ECDC4',
  opacity = 1,
  animate = true
}: WaveGraphicProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 700"
        style={{
          position: 'absolute',
          top: 0,
          left: '-30%',
          width: '180%',
          height: '120%',
          zIndex: 1
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Phase 1: 左から1本の幹 */}
        <motion.line
          x1="0"
          y1="350"
          x2="300"
          y2="350"
          stroke={color}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
        />

        {/* 始点のアクセント */}
        <motion.circle
          cx="0"
          cy="350"
          r="10"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? {
            scale: [0, 1.5, 1],
            opacity: [0, opacity, opacity * 0.8]
          } : {}}
          transition={{
            duration: 0.8,
            delay: 0
          }}
        />

        {/* Phase 2: 分岐点から各波への接続線 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const targetY = 150 + i * 65;

          return (
            <motion.line
              key={`branch-${i}`}
              x1="300"
              y1="350"
              x2="400"
              y2={targetY}
              stroke={color}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity } : {}}
              transition={{
                duration: 0.5,
                delay: 1.2 + i * 0.05,
                ease: "easeOut"
              }}
            />
          );
        })}

        {/* 分岐点のアクセント */}
        <motion.circle
          cx="300"
          cy="350"
          r="10"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? {
            scale: [0, 1.8, 1],
            opacity: [0, opacity, opacity * 0.8]
          } : {}}
          transition={{
            duration: 0.8,
            delay: 1.1
          }}
        />

        {/* 分岐点から広がる波紋 */}
        <motion.circle
          cx="300"
          cy="350"
          r="0"
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity="0"
          animate={animate ? {
            r: [0, 100],
            opacity: [opacity * 0.9, 0],
            strokeWidth: [3, 0.5]
          } : {}}
          transition={{
            duration: 2,
            delay: 1.2,
            ease: "easeOut"
          }}
        />

        {/* Phase 3: 波線 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <motion.path
            key={i}
            d={`M 400 ${150 + i * 65} Q 600 ${100 + i * 65}, 900 ${150 + i * 65} T 1400 ${150 + i * 65}`}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray="12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity } : {}}
            transition={{
              duration: 2,
              delay: 1.7 + i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* 各波に沿って動く点（ボット） */}
        {animate && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((waveIndex) => {
          const baseY = 150 + waveIndex * 65;
          const topY = 100 + waveIndex * 65;

          return (
            <motion.circle
              key={`wave-dot-${waveIndex}`}
              r="6"
              fill={color}
              style={{
                filter: 'blur(0.3px)',
              }}
              animate={{
                cx: [400, 600, 900, 1150, 1400],
                cy: [baseY, topY, baseY, topY, baseY],
              }}
              transition={{
                duration: 12,
                delay: 3.7 + waveIndex * 0.3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}

        {/* 静止した青い点（ポンポン出現） */}
        {animate && [
          { cx: 500, cy: 180 },
          { cx: 700, cy: 320 },
          { cx: 1000, cy: 240 },
          { cx: 600, cy: 480 },
          { cx: 900, cy: 420 },
          { cx: 1200, cy: 300 },
          { cx: 800, cy: 600 },
          { cx: 1100, cy: 550 },
          { cx: 1350, cy: 200 },
          { cx: 850, cy: 150 },
          { cx: 1250, cy: 450 },
          { cx: 550, cy: 350 }
        ].map((dot, i) => (
          <motion.circle
            key={`static-dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r="3"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4 * opacity, opacity, 0.4 * opacity],
              scale: [0, 1, 1.5, 1]
            }}
            transition={{
              duration: 2.5,
              delay: 4.5 + i * 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* 大きな波の輪郭 */}
        <motion.path
          d="M 400 200 Q 600 120, 900 200 T 1400 200"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="25 25"
          opacity="0"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1, opacity: 0.4 * opacity } : {}}
          transition={{
            duration: 3,
            delay: 2.5,
            ease: "easeInOut"
          }}
        />

        <motion.path
          d="M 400 500 Q 600 420, 900 500 T 1400 500"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="25 25"
          opacity="0"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1, opacity: 0.3 * opacity } : {}}
          transition={{
            duration: 3,
            delay: 3,
            ease: "easeInOut"
          }}
        />

        {/* 波紋エフェクト */}
        {animate && [
          { cx: 700, cy: 250, delay: 5 },
          { cx: 1100, cy: 400, delay: 7 }
        ].map((ripple, i) => (
          <motion.circle
            key={`ripple-${i}`}
            cx={ripple.cx}
            cy={ripple.cy}
            r="0"
            fill="none"
            stroke={color}
            strokeWidth="3"
            opacity="0"
            animate={{
              r: [0, 100],
              opacity: [0.6 * opacity, 0],
              strokeWidth: [3, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: ripple.delay
            }}
          />
        ))}
      </svg>

      {/* 分岐点に CircleDiagram 配置 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '200px',
          height: '200px',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <CircleDiagram
          color={color}
          opacity={opacity * 0.5}
          animate={animate}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '80%',
          width: '200px',
          height: '200px',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <CircleDiagram
          color={color}
          opacity={opacity * 0.5}
          animate={animate}
        />
      </div>
    </div>
  );
}
