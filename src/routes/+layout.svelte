<script>
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-gray-50">

  <header class="bg-white shadow-sm sticky top-0 z-10">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" class="text-2xl font-bold text-purple-700">Pupicrochet</a>
        <ul class="hidden md:flex space-x-8">
          <li><a href="#" class="text-gray-600 hover:text-purple-600">Productos</a></li>
          <li><a href="#" class="text-gray-600 hover:text-purple-600">Acerca de</a></li>
          <li><a href="#" class="text-gray-600 hover:text-purple-600">Contacto</a></li>
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