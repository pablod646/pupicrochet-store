<script lang="ts">
  import { page } from "$app/stores";
  import Button from "./ui/Button.svelte";

  export let status: number | undefined = undefined;
  export let message: string | undefined = undefined;

  $: displayStatus = status || $page.status;
  $: displayMessage =
    message || $page.error?.message || "An unexpected error occurred.";
</script>

<div
  class="flex min-h-full flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8"
>
  <div class="mx-auto max-w-md text-center">
    <h1 class="text-9xl font-extrabold text-indigo-600">{displayStatus}</h1>
    <p class="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {displayMessage}
    </p>
    {#if displayStatus === 404}
      <p class="mt-4 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    {:else}
      <p class="mt-4 text-gray-600">
        Something went wrong on our end. Please try again later.
      </p>
    {/if}
    <div class="mt-6">
      <Button variant="primary" href="/">Go back home</Button>
    </div>
  </div>
</div>
