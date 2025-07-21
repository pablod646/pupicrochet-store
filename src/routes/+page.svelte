<script lang="ts">
  import ProductCard from './lib/components/ProductCard.svelte';

  // 'data' ahora viene del servidor gracias a `+page.server.ts`
  export let data;
  
</script>

<div class="text-center p-8">
  <h1 class="text-4xl font-bold text-purple-700 mb-2">Bienvenidos a Pupicrochet</h1>
  <p class="text-lg text-gray-600">Creaciones únicas tejidas con amor.</p>
</div>

<div class="max-w-7xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.products as product}
      <ProductCard
        productName={product.name}
        price={product.price}
        imageUrl={product.images[0]?.url}
        productSlug={product.slug}
      />
    {/each}
  </div>
</div>