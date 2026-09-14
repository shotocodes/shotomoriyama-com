// src/components/shared/WorkImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import manifest from '@/data/worksImageManifest.json';

// ビルド時に生成される「実際に存在する実績画像」の一覧。
// 未配置の画像はリクエスト自体を出さずにプレースホルダへ（コンソール400を防ぐ）
const existingImages = new Set<string>(manifest);

interface WorkImageProps {
  src?: string;
  alt: string;
  /** プレースホルダに表示する文言（省略時は「画像準備中」） */
  label?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * 実績画像の表示。/public に画像がまだ置かれていなくても
 * レイアウトを保ったままプレースホルダを表示し、表示崩れ・壊れ画像を防ぐ。
 * 素材が /public/works/<client>/ に置かれれば自動でそのまま表示される。
 */
export default function WorkImage({
  src,
  alt,
  label = '画像準備中',
  fill = false,
  width,
  height,
  sizes,
  priority,
  className,
}: WorkImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || !existingImages.has(src) || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-background-alt ${className ?? ''}`}
        style={{
          ...(fill
            ? { position: 'absolute', inset: 0 }
            : { width: '100%', height: height ? undefined : '100%', aspectRatio: width && height ? `${width} / ${height}` : undefined }),
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--color-border) 0, var(--color-border) 1px, transparent 1px, transparent 14px)',
          gap: '0.5rem',
        }}
      >
        <ImageIcon size={24} style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }} />
        <span className="text-xs text-text-secondary" style={{ opacity: 0.8 }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill || undefined}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
