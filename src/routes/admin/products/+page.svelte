<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;

  let message: string | null = null;
  let messageType: 'success' | 'error' | null = null;

  const handleDelete = () => {
    message = null;
    messageType = null;
    return async ({ result }) => {
      if (result.type === 'success') {
        message = result.data?.message || 'Producto eliminado exitosamente!';
        messageType = 'success';
        await invalidateAll(); // Refresh the product list
      } else if (result.type === 'failure') {
        message = result.data?.message || 'Fallo al eliminar el producto.';
        messageType = 'error';
      } else if (result.type === 'error') {
        message = 'Ocurrió un error inesperado al eliminar el producto.';
        messageType = 'error';
      }
    };
  };
</script>

<h1 class="text-2xl font-bold mb-4">Gestión de Productos</h1>

<a href="/admin/products/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">Añadir Nuevo Producto</a>

{#if message}
  <p class="mt-4 {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">{message}</p>
{/if}

<div class="overflow-x-auto">
  <table class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b">Imagen</th>
        <th class="py-2 px-4 border-b">Nombre</th>
        <th class="py-2 px-4 border-b">Precio</th>
        <th class="py-2 px-4 border-b">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each data.products as product}
        <tr class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b">
            {#if product.images && product.images.length > 0}
              <img src={product.images[0].url} alt={product.name} class="w-16 h-16 object-cover rounded" />
            {:else}
              <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">Sin Imagen</div>
            {/if}
          </td>
          <td class="py-2 px-4 border-b">{product.name}</td>
          <td class="py-2 px-4 border-b">${product.price}</td>
          <td class="py-2 px-4 border-b">
            <a href="/admin/products/{product.slug}/edit" class="text-blue-600 hover:underline mr-2">Editar</a>
            <form method="POST" action="?/deleteProduct" use:enhance={handleDelete}>
              <input type="hidden" name="productSlug" value={product.slug}>
              <button type="submit" class="text-red-600 hover:underline" on:click={() => confirm('¿Estás seguro de que quieres eliminar este producto?')}>Eliminar</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
