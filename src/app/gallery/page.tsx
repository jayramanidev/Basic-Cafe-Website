import { getGalleryImages } from "@/actions/gallery";
import Image from "next/image";
import Link from "next/link";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6b6255] hover:text-[#d4a373] transition-colors font-accent text-sm tracking-widest uppercase">
          ← Back to Home
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-4 text-center tracking-tight">
          Our <span className="text-[#d4a373] italic">Gallery</span>
        </h1>
        <p className="text-[#6b6255] text-center mb-14 text-lg font-light tracking-wide max-w-lg mx-auto">Moments captured at our cafe.</p>

        {images.length === 0 ? (
          <div className="text-center py-20 text-[#6b6255]">
            <p className="text-xl">No images in the gallery yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {images.map(image => (
              <div key={image.id} className="relative rounded-2xl overflow-hidden group mb-4">
                <Image 
                  src={image.url} 
                  alt={image.altText} 
                  width={600} 
                  height={800} 
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
