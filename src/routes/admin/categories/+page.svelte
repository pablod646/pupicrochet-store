<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;
  export let form: ActionData;

  let newCategoryName = '';
  let selectedParentCategory: string | undefined;

  let message: string | null = null;
  let messageType: 'success' | 'error' | null = null;

  $: if (form?.message) {
    message = form.message;
    messageType = form.success ? 'success' : 'error';
    if (form.success) {
      newCategoryName = '';
      selectedParentCategory = undefined;
      invalidateAll();
    }
  }

  const handleDeleteCategory = () => {
    message = null;
    messageType = null;
    return async ({ result }) => {
      if (result.type === 'success') {
        message = result.data?.message || 'Categoría eliminada exitosamente!';
        messageType = 'success';
        await invalidateAll();
      } else if (result.type === 'failure') {
        message = result.data?.message || 'Fallo al eliminar la categoría.';
        messageType = 'error';
      } else if (result.type === 'error') {
        message = 'Ocurrió un error inesperado al eliminar la categoría.';
        messageType = 'error';
      }
    };
  };

  function renderCategoryOptions(categories: typeof data.categories, indent = 0) {
    let options = '';
    for (const category of categories) {
      const prefix = '&nbsp;'.repeat(indent * 4);
      options += `<option value="${category.id}">${prefix}${category.name}</option>`;
      if (category.children && category.children.length > 0) {
        options += renderCategoryOptions(category.children, indent + 1);
      }
    }
    return options;
  }
</script>

<h1 class="text-2xl font-bold mb-4">Administración de Categorías</h1>

{#if message}
  <p class="mt-4 {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">{message}</p>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <!-- Crear Nueva Categoría o Subcategoría -->
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Crear Nueva Categoría o Subcategoría</h2>
    <form method="POST" action="?/createCategoryOrSubcategory" use:enhance>
      <div class="mb-4">
        <label for="newName" class="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
        <input type="text" id="newName" name="name" bind:value={newCategoryName} required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label for="parentCategoryId" class="block text-gray-700 text-sm font-bold mb-2">Categoría Padre (Opcional):</label>
        <select id="parentCategoryId" name="parentCategoryId" bind:value={selectedParentCategory} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Ninguna (Crear Categoría Principal)</option>
          {@html renderCategoryOptions(data.categories)}
        </select>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear</button>
    </form>
  </div>
</div>

<div class="mt-8 bg-white p-6 rounded-lg shadow">
  <h2 class="text-xl font-semibold mb-4">Categorías Existentes</h2>
  {#if data.categories.length === 0}
    <p>No hay categorías creadas aún.</p>
  {:else}
    <ul class="space-y-4">
      {#each data.categories as category}
        <li class="border p-4 rounded-md bg-gray-50">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-bold">{category.name}</h3>
            <form method="POST" action="?/deleteCategory" use:enhance={handleDeleteCategory}>
              <input type="hidden" name="categoryId" value={category.id}>
              <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs" on:click={() => confirm('¿Estás seguro de que quieres eliminar esta categoría y todas sus subcategorías y desvincular productos?')}>Eliminar Categoría</button>
            </form>
          </div>
          {#if category.children.length > 0}
            <h4 class="font-semibold mt-2">Subcategorías:</h4>
            <ul class="ml-4 list-disc list-inside">
              {#each category.children as subcategory}
                <li class="flex justify-between items-center">
                  <span>{subcategory.name}</span>
                  <form method="POST" action="?/deleteCategory" use:enhance={handleDeleteCategory}>
                    <input type="hidden" name="categoryId" value={subcategory.id}>
                    <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs" on:click={() => confirm('¿Estás seguro de que quieres eliminar esta subcategoría y desvincular productos?')}>Eliminar Subcategoría</button>
                  </form>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-sm text-gray-600">No hay subcategorías para esta categoría.</p>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
