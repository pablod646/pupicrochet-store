import { prisma } from '$lib/server/prisma';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/static/private';

export async function addToCart(cookies: Cookies, productId: string, quantity: number) {
  const sessionId = cookies.get('sessionid');
  let user = null;
  if (sessionId) {
    user = await prisma.user.findUnique({ where: { id: sessionId } });
  }

  let cartId = cookies.get('cartId');
  let cart;

  if (user) {
    // If user is logged in, try to find their cart or create one
    cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
      if (cart.id) {
        cookies.set('cartId', cart.id, { path: '/', httpOnly: true, sameSite: 'strict', secure: env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });
      }
    } else if (cartId && cart.id !== cartId) {
      // If user has a cart and there's an anonymous cart, merge them
      const anonymousCart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
      });

      if (anonymousCart) {
        for (const item of anonymousCart.items) {
          await prisma.cartItem.upsert({
            where: { productId_cartId: { productId: item.productId, cartId: cart.id } },
            update: { quantity: { increment: item.quantity } },
            create: {
              productId: item.productId,
              cartId: cart.id,
              quantity: item.quantity,
            },
          });
        }
        await prisma.cart.delete({ where: { id: anonymousCart.id } });
      }
      if (cart.id) {
        cookies.set('cartId', cart.id, { path: '/', httpOnly: true, sameSite: 'strict', secure: env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });
      }
    }
  } else {
    // If no user is logged in, use or create an anonymous cart
    if (!cartId) {
      cart = await prisma.cart.create({ data: {} });
      cartId = cart.id;
      cookies.set('cartId', cartId, { path: '/', httpOnly: true, sameSite: 'strict', secure: env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });
    } else {
      cart = await prisma.cart.findUnique({ where: { id: cartId } });
      if (!cart) {
        // If cartId exists but cart doesn't (e.g., deleted), create a new one
        cart = await prisma.cart.create({ data: {} });
        cartId = cart.id;
        cookies.set('cartId', cartId, { path: '/', httpOnly: true, sameSite: 'strict', secure: env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });
      }
    }
  }

  if (!cart) {
    // This should ideally not happen with the logic above, but as a fallback
    return { success: false, message: 'Could not find or create cart.' };
  }

  const targetCartId = cart.id;

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      productId_cartId: {
        productId,
        cartId: targetCartId,
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
        cartId: targetCartId,
        quantity: quantity,
      },
    });
  }

  return { success: true };
}
