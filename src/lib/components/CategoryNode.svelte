<script lang="ts">
  import type { Category } from '@prisma/client';

  type CategoryNode = Category & { children: CategoryNode[] };

  export let node: CategoryNode;
  export let level = 0;
</script>

<li>
  <slot {node} {level} />

  {#if node.children && node.children.length > 0}
    <ul class="ml-4">
      {#each node.children as childNode}
        <svelte:self node={childNode} level={level + 1} />
      {/each}
    </ul>
  {/if}
</li>
