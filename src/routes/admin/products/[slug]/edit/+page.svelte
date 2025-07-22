<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import type { Category } from '@prisma/client';

  type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

  export let data: PageData;
  export let form: ActionData;

  let product = data.product;
  let imageUrls: string[] = product.images.map(img => img.url);
  let existingImageIds: string[] = product.images.map(img => img.id);

  let selectedCategories: Category[] = product.categories || [];
  let searchTerm = '';
  let showSuggestions = false;

  function addImageUrlInput() {
    imageUrls = [...imageUrls, ''];
  }

  function removeImageUrlInput(index: number) {
    const removedId = existingImageIds[index];
    if (removedId) {
      // Mark for deletion if it's an existing image
      // (This logic is handled server-side by comparing existingImageIds with current images)
    }
    imageUrls = imageUrls.filter((_, i) => i !== index);
    existingImageIds = existingImageIds.filter((_, i) => i !== index);
  }

  const handleSubmit = () => {
    return async ({ result }: { result: import('@sveltejs/kit').ActionResult<{ message?: string }> }) => {
      if (result.type === 'success') {
        form = { success: true, message: result.data?.message || 'Producto actualizado exitosamente!' };
      } else if (result.type === 'failure') {
        form = { success: false, message: result.data?.message || 'Fallo al actualizar el producto.' };
      } else if (result.type === 'error') {
        form = { success: false, message: 'Ocurrió un error inesperado.' };
      }
    };
  };

  function flattenCategories(categories: CategoryWithChildren[]): Category[] {
    let flat: Category[] = [];
    for (const category of categories) {
      flat.push(category);
      if (category.children && category.children.length > 0) {
        flat = flat.concat(flattenCategories(category.children));
      }
    }
    return flat;
  }

  $: allCategories = flattenCategories(data.categories);
  $: filteredCategories = searchTerm
    ? allCategories.filter(
        category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedCategories.some(sc => sc.id === category.id)
      )
    : [];

  function selectCategory(category: Category) {
    selectedCategories = [...selectedCategories, category];
    searchTerm = '';
    showSuggestions = false;
  }

  function removeCategory(category: Category) {
    selectedCategories = selectedCategories.filter(c => c.id !== category.id);
  }
</script>

<h1 class="text-2xl font-bold mb-4">Editar Producto: {product.name}</h1>

<form method="POST" action="?/updateProduct" use:enhance={handleSubmit}>
  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto:</label>
    <input type="text" id="name" name="name" required bind:value={product.name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
    <textarea id="description" name="description" required bind:value={product.description} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
  </div>

  <div class="mb-4">
    <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
    <input type="number" id="price" name="price" required bind:value={product.price} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="categories" class="block text-gray-700 text-sm font-bold mb-2">Categorías:</label>
    <div class="relative">
      <div class="flex flex-wrap gap-2 p-2 border rounded bg-white">
        {#each selectedCategories as category}
          <div class="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {category.name}
            <button type="button" on:click={() => removeCategory(category)} class="text-blue-400 hover:text-blue-600">
              &times;
            </button>
          </div>
        {/each}
        <input
          type="text"
          bind:value={searchTerm}
          on:focus={() => showSuggestions = true}
          on:blur={() => setTimeout(() => showSuggestions = false, 200)}
          class="flex-grow p-1 focus:outline-none"
          placeholder="Buscar categorías..."
        />
      </div>
      {#if showSuggestions && filteredCategories.length > 0}
        <ul class="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto">
          {#each filteredCategories as category}
            <li on:mousedown={() => selectCategory(category)} class="p-2 hover:bg-gray-100 cursor-pointer">
              {category.name}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    {#each selectedCategories as category}
      <input type="hidden" name="categoryIds[]" value={category.id} />
    {/each}
  </div>

  <div class="mb-4">
    <label for="dimensions" class="block text-gray-700 text-sm font-bold mb-2">Dimensiones (Opcional):</label>
    <input type="text" id="dimensions" name="dimensions" bind:value={product.dimensions} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="materials" class="block text-gray-700 text-sm font-bold mb-2">Materiales (Opcional):</label>
    <input type="text" id="materials" name="materials" bind:value={product.materials} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <fieldset class="mb-4">
    <legend class="block text-gray-700 text-sm font-bold mb-2">URLs de Imágenes:</legend>
    {#each imageUrls as url, i}
      <div class="flex items-center mb-2">
        <input
          type="url"
          name="imageUrls[]"
          placeholder="URL de Imagen {i + 1}"
          bind:value={imageUrls[i]}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <input type="hidden" name="existingImageIds[]" value={existingImageIds[i] || ''} />
        {#if imageUrls.length > 1}
          <button type="button" on:click={() => removeImageUrlInput(i)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">Eliminar</button>
        {/if}
      </div>
    {/each}
    <button type="button" on:click={addImageUrlInput} class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">Añadir URL de Imagen</button>
  </fieldset>

  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar Producto</button>

  {#if form?.message}
    <p class="mt-4 {form.success ? 'text-green-500' : 'text-red-500'}">{form.message}</p>
  {/if}
</form>
