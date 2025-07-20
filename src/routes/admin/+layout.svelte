<script lang="ts">
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';
</script>

<div class="flex h-screen bg-gray-100">
  <AdminSidebar />
  <main class="flex-1 p-6 overflow-y-auto">
    <slot />
  </main>
</div>
