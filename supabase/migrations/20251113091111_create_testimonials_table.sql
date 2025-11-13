/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Name of the customer
      - `customer_title` (text, optional) - Title or designation
      - `rating` (integer) - Rating from 1-5
      - `comment` (text) - Testimonial text
      - `image_url` (text, optional) - Customer photo URL
      - `is_active` (boolean) - Whether to display the testimonial
      - `display_order` (integer) - Order for displaying testimonials
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to active testimonials
    - Add policies for authenticated admin users to manage testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_title text DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  comment text NOT NULL,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);