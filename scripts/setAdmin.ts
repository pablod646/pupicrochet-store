
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userEmail = 'pablo.difilippo@gmail.com';

async function main() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      console.log(`Usuario con email ${userEmail} no encontrado.`);
      return;
    }

    if (user.role === 'ADMIN') {
      console.log(`El usuario ${userEmail} ya tiene el rol de ADMIN.`);
      return;
    }

    await prisma.user.update({
      where: { email: userEmail },
      data: { role: 'ADMIN' },
    });

    console.log(`El usuario ${userEmail} ha sido actualizado a rol ADMIN.`);

  } catch (error) {
    console.error('Ocurrió un error al actualizar el usuario:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
