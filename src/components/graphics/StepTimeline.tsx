// src/components/graphics/StepTimeline.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StepTimelineProps {
  size?: number;
  color?: string;
  opacity?: number;
  animate?: boolean;
}

export default function StepTimeline({
  size = 1000,
  color = '#0066FF',
  opacity = 1,
  animate = true
}: StepTimelineProps) {
  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState(color);
  const [isExploding, setIsExploding] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const progressControls = useAnimation();

  // 5つのステップの位置（ラベルなし）
  const steps = [
    { x: 150, y: 250 },
    { x: 300, y: 350 },
    { x: 500, y: 220 },
    { x: 700, y: 380 },
    { x: 850, y: 280 }
  ];

  // プログレスバーのアニメーション制御（粒子到達で10%増加）
  useEffect(() => {
    if (!animate) return;

    let currentProgress = 0;
    let currentCountdown = 10;
    const particleDuration = 2000; // 粒子の移動時間2秒
    const totalParticles = 10; // 10個の粒子
    const progressPerParticle = 10; // 1粒子あたり10%

    const interval = setInterval(() => {
      currentProgress += progressPerParticle;
      currentCountdown -= 1;

      setCountdown(currentCountdown);

      if (currentProgress >= 100) {
        // 100%到達 → 爆発！
        setProgress(100);
        setCountdown(0);
        setBarColor('#FF6B6B'); // 赤色
        setIsExploding(true);

        setTimeout(() => {
          // 爆発後リセット
          setIsExploding(false);
          setBarColor(color);
          setProgress(0);
          setCountdown(10);
          currentProgress = 0;
          currentCountdown = 10;
        }, 1500);
      } else {
        setProgress(currentProgress);
      }
    }, particleDuration);

    return () => clearInterval(interval);
  }, [animate, color]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 950 500"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity,
      }}>
      <defs>
        {/* グロー効果 */}
        <filter id="hybridGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* 吸い込み用のグロー（強め） */}
        <filter id="absorbGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 背景のガイドライン（横） */}
      {[180, 300, 420].map((y, i) => (
        <motion.line
          key={`guide-h-${i}`}
          x1="100"
          y1={y}
          x2="900"
          y2={y}
          stroke={color}
          strokeWidth="1"
          strokeDasharray="5 5"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 背景のガイドライン（縦） */}
      {steps.map((step, i) => (
        <motion.line
          key={`guide-v-${i}`}
          x1={step.x}
          y1="150"
          x2={step.x}
          y2="500"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.08"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* プログレスバー（下部） */}
      <motion.rect
        x="150"
        y="530"
        width="700"
        height="10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.3"
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
        style={{ transformOrigin: 'left' }}
      />

      {/* カウントダウン表示 */}
      <motion.text
        x="500"
        y="510"
        fontSize="28"
        fontWeight="bold"
        fill={countdown <= 3 ? '#FF6B6B' : color}
        textAnchor="middle"
        key={countdown}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: countdown === 0 ? 0 : 0.8 }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {countdown === 0 ? 'BOOM!' : countdown}
      </motion.text>

      {/* プログレスバー（進捗 - 動的） */}
      <motion.rect
        x="150"
        y="530"
        height="10"
        fill={barColor}
        opacity="0.8"
        animate={{
          width: (700 * progress) / 100
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        filter="url(#hybridGlow)"
      />

      {/* 爆発エフェクト（100%到達時） */}
      {isExploding && (
        <>
          {/* 爆発の火花（放射状） */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const rad = (angle * Math.PI) / 180;
            const startX = 850;
            const startY = 535;
            const endX = startX + Math.cos(rad) * 200;
            const endY = startY + Math.sin(rad) * 200;

            return (
              <motion.line
                key={`spark-${i}`}
                x1={startX}
                y1={startY}
                x2={startX}
                y2={startY}
                stroke={barColor}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: endX,
                  y2: endY,
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
                filter="url(#hybridGlow)"
              />
            );
          })}

          {/* 爆発の円（広がる） */}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={`explosion-ring-${i}`}
              cx="850"
              cy="535"
              r="10"
              fill="none"
              stroke={barColor}
              strokeWidth="4"
              animate={{
                r: [10, 150],
                opacity: [0.8, 0],
                strokeWidth: [4, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              filter="url(#hybridGlow)"
            />
          ))}

          {/* 中心の光 */}
          <motion.circle
            cx="850"
            cy="535"
            r="20"
            fill={barColor}
            animate={{
              r: [20, 80],
              opacity: [1, 0]
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            filter="url(#absorbGlow)"
          />

          {/* パーティクル（細かい粒子） */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = Math.random() * 360;
            const rad = (angle * Math.PI) / 180;
            const distance = 80 + Math.random() * 100;
            const endX = 850 + Math.cos(rad) * distance;
            const endY = 535 + Math.sin(rad) * distance;

            return (
              <motion.circle
                key={`particle-${i}`}
                cx="850"
                cy="535"
                r={2 + Math.random() * 3}
                fill={barColor}
                animate={{
                  cx: endX,
                  cy: endY,
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.4,
                  ease: "easeOut"
                }}
                filter="url(#hybridGlow)"
              />
            );
          })}

          {/* GOAL ノードも爆発反応 */}
          <motion.circle
            cx={steps[steps.length - 1].x}
            cy={steps[steps.length - 1].y}
            r="30"
            fill="none"
            stroke={barColor}
            strokeWidth="4"
            animate={{
              r: [30, 100],
              opacity: [0.8, 0],
              strokeWidth: [4, 0]
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            filter="url(#absorbGlow)"
          />
        </>
      )}

      {/* 時間軸の目盛り */}
      {[0, 25, 50, 75, 100].map((percent, i) => {
        const x = 150 + (700 * percent) / 100;
        const isPassed = progress >= percent;
        return (
          <motion.g key={`tick-${i}`}>
            <motion.line
              x1={x}
              y1="530"
              x2={x}
              y2="545"
              stroke={isPassed ? barColor : color}
              strokeWidth="2"
              animate={{
                opacity: isPassed ? 0.8 : 0.4
              }}
              transition={{
                duration: 0.3
              }}
            />
            <motion.text
              x={x}
              y="565"
              fontSize="10"
              fill={isPassed ? barColor : color}
              textAnchor="middle"
              animate={{
                opacity: isPassed ? 0.8 : 0.4,
                fontWeight: isPassed ? 'bold' : 'normal'
              }}
              transition={{
                duration: 0.3
              }}
            >
              {percent}%
            </motion.text>
          </motion.g>
        );
      })}

      {/* 接続線（曲線） */}
      {steps.map((step, i) => {
        if (i === steps.length - 1) return null;
        const next = steps[i + 1];
        const midX = (step.x + next.x) / 2;
        const midY = (step.y + next.y) / 2;
        const controlX = midX;
        const controlY = (step.y + next.y) / 2 + (i % 2 === 0 ? -60 : 60);

        return (
          <motion.path
            key={`line-${i}`}
            d={`M ${step.x} ${step.y} Q ${controlX} ${controlY} ${next.x} ${next.y}`}
            fill="none"
            stroke={color}
            strokeWidth="4"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            filter="url(#hybridGlow)"
          />
        );
      })}

      {/* 流れる粒子（最後のノードに吸い込まれる - 10個） */}
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((offset, particleIndex) => {
        const pathSegments: { start: typeof steps[0], end: typeof steps[0], controlY: number }[] = [];

        for (let i = 0; i < steps.length - 1; i++) {
          const step = steps[i];
          const next = steps[i + 1];
          const midX = (step.x + next.x) / 2;
          const midY = (step.y + next.y) / 2;
          const controlX = midX;
          const controlY = (step.y + next.y) / 2 + (i % 2 === 0 ? -60 : 60);

          pathSegments.push({ start: step, end: next, controlY });
        }

        return (
          <motion.circle
            key={`particle-${particleIndex}`}
            r="6"
            fill={color}
            filter="url(#absorbGlow)"
            initial={{ opacity: 0 }}
            animate={animate ? {
              opacity: [0, 1, 1, 1, 0] // 最後にフェードアウト（吸い込まれる）
            } : {}}
            transition={{
              duration: 2, // 2秒で到達
              delay: offset * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* 全パスを連結したアニメーション */}
            <animateMotion
              dur="2s"
              begin={`${offset * 2}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#fullPath`} />
            </animateMotion>
          </motion.circle>
        );
      })}

      {/* 全体のパス定義（隠し） */}
      <path
        id="fullPath"
        d={steps.map((step, i) => {
          if (i === steps.length - 1) return '';
          const next = steps[i + 1];
          const midX = (step.x + next.x) / 2;
          const controlY = (step.y + next.y) / 2 + (i % 2 === 0 ? -60 : 60);
          return `${i === 0 ? 'M' : ' Q'} ${i === 0 ? step.x : midX} ${i === 0 ? step.y : controlY} ${next.x} ${next.y}`;
        }).join('')}
        fill="none"
        opacity="0"
      />

      {/* ステップノード */}
      {steps.map((step, i) => {
        const isGoal = i === steps.length - 1;

        return (
          <motion.g key={i}>
            {/* GOAL ノードの吸い込みエフェクト */}
            {isGoal && (
              <motion.circle
                cx={step.x}
                cy={step.y}
                r="60"
                fill="none"
                stroke={color}
                strokeWidth="3"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* 外側のパルスリング */}
            <motion.circle
              cx={step.x}
              cy={step.y}
              r="50"
              fill="none"
              stroke={color}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={animate ? {
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.1, 0.5]
              } : {}}
              transition={{
                duration: 3,
                delay: i * 0.4 + 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* 中間リング */}
            <motion.circle
              cx={step.x}
              cy={step.y}
              r="35"
              fill="none"
              stroke={color}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={animate ? { scale: 1, opacity: 0.6 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />

            {/* メインサークル */}
            <motion.circle
              cx={step.x}
              cy={step.y}
              r="28"
              fill={color}
              opacity="0.4"
              initial={{ scale: 0 }}
              animate={animate ? { scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: "backOut"
              }}
              filter="url(#hybridGlow)"
            />

            {/* 内側の円 */}
            <motion.circle
              cx={step.x}
              cy={step.y}
              r="18"
              fill="white"
              opacity="0.9"
              initial={{ scale: 0 }}
              animate={animate ? { scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.2 + 0.2,
                ease: "backOut"
              }}
            />

            {/* チェックマーク（完了したノード） */}
            {i < steps.length - 1 && (
              <motion.path
                d={`M ${step.x - 8} ${step.y} L ${step.x - 3} ${step.y + 6} L ${step.x + 8} ${step.y - 6}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={animate ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 1.5 + i * 0.2,
                  ease: "easeOut"
                }}
              />
            )}

            {/* GOALノードの✓マーク */}
            {isGoal && (
              <motion.text
                x={step.x}
                y={step.y}
                fontSize="20"
                fontWeight="bold"
                fill={color}
                textAnchor="middle"
                dominantBaseline="middle"
                initial={{ scale: 0, opacity: 0 }}
                animate={animate ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2 + 0.4,
                  ease: "easeOut"
                }}
              >
                ✓
              </motion.text>
            )}

            {/* 接続線から伸びる垂直線 */}
            <motion.line
              x1={step.x}
              y1={step.y + 28}
              x2={step.x}
              y2={step.y + 50}
              stroke={color}
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={animate ? { pathLength: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 1.2 + i * 0.2,
                ease: "easeOut"
              }}
            />

            {/* 装飾的な小さい点 */}
            {[0, 72, 144, 216, 288].map((angle, j) => {
              const radius = 45;
              const x = step.x + Math.cos((angle * Math.PI) / 180) * radius;
              const y = step.y + Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.circle
                  key={`dot-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={animate ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0.2, 0.6]
                  } : {}}
                  transition={{
                    duration: 2,
                    delay: i * 0.3 + j * 0.1 + 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}

            {/* データポイント */}
            {i > 0 && i < steps.length - 1 && (
              <>
                {[0, 1, 2].map((j) => (
                  <motion.circle
                    key={`data-${i}-${j}`}
                    cx={step.x + (j - 1) * 15}
                    cy={step.y - 70 - j * 10}
                    r="3"
                    fill={color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={animate ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: 1.8 + i * 0.3 + j * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
          </motion.g>
        );
      })}

      {/* 進行方向を示す矢印 */}
      {steps.map((step, i) => {
        if (i === steps.length - 1) return null;
        const next = steps[i + 1];
        const angle = Math.atan2(next.y - step.y, next.x - step.x);
        const arrowX = (step.x + next.x) / 2;
        const arrowY = (step.y + next.y) / 2 + (i % 2 === 0 ? -30 : 30);

        return (
          <motion.g
            key={`arrow-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={animate ? { opacity: 0.5, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.3 + 1.5,
              ease: "easeOut"
            }}
          >
            <path
              d={`M ${arrowX} ${arrowY} l -12 -7 l 0 14 Z`}
              fill={color}
              transform={`rotate(${(angle * 180) / Math.PI}, ${arrowX}, ${arrowY})`}
              filter="url(#hybridGlow)"
            />
          </motion.g>
        );
      })}

      {/* 背景装飾（流れる波） */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={`wave-${i}`}
          d={`M 0 ${180 + i * 120} Q 250 ${150 + i * 120} 500 ${180 + i * 120} T 1000 ${180 + i * 120}`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="5 5"
          opacity="0.1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? {
            pathLength: 1,
            opacity: 0.1
          } : {}}
          transition={{
            duration: 2,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
}
