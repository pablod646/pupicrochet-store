// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Borramos todos los productos existentes
    await prisma.product.deleteMany({});

    await prisma.product.create({
    data: {
      name: 'Amigurumi de Pulpo',
      description: 'Un adorable pulpo tejido a mano con hilo de algodón hipoalergénico, perfecto para los más pequeños. Suave y seguro para abrazar.',
      price: 1500,
      imageUrl: 'https://placehold.co/600x600/e2c2e6/7d4e8a?text=Pupicrochet',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Sonajero de Elefante',
      description: 'Sonajero de madera natural y crochet con un diseño de elefante. Estimula los sentidos del bebé con su sonido suave y diferentes texturas.',
      price: 1200,
      imageUrl: 'https://placehold.co/600x600/c2dbe6/4e7d8a?text=Pupicrochet',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Manta de Apego Conejito',
      description: 'Una manta de apego ultra suave para acompañar a tu bebé en sus sueños. La cabeza de conejito es ideal para que las manitas pequeñas la agarren.',
      price: 2500,
      imageUrl: 'https://placehold.co/600x600/c2e6d2/4e8a60?text=Pupicrochet',
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