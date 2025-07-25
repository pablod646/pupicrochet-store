import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Borramos todos los datos existentes para un reinicio limpio
  await prisma.productImage.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Creamos categorías
  const categoryAmigurumis = await prisma.category.create({
    data: {
      name: 'Amigurumis',
      slug: 'amigurumis',
      description: 'Tiernos muñecos tejidos a crochet.',
    },
  });

  const categorySonajeros = await prisma.category.create({
    data: {
      name: 'Sonajeros',
      slug: 'sonajeros',
      description: 'Sonajeros para bebés, seguros y divertidos.',
    },
  });

  const categoryMantas = await prisma.category.create({
    data: {
      name: 'Mantas de Apego',
      slug: 'mantas-de-apego',
      description: 'Mantas suaves para el apego de los más pequeños.',
    },
  });

  // Creamos los productos uno por uno para poder anidar la creación de imágenes y asociar categorías
  const product1 = await prisma.product.create({
    data: {
      name: 'Amigurumi de Pulpo',
      description: 'Un adorable pulpo tejido a mano con hilo de algodón hipoalergénico, perfecto para los más pequeños. Suave y seguro para abrazar.',
      price: 1500,
      dimensions: 'Aprox. 15cm de alto x 10cm de ancho',
      materials: 'Hilo de algodón 100% hipoalergénico, relleno de fibra sintética.',
      slug: 'amigurumi-de-pulpo',
      images: {
        create: [
          { url: 'https://placehold.co/600x600/e2c2e6/7d4e8a?text=Pulpo+1' },
          { url: 'https://placehold.co/600x600/d8b8dd/7d4e8a?text=Pulpo+2' },
          { url: 'https://placehold.co/600x600/cca9d4/7d4e8a?text=Pulpo+3' },
        ],
      },
      categories: {
        connect: [{ id: categoryAmigurumis.id }],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Sonajero de Elefante',
      description: 'Sonajero de madera natural y crochet con un diseño de elefante. Estimula los sentidos del bebé con su sonido suave y diferentes texturas.',
      price: 1200,
      dimensions: '12cm de largo',
      materials: 'Madera de haya sin tratar, hilo de algodón, cascabel interno.',
      slug: 'sonajero-de-elefante',
      images: {
        create: [
          { url: 'https://placehold.co/600x600/c2dbe6/4e7d8a?text=Elefante+1' },
          { url: 'https://placehold.co/600x600/b8d2e3/4e7d8a?text=Elefante+2' },
        ],
      },
      categories: {
        connect: [{ id: categorySonajeros.id }],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Manta de Apego Conejito',
      description: 'Una manta de apego ultra suave para acompañar a tu bebé en sus sueños. La cabeza de conejito es ideal para que las manitas pequeñas la agarren.',
      price: 2500,
      dimensions: '35cm x 35cm',
      materials: 'Tela de muselina suave, hilo de algodón.',
      slug: 'manta-de-apego-conejito',
      images: {
        create: [
          { url: 'https://placehold.co/600x600/c2e6d2/4e8a60?text=Conejito+1' },
          { url: 'https://placehold.co/600x600/b8e3c8/4e8a60?text=Conejito+2' },
          { url: 'https://placehold.co/600x600/aee0be/4e8a60?text=Conejito+3' },
          { url: 'https://placehold.co/600x600/a4dcb4/4e8a60?text=Conejito+4' },
        ],
      },
      categories: {
        connect: [{ id: categoryMantas.id }],
      },
    },
  });

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
