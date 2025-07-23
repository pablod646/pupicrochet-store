
import { vi } from 'vitest';
import { readable } from 'svelte/store';

vi.mock('$app/stores', () => ({
  page: readable({
    url: new URL('http://localhost'),
    params: {},
    route: {
      id: null
    },
    status: 200,
    error: null,
    data: {},
    form: undefined
  }),
  navigating: readable(null),
  updated: readable(false)
}));
