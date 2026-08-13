'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMenuItems() {
  return await prisma.menuItem.findMany({
    orderBy: { category: 'asc' },
    include: { categoryRel: true }
  })
}

export async function createMenuItem(data: { name: string, description: string, price: number, categoryId: string, image?: string }) {
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
  const result = await prisma.menuItem.create({ 
    data: {
      ...data,
      category: category?.name || ""
    } 
  })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
  return result
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}

export async function updateMenuItem(id: string, data: { name: string, description: string, price: number, categoryId: string, image?: string }) {
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
  return result
}
