// src/components/sections/AboutSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import SpeedMeter from '@/components/shared/SpeedMeter';
import GridBackground from '@/components/shared/GridBackground';
import {
  Code2,
  Braces,
  Terminal,
  FileCode,
  Cpu,
  Database,
  Server,
  Globe,
  Layout,
  Layers,
  Package,
  Boxes,
  Palette,
  Paintbrush,
  Pen,
  Sparkles,
  Eye,
  Monitor,
  Wrench,
  Settings,
  Zap,
  Rocket,
  Lightbulb,
  Briefcase,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Instagram,
  ExternalLink,
  MessageCircle,
  Share2,
  X,
} from 'lucide-react';

export default function AboutSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSNSModal, setShowSNSModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // モーダル表示中はスクロール禁止
useEffect(() => {
  if (showSNSModal || showSkillsModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  // クリーンアップ
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [showSNSModal, showSkillsModal]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const containerHeight = container.offsetHeight;
      const scrollableHeight = containerHeight - window.innerHeight;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // アイコンリスト
  const icons = [
    Code2, Braces, Terminal, FileCode, Cpu, Database, Server, Globe,
    Layout, Layers, Package, Boxes, Palette, Paintbrush, Pen, Sparkles,
    Eye, Monitor, Wrench, Settings, Zap, Rocket, Lightbulb, Briefcase,
    Github, Twitter, Linkedin, Mail, Instagram, ExternalLink, MessageCircle, Share2,
  ];

  // ランダムにアイコンを配置 (30個)
  const floatingIcons = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    Icon: icons[i % icons.length],
    // 初期位置 (画面下)
    initialX: Math.random() * 100,  // 0-100%
    initialY: 100 + (Math.random() * 20), // 画面下 100-120%
    // 上昇速度
    speed: 0.8 + Math.random() * 0.4,  // 0.8-1.2
    // サイズ
    size: 24 + Math.random() * 32,  // 24-56px
    // 回転
    rotation: Math.random() * 360,
    // 横揺れ
    sway: (Math.random() - 0.5) * 40,  // -20 ~ 20
  }));

  // SNSデータ
  const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/shotocodes', color: '#333' },
  { icon: Twitter, label: 'X (Twitter)', url: 'https://twitter.com/shoto', color: '#1DA1F2' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/shoto', color: '#0A66C2' },
  { icon: Mail, label: 'Email', url: 'mailto:shoto@example.com', color: '#EA4335' },
  ];

  // スキルデータ
