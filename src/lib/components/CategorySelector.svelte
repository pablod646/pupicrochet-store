<script lang="ts">
  import type { Category } from '@prisma/client';
  import CategoryNode from './CategoryNode.svelte';

  type CategoryHierarchy = Category & { children: CategoryHierarchy[] };

  export let allCategories: CategoryHierarchy[];
  export let initialSelectedCategories: Category[] = [];
  export let labelledby: string;

  let selectedCategories: Category[] = [...initialSelectedCategories];
  let highlightedCategory: Category | null = null;

  function handleCategoryClick(category: Category) {
    if (!selectedCategories.some((c) => c.id === category.id)) {
      highlightedCategory = category;
    }
  }

  function addHighlightedCategory() {
    if (highlightedCategory && !selectedCategories.some((c) => c.id === highlightedCategory!.id)) {
      selectedCategories = [...selectedCategories, highlightedCategory];
      highlightedCategory = null;
    }
  }

  function removeCategory(categoryToRemove: Category) {
    selectedCategories = selectedCategories.filter((c) => c.id !== categoryToRemove.id);
    if (highlightedCategory?.id === categoryToRemove.id) {
      highlightedCategory = null;
    }
  }
</script>

<div class="flex space-x-4" role="group" aria-labelledby={labelledby}>
  <!-- Panel Izquierdo: Categorías Seleccionadas -->
  <div class="w-1/2 border rounded p-4 bg-gray-50">
    <h3 class="font-bold mb-2">Categorías Seleccionadas:</h3>
    <div class="flex flex-wrap gap-2">
      {#each selectedCategories as category (category.id)}
        <div class="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {category.name}
          <button type="button" on:click={() => removeCategory(category)} class="text-blue-400 hover:text-blue-600">
            &times;
          </button>
        </div>
      {/each}
      {#if selectedCategories.length === 0}
        <p class="text-gray-500 text-sm">Ninguna categoría seleccionada.</p>
      {/if}
    </div>
    {#each selectedCategories as category (category.id)}
      <input type="hidden" name="categoryIds[]" value={category.id} />
    {/each}
  </div>

  <!-- Panel Derecho: Árbol Jerárquico de Categorías -->
  <div class="w-1/2 border rounded p-4 bg-white flex flex-col">
    <h3 class="font-bold mb-2">Seleccionar Categorías:</h3>
    <div class="flex-grow overflow-y-auto border p-2 rounded">
      <ul class="list-none p-0">
        {#each allCategories as category (category.id)}
          <CategoryNode
            node={category}
            level={0}
            {selectedCategories}
            {highlightedCategory}
            on:categoryClick={(event) => handleCategoryClick(event.detail)}
          />
        {/each}
      </ul>
    </div>
    <button
      type="button"
      on:click={addHighlightedCategory}
      disabled={!highlightedCategory || selectedCategories.some((c) => c.id === highlightedCategory!.id)}
      class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Agregar Categoría Seleccionada
    </button>
  </div>
</div>