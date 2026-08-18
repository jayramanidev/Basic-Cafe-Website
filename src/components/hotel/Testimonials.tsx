import Image from 'next/image';

export function Testimonials() {
  return (
    <section className="py-16 bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">What guests are saying about homes in the United States</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Sarah" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Sarah</p>
                <p className="text-sm text-gray-500">October 2023</p>
              </div>
            </div>
            <p className="text-gray-900 leading-relaxed">
              "We had an amazing time! The host was super responsive and the cabin was exactly as pictured. The view from the deck in the morning with a cup of coffee was unbelievable."
            </p>
          </div>
          
          <div className="flex flex-col border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Michael" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Michael</p>
                <p className="text-sm text-gray-500">September 2023</p>
              </div>
            </div>
            <p className="text-gray-900 leading-relaxed">
              "Clean, modern, and perfectly located. We could walk to all the best restaurants downtown. The check-in process was seamless. Highly recommend this stay!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
