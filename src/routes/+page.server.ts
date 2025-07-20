import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    // Optionally redirect authenticated users from the home page
    // throw redirect(303, '/dashboard');
  }

  const products = await prisma.product.findMany({
    include: {
      images: {
        take: 1,
      },
    },
  });

  return { products, user };
};
