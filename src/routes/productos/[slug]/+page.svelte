<script lang="ts">
  import ProductCard from '../../lib/components/ProductCard.svelte';

  export let data;
  const { product, relatedProducts } = data;

  // Estado para la imagen seleccionada
  let selectedImage = product?.images[0]?.url || 'https://placehold.co/600x600';
</script>

{#if product}
  <div class="max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div class="grid gap-4">
        <div class="aspect-square w-full overflow-hidden rounded-lg shadow-lg">
          <img 
            src={selectedImage} 
            alt={product.name} 
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="grid grid-cols-5 gap-2">
          {#each product.images as image, i}
            <button 
              on:click={() => selectedImage = image.url}
              class="aspect-square w-full overflow-hidden rounded-md border-2 {selectedImage === image.url ? 'border-purple-600' : 'border-transparent'} transition focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <img 
                src={image.url} 
                alt="{product.name} - Miniatura {i + 1}" 
                class="w-full h-full object-cover"
              />
            </button>
          {/each}
        </div>
      </div>
      <div class="flex flex-col h-full">
        <div class="flex-grow">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
          <p class="mt-4 text-gray-600 text-lg">{product.description}</p>
          
          <!-- Detalles Adicionales -->
          <div class="mt-6 border-t pt-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Detalles</h2>
            <ul class="space-y-2 text-gray-600">
              {#if product.materials}
                <li><strong>Materiales:</strong> {product.materials}</li>
              {/if}
              {#if product.dimensions}
                <li><strong>Dimensiones:</strong> {product.dimensions}</li>
              {/if}
            </ul>
          </div>
        </div>
        <div class="mt-8">
          <p class="text-4xl font-bold text-gray-900">${product.price}</p>
          <form method="POST" action="?/addToCart" class="mt-6">
            <input type="hidden" name="productId" value={product.id} />
            <div class="flex items-center gap-4">
              <label for="quantity" class="text-lg font-medium text-gray-700">Cantidad:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                value="1" 
                min="1" 
                class="w-20 rounded-md border border-gray-300 py-2 px-3 text-lg text-center focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button class="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Agregar al Carrito
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Sección de Productos Relacionados -->
    {#if relatedProducts.length > 0}
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">También te podría interesar</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          {#each relatedProducts as relatedProduct}
            <ProductCard 
              productName={relatedProduct.name} 
              price={relatedProduct.price} 
              imageUrl={relatedProduct.images[0]?.url || 'https://placehold.co/600x400'}
              productSlug={relatedProduct.slug}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="flex flex-col items-center justify-center h-96">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
    <p class="text-lg text-gray-600">Lo sentimos, el producto que buscas no existe.</p>
    <a href="/" class="mt-6 text-purple-600 hover:underline">Volver a la página principal</a>
  </div>
{/if}