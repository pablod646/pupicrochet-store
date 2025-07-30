<script lang="ts">
  import type { UserRole } from '@prisma/client';

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

  let searchQuery = '';
</script>

<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e8ed] px-10 py-3">
  <div class="flex items-center gap-8">
    <a href="/" class="flex items-center gap-4 text-[#1b0e15]">
      <div class="size-6 text-[#5d0d36]">
        <svg role="img" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>PupiCrochet Logo</title>
          <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
        </svg>
      </div>
      <h2 class="text-[#1b0e15] text-lg font-bold leading-tight tracking-[-0.015em]">PupiCrochet</h2>
    </a>
    <div class="flex items-center gap-9">
      <a class="text-[#1b0e15] text-sm font-medium leading-normal" href="/">Inicio</a>
      <a class="text-[#1b0e15] text-sm font-medium leading-normal" href="/productos">Tienda</a>
    </div>
  </div>
  <div class="flex flex-1 justify-end gap-4">
    <form action="/productos" method="GET" class="flex flex-col min-w-40 !h-10 max-w-64">
      <label for="search-input" class="sr-only">Buscar productos</label>
      <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
        <div class="text-[#955074] flex border-none bg-[#f3e8ed] items-center justify-center pl-4 rounded-l-xl border-r-0">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
        </div>
        <input id="search-input" name="q" bind:value={searchQuery} placeholder="Buscar..." class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border-none bg-[#f3e8ed] focus:border-none h-full placeholder:text-[#955074] px-4 text-base font-normal leading-normal" />
      </div>
    </form>
    <div class="flex items-center gap-2">
      <button on:click={onToggleTheme} class="text-sm font-medium text-gray-600 hover:text-[#5d0d36]">
        Toggle Theme ({currentTheme === 'dark' ? 'Light' : 'Dark'})
      </button>
      <div class="relative">
          <a href="/carrito" aria-label="Cart" class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#f3e8ed] text-[#1b0e15]">
            <div class="text-[#1b0e15]">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path></svg>
            </div>
          </a>
          {#if cartItemCount > 0}
            <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5d0d36] text-xs font-bold text-white">{cartItemCount}</span>
          {/if}
        </div>
      {#if user}
        <div class="relative">
          <a href="/admin" aria-label="User profile" class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-200 text-gray-600">
            {user.name?.charAt(0) || user.email.charAt(0)}
          </a>
        </div>
        <form action="/logout" method="POST">
            <button type="submit" class="text-sm font-medium text-gray-600 hover:text-[#5d0d36]">Logout</button>
        </form>
      {:else}
        <a href="/auth" class="text-sm font-medium text-gray-600 hover:text-[#5d0d36]">Login</a>
        <a href="/register" class="text-sm font-medium text-gray-600 hover:text-[#5d0d36]">Register</a>
      {/if}
    </div>
  </div>
</header>