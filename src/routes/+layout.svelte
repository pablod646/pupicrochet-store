<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import type { PageData } from './$types';

  export let data;

  $: cartItemCount = data.cart?.items.length || 0;
  $: user = data.user;
</script>

<svelte:head>
  <title>PupiCrochet Store</title>
</svelte:head>

<div
  class="relative flex size-full min-h-screen flex-col bg-[#fbf8fa] group/design-root overflow-x-hidden"
  style='font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'
>
  <div class="layout-container flex h-full grow flex-col">
    <Header {user} {cartItemCount} />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</div>
