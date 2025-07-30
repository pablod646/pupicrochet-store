<script lang="ts">
  import type { Category } from "@prisma/client";

  type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

  export let category: CategoryWithChildren;
  export let indent = 0;
</script>

<option value={category.id}>
  {"&nbsp;".repeat(indent * 4)}{category.name}
</option>

{#if category.children && category.children.length > 0}
  {#each category.children as child (child.id)}
    <svelte:self category={child} indent={indent + 1} />
  {/each}
{/if}
