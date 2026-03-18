// src/components/sections/AboutSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import { useScrollProgress } from '@/hooks/useResponsive';
import Link from 'next/link';
import {
  Code2, Braces, Terminal, FileCode, Cpu, Database, Server, Globe,
  Layout, Layers, Package, Boxes, Palette, Paintbrush, Pen, Sparkles,
  Eye, Monitor, Wrench, Settings, Zap, Rocket, Lightbulb, Briefcase,
  Github, Twitter, Linkedin, Mail, Instagram, ExternalLink, MessageCircle,
  Share2, X, ArrowRight,
} from 'lucide-react';

import { socialLinks, skills } from '@/data/aboutData';

// ============================================================
// モバイル用プロフィール表示
// ============================================================
function MobileAbout({
  onSNS,
  onSkills,
}: {
  onSNS: () => void;
  onSkills: () => void;
}) {
  return (
    <div className="bg-background" style={{ padding: '4rem 1.25rem' }}>
      {/* タイトル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 className="text-4xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
          ABOUT
        </h2>
        <div
          style={{
            height: '3px',
            width: '80px',
            background: 'linear-gradient(to right, #10B981, #059669)',
            marginBottom: '1rem'
          }}
        />
        <p className="text-base text-text-secondary leading-relaxed">
          技術とデザインで理想を実現
        </p>
        <p className="text-xs text-text-secondary opacity-70 mt-1">
          確かな品質と丁寧なサポートをお約束します
        </p>
      </motion.div>

      {/* プロフィールカード */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-background-alt border-2 border-border"
        style={{ padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}
      >
        {/* 背景パターン */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* 回転三角形 */}
        <motion.div
          className="absolute top-0 right-0 pointer-events-none opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="#10B981" strokeWidth="1" />
          </svg>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '0.25rem' }}>
            森山翔登
          </h3>
          <p className="text-base text-text-secondary" style={{ marginBottom: '1rem' }}>
            Shoto Moriyama
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
            <p className="text-sm text-text-secondary">Web Developer & Designer</p>
            <p className="text-sm text-text-secondary">Full Stack Creator</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
              Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <p className="text-sm text-text-secondary">Tokyo, Japan</p>
              <p className="text-sm text-text-secondary">Bangkok and Chiang Mai, Thailand</p>
              <p className="text-sm text-text-secondary flex items-center gap-1">
                <span>→ Worldwide</span>
                <Globe size={14} style={{ color: '#10B981' }} />
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SNS / Skills ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2"
        style={{ gap: '1rem', marginBottom: '2rem' }}
      >
        <button
          onClick={onSNS}
          className="border-2 font-bold flex items-center justify-center gap-2"
          style={{
            padding: '0.875rem',
            borderColor: '#10B981',
            color: '#10B981',
            backgroundColor: 'transparent'
          }}
        >
          <ExternalLink size={18} />
          <span>SNS</span>
        </button>
        <button
          onClick={onSkills}
          className="border-2 font-bold flex items-center justify-center gap-2"
          style={{
            padding: '0.875rem',
            borderColor: '#10B981',
            color: '#10B981',
            backgroundColor: 'transparent'
          }}
        >
          <Code2 size={18} />
          <span>Skills</span>
        </button>
      </motion.div>

      {/* CTAボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <Link href="/about">
          <motion.button
            className="inline-flex items-center gap-2 font-bold border-2 border-[#10B981] text-[#10B981]"
            style={{ padding: '0.875rem 2rem' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>私について</span>
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const [showSNSModal, setShowSNSModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  // SSR対策
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // モーダル表示中はスクロール禁止
  useEffect(() => {
    document.body.style.overflow = (showSNSModal || showSkillsModal) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSNSModal, showSkillsModal]);

  const icons = [
    Code2, Braces, Terminal, FileCode, Cpu, Database, Server, Globe,
    Layout, Layers, Package, Boxes, Palette, Paintbrush, Pen, Sparkles,
    Eye, Monitor, Wrench, Settings, Zap, Rocket, Lightbulb, Briefcase,
    Github, Twitter, Linkedin, Mail, Instagram, ExternalLink, MessageCircle, Share2,
  ];

  const floatingIcons = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    Icon: icons[i % icons.length],
    initialX: Math.random() * 100,
    initialY: 100 + (Math.random() * 20),
    speed: 0.8 + Math.random() * 0.4,
    size: 24 + Math.random() * 32,
    rotation: Math.random() * 360,
    sway: (Math.random() - 0.5) * 40,
  }));

  // モーダル共通コンポーネント
  const Modal = ({
    show,
    onClose,
    title,
    children,
  }: {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background shadow-2xl border-2 w-[85%] sm:w-[90%] max-w-md"
            style={{ borderColor: '#10B981', padding: '1.5rem' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              onClick={onClose}
              className="absolute text-text-secondary hover:text-primary transition-colors"
              style={{ top: '1rem', right: '1rem' }}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
              {title}
            </h3>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ========== モバイル表示 ========== */}
      <div className="lg:hidden">
        <MobileAbout
          onSNS={() => setShowSNSModal(true)}
          onSkills={() => setShowSkillsModal(true)}
        />
      </div>

      {/* ========== PC表示（スクロールアニメーション） ========== */}
      <div
        ref={containerRef}
        className="relative hidden lg:block mt-[60px]"
        style={{
          marginBottom: '100px',
          marginLeft: '20px',
          marginRight: '20px',
          height: '300vh'
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <section id="about" className="relative bg-background h-full">
            <GridBackground show={false} />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="right"
              color="#10B981"
              gradientStart="#10B981"
              gradientEnd="#059669"
            />

            <GridButton href="/about" text="私について" position="left" desktopOnly />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-12">

                  <AnimatedText
                    text="ABOUT"
                    scrollProgress={scrollProgress}
                    orientation="vertical"
                    align="left"
                    accentColor="#10B981"
                  />

                  <div className="flex-1 min-w-0 w-full">
                    <div style={{ marginBottom: '3rem' }}>
                      <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2 inline-block">
                        技術とデザインで理想を実現
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{ background: 'linear-gradient(to right, #10B981, #059669)' }}
                        />
                      </p>
                      <p className="text-base text-text-secondary opacity-70 mt-3">
                        確かな品質と丁寧なサポートをお約束します
                      </p>
                    </div>

                    <div className="relative flex items-center justify-center min-h-[600px] overflow-hidden">
                      {scrollProgress < 0.7 ? (
                        // アイコン上昇
                        <>
                          {floatingIcons.map((item) => {
                            const Icon = item.Icon;
                            const riseProgress = scrollProgress * item.speed;
                            const currentY = item.initialY - (riseProgress * 150);
                            const currentX = item.initialX + (Math.sin(riseProgress * Math.PI * 2) * item.sway);
                            const rotation = item.rotation + (riseProgress * 360);
                            const opacity = Math.max(0, 1 - (riseProgress * 1.2));
                            const scale = 1 + (riseProgress * 0.3);

                            return (
                              <motion.div
                                key={item.id}
                                className="absolute"
                                style={{
                                  left: `${currentX}%`,
                                  top: `${currentY}%`,
                                  opacity,
                                  scale,
                                  rotate: rotation,
                                }}
                              >
                                <Icon
                                  size={item.size}
                                  strokeWidth={1.5}
                                  style={{
                                    color: '#10B981',
                                    filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))'
                                  }}
                                />
                              </motion.div>
                            );
                          })}
                        </>
                      ) : (
                        // プロフィール情報
                        <motion.div
                          className="flex flex-row w-full relative"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* 背景パターン */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 1.5px, transparent 1.5px)',
                              backgroundSize: '30px 30px'
                            }}
                          />

                          {/* 三角形オブジェクト */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                          >
                            <svg width="350" height="350" viewBox="0 0 100 100" className="opacity-20">
                              <polygon points="50,10 90,90 10,90" fill="none" stroke="#10B981" strokeWidth="1" />
                            </svg>
                          </motion.div>

                          {/* 小さな三角形 */}
                          {[
                            { size: 80, left: 15, top: 20, duration: 25 },
                            { size: 100, left: 75, top: 70, duration: 35 },
                            { size: 60, left: 50, top: 50, duration: 20 },
                          ].map((tri, i) => (
                            <motion.div
                              key={i}
                              className="absolute pointer-events-none"
                              animate={{ rotate: -360 }}
                              transition={{ duration: tri.duration, repeat: Infinity, ease: 'linear' }}
                              style={{
                                left: `${tri.left}%`,
                                top: `${tri.top}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            >
                              <svg width={tri.size} height={tri.size} viewBox="0 0 100 100" className="opacity-15">
                                <polygon points="50,10 90,90 10,90" fill="none" stroke="#10B981" strokeWidth="1.2" />
                              </svg>
                            </motion.div>
                          ))}

                          {/* プロフィール情報 */}
                          <div className="flex-1 relative z-10">
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h3 className="text-5xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                                森山翔登
                              </h3>
                              <p className="text-2xl text-text-secondary" style={{ marginBottom: '1rem' }}>
                                Shoto Moriyama
                              </p>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p className="text-base text-text-secondary">Web Developer & Designer</p>
                                <p className="text-base text-text-secondary">Full Stack Creator</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                                Location
                              </h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p className="text-base text-text-secondary">Tokyo, Japan</p>
                                <p className="text-base text-text-secondary">Bangkok and Chiang Mai, Thailand</p>
                                <p className="text-base text-text-secondary flex items-center gap-2">
                                  <span>→ Worldwide</span>
                                  <Globe size={16} style={{ color: '#10B981' }} />
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* SNS/Skills ボタン */}
                          <div className="relative z-10 flex flex-col justify-center w-[200px] h-[400px] mr-5">
                            {/* SNSボタン */}
                            <motion.button
                              onClick={() => setShowSNSModal(true)}
                              className="relative absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                              animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, 0, -5, 0]
                              }}
                              transition={{
                                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                              }}
                              whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.6 } }}
                            >
                              <svg width="100" height="100" viewBox="0 0 100 100">
                                <polygon points="50,10 90,85 10,85" fill="none" stroke="#10B981" strokeWidth="2" />
                                <polygon points="50,10 90,85 10,85" fill="#10B981" opacity="0.1" />
                              </svg>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                                <ExternalLink size={24} style={{ color: '#10B981' }} />
                                <span className="text-sm font-bold" style={{ color: '#10B981' }}>SNS</span>
                              </div>
                            </motion.button>

                            {/* Skillsボタン */}
                            <motion.button
                              onClick={() => setShowSkillsModal(true)}
                              className="relative absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                              animate={{
                                y: [0, 15, 0],
                                rotate: [0, -5, 0, 5, 0]
                              }}
                              transition={{
                                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                                rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                              }}
                              whileHover={{ rotate: -360, scale: 1.1, transition: { duration: 0.6 } }}
                            >
                              <svg width="100" height="100" viewBox="0 0 100 100">
                                <polygon points="50,90 90,15 10,15" fill="none" stroke="#10B981" strokeWidth="2" />
                                <polygon points="50,90 90,15 10,15" fill="#10B981" opacity="0.1" />
                              </svg>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                                <span className="text-sm font-bold" style={{ color: '#10B981' }}>Skills</span>
                                <Code2 size={24} style={{ color: '#10B981' }} />
                              </div>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ========== SNSモーダル（共通） ========== */}
      <Modal show={showSNSModal} onClose={() => setShowSNSModal(false)} title="SNS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-border hover:border-[#10B981] transition-all hover:scale-105"
                style={{ padding: '0.75rem 1rem' }}
              >
                <Icon size={20} style={{ color: social.color }} />
                <span className="text-sm text-primary font-medium flex-1">{social.label}</span>
                <ExternalLink size={14} className="text-text-secondary" />
              </a>
            );
          })}
        </div>
        <div
          className="text-center border-t-2 border-border"
          style={{ marginTop: '1.5rem', paddingTop: '1rem' }}
        >
          <p className="text-xs text-text-secondary" style={{ marginBottom: '0.5rem' }}>
            メールでのお問い合わせは
          </p>
          <Link
            href="/contact"
            className="text-sm font-bold text-primary hover:text-[#10B981] transition-colors inline-flex items-center gap-1"
          >
            <Mail size={14} />
            <span>Contact ページ</span>
          </Link>
        </div>
      </Modal>

      {/* ========== Skillsモーダル（共通） ========== */}
      <Modal show={showSkillsModal} onClose={() => setShowSkillsModal(false)} title="Skills">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex justify-between items-center border-2 border-border hover:border-[#10B981] transition-all"
              style={{ padding: '0.75rem 1rem' }}
            >
              <span className="text-sm text-primary font-medium">{skill.name}</span>
              <div className="flex" style={{ gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-lg"
                    style={{ color: star <= skill.level ? '#10B981' : '#ddd' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
