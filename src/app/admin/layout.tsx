import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, FolderTree, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#d4a373]/20 flex flex-col p-6 shadow-sm">
        <h2 className="text-xl font-display font-bold text-[#4a3f35] mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link 
            href="/admin/orders" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdfbf7] text-[#6b6255] hover:text-[#d4a373] transition-colors font-semibold"
          >
            <LayoutDashboard size={20} />
            Orders
          </Link>
          <Link 
            href="/admin/categories" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdfbf7] text-[#6b6255] hover:text-[#d4a373] transition-colors font-semibold"
          >
            <FolderTree size={20} />
            Categories
          </Link>
          <Link 
            href="/admin/menu" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdfbf7] text-[#6b6255] hover:text-[#d4a373] transition-colors font-semibold"
          >
            <UtensilsCrossed size={20} />
            Menu Items
          </Link>
          <Link 
            href="/admin/employees" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdfbf7] text-[#6b6255] hover:text-[#d4a373] transition-colors font-semibold mt-4 border-t pt-4 border-[#d4a373]/10"
          >
            <Users size={20} />
            Employees (EMS)
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#fdfbf7]">
        {children}
      </main>
    </div>
  );
}
