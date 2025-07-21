<script lang="ts">
	import CategoryItem from './CategoryItem.svelte';

	export let categories: any[] = []; // Will be Category & { children: CategoryWithChildren[]; _count: { products: number } }[]
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
			<CategoryItem {category} />
		{/each}
	</ul>
</aside>
