import { writable } from 'svelte/store';

const userTheme = typeof window !== 'undefined' && localStorage.getItem('color-theme');

export const theme = writable(userTheme ?? 'light');

theme.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('color-theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});