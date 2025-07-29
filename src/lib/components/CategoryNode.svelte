<script lang="ts">
  import type { Category } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';
  import type { CategoryWithChildren } from "$lib/server/queries/categories";

  export let node: CategoryWithChildren;
  export let level = 0;
  export let selectedCategories: Category[] = [];
  export let highlightedCategory: Category | null = null;
  export let showAdminControls = false;
  export let onDelete: ((categoryId: string) => void) | undefined = undefined;
  export let onEdit: ((categoryId: string) => void) | undefined = undefined;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('categoryClick', node);
  }
</script>

<li>
  <div
    class="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
    class:bg-green-100={selectedCategories.some((c) => c.id === node.id)}
    class:text-green-800={selectedCategories.some((c) => c.id === node.id)}
    class:bg-blue-200={highlightedCategory?.id === node.id}
    class:opacity-50={selectedCategories.some((c) => c.id === node.id)}
    class:cursor-not-allowed={selectedCategories.some((c) => c.id === node.id)}
    style="padding-left: {level * 20 + 8}px;"
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
    role="button"
    tabindex={selectedCategories.some((c) => c.id === node.id) ? -1 : 0}
  >
    <a href={`/productos?category=${node.slug}`} class="font-semibold">{node.name} {#if node._count?.products !== undefined}({node._count.products}){:else}(0){/if}</a>

    {#if showAdminControls}
      <div>
        <button on:click|stopPropagation={() => onEdit && onEdit(node.id)} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs mr-2">Editar</button>
        <button on:click|stopPropagation={() => onDelete && onDelete(node.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">Eliminar</button>
      </div>
    {/if}
  </div>

  {#if node.children && node.children.length > 0}
    <ul class="ml-4">
      {#each node.children as childNode}
        <svelte:self
          node={childNode}
          level={level + 1}
          {selectedCategories}
          {highlightedCategory}
          {showAdminControls}
          {onDelete}
          {onEdit}
          on:categoryClick
        />
      {/each}
    </ul>
  {/if}
</li>