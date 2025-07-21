import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
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
  createProduct: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const price = parseFloat(data.get('price') as string);
    const dimensions = data.get('dimensions') as string | null;
    const materials = data.get('materials') as string | null;
    const imageUrls = data.getAll('imageUrls[]') as string[];
    const categoryId = data.get('categoryId') as string | null;

    if (!name || !description || isNaN(price) || price <= 0) {
      return fail(400, { message: 'Nombre, descripción y un precio válido son requeridos.' });
    }

    try {
      const product = await prisma.product.create({
        data: {
          name,
          slug: generateSlug(name),
          description,
          price: Math.round(price * 100), // Store price in cents
          dimensions,
          materials,
          categoryId: categoryId || undefined, // Set to undefined if null to avoid Prisma error
          images: {
            create: imageUrls.filter(url => url).map(url => ({ url })),
          },
        },
      });
      return { success: true, productId: product.id, productSlug: product.slug, message: '¡Producto creado exitosamente!' };
    } catch (error) {
      console.error("Error creating product:", error);
      return fail(500, { message: 'Fallo al crear el producto.' });
    }
  },
} satisfies Actions;
