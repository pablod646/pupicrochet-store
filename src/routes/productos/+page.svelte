<script lang="ts">
	import type { PageData } from './$types';
	import ProductCard from '../lib/components/ProductCard.svelte';
	import FilterSidebar from '../../lib/components/FilterSidebar.svelte';
	import PaginationControls from '../../lib/components/PaginationControls.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto px-4">
	{#if data.searchQuery}
		<h1 class="text-3xl font-bold my-8">
			Resultados para: <span class="text-purple-700">{data.searchQuery}</span>
		</h1>
	{:else}
		<h1 class="text-3xl font-bold my-8">Nuestros Productos</h1>
	{/if}

	<div class="flex flex-row gap-8">
		<FilterSidebar categories={data.categories} selectedCategoryId={data.selectedCategoryId} />

		<main class="flex-1">
			{#if data.products.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each data.products as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>

				<PaginationControls currentPage={data.currentPage} totalPages={data.totalPages} />
			{:else}
				<p>No se encontraron productos que coincidan con tu búsqueda.</p>
			{/if}
		</main>
	</div>
</div>
