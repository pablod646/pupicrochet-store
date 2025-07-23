<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import type { Category } from '@prisma/client';
  import CategorySelector from '$lib/components/CategorySelector.svelte';

  type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

  export let data: PageData;
  export let form: ActionData;

  let product = data.product;
  let imageUrls: string[] = product.images.map(img => img.url);
  let existingImageIds: string[] = product.images.map(img => img.id);
  // Lógica para las variantes
  let optionTypes = [];
  let variants = [];

  // Cargar variantes existentes
  if (product.variants && product.variants.length > 0) {
    const types = {};
    product.variants.forEach(variant => {
      variant.options.forEach(opt => {
        const typeName = opt.optionValue.optionType.name;
        if (!types[typeName]) {
          types[typeName] = new Set();
        }
        types[typeName].add(opt.optionValue.value);
      });
    });

    optionTypes = Object.entries(types).map(([name, valuesSet]) => ({
      name,
      values: Array.from(valuesSet as Set<string>)
    }));

    variants = product.variants.map(v => ({
      ...v,
      price: v.price / 100,
      options: v.options.map(o => `${o.optionValue.optionType.name}: ${o.optionValue.value}`).join(' / ')
    }));
  }

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

  <fieldset class="mb-4">
    <legend class="block text-gray-700 text-sm font-bold mb-2">Variantes del Producto</legend>
    <div class="p-4 border rounded bg-gray-50">
        {#each optionTypes as type, typeIndex}
          <div class="mb-4 border-b pb-4">
            <div class="flex items-center">
              <input type="text" placeholder="Ej. Color" bind:value={type.name} on:input={generateVariants} class="form-input flex-grow mr-2" />
              <button type="button" on:click={() => removeOptionType(typeIndex)} class="text-red-500">Eliminar tipo</button>
            </div>
            <div class="pl-4 mt-2">
              {#each type.values as value, valueIndex}
                <div class="flex items-center mt-1">
                  <input type="text" placeholder="Ej. Rojo" bind:value={type.values[valueIndex]} on:input={generateVariants} class="form-input flex-grow mr-2" />
                  <button type="button" on:click={() => removeOptionValue(typeIndex, valueIndex)} class="text-red-500">x</button>
                </div>
              {/each}
              <button type="button" on:click={() => addOptionValue(typeIndex)} class="text-sm text-green-600 mt-2">+ Añadir valor</button>
            </div>
          </div>
        {/each}
        <button type="button" on:click={addOptionType} class="text-sm text-blue-600">+ Añadir tipo de opción</button>

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
  </fieldset>

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
