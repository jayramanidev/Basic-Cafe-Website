import Link from "next/link";
import { Users, Clock, CalendarDays } from "lucide-react";

export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 border-b border-[#d4a373]/20 pb-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-[#4a3f35]">Employee Management</h1>
          </div>
          <nav className="flex flex-wrap gap-4">
            <Link href="/admin/employees" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#6b6255] hover:border-[#d4a373] hover:text-[#d4a373] font-semibold transition-colors">
              <Users size={16} /> Directory
            </Link>
            <Link href="/admin/employees/attendance" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#6b6255] hover:border-[#d4a373] hover:text-[#d4a373] font-semibold transition-colors">
              <Clock size={16} /> Attendance
            </Link>
            <Link href="/admin/employees/leaves" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#6b6255] hover:border-[#d4a373] hover:text-[#d4a373] font-semibold transition-colors">
              <CalendarDays size={16} /> Leaves
            </Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
