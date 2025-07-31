<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import CategorySelector from "./CategorySelector.svelte";
  import type { Category } from "@prisma/client";

  type CategoryHierarchy = Category & { children: CategoryHierarchy[] };

  const mockCategories: CategoryHierarchy[] = [
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
    {
      id: "3",
      name: "Hogar",
      slug: "hogar",
      parentId: null,
      children: [],
    },
  ];

  const meta = {
    title: "Components/CategorySelector",
    component: CategorySelector,
    argTypes: {
      allCategories: { control: "object" },
      initialSelectedCategories: { control: "object" },
      labelledby: { control: "text" },
    },
  } satisfies Meta<CategorySelector>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      allCategories: mockCategories,
      initialSelectedCategories: [],
      labelledby: "category-selector-label",
    },
  };

  export const WithPreselectedCategories: Story = {
    args: {
      allCategories: mockCategories,
      initialSelectedCategories: [
        mockCategories[0].children[0],
        mockCategories[1],
      ],
      labelledby: "category-selector-label",
    },
  };
</script>

<div class="p-4">
  <span id="category-selector-label" class="sr-only">Category Selector</span>
  <CategorySelector {...Default.args} />
</div>
