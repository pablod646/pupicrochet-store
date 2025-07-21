-- Add SQL for creating Category and Subcategory tables, and adding subcategoryId to Product table.
-- Example for SQLite:

CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Subcategory_name_key" ON "Subcategory"("name");

CREATE UNIQUE INDEX "Subcategory_slug_key" ON "Subcategory"("slug");

ALTER TABLE "Product" ADD COLUMN "subcategoryId" TEXT;

-- You might need to add a foreign key constraint for subcategoryId if it's not nullable
-- ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
