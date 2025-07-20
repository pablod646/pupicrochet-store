import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { UserRole } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    throw redirect(303, '/admin/users');
  }

  return { user };
};

export const actions = {
  updateUser: async ({ request, params }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const name = data.get('name') as string | null;
    const role = data.get('role') as UserRole;

    if (!email) {
      return fail(400, { message: 'Correo electrónico es requerido.' });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { message: 'Formato de correo electrónico inválido.' });
    }

    try {
      await prisma.user.update({
        where: { id: params.id },
        data: {
          email,
          name,
          role,
        },
      });
      return { success: true, message: 'Usuario actualizado exitosamente.' };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return fail(500, { message: 'Fallo al actualizar el usuario.' });
    }
  },
} satisfies Actions;