const skills = [
  { name: 'Next.js', level: '★★★★★' },
  { name: 'React', level: '★★★★★' },
  { name: 'TypeScript', level: '★★★★☆' },
  { name: 'Tailwind CSS', level: '★★★★★' },
  { name: 'Figma', level: '★★★★☆' },
  { name: 'Node.js', level: '★★★☆☆' },
  { name: 'WordPress', level: '★★★★☆' },
];

  return (
    <div
      ref={containerRef}
      className="relative mt-[60px] md:mt-[30px] lg:mt-[60px]"
      style={{
        marginBottom: '100px',
        marginLeft: '20px',
        marginRight: '20px',
        height: '300vh'
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          id="about"
          className="relative bg-background h-full"
        >
          {/* 背景グリッド - なし */}
          <GridBackground show={false} />

          {/* スピードメーター - 右下 */}
          <SpeedMeter
            scrollProgress={scrollProgress}
            position="right"
            color="#10B981"
            gradientStart="#10B981"
            gradientEnd="#059669"
          />

          {/* ボタン - 左下 */}
          <GridButton
            href="#contact"
            text="VIEW"
            position="left"
            mobileOnly
          />

          <GridButton
            href="#contact"
            text="お問い合わせ"
            position="left"
            desktopOnly
          />

          <div className="h-full flex items-center">
            <div className="container !mx-auto !px-4 !sm:px-6 !lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                {/* 左: ABOUT */}
                <AnimatedText
                  text="ABOUT"
                  scrollProgress={scrollProgress}
                  orientation="vertical"
                  align="left"
                  accentColor="#10B981"
                />

                {/* 中央 */}
                <div className="flex-1 min-w-0 w-full">
                  {/* ヘッダー */}
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-6"
                    style={{ marginBottom: '3rem' }}
                  >
                    <div className="flex-1">
                      <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-light relative"
                        style={{ paddingBottom: '0.5rem' }}
                      >
                        技術とデザインで理想を実現
                        <span className="absolute bottom-0 left-0 w-full h-1"
                          style={{ background: 'linear-gradient(to right, #10B981, #059669)' }}
                        />
                      </p>
                      <p className="text-sm lg:text-base text-text-secondary opacity-70 font-light"
                        style={{ marginTop: '0.75rem' }}
                      >
                        確かな品質と丁寧なサポートをお約束します
                      </p>
                    </div>
                  </div>

                  {/* アイコン上昇エリア */}
                  <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px] overflow-hidden">

                    {scrollProgress < 0.8 ? (
                      // 0-80%: アイコン上昇
                      <>
                        {floatingIcons.map((item) => {
                          const Icon = item.Icon;

                          // 上昇の進捗 (0-1)
                          const riseProgress = scrollProgress * item.speed;

                          // Y位置: 下から上へ
                          const currentY = item.initialY - (riseProgress * 150); // 150% 上昇

                          // X位置: 横揺れ
                          const currentX = item.initialX + (Math.sin(riseProgress * Math.PI * 2) * item.sway);

                          // 回転
                          const rotation = item.rotation + (riseProgress * 360);

                          // 透明度: 上に行くほど薄く
                          const opacity = Math.max(0, 1 - (riseProgress * 1.2));

                          // スケール: 少し拡大
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
                              transition={{
                                duration: 0.3,
                                ease: 'linear'
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
                      // 80-100%: プロフィール情報
                      <motion.div
                        className="flex w-full relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* ========== ドットパターン背景 ========== */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 1.5px, transparent 1.5px)',
    backgroundSize: '30px 30px'
  }}
/>

{/* ========== 三角形オブジェクト ========== */}
<motion.div
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
  animate={{ rotate: 360 }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: "linear"
  }}
>
  <svg
    width="350"
    height="350"
    viewBox="0 0 100 100"
    className="opacity-20"
  >
    <polygon
      points="50,10 90,90 10,90"
      fill="none"
      stroke="#10B981"
      strokeWidth="1"
    />
  </svg>
</motion.div>

{/* ========== 小さな三角形 (3つ) ========== */}
{[
  { size: 80, left: 15, top: 20, duration: 25 },
  { size: 100, left: 75, top: 70, duration: 35 },
  { size: 60, left: 50, top: 50, duration: 20 },
].map((tri, i) => (
  <motion.div
    key={i}
    className="absolute pointer-events-none"
    animate={{ rotate: -360 }}
    transition={{
      duration: tri.duration,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      left: `${tri.left}%`,
      top: `${tri.top}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <svg
      width={tri.size}
      height={tri.size}
      viewBox="0 0 100 100"
      className="opacity-15"
    >
      <polygon
        points="50,10 90,90 10,90"
        fill="none"
        stroke="#10B981"
        strokeWidth="1.2"
      />
    </svg>
  </motion.div>
))}
    {/* ======================================== */}
  {/* 左側: 名前・肩書き・Location */}
  <div className="flex-1 relative z-10">
    {/* 名前・肩書き */}
                            <div className="mb-12"
                              style={{
                                marginBottom: '20px'
                              }}>
      <h3 className="text-3xl lg:text-5xl font-bold text-primary"
      style={{ marginBottom: '1rem' }}
    >
        森山翔登
      </h3>
      <p className="text-xl lg:text-2xl text-text-secondary"
      style={{ marginBottom: '1rem' }}
    >
        Shoto Moriyama
      </p>
      <div className="space-y-2">
        <p className="text-sm lg:text-base text-text-secondary">
          Web Developer & Designer
        </p>
        <p className="text-sm lg:text-base text-text-secondary">
          Full Stack Creator
        </p>
      </div>
    </div>

    {/* Location */}
    <div>
      <h4 className="text-lg lg:text-xl font-bold text-primary"
      style={{ marginBottom: '1rem' }}
    >
        Location
      </h4>
      <div className="space-y-2 text-sm lg:text-base text-text-secondary">
        <p>Tokyo, Japan</p>
        <p>Bangkok and Chiengmai, Thailand</p>
        <p className="flex items-center gap-2">
          <span>→ Worldwide</span>
          <Globe size={16} style={{ color: '#10B981' }} />
        </p>
      </div>
    </div>
                          </div>
                          {/* 右側: SNS/Skills ボタン (縦並び) */}
  <div className="flex flex-col gap-4 relative z-10">
    {/* SNSボタン */}
    <button
    onClick={() => setShowSNSModal(true)}
    className="flex items-center gap-3 rounded-lg border-2 transition-all hover:scale-105"
    style={{
      borderColor: '#10B981',
      color: '#10B981',
      marginRight: '20px',
      padding: '0.75rem 1.5rem'
    }}
  >
      <ExternalLink size={20} />
      <span className="font-bold">SNS</span>
    </button>

    {/* Skillsボタン */}
    <button
    onClick={() => setShowSkillsModal(true)}
    className="flex items-center gap-3 rounded-lg border-2 transition-all hover:scale-105"
    style={{
      borderColor: '#10B981',
      color: '#10B981',
      marginRight: '20px',
      padding: '0.75rem 1.5rem'
    }}
  >
      <Code2 size={20} />
      <span className="font-bold">Skills</span>
    </button>
  </div>
                      </motion.div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>
{/* SNSモーダル */}
<AnimatePresence>
  {showSNSModal && (
    <>
      {/* 背景オーバーレイ */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowSNSModal(false)}
      />

      {/* モーダル */}
      <motion.div
  className="fixed transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background rounded-lg shadow-2xl border-2 w-[90%] max-w-sm"
  style={{
    top: '50%',
    left: '50%',
    borderColor: '#10B981',
    padding: '2rem'
  }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
>
        {/* 閉じるボタン */}
        <button
    onClick={() => setShowSNSModal(false)}
    className="absolute text-text-secondary hover:text-primary transition-colors"
    style={{ top: '1rem', right: '1rem' }}
  >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-primary"
    style={{ marginBottom: '2rem' }}
  >
    SNS</h3>

       <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
    {socialLinks.map((social) => {
      const Icon = social.icon;
      return (
<a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-lg border-2 border-border hover:border-[#10B981] transition-all hover:scale-105"
          style={{ padding: '1rem' }}
        >
          <Icon size={24} style={{ color: social.color }} />
          <span className="text-primary font-medium">{social.label}</span>
          <ExternalLink size={16} className="ml-auto text-text-secondary" />
        </a>
            );
          })}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

{/* Skillsモーダル */}
<AnimatePresence>
  {showSkillsModal && (
    <>
      {/* 背景オーバーレイ */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowSkillsModal(false)}
      />

      {/* モーダル */}
      <motion.div
  className="fixed transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background rounded-lg shadow-2xl border-2 w-[90%] max-w-sm"
  style={{
    top: '50%',
    left: '50%',
    borderColor: '#10B981',
    padding: '2rem'
  }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
>
        {/* 閉じるボタン */}
        <button
    onClick={() => setShowSkillsModal(false)}
    className="absolute text-text-secondary hover:text-primary transition-colors"
    style={{ top: '1rem', right: '1rem' }}
  >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-primary"
    style={{ marginBottom: '2rem' }}
  >Skills</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {skills.map((skill) => (
      <div
        key={skill.name}
        className="flex justify-between items-center rounded-lg border-2 border-border hover:border-[#10B981] transition-all"
        style={{ padding: '1rem' }}
      >
        <span className="text-primary font-medium">{skill.name}</span>
        <span className="text-2xl" style={{ color: '#10B981' }}>{skill.level}</span>
      </div>
    ))}
  </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
        </section>
      </div>
    </div>
  );
}
