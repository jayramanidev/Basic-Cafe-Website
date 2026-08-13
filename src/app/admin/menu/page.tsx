import { getMenuItems } from "@/actions/menu";
import AdminMenuClient from "./admin-menu-client";
import Link from "next/link";

export default async function AdminMenuPage() {
  const items = await getMenuItems();
  
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="mb-8 inline-block text-[#6b6255] hover:text-[#d4a373]">← Back to Home</Link>
        <h1 className="text-4xl font-display font-bold mb-8">Menu Admin</h1>
        <AdminMenuClient initialItems={items} />
      </div>
    </div>
  );
}
