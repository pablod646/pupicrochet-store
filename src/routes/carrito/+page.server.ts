import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

  if (!cartId) {
    return { cart: null };
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return { cart };
};

export const actions = {
  updateQuantity: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get('itemId') as string;
    const quantity = parseInt(data.get('quantity') as string);

    if (quantity > 0) {
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.delete({ where: { id: itemId } });
    }

    return { success: true };
  },
  removeItem: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get('itemId') as string;

    await prisma.cartItem.delete({ where: { id: itemId } });

    return { success: true };
  },
} satisfies Actions;