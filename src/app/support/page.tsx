// src/app/support/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import Parallax from '@/components/shared/Parallax';
import SectionTitle from '@/components/ui/SectionTitle';
import CircleGrid from '@/components/graphics/CircleGrid';
import RadialLines from '@/components/graphics/RadialLines';
import RippleWave from '@/components/graphics/RippleWave';
import { Mail } from 'lucide-react';
import { supportArticleMeta } from '@/data/supportArticles';
import Link from 'next/link';

export default function SupportPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // カテゴリデータ（公開中の記事が1件もないカテゴリはタブに出さない）
  const categories = [
    { id: 'all', label: 'すべて', color: '#10B981' },
    { id: 'ai', label: 'AI活用', color: '#9333EA' },
    { id: 'guide', label: '制作ガイド', color: '#FFD93D' },
    { id: 'prepare', label: '準備', color: '#FF6B9D' },
    { id: 'strategy', label: '戦略', color: '#4ECDC4' },
    { id: 'operation', label: '運用', color: '#FFB4B4' },
    { id: 'technical', label: '技術', color: '#A0C4FF' }
  ].filter(
    (cat) =>
      cat.id === 'all' ||
      supportArticleMeta.some((article) => article.category === cat.id)
  );

  // フィルタリング（データソースを変更）
  const filteredArticles = selectedCategory === 'all'
    ? supportArticleMeta // ← 変更
    : supportArticleMeta.filter(article => article.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

        {/* Hero */}
        <PageHero
          title="SUPPORT"
          subtitle="制作ノート"
          description="サイト制作をスムーズに進めるためのお役立ち情報"
          accentColor="#FF8C42"
          useAnimatedTitle={true}
          showGrid={true}
        />

        {/* Hero 用グラフィック */}
        <div style={{ position: 'relative' }}>
          {/* 右上 レイヤー1: CircleGrid（大きめ） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-680px',
              right: '3%',
              width: '700px',
              height: '700px',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
<Parallax speed={0.4} className="w-full h-full">
              <CircleGrid
                color="#FF8C42"
                opacity={0.35}
                animate={true}
                gridSize={8}
                circleSize={6}
              />
</Parallax>
            </motion.div>
          </div>

          {/* 右上 レイヤー2: RadialLines（動的） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-720px',
              right: '0%',
              width: '800px',
              height: '800px',
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                rotate: 360
              }}
              transition={{
                opacity: { duration: 2 },
                rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
              }}
            >
<Parallax speed={0.2} className="w-full h-full">
              <RadialLines
                color="#FFB347"
                opacity={0.25}
                animate={false}
                lineCount={32}
              />
</Parallax>
            </motion.div>
          </div>

          {/* 右上 レイヤー3: RippleWave（波紋） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-650px',
              right: '5%',
              width: '650px',
              height: '650px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
<Parallax speed={0.55} className="w-full h-full">
              <RippleWave
                color="#FFA559"
                opacity={0.4}
                animate={true}
                rippleCount={3}
                maxRadius={180}
                interval={2500}
                width={650}
                height={650}
              />
</Parallax>
            </motion.div>
          </div>

          {/* モバイル */}
          <div className="lg:hidden flex justify-center" style={{ padding: '1rem 0', pointerEvents: 'none' }}>
            <div style={{ width: '200px', height: '200px', transform: 'scale(1.5)', transformOrigin: 'center' }}>
              <CircleGrid color="#FF8C42" opacity={0.6} animate={true} gridSize={6} circleSize={5} />
            </div>
          </div>
        </div>

        {/* 記事グリッドセクション */}
        <section
          className="bg-background-alt"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 左下 レイヤー1: CircleGrid（中） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '-5%',
              left: '-5%',
              width: '600px',
              height: '600px',
              pointerEvents: 'none',
              opacity: 0.3,
              zIndex: 2
            }}
          >
<Parallax speed={0.3} className="w-full h-full">
            <CircleGrid
              color="#FF8C42"
              opacity={1}
              animate={true}
              gridSize={7}
              circleSize={5}
            />
