/*
  # Add Index for Products Foreign Key

  1. Performance Optimization
    - Add index on `products.category_id` to improve query performance
    - This index will optimize lookups when filtering or joining products by category
    - Addresses the unindexed foreign key warning for `products_category_id_fkey`

  2. Notes
    - Using IF NOT EXISTS to ensure idempotency
    - Index will significantly improve performance of category-based product queries
*/

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);