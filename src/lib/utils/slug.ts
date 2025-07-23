// src/lib/utils/slug.ts

export function generateSlug(name: string): string {
  return name
    .toString()
    .normalize('NFD') // Normalize to decompose combined characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove all non-word chars (except hyphens)
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Trim hyphens from start of text
    .replace(/-+$/, ''); // Trim hyphens from end of text
}

export function generateUniqueSlug(
  name: string,
  existingSlugs: { slug: string }[]
): string {
  let slug = generateSlug(name);
  const allSlugs = new Set(existingSlugs.map((p) => p.slug));

  if (allSlugs.has(slug)) {
    let counter = 1;
    let newSlug = `${slug}-${counter}`;
    while (allSlugs.has(newSlug)) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }
    slug = newSlug;
  }

  return slug;
}
