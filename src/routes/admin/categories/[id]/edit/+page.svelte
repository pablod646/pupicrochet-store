<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import type { Category } from '@prisma/client';

  type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

  export let data: PageData;
  export let form: ActionData;

  let category = data.category as CategoryWithChildren;
  let selectedParentCategory: string | undefined = category.parentId || undefined;

  const handleSubmit = () => {
    return async ({ result }: { result: import('@sveltejs/kit').ActionResult<{ message?: string }> }) => {
      if (result.type === 'success') {
        form = { success: true, message: result.data?.message || 'Categoría actualizada exitosamente!' };
      } else if (result.type === 'failure') {
        form = { success: false, message: result.data?.message || 'Fallo al actualizar la categoría.' };
      } else if (result.type === 'error') {
        form = { success: false, message: 'Ocurrió un error inesperado.' };
      }
    };
  };

  function renderCategoryOptions(categories: CategoryWithChildren[], indent = 0) {
    let options = '';
    for (const cat of categories) {
      // Exclude the current category from being its own parent or a child of itself
      if (cat.id === category.id) continue;

      const prefix = '&nbsp;'.repeat(indent * 4);
      options += `<option value="${cat.id}">${prefix}${cat.name}</option>`;
      if (cat.children && cat.children.length > 0) {
        options += renderCategoryOptions(cat.children, indent + 1);
      }
    }
    return options;
  }
</script>

<h1 class="text-2xl font-bold mb-4">Editar Categoría: {category.name}</h1>

<form method="POST" action="?/updateCategory" use:enhance={handleSubmit}>
  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
    <input type="text" id="name" name="name" required bind:value={category.name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="parentId" class="block text-gray-700 text-sm font-bold mb-2">Categoría Padre (Opcional):</label>
    <select id="parentId" name="parentId" bind:value={selectedParentCategory} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <option value="">Ninguna (Categoría Principal)</option>
      {@html renderCategoryOptions(data.categories)}
    </select>
  </div>

  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar Categoría</button>

  {#if form?.message}
    <p class="mt-4 {form.success ? 'text-green-500' : 'text-red-500'}">{form.message}</p>
  {/if}
</form>
