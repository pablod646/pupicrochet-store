import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany({
    include: {
      images: {
        take: 1, // Only need one image for the listing
      },
    },
  });

  return { products };
};

export const actions = {
  deleteProduct: async ({ request }) => {
    const data = await request.formData();
    const productId = data.get('productId') as string;

    if (!productId) {
      return fail(400, { message: 'Se requiere el ID del producto.' });
    }

    try {
      // Delete associated images first
      await prisma.productImage.deleteMany({
        where: { productId: productId },
      });
      // Then delete the product
      await prisma.product.delete({
        where: { id: productId },
      });
      return { success: true, message: '¡Producto eliminado exitosamente!' };
    } catch (error) {
      console.error("Error deleting product:", error);
      return fail(500, { message: 'Fallo al eliminar el producto.' });
    }
  },
} satisfies Actions;
