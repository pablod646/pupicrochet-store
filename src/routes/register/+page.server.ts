import { fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcrypt";

export const actions = {
  register: async ({ request }) => {
    try {
      const data = await request.formData();
      const email = data.get("email") as string;
      const password = data.get("password") as string;
      const name = data.get("name") as string;

      if (!email || !password) {
        return fail(400, {
          email,
          message: "Falta correo electrónico o contraseña",
        });
      }

      // Basic email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return fail(400, {
          email,
          message: "Formato de correo electrónico inválido",
        });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return fail(400, {
          email,
          message: "Ya existe un usuario con este correo electrónico",
        });
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
        message: "Ocurrió un error inesperado durante el registro.",
      });
    }
    return { success: true };
  },
};
