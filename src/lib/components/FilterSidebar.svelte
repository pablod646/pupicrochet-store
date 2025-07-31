<script lang="ts">
  import type { Category } from "@prisma/client";
  import CategoryNode from "./CategoryNode.svelte";

  type CategoryWithProductCount = Category & {
    _count: { products: number };
    children: CategoryWithProductCount[];
  };

  export let categories: CategoryWithProductCount[];

  let showCategories = true;
  let showPriceRange = true;
</script>

<div class="w-80 bg-white shadow-md rounded-lg p-4">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">Filtros</h2>

  <!-- Category Filter -->
  <div class="border-b border-gray-200 pb-4 mb-4">
    <button
      on:click={() => (showCategories = !showCategories)}
      class="flex items-center justify-between w-full py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
    >
      <p class="text-lg font-semibold">Categoría</p>
      <svg
        class="w-5 h-5 transform transition-transform duration-200"
        class:rotate-180={!showCategories}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    {#if showCategories}
      <div class="mt-2">
        <ul class="space-y-1">
          {#each categories as category (category.id)}
            <CategoryNode node={category} />
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <!-- Price Range Filter -->
  <div class="pb-4 mb-4">
    <button
      on:click={() => (showPriceRange = !showPriceRange)}
      class="flex items-center justify-between w-full py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
    >
      <p class="text-lg font-semibold">Rango de Precio</p>
      <svg
        class="w-5 h-5 transform transition-transform duration-200"
        class:rotate-180={!showPriceRange}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    {#if showPriceRange}
      <div class="mt-4">
        <div class="relative pt-1">
          <input
            type="range"
            min="0"
            max="1000"
            value="0"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value="1000"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div class="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    {/if}
  </div>
</div>
