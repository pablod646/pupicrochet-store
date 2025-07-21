<script lang="ts">
  import '../app.css';
  export let data;

  $: cartItemCount = data.cart?.items.length || 0;
  $: user = data.user;

  let showUserDropdown = false;

  function toggleUserDropdown() {
    showUserDropdown = !showUserDropdown;
  }

  function closeUserDropdown(event: MouseEvent) {
    if (event.target instanceof HTMLElement && !event.target.closest('.user-dropdown-container')) {
      showUserDropdown = false;
    }
  }
</script>

<svelte:window on:click={closeUserDropdown} />

<div class="min-h-screen flex flex-col bg-gray-50">

  <header class="bg-white shadow-sm sticky top-0 z-10">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <a href="/" class="text-2xl font-bold text-purple-700">Pupicrochet</a>
          <form action="/productos" method="GET" class="hidden md:flex">
            <input type="search" name="search" placeholder="Buscar productos..." class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
          </form>
        </div>
        <ul class="hidden md:flex space-x-8 items-center">
          <li><a href="/productos" class="text-gray-600 hover:text-purple-600">Productos</a></li>
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
            <li class="relative user-dropdown-container">
              <button on:click|stopPropagation={toggleUserDropdown} class="text-gray-600 hover:text-purple-600 focus:outline-none">
                Hola, {user.name || user.email}!
              </button>
              {#if showUserDropdown}
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  {#if user.role === 'ADMIN'}
                    <a href="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Panel de Administración</a>
                  {/if}
                  <form action="/logout" method="POST">
                    <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerrar Sesión</button>
                  </form>
                </div>
              {/if}
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