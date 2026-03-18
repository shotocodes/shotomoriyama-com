// src/components/graphics/TriangleOrbit.tsx
'use client';

import { motion } from 'framer-motion';

interface TriangleOrbitProps {
  color?: string;
  opacity?: number;
  animate?: boolean;
}

export default function TriangleOrbit({
  color = '#10B981',
  opacity = 1,
  animate = true
}: TriangleOrbitProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 800" style={{ opacity }}>
      <defs>
        {/* グロー効果 */}
        <filter id="triangleGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 中央の大きな三角形 */}
      <motion.g
        animate={animate ? { rotate: 360 } : {}}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformOrigin: '400px 400px' }}
      >
        <polygon
          points="400,150 650,600 150,600"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
        />
        <polygon
          points="400,150 650,600 150,600"
          fill={color}
          opacity="0.05"
        />
      </motion.g>

      {/* 小さな三角形（軌道上） */}
      {[0, 120, 240].map((angle, i) => (
        <motion.g
          key={i}
          animate={animate ? { rotate: -360 } : {}}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5
          }}
          style={{ transformOrigin: '400px 400px' }}
        >
          <g
            transform={`rotate(${angle}, 400, 400)`}
          >
            <motion.polygon
              points="400,200 430,250 370,250"
              fill="none"
              stroke={color}
              strokeWidth="2"
              filter="url(#triangleGlow)"
              animate={animate ? {
                opacity: [0.6, 1, 0.6]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </g>
        </motion.g>
      ))}

      {/* 外側の三角形（逆向き） */}
      <motion.g
        animate={animate ? { rotate: -360 } : {}}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformOrigin: '400px 400px' }}
      >
        <polygon
          points="400,650 700,200 100,200"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.2"
          strokeDasharray="10 5"
        />
      </motion.g>

      {/* 装飾的な小さい三角形 */}
      {[
        { x: 300, y: 250, size: 40, duration: 15 },
        { x: 500, y: 300, size: 50, duration: 20 },
        { x: 250, y: 450, size: 35, duration: 18 },
        { x: 550, y: 500, size: 45, duration: 22 },
        { x: 400, y: 550, size: 30, duration: 16 }
      ].map((tri, i) => (
        <motion.g
          key={`small-${i}`}
          animate={animate ? {
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            rotate: {
              duration: tri.duration,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }
          }}
          style={{ transformOrigin: `${tri.x}px ${tri.y}px` }}
        >
          <polygon
            points={`${tri.x},${tri.y - tri.size / 2} ${tri.x + tri.size / 2},${tri.y + tri.size / 2} ${tri.x - tri.size / 2},${tri.y + tri.size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </motion.g>
      ))}

      {/* 中央の点（パルス） */}
      <motion.circle
        cx="400"
        cy="400"
        r="5"
        fill={color}
        animate={animate ? {
          r: [5, 10, 5],
          opacity: [0.8, 0.3, 0.8]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        filter="url(#triangleGlow)"
      />

      {/* 軌道上の粒子 */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const radius = 200;
        const x = 400 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 400 + Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.circle
            key={`particle-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill={color}
            animate={animate ? {
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </svg>
  );
}
