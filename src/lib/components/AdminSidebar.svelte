<script lang="ts">
  import { page } from "$app/stores";

  let isProductsSubMenuOpen = false;

  function toggleProductsSubMenu() {
    isProductsSubMenuOpen = !isProductsSubMenuOpen;
  }
</script>

<aside class="flex flex-col w-64 bg-gray-800 text-white p-4">
  <h2 class="text-2xl font-bold mb-6">Panel de Administración</h2>
  <nav class="flex-1">
    <ul class="space-y-2">
      <li>
        <a
          href="/admin"
          class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group {$page
            .url.pathname === '/admin'
            ? 'bg-gray-700'
            : ''}"
        >
          <svg
            class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z"></path><path
              d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
            ></path></svg
          >
          <span class="ml-3">Dashboard</span>
        </a>
      </li>
      <li>
        <button
          type="button"
          class="flex items-center p-2 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-700 dark:hover:bg-gray-700 {$page.url.pathname.startsWith(
            '/admin/products',
          )
            ? 'bg-gray-700'
            : ''}"
          aria-controls="dropdown-products"
          data-collapse-toggle="dropdown-products"
          on:click={toggleProductsSubMenu}
        >
          <svg
            class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v3a1 1 0 001 1h14a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4h-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2h2a1 1 0 100-2h-2z"
              clip-rule="evenodd"
            ></path></svg
          >
          <span class="flex-1 ml-3 text-left whitespace-nowrap"
            >Gestión de Productos</span
          >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
          >
        </button>
        {#if isProductsSubMenuOpen || $page.url.pathname.startsWith("/admin/products")}
          <ul id="dropdown-products" class="py-2 space-y-2">
            <li>
              <a
                href="/admin/products"
                class="flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-700 dark:hover:bg-gray-700 {$page
                  .url.pathname === '/admin/products'
                  ? 'bg-gray-700'
                  : ''}"
              >
                Listar/Editar Productos
              </a>
            </li>
            <li>
              <a
                href="/admin/products/new"
                class="flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-700 dark:hover:bg-gray-700 {$page
                  .url.pathname === '/admin/products/new'
                  ? 'bg-gray-700'
                  : ''}"
              >
                Añadir Nuevo
              </a>
            </li>
          </ul>
        {/if}
      </li>
      <li>
        <a
          href="/admin/users"
          class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group {$page.url.pathname.startsWith(
            '/admin/users',
          )
            ? 'bg-gray-700'
            : ''}"
        >
          <svg
            class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path></svg
          >
          <span class="flex-1 ml-3 whitespace-nowrap">Gestión de Usuarios</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/categories"
          class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group {$page.url.pathname.startsWith(
            '/admin/categories',
          )
            ? 'bg-gray-700'
            : ''}"
        >
          <svg
            class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v3a1 1 0 001 1h14a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4h-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2h2a1 1 0 100-2h-2z"
              clip-rule="evenodd"
            ></path></svg
          >
          <span class="flex-1 ml-3 whitespace-nowrap"
            >Gestión de Categorías</span
          >
        </a>
      </li>
    </ul>
  </nav>
</aside>
