import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');
  const sessionId = cookies.get('sessionid');

  let user = null;
  if (sessionId) {
    user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true }, // Select only necessary fields
    });
  }

  let cart = null;
  if (cartId) {
    cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: true,
      },
    });
  }

  return { cart, user };
};