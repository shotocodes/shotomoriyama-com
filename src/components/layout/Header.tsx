// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, Palette, BookOpen, LifeBuoy, User, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 現在のテーマを判定
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const navItems = [
    {
      label: 'SERVICE',
      href: '/#service',
      color: '#0066FF',
      Icon: Briefcase,
    },
    {
      label: 'WORKS',
      href: '/#works',
      color: '#4ECDC4',
      Icon: Palette,
    },
    {
      label: 'SUPPORT',
      href: '/#support',
      color: '#FF8C42',
      Icon: LifeBuoy,
    },
    {
      label: 'BLOG',
      href: '/#blog',
      color: '#9333EA',
      Icon: BookOpen,
    },
    {
      label: 'ABOUT',
      href: '/#about',
      color: '#10B981',
      Icon: User,
    },
    {
      label: 'CONTACT',
      href: '/#contact',
      color: '#556270',
      Icon: Mail,
    },
  ];

  // SVG circular text component
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
      <svg width="80" height="80" viewBox="0 0 80 80" className="overflow-visible">
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
              style={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {character}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Text */}
          <Link
            href="/"
            className="flex items-center gap-3 z-10 group"
          >
            {/* ロゴ画像 - テーマで切り替え - マウント後のみ表示 */}
            {mounted && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-8 h-8 sm:w-10 sm:h-10"
              >
                <Image
                  src={isDark ? '/logo-w.png' : '/logo-b.png'}
                  alt="M Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
            )}

            {/* プレースホルダー（マウント前） */}
            {!mounted && (
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            )}

            {/* テキスト */}
            <span className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors">
              SHOTOMORIYAMA.JP
            </span>
          </Link>

          {/* Desktop Navigation - Circular Text */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
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
                    className="block relative"
                  >
                    {/* Circular text animation container */}
                    <motion.div
                      className="relative w-20 h-20 flex items-center justify-center"
                      animate={{
                        rotate: isHovered ? 360 : 0,
                      }}
                      transition={{
                        duration: isHovered ? 2 : 0,
                        ease: "linear",
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

                    {/* Center icon - Monochrome Lucide Icons */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          transition-all duration-300
                          ${isActive ? 'scale-110' : 'scale-100'}
                        `}
                        style={{
                          background: isActive || isHovered
                            ? item.color
                            : 'var(--color-background-alt)',
                          border: `2px solid ${item.color}`,
                          boxShadow: isActive || isHovered
                            ? `0 0 20px ${item.color}80`
                            : 'none',
                        }}
                        animate={{
                          boxShadow: isActive
                            ? [
                                `0 0 20px ${item.color}80`,
                                `0 0 30px ${item.color}60`,
                                `0 0 20px ${item.color}80`,
                              ]
                            : 'none',
                        }}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                        }}
                      >
                        <Icon
                          size={16}
                          className={`
                            transition-colors duration-300
                            ${isActive || isHovered ? 'text-white' : 'text-primary'}
                          `}
                          strokeWidth={2.5}
                        />
                      </motion.div>
                    </div>

                    {/* Glow effect */}
                    {(isActive || isHovered) && (
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />

            <button
              className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-primary transition-transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-primary transition-opacity ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-primary transition-transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-text-secondary hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-background-alt flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
