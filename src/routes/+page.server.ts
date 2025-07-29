
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    // Optionally redirect authenticated users from the home page
    // throw redirect(303, '/dashboard');
  }

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      dimensions: true,
      materials: true,
      createdAt: true,
      updatedAt: true,
      images: {
        take: 1,
      },
    },
  });

  return { products, user };
};
