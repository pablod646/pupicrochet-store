<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import Footer from "./Footer.svelte";

  const meta = {
    title: "Layout/Footer",
    component: Footer,
    argTypes: {},
  } satisfies Meta<Footer>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {},
  };
</script>

<Footer {...Default.args} />
