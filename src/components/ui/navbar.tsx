import Link from "next/link";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Our Story", href: "/our-story" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-[#d4a373]/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-2xl text-[#4a3f35]">
          Jay's <span className="text-[#d4a373] italic">Cafe</span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 items-center font-accent text-sm tracking-widest uppercase font-semibold">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[#6b6255] hover:text-[#d4a373] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}
