import { PrismaClient } from '@prisma/client';
import { generateSlug } from '../src/lib/utils/slug';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: {
      slug: null,
    },
  });

  console.log(`Found ${products.length} products with null slugs.`);

  for (const product of products) {
    let baseSlug = generateSlug(product.name);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness
    while (true) {
      const existingProduct = await prisma.product.findUnique({
        where: { slug },
      });

      if (!existingProduct || existingProduct.id === product.id) {
        break; // Slug is unique or belongs to the current product
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });
    console.log(`Updated product '${product.name}' with slug: ${slug}`);
  }

  console.log('Slug population complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
