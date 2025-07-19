<script lang="ts">
  // Los datos que devuelve la función `load` llegan aquí
  export let data;
  const { product } = data;
</script>

<div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
  <div>
    <img 
      src={product.imageUrl} 
      alt={product.name} 
      class="w-full rounded-lg shadow-lg aspect-square object-cover" 
    />
  </div>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
      <p class="mt-4 text-gray-600 text-lg">{product.description}</p>
    </div>
    <div class="mt-8">
      <p class="text-4xl font-bold text-gray-900">${product.price}</p>
      <form method="POST" action="?/addToCart">
        <input type="hidden" name="productId" value={product.id} />
        <button class="mt-4 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Agregar al Carrito
        </button>
      </form>
    </div>
  </div>
</div>