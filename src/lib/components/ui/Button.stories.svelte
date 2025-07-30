<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import Button from "./Button.svelte";

  const meta = {
    title: "UI/Button",
    component: Button,
    argTypes: {},
  } satisfies Meta<Button>;

  type Story = StoryObj<typeof meta>;

  export const Primary: Story = {
    args: { variant: "primary" },
  };

  export const Secondary: Story = {
    args: { variant: "secondary" },
  };
</script>
