// src/components/shared/GridButton.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface GridButtonProps {
  href: string;
  text: string;
  position?: 'left' | 'right';
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export default function GridButton({
  href,
  text,
  position = 'left',
  mobileOnly = false,
  desktopOnly = false,
}: GridButtonProps) {
  // 表示条件のクラス
  const visibilityClass = mobileOnly
    ? 'md:hidden'
    : desktopOnly
    ? 'hidden md:block'
    : '';

  // 位置クラス
  const positionClass = position === 'left'
    ? 'left-3 md:left-4 md:left-20 lg:left-28'
    : 'right-3 md:right-4 md:right-20 lg:right-28';

  return (
    <>
      {/* スマホ用シンプルボタン */}
      {mobileOnly && (
        <div className={`md:hidden absolute bottom-7 ${position === 'left' ? 'left-3' : 'right-3'} z-50`}>
          <Link href={href}>
            <motion.button
              className="relative flex items-center gap-2 px-3 py-2 cursor-pointer"
              style={{
                width: '100px',
                height: '23px',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--button-border)',
                paddingLeft: '5px'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-base" style={{ color: 'var(--button-text)' }}>→</span>
              <span className="text-xs font-bold" style={{ color: 'var(--button-text)' }}>VIEW</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: 'var(--button-text)' }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </motion.button>
          </Link>
        </div>
      )}

      {/* PC・タブレット用グリッドボタン */}
      {desktopOnly && (
        <div className={`hidden md:block absolute bottom-4 ${positionClass} z-50`}>
          <Link href={href}>
            <div className="relative group p-8 -m-8">
              {/* 残像 */}
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  width: '200px',
                  height: '74px',
                  backgroundColor: 'var(--button-bg)',
                  border: '1px solid var(--button-border)',
                }}
              />

              {/* 伸びる左の線 */}
              <div
                className="absolute left-0 bottom-0"
                style={{
                  width: '1px',
                  height: '200px',
                  backgroundColor: 'var(--button-border)',
                  transform: 'translateY(100%)',
                }}
              />

              {/* 伸びる下の線 */}
              <div
                className="absolute left-0 bottom-0"
                style={{
                  width: '300px',
                  height: '1px',
                  backgroundColor: 'var(--button-border)',
                  transform: position === 'left' ? 'translateX(-100px)' : 'translateX(100px)',
                }}
              />

              {/* ボタン本体 */}
              <motion.button
                className="relative flex items-center justify-between px-6 py-4 cursor-pointer"
                style={{
                  width: '200px',
                  height: '74px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--button-border)',
                }}
                whileHover={{
                  x: 30,
                  y: -30,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut'
                }}
              >
                {/* 矢印アイコン */}
                <motion.div
                  className="text-2xl"
                  style={{ color: 'var(--button-text)' }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                >
                  →
                </motion.div>

                {/* テキスト */}
                <span className="text-sm font-bold" style={{ color: 'var(--button-text)' }}>
                  {text}
                </span>

                {/* アイコン */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--button-text)' }}
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </motion.button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
