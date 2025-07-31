<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import CategoryNode from "./CategoryNode.svelte";
  import type { CategoryWithChildren } from "$lib/server/queries/categories";

  const mockCategories: CategoryWithChildren[] = [
    {
      id: "1",
      name: "Ropa",
      slug: "ropa",
      parentId: null,
      _count: { products: 10 },
      children: [
        {
          id: "1-1",
          name: "Camisetas",
          slug: "camisetas",
          parentId: "1",
          _count: { products: 5 },
          children: [],
        },
        {
          id: "1-2",
          name: "Pantalones",
          slug: "pantalones",
          parentId: "1",
          _count: { products: 3 },
          children: [
            {
              id: "1-2-1",
              name: "Vaqueros",
              slug: "vaqueros",
              parentId: "1-2",
              _count: { products: 2 },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Accesorios",
      slug: "accesorios",
      parentId: null,
      _count: { products: 7 },
      children: [],
    },
    {
      id: "3",
      name: "Hogar",
      slug: "hogar",
      parentId: null,
      _count: { products: 0 },
      children: [],
    },
  ];

  const meta = {
    title: "Components/CategoryNode",
    component: CategoryNode,
    argTypes: {
      node: { control: "object" },
      level: { control: "number" },
      selectedCategories: { control: "object" },
      highlightedCategory: { control: "object" },
      showAdminControls: { control: "boolean" },
      onDelete: { action: "delete" },
      onEdit: { action: "edit" },
      on: { action: "categoryClick" },
    },
  } satisfies Meta<CategoryNode>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      node: mockCategories[0],
      level: 0,
      selectedCategories: [],
      highlightedCategory: null,
      showAdminControls: false,
    },
  };

  export const WithSelectedCategory: Story = {
    args: {
      node: mockCategories[0],
      level: 0,
      selectedCategories: [mockCategories[0].children[0]],
      highlightedCategory: null,
      showAdminControls: false,
    },
  };

  export const WithHighlightedCategory: Story = {
    args: {
      node: mockCategories[0],
      level: 0,
      selectedCategories: [],
      highlightedCategory: mockCategories[0].children[0].children[0],
      showAdminControls: false,
    },
  };

  export const WithAdminControls: Story = {
    args: {
      node: mockCategories[0],
      level: 0,
      selectedCategories: [],
      highlightedCategory: null,
      showAdminControls: true,
    },
  };

  export const NestedCategories: Story = {
    args: {
      node: mockCategories[0],
      level: 0,
      selectedCategories: [],
      highlightedCategory: null,
      showAdminControls: false,
    },
    render: (args) => ({
      Component: CategoryNode,
      props: args,
      // To render the full tree, we need to manually render the root nodes
      // and let the recursive component handle the rest.
      // This is a simplified example, in a real scenario you might map over mockCategories
      // and render each top-level node.
      template: `
        <ul>
          {#each ${JSON.stringify(mockCategories)} as categoryNode (categoryNode.id)}
            <CategoryNode node={categoryNode} level={0} {...args} />
          {/each}
        </ul>
      `,
    }),
  };
</script>
