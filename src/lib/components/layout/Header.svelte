<script lang="ts">
  import type { UserRole } from "@prisma/client";
  import Button from "../ui/Button.svelte";

  interface UserSubset {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  }

  export let user: UserSubset | null;
  export let cartItemCount: number;
  export let onToggleTheme: () => void;
  export let currentTheme: string;

  let searchQuery = "";
  let isMobileMenuOpen = false;
  let isProfileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function toggleProfileMenu() {
    isProfileMenuOpen = !isProfileMenuOpen;
  }
</script>

<nav class="bg-white shadow">
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
    <div class="flex h-16 justify-between">
      <div class="flex px-2 lg:px-0">
        <div class="flex flex-shrink-0 items-center">
          <a href="/" class="flex items-center gap-2 text-gray-900">
            <img class="h-8 w-auto" src="/favicon.svg" alt="PupiCrochet Logo" />
            <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">
              PupiCrochet
            </h2>
          </a>
        </div>
        <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
          <a
            href="/"
            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >Inicio</a
          >
          <a
            href="/productos"
            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >Tienda</a
          >
        </div>
      </div>
      <div
        class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
      >
        <div class="w-full max-w-lg lg:max-w-xs">
          <label for="search" class="sr-only">Buscar</label>
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path></svg
              >
            </div>
            <input
              id="search"
              name="search"
              class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Buscar"
              type="search"
              bind:value={searchQuery}
            />
          </div>
        </div>
      </div>
      <div class="flex items-center lg:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          on:click={toggleMobileMenu}
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          {#if !isMobileMenuOpen}
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              /></svg
            >
          {:else}
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              /></svg
            >
          {/if}
        </button>
      </div>
      <div class="hidden lg:ml-4 lg:flex lg:items-center">
        <button
          type="button"
          class="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          on:click={onToggleTheme}
        >
          <span class="absolute -inset-1.5" />
          <span class="sr-only"
            >Toggle Theme ({currentTheme === "dark" ? "Light" : "Dark"})</span
          >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-6.364-.364l1.591-1.591M3 12H5.25m-.364-6.364l1.591 1.591M12 12.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            /></svg
          >
        </button>

        <!-- Cart Icon -->
        <div class="relative ml-4 flex-shrink-0">
          <a
            href="/carrito"
            aria-label="Cart"
            class="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View cart</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-1.278-2.294 1.5 1.5 0 00-1.489-.648L19.69 4.78c-.529.11-.969.351-1.256.73M15 18.75a3 3 0 11-6 0 3 3 0 016 0z"
              /></svg
            >
            {#if cartItemCount > 0}
              <span
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
                >{cartItemCount}</span
              >
            {/if}
          </a>
        </div>

        <!-- Profile dropdown -->
        {#if user}
          <div class="relative ml-4 flex-shrink-0">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                on:click={toggleProfileMenu}
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <div
                  class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  {user.name?.charAt(0) || user.email.charAt(0)}
                </div>
              </button>
            </div>
            {#if isProfileMenuOpen}
              <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a href="/admin" class="block px-4 py-2 text-sm text-gray-700"
                  >Your Profile</a
                >
                <form action="/logout" method="POST">
                  <button
                    type="submit"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >Sign out</button
                  >
                </form>
              </div>
            {/if}
          </div>
        {:else}
          <a
            href="/auth"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >Login</a
          >
          <a
            href="/register"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >Register</a
          >
        {/if}
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  {#if isMobileMenuOpen}
    <div class="lg:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <a
          href="/"
          class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
          >Inicio</a
        >
        <a
          href="/productos"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >Tienda</a
        >
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        {#if user}
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <div
                class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
              >
                {user.name?.charAt(0) || user.email.charAt(0)}
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {user.name || user.email}
              </div>
              <div class="text-sm font-medium text-gray-500">{user.email}</div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <a
              href="/admin"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >Your Profile</a
            >
            <form action="/logout" method="POST">
              <button
                type="submit"
                class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >Sign out</button
              >
            </form>
          </div>
        {:else}
          <div class="space-y-1">
            <a
              href="/auth"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >Login</a
            >
            <a
              href="/register"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >Register</a
            >
          </div>
        {/if}
      </div>
    </div>
  {/if}
</nav>
