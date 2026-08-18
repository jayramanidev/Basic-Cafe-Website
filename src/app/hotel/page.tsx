import { TopNav } from '@/components/hotel/TopNav';
import { HeroSearch } from '@/components/hotel/HeroSearch';
import { PropertyGrid } from '@/components/hotel/PropertyGrid';
import { Testimonials } from '@/components/hotel/Testimonials';
import { Footer } from '@/components/hotel/Footer';

export default function HotelLandingPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-white">
        <TopNav />
        <main>
          <HeroSearch />
          <PropertyGrid />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
}
