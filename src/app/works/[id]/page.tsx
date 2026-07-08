// src/app/works/[id]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { clientWorks, personalProjects } from '@/data/worksData';
import WorkDetailContent from './WorkDetailContent';

// 静的パス生成（データは静的配列なのでビルド時にプリレンダリング）
export async function generateStaticParams() {
  return [...clientWorks, ...personalProjects].map((work) => ({ id: work.id }));
}

// 実績ごとのメタデータ
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const work = [...clientWorks, ...personalProjects].find((w) => w.id === id);

  if (!work) {
    return { title: 'Works - 制作実績' };
  }

  return {
    title: `${work.title} - 制作実績`,
    description: work.description,
    openGraph: {
      title: `${work.title} - 制作実績`,
      description: work.description,
      images: work.image ? [{ url: work.image }] : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ await に変更
  const allWorks = [...clientWorks, ...personalProjects];
  const work = allWorks.find((w) => w.id === id);

  // ✅ Server ComponentなのでnotFound()が正しく使える
  if (!work) {
    notFound();
  }

  const isClientWork = clientWorks.some((w) => w.id === id);

  return (
    <>
      <Header />
      {/* ✅ アニメーション部分はClient Componentに委譲 */}
      <WorkDetailContent work={work} isClientWork={isClientWork} />
      <Footer
        ctaText="プロジェクトを始めませんか？"
        ctaSubText="お気軽にご相談ください。最適なソリューションをご提案いたします。"
      />
    </>
  );
}
