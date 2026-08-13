import { HeroParallax } from "@/components/ui/hero-parallax";
import { getMenuItems } from "@/actions/menu";

export default async function Home() {
  const menuItems = await getMenuItems();
  
  // Map our menu items to the format expected by HeroParallax
  const products = menuItems.map((item: any) => ({
    title: item.name,
    link: "/menu",
    thumbnail: item.image || "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
  }));
  
  // The HeroParallax needs at least 15 items to look good based on its grid (5+5+5)
  let displayProducts = [...products];
  while (displayProducts.length > 0 && displayProducts.length < 15) {
    displayProducts = [...displayProducts, ...products].slice(0, 15);
  }

  // If no products in DB yet, provide a fallback
  if (displayProducts.length === 0) {
    displayProducts = Array(15).fill({
       title: "Delicious Coffee",
       link: "/menu",
       thumbnail: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
    });
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HeroParallax products={displayProducts} />
      
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-6xl font-display font-bold mb-4 tracking-tight">Ready to taste the <span className="italic text-[#d4a373]">magic?</span></h2>
        <p className="text-[#6b6255] mb-10 text-lg font-light tracking-wide max-w-xl mx-auto">Discover our handcrafted menu of authentic coffee and pastries, elevated to perfection.</p>
        <a href="/menu" className="inline-block bg-[#4a3f35] text-[#fdfbf7] font-semibold px-10 py-4 rounded-full hover:bg-[#d4a373] transition-all duration-300 text-base tracking-widest uppercase font-accent shadow-[0_0_30px_rgba(74,63,53,0.3)] hover:shadow-[0_0_40px_rgba(212,163,115,0.5)]">
          Explore Our Menu
        </a>
      </section>
    </main>
  );
}
