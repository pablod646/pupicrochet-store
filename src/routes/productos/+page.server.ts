import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import type { Prisma } from '@prisma/client';

const PAGE_SIZE = 9;

export const load: PageServerLoad = async ({ url }) => {
	const selectedCategoryId = url.searchParams.get('category');
	const searchQuery = url.searchParams.get('search');
	const page = parseInt(url.searchParams.get('page') ?? '1');

	const where: Prisma.ProductWhereInput = {};

	if (selectedCategoryId) {
		where.categoryId = selectedCategoryId;
	}

	if (searchQuery) {
		where.name = {
			contains: searchQuery,
			mode: 'insensitive'
		};
	}

	const totalProducts = await prisma.product.count({ where });

	const products = await prisma.product.findMany({
		where,
		skip: (page - 1) * PAGE_SIZE,
		take: PAGE_SIZE,
		include: {
			category: true,
			images: true
		}
	});

	const categories = await prisma.category.findMany({
		orderBy: {
			name: 'asc'
		}
	});

	return {
		products,
		categories,
		selectedCategoryId,
		searchQuery,
		currentPage: page,
		totalPages: Math.ceil(totalProducts / PAGE_SIZE)
	};
};
