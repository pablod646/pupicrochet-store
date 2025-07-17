<script lang="ts">
  export let productName: string;
  export let price: number;
  export let imageUrl: string;
</script>

<div class="border rounded-lg shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-lg bg-white">
  <img class="w-full h-48 object-cover" src={imageUrl} alt="Foto de {productName}" />

  <div class="p-4 text-center">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">{productName}</h3>
    <p class="text-xl font-bold text-purple-600">${price}</p>
  </div>
</div>