import { prisma } from '$lib/server/prisma';
import type { Category } from '@prisma/client';

export type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

export async function getCategoriesHierarchy(): Promise<CategoryWithChildren[]> {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null, // Fetch only top-level categories
    },
    include: {
      children: {
        include: {
          children: true, // Include nested children if needed, up to a certain depth
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  return categories as CategoryWithChildren[];
}
