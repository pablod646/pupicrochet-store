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
        message = result.data?.message || 'Usuario eliminado exitosamente.';
        messageType = 'success';
        await invalidateAll(); // Refresh the user list
      } else if (result.type === 'failure') {
        message = result.data?.message || 'Fallo al eliminar el usuario.';
        messageType = 'error';
      } else if (result.type === 'error') {
        message = 'Ocurrió un error inesperado al eliminar el usuario.';
        messageType = 'error';
      }
    };
  };
</script>

<h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

{#if message}
  <p class="mt-4 {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">{message}</p>
{/if}

<div class="overflow-x-auto">
  <table class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b">ID</th>
        <th class="py-2 px-4 border-b">Correo Electrónico</th>
        <th class="py-2 px-4 border-b">Nombre</th>
        <th class="py-2 px-4 border-b">Rol</th>
        <th class="py-2 px-4 border-b">Fecha de Creación</th>
        <th class="py-2 px-4 border-b">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each data.users as user}
        <tr class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b text-sm">{user.id}</td>
          <td class="py-2 px-4 border-b">{user.email}</td>
          <td class="py-2 px-4 border-b">{user.name || 'N/A'}</td>
          <td class="py-2 px-4 border-b">{user.role}</td>
          <td class="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
          <td class="py-2 px-4 border-b">
            <a href="/admin/users/{user.id}/edit" class="text-blue-600 hover:underline mr-2">Editar</a>
            <form method="POST" action="?/deleteUser" use:enhance={handleDelete}>
              <input type="hidden" name="userId" value={user.id}>
              <button type="submit" class="text-red-600 hover:underline" on:click={() => confirm('¿Estás seguro de que quieres eliminar a este usuario?')}>Eliminar</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
