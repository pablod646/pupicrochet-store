<script lang="ts">
  import type { Product, ProductImage } from '@prisma/client';

  export let product: Product & { images: ProductImage[] };
</script>

<a href={`/productos/${product.slug}`} class="flex flex-col gap-3 pb-3 group">
  <div
    class="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
    style={`background-image: url(${product.images[0]?.url || '/placeholder.svg'})`}
    aria-label={product.name}
  ></div>
  <div>
    <p class="text-[#1b0e15] text-base font-medium leading-normal">{product.name}</p>
    <p class="text-[#955074] text-sm font-normal leading-normal">${product.price.toFixed(2)}</p>
  </div>
</a>
