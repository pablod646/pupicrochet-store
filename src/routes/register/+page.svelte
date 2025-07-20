<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { ActionData } from './$types';

  export let form: ActionData;

  let message: string | null = null;
  let messageType: 'success' | 'error' | null = null;

  const handleSubmit = () => {
    message = null; // Clear previous messages on submit
    messageType = null;

    return async ({ result }) => {
      if (result.type === 'success') {
        message = 'Registration successful! Redirecting...';
        messageType = 'success';
        // Manually redirect after a short delay to show the success message
        setTimeout(() => {
          goto('/auth');
        }, 1500);
      } else if (result.type === 'failure') {
        // Server-side validation errors (e.g., email already exists, missing fields)
        if (result.data && result.data.message) {
          message = result.data.message;
        } else {
          message = 'Registration failed due to validation errors.';
        }
        messageType = 'error';
      } else if (result.type === 'error') {
        // Network errors or unhandled exceptions during form submission
        message = 'An unexpected error occurred. Please try again.';
        messageType = 'error';
      }
      // For 'redirect' type, SvelteKit handles it automatically, so no explicit message needed here
    };
  };
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Create a new account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="POST" action="?/register" use:enhance={handleSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
          >Name (Optional)</label
        >
        <div class="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Register</button
        >
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Already have an account?
      <a href="/auth" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Sign in here</a
      >
    </p>
  </div>
</div>

{#if message}
  <p class="mt-4 text-center {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">{message}</p>
{/if}

{#if form?.message}
  <p class="mt-4 text-center text-red-500">{form.message}</p>
{/if}