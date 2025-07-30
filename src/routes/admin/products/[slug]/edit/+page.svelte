<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import CategorySelector from '$lib/components/CategorySelector.svelte';

  export let data: PageData;
  export let form: ActionData;

  let name = data.product.name;
  let description = data.product.description || '';
  let price = data.product.price;
  let materials = data.product.materials || '';
  let dimensions = data.product.dimensions || '';
  let imageUrl = data.product.images[0]?.url || '';
  let selectedCategoryIds = new Set(data.product.categories.map(c => c.id));

  let message: string | null = null;
  let messageType: 'success' | 'error' | null = null;

  $: if (form?.message) {
    message = form.message;
    messageType = form.success ? 'success' : 'error';
    if (form.success) {
      invalidateAll();
    }
  }

  
</script>

<h1 class="text-2xl font-bold mb-4">Editar Producto</h1>

{#if message}
  <p class="mt-4 {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">{message}</p>
{/if}

<form method="POST" action="?/updateProduct" use:enhance class="bg-white p-6 rounded-lg shadow">
  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
    <input type="text" id="name" name="name" bind:value={name} required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
    <textarea id="description" name="description" bind:value={description} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
  </div>

  <div class="mb-4">
    <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
    <input type="number" id="price" name="price" bind:value={price} required step="0.01" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="materials" class="block text-gray-700 text-sm font-bold mb-2">Materiales:</label>
    <input type="text" id="materials" name="materials" bind:value={materials} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="dimensions" class="block text-gray-700 text-sm font-bold mb-2">Dimensiones:</label>
    <input type="text" id="dimensions" name="dimensions" bind:value={dimensions} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="imageUrl" class="block text-gray-700 text-sm font-bold mb-2">URL de la Imagen:</label>
    <input type="url" id="imageUrl" name="imageUrl" bind:value={imageUrl} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="category-selector" class="block text-gray-700 text-sm font-bold mb-2">Categorías:</label>
    <div id="category-selector" class="border rounded p-2 max-h-60 overflow-y-auto">
      <CategorySelector
        allCategories={data.categories}
        initialSelectedCategories={data.product.categories}
        labelledby="category-selector"
      />
    </div>
    {#each Array.from(selectedCategoryIds) as categoryId}
      <input type="hidden" name="categoryIds" value={categoryId} />
    {/each}
  </div>

  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar Producto</button>
</form>