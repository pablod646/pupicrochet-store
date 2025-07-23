
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import CategoryItem from './CategoryItem.svelte';

describe('CategoryItem component', () => {
  it('should render the category name and product count', () => {
    const category = {
      id: '1',
      name: 'Test Category',
      children: [],
      _count: {
        products: 5
      }
    };

    render(CategoryItem, { props: { category } });

    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('(5)')).toBeInTheDocument();
  });
});
