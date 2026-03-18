// src/components/graphics/WavePattern.tsx
'use client';

import { motion } from 'framer-motion';

interface WavePatternProps {
  color?: string; // アクセントカラー
  opacity?: number; // 全体の透明度
  animate?: boolean; // アニメーションON/OFF
  waveCount?: number; // 波の本数
  position?: 'left' | 'right' | 'center'; // 配置位置
  className?: string;
}

/**
 * WavePattern - 波線パターン
 * Works Page で使用している演出を共通化
 */
export default function WavePattern({
  color = '#4ECDC4',
  opacity = 0.3,
  animate = true,
  waveCount = 8,
  position = 'right',
  className = ''
}: WavePatternProps) {
  // 配置位置の調整
  const positionStyles = {
    left: { top: '10%', left: '-5%' },
    right: { top: '10%', right: '-10%' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        ...positionStyles[position],
        width: '700px',
        height: '500px',
        opacity,
        zIndex: 0
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 700 500"
        animate={animate ? { rotate: [0, 5, 0] } : {}}
        transition={animate ? {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      >
        {/* 波線 */}
        {[...Array(waveCount)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${100 + i * 70} Q 175 ${60 + i * 70}, 350 ${100 + i * 70} T 700 ${100 + i * 70}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? {
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3]
            } : { pathLength: 1 }}
            transition={animate ? {
              pathLength: {
                duration: 2,
                delay: i * 0.2,
                ease: "easeInOut"
              },
              opacity: {
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : {}}
          />
        ))}

        {/* 波に沿って動く点 */}
        {animate && [...Array(waveCount)].map((_, waveIndex) => {
          const baseY = 100 + waveIndex * 70;
          const topY = 60 + waveIndex * 70;

          return (
            <motion.circle
              key={`wave-dot-${waveIndex}`}
              r="6"
              fill={color}
              style={{
                filter: 'blur(0.5px)',
                opacity: 0.9
              }}
              animate={{
                cx: [0, 175, 350, 525, 700],
                cy: [baseY, topY, baseY, topY, baseY]
              }}
              transition={{
                duration: 12,
                delay: waveIndex * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}

        {/* 光の軌跡エフェクト */}
        {animate && [0, 2, 4, 6].map((waveIndex) => {
          if (waveIndex >= waveCount) return null;

          const baseY = 100 + waveIndex * 70;
          const topY = 60 + waveIndex * 70;

          return (
            <motion.circle
              key={`trail-${waveIndex}`}
              r="10"
              fill={color}
              style={{
                opacity: 0.3,
                filter: 'blur(5px)'
              }}
              animate={{
                cx: [0, 175, 350, 525, 700],
                cy: [baseY, topY, baseY, topY, baseY],
                scale: [1, 1.8, 1, 1.8, 1]
              }}
              transition={{
                duration: 12,
                delay: waveIndex * 0.5 + 0.2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}

        {/* 静止した点（アクセント） */}
        {[
          { cx: 200, cy: 180 },
          { cx: 500, cy: 320 },
          { cx: 300, cy: 480 },
          { cx: 700, cy: 420 }
        ].map((dot, i) => (
          <motion.circle
            key={`static-dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r="5"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={animate ? {
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1]
            } : { opacity: 0.5 }}
            transition={animate ? {
              duration: 2.5,
              delay: 1 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        ))}

        {/* 大きな波の輪郭（アクセント） */}
        <motion.path
          d="M 0 200 Q 175 120, 350 200 T 700 200"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="20 20"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={animate ? {
            duration: 3,
            delay: 0.5,
            ease: "easeInOut"
          } : {}}
        />

        <motion.path
          d="M 0 450 Q 175 370, 350 450 T 700 450"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="20 20"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={animate ? {
            duration: 3,
            delay: 1,
            ease: "easeInOut"
          } : {}}
        />
      </motion.svg>
    </div>
  );
}
