import globals from "globals";
import eslintPluginSvelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    ignores: [".DS_Store", "build", ".svelte-kit", "dist", "node_modules"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
    plugins: {
      svelte: eslintPluginSvelte,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...eslintPluginSvelte.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
];