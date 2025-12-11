// src/components/sections/BlogSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/shared/AnimatedText';
import GridButton from '@/components/shared/GridButton';
import GridBackground from '@/components/shared/GridBackground';
import SpeedMeter from '@/components/shared/SpeedMeter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const posts = [
  {
    id: 1,
    title: "AIを活用したWeb制作の実践テクニック",
    excerpt: "Claude AIとCursorを使った効率的な開発フローについて解説します。実際のプロジェクトでの活用事例も紹介。",
    category: "開発",
    date: "2024.11.20",
    readTime: "5分",
    image: "https://placehold.co/600x400/0066FF/FFFFFF?text=Blog+1",
  },
  {
    id: 2,
    title: "Next.js 14 + TypeScriptで作る高速Webサイト",
    excerpt: "最新のNext.js App Routerを使ったパフォーマンス最適化の手法を詳しく解説します。",
    category: "技術",
    date: "2024.11.15",
    readTime: "8分",
    image: "https://placehold.co/600x400/4ECDC4/FFFFFF?text=Blog+2",
  },
  {
    id: 3,
    title: "デザインシステムの構築と運用",
    excerpt: "Tailwind CSSとFramer Motionを使った再利用可能なコンポーネント設計について。",
    category: "デザイン",
    date: "2024.11.10",
    readTime: "6分",
    image: "https://placehold.co/600x400/FF6B6B/FFFFFF?text=Blog+3",
  },
  ];

  // カテゴリ別カラー取得関数
const getCategoryColor = (category: string) => {
  const colors = {
    '開発': 'rgba(0, 102, 255, 0.9)',
    '技術': 'rgba(78, 205, 196, 0.9)',
    'デザイン': 'rgba(255, 107, 107, 0.9)',
    'ビジネス': 'rgba(255, 217, 61, 0.9)',
    'キャリア': 'rgba(168, 218, 220, 0.9)',
  };
  return colors[category as keyof typeof colors] || 'rgba(0, 102, 255, 0.9)';
};

// ホバー時の色（少し濃く）
const getCategoryHoverColor = (category: string) => {
  const colors = {
    '開発': 'rgba(0, 102, 255, 1)',
    '技術': 'rgba(78, 205, 196, 1)',
    'デザイン': 'rgba(255, 107, 107, 1)',
    'ビジネス': 'rgba(255, 217, 61, 1)',
    'キャリア': 'rgba(168, 218, 220, 1)',
  };
  return colors[category as keyof typeof colors] || 'rgba(0, 102, 255, 1)';
};

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

  return (
    <div
      ref={containerRef}
      className="relative mt-[60px] md:mt-[30px] lg:mt-[60px]"
      style={{
        marginBottom: '100px',
        marginLeft: '20px',
        marginRight: '20px',
        height: '250vh'
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          id="blog"
          className="relative bg-background h-full"
        >
        {/* 背景グリッド - なし */}
          <GridBackground show={false} />

          {/* ボタン - スマホ用 */}
          <GridButton
            href="/blog"
            text="VIEW"
            position="right"
            mobileOnly
          />

          {/* ボタン - PC用 */}
          <GridButton
            href="/blog"
            text="ブログ一覧を見る"
            position="right"
            desktopOnly
          />

          {/* スピードメーター - 左下 */}
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

                {/* AnimatedText - スマホ・タブレット */}
                <div className="lg:hidden mb-8">
                  <AnimatedText
                    text="BLOG"
                    scrollProgress={scrollProgress}
                    orientation="horizontal"
                    align="right"
                    accentColor="#9333EA"
                  />
                </div>

                {/* 中央 */}
                <div className="flex-1 min-w-0 w-full">
                  {/* ヘッダー */}
                  <div style={{ marginBottom: '6rem' }}>
                    <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-light !mb-3 relative !pb-2 inline-block">
                      技術とデザインの実践的なノウハウを発信
                      <span
                        className="absolute bottom-0 left-0 w-full h-1"
                        style={{
                          background: 'linear-gradient(to right, #9333EA, #EC4899)',
                        }}
                      />
                    </p>
                    <p className="text-sm lg:text-base text-text-secondary opacity-70 font-light">
                      AIを活用した開発手法やフリーランスのリアルな情報をお届けします
                    </p>
                  </div>

                  {/* ブログカードグリッド */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => {
                      // スクロール進捗に応じて出現
                      const cardDelay = index * 0.08;
                      const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardDelay) / 0.4));

                      // 下から上昇
                      const translateY = 50 * (1 - cardProgress);

                      // 回転しながら出現 (Worksより控えめ)
                      const rotation = 10 * (1 - cardProgress);

                      // 透明度
                      const opacity = cardProgress;

                      return (
                        <motion.article
                          key={post.id}
                          className="group cursor-pointer"
                          style={{
                            y: translateY,
                            rotate: rotation,
                            opacity: opacity,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: 'easeOut'
                          }}
                          whileHover={{
                            y: -12,
                            scale: 1.02,
                            rotate: 0,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-border h-full flex flex-col">
                            {/* 画像 */}
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />

                              {/* カテゴリタグ */}
                              <div className="absolute top-4 left-4">
                                <motion.span
                                  className="inline-block px-4 py-2 text-sm font-bold tracking-wider backdrop-blur-md border-2"
                                  style={{
                                    backgroundColor: getCategoryColor(post.category),
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: getCategoryHoverColor(post.category),
                                    transition: { duration: 0.2 }
                                  }}
                                >
                                  {post.category}
                                </motion.span>
                              </div>
                            </div>

                            {/* コンテンツ */}
                            <div className="p-4 bg-background flex-1 flex flex-col">
                              <h3 className="text-base font-bold text-primary mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity">
                                {post.title}
                              </h3>
                              <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
                                {post.excerpt}
                              </p>

                              {/* メタ情報 */}
                              <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>

                              {/* 続きを読む */}
                              <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                                <span>続きを読む</span>
                                <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>

                {/* AnimatedText - PC (右配置) */}
                <div className="hidden lg:block mb-8 lg:mb-0">
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
  );
}
