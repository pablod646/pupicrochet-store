<script lang="ts">
  import { page } from '$app/stores';
</script>

<aside class="w-64 bg-gray-800 text-white p-4 space-y-6">
  <h2 class="text-2xl font-bold mb-6">Panel de Administración</h2>
  <nav>
    <ul class="space-y-2">
      <li>
        <a
          href="/admin"
          class="block py-2 px-4 rounded transition duration-200 { $page.url.pathname === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700' }"
        >
          Dashboard
        </a>
      </li>
      <li>
        <a
          href="/admin/products"
          class="block py-2 px-4 rounded transition duration-200 { $page.url.pathname.startsWith('/admin/products') ? 'bg-gray-700' : 'hover:bg-gray-700' }"
        >
          Gestión de Productos
        </a>
        <ul class="ml-4 mt-1 space-y-1">
          <li>
            <a
              href="/admin/products"
              class="block py-2 px-4 rounded transition duration-200 { $page.url.pathname === '/admin/products' ? 'bg-gray-700' : 'hover:bg-gray-700' }"
            >
              Listar/Editar Productos
            </a>
          </li>
          <li>
            <a
              href="/admin/products/new"
              class="block py-2 px-4 rounded transition duration-200 { $page.url.pathname === '/admin/products/new' ? 'bg-gray-700' : 'hover:bg-gray-700' }"
            >
              Añadir Nuevo
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a
          href="/admin/users"
          class="block py-2 px-4 rounded transition duration-200 { $page.url.pathname.startsWith('/admin/users') ? 'bg-gray-700' : 'hover:bg-gray-700' }"
        >
          Gestión de Usuarios
        </a>
      </li>
      <li><a href="/admin/categories" class="block py-2 px-4 hover:bg-gray-700">Categorías</a></li>
      <li><a href="/admin/variants" class="block py-2 px-4 hover:bg-gray-700">Variantes</a></li>
      <!-- Add more admin sections here -->
    </ul>
  </nav>
</aside>
