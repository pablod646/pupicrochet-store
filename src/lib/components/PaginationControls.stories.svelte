<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import PaginationControls from "./PaginationControls.svelte";

  const meta = {
    title: "Components/PaginationControls",
    component: PaginationControls,
    argTypes: {
      currentPage: { control: "number" },
      totalPages: { control: "number" },
      baseUrl: { control: "text" },
      searchParams: { control: "text" },
    },
  } satisfies Meta<PaginationControls>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      currentPage: 1,
      totalPages: 10,
      baseUrl: "/productos",
      searchParams: "",
    },
  };

  export const MiddlePage: Story = {
    args: {
      currentPage: 5,
      totalPages: 10,
      baseUrl: "/productos",
      searchParams: "",
    },
  };

  export const LastPage: Story = {
    args: {
      currentPage: 10,
      totalPages: 10,
      baseUrl: "/productos",
      searchParams: "",
    },
  };

  export const WithSearchParams: Story = {
    args: {
      currentPage: 1,
      totalPages: 5,
      baseUrl: "/productos",
      searchParams: "category=ropa&sort=price",
    },
  };
</script>

<div class="p-4">
  <PaginationControls {...Default.args} />
</div>
