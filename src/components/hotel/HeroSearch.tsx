export function HeroSearch() {
  return (
    <section className="pt-28 pb-6 bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Search Bar Pill */}
        <div className="w-full max-w-3xl bg-white rounded-full shadow-md border border-gray-200 p-2 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-8">
          <div className="flex-1 px-6 py-2 w-full text-left hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <p className="text-xs font-bold text-gray-900 tracking-wide">Where</p>
            <input type="text" placeholder="Search destinations" className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500" />
          </div>
          <div className="flex-1 px-6 py-2 w-full text-left hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <p className="text-xs font-bold text-gray-900 tracking-wide">Check in</p>
            <p className="text-sm text-gray-500">Add dates</p>
          </div>
          <div className="flex-1 px-6 py-2 w-full text-left hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <p className="text-xs font-bold text-gray-900 tracking-wide">Check out</p>
            <p className="text-sm text-gray-500">Add dates</p>
          </div>
          <div className="flex-1 px-6 py-2 w-full text-left flex items-center justify-between hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <div>
              <p className="text-xs font-bold text-gray-900 tracking-wide">Who</p>
              <p className="text-sm text-gray-500">Add guests</p>
            </div>
            {/* Search Orb */}
            <button className="w-12 h-12 rounded-full bg-[#FF5A5F] flex items-center justify-center text-white shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-start md:justify-center gap-8 text-sm font-medium text-gray-500 overflow-x-auto w-full pb-4 scrollbar-hide">
          <div className="flex flex-col items-center gap-2 text-gray-900 border-b-2 border-gray-900 pb-2 cursor-pointer shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Cabins</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:text-gray-900 pb-2 border-b-2 border-transparent cursor-pointer shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14Z"/><path d="M12 4v18"/><path d="M2 10h20"/></svg>
            <span>Beachfront</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:text-gray-900 pb-2 border-b-2 border-transparent cursor-pointer shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20"/><path d="M12 2l10 10-10 10L2 12Z"/></svg>
            <span>Amazing pools</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:text-gray-900 pb-2 border-b-2 border-transparent cursor-pointer shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect width="18" height="18" x="3" y="4" rx="2"/><circle cx="12" cy="10" r="2"/></svg>
            <span>Rooms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
