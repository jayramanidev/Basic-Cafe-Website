"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { createCategory, deleteCategory, updateCategory } from "@/actions/category";

export default function AdminCategoryClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
    };

    try {
      if (editingCat) {
        const result = await updateCategory(editingCat.id, data);
        if (result.success && result.category) {
          setCategories(categories.map(c => c.id === editingCat.id ? result.category! : c));
          setEditingCat(null);
        } else {
          throw new Error(result.error);
        }
      } else {
        const result = await createCategory(data);
        if (result.success && result.category) {
          setCategories([...categories, result.category]);
          e.currentTarget.reset();
        } else {
          throw new Error(result.error);
        }
      }
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure? This will not delete items, but their category will be orphaned unless updated.")) {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      if (editingCat?.id === id) setEditingCat(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10 px-4">
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-[#4a3f35]">{editingCat ? "Edit Category" : "Add Category"}</h2>
          {editingCat && (
            <button 
              onClick={() => setEditingCat(null)} 
              className="text-sm font-semibold px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
        
        <form key={editingCat?.id || 'new'} onSubmit={handleSubmit} className="space-y-4">
          <input name="name" defaultValue={editingCat?.name} required placeholder="Category Name" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
          <textarea name="description" defaultValue={editingCat?.description || ""} placeholder="Description (Optional)" rows={2} className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]"></textarea>
          
          <div className="flex items-center gap-4">
            <button disabled={status === "loading"} className="px-6 py-3 bg-[#d4a373] text-white rounded-xl font-bold hover:bg-[#4a3f35] transition-colors shadow-sm disabled:opacity-70">
              {status === "loading" ? "Saving..." : (editingCat ? "Update Category" : "Add Category")}
            </button>
            {status === "error" && <p className="text-red-500 font-semibold">Failed to save category.</p>}
            {status === "success" && <p className="text-green-500 font-semibold">Saved successfully!</p>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20 text-[#4a3f35]">
        <h2 className="text-2xl font-display font-bold mb-6">Current Categories</h2>
        <div className="space-y-4">
          {categories.map(cat => (
            <div key={cat.id} className={`flex justify-between items-center p-5 border rounded-xl transition-colors ${editingCat?.id === cat.id ? 'border-[#d4a373] bg-[#fdfbf7]' : 'border-gray-100'}`}>
              <div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
                {cat.description && <p className="text-sm text-gray-500 mt-1">{cat.description}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setEditingCat(cat); setStatus("idle"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">Delete</button>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-center py-10 text-gray-400 font-semibold">No categories found.</p>}
        </div>
      </div>
    </div>
  );
}
