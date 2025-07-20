import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Actions } from './$types';

export const actions = {
  createProduct: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const price = parseFloat(data.get('price') as string);
    const dimensions = data.get('dimensions') as string | null;
    const materials = data.get('materials') as string | null;
    const imageUrls = data.getAll('imageUrls[]') as string[];

    if (!name || !description || isNaN(price) || price <= 0) {
      return fail(400, { message: 'Nombre, descripción y un precio válido son requeridos.' });
    }

    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Math.round(price * 100), // Store price in cents
          dimensions,
          materials,
          images: {
            create: imageUrls.filter(url => url).map(url => ({ url })),
          },
        },
      });
      throw redirect(303, `/admin/products/${product.id}/edit`);
    } catch (error) {
      console.error("Error creating product:", error);
      return fail(500, { message: 'Fallo al crear el producto.' });
    }
  },
} satisfies Actions;
