import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [forms, typography, containerQueries],
};