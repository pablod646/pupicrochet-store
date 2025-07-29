import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";
import type { Prisma } from "@prisma/client";

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

  let products: any[];
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

    const totalProductsResult = await prisma.$queryRaw<{ count: number }[]>`
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

  const allCategories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  // Build a map for quick lookup and to store children
  const categoryMap = new Map<string, any>();
  allCategories.forEach((cat) => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  // Build the hierarchical structure
  const nestedCategories: any[] = [];
  allCategories.forEach((cat) => {
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId);
      if (parent) {
        parent.children.push(categoryMap.get(cat.id));
      }
    } else {
      nestedCategories.push(categoryMap.get(cat.id));
    }
  });

  // Sort top-level categories and their children by name
  function sortCategories(cats: any[]) {
    cats.sort((a, b) => a.name.localeCompare(b.name));
    cats.forEach((cat) => {
      if (cat.children.length > 0) {
        sortCategories(cat.children);
      }
    });
  }

  sortCategories(nestedCategories);

  return {
    products,
    categories: nestedCategories,
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
