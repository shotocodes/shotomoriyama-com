// src/components/graphics/GridSquare.tsx
'use client';

import { motion } from 'framer-motion';

interface GridSquareProps {
  size?: number; // グリッド全体のサイズ (px)
  color?: string; // アクセントカラー
  opacity?: number; // 全体の透明度
  animate?: boolean; // アニメーションON/OFF
  gridSize?: number; // グリッドの分割数（例: 10 = 10x10）
  className?: string;
}

/**
 * GridSquare - グリッド状の正方形演出
 * Estimate Page で使用している演出を共通化 + 超強化
 */
export default function GridSquare({
  size = 800,
  color = '#556270',
  opacity = 0.6,
  animate = true,
  gridSize = 12,
  className = ''
}: GridSquareProps) {
  // グリッドのセルサイズ
  const cellSize = 400 / gridSize;
  const viewBoxSize = 400;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
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
      {/* 外枠 - 揺らぐ */}
      <motion.rect
        x="20"
        y="20"
        width="360"
        height="360"
        fill="none"
        stroke="currentColor"
        className="text-text-secondary"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={animate ? {
          pathLength: 1,
          strokeWidth: [0.8, 1.2, 0.8],
          opacity: [0.5, 1, 0.5]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 2, ease: "easeInOut" },
          strokeWidth: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        } : {}}
      />

      {/* グリッド線（縦） */}
      {Array.from({ length: gridSize - 1 }).map((_, i) => {
        const x = 20 + (i + 1) * cellSize;

        return (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="20"
            x2={x}
            y2="380"
            stroke="currentColor"
            className="text-text-secondary"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? {
              pathLength: 1,
              opacity: [0.2, 0.6, 0.2]
            } : { pathLength: 1 }}
            transition={animate ? {
              pathLength: { duration: 1.5, delay: i * 0.05, ease: "easeOut" },
              opacity: { duration: 3, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }
            } : {}}
          />
        );
      })}

      {/* グリッド線（横） */}
      {Array.from({ length: gridSize - 1 }).map((_, i) => {
        const y = 20 + (i + 1) * cellSize;

        return (
          <motion.line
            key={`h-${i}`}
            x1="20"
            y1={y}
            x2="380"
            y2={y}
            stroke="currentColor"
            className="text-text-secondary"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? {
              pathLength: 1,
              opacity: [0.2, 0.6, 0.2]
            } : { pathLength: 1 }}
            transition={animate ? {
              pathLength: { duration: 1.5, delay: i * 0.05, ease: "easeOut" },
              opacity: { duration: 3, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }
            } : {}}
          />
        );
      })}

      {/* 各セルに光る点を疑似ランダム配置（決定的 — SSR と一致させる） */}
      {Array.from({ length: Math.floor(gridSize * gridSize * 0.3) }).map((_, i) => {
        const randomRow = (i * 7 + 3) % gridSize;
        const randomCol = (i * 11 + 5) % gridSize;
        const cx = 20 + randomCol * cellSize + cellSize / 2;
        const cy = 20 + randomRow * cellSize + cellSize / 2;

        return (
          <motion.circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={animate ? {
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            } : {}}
            transition={animate ? {
              duration: 2 + ((i * 7) % 21) / 10,
              delay: ((i * 13) % 30) / 10,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        );
      })}

      {/* 対角線（左上→右下） */}
      <motion.line
        x1="20"
        y1="20"
        x2="380"
        y2="380"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="8 8"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={animate ? {
          duration: 2.5,
          delay: 0.5,
          ease: "easeInOut"
        } : {}}
      />

      {/* 対角線（右上→左下） */}
      <motion.line
        x1="380"
        y1="20"
        x2="20"
        y2="380"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="8 8"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={animate ? {
          duration: 2.5,
          delay: 0.7,
          ease: "easeInOut"
        } : {}}
      />

      {/* 中心の正方形（揺らぐ）- 右下基準 */}
      <motion.rect
        x="150"
        y="150"
        width="100"
        height="100"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={animate ? {
          pathLength: 1,
          width: [100, 120, 100],
          height: [100, 120, 100],
          opacity: [0.5, 1, 0.5]
        } : { pathLength: 1 }}
        transition={animate ? {
          pathLength: { duration: 2, ease: "easeInOut" },
          width: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          height: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        } : {}}
        style={{
          transformOrigin: 'right bottom' // ← 右下を基準に
        }}
      />

      {/* 中心点 */}
      <motion.circle
        cx="200"
        cy="200"
        r="3"
        fill={color}
        animate={animate ? {
          r: [2, 5, 2],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      />

      {/* 四隅の強調点 */}
      {[
        { cx: 20, cy: 20 },
        { cx: 380, cy: 20 },
        { cx: 20, cy: 380 },
        { cx: 380, cy: 380 }
      ].map((corner, i) => (
        <motion.circle
          key={`corner-${i}`}
          cx={corner.cx}
          cy={corner.cy}
          r="4"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? {
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.7]
          } : {}}
          transition={animate ? {
            duration: 1,
            delay: 1 + i * 0.2
          } : {}}
        />
      ))}

      {/* 波紋エフェクト（右下から） */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={`ripple-${i}`}
          x="250" // ← 右下の位置
          y="250" // ← 右下の位置
          width="0"
          height="0"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0"
          style={{
            transformOrigin: 'left top' // ← 左上を基準にして右下に広がる
          }}
          animate={animate ? {
            width: [0, 200],
            height: [0, 200],
            opacity: [0.6, 0],
            strokeWidth: [1, 0.3]
          } : {}}
          transition={animate ? {
            duration: 4,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeOut"
          } : {}}
        />
      ))}

      {/* 疑似ランダムに光る正方形（セル単位・決定的 — SSR と一致させる） */}
      {Array.from({ length: 8 }).map((_, i) => {
        const randomRow = (i * 5 + 2) % (gridSize - 1);
        const randomCol = (i * 3 + 1) % (gridSize - 1);
        const x = 20 + randomCol * cellSize;
        const y = 20 + randomRow * cellSize;

        return (
          <motion.rect
            key={`cell-${i}`}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill={color}
            opacity="0"
            animate={animate ? {
              opacity: [0, 0.15, 0]
            } : {}}
            transition={animate ? {
              duration: 3,
              delay: i * 0.4 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        );
      })}

      {/* 回転する外枠（アクセント） */}
      <motion.rect
        x="60"
        y="60"
        width="280"
        height="280"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="12 12"
        opacity="0.4"
        animate={animate ? { rotate: 360 } : {}}
        transition={animate ? {
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        } : {}}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
}
