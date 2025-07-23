
<script lang="ts">
  export let show = false;
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-xl">
      <slot />
    </div>
  </div>
{/if}
