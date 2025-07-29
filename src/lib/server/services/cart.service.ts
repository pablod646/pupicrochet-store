import { prisma } from "$lib/server/prisma";
import type { Cookies } from "@sveltejs/kit";
import { NODE_ENV } from "$env/static/private";
import { jsonSuccess, jsonError } from "$lib/server/api";

export class CartService {
  async addToCart(cookies: Cookies, productId: string, quantity: number) {
    const sessionId = cookies.get("sessionid");
    let user = null;
    if (sessionId) {
      user = await prisma.user.findUnique({ where: { id: sessionId } });
    }

    let cartId = cookies.get("cartId");
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
          cookies.set("cartId", cart.id, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
          });
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
              where: {
                productId_cartId: {
                  productId: item.productId,
                  cartId: cart.id,
                },
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
        if (cart.id) {
          cookies.set("cartId", cart.id, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }
    } else {
      // If no user is logged in, use or create an anonymous cart
      if (!cartId) {
        cart = await prisma.cart.create({ data: {} });
        cartId = cart.id;
        cookies.set("cartId", cartId, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
        });
      } else {
        cart = await prisma.cart.findUnique({ where: { id: cartId } });
        if (!cart) {
          // If cartId exists but cart doesn't (e.g., deleted), create a new one
          cart = await prisma.cart.create({ data: {} });
          cartId = cart.id;
          cookies.set("cartId", cartId, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }
    }

    if (!cart) {
      // This should ideally not happen with the logic above, but as a fallback
      return jsonError("Could not find or create cart.", 500);
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

    return jsonSuccess({ message: "Product added to cart" });
  }

  async removeItem(cookies: Cookies, cartItemId: string) {
    const cartId = cookies.get("cartId");
    if (!cartId) {
      return jsonError("Cart not found.", 404);
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId, cartId: cartId },
    });

    return jsonSuccess({ message: "Item removed from cart" });
  }

  async clearCart(cookies: Cookies) {
    const cartId = cookies.get("cartId");
    if (!cartId) {
      return jsonError("Cart not found.", 404);
    }

    await prisma.cart.update({
      where: { id: cartId },
      data: {
        items: { deleteMany: {} },
      },
    });

    return jsonSuccess({ message: "Cart cleared" });
  }

  async getCart(cookies: Cookies) {
    const cartId = cookies.get("cartId");
    if (!cartId) {
      return null;
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

    return cart;
  }

  async getCartItemCount(cookies: Cookies): Promise<number> {
    const cart = await this.getCart(cookies);
    return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }
}