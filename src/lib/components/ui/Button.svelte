<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $Props extends HTMLButtonAttributes {
    variant?: "primary" | "secondary" | "tertiary";
    class?: string;
  }

  export let variant: $Props["variant"] = "primary";
  export let className: $Props["class"] = "";

  let baseClass = "";
  $: {
    if (variant === "primary") {
      baseClass =
        "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    } else if (variant === "secondary") {
      baseClass =
        "rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
    } else if (variant === "tertiary") {
      baseClass = "text-sm font-semibold leading-6 text-gray-900";
    }
  }
</script>

<button class={`${baseClass} ${className}`} on:click {...$$restProps}>
  <slot />
</button>
