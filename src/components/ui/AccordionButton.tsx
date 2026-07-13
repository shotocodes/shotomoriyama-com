// src/components/ui/AccordionButton.tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useMounted } from '@/hooks/useMounted';

interface AccordionButtonProps {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function AccordionButton({
  isOpen,
  onClick,
  children
}: AccordionButtonProps) {
  const { theme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && theme === 'dark';
  const borderColor = isDark ? '#dde5ed' : '#25282a';
  const bgColor = isDark ? '#dde5ed' : '#25282a';
  const textColorNormal = isDark ? '#25282a' : '#dde5ed';
  const textColorHover = isDark ? '#dde5ed' : '#25282a';

  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center transition-all w-full justify-between"
      style={{
        color: textColorNormal,
        fontSize: '16px',
        background: 'transparent',
        padding: '18px 30px',
        border: `1px solid ${borderColor}`,
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1,
        gap: '0.5rem',
        outline: `1px solid ${borderColor}`,
        outlineOffset: '0px',
        animation: 'light 0.8s infinite'
      }}
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
      `}</style>

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

      {/* テキスト */}
      <span style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </span>

      {/* 矢印 */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </button>
  );
}
