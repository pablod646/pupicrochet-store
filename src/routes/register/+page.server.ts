import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcrypt";
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from "$lib/schemas/auth.schema";

export const load = async () => {
  const form = await superValidate(zod(registerSchema));
  return { form };
};

export const actions = {
  register: async ({ request }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { email, password, name } = form.data;

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        form.errors.email = ["Ya existe un usuario con este correo electrónico"];
        return fail(400, { form });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      return fail(500, {
        form,
        message: "Ocurrió un error inesperado durante el registro.",
      });
    }
    return { form };
  },
};
