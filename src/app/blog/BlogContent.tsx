// src/app/blog/BlogContent.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Calendar, Tag } from 'lucide-react';

const blogCategories = [
  { id: 'all',       label: 'すべて',         color: '#0066FF' },
  { id: 'ai',        label: 'AI活用',         color: '#4ECDC4' },
  { id: 'tech',      label: '技術',           color: '#9333EA' },
  { id: 'design',    label: 'デザイン',       color: '#FF6B9D' },
  { id: 'business',  label: 'ビジネス',       color: '#10B981' },
  { id: 'lifestyle', label: 'ライフスタイル', color: '#FFB347' },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  categoryId: string;
  categoryColor: string;
  date: string;
  readTime: string;
  excerpt: string;
}

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.categoryId === selectedCategory);

  return (
    <>
      <SectionTitle
        title="Latest Posts"
        subtitle="最新記事"
        accentColor="#0066FF"
        marginBottom="2rem"
      />

      {/* カテゴリフィルター */}
      <div
        className="flex flex-wrap justify-center"
        style={{ gap: '1rem', marginBottom: '4rem' }}
      >
        {blogCategories.map((cat) => (
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
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* 記事グリッド */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}
      >
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <motion.div
              className="bg-background border-2 border-border relative overflow-hidden h-full flex flex-col"
              style={{ transition: 'all 0.3s ease' }}
              whileHover={{ scale: 1.03, borderColor: post.categoryColor }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(135deg, ${post.categoryColor} 0%, transparent 100%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* コンテンツ */}
              <div style={{ padding: '2rem', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* カテゴリ & 日付 */}
                <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                  <span
                    className="text-xs font-bold"
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: `${post.categoryColor}20`,
                      color: post.categoryColor,
                      borderRadius: '4px',
                    }}
                  >
                    <Tag size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    {post.category}
                  </span>

                  <span
                    className="text-xs flex items-center"
                    style={{ gap: '0.25rem', color: 'var(--color-text-secondary)' }}
                  >
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* タイトル */}
                <h3
                  className="text-xl font-bold text-primary group-hover:text-primary transition-colors"
                  style={{ marginBottom: '1rem', lineHeight: '1.4' }}
                >
                  {post.title}
                </h3>

                {/* 抜粋 */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ marginBottom: '1.5rem', flex: 1, color: 'var(--color-text-secondary)' }}
                >
                  {post.excerpt}
                </p>

                {/* 読むリンク */}
                <div
                  className="flex items-center justify-between"
                  style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}
                >

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center transition-colors"
                    style={{ gap: '0.5rem', textDecoration: 'none', color: 'var(--color-text-secondary)' }}
                  >
                    <span className="text-sm font-medium">記事を読む</span>
                    <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      →
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
