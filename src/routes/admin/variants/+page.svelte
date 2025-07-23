
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1 class="text-2xl font-bold mb-4">Gestionar Variantes de Producto</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <!-- Columna para Tipos de Opción -->
  <div>
    <h2 class="text-xl font-semibold mb-2">Tipos de Opción</h2>
    <!-- Formulario para crear nuevos tipos de opción -->
    <form method="POST" action="?/createOptionType" class="mb-4">
      <input type="text" name="name" placeholder="Ej. Color" class="form-input" required />
      <button type="submit" class="btn-primary">Añadir Tipo</button>
    </form>

    <!-- Lista de tipos de opción existentes -->
    <ul>
      {#each data.optionTypes as type}
        <li>{type.name}</li>
      {/each}
    </ul>
  </div>

  <!-- Columna para Valores de Opción -->
  <div>
    <h2 class="text-xl font-semibold mb-2">Valores de Opción</h2>
    <!-- Formulario para crear nuevos valores de opción -->
    <form method="POST" action="?/createOptionValue" class="mb-4">
      <select name="optionTypeId" class="form-select">
        {#each data.optionTypes as type}
          <option value={type.id}>{type.name}</option>
        {/each}
      </select>
      <input type="text" name="value" placeholder="Ej. Rojo" class="form-input" required />
      <button type="submit" class="btn-primary">Añadir Valor</button>
    </form>

    <!-- Lista de valores de opción existentes -->
    <ul>
      {#each data.optionValues as value}
        <li>{value.optionType.name}: {value.value}</li>
      {/each}
    </ul>
  </div>
</div>
