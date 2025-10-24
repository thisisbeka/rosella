/*
  # Add Multiple Images Support to Products

  1. Changes
    - Add `image_urls` column to store array of image URLs
    - Keep `image_url` for backward compatibility (will store the primary image)
    - All existing products will have their single image converted to array format
  
  2. Migration Steps
    - Add new column `image_urls` as text array
    - Copy existing `image_url` values to `image_urls` as single-item arrays
    - Update RLS policies remain unchanged
  
  3. Notes
    - `image_urls` will contain all product images in order
    - First image in `image_urls` array is the primary/featured image
    - `image_url` will be kept in sync with first item of `image_urls` for compatibility
*/

-- Add image_urls column to store multiple images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE products ADD COLUMN image_urls text[] DEFAULT '{}';
  END IF;
END $$;

-- Migrate existing single images to array format
UPDATE products 
SET image_urls = ARRAY[image_url]
WHERE image_urls = '{}' OR image_urls IS NULL;

-- Make image_urls not null with default empty array
ALTER TABLE products ALTER COLUMN image_urls SET DEFAULT '{}';
ALTER TABLE products ALTER COLUMN image_urls SET NOT NULL;