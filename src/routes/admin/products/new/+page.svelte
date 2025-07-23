<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { ActionData, PageData } from './$types';
  import CategorySelector from '$lib/components/CategorySelector.svelte';

  
  export let data: PageData;

  // Lógica para la carga de imágenes (simplificada por ahora)
  let files: FileList;
  import Modal from '$lib/components/Modal.svelte';

  
  export let data: PageData;

  // Lógica para la carga de imágenes (simplificada por ahora)
  let files: FileList;
  let feedbackMessage = '';

  // Lógica para las variantes
  let optionTypes = [{ name: '', values: [''] }];
  let variants = [];
  let showNewOptionTypeModal = false;
  let newOptionTypeName = '';

  function addOptionType() {
    optionTypes = [...optionTypes, { name: '', values: [''] }];
  }

  function removeOptionType(index) {
    optionTypes = optionTypes.filter((_, i) => i !== index);
    generateVariants();
  }

  function addOptionValue(typeIndex) {
    optionTypes[typeIndex].values = [...optionTypes[typeIndex].values, ''];
  }

  function removeOptionValue(typeIndex, valueIndex) {
    optionTypes[typeIndex].values = optionTypes[typeIndex].values.filter((_, i) => i !== valueIndex);
    generateVariants();
  }

  function generateVariants() {
    const allOptions = optionTypes.map(t => t.values.filter(v => v));
    if (allOptions.some(o => o.length === 0)) {
      variants = [];
      return;
    }

    const combinations = allOptions.reduce((acc, values) => {
      if (acc.length === 0) return values.map(v => [v]);
      return acc.flatMap(combo => values.map(v => [...combo, v]));
    }, []);

    variants = combinations.map(combo => ({
      options: combo.join(' / '),
      price: 0,
      stock: 0,
      sku: ''
    }));
  }

  async function createNewOptionType() {
    const res = await fetch('/admin/variants?/createOptionType', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newOptionTypeName })
    });
    if (res.ok) {
      // Actualizar la lista de tipos de opción y cerrar el modal
      data.optionTypes = [...data.optionTypes, { id: '', name: newOptionTypeName, values: [] }];
      showNewOptionTypeModal = false;
      newOptionTypeName = '';
    }
  }

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
    <input type="hidden" name="optionTypes" value={JSON.stringify(optionTypes)} />
    <input type="hidden" name="variants" value={JSON.stringify(variants)} />
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
      <p class="text-[#1b0e15] text-base font-medium leading-normal pb-2">Variantes del Producto</p>
      <div class="p-4 border border-[#e6d1dc] rounded-xl bg-[#fbf8fa]">
        {#each optionTypes as type, typeIndex}
          <div class="mb-4 border-b pb-4">
            <div class="flex items-center">
              <select bind:value={type.name} on:change={generateVariants} class="form-select flex-grow mr-2">
                <option value="">Seleccionar tipo</option>
                {#each data.optionTypes as availableType}
                  <option value={availableType.name}>{availableType.name}</option>
                {/each}
              </select>
              <button type="button" on:click={() => removeOptionType(typeIndex)} class="text-red-500">Eliminar tipo</button>
            </div>
            <div class="pl-4 mt-2">
              {#each type.values as value, valueIndex}
                <div class="flex items-center mt-1">
                  <select bind:value={type.values[valueIndex]} on:change={generateVariants} class="form-select flex-grow mr-2">
                    <option value="">Seleccionar valor</option>
                    {#if type.name}
                      {@const selectedType = data.optionTypes.find(t => t.name === type.name)}
                      {#if selectedType}
                        {#each selectedType.values as availableValue}
                          <option value={availableValue.value}>{availableValue.value}</option>
                        {/each}
                      {/if}
                    {/if}
                  </select>
                  <button type="button" on:click={() => removeOptionValue(typeIndex, valueIndex)} class="text-red-500">x</button>
                </div>
              {/each}
              <button type="button" on:click={() => addOptionValue(typeIndex)} class="text-sm text-green-600 mt-2">+ Añadir valor</button>
            </div>
          </div>
        {/each}
        <button type="button" on:click={() => showNewOptionTypeModal = true} class="text-sm text-blue-600">+ Añadir nuevo tipo</button>

        <Modal show={showNewOptionTypeModal}>
          <h2 class="text-lg font-bold mb-4">Crear Nuevo Tipo de Opción</h2>
          <input type="text" bind:value={newOptionTypeName} placeholder="Ej. Talla" class="form-input w-full mb-4" />
          <div class="flex justify-end gap-4">
            <button type="button" on:click={() => showNewOptionTypeModal = false} class="btn-secondary">Cancelar</button>
            <button type="button" on:click={createNewOptionType} class="btn-primary">Crear</button>
          </div>
        </Modal>

        {#if variants.length > 0}
          <h4 class="mt-6 mb-2 font-bold">Variantes generadas:</h4>
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Opciones</th>
                <th scope="col" class="px-6 py-3">Precio</th>
                <th scope="col" class="px-6 py-3">Stock</th>
                <th scope="col" class="px-6 py-3">SKU</th>
              </tr>
            </thead>
            <tbody>
              {#each variants as variant, i}
                <tr class="bg-white border-b">
                  <td class="px-6 py-4">{variant.options}</td>
                  <td><input type="number" step="0.01" bind:value={variant.price} class="form-input w-full" /></td>
                  <td><input type="number" bind:value={variant.stock} class="form-input w-full" /></td>
                  <td><input type="text" bind:value={variant.sku} class="form-input w-full" /></td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
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