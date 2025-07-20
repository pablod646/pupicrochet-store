<script lang="ts">
  import '../app.css';
  export let data;

  $: cartItemCount = data.cart?.items.length || 0;
  $: user = data.user;
</script>

<div class="min-h-screen flex flex-col bg-gray-50">

  <header class="bg-white shadow-sm sticky top-0 z-10">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" class="text-2xl font-bold text-purple-700">Pupicrochet</a>
        <ul class="hidden md:flex space-x-8 items-center">
          <li><a href="/" class="text-gray-600 hover:text-purple-600">Productos</a></li>
          <li>
            <a href="/carrito" class="text-gray-600 hover:text-purple-600 flex items-center">
              Carrito
              {#if cartItemCount > 0}
                <span class="ml-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              {/if}
            </a>
          </li>
          {#if user}
            <li class="text-gray-600">Hello, {user.name || user.email}!</li>
            <li>
              <form action="/logout" method="POST">
                <button type="submit" class="text-gray-600 hover:text-purple-600">Logout</button>
              </form>
            </li>
          {:else}
            <li><a href="/auth" class="text-gray-600 hover:text-purple-600">Login</a></li>
            <li><a href="/register" class="text-gray-600 hover:text-purple-600">Register</a></li>
          {/if}
        </ul>
      </div>
    </nav>
  </header>

  <main class="flex-grow container mx-auto p-6">
    <slot />
  </main>

  <footer class="bg-white border-t mt-12">
    <div class="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Pupicrochet. Todos los derechos reservados.</p>
    </div>
  </footer>

</div>