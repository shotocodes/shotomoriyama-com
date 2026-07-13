// src/app/works/[id]/WorkDetailContent.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // ✅ <img> → <Image>
import AnimatedButton from '@/components/ui/AnimatedButton';
import BlueprintLens from '@/components/shared/BlueprintLens';
import {
  ArrowLeft,
  ArrowRight, // ✅ 追加
  ExternalLink,
  Calendar,
  Clock,
  Tag,
  CheckCircle,
  Quote,
} from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  position: string;
}

interface Work {
  id: string;
  title: string;
  image: string;
  url?: string;
  year: string;
  tags: string[];
  description: string;
  // クライアントワーク
  client?: string;
  industry?: string;
  duration?: string;
  price?: string;
  maintenance?: boolean;
  challenge?: string;
  solution?: string;
  result?: string;
  testimonial?: Testimonial;
  // 個人プロジェクト
  purpose?: string;
  features?: string[];
  articleUrl?: string;
  codeSnippet?: string;
}

interface WorkDetailContentProps {
  work: Work;
  isClientWork: boolean;
}

export default function WorkDetailContent({ work, isClientWork }: WorkDetailContentProps) {
  return (
    <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>

      {/* 戻るボタン */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '2rem' }}>
        <AnimatedButton href="/works" icon={ArrowLeft}>
          Back to Works
        </AnimatedButton>
      </div>

      {/* メイン画像 */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1200px', margin: '0 auto' }}
          >
            {/* カーソルをかざすと「裏側」が透けるレンズ
                クライアントワーク: 設計図 / 個人プロジェクト: ソースコード */}
            <BlueprintLens
              meta={{ title: work.title, year: work.year, tags: work.tags }}
              variant={isClientWork ? 'blueprint' : 'code'}
              codeSnippet={work.codeSnippet}
              className="overflow-hidden"
              radius={120}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '8px',
                  border: '2px solid var(--color-border)',
                }}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            </BlueprintLens>
          </motion.div>
        </div>
      </section>

      {/* タイトル & 基本情報 */}
      <section className="bg-background-alt" style={{ padding: '4rem 0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* タイトル */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ marginBottom: '2rem' }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-primary" style={{ marginBottom: '1rem' }}>
                {work.title}
              </h1>
              {isClientWork && work.client && (
                <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                  {work.client} / {work.industry}
                </p>
              )}
            </motion.div>

            {/* メタ情報 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center"
              style={{ gap: '2rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}
            >
              <div className="flex items-center" style={{ gap: '0.5rem' }}>
                <Calendar size={20} />
                <span>{work.year}</span>
              </div>
              {isClientWork && work.duration && (
                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                  <Clock size={20} />
                  <span>{work.duration}</span>
                </div>
              )}
              {isClientWork && work.price && (
                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                  <Tag size={20} />
                  <span>{work.price}</span>
                </div>
              )}
              {isClientWork && work.maintenance && (
                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#10B981' }} />
                  <span>保守契約</span>
                </div>
              )}
            </motion.div>

            {/* タグ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap"
              style={{ gap: '0.75rem', marginBottom: '3rem' }}
            >
              {work.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm font-medium"
                  style={{
                    padding: '0.5rem 1rem',
                    border: '2px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* 説明 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ marginBottom: '3rem', color: 'var(--color-text-secondary)' }}
              >
                {work.description}
              </p>
            </motion.div>

            {/* Visit Site / 記事を読む ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap"
              style={{ gap: '1rem', marginBottom: '3rem' }}
            >
              {work.url && (
                <a href={work.url} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton icon={ExternalLink}>
                    Visit Site
                  </AnimatedButton>
                </a>
              )}
              {work.articleUrl && (
                <a href={work.articleUrl}>
                  <AnimatedButton icon={ArrowRight}>
                    開発記事を読む
                  </AnimatedButton>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* クライアントワークのみ: Challenge / Solution / Result */}
      {isClientWork && work.challenge && (
        <section className="bg-background" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>課題</h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{work.challenge}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ marginBottom: '4rem' }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>解決策</h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{work.solution}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>成果</h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{work.result}</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 個人プロジェクトのみ: Purpose / Features */}
      {!isClientWork && work.purpose && (
        <section className="bg-background" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>目的</h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{work.purpose}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>主な機能</h2>
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  {work.features?.map((feature, i) => (
                    <div key={i} className="flex items-start" style={{ gap: '1rem' }}>
                      <CheckCircle size={24} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }} />
                      <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* クライアントワークのみ: クライアントの声 */}
      {isClientWork && work.testimonial && (
        <section className="bg-background-alt" style={{ padding: '5rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-background border-2 border-border"
                style={{ padding: '3rem', borderRadius: '8px', position: 'relative' }}
              >
                <Quote
                  size={48}
                  style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#4ECDC4', opacity: 0.2 }}
                />
                <h2 className="text-2xl lg:text-3xl font-bold text-primary" style={{ marginBottom: '2rem' }}>
                  クライアントの声
                </h2>
                <p className="text-lg leading-relaxed" style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                  {work.testimonial.text}
                </p>
                <div>
                  <p className="text-base font-bold text-primary">{work.testimonial.author}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{work.testimonial.position}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-background" style={{ padding: '5rem 0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
              同じように仕上げてみませんか？
            </h2>
            <p className="leading-relaxed" style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
              お気軽にご相談ください。<br />
              最適なソリューションをご提案いたします。
            </p>
            {/* ✅ ArrowLeft → ArrowRight */}
            <AnimatedButton href="/contact" icon={ArrowRight}>
              Contact
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
