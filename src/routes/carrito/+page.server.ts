import { prisma } from '../../lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const cartId = cookies.get('cartId');

  if (!cartId) {
    return { cart: null, total: 0, products: [] };
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

  if (!cart) {
    return { cart: null, total: 0, products: [] };
  }

  const total = cart.items.reduce((acc: number, item: { quantity: number; product: { price: number; }; }) => acc + item.quantity * item.product.price, 0);

  // Obtener todos los productos para el catálogo
  const products = await prisma.product.findMany();

  return { cart, total, products };
};

export const actions = {
  updateQuantity: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get('itemId') as string;
    const quantityStr = data.get('quantity') as string;

    if (!itemId || !quantityStr) {
      return fail(400, { success: false, message: 'Faltan datos del artículo.' });
    }

    const quantity = parseInt(quantityStr);

    if (isNaN(quantity)) {
      return fail(400, { success: false, message: 'La cantidad no es un número válido.' });
    }

    try {
      if (quantity > 0) {
        await prisma.cartItem.update({
          where: { id: itemId },
          data: { quantity },
        });
      } else {
        await prisma.cartItem.delete({ where: { id: itemId } });
      }
    } catch (error) {
      console.error(error);
      return fail(500, { success: false, message: 'No se pudo actualizar el artículo.' });
    }

    return { success: true };
  },
  removeItem: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get('itemId') as string;

    if (!itemId) {
      return fail(400, { success: false, message: 'Falta el ID del artículo.' });
    }

    try {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } catch (error) {
      console.error(error);
      return fail(500, { success: false, message: 'No se pudo eliminar el artículo.' });
    }

    return { success: true };
  },
} satisfies Actions;