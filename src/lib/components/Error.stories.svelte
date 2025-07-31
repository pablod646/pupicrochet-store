<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import Error from "./Error.svelte";

  const meta = {
    title: "Components/Error",
    component: Error,
    argTypes: {
      status: { control: "number" },
      message: { control: "text" },
    },
  } satisfies Meta<Error>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = {
    args: {
      status: 500,
      message: "Internal Server Error",
    },
  };

  export const NotFound: Story = {
    args: {
      status: 404,
      message: "Page Not Found",
    },
  };

  export const CustomMessage: Story = {
    args: {
      status: 403,
      message: "Access Denied",
    },
  };
</script>

<Error {...Default.args} />
