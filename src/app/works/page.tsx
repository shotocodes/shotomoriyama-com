// src/app/works/page.tsx


// src/app/works/page.tsx

// ✅ 将来追加するフィルター機能（実績5件超えたら実装）
/*
import { workCategories } from '@/data/worksData';

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('All');

  // フィルター適用
  const filteredWorks = selectedCategory === 'All'
    ? clientWorks
    : clientWorks.filter(work => work.category === selectedCategory);

  return (
    <>
      {/* カテゴリフィルターボタン * /}
      <div className="flex justify-center gap-2 mb-8">
        {workCategories.filter(cat => cat !== 'Personal Project').map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-primary text-background'
                : 'bg-background-alt text-text-secondary hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* フィルター後のカード表示 * /}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem' }}>
        {filteredWorks.map((work, index) => (
          // 既存のカードコード
        ))}
      </div>
    </>
  );
}
*/
'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SectionTitle from '@/components/ui/SectionTitle';
import WaveGraphic from '@/components/graphics/WaveGraphic';
import CircleDiagram from '@/components/graphics/CircleDiagram';
import WavePattern from '@/components/graphics/WavePattern';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';

import {
  ExternalLink,
  Calendar,
  Tag,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';

// ✅ データをインポート
import { clientWorks, personalProjects } from '@/data/worksData';

export default function WorksPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

        {/* Hero */}
        <PageHero
    title="WORKS"
    subtitle="制作実績"
    description="厳選したプロジェクトをご紹介します"
    accentColor="#4ECDC4"
    graphic={<WaveGraphic color="#4ECDC4" opacity={0.8} animate={true} />}
    useAnimatedTitle={true}
    showGrid={true}
  />

{/* モバイル用グラフィック */}
<div className="lg:hidden flex justify-center" style={{ padding: '1rem 0', pointerEvents: 'none' }}>
  <div style={{ width: '200px', height: '200px', transform: 'scale(1.5)', transformOrigin: 'center' }}>
  <WaveGraphic color="#4ECDC4" opacity={0.6} animate={true} />
  </div>
</div>

        {/* Client Work セクション */}
        <section
          className="bg-background"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 左側 CircleDiagram */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '10%',
              left: '-15%',
              width: '600px',
              height: '600px',
              pointerEvents: 'none',
              opacity: 0.3,
              zIndex: 0
            }}
          >
            <CircleDiagram
              color="#4ECDC4"
              opacity={1}
              animate={true}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            {/* ✅ タイトル - 完全センター */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <SectionTitle
                title="Client Work"
                subtitle="実績"
                accentColor="#4ECDC4"
                marginBottom="0"
              />
            </div>

            {/* ✅ 説明文 - 完全センター */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 4rem auto'
              }}
            >
              <p className="text-text-secondary leading-relaxed">
                厳選した案件のみ受注し、1件1件に全力投球。<br />
                企画・デザイン・コーディングを一貫して担当しています。
              </p>
            </motion.div>

            {/* Client Work カード */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {clientWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-background-alt border-2 border-border group hover:border-[#4ECDC4] transition-all"
                  style={{
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* 背景グラデーション */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.05) 0%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* コンテンツ */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* ヘッダー */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      {/* タイトル & バッジ */}
                      <div className="flex items-start justify-between" style={{ marginBottom: '0.75rem' }}>
                        <h3 className="text-xl font-bold text-primary">
                          {work.title}
                        </h3>
                        {work.maintenance && (
                          <span
                            className="text-xs font-bold"
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: '#10B98120',
                              color: '#10B981',
                              borderRadius: '4px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            保守契約
                          </span>
                        )}
                      </div>

                      {/* クライアント & 業種 */}
                      <p className="text-sm text-text-secondary" style={{ marginBottom: '0.5rem' }}>
                        {work.client} / {work.industry}
                      </p>

                      {/* タグ */}
                      <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                        {work.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-text-secondary"
                            style={{
                              padding: '0.25rem 0.75rem',
                              border: '1px solid var(--color-border)',
                              borderRadius: '4px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 説明 */}
                    <p className="text-sm text-text-secondary leading-relaxed" style={{ marginBottom: '1.5rem' }}>
                      {work.description}
                    </p>

                    {/* メタ情報 */}
                    <div
                      className="flex flex-wrap items-center text-xs text-text-secondary"
                      style={{ gap: '1rem', marginBottom: '1.5rem' }}
                    >
                      <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <Calendar size={14} />
                        <span>{work.year}</span>
                      </div>
                      <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <Clock size={14} />
                        <span>{work.duration}</span>
                      </div>
                      <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <Tag size={14} />
                        <span>{work.price}</span>
                      </div>
                    </div>

                    {/* ボタン */}
                    <div className="flex" style={{ gap: '1rem' }}>
                      {work.url && (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-bold text-primary hover:text-[#4ECDC4] transition-colors"
                          style={{ gap: '0.5rem' }}
                        >
                          <span>Visit Site</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        href={`/works/${work.id}`}
                        className="inline-flex items-center text-sm font-bold text-primary hover:text-[#4ECDC4] transition-colors"
                        style={{ gap: '0.5rem' }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Projects セクション */}
        <section
          className="bg-background-alt"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 右側 WavePattern */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '600px',
              height: '500px',
              pointerEvents: 'none',
              opacity: 0.2,
              zIndex: 0
            }}
          >
            <WavePattern
              color="#10B981"
              opacity={1}
              animate={true}
              waveCount={6}
              position="center"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            {/* ✅ タイトル - 完全センター */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <SectionTitle
                title="Personal Projects"
                subtitle="個人プロジェクト"
                accentColor="#10B981"
                marginBottom="0"
              />
            </div>

            {/* ✅ 説明文 - 完全センター */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 4rem auto'
              }}
            >
              <p className="text-text-secondary leading-relaxed">
                技術力・創造性を表現する個人プロジェクト。<br />
                最新技術を試しながら、学びをアウトプットしています。
              </p>
            </motion.div>

            {/* Personal Projects カード */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {personalProjects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-background border-2 border-border group hover:border-[#10B981] transition-all"
                  style={{
                    padding: '2rem',
                    textDecoration: 'none',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 背景グラデーション */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* コンテンツ */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* ヘッダー */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      {/* タイトル & バッジ */}
                      <div className="flex items-start justify-between" style={{ marginBottom: '0.75rem' }}>
                        <h3 className="text-xl font-bold text-primary">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span
                            className="text-xs font-bold"
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: project.status === 'Active' ? '#10B98120' : '#FF8C4220',
                              color: project.status === 'Active' ? '#10B981' : '#FF8C42',
                              borderRadius: '4px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {project.status === 'Active' ? '運用中' : '開発中'}
                          </span>
                        )}
                      </div>

                      {/* タグ */}
                      <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-text-secondary"
                            style={{
                              padding: '0.25rem 0.75rem',
                              border: '1px solid var(--color-border)',
                              borderRadius: '4px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 説明 */}
                    <p className="text-sm text-text-secondary leading-relaxed" style={{ marginBottom: '1rem' }}>
                      {project.description}
                    </p>

                    {/* Purpose */}
                    <p className="text-sm text-primary font-medium" style={{ marginBottom: '1rem' }}>
                      {project.purpose}
                    </p>

                    {/* Features */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p className="text-xs font-bold text-text-secondary" style={{ marginBottom: '0.5rem' }}>
                        Features:
                      </p>
                      <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-text-secondary" style={{ gap: '0.5rem' }}>
                            <CheckCircle size={14} style={{ color: '#10B981' }} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* メタ情報 */}
                    <div className="flex items-center text-xs text-text-secondary" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                      <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <Calendar size={14} />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* リンク */}
                    <div className="flex items-center text-sm font-bold text-primary group-hover:text-[#10B981] transition-colors" style={{ gap: '0.5rem' }}>
                      <span>Visit Project</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section
          className="bg-background"
          style={{
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                あなたのプロジェクトも、<br />
                こんな風に仕上げてみませんか？
              </h2>
              <p className="text-text-secondary leading-relaxed" style={{ marginBottom: '2rem' }}>
                お気軽にご相談ください。<br />
                最適なソリューションをご提案いたします。
              </p>
              <AnimatedButton href="/contact" icon={ArrowRight}>
                Contact
              </AnimatedButton>
            </motion.div>
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
