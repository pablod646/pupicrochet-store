<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $$Props extends HTMLButtonAttributes {
    variant?: "primary" | "secondary";
  }

  export let variant: $$Props["variant"] = "primary";

  let buttonClass = "";
  $: {
    if (variant === "primary") {
      buttonClass =
        "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    } else if (variant === "secondary") {
      buttonClass =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    }
  }
</script>

<button class={buttonClass} on:click {...$$restProps}>
  <slot />
</button>
