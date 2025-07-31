<script lang="ts">
  import { SvelteURLSearchParams } from "svelte/reactivity";

  export let currentPage: number;
  export let totalPages: number;
  export let baseUrl = "/productos";
  export let searchParams: string;

  $: queryParams = new SvelteURLSearchParams(searchParams);

  function getPageUrl(page: number): string {
    queryParams.set("page", page.toString());
    return `${baseUrl}?${queryParams.toString()}`;
  }
</script>

{#if totalPages > 1}
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href={getPageUrl(currentPage - 1)}
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentPage ===
        1
          ? 'pointer-events-none opacity-50'
          : ''}"
        aria-disabled={currentPage === 1}>Previous</a
      >
      <a
        href={getPageUrl(currentPage + 1)}
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentPage ===
        totalPages
          ? 'pointer-events-none opacity-50'
          : ''}"
        aria-disabled={currentPage === totalPages}>Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{(currentPage - 1) * 10 + 1}</span>
          to
          <span class="font-medium"
            >{Math.min(currentPage * 10, totalPages * 10)}</span
          >
          of
          <span class="font-medium">{totalPages * 10}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href={getPageUrl(currentPage - 1)}
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 {currentPage ===
            1
              ? 'pointer-events-none opacity-50'
              : ''}"
            aria-disabled={currentPage === 1}
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 001.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          {#each Array(totalPages) as _, i}
            <a
              href={getPageUrl(i + 1)}
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold {currentPage ===
              i + 1
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}"
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </a>
          {/each}
          <a
            href={getPageUrl(currentPage + 1)}
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 {currentPage ===
            totalPages
              ? 'pointer-events-none opacity-50'
              : ''}"
            aria-disabled={currentPage === totalPages}
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
{/if}
