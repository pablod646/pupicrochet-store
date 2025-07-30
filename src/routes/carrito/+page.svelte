<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionResult } from "@sveltejs/kit";

  export let data;

  interface Product {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
  }

  interface CartItem {
    id: string;
    quantity: number;
    product: Product;
  }

  // Esta función se ejecutará después de que el formulario se envíe
  // y nos permitirá actualizar los datos de la página.
  const enhanceForm = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        // Invalida todos los datos cargados, forzando a SvelteKit
        // a volver a ejecutar las funciones `load`.
        await invalidateAll();
      }
    };
  };
</script>

<div class="max-w-4xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Tu Carrito</h1>

  {#if data.cart && data.cart.items.length > 0}
    <div class="space-y-4">
      {#each data.cart.items as item (item.id)}
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center space-x-4">
            <img
              src={item.product.images[0]?.url}
              alt={item.product.name}
              class="w-20 h-20 object-cover rounded"
            />
            <div>
              <h2 class="font-semibold">{item.product.name}</h2>
              <div class="flex items-center space-x-2">
                <form
                  method="POST"
                  action="?/updateQuantity"
                  use:enhance={enhanceForm}
                >
                  <input type="hidden" name="itemId" value={item.id} />
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    min="1"
                    class="w-16 text-center border rounded"
                    on:change={(e) => e.currentTarget.form?.requestSubmit()}
                  />
                </form>
                <form
                  method="POST"
                  action="?/removeItem"
                  use:enhance={enhanceForm}
                >
                  <input type="hidden" name="itemId" value={item.id} />
                  <button type="submit" class="text-red-600 hover:underline"
                    >Eliminar</button
                  >
                </form>
              </div>
            </div>
          </div>
          <p class="font-semibold">${item.product.price * item.quantity}</p>
        </div>
      {/each}
    </div>

    <div class="mt-8 text-right">
      <h2 class="text-xl font-bold">
        Total: ${data.cart.items.reduce(
          (total: number, item: CartItem) =>
            total + item.product.price * item.quantity,
          0,
        )}
      </h2>
      <button
        class="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700"
      >
        Proceder al Pago
      </button>
    </div>
  {:else}
    <p>Tu carrito está vacío.</p>
  {/if}
</div>
