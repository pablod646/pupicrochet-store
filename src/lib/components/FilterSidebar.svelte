<script lang="ts">
  import type { Category } from '@prisma/client';
  import CategoryNode from './CategoryNode.svelte';

  type CategoryWithProductCount = Category & { _count: { products: number }; children: CategoryWithProductCount[] };

  export let categories: CategoryWithProductCount[];

  let showCategories = true;
</script>

<div class="layout-content-container flex flex-col w-80">
  <h2 class="text-[#1b0e15] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Filtros</h2>

  <!-- Category Filter -->
  <div class="flex flex-col p-3">
    <button on:click={() => (showCategories = !showCategories)} class="flex items-center justify-between w-full px-1 py-2">
      <p class="text-[#1b0e15] text-base font-medium leading-normal">Categoría</p>
      <div class="text-[#1b0e15] transition-transform duration-200" class:rotate-180={!showCategories}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
    </button>
    {#if showCategories}
      <div class="pl-4 pt-2">
        <ul class="space-y-2">
          {#each categories as category}
            <CategoryNode node={category} />
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <!-- Price Range Filter -->
  <div class="relative flex w-full flex-col items-start justify-between gap-3 p-4">
    <p class="text-[#1b0e15] text-base font-medium leading-normal w-full">Rango de Precio</p>
    <div class="flex h-[38px] w-full pt-1.5">
      <div class="flex h-1 w-full rounded-sm bg-[#e6d1dc] items-center">
        <div class="w-[20%] h-1 bg-transparent"></div>
        <div class="relative h-1 flex-1 bg-[#5d0d36]">
            <div class="absolute -left-2 -top-1.5 size-4 rounded-full bg-[#5d0d36] cursor-pointer"></div>
            <div class="absolute -right-2 -top-1.5 size-4 rounded-full bg-[#5d0d36] cursor-pointer"></div>
        </div>
        <div class="w-[15%] h-1 bg-transparent"></div>
      </div>
    </div>
    <div class="flex justify-between w-full text-sm text-[#1b0e15] -mt-2">
        <span>$0</span>
        <span>$1000</span>
    </div>
  </div>
</div>