import { getCategories } from "@/actions/category";
import AdminCategoryClient from "./admin-category-client";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <AdminCategoryClient initialCategories={categories} />;
}
