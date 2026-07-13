// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Palette, BookOpen, LifeBuoy, User, Mail } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // rAF でスクロールイベントを間引く（1フレーム1回まで）
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setIsScrolled(window.scrollY > 20);

        const sections = ['service', 'works', 'blog', 'support', 'about', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape キーでモバイルメニューを閉じる
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // モバイルメニューが開いているときはスクロール禁止
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'SERVICE', href: '/#service', mobileHref: '/service', color: '#0066FF',  Icon: Briefcase },
    { label: 'WORKS', href: '/#works', mobileHref: '/works', color: '#4ECDC4', Icon: Palette },
    { label: 'SUPPORT', href: '/#support', mobileHref: '/support', color: '#FF8C42',  Icon: LifeBuoy },
    { label: 'BLOG',    href: '/#blog',    mobileHref: '/blog',    color: '#9333EA',  Icon: BookOpen },
    { label: 'ABOUT',   href: '/#about',   mobileHref: '/about',   color: '#10B981',  Icon: User     },
    { label: 'CONTACT', href: '/#contact', mobileHref: '/contact', color: '#FF6B6B',  Icon: Mail     },
  ];

  // ============================================================
  // PC用: 円形テキストコンポーネント（そのまま維持）
  // ============================================================
  interface CircularTextProps {
    text: string;
    radius: number;
    color: string;
    isActive: boolean;
    isHovered: boolean;
  }

  const CircularText = ({ text, radius, color, isActive, isHovered }: CircularTextProps) => {
    const characters = text.split('');
    const angleStep = 180 / characters.length;

    return (
      <svg width="80" height="80" viewBox="0 0 80 80" className="overflow-visible" aria-hidden="true">
        {characters.map((character: string, index: number) => {
          const angle = (angleStep * index - 90) * (Math.PI / 180);
          const x = 40 + radius * Math.cos(angle);
          const y = 40 + radius * Math.sin(angle);
          const rotation = angleStep * index;

          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rotation}, ${x}, ${y})`}
              className={`
                text-[8px] font-bold transition-all duration-300
                ${isActive ? 'fill-accent' : 'fill-text-secondary'}
                ${isHovered ? 'fill-primary' : ''}
              `}
              style={{ opacity: isHovered ? 1 : 0.8 }}
            >
              {character}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ロゴ（テーマ別ロゴは CSS で切り替え = プレースホルダのちらつきなし） */}
            <Link href="/" className="flex items-center gap-3 z-10 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-8 h-8 sm:w-10 sm:h-10"
              >
                <Image
                  src="/logo-b.png"
                  alt="M Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/logo-w.png"
                  alt="M Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain hidden dark:block"
                  priority
                />
              </motion.div>
              <span className="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors tracking-tight">
                SHOTOMORIYAMA.JP
              </span>
            </Link>

            {/* PC ナビゲーション（円形テキスト・そのまま維持） */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(2);
                const isHovered = hoveredIndex === index;
                const Icon = item.Icon;

                return (
                  <motion.div
                    key={item.href}
                    className="relative"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={item.label}
                      className="block relative rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {/* 円形テキスト */}
                      <motion.div
                        className="relative w-20 h-20 flex items-center justify-center"
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{
                          duration: isHovered ? 2 : 0,
                          ease: 'linear',
                          repeat: isHovered ? Infinity : 0,
                        }}
                      >
                        <CircularText
                          text={item.label}
                          radius={28}
                          color={item.color}
                          isActive={isActive}
                          isHovered={isHovered}
                        />
                      </motion.div>

                      {/* 中央アイコン */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                          style={{
                            background: isActive || isHovered ? item.color : 'var(--color-background-alt)',
                            border: `2px solid ${item.color}`,
                            boxShadow: isActive || isHovered ? `0 0 20px ${item.color}80` : 'none',
                          }}
                          animate={{
                            boxShadow: isActive
                              ? [`0 0 20px ${item.color}80`, `0 0 30px ${item.color}60`, `0 0 20px ${item.color}80`]
                              : 'none',
                          }}
                          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                        >
                          <Icon
                            size={16}
                            className={`transition-colors duration-300 ${isActive || isHovered ? 'text-white' : 'text-primary'}`}
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      </div>

                      {/* グロウ */}
                      {(isActive || isHovered) && (
                        <motion.div
                          className="absolute inset-0 rounded-full -z-10"
                          style={{ background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)` }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.5 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>

            {/* モバイル: ThemeToggle + ハンバーガー */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />

              <button
                className="relative flex flex-col items-center justify-center w-11 h-11 gap-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="メニューを開閉する"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.span
                  className="block w-6 h-0.5 bg-primary origin-center"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-primary"
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-primary origin-center"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========== モバイルメニュー ========== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* メニューパネル */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-background z-50 lg:hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="ナビゲーションメニュー"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* パネルヘッダー */}
              <div
                className="flex items-center justify-between border-b border-color-border"
                style={{ padding: '1.25rem 1.5rem', height: '80px' }}
              >
                <span className="text-lg font-bold text-primary">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-primary transition-colors"
                  aria-label="メニューを閉じる"
                >
                  <motion.span
                    className="text-2xl font-light"
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.span>
                </button>
              </div>

              {/* ナビリンク */}
              <nav style={{ padding: '1rem 0' }}>
                {navItems.map((item, index) => {
                  const Icon = item.Icon;
                  const isActive = activeSection === item.href.slice(2);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.mobileHref}
                        className="flex items-center gap-4 transition-colors"
                        style={{
                          padding: '0.875rem 1.5rem',
                          borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                          backgroundColor: isActive ? `${item.color}10` : 'transparent',
                          color: isActive ? item.color : 'var(--color-text-secondary)'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {/* カラーアイコン */}
                        <div
                          className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            backgroundColor: `${item.color}20`,
                          }}
                        >
                          <Icon size={18} style={{ color: item.color }} strokeWidth={2} />
                        </div>

                        <span className="text-base font-bold">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* パネルフッター: 問い合わせへのショートカット */}
              <div
                className="absolute bottom-0 left-0 right-0 border-t border-color-border"
                style={{ padding: '1.25rem 1.5rem' }}
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full font-bold border-2 text-[#FF6B6B] transition-all"
                  style={{
                    padding: '0.875rem',
                    borderColor: '#FF6B6B',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail size={18} />
                  <span>お問い合わせ</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
