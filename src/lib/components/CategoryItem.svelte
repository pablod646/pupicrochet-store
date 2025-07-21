<script lang="ts">
  import { page } from '$app/stores';

  export let category: any; // Will be Category & { children: CategoryWithChildren[]; _count: { products: number } }
  export let level: number = 0;

  $: isSelected = $page.url.searchParams.get('category') === category.id;
  $: href = `/productos?category=${category.id}`;
</script>

<li>
  <a
    href={href}
    class="hover:underline flex justify-between items-center py-1 pr-2"
    class:font-bold={isSelected}
    style="padding-left: {level * 10}px;"
  >
    <span>{category.name}</span>
    <span class="text-gray-500 text-sm">({category._count.products})</span>
  </a>
  {#if category.children && category.children.length > 0}
    <ul class="ml-2">
      {#each category.children as childCategory}
        <svelte:self category={childCategory} level={level + 1} />
      {/each}
    </ul>
  {/if}
</li>
