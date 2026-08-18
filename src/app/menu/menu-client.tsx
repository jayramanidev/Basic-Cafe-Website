"use client";

import { useState } from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { motion } from "framer-motion";
import Link from "next/link";
import { MenuItem } from "@prisma/client";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

const getFallbackImage = (category: string | null) => {
  if (!category) return "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop";
  const cat = category.toLowerCase();
  if (cat.includes("chaat") || cat.includes("snack")) return "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop";
  if (cat.includes("beverage") || cat.includes("drink") || cat.includes("coffee") || cat.includes("tea")) return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop";
  if (cat.includes("south indian") || cat.includes("dosa")) return "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000&auto=format&fit=crop";
  if (cat.includes("quick bite") || cat.includes("fast food")) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop";
  if (cat.includes("dessert") || cat.includes("sweet")) return "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop";
}

export default function MenuClient({ menuItems }: { menuItems: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const addItem = useCartStore((state) => state.addItem);

  const categories = [{ id: "all", name: "All" }, ...Array.from(new Set(menuItems.map(i => i.category).filter((c): c is string => c !== null))).map(c => ({ id: c, name: c }))];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6b6255] hover:text-[#d4a373] transition-colors font-accent text-sm tracking-widest uppercase">
          ← Back to Home
        </Link>
      </div>

      <div className="relative w-full h-[40vh] md:h-[50vh] mb-12">
        <Image 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop"
          alt="Cafe Menu Hero"
          fill
          className="object-cover brightness-[0.65]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 tracking-tight drop-shadow-lg"
          >
            Our <span className="text-[#d4a373] italic">Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl font-light tracking-wide max-w-lg drop-shadow-md"
          >
            Handpicked flavors, crafted with love.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 font-accent text-sm tracking-wider ${
                activeCategory === cat.id
                  ? "bg-[#d4a373] border-[#d4a373] text-white font-semibold"
                  : "bg-transparent border-[#6b6255]/30 hover:border-[#d4a373] text-[#4a3f35]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={item.id}
              className="relative w-full flex justify-center"
            >
              {/* Desktop version - Direction Aware Hover */}
              <div className="hidden md:block w-full">
                <DirectionAwareHover imageUrl={item.image || getFallbackImage(item.category)}>
                  <div className="flex flex-col justify-end h-full">
                    <p className="font-display font-bold text-xl drop-shadow-md tracking-tight text-white">{item.name}</p>
                    <p className="font-light text-sm text-neutral-200 mt-2 line-clamp-2 drop-shadow leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-display font-bold text-[#d4a373] text-lg">₹{item.price}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image
                          });
                        }}
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 font-accent tracking-wider uppercase text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </DirectionAwareHover>
              </div>

              {/* Mobile version - Static Card */}
              <div className="block md:hidden w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d4a373]/20 flex flex-col">
                <div className="relative h-56 w-full shrink-0">
                  <Image 
                    src={item.image || getFallbackImage(item.category)} 
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#4a3f35] leading-tight">{item.name}</h3>
                    <p className="font-light text-sm text-[#6b6255] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                    <p className="font-display font-bold text-[#d4a373] text-xl">₹{item.price}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image: item.image
                        });
                      }}
                      className="bg-[#4a3f35] hover:bg-[#d4a373] text-[#fdfbf7] px-5 py-2.5 rounded-full text-xs font-semibold transition-colors duration-300 font-accent tracking-wider uppercase"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-[#6b6255]">
            <p className="text-xl">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
