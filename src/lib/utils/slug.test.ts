
import { describe, it, expect } from 'vitest';
import { generateSlug } from './slug';

describe('generateSlug', () => {
  it('should generate a basic slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(generateSlug('Hello World!@#')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world');
  });

  it('should handle leading/trailing spaces', () => {
    expect(generateSlug('  Hello World  ')).toBe('hello-world');
  });

  it('should handle accented characters', () => {
    expect(generateSlug('Olá Mundo')).toBe('ola-mundo');
  });

  it('should handle multiple hyphens', () => {
    expect(generateSlug('Hello--World')).toBe('hello-world');
  });

  it('should handle leading/trailing hyphens', () => {
    expect(generateSlug('--Hello-World--')).toBe('hello-world');
  });
});
