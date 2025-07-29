import { describe, it, expect, vi } from "vitest";
import { addToCart } from "./cart.service";
import { prisma } from "$lib/server/prisma";
import type { Cookies } from "@sveltejs/kit";

vi.mock("$env/static/private", () => ({
  env: {
    NODE_ENV: "test",
  },
}));

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    cart: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    cartItem: {
      findUnique: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

const mockCookies = {
  get: vi.fn(),
  set: vi.fn(),
} as unknown as Cookies;

describe("addToCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add an item to a new anonymous cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue(undefined);
    (prisma.cart.create as vi.Mock).mockResolvedValue({ id: "new-cart-id" });

    await addToCart(mockCookies, "product-1", 1);

    expect(prisma.cart.create).toHaveBeenCalled();
    expect(mockCookies.set).toHaveBeenCalledWith(
      "cartId",
      "new-cart-id",
      expect.any(Object),
    );
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: {
        productId: "product-1",
        cartId: "new-cart-id",
        quantity: 1,
      },
    });
  });

  it("should add an item to an existing anonymous cart", async () => {
    (mockCookies.get as vi.Mock).mockReturnValue("existing-cart-id");
    (prisma.cart.findUnique as vi.Mock).mockResolvedValue({
      id: "existing-cart-id",
    });
    (prisma.cartItem.findUnique as vi.Mock).mockResolvedValue(null);

    await addToCart(mockCookies, "product-1", 1);

    expect(prisma.cart.findUnique).toHaveBeenCalledWith({
      where: { id: "existing-cart-id" },
    });
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: {
        productId: "product-1",
        cartId: "existing-cart-id",
        quantity: 1,
      },
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
      cartId: "existing-cart-id",
      quantity: 1,
    });

    await addToCart(mockCookies, "product-1", 2);

    expect(prisma.cartItem.update).toHaveBeenCalledWith({
      where: { id: "item-1" },
      data: { quantity: 3 },
    });
  });
});
