export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-300">
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Support</h4>
            <ul className="space-y-3 text-sm text-gray-900">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Hosting</h4>
            <ul className="space-y-3 text-sm text-gray-900">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Airbnb</h4>
            <ul className="space-y-3 text-sm text-gray-900">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Gift cards</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-900">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button className="flex items-center gap-1 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              English (US)
            </button>
            <button className="flex items-center gap-1 hover:underline">
              <span>$</span> USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
