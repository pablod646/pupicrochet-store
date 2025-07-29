<script lang="ts">
  import type { PageData } from './$types';
  import ProductCard from '../lib/components/ProductCard.svelte';
import FilterSidebar from '$lib/components/FilterSidebar.svelte';
import PaginationControls from '$lib/components/PaginationControls.svelte';

  export let data: PageData;
</script>

<div class="gap-1 px-6 flex flex-1 justify-center py-5">
  <FilterSidebar categories={data.categories} />

  <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
    <div class="flex flex-wrap justify-between items-center gap-3 p-4">
      <p class="text-[#1b0e15] tracking-light text-[32px] font-bold leading-tight min-w-72">Todos los Productos</p>
      <form method="GET" class="flex items-center gap-2">
        <label for="sort" class="text-[#1b0e15] text-base font-medium leading-normal">Ordenar por</label>
        <select
          id="sort"
          name="sort"
          class="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border border-[#e6d1dc] bg-[#fbf8fa] focus:border-[#955074] h-12 bg-[image:--select-button-svg] placeholder:text-[#955074] pl-4 pr-8 text-base font-normal leading-normal appearance-none"
          on:change={(e) => e.currentTarget.form?.submit()}
        >
          <option value="name_asc" selected={data.sort === 'name_asc'}>Nombre (A-Z)</option>
          <option value="name_desc" selected={data.sort === 'name_desc'}>Nombre (Z-A)</option>
          <option value="price_asc" selected={data.sort === 'price_asc'}>Precio (Bajo a Alto)</option>
          <option value="price_desc" selected={data.sort === 'price_desc'}>Precio (Alto a Bajo)</option>
        </select>
        <input type="hidden" name="category" value={data.categoryFilter} />
        <input type="hidden" name="q" value={data.query} />
      </form>
    </div>

    {#if data.products.length > 0}
      <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 p-4">
        {#each data.products as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {:else}
      <p class="p-4 text-center text-[#955074]">No se encontraron productos que coincidan con tu búsqueda.</p>
    {/if}

    <div class="p-4">
        <PaginationControls currentPage={data.currentPage} totalPages={data.totalPages} searchParams={data.searchParams} />
    </div>
  </div>
</div>