// src/app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SectionTitle from '@/components/ui/SectionTitle';
import TriangleOrbit from '@/components/graphics/TriangleOrbit';
import RadialLines from '@/components/graphics/RadialLines';
import WavePattern from '@/components/graphics/WavePattern';
import Link from 'next/link';

import {
  ExternalLink,
  Globe,
  Code2,
  Target,
  Mail
} from 'lucide-react';

// ✅ データをインポート
import {
  projects,
  socialLinks,
  skills,
  timeline,
  values
} from '@/data/aboutData';

type TabType = 'sns' | 'skills' | 'timeline';

  // タブデータ
  const tabs = [
    { id: 'sns' as TabType, label: 'SNS Links', icon: ExternalLink },
    { id: 'skills' as TabType, label: 'Skills', icon: Code2 },
    { id: 'timeline' as TabType, label: 'Timeline', icon: Target }
  ];
  const ACCENT_COLORS = ['#10B981', '#0066FF', '#9333EA', '#FF8C42'];

export default function AboutPage() {
  const [accentColor, setAccentColor] = useState('#10B981');
  const [activeTab, setActiveTab] = useState<TabType>('sns');

  // 色変化アニメーション
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % ACCENT_COLORS.length;
      setAccentColor(ACCENT_COLORS[index]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

        {/* Hero */}
        <PageHero
          title="ABOUT"
          subtitle="私について"
          description="技術とデザインで、あなたの理想を実現します"
          accentColor="#10B981"
          useAnimatedTitle={true}
          showGrid={true}
        />

        {/* Hero 用グラフィック */}
        <div style={{ position: 'relative' }}>
          {/* 右上 TriangleOrbit */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-700px',
              right: '2%',
              width: '1000px',
              height: '1000px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <TriangleOrbit
                color="#10B981"
                opacity={0.8}
                animate={true}
              />
            </motion.div>
          </div>

            {/* モバイル */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="lg:hidden flex justify-center"
              style={{ padding: '1rem 0', pointerEvents: 'none' }}
            >
            <div style={{ width: '200px', height: '200px', transform: 'scale(1.8)', transformOrigin: 'center' }}>
              <TriangleOrbit color={accentColor} opacity={0.6} animate={true} />
            </div>
            </motion.div>
        </div>

        {/* プロフィールセクション */}
        <section
          className="bg-background-alt"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 左下 RadialLines */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-10%',
              width: '600px',
              height: '600px',
              pointerEvents: 'none',
              opacity: 0.5,
              zIndex: 1
            }}
          >
            <RadialLines
              color={accentColor}
              opacity={1}
              animate={true}
              lineCount={24}
            />
          </div>

          {/* 右上 WavePattern */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '500px',
              height: '400px',
              pointerEvents: 'none',
              opacity: 0.25,
              zIndex: 0
            }}
          >
            <WavePattern
              color={accentColor}
              opacity={1}
              animate={true}
              waveCount={5}
              position="center"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            <SectionTitle
              title="Profile"
              subtitle="プロフィール"
              accentColor="#10B981"
              marginBottom="4rem"
            />

            <div
              className="bg-background border-2 border-border"
              style={{
                padding: '3rem',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* ドット背景 */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px)',
                  backgroundSize: '30px 30px',
                  zIndex: 0
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              {/* 基本情報（2列） */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2"
                style={{ gap: '3rem', marginBottom: '3rem', position: 'relative', zIndex: 1 }}
              >
                {/* 左側: 基本情報 */}
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                    森山翔登
                  </h3>
                  <p className="text-xl lg:text-2xl text-text-secondary" style={{ marginBottom: '2rem' }}>
                    Shoto Moriyama
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <p className="text-base lg:text-lg text-text-secondary">
                      Web Developer & Designer
                    </p>
                    <p className="text-base lg:text-lg text-text-secondary">
                      Full Stack Creator
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
                      Location
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p className="text-text-secondary flex items-center" style={{ gap: '0.5rem' }}>
                        <Globe size={16} style={{ color: accentColor }} />
                        <span>Tokyo, Japan</span>
                      </p>
                      <p className="text-text-secondary flex items-center" style={{ gap: '0.5rem' }}>
                        <Globe size={16} style={{ color: accentColor }} />
                        <span>Bangkok & Chiang Mai, Thailand</span>
                      </p>
                      <p className="text-text-secondary flex items-center" style={{ gap: '0.5rem' }}>
                        <Globe size={16} style={{ color: accentColor }} />
                        <span>→ Worldwide Remote</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 右側: 自己紹介 + Working Style */}
                <div>
                  <h4 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                    About Me
                  </h4>
                  <div className="text-text-secondary leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <p>
                      Webデザインと開発の両方を手がけるフルスタッククリエイターです。
                      東京とタイを拠点に、世界中のクライアントとリモートで仕事をしています。
                    </p>
                    <p>
                      「技術とデザインで理想を実現する」をモットーに、
                      お客様のビジョンを形にするお手伝いをしています。
                    </p>
                    <p>
                      コーポレートサイト、ランディングページ、ECサイトなど、
                      幅広いプロジェクトに対応可能です。
                    </p>
                  </div>

                  {/* ✅ 追加: Working Style */}
                  <h4 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                    Working Style
                  </h4>
                  <div className="text-text-secondary leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p>
                      <strong className="text-primary">厳選受注</strong>で、
                      1件1件のプロジェクトに全力投球しています。
                    </p>
                    <p>
                      企画・デザイン・コーディングを一貫して担当し、
                      お客様のビジョンを形にします。
                    </p>
                    <p>
                      納品後も<strong className="text-primary">保守契約</strong>で
                      継続的にサポート。長期的なパートナーとして信頼されています。
                    </p>
                  </div>
                </div>
              </div>

              {/* タブナビゲーション */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  borderBottom: '2px solid var(--color-border)',
                  marginBottom: '2rem',
                  position: 'relative',
                  zIndex: 1,
                  flexWrap: 'wrap'
                }}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center font-bold transition-all"
                      style={{
                        padding: '1rem 1.5rem',
                        gap: '0.5rem',
                        color: isActive ? accentColor : 'var(--color-text-secondary)',
                        borderBottom: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                        marginBottom: '-2px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* タブコンテンツ */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  {/* SNS Links */}
{activeTab === 'sns' && (
  <div>
    {/* SNSカード（4つ） */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4" style={{ gap: '1rem' }}>
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center border-2 border-border hover:border-[#10B981] transition-all text-center"
            style={{
              padding: '1.5rem',
              gap: '0.75rem',
              textDecoration: 'none'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon size={32} style={{ color: social.color }} />
            <span className="text-sm font-medium text-primary">{social.label}</span>
          </motion.a>
        );
      })}
    </div>

    {/* ✅ メール誘導テキスト追加 */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="mt-6 pt-6 border-t-2 border-border text-center"
    >
      <p className="text-sm text-text-secondary mb-3">
        メールでのお問い合わせは
      </p>
<Link
        href="/contact"
        className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-[#10B981] transition-colors"
      >
        <Mail size={18} />
        <span>Contact ページ</span>
      </Link>
    </motion.div>
  </div>
)}

                  {/* Skills */}
                  {activeTab === 'skills' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4" style={{ gap: '1rem' }}>
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-background-alt border-2 border-border"
                          style={{ padding: '1.5rem' }}
                        >
                          <div style={{ marginBottom: '1rem' }}>
                            <h4 className="font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                              {skill.name}
                            </h4>
                            <p className="text-xs text-text-secondary">
                              {skill.category}
                            </p>
                          </div>
                          <div className="flex" style={{ gap: '0.25rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="text-xl"
                                style={{ color: star <= skill.level ? accentColor : '#ddd' }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Timeline */}
                  {activeTab === 'timeline' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {timeline.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start bg-background-alt border-2 border-border"
                            style={{ padding: '1.5rem', gap: '1.5rem' }}
                          >
                            <div
                              className="flex items-center justify-center flex-shrink-0"
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: item.color
                              }}
                            >
                              <Icon size={24} style={{ color: '#ffffff' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                                <span className="text-sm font-bold" style={{ color: item.color }}>{item.year}</span>
                              </div>
                              <p className="text-text-secondary">{item.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* プロジェクト & リンクセクション */}
        <section
          className="bg-background"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 右側 TriangleOrbit */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-15%',
              width: '700px',
              height: '700px',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              opacity: 0.8,
              zIndex: 0
            }}
          >
            <TriangleOrbit
              color={accentColor}
              opacity={1}
              animate={true}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Projects & Links"
              subtitle="プロジェクト・リンク"
              accentColor="#10B981"
              marginBottom="4rem"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: '2rem', maxWidth: '900px', margin: '0 auto' }}
            >
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-background-alt border-2 border-border group"
                    style={{
                      padding: '2rem',
                      textDecoration: 'none',
                      display: 'block',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: project.color
                    }}
                  >
                    {/* 背景グラデーション */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}05 0%, transparent 100%)`,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* コンテンツ */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {/* アイコン & タグ */}
                      <div
                        className="flex items-center justify-between"
                        style={{ marginBottom: '1.5rem' }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: `${project.color}20`,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Icon size={32} style={{ color: project.color }} />
                        </div>

                        <span
                          className="text-xs font-bold"
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: `${project.color}20`,
                            color: project.color,
                            borderRadius: '4px'
                          }}
                        >
                          {project.tag}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h3
                        className="text-xl font-bold text-primary group-hover:text-[var(--primary)] transition-colors"
                        style={{ marginBottom: '1rem' }}
                      >
                        {project.title}
                      </h3>

                      {/* 説明 */}
                      <p
                        className="text-sm text-text-secondary leading-relaxed"
                        style={{ marginBottom: '1.5rem' }}
                      >
                        {project.description}
                      </p>

                      {/* リンクアイコン */}
                      <div
                        className="flex items-center text-text-secondary group-hover:text-[var(--primary)] transition-colors"
                        style={{ gap: '0.5rem' }}
                      >
                        <span className="text-sm font-medium">Visit Site</span>
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 価値観セクション */}
        <section
          className="bg-background-alt"
          style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
        >
          {/* 左上 RadialLines */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-15%',
              left: '-8%',
              width: '550px',
              height: '550px',
              pointerEvents: 'none',
              opacity: 0.4,
              zIndex: 0
            }}
          >
            <RadialLines
              color="#10B981"
              opacity={1}
              animate={true}
              lineCount={20}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            <SectionTitle
              title="Values"
              subtitle="大切にしていること"
              accentColor="#10B981"
              marginBottom="4rem"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-background border-2 border-border text-center"
                    style={{ padding: '2rem' }}
                  >
                    <div
                      className="inline-flex items-center justify-center"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: `${value.color}20`,
                        marginBottom: '1.5rem'
                      }}
                    >
                      <Icon size={32} style={{ color: value.color }} />
                    </div>

                    <h4 className="text-lg font-bold text-primary" style={{ marginBottom: '1rem' }}>
                      {value.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer
        ctaText="プロジェクトを始めませんか？"
        ctaSubText="お気軽にご相談ください。最適なソリューションをご提案いたします。"
      />
    </>
  );
}
