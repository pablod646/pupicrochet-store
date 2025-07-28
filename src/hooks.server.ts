import { prisma } from "$lib/server/prisma";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("sessionid");

  if (sessionId) {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true, role: true },
    });
    if (user) {
      event.locals.user = user;
    }
  }

  return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
  console.error("Unhandled server error:", error, event);

  return {
    message: "An unexpected error occurred.",
    code: "UNEXPECTED_ERROR",
  };
};
