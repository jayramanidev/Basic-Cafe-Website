'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  } catch (error) {
    console.error("Failed to get categories:", error)
    return []
  }
}

export async function createCategory(data: { name: string, description?: string }) {
  try {
    if (!data.name) {
      return { success: false, error: "Category name is required." }
    }
    const result = await prisma.category.create({ data })
    revalidatePath('/admin/categories')
    revalidatePath('/admin/menu')
    revalidatePath('/menu')
    return { success: true, category: result }
  } catch (error) {
    console.error("Failed to create category:", error)
    return { success: false, error: "Failed to create category." }
  }
}

export async function updateCategory(id: string, data: { name: string, description?: string }) {
  try {
    if (!data.name) {
      return { success: false, error: "Category name is required." }
    }
    const result = await prisma.category.update({ where: { id }, data })
    revalidatePath('/admin/categories')
    revalidatePath('/admin/menu')
    revalidatePath('/menu')
    return { success: true, category: result }
  } catch (error) {
    console.error("Failed to update category:", error)
    return { success: false, error: "Failed to update category." }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
    revalidatePath('/admin/categories')
    revalidatePath('/admin/menu')
    revalidatePath('/menu')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete category:", error)
    return { success: false, error: "Failed to delete category. It might be in use." }
  }
}
