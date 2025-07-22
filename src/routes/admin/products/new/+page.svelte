<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { ActionData, PageData } from './$types';
  import CategorySelector from '$lib/components/CategorySelector.svelte';

  export let form: ActionData;
  export let data: PageData;

  // Lógica para la carga de imágenes (simplificada por ahora)
  let files: FileList;
  let feedbackMessage = '';

  const handleSubmit = () => {
    return async ({ result }: { result: import('@sveltejs/kit').ActionResult<{ message?: string; productSlug?: string }> }) => {
      if (result.type === 'success') {
        feedbackMessage = result.data?.message || 'Producto creado exitosamente!';
        if (result.data?.productSlug) {
          setTimeout(() => {
            goto(`/admin/products/${result.data!.productSlug}/edit`);
          }, 1500);
        }
      } else if (result.type === 'failure') {
        feedbackMessage = result.data?.message || 'Fallo al crear el producto.';
      } else if (result.type === 'error') {
        feedbackMessage = 'Ocurrió un error inesperado.';
      }
    };
  };
</script>

<div class="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
  <div class="flex flex-wrap justify-between gap-3 p-4">
    <p class="text-[#1b0e15] tracking-light text-[32px] font-bold leading-tight min-w-72">Crear un producto</p>
  </div>

  <form method="POST" action="?/createProduct" use:enhance={handleSubmit} enctype="multipart/form-data">
    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1" for="name">
        <span class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Nombre del producto</span>
        <input
          id="name"
          name="name"
          placeholder="Ej. Amigurumi de Pulpo"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border border-[#e6d1dc] bg-[#fbf8fa] focus:border-[#955074] h-14 placeholder:text-[#955074] p-[15px] text-base font-normal leading-normal"
          required
        />
      </label>
    </div>

    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1" for="description">
        <span class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Descripción</span>
        <textarea
          id="description"
          name="description"
          placeholder="Describe tu producto, sus materiales, dimensiones, etc."
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border border-[#e6d1dc] bg-[#fbf8fa] focus:border-[#955074] min-h-36 placeholder:text-[#955074] p-[15px] text-base font-normal leading-normal"
          required
        ></textarea>
      </label>
    </div>

    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1" for="price">
        <span class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Precio</span>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Ej. 25.00"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border border-[#e6d1dc] bg-[#fbf8fa] focus:border-[#955074] h-14 placeholder:text-[#955074] p-[15px] text-base font-normal leading-normal"
          required
          step="0.01"
        />
      </label>
    </div>

    <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label class="flex flex-col min-w-40 flex-1" for="stock">
        <span class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Cantidad</span>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Ej. 10"
          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border border-[#e6d1dc] bg-[#fbf8fa] focus:border-[#955074] h-14 placeholder:text-[#955074] p-[15px] text-base font-normal leading-normal"
          required
        />
      </label>
    </div>

    <div class="px-4 py-3">
      <p class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Categorías</p>
      <div class="p-4 border border-[#e6d1dc] rounded-xl bg-[#fbf8fa]">
        <CategorySelector allCategories={data.categories} />
      </div>
    </div>

    <div class="flex flex-col p-4">
        <p class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Imágenes del producto</p>
        <label for="image-upload" class="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#e6d1dc] px-6 py-14 cursor-pointer hover:bg-[#f3e8ed]">
            <div class="flex max-w-[480px] flex-col items-center gap-2">
                <p class="text-[#1b0e15] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Arrastra y suelta imágenes aquí, o haz clic para explorar</p>
                <p class="text-[#955074] text-sm font-normal leading-normal max-w-[480px] text-center">
                    {#if files && files.length}
                        {files.length} archivo(s) seleccionado(s)
                    {:else}
                        (PNG, JPG, WEBP)
                    {/if}
                </p>
            </div>
            <input id="image-upload" name="imageUrls" type="file" class="hidden" multiple bind:files on:change={() => feedbackMessage = ''} />
        </label>
    </div>

    <div class="flex px-4 py-3 justify-end">
      <button
        type="submit"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#5d0d36] text-[#fbf8fa] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
      >
        <span class="truncate">Crear producto</span>
      </button>
    </div>
  </form>

  {#if feedbackMessage}
    <p class="mt-4 px-4 py-2 rounded-md {result.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">{feedbackMessage}</p>
  {/if}
</div>