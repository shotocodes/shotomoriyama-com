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

export default async function Home() {

  // MDXから記事データを取得
  const allPosts = getAllPostsMetadata();
  const latestPosts = allPosts.slice(0, 3);  // 最新3件

  return (
    <>
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
