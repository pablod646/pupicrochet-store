
import { render } from '@testing-library/svelte';
import { SvelteKitProvider } from '@sveltejs/kit/experimental';

export const renderWithKit = (component, options) => {
  return render(SvelteKitProvider, {
    props: {
      child: component,
      ...options
    }
  });
};
