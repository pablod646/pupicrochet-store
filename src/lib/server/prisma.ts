import { PrismaClient } from '@prisma/client';

// Esta es una forma de asegurar que solo haya una instancia de PrismaClient
// en desarrollo, donde la recarga en caliente (HMR) podría crear varias.
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalThis.prisma = prisma;
}

export { prisma };