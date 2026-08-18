import Image from 'next/image';

const PROPERTIES = [
  {
    id: 1,
    title: "Cabot, Vermont",
    distance: "140 miles away",
    dates: "Sep 22 - 27",
    price: "$210",
    rating: "4.95",
    guestFavorite: true,
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Rhinebeck, New York",
    distance: "98 miles away",
    dates: "Oct 1 - 6",
    price: "$450",
    rating: "5.0",
    guestFavorite: false,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "East Hampton, New York",
    distance: "102 miles away",
    dates: "Nov 12 - 17",
    price: "$325",
    rating: "4.89",
    guestFavorite: true,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Lake Placid, New York",
    distance: "230 miles away",
    dates: "Dec 5 - 10",
    price: "$180",
    rating: "4.75",
    guestFavorite: false,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export function PropertyGrid() {
  return (
    <section className="py-8 bg-white" id="stays">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="flex flex-col group cursor-pointer">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
                {property.guestFavorite && (
                  <div className="absolute top-3 left-3 z-10 bg-white border border-gray-200 px-2 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    Guest favorite
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10 text-white hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 text-sm truncate">{property.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-900 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>{property.rating}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{property.distance}</p>
              <p className="text-gray-500 text-sm">{property.dates}</p>
              <p className="text-gray-900 text-sm mt-1">
                <span className="font-semibold">{property.price}</span> night
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
