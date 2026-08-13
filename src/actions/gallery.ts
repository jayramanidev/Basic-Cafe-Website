'use server'

import prisma from '@/lib/prisma'

export async function getGalleryImages() {
  return await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  })
}
