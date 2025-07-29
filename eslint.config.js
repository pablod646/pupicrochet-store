import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import jsxA11y from "eslint-plugin-jsx-a11y";
import svelteParser from "svelte-eslint-parser";
import typescriptParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
    plugins: {
      svelte,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...svelte.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
];
