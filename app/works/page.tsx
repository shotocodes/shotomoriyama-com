// src/app/works/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Globe, Palette, ShoppingCart, ExternalLink, Tag } from 'lucide-react';

type Category = 'all' | 'website' | 'design' | 'ecommerce';

interface Work {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  year: string;
}

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // 実績データ (現在は空 - Coming Soon表示用)
  const works: Work[] = [
    // 将来的にここに実績を追加
    // {
    //   id: '1',
    //   title: 'コーポレートサイト制作',
    //   category: 'website',
    //   description: '企業のブランディングを強化するWebサイト',
    //   image: '/works/example1.jpg',
    //   tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    //   url: 'https://example.com',
    //   year: '2024'
    // },
  ];

  const categories = [
    { id: 'all' as Category, name: '全て', icon: null, color: '#4ECDC4' },
    { id: 'website' as Category, name: 'Webサイト', icon: Globe, color: '#0066FF' },
    { id: 'design' as Category, name: 'デザイン', icon: Palette, color: '#9333EA' },
    { id: 'ecommerce' as Category, name: 'ECサイト', icon: ShoppingCart, color: '#FF8C42' },
  ];

  const filteredWorks = selectedCategory === 'all'
    ? works
    : works.filter(work => work.category === selectedCategory);

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
                WORKS
              </h1>
              <p className="text-2xl lg:text-3xl text-text-secondary mb-6">
                制作実績
              </p>
              <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
                これまでに手がけたプロジェクトをご紹介します
              </p>
            </motion.div>
          </div>
        </section>

        {/* フィルター */}
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
                        : 'border-2 border-border text-primary hover:border-[#4ECDC4]'
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: category.color }
                        : {}
                    }
                  >
                    {Icon && <Icon size={20} />}
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 実績一覧 または Coming Soon */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {works.length === 0 ? (
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
                    style={{ backgroundColor: 'rgba(78, 205, 196, 0.2)' }}
                  >
                    <Globe size={64} style={{ color: '#4ECDC4' }} />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    現在、制作実績ページを準備中です。
                    <br />
                    公開までもうしばらくお待ちください。
                  </p>
                  <p className="text-sm text-text-secondary mb-8">
                    実績についてのお問い合わせは、お気軽にご連絡ください
                  </p>
                  <Link href="/contact">
                    <button
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #4ECDC4, #3AB5AD)'
                      }}
                    >
                      <span>お問い合わせ</span>
                      <ExternalLink size={20} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              // 実績カード表示 (実績がある場合)
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredWorks.map((work, index) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/works/${work.id}`}>
                      <div className="group bg-background-alt rounded-lg overflow-hidden border-2 border-border hover:border-[#4ECDC4] transition-all hover:scale-105 cursor-pointer">
                        {/* サムネイル */}
                        <div className="relative h-64 bg-border overflow-hidden">
                          {work.image ? (
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Globe size={64} className="text-text-secondary opacity-30" />
                            </div>
                          )}
                          {/* カテゴリーバッジ */}
                          <div className="absolute top-4 left-4">
                            <span
                              className="px-3 py-1 rounded-full text-white text-xs font-bold"
                              style={{
                                backgroundColor: categories.find(c => c.id === work.category)?.color
                              }}
                            >
                              {categories.find(c => c.id === work.category)?.name}
                            </span>
                          </div>
                        </div>

                        {/* コンテンツ */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-primary group-hover:text-[#4ECDC4] transition-colors">
                              {work.title}
                            </h3>
                            <span className="text-sm text-text-secondary">
                              {work.year}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-4 leading-relaxed">
                            {work.description}
                          </p>

                          {/* タグ */}
                          <div className="flex flex-wrap gap-2">
                            {work.tags.map((tag, i) => (
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
        {works.length > 0 && (
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
                  あなたのプロジェクトを
                  <br />
                  実現しませんか？
                </h2>
                <p className="text-text-secondary mb-12">
                  お気軽にご相談ください。
                  <br />
                  丁寧にヒアリングし、最適なご提案をいたします。
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/order">
                    <button
                      className="px-12 py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #4ECDC4, #3AB5AD)'
                      }}
                    >
                      かんたん見積もり
                    </button>
                  </Link>

                  <Link href="/contact">
                    <button
                      className="px-12 py-4 rounded-lg font-bold transition-all hover:scale-105 border-2"
                      style={{
                        borderColor: '#4ECDC4',
                        color: '#4ECDC4'
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
