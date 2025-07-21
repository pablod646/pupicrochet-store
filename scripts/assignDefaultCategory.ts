import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../src/lib/utils/slug';

const prisma = new PrismaClient();

async function main() {
  const defaultCategoryName = 'Default';
  const defaultSubcategoryName = 'Default';

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

  let defaultSubcategory = await prisma.subcategory.findUnique({
    where: { name: defaultSubcategoryName },
  });

  if (!defaultSubcategory) {
    defaultSubcategory = await prisma.subcategory.create({
      data: {
        name: defaultSubcategoryName,
        slug: generateSlug(defaultSubcategoryName),
        categoryId: defaultCategory.id,
      },
    });
    console.log(`Created default subcategory: ${defaultSubcategory.name}`);
  }

  // Assign default subcategory to products with null subcategoryId
  const productsWithoutSubcategory = await prisma.product.findMany({
    where: {
      subcategoryId: null,
    },
  });

  console.log(`Found ${productsWithoutSubcategory.length} products without a subcategory.`);

  for (const product of productsWithoutSubcategory) {
    await prisma.product.update({
      where: { id: product.id },
      data: { subcategoryId: defaultSubcategory.id },
    });
    console.log(`Assigned default subcategory to product: ${product.name}`);
  }

  console.log('Default category and subcategory assignment complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
