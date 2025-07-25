# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Environment Variables

This project uses environment variables for sensitive information and configuration. A `.env.example` file is provided as a template. To set up your environment variables:

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Fill in the appropriate values for each variable.

Example `.env` file:

```
DATABASE_URL="your_database_url_here"
AUTH_SECRET="your_auth_secret_here"
PUBLIC_NODE_ENV="development"
```

**Accessing Environment Variables in SvelteKit:**

-   For **public** environment variables (accessible in both client and server-side code), prefix them with `PUBLIC_` in your `.env` file and access them using `$env/static/public` (e.g., `import { PUBLIC_NODE_ENV } from '$env/static/public';`).
-   For **private** environment variables (server-side only), do not prefix them with `PUBLIC_` and access them using `$env/static/private` (e.g., `import { DATABASE_URL } from '$env/static/private';`).

**Important:** Do not commit your `.env` file to version control. It is already included in `.gitignore`.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
