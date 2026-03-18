// src/components/ui/AnimatedTitle.tsx
'use client';

import { useEffect, useState } from 'react';

// ランダム文字生成関数
const generateRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  return chars[Math.floor(Math.random() * chars.length)];
};

interface AnimatedTitleProps {
  text: string;
  accentColor?: string;
  className?: string;
}

export default function AnimatedTitle({
  text,
  accentColor = '#0066FF',
  className = 'text-5xl lg:text-7xl font-bold tracking-wider'
}: AnimatedTitleProps) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => generateRandomChar()));
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // 完了判定
    if (revealedIndices.length === text.length) {
      setIsAnimating(false);
      setDisplayText(text.split(''));
      return;
    }

    if (!isAnimating) return;

    // ランダム文字のアニメーション
    const randomInterval = setInterval(() => {
      setDisplayText(prev =>
        prev.map((char, i) =>
          revealedIndices.includes(i) ? text[i] : generateRandomChar()
        )
      );
    }, 30);

    // 徐々に文字を確定
    const revealTimeouts: NodeJS.Timeout[] = [];
    text.split('').forEach((_, index) => {
      if (revealedIndices.includes(index)) return;

      const timeout = setTimeout(() => {
        setRevealedIndices(prev => [...prev, index]);
      }, index * 80 + 300);
      revealTimeouts.push(timeout);
    });

    return () => {
      clearInterval(randomInterval);
      revealTimeouts.forEach(clearTimeout);
    };
  }, [revealedIndices.length, isAnimating, text]);

  return (
    <h1 className={className}>
      {displayText.map((char, index) => (
        <span
          key={index}
          style={{
            color: index === text.length - 1 ? accentColor : 'var(--text-primary)',
            display: 'inline-block'
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
