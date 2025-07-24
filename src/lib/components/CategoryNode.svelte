<script lang="ts">
  import type { Category } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';

  type CategoryNode = Category & { children: CategoryNode[] };

  export let node: CategoryNode;
  export let level = 0;
  export let selectedCategories: Category[] = [];
  export let highlightedCategory: Category | null = null;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('categoryClick', node);
  }
</script>

<li>
  <div
    class="p-2 cursor-pointer hover:bg-gray-100"
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
    {node.name}
  </div>

  {#if node.children && node.children.length > 0}
    <ul class="ml-4">
      {#each node.children as childNode}
        <svelte:self
          node={childNode}
          level={level + 1}
          {selectedCategories}
          {highlightedCategory}
          on:categoryClick
        />
      {/each}
    </ul>
  {/if}
</li>
