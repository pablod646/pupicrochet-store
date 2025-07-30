import { describe, it, expect, vi, beforeEach } from "vitest";
import { CartService } from "./cart.service";
import { prisma } from "$lib/server/prisma";
import type { Cookies } from "@sveltejs/kit";

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    cart: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    cartItem: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("CartService", () => {
  let cartService: CartService;
  let mockCookies: Cookies;

  beforeEach(() => {
    cartService = new CartService();
    mockCookies = {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
      serialize: vi.fn(),
    } as unknown as Cookies;
    vi.clearAllMocks();
  });

  it("should add an item to a new anonymous cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue(undefined);
    (prisma.cart.create as vi.Mock).mockResolvedValue({ id: "new-cart-id" });

    const response = await cartService.addToCart(mockCookies, "product-1", 1);
    const result = await response.json();

    expect(prisma.cart.create).toHaveBeenCalledWith({
      data: {
        items: {
          create: {
            productId: "product-1",
            quantity: 1,
          },
        },
      },
    });
    expect(mockCookies.set).toHaveBeenCalledWith(
      "cartId",
      "new-cart-id",
      expect.any(Object),
    );
    expect(result).toEqual({
      success: true,
      data: { message: "Product added to cart" },
    });
  });

  it("should add an item to an existing anonymous cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue({
      id: "existing-cart-id",
    });
    (prisma.cartItem.findUnique as vi.Mock).mockResolvedValue(null);

    const response = await cartService.addToCart(mockCookies, "product-1", 1);
    const result = await response.json();

    expect(prisma.cart.findUnique).toHaveBeenCalledWith({
      where: { id: "existing-cart-id" },
    });
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: {
        cartId: "existing-cart-id",
        productId: "product-1",
        quantity: 1,
      },
    });
    expect(result).toEqual({
      success: true,
      data: { message: "Product added to cart" },
    });
  });

  it("should update an item in an existing anonymous cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue({
      id: "existing-cart-id",
    });
    (prisma.cartItem.findUnique as vi.Mock).mockResolvedValue({
      id: "item-1",
      productId: "product-1",
      quantity: 1,
    });

    const response = await cartService.addToCart(mockCookies, "product-1", 1);
    const result = await response.json();

    expect(prisma.cartItem.update).toHaveBeenCalledWith({
      where: { id: "item-1" },
      data: { quantity: 2 },
    });
    expect(result).toEqual({
      success: true,
      data: { message: "Product added to cart" },
    });
  });

  it("should remove an item from the cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");

    await cartService.removeItem(mockCookies, "item-1");

    expect(prisma.cartItem.delete).toHaveBeenCalledWith({
      where: { id: "item-1", cartId: "existing-cart-id" },
    });
  });

  it("should clear the cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");

    await cartService.clearCart(mockCookies);

    expect(prisma.cart.update).toHaveBeenCalledWith({
      where: { id: "existing-cart-id" },
      data: {
        items: { deleteMany: {} },
      },
    });
  });

  it("should get the cart and its items", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue({
      id: "existing-cart-id",
      items: [
        { id: "item-1", productId: "product-1", quantity: 1 },
        { id: "item-2", productId: "product-2", quantity: 2 },
      ],
    });

    const result = await cartService.getCart(mockCookies);

    expect(prisma.cart.findUnique).toHaveBeenCalledWith({
      where: { id: "existing-cart-id" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    expect(result).toEqual({
      id: "existing-cart-id",
      items: [
        { id: "item-1", productId: "product-1", quantity: 1 },
        { id: "item-2", productId: "product-2", quantity: 2 },
      ],
    });
  });

  it("should return null if cart does not exist", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("non-existent-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue(null);

    const result = await cartService.getCart(mockCookies);

    expect(result).toBeNull();
  });

  it("should get the cart item count", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue({
      id: "existing-cart-id",
      items: [
        { id: "item-1", productId: "product-1", quantity: 1 },
        { id: "item-2", productId: "product-2", quantity: 2 },
      ],
    });

    const result = await cartService.getCartItemCount(mockCookies);

    expect(result).toBe(3);
  });

  it("should return 0 if cart does not exist for item count", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("non-existent-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue(null);

    const result = await cartService.getCartItemCount(mockCookies);

    expect(result).toBe(0);
  });
});
