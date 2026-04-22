// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { InfoBox, HighlightBox, StepCard, TipBox ,ResetSteps } from '@/components/mdx/MdxComponents';
import SpiralLines from '@/components/graphics/SpiralLines';
import HexagonPattern from '@/components/graphics/HexagonPattern';

// 静的パス生成
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ✅ formatDateの下に追加（export default の前）
const components = {
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem', marginTop: '3rem', lineHeight: '1.4' }} {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1rem', marginTop: '2rem', lineHeight: '1.4' }} {...props} />
  ),
  h4: (props: any) => (
    <h4 className="font-bold text-primary" style={{ marginBottom: '0.75rem', marginTop: '1.5rem', fontSize: '1rem' }} {...props} />
  ),
  p: (props: any) => (
    <p className="text-text-secondary" style={{ marginBottom: '1rem', lineHeight: '1.75' }} {...props} />
  ),
  ul: (props: any) => (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }} {...props} />
  ),
  ol: (props: any) => (
    <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }} {...props} />
  ),
  li: (props: any) => (
    <li className="text-text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }} {...props} />
  ),
  strong: (props: any) => (
    <strong className="text-primary" style={{ fontWeight: 'bold' }} {...props} />
  ),
  // ✅ pre/code を分離（インラインcodeにdisplay:blockが当たらないように）
  pre: (props: any) => (
    <pre style={{ backgroundColor: '#1a1a1a', color: '#e5e7eb', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', overflowX: 'auto' }} {...props} />
  ),
  code: (props: any) => (
    <code style={{ fontSize: '0.9rem', lineHeight: '1.6' }} {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="bg-background-alt border-l-4 border-primary" style={{ padding: '1.5rem', marginBottom: '2rem', lineHeight: '1.75' }} {...props} />
  ),
  hr: (props: any) => (
    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '3rem 0' }} {...props} /> // ✅ --border → --color-border
  ),
  InfoBox,
  HighlightBox,
  StepCard,
  TipBox,
  ResetSteps,
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;


  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', position: 'relative', overflowX: 'hidden' }}>

        {/* グラフィック要素 */}
        {/* 右上 六角形（紫） */}
        <div
          className="hidden lg:block"
          style={{
            position: 'absolute',
            top: '100px',
            right: '-5%',
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            opacity: 0.15,
            zIndex: 0
          }}
        >
          <HexagonPattern
            color="#9333EA"
            opacity={1}
            animate={true}
            hexCount={8}
          />
        </div>

        {/* 左上 螺旋（ピンク） */}
        <div
          className="hidden lg:block"
          style={{
            position: 'absolute',
            top: '200px',
            left: '-3%',
            width: '250px',
            height: '250px',
            pointerEvents: 'none',
            opacity: 0.18,
            zIndex: 0
          }}
        >
          <SpiralLines
            color="#EC4899"
            opacity={1}
            animate={true}
            spiralCount={3}
          />
        </div>

        {/* 右下 螺旋（紫） */}
        <div
          className="hidden lg:block"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            pointerEvents: 'none',
            opacity: 0.12,
            zIndex: 0
          }}
        >
          <SpiralLines
            color="#9333EA"
            opacity={1}
            animate={true}
            spiralCount={2}
          />
        </div>


        {/* 記事ヘッダー */}
        <section style={{ padding: '4rem 0 3rem', backgroundColor: 'var(--color-background-alt)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
              {/* 戻るリンク */}
              <Link
  href="/blog"
  className="inline-flex items-center text-text-secondary hover:text-primary transition-colors"
  style={{ gap: '0.5rem', marginBottom: '2rem' }}
>
  <ArrowLeft size={20} />
  <span className="text-sm font-medium">記事一覧に戻る</span>
</Link>

              {/* カテゴリ & メタ情報 */}
              <div className="flex flex-wrap items-center" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <span
                  className="text-xs font-bold"
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${metadata.categoryColor}20`,
                    color: metadata.categoryColor,
                    borderRadius: '4px'
                  }}
                >
                  <Tag size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  {metadata.category}
                </span>

                <span className="text-xs flex items-center" style={{ gap: '0.25rem', color: 'var(--color-text-secondary)' }}>
                  <Calendar size={12} />
                  {formatDate(metadata.date)}
                </span>

                <span className="text-xs flex items-center" style={{ gap: '0.25rem', color: 'var(--color-text-secondary)' }}>
                  <Clock size={12} />
                  {metadata.readTime}
                </span>
              </div>

              {/* タイトル */}
              <h1
                className="text-3xl lg:text-4xl font-bold text-primary"
                style={{ lineHeight: '1.4' }}
              >
                {metadata.title}
              </h1>
            </div>
          </div>
        </section>

        {/* 記事本文 */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article
              className="prose prose-lg"
              style={{ maxWidth: '48rem', margin: '0 auto',padding: '0 1rem' }}
            >
              {/* MDXコンテンツをレンダリング（文字列を直接渡す） */}
              <MDXRemote source={content} components={components} />
            </article>
          </div>
        </section>

        {/* 関連記事 & CTA */}
        <section className="bg-background-alt" style={{ padding: '4rem 0' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                他の記事も読む
              </h2>

              <Link
  href="/blog"
  className="inline-flex items-center font-bold border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all"
  style={{ padding: '1rem 2rem', gap: '0.5rem' }}
>
  <span>記事一覧を見る</span>
  <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer
        ctaText="Web制作のご相談はこちら"
        ctaSubText="AI を活用した最新の開発手法で、あなたのビジョンを実現します。"
      />
    </>
  );
}
