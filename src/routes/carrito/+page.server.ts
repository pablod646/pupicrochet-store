import { prisma } from "../../lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { NODE_ENV } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies, parent }) => {
  const { user } = await parent();
  let cartId = cookies.get("cartId");
  let cart = null;

  if (user) {
    // Try to find a cart associated with the logged-in user
    cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (cart && cartId && cart.id !== cartId) {
      // If user has a cart and there's an anonymous cart, merge them
      const anonymousCart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
      });

      if (anonymousCart) {
        for (const item of anonymousCart.items) {
          await prisma.cartItem.upsert({
            where: {
              productId_cartId: { productId: item.productId, cartId: cart.id },
            },
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
      cookies.set("cartId", cart.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: PUBLIC_NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
    } else if (!cart && cartId) {
      // If user has no cart but there's an anonymous cart, assign it to the user
      cart = await prisma.cart.update({
        where: { id: cartId },
        data: { userId: user.id },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
    } else if (!cart && !cartId) {
      // If user has no cart and no anonymous cart, create a new cart for the user
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
      cookies.set("cartId", cart.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: PUBLIC_NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  } else if (cartId) {
    // If no user, but there's an anonymous cart
    cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  }

  if (!cart) {
    return { cart: null, total: 0, products: [] };
  }

  const total = cart.items.reduce(
    (acc: number, item: { quantity: number; product: { price: number } }) =>
      acc + item.quantity * item.product.price,
    0,
  );

  const products = await prisma.product.findMany();

  return { cart, total, products };
};

export const actions = {
  updateQuantity: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get("itemId") as string;
    const quantityStr = data.get("quantity") as string;

    if (!itemId || !quantityStr) {
      return fail(400, {
        success: false,
        message: "Faltan datos del artículo.",
      });
    }

    const quantity = parseInt(quantityStr);

    if (isNaN(quantity)) {
      return fail(400, {
        success: false,
        message: "La cantidad no es un número válido.",
      });
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
      return fail(500, {
        success: false,
        message: "No se pudo actualizar el artículo.",
      });
    }

    return { success: true };
  },
  removeItem: async ({ request }) => {
    const data = await request.formData();
    const itemId = data.get("itemId") as string;

    if (!itemId) {
      return fail(400, {
        success: false,
        message: "Falta el ID del artículo.",
      });
    }

    try {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } catch (error) {
      console.error(error);
      return fail(500, {
        success: false,
        message: "No se pudo eliminar el artículo.",
      });
    }

    return { success: true };
  },
} satisfies Actions;
