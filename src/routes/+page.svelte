<script lang="ts">
  import ProductCard from './lib/components/ProductCard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="text-center p-8">
  <h1 class="text-4xl font-bold text-purple-700 mb-2">Bienvenidos a Pupicrochet</h1>
  <p class="text-lg text-gray-600">Creaciones únicas tejidas con amor.</p>
</div>

<div class="max-w-7xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each data.products as product (product.id)}
      <ProductCard {product} />
    {/each}
  </div>
</div>

<div class="text-center p-8 mt-8">
  <h2 class="text-3xl font-bold text-purple-700 mb-4">Sobre Nosotros</h2>
  <p class="max-w-3xl mx-auto text-gray-700">
    En Pupicrochet, cada pieza es una obra de arte. Nos dedicamos a crear amigurumis y otros productos tejidos a mano con la más alta calidad y un toque de magia. Explora nuestra tienda para encontrar el regalo perfecto o un nuevo amigo para tu colección.
  </p>
</div>
