// app/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServiceSection from '@/components/sections/ServiceSection';
import WorksSection from '@/components/sections/WorksSection';
import SupportSection from '@/components/sections/SupportSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import { getAllPostsMetadata } from '@/lib/mdx';
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/constants/site';

// 検索エンジン向けの構造化データ（Person + ProfessionalService）
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: '森山翔登',
      url: SITE_URL,
      jobTitle: 'Webデザイナー・エンジニア',
      description: SITE_DESCRIPTION,
      sameAs: ['https://x.com/SOAR_C72'],
    },
    {
      '@type': 'ProfessionalService',
      name: '森山翔登 | Web制作・デザイン',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      areaServed: 'JP',
      founder: { '@type': 'Person', name: '森山翔登' },
    },
  ],
};

export default async function Home() {

  // MDXから記事データを取得
  const allPosts = getAllPostsMetadata();
  const latestPosts = allPosts.slice(0, 3);  // 最新3件

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <ServiceSection />
        <WorksSection />
        <SupportSection />
        <BlogSection posts={latestPosts} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
