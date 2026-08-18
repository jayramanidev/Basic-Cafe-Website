"use client";

import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Link href="/" className="font-display font-bold text-2xl text-[#4a3f35] z-50">
          Jay's <span className="text-[#d4a373] italic">Cafe</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 items-center font-accent text-sm tracking-widest uppercase font-semibold">
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

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <CartDrawer />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#4a3f35] hover:text-[#d4a373] transition-colors p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-[#fdfbf7] border-b border-[#d4a373]/20 shadow-lg md:hidden flex flex-col items-center py-8 gap-6 z-40"
          >
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#6b6255] hover:text-[#d4a373] transition-colors font-accent text-lg tracking-widest uppercase font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
