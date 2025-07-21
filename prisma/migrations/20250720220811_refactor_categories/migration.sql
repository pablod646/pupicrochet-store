-- Drop the Subcategory table
DROP TABLE "Subcategory";

-- Add parentId to Category table
ALTER TABLE "Category" ADD COLUMN "parentId" TEXT;

-- Add categoryId to Product table and remove subcategoryId
ALTER TABLE "Product" RENAME COLUMN "subcategoryId" TO "categoryId";

-- Add foreign key constraint for parentId in Category table
-- This is a self-referencing foreign key
-- ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Add foreign key constraint for categoryId in Product table
-- ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