</Parallax>
          </div>

          {/* 左下 レイヤー2: RippleWave（波紋） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '-8%',
              width: '700px',
              height:"700px",
              pointerEvents: 'none',
              opacity: 0.35,
              zIndex: 1
            }}
          >
<Parallax speed={-0.2} className="w-full h-full">
            <RippleWave
              color="#FFB347"
              opacity={1}
              animate={true}
              rippleCount={4}
              maxRadius={200}
              interval={3000}
              width={700}
              height={700}
            />
</Parallax>
          </div>

          {/* 右上 レイヤー3: RadialLines（大きく） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-8%',
              width: '800px',
              height: '800px',
              pointerEvents: 'none',
              opacity: 0.2,
              zIndex: 0
            }}
          >
            <motion.div
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <RadialLines
                color="#FFA559"
                opacity={1}
                animate={false}
                lineCount={28}
              />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            <SectionTitle
              title="Articles"
              subtitle="記事一覧"
              accentColor="#FF8C42"
              marginBottom="2rem"
            />

            {/* カテゴリフィルター */}
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: '1rem', marginBottom: '3rem' }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="font-bold transition-all"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    border: '2px solid',
                    borderColor: selectedCategory === cat.id ? cat.color : 'var(--color-border)',
                    backgroundColor: selectedCategory === cat.id ? cat.color : 'transparent',
                    color: selectedCategory === cat.id ? '#ffffff' : 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* 記事グリッド */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}
              >
                {filteredArticles.map((article, index) => {
                const Icon = article.icon;
                const isHovered = hoveredCard === index;

                return (
                  <Link
                    key={index}
                    href={`/support/${article.slug}`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group"
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                    <motion.div
                      className="bg-background border-2 border-border relative overflow-hidden"
                      style={{
                        padding: '2rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{
                        scale: 1.03,
                        borderColor: article.color
                      }}
                    >
                      {/* 背景グラデーション */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0.05 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `linear-gradient(135deg, ${article.color} 0%, transparent 100%)`,
                          pointerEvents: 'none'
                        }}
                      />

                      {/* コンテンツ */}
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* アイコン + カテゴリ */}
                        <div
                          className="flex items-center justify-between"
                          style={{ marginBottom: '1.5rem' }}
                        >
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              backgroundColor: `${article.color}20`,
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Icon size={36} style={{ color: article.color }} />
                          </div>

                          <span
                            className="text-xs font-bold"
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: `${article.color}20`,
                              color: article.color,
                              borderRadius: '4px'
                            }}
                          >
                            {article.categoryLabel}
                          </span>
                        </div>

                        {/* タイトル */}
                        <h3
                          className="text-xl font-bold text-primary group-hover:text-primary transition-colors"
                          style={{ marginBottom: '1rem' }}
                        >
                          {article.title}
                        </h3>

                        {/* 説明 */}
                        <p
                          className="text-sm text-text-secondary leading-relaxed"
                          style={{ marginBottom: '1.5rem' }}
                        >
                          {article.description}
                        </p>

                        {/* 読むリンク */}
                        <div
                          className="flex items-center text-text-secondary group-hover:text-primary transition-colors"
                          style={{ gap: '0.5rem' }}
                        >
                          <span className="text-sm font-medium">記事を読む</span>
                          <motion.span
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                      </motion.div>
                      </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
          </div>
        </section>

        {/* 簡易連絡セクション */}
<section
  className="bg-background"
  style={{
    padding: '4rem 0',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div
    className="container mx-auto px-4 sm:px-6 lg:px-8"
    style={{ position: 'relative', zIndex: 1 }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
      style={{ maxWidth: '48rem', margin: '0 auto' }}
    >
      <h2
  className="text-3xl lg:text-4xl font-bold text-primary"
  style={{ marginBottom: '1.5rem' }}
>
  LINEやメールでお気軽にご連絡ください
</h2>
<p
  className="text-text-secondary"
  style={{ marginBottom: '3rem' }}
>
  サイトに関してのご不明点、今のサイトでいいのか不安な方もお気軽にお問い合わせください
</p>

      <div
        className="flex flex-col sm:flex-row justify-center"
        style={{ gap: '1.5rem' }}
      >
        {/* LINE */}
        <motion.a
          href="https://line.me/ti/p/shoto0720"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-bold text-lg border-2 transition-all"
          style={{
            padding: '1rem 2rem',
            gap: '0.75rem',
            borderColor: '#06C755',
            color: '#06C755',
            background: 'transparent',
            textDecoration: 'none'
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: '#06C755',
            color: '#ffffff'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          <span>LINE で相談</span>
        </motion.a>

{/* メール */}
<motion.a
  href="mailto:0sdm0.moriyama@gmail.com"
  className="inline-flex items-center font-bold text-lg border-2 transition-all"
  style={{
    padding: '1rem 2rem',
    gap: '0.75rem',
    textDecoration: 'none',
    borderColor: '#64748b',
    color: '#64748b',
    backgroundColor: 'transparent'
  }}
  whileHover={{
    scale: 1.05,
    backgroundColor: '#64748b',
    color: '#ffffff'
  }}
  whileTap={{ scale: 0.95 }}
>
  <Mail size={24} />
  <span>メールで相談</span>
</motion.a>
      </div>

      {/* メールアドレス表示 */}
      <p
        className="text-sm text-text-secondary"
        style={{ marginTop: '2rem' }}
      >
        0sdm0.moriyama@gmail.com
      </p>
    </motion.div>
  </div>
</section>
      </div>

      <Footer
        ctaText="制作のご相談はこちら"
        ctaSubText="サポート記事で解決しなかった疑問も、お気軽にお問い合わせください。"
      />
    </>
  );
}
