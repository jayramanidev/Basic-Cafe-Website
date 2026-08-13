const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const menuItems = [
  {
    name: 'Samosa Chaat',
    description: 'Crispy samosa smashed and topped with tangy chutneys, yogurt, and spices.',
    price: 120,
    category: 'Street Chaats',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Pani Puri',
    description: 'Crispy hollow puris filled with spicy, tangy water and mashed potatoes.',
    price: 80,
    category: 'Street Chaats',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Aloo Tikki',
    description: 'Golden fried potato patties served with sweet date and spicy mint chutney.',
    price: 100,
    category: 'Street Chaats',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Classic Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato curry, served with sambar and coconut chutney.',
    price: 180,
    category: 'South Indian',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Idli Sambar',
    description: 'Soft and fluffy steamed rice cakes served with hot lentil soup.',
    price: 110,
    category: 'South Indian',
    image: 'https://images.unsplash.com/photo-1627447432857-7977461a5113?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Vada Pav',
    description: 'Spicy potato dumpling placed inside a soft bread bun with fiery chutneys.',
    price: 60,
    category: 'Quick Bites',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Pav Bhaji',
    description: 'Thick, spicy vegetable curry served with soft, butter-toasted bread rolls.',
    price: 150,
    category: 'Quick Bites',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Masala Chai',
    description: 'Hot milk tea brewed with fresh ginger and aromatic Indian spices.',
    price: 50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Mango Lassi',
    description: 'Sweet, rich, and creamy yogurt drink blended with fresh mango puree.',
    price: 120,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1546174620-6d0ed0dfb2f2?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'South Indian Filter Coffee',
    description: 'Strong, frothy coffee made by mixing frothed milk with a highly concentrated brew.',
    price: 70,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
  },
];

async function main() {
  console.log('Seeding database with menu items...');
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
