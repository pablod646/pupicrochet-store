import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { generateSlug } from '$lib/utils/slug';

export const load: PageServerLoad = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    throw redirect(303, '/admin/categories');
  }

  const categories = await prisma.category.findMany({
    where: {
      id: {
        not: params.id, // Exclude the current category from parent options
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return { category, categories };
};

export const actions = {
  updateCategory: async ({ request, params }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const parentId = data.get('parentId') as string | null;

    if (!name) {
      return fail(400, { message: 'El nombre es requerido.' });
    }

    try {
      const slug = generateSlug(name);
      await prisma.category.update({
        where: { id: params.id },
        data: {
          name,
          slug,
          parentId: parentId || undefined,
        },
      });
      return { success: true, message: 'Categoría actualizada exitosamente.' };
    } catch (error) {
      console.error("Error updating category:", error);
      return fail(500, { message: 'Fallo al actualizar la categoría.' });
    }
  },
} satisfies Actions;
