// app/page.tsx
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import HeroSection from '@/src/components/sections/HeroSection';
import AboutSection from '@/src/components/sections/AboutSection';
import ServiceSection from '@/src/components/sections/ServiceSection';
import WorksSection from '@/src/components/sections/WorksSection';
import BlogSection from '@/src/components/sections/BlogSection';
import PriceSection from '@/src/components/sections/PriceSection';
import ContactSection from '@/src/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceSection />
        <WorksSection />
        <BlogSection/>
        <PriceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
