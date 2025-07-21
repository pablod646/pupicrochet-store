import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../src/lib/utils/slug';

const prisma = new PrismaClient();

async function main() {
  const defaultCategoryName = 'Default';

  let defaultCategory = await prisma.category.findUnique({
    where: { name: defaultCategoryName },
  });

  if (!defaultCategory) {
    defaultCategory = await prisma.category.create({
      data: {
        name: defaultCategoryName,
        slug: generateSlug(defaultCategoryName),
      },
    });
    console.log(`Created default category: ${defaultCategory.name}`);
  }

  // Assign default category to products with null categoryId
  const productsWithoutCategory = await prisma.product.findMany({
    where: {
      categoryId: null,
    },
  });

  console.log(`Found ${productsWithoutCategory.length} products without a category.`);

  for (const product of productsWithoutCategory) {
    await prisma.product.update({
      where: { id: product.id },
      data: { categoryId: defaultCategory.id },
    });
    console.log(`Assigned default category to product: ${product.name}`);
  }

  console.log('Default category assignment complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
