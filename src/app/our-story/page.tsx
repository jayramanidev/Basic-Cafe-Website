import Link from "next/link";
import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6b6255] hover:text-[#d4a373] transition-colors font-accent text-sm tracking-widest uppercase">
          ← Back to Home
        </Link>
      </div>
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-10 text-center tracking-tight">
          Our <span className="text-[#d4a373] italic">Story</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" 
              alt="Cafe Interior" 
              width={600} 
              height={800} 
              className="rounded-2xl shadow-xl object-cover h-[500px]" 
            />
          </div>
          <div className="space-y-6 text-[#6b6255] leading-relaxed text-lg font-light">
            <p>
              It started with a simple passion for exceptional coffee and a love for the community. We opened our doors with a mission to create a warm, inviting space where people could connect over handcrafted beverages and delicious pastries.
            </p>
            <p>
              Every bean is ethically sourced, every pastry is baked fresh daily, and every cup is poured with dedication. We believe that a great cafe is more than just a place to grab a drink—it's a sanctuary in the bustling city.
            </p>
            <p>
              Join us in celebrating the simple joys of life. Welcome to our family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
