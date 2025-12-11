// src/components/shared/AnimatedText.tsx
'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;                    // 表示する文字列 (例: "SERVICE", "WORKS")
  scrollProgress: number;          // 0-1のスクロール進捗
  orientation?: 'horizontal' | 'vertical'; // 横 or 縦
  align?: 'left' | 'right';       // 配置
  className?: string;              // 追加のクラス
  accentColor?: string;            // 最後の文字の色
}

export default function AnimatedText({
  text,
  scrollProgress,
  orientation = 'horizontal',
  align = 'left',
  className = '',
  accentColor,
}: AnimatedTextProps) {
  const getRandomChar = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];

  const getAnimatedText = () => {
    const progress = Math.min(scrollProgress * 1.5, 1);
    return text.split('').map((char, i) => {
      const isRevealed = progress * text.length > i + 0.5;
      const isLastChar = i === text.length - 1;
      const displayChar = isRevealed ? char : getRandomChar();

      return {
        char: displayChar,
        isLastChar: isLastChar && isRevealed,
      };
    });
  };

  const animatedChars = getAnimatedText();

  return (
    <div className="flex-shrink-0">
      {/* スマホ・タブレット: 横文字 */}
      <div
        className={`lg:hidden ${align === 'right' ? 'text-right' : ''}`}
        style={{
          marginLeft: align === 'left' ? '20px' : '0',
          marginRight: align === 'right' ? '20px' : '0',
          marginTop: '50px'
        }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold tracking-widest font-mono ${className}`}>
          {animatedChars.map((item, index) => (
            <span
              key={index}
              style={{
                color: item.isLastChar && accentColor ? accentColor : undefined,
              }}
            >
              {item.char}
            </span>
          ))}
        </h2>
      </div>

      {/* PC: 縦文字 */}
      <div
        className="hidden lg:block"
        style={{
          width: '80px',
          marginLeft: align === 'left' ? '20px' : 'auto',
          marginRight: align === 'right' ? '20px' : 'auto'
        }}
      >
        <div style={{ height: '500px', position: 'relative' }}>
          <h2
            className={`text-6xl font-bold tracking-widest select-none absolute font-mono ${className}`}
            style={{
              writingMode: 'vertical-rl',
              left: '0',
              top: '0',
              letterSpacing: '0.4em'
            }}
          >
            {animatedChars.map((item, index) => (
              <span
                key={index}
                style={{
                  color: item.isLastChar && accentColor ? accentColor : undefined,
                }}
              >
                {item.char}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
}
