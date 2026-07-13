// src/components/graphics/CircleDiagram.tsx
'use client';

import { motion } from 'framer-motion';

interface CircleDiagramProps {
  size?: number; // SVG のサイズ (px)
  color?: string; // アクセントカラー
  opacity?: number; // 全体の透明度
  animate?: boolean; // アニメーションON/OFF
  className?: string;
}

/**
 * CircleDiagram - 揺らぐ円形ダイアグラム
 * Service Page で使用している演出を共通化
 */
export default function CircleDiagram({
  size = 1000,
  color = '#0066FF',
  opacity = 0.6,
  animate = true,
  className = ''
}: CircleDiagramProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 420 420"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity,
      }}
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      {/* 外側の円 - 揺らぐ */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke="currentColor"
        className="text-text-secondary"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={animate ? {
          pathLength: 1,
          r: [175, 190, 175],
          strokeWidth: [0.4, 0.6, 0.4]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 2, ease: "easeInOut" },
          r: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          strokeWidth: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        } : {}}
      />

      {/* 中間の円1 - 回転 */}
      <motion.circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="currentColor"
        className="text-text-secondary"
        strokeWidth="0.4"
        strokeDasharray="8 8"
        style={{ transformOrigin: 'center' }}
        initial={{ pathLength: 0, rotate: 0 }}
        animate={animate ? {
          pathLength: 1,
          r: [135, 148, 135],
          rotate: [0, 360]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.2 },
          r: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        } : {}}
      />

      {/* 中間の円2 - 逆回転 */}
      <motion.circle
        cx="200"
        cy="200"
        r="100"
        fill="none"
        stroke="currentColor"
        className="text-text-secondary"
        strokeWidth="0.4"
        strokeDasharray="6 6"
        style={{ transformOrigin: 'center' }}
        initial={{ pathLength: 0, rotate: 0 }}
        animate={animate ? {
          pathLength: 1,
          r: [95, 108, 95],
          rotate: [360, 0]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 2, ease: "easeInOut", delay: 0.4 },
          r: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        } : {}}
      />

      {/* 内側の円 */}
      <motion.circle
        cx="200"
        cy="200"
        r="60"
        fill="none"
        stroke="currentColor"
        className="text-text-secondary"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={animate ? {
          pathLength: 1,
          r: [55, 68, 55],
          strokeWidth: [0.4, 0.6, 0.4],
          opacity: [0.6, 0.9, 0.6]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 3, ease: "easeInOut", delay: 0.6 },
          r: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        } : {}}
      />

      {/* 中心点 - 揺らぐ */}
      <motion.circle
        cx="200"
        cy="200"
        r="3"
        fill={color}
        animate={animate ? {
          r: [2, 4, 2],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      />

      {/* 放射状のライン - 揺らぐ */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const length = 180;
        const x1 = 200 + 15 * Math.cos((angle * Math.PI) / 180);
        const y1 = 200 + 15 * Math.sin((angle * Math.PI) / 180);
        const x2 = 200 + length * Math.cos((angle * Math.PI) / 180);
        const y2 = 200 + length * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            className="text-text-secondary"
            animate={animate ? {
              opacity: [0.2, 0.7, 0.2],
              strokeWidth: [0.3, 0.5, 0.3]
            } : {}}
            transition={animate ? {
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            } : {}}
          />
        );
      })}

      {/* 軌道を描く点 */}
      {[
        { radius: 180, duration: 15, size: 2.5, delay: 0 },
        { radius: 140, duration: 12, size: 2, delay: 2 },
        { radius: 100, duration: 10, size: 2, delay: 4 }
      ].map((orbit, i) => (
        <motion.circle
          key={`orbit-${i}`}
          r={orbit.size}
          fill={color}
          style={{
            filter: 'blur(0.3px)',
            opacity: 0.7
          }}
          animate={animate ? {
            cx: [
              200 + orbit.radius,
              200,
              200 - orbit.radius,
              200,
              200 + orbit.radius
            ],
            cy: [
              200,
              200 - orbit.radius,
              200,
              200 + orbit.radius,
              200
            ],
            opacity: [0.5, 0.9, 0.5, 0.9, 0.5]
          } : {}}
          transition={animate ? {
            duration: orbit.duration,
            repeat: Infinity,
            ease: "linear",
            delay: orbit.delay
          } : {}}
        />
      ))}

      {/* 波紋エフェクト */}
      <motion.circle
        cx="200"
        cy="200"
        r="0"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity="0"
        animate={animate ? {
          r: [0, 180],
          opacity: [0.6, 0],
          strokeWidth: [0.8, 0.2]
        } : {}}
        transition={animate ? {
          duration: 4,
          repeat: Infinity,
          ease: "easeOut"
        } : {}}
      />

      {/* ランダムに光る点（インデックスから決定的に導出 — SSR と一致させる） */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const radius = 120 + ((i * 37) % 41);
        const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.circle
            key={`particle-${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill={color}
            animate={animate ? {
              opacity: [0, 1, 0],
              r: [0.8, 2, 0.8]
            } : {}}
            transition={animate ? {
              duration: 2 + ((i * 7) % 21) / 10,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            } : {}}
          />
        );
      })}
    </svg>
  );
}
