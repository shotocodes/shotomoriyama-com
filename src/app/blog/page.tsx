// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import HexagonPattern from '@/components/graphics/HexagonPattern';
import SpiralLines from '@/components/graphics/SpiralLines';
import WavePattern from '@/components/graphics/WavePattern';
import { getAllPostsMetadata } from '@/lib/mdx';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog - ブログ',
  description: '制作の裏側、技術情報、ライフスタイルなどを発信しています。',
};

export default async function BlogPage() {
  const allPosts = getAllPostsMetadata();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

        {/* Hero */}
        <PageHero
          title="BLOG"
          subtitle="ブログ"
          description="制作の裏側、技術情報、ライフスタイルなど"
          accentColor="#9333EA"
          useAnimatedTitle={true}
          showGrid={true}
        />

        {/* Hero用グラフィック */}
        <div style={{ position: 'relative' }}>
          <div
            className="hidden lg:block"
            style={{ position: 'absolute', top: '-680px', right: '5%', width: '500px', height: '500px', pointerEvents: 'none', zIndex: 3 }}
          >
            <HexagonPattern color="#9333EA" opacity={0.4} animate={true} hexCount={12} />
          </div>

          <div
            className="hidden lg:block animate-rotate"
            style={{ position: 'absolute', top: '-600px', right: '18%', width: '700px', height: '700px', pointerEvents: 'none', zIndex: 2,transformOrigin: 'center center', }}
          >
            <HexagonPattern color="#EC4899" opacity={0.25} animate={false} hexCount={10} />
          </div>

          <div
            className="hidden lg:block"
            style={{ position: 'absolute', top: '-720px', right: '11%', width: '450px', height: '450px', pointerEvents: 'none', zIndex: 1 }}
          >
            <HexagonPattern color="#9333EA" opacity={0.15} animate={false} hexCount={8} />
          </div>

          <div
            className="hidden lg:block"
            style={{ position: 'absolute', top: '-600px', left: '5%', width: '250px', height: '250px', pointerEvents: 'none', opacity: 0.2, zIndex: 1 }}
          >
            <SpiralLines color="#9333EA" opacity={1} animate={true} spiralCount={2} />
          </div>

          {/* モバイル */}
          <div className="lg:hidden flex justify-center" style={{ padding: '1rem 0', pointerEvents: 'none' }}>
            <div style={{ width: '200px', height: '200px', transform: 'scale(0.6)', transformOrigin: 'center' }}>
              <HexagonPattern color="#9333EA" opacity={0.6} animate={true} hexCount={8} />
            </div>
            <div style={{ width: '200px', height: '200px', transform: 'scale(0.3)', transformOrigin: 'left' }}>
              <HexagonPattern color="#EC4899" opacity={0.6} animate={true} hexCount={10} />
            </div>
          </div>
        </div>

        {/* ブログ記事セクション */}
        <section
          className="bg-background-alt"
          style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
        >
          <div className="hidden lg:block" style={{ position: 'absolute', bottom: '5%', left: '-3%', width: '400px', height: '400px', pointerEvents: 'none', opacity: 0.25, zIndex: 0 }}>
            <SpiralLines color="#9333EA" opacity={1} animate={true} spiralCount={4} />
          </div>

          <div className="hidden lg:block" style={{ position: 'absolute', top: '15%', left: '8%', width: '200px', height: '200px', pointerEvents: 'none', opacity: 0.18, zIndex: 0 }}>
            <SpiralLines color="#EC4899" opacity={1} animate={true} spiralCount={2} />
          </div>

          <div className="hidden lg:block" style={{ position: 'absolute', top: '40%', right: '-8%', width: '500px', height: '400px', pointerEvents: 'none', opacity: 0.18, zIndex: 0 }}>
            <WavePattern color="#9333EA" opacity={1} animate={true} waveCount={6} position="center" />
          </div>

          <div className="hidden lg:block" style={{ position: 'absolute', bottom: '20%', right: '5%', width: '180px', height: '180px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
            <SpiralLines color="#EC4899" opacity={1} animate={true} spiralCount={2} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            <BlogContent posts={allPosts} />
          </div>
        </section>
      </div>

      <Footer
        ctaText="あなたのアイデアを形にしませんか？"
        ctaSubText="AI を活用した最新の制作手法で、ビジョンを実現します。まずはご相談ください。"
      />
    </>
  );
}
