<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { theme } from "$lib/stores/themeStore";

  export let data;

  $: cartItemCount = data.cart?.items.length || 0;
  $: user = data.user;

  function toggleTheme() {
    theme.update((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }

  $: if (typeof document !== "undefined") {
    if ($theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
</script>

<svelte:head>
  <title>PupiCrochet Store</title>
</svelte:head>

<div
  class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
  class:bg-[#fbf8fa]={!$theme || $theme === "light"}
  class:bg-[#1a1a1a]={$theme === "dark"}
  style="font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;"
>
  <div class="layout-container flex h-full grow flex-col">
    <Header
      {user}
      {cartItemCount}
      onToggleTheme={toggleTheme}
      currentTheme={$theme}
    />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</div>
