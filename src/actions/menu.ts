'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMenuItems() {
  return await prisma.menuItem.findMany({
    orderBy: { category: 'asc' }
  })
}

export async function createMenuItem(data: { name: string, description: string, price: number, category: string, image?: string }) {
  const result = await prisma.menuItem.create({ data })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
  return result
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
}

export async function updateMenuItem(id: string, data: { name: string, description: string, price: number, category: string, image?: string }) {
  const result = await prisma.menuItem.update({ where: { id }, data })
  revalidatePath('/menu')
  revalidatePath('/admin/menu')
  return result
}
