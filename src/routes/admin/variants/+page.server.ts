
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const optionTypes = await prisma.optionType.findMany({
    orderBy: { name: 'asc' },
  });

  const optionValues = await prisma.optionValue.findMany({
    include: { optionType: true },
    orderBy: [{ optionType: { name: 'asc' } }, { value: 'asc' }],
  });

  return { optionTypes, optionValues };
};

export const actions = {
  createOptionType: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;

    if (!name) {
      return fail(400, { message: 'El nombre es requerido.' });
    }

    try {
      await prisma.optionType.create({ data: { name } });
      return { success: true };
    } catch (error) {
      return fail(500, { message: 'Error al crear el tipo de opción.' });
    }
  },

  createOptionValue: async ({ request }) => {
    const data = await request.formData();
    const optionTypeId = data.get('optionTypeId') as string;
    const value = data.get('value') as string;

    if (!optionTypeId || !value) {
      return fail(400, { message: 'El tipo de opción y el valor son requeridos.' });
    }

    try {
      await prisma.optionValue.create({ data: { optionTypeId, value } });
      return { success: true };
    } catch (error) {
      return fail(500, { message: 'Error al crear el valor de opción.' });
    }
  },
} satisfies Actions;
