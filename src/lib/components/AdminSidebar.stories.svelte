<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import AdminSidebar from "./AdminSidebar.svelte";

  const meta = {
    title: "Admin/AdminSidebar",
    component: AdminSidebar,
    argTypes: {},
  } satisfies Meta<AdminSidebar>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {},
  };
</script>

<div class="flex h-screen">
  <AdminSidebar {...Default.args} />
  <div class="flex-1 p-4">
    <h1 class="text-xl font-semibold">Main Content Area</h1>
    <p>This is where the main content of the admin page would go.</p>
  </div>
</div>
