<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  import { UserRole } from "@prisma/client";

  export let data: PageData;
  export let form: ActionData;

  let user = data.user;

  const handleSubmit = () => {
    return async ({
      result,
    }: {
      result: import("@sveltejs/kit").ActionResult<{ message?: string }>;
    }) => {
      if (result.type === "success") {
        form = {
          success: true,
          message: result.data?.message || "Usuario actualizado exitosamente!",
        };
      } else if (result.type === "failure") {
        form = {
          success: false,
          message: result.data?.message || "Fallo al actualizar el usuario.",
        };
      } else if (result.type === "error") {
        form = { success: false, message: "Ocurrió un error inesperado." };
      }
    };
  };
</script>

<h1 class="text-2xl font-bold mb-4">Editar Usuario: {user.email}</h1>

<form method="POST" action="?/updateUser" use:enhance={handleSubmit}>
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
      >Correo Electrónico:</label
    >
    <input
      type="email"
      id="email"
      name="email"
      required
      bind:value={user.email}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
      >Nombre:</label
    >
    <input
      type="text"
      id="name"
      name="name"
      bind:value={user.name}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="mb-4">
    <label for="role" class="block text-gray-700 text-sm font-bold mb-2"
      >Rol:</label
    >
    <select
      id="role"
      name="role"
      bind:value={user.role}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      {#each Object.values(UserRole) as role (role)}
        <option value={role}>{role}</option>
      {/each}
    </select>
  </div>

  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >Actualizar Usuario</button
  >

  {#if form?.message}
    <p class="mt-4 {form.success ? 'text-green-500' : 'text-red-500'}">
      {form.message}
    </p>
  {/if}
</form>
