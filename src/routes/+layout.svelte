<script lang="ts">
  import '../app.css';
  import type { PageData } from './$types';

  export let data;

  $: cartItemCount = data.cart?.items.length || 0;
  $: user = data.user;

  let searchQuery = '';
</script>

<div
  class="relative flex size-full min-h-screen flex-col bg-[#fbf8fa] group/design-root overflow-x-hidden"
  style='font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'
>
  <div class="layout-container flex h-full grow flex-col">
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e8ed] px-10 py-3">
      <div class="flex items-center gap-8">
        <a href="/" class="flex items-center gap-4 text-[#1b0e15]">
          <div class="size-6 text-[#5d0d36]">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div class="text-[#955074] flex border-none bg-[#f3e8ed] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
            </div>
            <input name="q" bind:value={searchQuery} placeholder="Buscar..." class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#1b0e15] focus:outline-0 focus:ring-0 border-none bg-[#f3e8ed] focus:border-none h-full placeholder:text-[#955074] px-4 text-base font-normal leading-normal" />
          </div>
        </form>
        <div class="flex items-center gap-2">
          <div class="relative">
              <a href="/carrito" class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#f3e8ed] text-[#1b0e15]">
                <div class="text-[#1b0e15]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path></svg>
                </div>
              </a>
              {#if cartItemCount > 0}
                <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5d0d36] text-xs font-bold text-white">{cartItemCount}</span>
              {/if}
            </div>
          {#if user}
            <div class="relative">
              <a href="/admin" class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-200 text-gray-600">
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

    <main class="flex-1">
      <slot />
    </main>

    <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
      <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        <a class="text-[#955074] text-base font-normal leading-normal min-w-40" href="#">Contacto</a>
        <a class="text-[#955074] text-base font-normal leading-normal min-w-40" href="#">Preguntas frecuentes</a>
        <a class="text-[#955074] text-base font-normal leading-normal min-w-40" href="#">Política de privacidad</a>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#">
          <div class="text-[#955074]" data-icon="TwitterLogo" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
            </svg>
          </div>
        </a>
        <a href="#">
          <div class="text-[#955074]" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
            </svg>
          </div>
        </a>
        <a href="#">
          <div class="text-[#955074]" data-icon="FacebookLogo" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
            </svg>
          </div>
        </a>
      </div>
      <p class="text-[#955074] text-base font-normal leading-normal">
        &copy; {new Date().getFullYear()} PupiCrochet. Todos los derechos reservados.
      </p>
    </footer>
  </div>
</div>
