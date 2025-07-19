import { PrismaClient } from '@prisma/client';
import type { LayoutServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

  if (!cartId) {
    return { cart: null };
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: true,
    },
  });

  return { cart };
};