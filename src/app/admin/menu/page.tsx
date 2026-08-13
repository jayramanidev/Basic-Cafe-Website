import { getMenuItems } from "@/actions/menu";
import { getCategories } from "@/actions/category";
import AdminMenuClient from "./admin-menu-client";
import Link from "next/link";

export default async function AdminMenuPage() {
  const items = await getMenuItems();
  const categories = await getCategories();
  
  return (
    <div className="min-h-screen bg-[#fdfbf7] p-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="mb-8 inline-block text-[#6b6255] hover:text-[#d4a373]">← Back to Home</Link>
        <h1 className="text-4xl font-display font-bold mb-8 text-[#4a3f35]">Menu Admin</h1>
        <AdminMenuClient initialItems={items} categories={categories} />
      </div>
    </div>
  );
}
