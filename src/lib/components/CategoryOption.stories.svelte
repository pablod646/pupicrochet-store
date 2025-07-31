<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import CategoryOption from "./CategoryOption.svelte";
  import type { Category } from "@prisma/client";

  type CategoryWithChildren = Category & { children: CategoryWithChildren[] };

  const mockCategories: CategoryWithChildren[] = [
    {
      id: "1",
      name: "Ropa",
      slug: "ropa",
      parentId: null,
      children: [
        {
          id: "1-1",
          name: "Camisetas",
          slug: "camisetas",
          parentId: "1",
          children: [],
        },
        {
          id: "1-2",
          name: "Pantalones",
          slug: "pantalones",
          parentId: "1",
          children: [
            {
              id: "1-2-1",
              name: "Vaqueros",
              slug: "vaqueros",
              parentId: "1-2",
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
      children: [],
    },
  ];

  const meta = {
    title: "Components/CategoryOption",
    component: CategoryOption,
    argTypes: {
      category: { control: "object" },
      indent: { control: "number" },
    },
  } satisfies Meta<CategoryOption>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      category: mockCategories[0],
      indent: 0,
    },
  };

  export const Nested: Story = {
    args: {
      category: mockCategories[0].children[0],
      indent: 1,
    },
  };

  export const DeeplyNested: Story = {
    args: {
      category: mockCategories[0].children[1].children[0],
      indent: 2,
    },
  };

  export const FullSelectExample: Story = {
    render: () => ({
      Component: CategoryOption,
      props: {},
      template: `
        <select class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="">Select a category</option>
          {#each ${JSON.stringify(mockCategories)} as category (category.id)}
            <CategoryOption category={category} indent={0} />
          {/each}
        </select>
      `,
    }),
  };
</script>
