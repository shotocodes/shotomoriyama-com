// src/components/shared/SpeedMeter.tsx
'use client';

import { useId } from 'react';

interface SpeedMeterProps {
  scrollProgress: number;
  position?: 'left' | 'right';
  color?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

export default function SpeedMeter({
  scrollProgress,
  position = 'right',
  color = '#0066FF',
  gradientStart = '#0066FF',
  gradientEnd = '#A8DADC',
}: SpeedMeterProps) {
  const displayPercentage = Math.round(scrollProgress * 100);
  const uniqueId = useId(); // ← 追加
  const gradientId = `gradient-${uniqueId}`; // ← 修正

  const positionClass = position === 'left'
    ? 'left-4 sm:left-6'
    : 'right-4 sm:right-6';

  return (
    <div className={`absolute bottom-4 sm:bottom-6 ${positionClass} z-50`}>
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
        <svg className="w-full h-full transform rotate-180" viewBox="0 0 100 100">
          {/* 背景 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-border opacity-20"
          />

          {/* 進捗バー (左のみ) */}
          {position === 'left' && (
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="8"
              strokeDasharray={`${scrollProgress * 251.2} 251.2`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.3s ease-out' }}
            />
          )}

          {/* グラデーション定義 */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
          </defs>

          {/* 進捗位置にドット */}
          <circle
            cx="10"
            cy="50"
            r="4"
            fill={color}
            style={{
              transform: `rotate(${scrollProgress * 360}deg)`,
              transformOrigin: '50px 50px',
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-primary">
            {displayPercentage}
          </span>
          <span className="text-[10px] text-text-secondary">%</span>
        </div>
      </div>
    </div>
  );
}
