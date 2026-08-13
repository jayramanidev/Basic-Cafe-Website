import Link from "next/link";
import ContactClient from "./contact-client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6b6255] hover:text-[#d4a373] transition-colors font-accent text-sm tracking-widest uppercase">
          ← Back to Home
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-4 text-center tracking-tight">
          Contact <span className="text-[#d4a373] italic">Us</span>
        </h1>
        <p className="text-[#6b6255] text-center mb-8 text-lg font-light tracking-wide max-w-lg mx-auto">We'd love to hear from you.</p>
        
        <ContactClient />
      </div>
    </div>
  );
}
