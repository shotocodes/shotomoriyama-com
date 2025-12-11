// src/app/blog/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { BookOpen, Code, Palette, Lightbulb, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

type Category = 'all' | 'tech' | 'design' | 'tips';

interface Post {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  image: string;
  tags: string[];
  date: string;
  readTime: string;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // ブログ記事データ (現在は空 - Coming Soon表示用)
  const posts: Post[] = [
    // 将来的にここに記事を追加
    // {
    //   id: '1',
    //   title: 'Next.js 14の新機能を徹底解説',
    //   category: 'tech',
    //   excerpt: 'Next.js 14で追加された新機能について詳しく解説します。',
    //   image: '/blog/nextjs14.jpg',
    //   tags: ['Next.js', 'React', 'Web開発'],
    //   date: '2024-12-01',
    //   readTime: '5分'
    // },
  ];

  const categories = [
    { id: 'all' as Category, name: '全て', icon: BookOpen, color: '#9333EA' },
    { id: 'tech' as Category, name: '技術', icon: Code, color: '#0066FF' },
    { id: 'design' as Category, name: 'デザイン', icon: Palette, color: '#FF8C42' },
    { id: 'tips' as Category, name: 'Tips', icon: Lightbulb, color: '#10B981' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        {/* ヒーローセクション */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 tracking-wider">
                BLOG
              </h1>
              <p className="text-2xl lg:text-3xl text-text-secondary mb-6">
                ブログ
              </p>
              <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
                Web制作・デザインに関する最新情報やノウハウをお届けします
              </p>
            </motion.div>
          </div>
        </section>

        {/* カテゴリーフィルター */}
        <section className="py-12 bg-background-alt">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      isSelected
                        ? 'text-white scale-105'
                        : 'border-2 border-border text-primary hover:border-[#9333EA]'
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: category.color }
                        : {}
                    }
                  >
                    <Icon size={20} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ブログ記事一覧 または Coming Soon */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              // Coming Soon
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-background-alt rounded-2xl p-16 border-2 border-border">
                  <div
                    className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <BookOpen size={64} style={{ color: '#9333EA' }} />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    現在、ブログ記事を準備中です。
                    <br />
                    Web制作やデザインに関する有益な情報を発信予定です。
                  </p>
                  <p className="text-sm text-text-secondary mb-8">
                    更新情報はSNSでお知らせします
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #9333EA, #7E22CE)'
                        }}
                      >
                        <span>お問い合わせ</span>
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                    <Link href="/works">
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 border-2"
                        style={{
                          borderColor: '#9333EA',
                          color: '#9333EA'
                        }}
                      >
                        <span>制作実績を見る</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              // 記事カード表示 (記事がある場合)
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className="group bg-background-alt rounded-lg overflow-hidden border-2 border-border hover:border-[#9333EA] transition-all hover:scale-105 cursor-pointer h-full flex flex-col">
                        {/* サムネイル */}
                        <div className="relative h-56 bg-border overflow-hidden">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen size={64} className="text-text-secondary opacity-30" />
                            </div>
                          )}
                          {/* カテゴリーバッジ */}
                          <div className="absolute top-4 left-4">
                            <span
                              className="px-3 py-1 rounded-full text-white text-xs font-bold"
                              style={{
                                backgroundColor: categories.find(c => c.id === post.category)?.color
                              }}
                            >
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                          </div>
                        </div>

                        {/* コンテンツ */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* 日付・読了時間 */}
                          <div className="flex items-center gap-4 mb-3 text-sm text-text-secondary">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* タイトル */}
                          <h3 className="text-xl font-bold text-primary group-hover:text-[#9333EA] transition-colors mb-3">
                            {post.title}
                          </h3>

                          {/* 抜粋 */}
                          <p className="text-text-secondary mb-4 leading-relaxed flex-1">
                            {post.excerpt}
                          </p>

                          {/* タグ */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="flex items-center gap-1 px-2 py-1 bg-background rounded text-xs text-text-secondary"
                              >
                                <Tag size={12} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        {posts.length > 0 && (
          <section className="py-20 bg-background-alt">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                  プロジェクトのご相談は
                  <br />
                  お気軽にどうぞ
                </h2>
                <p className="text-text-secondary mb-12">
                  Web制作・デザインに関するご相談を承ります
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/order">
                    <button
                      className="px-12 py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #9333EA, #7E22CE)'
                      }}
                    >
                      かんたん見積もり
                    </button>
                  </Link>

                  <Link href="/contact">
                    <button
                      className="px-12 py-4 rounded-lg font-bold transition-all hover:scale-105 border-2"
                      style={{
                        borderColor: '#9333EA',
                        color: '#9333EA'
                      }}
                    >
                      詳しく相談する
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
