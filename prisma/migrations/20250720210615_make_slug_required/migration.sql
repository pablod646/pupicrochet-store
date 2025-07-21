-- Add SQL to populate existing product slugs here.
-- Example for SQLite:
-- UPDATE Product SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL;
-- You might need a more robust slug generation function depending on your needs.

-- After populating, you can add the NOT NULL constraint:
-- ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL;