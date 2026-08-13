'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}

export async function createCategory(data: { name: string, description?: string }) {
  const result = await prisma.category.create({ data })
  revalidatePath('/admin/categories')
  revalidatePath('/admin/menu')
  revalidatePath('/menu')
  return result
}

export async function updateCategory(id: string, data: { name: string, description?: string }) {
  const result = await prisma.category.update({ where: { id }, data })
  revalidatePath('/admin/categories')
  revalidatePath('/admin/menu')
  revalidatePath('/menu')
  return result
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/categories')
  revalidatePath('/admin/menu')
  revalidatePath('/menu')
}
