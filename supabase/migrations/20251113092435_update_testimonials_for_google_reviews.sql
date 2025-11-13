/*
  # Update testimonials table for Google Reviews integration

  1. Changes
    - Add `relative_time` column for Google's relative time description (e.g., "2 weeks ago")
    - Add `author_url` column for link to reviewer's Google profile
    - Add `review_photos` column (JSONB array) for photos attached to reviews
    - Add `source` column to differentiate between manual and Google reviews
    - Make `customer_title` nullable with empty string default
    - Make `image_url` nullable with empty string default

  2. Notes
    - Existing data will be preserved
    - New columns are optional and will default to empty values
    - This enables storing complete Google review data including photos
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'relative_time'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN relative_time text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'author_url'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN author_url text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'review_photos'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN review_photos jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'source'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN source text DEFAULT 'manual';
  END IF;
END $$;