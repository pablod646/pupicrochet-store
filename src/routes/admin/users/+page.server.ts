import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  return { users };
};

export const actions = {
  deleteUser: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get("userId") as string;

    if (!userId) {
      return fail(400, { message: "ID de usuario requerido." });
    }

    try {
      await prisma.user.delete({ where: { id: userId } });
      return { success: true, message: "Usuario eliminado exitosamente." };
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return fail(500, { message: "Fallo al eliminar el usuario." });
    }
  },
} satisfies Actions;
