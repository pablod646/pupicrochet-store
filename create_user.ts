import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'test@example.com';
  const password = 'password123'; // You can change this password
  const name = 'Test User';

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    console.log(`User created: ${user.email}`);
  } catch (e) {
    if (e.code === 'P2002') {
      console.log(`User with email ${email} already exists.`);
    } else {
      throw e;
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
