// src/app/support/[slug]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { supportArticles } from '@/data/supportArticles';
import { use } from 'react';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function SupportArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = supportArticles[slug];


  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>

        {/* 記事ヘッダー */}
        <section style={{ padding: '4rem 0 3rem', backgroundColor: 'var(--color-background-alt)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
              {/* 戻るリンク */}
              <motion.div whileHover={{ x: -5 }} style={{ marginBottom: '2rem', display: 'inline-block' }}>
  <Link
    href="/support"
    className="inline-flex items-center hover:text-primary transition-colors"
    style={{ gap: '0.5rem', color: 'var(--color-text-secondary)' }}
  >
    <ArrowLeft size={20} />
    <span className="text-sm font-medium">記事一覧に戻る</span>
  </Link>
</motion.div>

              {/* カテゴリ & メタ情報 */}
              <div className="flex flex-wrap items-center" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <span
                  className="text-xs font-bold"
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${article.categoryColor}20`,
                    color: article.categoryColor,
                    borderRadius: '4px'
                  }}
                >
                  <Tag size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  {article.category}
                </span>

                <span className="text-xs flex items-center" style={{ gap: '0.25rem', color: 'var(--color-text-secondary)' }}>
                  <Calendar size={12} />
                  {formatDate(article.date)}
                </span>

                <span className="text-xs flex items-center" style={{ gap: '0.25rem', color: 'var(--color-text-secondary)' }}>
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              {/* タイトル */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-4xl font-bold text-primary"
                style={{ lineHeight: '1.4' }}
              >
                {article.title}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* 記事本文 */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg"
              style={{ maxWidth: '48rem', margin: '0 auto' }}
            >
              {article.content}
            </motion.article>
          </div>
        </section>

        {/* 関連記事 & CTA */}
        <section className="bg-background-alt" style={{ padding: '4rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                他の記事も読む
              </h2>

              <motion.a
  href="/support"
  className="inline-flex items-center font-bold border-2 border-primary text-primary transition-all"
  style={{ padding: '1rem 2rem', gap: '0.5rem', textDecoration: 'none' }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <span>記事一覧を見る</span>
  <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
</motion.a>
            </div>
          </div>
        </section>
      </div>

      <Footer
        ctaText="制作でお困りのことはありませんか？"
        ctaSubText="原稿や写真の準備でお困りの方も、お気軽にご相談ください。一緒に最適な方法を考えましょう。"
      />
    </>
  );
}
