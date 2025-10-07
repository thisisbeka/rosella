/*
  # Add Discount Support to Products

  1. Changes
    - Add `discount_percentage` column to products table
      - Nullable integer field (0-100)
      - Default value is NULL (no discount)
    
  2. New Category
    - Add "İndirimli Ürünler" (Discounted Products) category
    - This category will be used to display products with discounts
  
  3. Notes
    - Discount percentage will be displayed as a badge on product images
    - Products with discount will show original price strikethrough and new discounted price
*/

-- Add discount_percentage column to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE products ADD COLUMN discount_percentage integer CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;
END $$;

-- Insert "İndirimli Ürünler" category if it doesn't exist
INSERT INTO categories (name, slug) VALUES
  ('İndirimli Ürünler', 'indirimli-urunler')
ON CONFLICT (slug) DO NOTHING;