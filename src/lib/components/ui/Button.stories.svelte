<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import Button from "./Button.svelte";

  const meta = {
    title: "UI/Button",
    component: Button,
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["primary", "secondary", "tertiary"],
      },
    },
  } satisfies Meta<Button>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Primary: Story = {
    args: {
      variant: "primary",
      children: "Button",
    },
  };

  export const Secondary: Story = {
    args: {
      variant: "secondary",
      children: "Button",
    },
  };

  export const Tertiary: Story = {
    args: {
      variant: "tertiary",
      children: "Button",
    },
  };
</script>

<Button {...Primary.args}>
  <slot>{Primary.args.children}</slot>
</Button>
