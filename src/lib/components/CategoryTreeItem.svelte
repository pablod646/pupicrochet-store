<script lang="ts">
  import type { Category } from '@prisma/client';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let category: Category & { children?: Category[] };
  export let level: number = 0;

  let message: string | null = null;
  let messageType: 'success' | 'error' | null = null;

  const handleDeleteCategory = () => {
    message = null;
    messageType = null;
    return async ({ result }: { result: import('@sveltejs/kit').ActionResult<{ message?: string }> }) => {
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
</script>

<li class="border p-2 rounded-md bg-gray-50 mb-2" style="margin-left: {level * 20}px;">
  <div class="flex justify-between items-center">
    <span class="font-semibold">{category.name}</span>
    <div>
      <a href="/admin/categories/{category.id}/edit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs mr-2">Editar</a>
      <form method="POST" action="?/deleteCategory" use:enhance={handleDeleteCategory}>
        <input type="hidden" name="categoryId" value={category.id}>
        <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs" on:click={() => confirm('¿Estás seguro de que quieres eliminar esta categoría y todas sus subcategorías y desvincular productos?')}>Eliminar</button>
      </form>
    </div>
  </div>
  {#if category.children && category.children.length > 0}
    <ul class="mt-2">
      {#each category.children as childCategory}
        <svelte:self category={childCategory} level={level + 1} />
      {/each}
    </ul>
  {/if}
</li>
