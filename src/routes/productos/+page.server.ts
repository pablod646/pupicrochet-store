import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";
import type { Prisma, Product } from "@prisma/client";
import {
  getCategoriesHierarchy,
  type CategoryWithChildren,
} from "$lib/server/queries/categories";

const PAGE_SIZE = 9;

export const load: PageServerLoad = async ({ url }) => {
  const selectedCategoryId = url.searchParams.get("category");
  const searchQuery = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page") ?? "1");

  const where: Prisma.ProductWhereInput = {};

  if (selectedCategoryId) {
    where.categories = {
      some: {
        id: selectedCategoryId,
      },
    };
  }

  if (searchQuery) {
    where.name = {
      contains: searchQuery,
    };
  }

  let products: Product[];
  let totalProducts: number;

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    const productIds = await prisma.$queryRaw<{ id: string }[]>`
			SELECT id FROM Product
			WHERE LOWER(name) LIKE ${"%" + lowerCaseSearchQuery + "%"}
			LIMIT ${PAGE_SIZE}
			OFFSET ${(page - 1) * PAGE_SIZE}
		`;

    products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((p) => p.id),
        },
      },
      include: {
        categories: true,
        images: true,
      },
    });

    const totalProductsResult = await prisma.$queryRaw<{ count: bigint }[]>`
			SELECT COUNT(*) as count FROM Product
			WHERE LOWER(name) LIKE ${"%" + lowerCaseSearchQuery + "%"}
		`;
    totalProducts = Number(totalProductsResult[0].count);
  } else {
    totalProducts = await prisma.product.count({ where });

    products = await prisma.product.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        categories: true,
        images: true,
      },
    });
  }

  const categories: CategoryWithChildren[] = await getCategoriesHierarchy();

  return {
    products,
    categories,
    selectedCategoryId,
    searchQuery,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / PAGE_SIZE),
    sort: url.searchParams.get("sort") || "name_asc",
    categoryFilter: selectedCategoryId,
    query: searchQuery,
    searchParams: url.searchParams.toString(),
  };
};
