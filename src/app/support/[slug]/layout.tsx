import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { supportArticleMeta } from '@/data/supportArticles';

// 公開中の記事をビルド時にプリレンダリングする
export function generateStaticParams() {
  return supportArticleMeta.map((article) => ({ slug: article.slug }));
}

// 上記以外のスラッグは 404（未知の slug でページ本体を動的描画させない）
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = supportArticleMeta.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Support - 制作ノート' };
  }

  return {
    title: `${article.title} - 制作ノート`,
    description: article.description,
  };
}

export default function SupportArticleLayout({ children }: { children: ReactNode }) {
  return children;
}
