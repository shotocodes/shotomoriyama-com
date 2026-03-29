'use client';

// src/app/links/LinksContent.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { profile, links, type LinkItem } from './linksData';
import ThemeToggle from '@/components/ui/ThemeToggle';

// ============================================================
// アイコン
// ============================================================
function PortfolioIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

function NoteIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="text-primary" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function BlogIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InstagramIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function ContactIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function getIcon(icon: string, color: string) {
  switch (icon) {
    case 'portfolio': return <PortfolioIcon color={color} />;
    case 'globe':     return <GlobeIcon color={color} />;
    case 'note':      return <NoteIcon color={color} />;
    case 'x':         return <XIcon />;
    case 'blog':      return <BlogIcon color={color} />;
    case 'instagram': return <InstagramIcon color={color} />;
    case 'contact':   return <ContactIcon color={color} />;
    default:          return <GlobeIcon color={color} />;
  }
}

// ============================================================
// リンクボタン
// ============================================================
function LinkButton({ link }: { link: typeof links[number] }) {
  return (
    <motion.div
      className="flex items-center gap-4 border-2 border-border cursor-pointer"
      style={{
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        borderColor: link.featured ? link.color : undefined,
        backgroundColor: link.featured ? `${link.color}08` : 'var(--color-background)',
        transition: 'all 0.2s ease'
      }}
      whileHover={{
        scale: 1.02,
        borderColor: link.color,
        backgroundColor: `${link.color}10`,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* アイコン */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: '8px',
          backgroundColor: `${link.color}15`,
        }}
      >
        {getIcon(link.icon, link.color)}
      </div>

      {/* ラベル */}
      <span className="flex-1 font-bold text-primary text-sm">
        {link.label}
      </span>

      {/* 矢印 */}
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        className="text-text-secondary flex-shrink-0"
      >
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function LinksContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div
      className="min-h-screen"
      style={{
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: 'var(--color-background)'
      }}
    >
      {/* 背景グラデーション */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: isDark
            ? 'radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(147,51,234,0.06) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(147,51,234,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 背景グラフィック */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

        {/* 右上: 回転する円 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', opacity: 0.4 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="120" fill="none" stroke="#0066FF" strokeWidth="1" strokeDasharray="8 8"/>
            <circle cx="150" cy="150" r="90" fill="none" stroke="#A8DADC" strokeWidth="0.5"/>
            <circle cx="150" cy="150" r="60" fill="none" stroke="#0066FF" strokeWidth="1" strokeDasharray="4 4"/>
          </svg>
        </motion.div>

        {/* 左下: 三角形 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', opacity: 0.25 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 240 240">
            <polygon points="120,20 220,200 20,200" fill="none" stroke="#10B981" strokeWidth="1"/>
            <polygon points="120,50 190,180 50,180" fill="none" stroke="#10B981" strokeWidth="0.5" strokeDasharray="6 6"/>
          </svg>
        </motion.div>

        {/* 右下: グリッドドット */}
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.5 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <motion.circle
                  key={`${row}-${col}`}
                  cx={col * 24 + 12}
                  cy={row * 24 + 12}
                  r="2"
                  fill="#9333EA"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, delay: (row + col) * 0.2, repeat: Infinity }}
                />
              ))
            )}
          </svg>
        </div>

        {/* 左中: 波紋 */}
        <div style={{ position: 'absolute', top: '40%', left: '-40px', opacity: 0.2 }}>
          <motion.svg width="120" height="120" viewBox="0 0 120 120">
            {[30, 50, 70].map((r, i) => (
              <motion.circle
                key={i}
                cx="60" cy="60" r={r}
                fill="none" stroke="#FF6B6B" strokeWidth="1"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
              />
            ))}
          </motion.svg>
        </div>
      </div>

      {/* テーマトグル */}
      <div style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 50 }}>
        <ThemeToggle />
      </div>

      {/* メインコンテンツ */}
      <div
        className="relative"
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          padding: '4rem 1.25rem 3rem',
          zIndex: 1
        }}
      >
        {/* プロフィール */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '2.5rem' }}
        >
          {/* アバター */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ width: '88px', height: '88px', margin: '0 auto 1.25rem', position: 'relative' }}
          >
            {/* グラデーションリング */}
            <div
              style={{
                position: 'absolute',
                inset: '-3px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0066FF, #A8DADC, #FF6B6B)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '0px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-background)',
                margin: '3px'
              }}
            />
            {mounted && (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={88}
                height={88}
                className="rounded-full"
                style={{
                  position: 'absolute',
                  inset: '3px',
                  width: 'calc(100% - 6px)',
                  height: 'calc(100% - 6px)',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            )}
          </motion.div>

          {/* 名前 */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-primary"
            style={{ marginBottom: '0.375rem' }}
          >
            {profile.name}
          </motion.h1>

          {/* 肩書き */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm font-medium"
            style={{ color: '#0066FF', marginBottom: '0.5rem' }}
          >
            {profile.title}
          </motion.p>

          {/* 一言 */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-text-secondary"
          >
            {profile.bio}
          </motion.p>
        </motion.div>

        {/* リンクボタン一覧 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {links.map((link: LinkItem, index: number) => {
            const isInternalPath =
              link.url.startsWith('https://shotomoriyama.com/') &&
              link.url !== 'https://shotomoriyama.com';

            const isExternal = !link.url.startsWith('https://shotomoriyama.com');

            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
              >
                {isInternalPath ? (
                  <Link href={link.url.replace('https://shotomoriyama.com', '')}>
                    <LinkButton link={link} />
                  </Link>
                ) : (
                  <a
                    href={link.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <LinkButton link={link} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* フッター */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-xs text-text-secondary"
          style={{ marginTop: '2.5rem' }}
        >
          © 2025 Shoto Moriyama
        </motion.p>
      </div>
    </div>
  );
}
