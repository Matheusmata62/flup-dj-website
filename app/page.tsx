import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import MusicSection from './components/MusicSection';
import PackagesSection from './components/PackagesSection';
import ResponsibilitiesSection from './components/ResponsibilitiesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Header />
      <HeroSection />
      <GallerySection />
      <MusicSection />
      <PackagesSection />
      <ResponsibilitiesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
