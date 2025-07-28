// src/lib/utils/slug.ts

export function generateSlug(name: string): string {
  return name
    .toString()
    .normalize("NFD") // Normalize to decompose combined characters
    .replace(/[̀-ͯ]/g, "") // Remove diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word chars (except hyphens)
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphens from start of text
    .replace(/-+$/, ""); // Trim hyphens from end of text
}
