// src/components/ui/AnimatedButton.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
  children: ReactNode;
}

export default function AnimatedButton({
  href,
  external = false,
  onClick,
  icon: Icon,
  children
}: AnimatedButtonProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';
  const borderColor = isDark ? '#dde5ed' : '#25282a';
  const bgColor = isDark ? '#dde5ed' : '#25282a';
  const textColorNormal = isDark ? '#25282a' : '#dde5ed';
  const textColorHover = isDark ? '#dde5ed' : '#25282a';

  const buttonContent = (
    <>
      <style jsx>{`
        @keyframes light {
          0% {
            outline-color: ${borderColor};
            outline-offset: 0px;
          }
          100% {
            outline-color: transparent;
            outline-offset: 12px;
          }
        }

        .animated-button {
          outline: 1px solid ${borderColor};
          outline-offset: 0px;
          animation: light 0.8s infinite;
        }
      `}</style>

      <button
        className="animated-button relative inline-flex items-center transition-all"
        style={{
          color: textColorNormal,
          fontSize: '16px',
          background: 'transparent',
          padding: '18px 30px',
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
          gap: '0.5rem'
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = textColorHover;
          const before = e.currentTarget.querySelector('.button-before') as HTMLElement;
          if (before) {
            before.style.transform = 'scale(0)';
            before.style.opacity = '0';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColorNormal;
          const before = e.currentTarget.querySelector('.button-before') as HTMLElement;
          if (before) {
            before.style.transform = 'scale(1)';
            before.style.opacity = '1';
          }
        }}
      >
        {/* ::before 背景 */}
        <span
          className="button-before"
          style={{
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            background: bgColor,
            zIndex: -1,
            transition: 'transform ease 0.3s, opacity 0.3s',
          }}
        />

        {/* ::after ボーダー */}
        <span
          style={{
            content: '""',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            border: `1px solid ${borderColor}`,
            boxSizing: 'border-box',
            pointerEvents: 'none'
          }}
        />

        {Icon && <Icon size={20} style={{ position: 'relative', zIndex: 2 }} />}
        <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      </button>
    </>
  );

  // 外部リンク
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  // 内部リンク（Next.js Link）
  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  // ボタン（onClick）
  return <>{buttonContent}</>;
}
