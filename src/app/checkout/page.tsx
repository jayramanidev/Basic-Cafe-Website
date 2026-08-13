"use client";

import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/order";
import Link from "next/link";
import { ShoppingCart, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const cart = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    tableNumber: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-[#d4a373]/20">
          <CheckCircle className="w-20 h-20 text-[#d4a373] mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-[#4a3f35] mb-4">Order Placed!</h1>
          <p className="text-[#6b6255] mb-8">
            Thank you, {formData.customerName}! Your order has been sent to the kitchen. 
            We will bring it to Table {formData.tableNumber} shortly.
          </p>
          <Link href="/" className="px-8 py-3 bg-[#4a3f35] text-white rounded-full font-bold hover:bg-[#362e26] transition-colors inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <ShoppingCart size={64} className="text-[#d4a373]/30 mb-4" />
        <h1 className="text-2xl font-display font-bold text-[#4a3f35] mb-2">Your cart is empty</h1>
        <Link href="/menu" className="mt-4 px-6 py-2 bg-[#d4a373] text-white rounded-full font-semibold hover:bg-[#c39362] transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.tableNumber) return;

    setIsSubmitting(true);
    const result = await createOrder({
      customerName: formData.customerName,
      tableNumber: formData.tableNumber,
      totalAmount: cart.getTotalPrice(),
      items: cart.items.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtTime: item.price,
      }))
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      cart.clearCart();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Checkout Form */}
        <div>
          <h1 className="text-4xl font-display font-bold text-[#4a3f35] mb-8">Checkout</h1>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#d4a373]/20">
            <h2 className="text-xl font-bold text-[#4a3f35] mb-6">Dine-in Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#6b6255] mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d4a373]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a373] bg-[#fdfbf7]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#6b6255] mb-2">Table Number</label>
                <input
                  type="text"
                  required
                  value={formData.tableNumber}
                  onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d4a373]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a373] bg-[#fdfbf7]"
                  placeholder="e.g. 12"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#4a3f35] text-white rounded-xl font-bold hover:bg-[#362e26] transition-colors shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Place Order (Pay at Counter)"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[#4a3f35] mb-8 mt-2 md:mt-0">Order Summary</h2>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#d4a373]/20">
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-[#4a3f35]">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#d4a373]/20 pt-4 flex justify-between items-center text-xl text-[#4a3f35]">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#d4a373]">₹{cart.getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
