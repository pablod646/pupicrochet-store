<script lang="ts">
  import type { Category } from '@prisma/client';

  export let allCategories: Category[];
  export let initialSelectedCategories: Category[] = [];

  let selectedCategories: Category[] = [...initialSelectedCategories];
  let highlightedCategory: Category | null = null;

  function handleCategoryClick(category: Category) {
    if (!selectedCategories.some(c => c.id === category.id)) {
      highlightedCategory = category;
    }
  }

  function addHighlightedCategory() {
    if (highlightedCategory && !selectedCategories.some(c => c.id === highlightedCategory!.id)) {
      selectedCategories = [...selectedCategories, highlightedCategory];
      highlightedCategory = null;
    }
  }

  function removeCategory(categoryToRemove: Category) {
    selectedCategories = selectedCategories.filter(c => c.id !== categoryToRemove.id);
    if (highlightedCategory?.id === categoryToRemove.id) {
      highlightedCategory = null;
    }
  }

  function renderCategoryTree(categories: Category[], selected: Category[], level: number = 0) {
    let html = '';
    for (const category of categories) {
      const isSelected = selected.some(c => c.id === category.id);
      const isHighlighted = highlightedCategory?.id === category.id;
      const isDisabled = isSelected;

      html += `<li
        class="p-2 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-green-100 text-green-800' : ''} ${isHighlighted ? 'bg-blue-200' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}"
        style="padding-left: ${level * 20 + 8}px;"
        data-category-id="${category.id}"
        data-category-name="${category.name}"
        ${isDisabled ? '' : 'tabindex="0" role="button"'}
      >
        ${category.name}
      </li>`;

      if (category.children && category.children.length > 0) {
        html += `<ul>${renderCategoryTree(category.children, selected, level + 1)}</ul>`;
      }
    }
    return html;
  }

  // Reactive statement to use the already hierarchical allCategories
  $: hierarchicalCategories = allCategories;

  // Reactive statement to re-render the tree HTML when selectedCategories changes
  $: renderedCategoryTreeHtml = renderCategoryTree(hierarchicalCategories, selectedCategories);

  // Handle click events on the list items (delegation)
  function handleListClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const li = target.closest('li[data-category-id]');
    if (li && !li.classList.contains('opacity-50')) { // Check if not disabled
      const categoryId = li.dataset.categoryId;
      const categoryName = li.dataset.categoryName;
      if (categoryId && categoryName) {
        handleCategoryClick({ id: categoryId, name: categoryName } as Category); // Cast to Category
      }
    }
  }

  // Handle keyboard events on the list items
  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      const li = target.closest('li[data-category-id]');
      if (li && !li.classList.contains('opacity-50')) { // Check if not disabled
        const categoryId = li.dataset.categoryId;
        const categoryName = li.dataset.categoryName;
        if (categoryId && categoryName) {
          handleCategoryClick({ id: categoryId, name: categoryName } as Category); // Cast to Category
        }
      }
    }
  }
</script>

<div class="flex space-x-4">
  <!-- Panel Izquierdo: Categorías Seleccionadas -->
  <div class="w-1/2 border rounded p-4 bg-gray-50">
    <h3 class="font-bold mb-2">Categorías Seleccionadas:</h3>
    <div class="flex flex-wrap gap-2">
      {#each selectedCategories as category}
        <div class="flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {category.name}
          <button type="button" on:click={() => removeCategory(category)} class="text-blue-400 hover:text-blue-600">
            &times;
          </button>
        </div>
      {/each}
      {#if selectedCategories.length === 0}
        <p class="text-gray-500 text-sm">Ninguna categoría seleccionada.</p>
      {/if}
    </div>
    {#each selectedCategories as category}
      <input type="hidden" name="categoryIds[]" value={category.id} />
    {/each}
  </div>

  <!-- Panel Derecho: Árbol Jerárquico de Categorías -->
  <div class="w-1/2 border rounded p-4 bg-white flex flex-col">
    <h3 class="font-bold mb-2">Seleccionar Categorías:</h3>
    <div class="flex-grow overflow-y-auto border p-2 rounded" on:click={handleListClick} on:keydown={handleListKeyDown} role="listbox" tabindex="0">
      <ul class="list-none p-0">
        {@html renderedCategoryTreeHtml}
      </ul>
    </div>
    <button
      type="button"
      on:click={addHighlightedCategory}
      disabled={!highlightedCategory || selectedCategories.some(c => c.id === highlightedCategory!.id)}
      class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Agregar Categoría Seleccionada
    </button>
  </div>
</div>
