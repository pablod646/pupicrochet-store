import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
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
    const productSlug = data.get('productSlug') as string;

    if (!productSlug) {
      return fail(400, { message: 'Se requiere el slug del producto.' });
    }

    try {
      // Find the product by slug to get its ID
      const productToDelete = await prisma.product.findUnique({
        where: { slug: productSlug },
        select: { id: true },
      });

      if (!productToDelete) {
        return fail(404, { message: 'Producto no encontrado.' });
      }

      // Delete associated images first
      await prisma.productImage.deleteMany({
        where: { productId: productToDelete.id },
      });
      // Then delete the product
      await prisma.product.delete({
        where: { slug: productSlug },
      });
      return { success: true, message: '¡Producto eliminado exitosamente!' };
    } catch (error) {
      console.error("Error deleting product:", error);
      return fail(500, { message: 'Fallo al eliminar el producto.' });
    }
  },
} satisfies Actions;
