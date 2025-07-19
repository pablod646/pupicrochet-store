// src/routes/+page.server.ts
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export async function load() {
    //Usamos Prisma para obtener todos los productos
    const product = await Prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return {
        product
    };
}