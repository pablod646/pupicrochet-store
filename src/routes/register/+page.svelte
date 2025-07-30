<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form, {
    onResult({ result }) {
      if (result.type === 'success') {
        goto('/auth');
      }
    },
  });
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Crea una nueva cuenta
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="POST" action="?/register" use:enhance>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
          >Correo electrónico</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="tu@ejemplo.com"
            bind:value={$form.email}
          />
          {#if $errors.email}
            <p class="mt-2 text-sm text-red-600">{$errors.email}</p>
          {/if}
        </div>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
          >Nombre (Opcional)</label
        >
        <div class="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Tu nombre"
            bind:value={$form.name}
          />
          {#if $errors.name}
            <p class="mt-2 text-sm text-red-600">{$errors.name}</p>
          {/if}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Contraseña</label
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
            placeholder="Contraseña"
            bind:value={$form.password}
          />
          {#if $errors.password}
            <p class="mt-2 text-sm text-red-600">{$errors.password}</p>
          {/if}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900"
            >Confirmar Contraseña</label
          >
        </div>
        <div class="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Confirmar Contraseña"
            bind:value={$form.confirmPassword}
          />
          {#if $errors.confirmPassword}
            <p class="mt-2 text-sm text-red-600">{$errors.confirmPassword}</p>
          {/if}
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Registrarse</button
        >
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      ¿Ya tienes una cuenta?
      <a href="/auth" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Inicia sesión aquí</a
      >
    </p>
  </div>
</div>