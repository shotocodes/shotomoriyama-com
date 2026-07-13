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
import { ReactNode, useMemo, useRef, useState } from 'react';

interface BlueprintLensProps {
  children: ReactNode;
  /** レンズ内の注記に使うメタ情報 */
  meta: {
    title: string;
    year?: string;
    tags?: string[];
  };
  /**
   * レンズ内に見せる「裏側」
   * - blueprint: 製図グリッド＋十字線（クライアントワーク向け）
   * - code: エディタ風に流れるソースコード（個人プロジェクト向け）
   */
  variant?: 'blueprint' | 'code';
  /** variant="code" のときに流すコード */
  codeSnippet?: string;
  /** レンズの半径 (px) */
  radius?: number;
  className?: string;
}

// 依存を増やさない最小限のシンタックスハイライト
// （自前の静的スニペット専用。順序: コメント → 文字列 → キーワード → 数値）
function highlightLine(line: string): string {
  const escaped = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const commentIndex = escaped.indexOf('//');
  const codePart = commentIndex >= 0 ? escaped.slice(0, commentIndex) : escaped;
  const commentPart =
    commentIndex >= 0
      ? `<span style="color:#7fb785">${escaped.slice(commentIndex)}</span>`
      : '';

  const highlighted = codePart
    .replace(/('[^']*'|`[^`]*`)/g, '<span style="color:#ecc48d">$1</span>')
    .replace(
      /\b(const|let|return|function|export|default|import|from|if|await|async|new|type|interface)\b/g,
      '<span style="color:#c792ea">$1</span>'
    )
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f78c6c">$1</span>');

  return highlighted + commentPart;
}

const FALLBACK_SNIPPET = `// crafted line by line
const craft = async () => {
  const idea = await listen(client);
  return build(idea, { care: Infinity });
};`;

/**
 * ブループリント・レンズ
 *
 * カーソルをかざした部分だけ、完成デザインの「下」にある層が
 * 円形のレンズ内に透けて見える。
 * 「綺麗な見た目の裏に、丁寧に作られた構造がある」ことを語る演出。
 *
 * - 上層 = children（完成イメージ）はそのまま表示
 * - 下層 = variant に応じた設計図 or ソースコードを
 *   clip-path: circle() でカーソル位置だけ切り抜いて重ねる
 * - clip-path と座標は MotionValue 駆動（React 再レンダーなし）
 * - コードのスクロールはレンズが開いている間だけ動く
 * - ホバー環境のみ動作。モーション軽減時は無効（タッチでは何も起きない）
 */
export default function BlueprintLens({
  children,
  meta,
  variant = 'blueprint',
  codeSnippet,
  radius = 110,
  className = '',
}: BlueprintLensProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0);
  const lensRadius = useSpring(r, { stiffness: 260, damping: 26 });

  const clipPath = useMotionTemplate`circle(${lensRadius}px at ${x}px ${y}px)`;

  // 注記はレンズ内（カーソルの右下）に常に見えるよう追従させる
  const labelX = useTransform(x, (v) => v + 18);
  const labelY = useTransform(y, (v) => v + 26);

  // コードのカラムもレンズに追従させる
  // （コードは左寄せ・幅有限なので、固定配置だとレンズ位置によっては
  //  行末の余白しか見えなくなる）
  const codeX = useTransform(x, (v) => v - 170);

  const codeLines = useMemo(() => {
    if (variant !== 'code') return [];
    return (codeSnippet ?? FALLBACK_SNIPPET).split('\n');
  }, [variant, codeSnippet]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    r.set(radius);
    setIsActive(true);
  };

  const handleLeave = () => {
    r.set(0);
    setIsActive(false);
  };

  const accentSoft = 'rgba(125, 180, 255, 0.8)';
  const textSoft = 'rgba(190, 220, 255, 0.95)';

  const annotation = (
    <motion.div
      className="absolute top-0 left-0 font-display whitespace-nowrap"
      style={{
        x: labelX,
        y: labelY,
        color: textSoft,
        // コード版はコードの上に重なるので読みやすいよう下地を敷く
        ...(variant === 'code' && {
          backgroundColor: 'rgba(13, 17, 23, 0.88)',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          border: '1px solid rgba(125, 180, 255, 0.25)',
        }),
      }}
    >
      <p className="text-[10px] tracking-[0.3em] mb-1" style={{ color: accentSoft }}>
        {variant === 'code' ? 'SOURCE' : 'BLUEPRINT'}
      </p>
      <p className="text-sm font-bold tracking-wide">{meta.title}</p>
      <p className="text-[11px] mt-1 opacity-80">
        {[meta.year, ...(meta.tags ?? [])].filter(Boolean).join(' / ')}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* 上層：完成デザイン */}
      {children}

      {/* 下層：レンズ内のみ表示 */}
      {!prefersReducedMotion && variant === 'blueprint' && (
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
              style={{ borderColor: accentSoft }}
            />
          ))}

          {annotation}

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

      {!prefersReducedMotion && variant === 'code' && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ clipPath, backgroundColor: '#0d1117' }}
        >
          {/* ゆっくり流れるコード（レンズが開いている間だけ動かす・レンズに横追従） */}
          <motion.div
            className="absolute top-0 py-4"
            style={{ x: codeX, width: 560 }}
            animate={isActive ? { y: ['0%', '-50%'] } : { y: '0%' }}
            transition={
              isActive
                ? { duration: 28, ease: 'linear', repeat: Infinity }
                : { duration: 0 }
            }
          >
            {/* シームレスにループさせるため 2 回繰り返す */}
            {[0, 1].map((copy) => (
              <pre
                key={copy}
                className="font-mono text-[11px] leading-[1.9]"
                style={{ color: '#c9d1d9' }}
              >
                {codeLines.map((line, i) => (
                  <div key={`${copy}-${i}`} className="flex">
                    <span
                      className="select-none text-right shrink-0"
                      style={{ color: '#484f58', width: '2.5em', marginRight: '1.25em' }}
                    >
                      {i + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }} />
                  </div>
                ))}
              </pre>
            ))}
          </motion.div>

          {/* 下端をエディタ風にフェード */}
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: 'linear-gradient(transparent, #0d1117)' }}
          />

          {annotation}
        </motion.div>
      )}
    </div>
  );
}
