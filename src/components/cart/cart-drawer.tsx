"use client";

import { useCartStore } from "@/store/cart";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore();
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-[#4a3f35] hover:text-[#d4a373] transition-colors"
      >
        <ShoppingCart size={24} />
        {cart.getTotalItems() > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#d4a373] rounded-full">
            {cart.getTotalItems()}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-[101] w-full max-w-md h-[100dvh] bg-[#fdfbf7] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#d4a373]/20 bg-white">
          <h2 className="text-2xl font-display font-bold text-[#4a3f35]">Your Order</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-[#6b6255] hover:text-[#d4a373] transition-colors rounded-full hover:bg-[#fdfbf7]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingCart size={64} className="text-[#d4a373]/30" />
              <p className="text-[#6b6255] font-accent text-sm tracking-widest uppercase">Your cart is empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 bg-[#d4a373] text-white rounded-full font-semibold hover:bg-[#c39362] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-[#d4a373]/10 shadow-sm">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  ) : (
                    <div className="w-20 h-20 bg-[#fdfbf7] rounded-xl flex items-center justify-center border border-[#d4a373]/20">
                      <ShoppingCart size={24} className="text-[#d4a373]/50" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-[#4a3f35]">{item.name}</h3>
                    <p className="text-[#d4a373] font-semibold">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-[#fdfbf7] border border-[#d4a373]/30 text-[#4a3f35] hover:bg-[#d4a373] hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold w-4 text-center text-[#4a3f35]">{item.quantity}</span>
                      <button 
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-[#fdfbf7] border border-[#d4a373]/30 text-[#4a3f35] hover:bg-[#d4a373] hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button 
                        onClick={() => cart.removeItem(item.id)}
                        className="p-1 ml-auto text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#d4a373]/20">
            <div className="flex justify-between items-center mb-4 text-[#4a3f35]">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold text-xl">₹{cart.getTotalPrice().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push("/checkout");
              }}
              className="w-full py-4 bg-[#4a3f35] text-white rounded-xl font-bold hover:bg-[#362e26] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Proceed to Checkout <span className="text-[#d4a373]">→</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
