"use client";

import { useState } from "react";
import { MenuItem, Category } from "@prisma/client";
import { createMenuItem, deleteMenuItem, updateMenuItem } from "@/actions/menu";

type MenuItemWithCategory = MenuItem & { categoryRel?: Category | null };

export default function AdminMenuClient({ initialItems, categories }: { initialItems: MenuItemWithCategory[], categories: Category[] }) {
  const [items, setItems] = useState<MenuItemWithCategory[]>(initialItems);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      categoryId: formData.get("categoryId") as string,
      image: (formData.get("image") as string) || undefined,
    };

    try {
      if (editingItem) {
        const result = await updateMenuItem(editingItem.id, data);
        if (result.success && result.item) {
          setItems(items.map(item => item.id === editingItem.id ? { ...result.item!, categoryRel: categories.find(c => c.id === data.categoryId) } : item));
          setEditingItem(null);
        } else {
          throw new Error(result.error);
        }
      } else {
        const result = await createMenuItem(data);
        if (result.success && result.item) {
          setItems([...items, { ...result.item, categoryRel: categories.find(c => c.id === data.categoryId) }]);
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
    if (confirm("Are you sure?")) {
      await deleteMenuItem(id);
      setItems(items.filter(item => item.id !== id));
      if (editingItem?.id === id) {
        setEditingItem(null);
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-[#4a3f35]">{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>
          {editingItem && (
            <button 
              onClick={() => setEditingItem(null)} 
              className="text-sm font-semibold px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
        
        <form key={editingItem?.id || 'new'} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" defaultValue={editingItem?.name} required placeholder="Name" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <select name="categoryId" defaultValue={editingItem?.categoryId || ""} required className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] bg-white">
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input name="price" defaultValue={editingItem?.price} required type="number" step="0.01" placeholder="Price" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="image" defaultValue={editingItem?.image || ""} placeholder="Image URL (optional)" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
          </div>
          <textarea name="description" defaultValue={editingItem?.description} required placeholder="Description" rows={3} className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]"></textarea>
          
          <div className="flex items-center gap-4">
            <button disabled={status === "loading"} className="px-6 py-3 bg-[#d4a373] text-white rounded-xl font-bold hover:bg-[#4a3f35] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
              {status === "loading" ? "Saving..." : (editingItem ? "Update Item" : "Add Item")}
            </button>
            {status === "error" && <p className="text-red-500 font-semibold">Failed to save item.</p>}
            {status === "success" && <p className="text-green-500 font-semibold">Item saved successfully!</p>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20 text-[#4a3f35]">
        <h2 className="text-2xl font-display font-bold mb-6">Current Menu</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border rounded-xl transition-colors ${editingItem?.id === item.id ? 'border-[#d4a373] bg-[#fdfbf7]' : 'border-gray-100 hover:border-gray-200'}`}>
              <div className="mb-4 sm:mb-0">
                <h3 className="font-bold text-lg">{item.name} <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-2">{item.categoryRel?.name || item.category}</span></h3>
                <p className="text-[#d4a373] font-bold mt-1">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setEditingItem(item);
                    setStatus("idle");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center py-10 text-gray-400 font-semibold">No items found.</p>}
        </div>
      </div>
    </div>
  );
}
