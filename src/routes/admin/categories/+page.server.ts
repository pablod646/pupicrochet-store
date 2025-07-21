import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { generateSlug } from '$lib/utils/slug';

export const load: PageServerLoad = async () => {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return { categories };
};

export const actions = {
  createCategoryOrSubcategory: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const parentCategoryId = data.get('parentCategoryId') as string | null;

    if (!name) {
      return fail(400, { message: 'El nombre es requerido.' });
    }

    try {
      const slug = generateSlug(name);
      if (parentCategoryId) {
        // Create Subcategory
        await prisma.subcategory.create({
          data: {
            name,
            slug,
            categoryId: parentCategoryId,
          },
        });
        return { success: true, message: 'Subcategoría creada exitosamente.' };
      } else {
        // Create Category
        await prisma.category.create({
          data: {
            name,
            slug,
          },
        });
        return { success: true, message: 'Categoría creada exitosamente.' };
      }
    } catch (error) {
      console.error("Error creating category/subcategory:", error);
      return fail(500, { message: 'Fallo al crear la categoría/subcategoría.' });
    }
  },

  deleteCategory: async ({ request }) => {
    const data = await request.formData();
    const categoryId = data.get('categoryId') as string;

    if (!categoryId) {
      return fail(400, { message: 'El ID de la categoría es requerido.' });
    }

    try {
      // Disconnect products from subcategories within this category
      await prisma.product.updateMany({
        where: {
          subcategory: {
            categoryId: categoryId,
          },
        },
        data: {
          subcategoryId: null, // Or assign to a default subcategory if one exists
        },
      });

      // Delete all subcategories within this category
      await prisma.subcategory.deleteMany({
        where: { categoryId: categoryId },
      });

      // Then delete the category
      await prisma.category.delete({
        where: { id: categoryId },
      });
      return { success: true, message: 'Categoría eliminada exitosamente.' };
    } catch (error) {
      console.error("Error deleting category:", error);
      return fail(500, { message: 'Fallo al eliminar la categoría.' });
    }
  },

  deleteSubcategory: async ({ request }) => {
    const data = await request.formData();
    const subcategoryId = data.get('subcategoryId') as string;

    if (!subcategoryId) {
      return fail(400, { message: 'El ID de la subcategoría es requerido.' });
    }

    try {
      // Disconnect products from this subcategory
      await prisma.product.updateMany({
        where: { subcategoryId: subcategoryId },
        data: {
          subcategoryId: null, // Or assign to a default subcategory if one exists
        },
      });

      await prisma.subcategory.delete({
        where: { id: subcategoryId },
      });
      return { success: true, message: 'Subcategoría eliminada exitosamente.' };
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      return fail(500, { message: 'Fallo al eliminar la subcategoría.' });
    }
  },
} satisfies Actions;
