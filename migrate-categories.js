const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting category migration...');
  
  // Get all unique category strings
  const items = await prisma.menuItem.findMany();
  const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
  
  console.log('Found categories:', uniqueCategories);
  
  // Create Category records and map them
  for (const catName of uniqueCategories) {
    let category = await prisma.category.findUnique({ where: { name: catName } });
    if (!category) {
      category = await prisma.category.create({ data: { name: catName } });
      console.log(`Created category: ${catName}`);
    }
    
    // Update all items with this category string to use the new categoryId
    const updateResult = await prisma.menuItem.updateMany({
      where: { category: catName },
      data: { categoryId: category.id }
    });
    console.log(`Updated ${updateResult.count} items for category ${catName}`);
  }
  
  console.log('Migration completed successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
