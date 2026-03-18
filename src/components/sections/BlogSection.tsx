// src/components/sections/BlogSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import GridBackground from '@/components/shared/GridBackground';
import SpeedMeter from '@/components/shared/SpeedMeter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useResponsive';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
}

// ============================================================
// モバイル用ブログカード（whileInView）
// ============================================================
function MobileBlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
        <div className="rounded-lg overflow-hidden border-2 border-border bg-background">
          <div style={{ padding: '1.25rem' }}>
            {/* カテゴリ */}
            <span
              className="inline-block text-xs font-bold px-3 py-1 text-white"
              style={{
                backgroundColor: post.categoryColor,
                borderRadius: '6px',
                marginBottom: '0.75rem'
              }}
            >
              {post.category}
            </span>

            {/* タイトル */}
            <h3
              className="text-base font-bold text-primary line-clamp-2"
              style={{ marginBottom: '0.5rem' }}
            >
              {post.title}
            </h3>

            {/* 説明 */}
            <p
              className="text-xs text-text-secondary line-clamp-2"
              style={{ marginBottom: '0.75rem' }}
            >
              {post.excerpt}
            </p>

            {/* メタ情報 */}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================
// PC用ブログカード（スクロール進捗連動）
// ============================================================
function PCBlogCard({ post, index, scrollProgress }: { post: BlogPost; index: number; scrollProgress: number }) {
  const cardDelay = index * 0.08;
  const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardDelay) / 0.4));
  const translateY = 50 * (1 - cardProgress);
  const rotation = 10 * (1 - cardProgress);
  const opacity = cardProgress;

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <motion.article
        className="group cursor-pointer h-full"
        style={{
          y: translateY,
          rotate: rotation,
          opacity,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{
          y: -12,
          scale: 1.02,
          rotate: 0,
          transition: { duration: 0.2 }
        }}
      >
        <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-border h-full flex flex-col bg-background">
          <div className="p-6 lg:p-8 flex-1 flex flex-col">
            {/* カテゴリ */}
            <div style={{ marginBottom: '1rem' }}>
              <motion.span
                className="inline-block px-4 py-2 text-sm font-bold tracking-wider border-2"
                style={{
                  backgroundColor: `${post.categoryColor}99`,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: post.categoryColor,
                  transition: { duration: 0.2 }
                }}
              >
                {post.category}
              </motion.span>
            </div>

            <h3
              className="text-lg lg:text-xl font-bold text-primary line-clamp-2 group-hover:opacity-80 transition-opacity"
              style={{ marginBottom: '0.75rem' }}
            >
              {post.title}
            </h3>
            <p
              className="text-sm lg:text-base text-text-secondary line-clamp-3 flex-1"
              style={{ marginBottom: '1.25rem' }}
            >
              {post.excerpt}
            </p>

            {/* メタ情報 */}
            <div
              className="flex items-center gap-4 text-xs lg:text-sm text-text-secondary"
              style={{ marginBottom: '1rem' }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* 続きを読む */}
            <div className="flex items-center gap-2 text-sm lg:text-base font-bold text-primary group-hover:gap-3 transition-all">
              <span>続きを読む</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  // SSR対策
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      {/* ========== モバイル表示 ========== */}
      <div className="lg:hidden bg-background" style={{ padding: '4rem 1.25rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2
            className="text-4xl font-bold text-primary"
            style={{ marginBottom: '0.5rem' }}
          >
            BLOG
          </h2>
          <div
            style={{
              height: '3px',
              width: '80px',
              background: 'linear-gradient(to right, #9333EA, #EC4899)',
              marginBottom: '1rem'
            }}
          />
          <p className="text-base text-text-secondary leading-relaxed">
            技術とデザインの実践的なノウハウを発信
          </p>
          <p className="text-xs text-text-secondary opacity-70 mt-1">
            AIを活用した開発手法や最新技術情報をお届けします
          </p>
        </div>

        {/* カード縦並び */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {posts.map((post, index) => (
            <MobileBlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* CTAボタン */}
        <div className="text-center">
          <Link href="/blog">
            <motion.button
              className="inline-flex items-center gap-2 font-bold border-2 border-[#9333EA] text-[#9333EA]"
              style={{ padding: '0.875rem 2rem' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>ブログ一覧を見る</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ========== PC表示（スクロールアニメーション） ========== */}
      <div
        ref={containerRef}
        className="relative hidden lg:block mt-[60px]"
        style={{
          marginBottom: '100px',
          marginLeft: '20px',
          marginRight: '20px',
          height: '250vh'
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <section id="blog" className="relative bg-background h-full">
            <GridBackground show={false} />

            <GridButton href="/blog" text="ブログ一覧を見る" position="right" desktopOnly />

            <SpeedMeter
              scrollProgress={scrollProgress}
              position="left"
              color="#9333EA"
              gradientStart="#9333EA"
              gradientEnd="#EC4899"
            />

            <div className="h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                  <div className="flex-1 min-w-0 w-full">
                    {/* ヘッダー */}
                    <div style={{ marginBottom: '3rem' }}>
                      <p className="text-2xl text-text-secondary leading-relaxed font-light relative pb-2 inline-block">
                        技術とデザインの実践的なノウハウを発信
                        <span
                          className="absolute bottom-0 left-0 w-full h-1"
                          style={{
                            background: 'linear-gradient(to right, #9333EA, #EC4899)',
                          }}
                        />
                      </p>
                      <p
                        className="text-base text-text-secondary opacity-70"
                        style={{ marginTop: '0.5rem' }}
                      >
                        AIを活用した開発手法や最新技術情報をお届けします
                      </p>
                    </div>

                    {/* ブログカードグリッド */}
                    <div className="grid grid-cols-3 gap-6">
                      {posts.map((post, index) => (
                        <PCBlogCard
                          key={post.slug}
                          post={post}
                          index={index}
                          scrollProgress={scrollProgress}
                        />
                      ))}
                    </div>
                  </div>

                  {/* AnimatedText - PC右側 */}
                  <div className="hidden lg:block">
                    <AnimatedText
                      text="BLOG"
                      scrollProgress={scrollProgress}
                      orientation="vertical"
                      align="right"
                      accentColor="#9333EA"
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
