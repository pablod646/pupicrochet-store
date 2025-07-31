<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import FilterSidebar from "./FilterSidebar.svelte";
  import type { Category } from "@prisma/client";

  type CategoryWithProductCount = Category & {
    _count: { products: number };
    children: CategoryWithProductCount[];
  };

  const mockCategories: CategoryWithProductCount[] = [
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
    title: "Components/FilterSidebar",
    component: FilterSidebar,
    argTypes: {
      categories: { control: "object" },
    },
  } satisfies Meta<FilterSidebar>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      categories: mockCategories,
    },
  };
</script>

<div class="flex">
  <FilterSidebar {...Default.args} />
  <div class="flex-1 p-4">
    <h1 class="text-xl font-semibold">Main Content Area</h1>
    <p>This is where the main content of the product listing would go.</p>
  </div>
</div>
