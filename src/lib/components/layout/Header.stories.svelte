<script lang="ts">
  import type { Meta, StoryObj } from "@storybook/svelte";
  import Header from "./Header.svelte";

  // Mock UserRole for Storybook
  type UserRole = "ADMIN" | "USER";

  interface UserSubset {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  }

  const meta = {
    title: "Layout/Header",
    component: Header,
    argTypes: {},
  } satisfies Meta<Header>;

  type Story = StoryObj<typeof meta>;

  export const LoggedInUserWithCartItems: Story = {
    args: {
      user: {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "USER",
      } as UserSubset,
      cartItemCount: 3,
    },
  };

  export const GuestUserEmptyCart: Story = {
    args: {
      user: null,
      cartItemCount: 0,
    },
  };

  export const AdminUser: Story = {
    args: {
      user: {
        id: "2",
        email: "admin@example.com",
        name: "Admin User",
        role: "ADMIN",
      } as UserSubset,
      cartItemCount: 0,
    },
  };
</script>
