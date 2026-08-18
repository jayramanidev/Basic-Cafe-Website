import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center font-bold text-xl text-[#FF5A5F]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83l5 5V18H7v-8.17l5-5z"/></svg>
          </div>
          <span className="font-bold text-xl text-[#FF5A5F] tracking-tight hidden md:block">airbnb</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-gray-900 font-medium">
          <Link href="#stays" className="hover:text-gray-500 transition-colors">Stays</Link>
          <Link href="#experiences" className="hover:text-gray-500 transition-colors">Experiences</Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-medium text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer transition-colors">Airbnb your home</span>
          <button className="flex items-center gap-2 border border-gray-300 rounded-full pl-3 pr-1 py-1 hover:shadow-sm transition-shadow bg-white text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
