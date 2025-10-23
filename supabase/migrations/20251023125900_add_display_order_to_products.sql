/*
  # Add display order column to products table

  1. Changes
    - Add `display_order` column to `products` table (integer, nullable)
    - Set default values for existing products based on created_at (newest = lowest order number)
    - Create index on display_order for efficient sorting
  
  2. Purpose
    - Enable custom ordering of products
    - New products will be added at the beginning (order = 0)
    - Admin can drag-and-drop to reorder products
*/

-- Add display_order column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE products ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Set initial display_order values based on created_at (newest first)
UPDATE products
SET display_order = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 as row_num
  FROM products
) AS subquery
WHERE products.id = subquery.id;

-- Create index for efficient ordering
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);