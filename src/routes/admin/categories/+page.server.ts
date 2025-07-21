import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { generateSlug } from '$lib/utils/slug';
import type { Category } from '@prisma/client';

type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

export const load: PageServerLoad = async () => {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null, // Fetch only top-level categories
    },
    include: {
      children: {
        include: {
          children: true, // Include nested children if needed, up to a certain depth
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  return { categories: categories as CategoryWithChildren[] };
};

export const actions = {
  createCategoryOrSubcategory: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const parentId = data.get('parentCategoryId') as string | null;

    if (!name) {
      return fail(400, { message: 'El nombre es requerido.' });
    }

    try {
      const slug = generateSlug(name);
      await prisma.category.create({
        data: {
          name,
          slug,
          parentId: parentId || undefined,
        },
      });
      return { success: true, message: parentId ? 'Subcategoría creada exitosamente.' : 'Categoría creada exitosamente.' };
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
      // Disconnect products from this category
      await prisma.product.updateMany({
        where: { categoryId: categoryId },
        data: {
          categoryId: null, // Or assign to a default category if one exists
        },
      });

      // Disconnect children categories from this category (make them top-level)
      await prisma.category.updateMany({
        where: { parentId: categoryId },
        data: {
          parentId: null,
        },
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
} satisfies Actions;
