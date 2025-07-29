import { prisma } from "$lib/server/prisma";
import type { Category } from "@prisma/client";

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
  _count?: { products: number };
};

export async function getCategoriesHierarchy(): Promise<
  CategoryWithChildren[]
> {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  const buildHierarchy = (
    categories: (Category & { _count?: { products: number } })[],
    parentId: string | null,
  ): CategoryWithChildren[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => ({
        ...category,
        children: buildHierarchy(categories, category.id),
      }));
  };

  return buildHierarchy(categories, null);
}
