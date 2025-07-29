import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: true, // Incluimos las imágenes relacionadas
    },
  });

  // Buscamos hasta 4 productos relacionados (excluyendo el actual)
  const relatedProducts = await prisma.product.findMany({
    where: {
      slug: {
        not: params.slug,
      },
    },
    take: 4,
    include: {
      images: {
        take: 1, // Solo necesitamos la primera imagen para la tarjeta
      },
    },
  });

  return { product, relatedProducts };
};

import { CartService } from "$lib/server/services/cart.service";

export const actions = {
  addToCart: async ({ request, cookies }) => {
    const data = await request.formData();
    const productId = data.get("productId") as string;
    const quantity = Number(data.get("quantity")) || 1;

    const cartService = new CartService();
    return await cartService.addToCart(cookies, productId, quantity);
  },
} satisfies Actions;
