<script lang="ts">
  import type { Category } from "@prisma/client";
  import CategoryNode from "./CategoryNode.svelte";
  import Button from "./ui/Button.svelte";

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
    if (
      highlightedCategory &&
      !selectedCategories.some((c) => c.id === highlightedCategory!.id)
    ) {
      selectedCategories = [...selectedCategories, highlightedCategory];
      highlightedCategory = null;
    }
  }

  function removeCategory(categoryToRemove: Category) {
    selectedCategories = selectedCategories.filter(
      (c) => c.id !== categoryToRemove.id,
    );
    if (highlightedCategory?.id === categoryToRemove.id) {
      highlightedCategory = null;
    }
  }
</script>

<div
  class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
  role="group"
  aria-labelledby={labelledby}
>
  <!-- Panel Izquierdo: Categorías Seleccionadas -->
  <div
    class="w-full md:w-1/2 border border-gray-300 rounded-lg shadow-sm p-4 bg-white"
  >
    <h3 class="text-lg font-semibold text-gray-900 mb-3">
      Categorías Seleccionadas:
    </h3>
    <div class="flex flex-wrap gap-2 min-h-[40px]">
      {#each selectedCategories as category (category.id)}
        <span
          class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800"
        >
          {category.name}
          <button
            type="button"
            on:click={() => removeCategory(category)}
            class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
          >
            <span class="sr-only">Remove large chip</span>
            <svg
              class="h-2 w-2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M1 1l6 6m0-6L1 7"
              />
            </svg>
          </button>
        </span>
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
  <div
    class="w-full md:w-1/2 border border-gray-300 rounded-lg shadow-sm p-4 bg-white flex flex-col"
  >
    <h3 class="text-lg font-semibold text-gray-900 mb-3">
      Seleccionar Categorías:
    </h3>
    <div
      class="flex-grow overflow-y-auto border border-gray-200 rounded-md p-2"
    >
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
    <Button
      variant="primary"
      on:click={addHighlightedCategory}
      disabled={!highlightedCategory ||
        selectedCategories.some((c) => c.id === highlightedCategory!.id)}
      class="mt-4 w-full"
    >
      Agregar Categoría Seleccionada
    </Button>
  </div>
</div>
