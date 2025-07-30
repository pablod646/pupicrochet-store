import { prisma } from "$lib/server/prisma";
import type { Handle, HandleServerError } from "@sveltejs/kit";
import logger from "$lib/server/logger.service";

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
  logger.error({ error, event }, "Unhandled server error");

  return {
    message: "An unexpected error occurred.",
    code: "UNEXPECTED_ERROR",
  };
};
