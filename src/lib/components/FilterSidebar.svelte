<script lang="ts">
	import type { Category } from '@prisma/client';

	export let categories: Category[] = [];
	export let selectedCategoryId: string | null = null;
</script>

<aside class="w-64 p-4 border-r flex-shrink-0">
	<h2 class="text-xl font-bold mb-4">Categorías</h2>
	<ul>
		<li class="mb-2">
			<a
				href="/productos"
				class="hover:underline"
				class:font-bold={!selectedCategoryId}>Todas</a
			>
		</li>
		{#each categories as category (category.id)}
			<li class="mb-2">
				<a
					href={`/productos?category=${category.id}`}
					class="hover:underline"
					class:font-bold={selectedCategoryId === category.id}>{category.name}</a
				>
			</li>
		{/each}
	</ul>
</aside>
