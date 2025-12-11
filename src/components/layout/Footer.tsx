// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Github, Twitter, Mail, ArrowRight, Calculator, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const menuLinks = [
    { href: '/#service', label: 'Service' },
    { href: '/#works', label: 'Works' },
    { href: '/#support', label: 'Support' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const pageLinks = [
    { href: '/order', label: 'かんたん見積もり' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/service', label: 'サービス詳細' },
    { href: '/support', label: 'サポート情報' },
    { href: '/works', label: '制作実績' },
    { href: '/blog', label: 'ブログ' },
    { href: '/how-to-order', label: 'ご依頼の流れ' },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/shotocodes',
      color: '#333'
    },
    {
      icon: Twitter,
      label: 'X (Twitter)',
      href: 'https://twitter.com/SOAR_C72',
      color: '#1DA1F2'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:0sdm0.moriyama@gmail.com',
      color: '#EA4335'
    },
  ];

  return (
    <footer className="bg-background-alt text-primary border-t-2 border-border">
      {/* CTA Section */}
      <div
        className="border-b-2 border-border"
        style={{
          padding: '4rem 0',
          background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(168, 218, 220, 0.05))'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ maxWidth: '48rem', margin: '0 auto' }}
          >
            <h3
              className="text-2xl lg:text-3xl font-bold text-primary"
              style={{ marginBottom: '1rem' }}
            >
              まずはお気軽にご相談ください
            </h3>
            <p
              className="text-text-secondary"
              style={{ marginBottom: '2rem' }}
            >
              お見積もりは無料です。お気軽にお問い合わせください。
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: '1rem' }}
            >
              <Link href="/order">
                <button
                  className="inline-flex items-center rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #0066FF, #A8DADC)',
                    padding: '1rem 2rem',
                    gap: '0.5rem'
                  }}
                >
                  <Calculator size={20} />
                  <span>かんたん見積もり</span>
                </button>
              </Link>

              <Link href="/contact">
                <button
                  className="inline-flex items-center rounded-lg font-bold border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: '#0066FF',
                    color: '#0066FF',
                    padding: '1rem 2rem',
                    gap: '0.5rem'
                  }}
                >
                  <MessageCircle size={20} />
                  <span>お問い合わせ</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '3rem 0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div
            className="text-center lg:text-left"
            style={{ marginBottom: '3rem' }}
          >
            <Link
              href="/"
              className="inline-flex items-center group"
              style={{
                gap: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              {/* ロゴ画像 - テーマで切り替え */}
              {mounted && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
                  style={{ width: '2.5rem', height: '2.5rem' }}
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
                <div
                  className="rounded-full animate-pulse"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: 'var(--border)'
                  }}
                />
              )}

              {/* テキスト */}
              <span className="text-2xl lg:text-3xl font-bold text-primary group-hover:opacity-80 transition-opacity">
                SHOTOMORIYAMA.JP
              </span>
            </Link>

            <p
              className="text-text-secondary"
              style={{
                maxWidth: '28rem',
                margin: '0 auto'
              }}
            >
              小さな想いも、丁寧なものづくりで、
              <br />
              大きな未来に変わる。
            </p>
          </div>

          {/* Links Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{
              gap: '2rem',
              marginBottom: '3rem'
            }}
          >
            {/* Menu */}
            <div>
              <h4
                className="text-lg font-bold text-primary border-b-2 border-border inline-block"
                style={{
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem'
                }}
              >
                Menu
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors inline-flex items-center group"
                      style={{ gap: '0.5rem' }}
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4
                className="text-lg font-bold text-primary border-b-2 border-border inline-block"
                style={{
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem'
                }}
              >
                Pages
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors inline-flex items-center group"
                      style={{ gap: '0.5rem' }}
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4
                className="text-lg font-bold text-primary border-b-2 border-border inline-block"
                style={{
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem'
                }}
              >
                Connect
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-text-secondary hover:text-primary transition-all group"
                        style={{ gap: '0.75rem' }}
                      >
                        <div
                          className="rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                          style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: `${social.color}20`
                          }}
                        >
                          <Icon size={20} style={{ color: social.color }} />
                        </div>
                        <span className="font-medium">{social.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t-2 border-border"
            style={{ paddingTop: '2rem' }}
          >
            <div
              className="flex flex-col md:flex-row justify-between items-center"
              style={{ gap: '1rem' }}
            >
              {/* Copyright */}
              <p className="text-sm text-text-secondary">
                © {currentYear} Shoto Moriyama. All rights reserved.
              </p>

              {/* Additional Links */}
              <div
                className="flex"
                style={{ gap: '1.5rem' }}
              >
                <Link
                  href="/privacy"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  利用規約
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
