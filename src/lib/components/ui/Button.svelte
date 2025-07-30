<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $Props extends HTMLButtonAttributes {
    variant?: "primary" | "secondary";
    class?: string; // Allow passing additional classes
  }

  export let variant: $Props["variant"] = "primary";
  export let className: $Props["class"] = ""; // Rename to avoid conflict with 'class'

  let baseClass = "";
  $: {
    if (variant === "primary") {
      baseClass =
        "bg-blue-600 text-white focus:outline-none focus:shadow-outline hover:bg-blue-700 font-bold py-2 px-4 rounded";
    } else if (variant === "secondary") {
      baseClass =
        "bg-gray-300 text-gray-800 focus:outline-none focus:shadow-outline hover:bg-gray-400 font-bold py-2 px-4 rounded";
    }
  }
</script>

<button class={`${baseClass} ${className}`} on:click {...$restProps}>
  <slot />
</button>
