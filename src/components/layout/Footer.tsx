// src/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import {
  Calculator,
  MessageCircle,
  ArrowRight,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Instagram
} from 'lucide-react';

interface FooterProps {
  ctaText?: string;
  ctaSubText?: string;
}

export default function Footer({
  ctaText = "あなたのアイデアを形にします",
  ctaSubText = "お気軽にご相談ください。最適なソリューションを提案します"
}: FooterProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  const menuLinks = [
    { href: '/#service', label: 'Service' },
    { href: '/#works', label: 'Works' },
    { href: '/#support', label: 'Support' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const pageLinks = [
    { href: '/estimate', label: 'かんたん見積もり' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/service', label: 'サービス詳細' },
    { href: '/support', label: 'サポート情報' },
    { href: '/works', label: '制作実績' },
    { href: '/blog', label: 'ブログ' },
    { href: '/order', label: 'ご依頼の流れ' },
  ];

  const socialLinks = [
    { name: 'Twitter',   icon: Twitter,   href: 'https://twitter.com/sh0t0x72',             color: '#1DA1F2' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sh0t0x72',            color: '#E4405F' },
    { name: 'GitHub',    icon: Github,    href: 'https://github.com/shotocodes',             color: isDark ? '#aaa' : '#181717' },
    { name: 'LinkedIn',  icon: Linkedin,  href: 'https://linkedin.com/in/shotomoriyama',     color: '#0A66C2' },
    { name: 'Email',     icon: Mail,      href: 'mailto:0sdm0.moriyama@gmail.com',           color: '#EA4335' },
  ];

  return (
    <footer className="bg-background-alt border-t border-color-border">

      {/* ========== CTA Section ========== */}
      <section
        className="border-b-2 border-color-border"
        style={{
          padding: '4rem 0',
          background: isDark ? '#25282a' : '#dde5ed'
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
            <h2
              className="text-xl lg:text-3xl font-bold text-primary"
              style={{ marginBottom: '1rem' }}
            >
              {ctaText}
            </h2>
            <p
              className="text-sm lg:text-base text-text-secondary"
              style={{ marginBottom: '2rem', lineHeight: '1.8' }}
            >
              {ctaSubText}
            </p>

            {/* CTAボタン: モバイルは縦並び、PCは横並び */}
            <div
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: '1.25rem' }}
            >
              <AnimatedButton href="/estimate" icon={Calculator}>
                かんたん見積もり
              </AnimatedButton>
              <AnimatedButton href="/contact" icon={MessageCircle}>
                お問い合わせ
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== Main Footer ========== */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '2rem', marginBottom: '2.5rem' }}
        >

          {/* ブランド（モバイルで2列full幅） */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block" style={{ marginBottom: '1rem' }}>
              {mounted && (
                <Image
                  src={isDark ? '/logo-w.png' : '/logo-b.png'}
                  alt="SHOTOMORIYAMA.JP"
                  width={160}
                  height={36}
                  className="transition-transform hover:rotate-3"
                  priority
                />
              )}
            </Link>
            <p
              className="text-text-secondary text-sm"
              style={{ lineHeight: '1.7' }}
            >
              Work Smarter, Live Freely
              <br />
              デジタルで未来を創造する
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3
              className="text-base font-bold text-primary border-b-2 border-color-border inline-block"
              style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}
            >
              Menu
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors inline-flex items-center group text-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3
              className="text-base font-bold text-primary border-b-2 border-color-border inline-block"
              style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}
            >
              Pages
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors inline-flex items-center group text-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="text-base font-bold text-primary border-b-2 border-color-border inline-block"
              style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}
            >
              Connect
            </h3>

            {/* SNSアイコン */}
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-color-border flex items-center justify-center text-text-secondary"
                    style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }}
                    whileHover={{
                      scale: 1.15,
                      borderColor: social.color,
                      backgroundColor: social.color,
                      color: '#ffffff'
                    }}
                    transition={{ duration: 0.2 }}
                    title={social.name}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>

            {/* 簡易連絡先 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <a
                href="https://line.me/ti/p/shoto0720"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                LINE: @shoto0720
              </a>
              <a
                href="mailto:0sdm0.moriyama@gmail.com"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                0sdm0.moriyama@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ========== Copyright ========== */}
      <div
        className="border-t border-color-border"
        style={{ padding: '1.5rem 0' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col sm:flex-row justify-between items-center text-text-secondary"
            style={{ gap: '0.75rem' }}
          >
            <p className="text-xs sm:text-sm">
              © 2025 SHOTOMORIYAMA.JP All rights reserved.
            </p>
            <div className="flex" style={{ gap: '1.25rem' }}>
              <Link href="/privacy" className="text-xs sm:text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs sm:text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
