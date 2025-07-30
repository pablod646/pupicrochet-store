<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import CategoryNode from "$lib/components/CategoryNode.svelte";
  import CategoryOption from "$lib/components/CategoryOption.svelte";

  export let data: PageData;
  export let form: ActionData;

  let newCategoryName = "";
  let selectedParentCategory: string | undefined;

  let message: string | null = null;
  let messageType: "success" | "error" | null = null;

  $: if (form?.message) {
    message = form.message;
    messageType = form.success ? "success" : "error";
    if (form.success) {
      newCategoryName = "";
      selectedParentCategory = undefined;
      invalidateAll();
    }
  }
</script>

<h1 class="text-2xl font-bold mb-4">Administración de Categorías</h1>

{#if message}
  <p
    class="mt-4 {messageType === 'success' ? 'text-green-500' : 'text-red-500'}"
  >
    {message}
  </p>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <!-- Crear Nueva Categoría o Subcategoría -->
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">
      Crear Nueva Categoría o Subcategoría
    </h2>
    <form method="POST" action="?/createCategoryOrSubcategory" use:enhance>
      <div class="mb-4">
        <label for="newName" class="block text-gray-700 text-sm font-bold mb-2"
          >Nombre:</label
        >
        <input
          type="text"
          id="newName"
          name="name"
          bind:value={newCategoryName}
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label
          for="parentCategoryId"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Categoría Padre (Opcional):</label
        >
        <select
          id="parentCategoryId"
          name="parentCategoryId"
          bind:value={selectedParentCategory}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Ninguna (Crear Categoría Principal)</option>
          {#each data.categories as category (category.id)}
            <CategoryOption {category} />
          {/each}
        </select>
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Crear</button
      >
    </form>
  </div>
</div>

<div class="mt-8 bg-white p-6 rounded-lg shadow">
  <h2 class="text-xl font-semibold mb-4">Categorías Existentes</h2>
  {#if data.categories.length === 0}
    <p>No hay categorías creadas aún.</p>
  {:else}
    <ul class="space-y-4">
      {#each data.categories as category (category.id)}
        <CategoryNode
          node={category}
          showAdminControls={true}
          onDelete={(id) => {
            if (
              confirm(
                "¿Estás seguro de que quieres eliminar esta categoría y todas sus subcategorías y desvincular productos?",
              )
            ) {
              // Manually trigger form submission for delete
              const formElement = document.createElement("form");
              formElement.method = "POST";
              formElement.action = "?/deleteCategory";
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = "categoryId";
              input.value = id;
              formElement.appendChild(input);
              document.body.appendChild(formElement);
              formElement.submit();
              document.body.removeChild(formElement);
            }
          }}
          onEdit={(id) => {
            window.location.href = `/admin/categories/${id}/edit`;
          }}
        />
      {/each}
    </ul>
  {/if}
</div>
