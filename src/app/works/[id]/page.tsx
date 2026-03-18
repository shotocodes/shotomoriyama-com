// src/app/works/[id]/page.tsx
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { clientWorks, personalProjects } from '@/data/worksData';
import WorkDetailContent from './WorkDetailContent';

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
