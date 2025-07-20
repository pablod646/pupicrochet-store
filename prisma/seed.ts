// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Borramos todos los datos existentes para un reinicio limpio
  await prisma.productImage.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.cart.deleteMany({});

  // Creamos los productos uno por uno para poder anidar la creación de imágenes
  const product1 = await prisma.product.create({
    data: {
      name: 'Amigurumi de Pulpo',
      description: 'Un adorable pulpo tejido a mano con hilo de algodón hipoalergénico, perfecto para los más pequeños. Suave y seguro para abrazar.',
      price: 1500,
      images: {
        create: [
          { url: 'https://placehold.co/600x600/e2c2e6/7d4e8a?text=Pulpo+1' },
          { url: 'https://placehold.co/600x600/d8b8dd/7d4e8a?text=Pulpo+2' },
          { url: 'https://placehold.co/600x600/cca9d4/7d4e8a?text=Pulpo+3' },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Sonajero de Elefante',
      description: 'Sonajero de madera natural y crochet con un diseño de elefante. Estimula los sentidos del bebé con su sonido suave y diferentes texturas.',
      price: 1200,
      images: {
        create: [
          { url: 'https://placehold.co/600x600/c2dbe6/4e7d8a?text=Elefante+1' },
          { url: 'https://placehold.co/600x600/b8d2e3/4e7d8a?text=Elefante+2' },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Manta de Apego Conejito',
      description: 'Una manta de apego ultra suave para acompañar a tu bebé en sus sueños. La cabeza de conejito es ideal para que las manitas pequeñas la agarren.',
      price: 2500,
      images: {
        create: [
          { url: 'https://placehold.co/600x600/c2e6d2/4e8a60?text=Conejito+1' },
          { url: 'https://placehold.co/600x600/b8e3c8/4e8a60?text=Conejito+2' },
          { url: 'https://placehold.co/600x600/aee0be/4e8a60?text=Conejito+3' },
          { url: 'https://placehold.co/600x600/a4dcb4/4e8a60?text=Conejito+4' },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1); // Comentado para evitar errores de tipo si 'process' no está definido globalmente
  })
  .finally(async () => {
    await prisma.$disconnect();
  });