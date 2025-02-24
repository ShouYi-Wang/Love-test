import Navbar from '@/app/features/home/components/Navbar';
import Hero from '@/app/features/home/components/Hero';
import Features from '@/app/features/home/components/Features';
import Features2 from '@/app/features/home/components/Features2';
import Testimonials from '@/app/features/home/components/Testimonials';
import Footer from '@/app/features/home/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <Features2 />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
