<script lang="ts">
  import ProductCard from './lib/components/ProductCard.svelte';

  // Más adelante, estos datos vendrán de una base de datos.
  const products = [
    { id: 1, name: 'Amigurumi de Pulpo', price: 1500, image: 'https://placehold.co/400x400/e2c2e6/7d4e8a?text=Pupicrochet' },
    { id: 2, name: 'Sonajero de Elefante', price: 1200, image: 'https://placehold.co/400x400/c2dbe6/4e7d8a?text=Pupicrochet' },
    { id: 3, name: 'Manta de Apego Conejito', price: 2500, image: 'https://placehold.co/400x400/c2e6d2/4e8a60?text=Pupicrochet' }
  ];
</script>

<div class="text-center p-8">
  <h1 class="text-4xl font-bold text-purple-700 mb-2">Bienvenidos a Pupicrochet</h1>
  <p class="text-lg text-gray-600">Creaciones únicas tejidas con amor.</p>
</div>

<div class="max-w-7xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each products as product}
      <a href="/productos/{product.id}" class="no-underline">
        <ProductCard
          productName={product.name}
          price={product.price}
          imageUrl={product.image}
        />
      </a>
    {/each}
  </div>
</div>