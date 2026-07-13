// src/components/shared/BlueprintLens.tsx
'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface BlueprintLensProps {
  children: ReactNode;
  /** レンズ内の注記に使うメタ情報 */
  meta: {
    title: string;
    year?: string;
    tags?: string[];
  };
  /** レンズの半径 (px) */
  radius?: number;
  className?: string;
}

/**
 * ブループリント・レンズ（試作）
 *
 * カーソルをかざした部分だけ、完成デザインの「下」にある設計図レイヤーが
 * 円形のレンズ内に透けて見える。
 * 「綺麗な見た目の裏に、丁寧に設計された構造がある」ことを語る演出。
 *
 * - 上層 = children（完成イメージ）はそのまま表示
 * - 下層 = 設計図（グリッド・十字線・寸法ブラケット・スペック注記）を
 *   clip-path: circle() でカーソル位置だけ切り抜いて重ねる
 * - clip-path と座標は MotionValue 駆動（React 再レンダーなし）
 * - ホバー環境のみ動作。モーション軽減時は無効（タッチでは何も起きない）
 */
export default function BlueprintLens({
  children,
  meta,
  radius = 110,
  className = '',
}: BlueprintLensProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0);
  const lensRadius = useSpring(r, { stiffness: 260, damping: 26 });

  const clipPath = useMotionTemplate`circle(${lensRadius}px at ${x}px ${y}px)`;

  // 注記はレンズ内（カーソルの右下）に常に見えるよう追従させる
  const labelX = useTransform(x, (v) => v + 18);
  const labelY = useTransform(y, (v) => v + 26);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    r.set(radius);
  };

  const handleLeave = () => {
    r.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* 上層：完成デザイン */}
      {children}

      {/* 下層：設計図レイヤー（レンズ内のみ表示） */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            clipPath,
            backgroundColor: '#0a1e3c',
            // 設計図グリッド（細 12px + 太 60px）
            backgroundImage: `
              linear-gradient(rgba(125, 180, 255, 0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(125, 180, 255, 0.18) 1px, transparent 1px),
              linear-gradient(rgba(125, 180, 255, 0.38) 1px, transparent 1px),
              linear-gradient(90deg, rgba(125, 180, 255, 0.38) 1px, transparent 1px)
            `,
            backgroundSize: '12px 12px, 12px 12px, 60px 60px, 60px 60px',
          }}
        >
          {/* カーソル位置の十字線 */}
          <motion.div
            className="absolute top-0 bottom-0 w-px"
            style={{ x, backgroundColor: 'rgba(125, 180, 255, 0.55)' }}
          />
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ y, backgroundColor: 'rgba(125, 180, 255, 0.55)' }}
          />

          {/* 四隅の寸法ブラケット */}
          {[
            'top-3 left-3 border-t border-l',
            'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r',
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute w-5 h-5 ${pos}`}
              style={{ borderColor: 'rgba(125, 180, 255, 0.8)' }}
            />
          ))}

          {/* スペック注記（レンズ内に常に見えるようカーソルに追従） */}
          <motion.div
            className="absolute top-0 left-0 font-display whitespace-nowrap"
            style={{ x: labelX, y: labelY, color: 'rgba(190, 220, 255, 0.95)' }}
          >
            <p className="text-[10px] tracking-[0.3em] mb-1" style={{ color: 'rgba(125, 180, 255, 0.8)' }}>
              BLUEPRINT
            </p>
            <p className="text-sm font-bold tracking-wide">{meta.title}</p>
            <p className="text-[11px] mt-1 opacity-80">
              {[meta.year, ...(meta.tags ?? [])].filter(Boolean).join(' / ')}
            </p>
          </motion.div>

          {/* 右上の図面番号風ラベル */}
          <div
            className="absolute top-4 right-6 font-display text-[10px] tracking-[0.25em] text-right"
            style={{ color: 'rgba(125, 180, 255, 0.75)' }}
          >
            <p>SCALE 1:1</p>
            <p className="mt-0.5">SHOTOMORIYAMA.JP</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
