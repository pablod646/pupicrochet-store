<script lang="ts">
  import type { Category } from "@prisma/client";
  import { createEventDispatcher } from "svelte";
  import type { CategoryWithChildren } from "$lib/server/queries/categories";
  import Button from "./ui/Button.svelte";

  export let node: CategoryWithChildren;
  export let level = 0;
  export let selectedCategories: Category[] = [];
  export let highlightedCategory: Category | null = null;
  export let showAdminControls = false;
  export let onDelete: ((categoryId: string) => void) | undefined = undefined;
  export let onEdit: ((categoryId: string) => void) | undefined = undefined;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("categoryClick", node);
  }
</script>

<li>
  <div
    class="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
    class:bg-indigo-100={selectedCategories.some((c) => c.id === node.id)}
    class:text-indigo-800={selectedCategories.some((c) => c.id === node.id)}
    class:bg-blue-100={highlightedCategory?.id === node.id}
    class:opacity-50={selectedCategories.some((c) => c.id === node.id)}
    class:cursor-not-allowed={selectedCategories.some((c) => c.id === node.id)}
    style="padding-left: {level * 20 + 12}px;"
    on:click={handleClick}
    on:keydown={(e) => e.key === "Enter" && handleClick()}
    role="button"
    tabindex={selectedCategories.some((c) => c.id === node.id) ? -1 : 0}
  >
    <a
      href={`/productos?category=${node.slug}`}
      class="font-medium text-gray-900 hover:text-indigo-600"
      >{node.name}
      {#if node._count?.products !== undefined}({node._count
          .products}){:else}(0){/if}</a
    >

    {#if showAdminControls}
      <div class="flex space-x-2">
        <Button
          variant="secondary"
          on:click|stopPropagation={() => onEdit && onEdit(node.id)}
          class="!py-1 !px-2 !text-xs">Editar</Button
        >
        <Button
          variant="primary"
          on:click|stopPropagation={() => onDelete && onDelete(node.id)}
          class="!py-1 !px-2 !text-xs bg-red-600 hover:bg-red-700"
          >Eliminar</Button
        >
      </div>
    {/if}
  </div>

  {#if node.children && node.children.length > 0}
    <ul class="ml-4 border-l border-gray-200">
      {#each node.children as childNode (childNode.id)}
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
