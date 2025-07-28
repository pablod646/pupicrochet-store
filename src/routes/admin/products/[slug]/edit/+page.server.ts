import { fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";
import { generateSlug } from "$lib/utils/slug";
import { getCategoriesHierarchy } from "$lib/server/queries/categories";

export const load: PageServerLoad = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: true,
      categories: true,
    },
  });

  if (!product) {
    throw redirect(303, "/admin/products");
  }

  const categories = await getCategoriesHierarchy();

  return { product, categories };
};

export const actions = {
  updateProduct: async ({ request, params }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = parseFloat(data.get("price") as string);
    const dimensions = data.get("dimensions") as string | null;
    const materials = data.get("materials") as string | null;
    const imageUrls = data.getAll("imageUrls[]") as string[];
    const existingImageIds = data.getAll("existingImageIds[]") as string[];
    const categoryIds = data.getAll("categoryIds[]") as string[];

    if (!name || !description || isNaN(price) || price <= 0) {
      return fail(400, {
        message: "Nombre, descripción y un precio válido son requeridos.",
      });
    }

    try {
      // Find the product by slug to get its ID
      const productToUpdate = await prisma.product.findUnique({
        where: { slug: params.slug },
        select: { id: true },
      });

      if (!productToUpdate) {
        return fail(404, { message: "Producto no encontrado." });
      }

      // Update product details using its ID
      const updatedProduct = await prisma.product.update({
        where: { id: productToUpdate.id },
        data: {
          name,
          slug: generateSlug(name),
          description,
          price: Math.round(price * 100),
          dimensions,
          materials,
          categories: {
            set: categoryIds.map((id) => ({ id })),
          },
        },
      });

      // Handle images: delete removed, create new
      const currentImages = await prisma.productImage.findMany({
        where: { productId: productToUpdate.id },
      });
      const imagesToDelete = currentImages.filter(
        (img) => !existingImageIds.includes(img.id),
      );

      for (const img of imagesToDelete) {
        await prisma.productImage.delete({ where: { id: img.id } });
      }

      const newImageUrls = imageUrls.filter(
        (url) => url && !currentImages.some((img) => img.url === url),
      );
      if (newImageUrls.length > 0) {
        await prisma.productImage.createMany({
          data: newImageUrls.map((url) => ({
            url,
            productId: productToUpdate.id,
          })),
        });
      }

      return { success: true, message: "¡Producto actualizado exitosamente!" };
    } catch (error) {
      console.error("Error updating product:", error);
      return fail(500, { message: "Fallo al actualizar el producto." });
    }
  },
} satisfies Actions;
