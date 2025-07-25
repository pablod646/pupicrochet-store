<script lang="ts">
  import { page } from '$app/stores';

  export let status: number | undefined = undefined;
  export let message: string | undefined = undefined;

  $: displayStatus = status || $page.status;
  $: displayMessage = message || $page.error?.message || 'An unexpected error occurred.';
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-md text-center">
    <h1 class="text-9xl font-extrabold text-primary-500 dark:text-primary-400">{displayStatus}</h1>
    <p class="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
      {displayMessage}
    </p>
    {#if displayStatus === 404}
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
    {:else}
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        Something went wrong on our end. Please try again later.
      </p>
    {/if}
    <div class="mt-6">
      <a
        href="/"
        class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400"
      >
        Go back home
      </a>
    </div>
  </div>
</div>
