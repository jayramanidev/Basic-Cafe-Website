'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      orderBy: { category: 'asc' },
      include: { categoryRel: true }
    })
  } catch (error) {
    console.error("Failed to get menu items:", error)
    return []
  }
}

export async function createMenuItem(data: { name: string, description: string, price: number, categoryId: string, image?: string }) {
  try {
    if (!data.name || data.price <= 0) {
      return { success: false, error: "Invalid name or price." }
    }
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    const result = await prisma.menuItem.create({ 
      data: {
        ...data,
        category: category?.name || ""
      } 
    })
    revalidatePath('/menu')
    revalidatePath('/admin/menu')
    return { success: true, item: result }
  } catch (error) {
    console.error("Failed to create menu item:", error)
    return { success: false, error: "Failed to create menu item." }
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({ where: { id } })
    revalidatePath('/menu')
    revalidatePath('/admin/menu')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete menu item:", error)
    return { success: false, error: "Failed to delete menu item." }
  }
}

export async function updateMenuItem(id: string, data: { name: string, description: string, price: number, categoryId: string, image?: string }) {
  try {
    if (!data.name || data.price <= 0) {
      return { success: false, error: "Invalid name or price." }
    }
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    const result = await prisma.menuItem.update({ 
      where: { id }, 
      data: {
        ...data,
        category: category?.name || ""
      } 
    })
    revalidatePath('/menu')
    revalidatePath('/admin/menu')
    return { success: true, item: result }
  } catch (error) {
    console.error("Failed to update menu item:", error)
    return { success: false, error: "Failed to update menu item." }
  }
}
