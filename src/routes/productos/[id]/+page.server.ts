import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  return { product };
};

export const actions = {
  addToCart: async ({ request, cookies }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;
    const quantity = Number(data.get('quantity')) || 1;

    let cartId = cookies.get('cartId');

    if (!cartId) {
      const newCart = await prisma.cart.create({ data: {} });
      cartId = newCart.id;
      cookies.set('cartId', cartId, { path: '/' });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        productId_cartId: {
          productId,
          cartId,
        },
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId,
          cartId,
          quantity: quantity,
        },
      });
    }

    return { success: true };
  },
} satisfies Actions;