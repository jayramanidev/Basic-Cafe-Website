'use server'

import prisma from '@/lib/prisma'

export async function submitContactMessage(data: { name: string, email: string, message: string }) {
  return await prisma.contactMessage.create({ data })
}
