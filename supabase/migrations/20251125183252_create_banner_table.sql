/*
  # Create banner table for site-wide announcements

  1. New Tables
    - `banners`
      - `id` (uuid, primary key)
      - `title` (text) - Banner başlığı
      - `message` (text) - Banner mesajı
      - `is_active` (boolean) - Banner aktif mi?
      - `show_whatsapp_button` (boolean) - WhatsApp butonu gösterilsin mi?
      - `whatsapp_number` (text) - WhatsApp numarası
      - `background_color` (text) - Arka plan rengi (hex)
      - `text_color` (text) - Yazı rengi (hex)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `banners` table
    - Add policy for public read access (anyone can see active banners)
    - Add policy for authenticated admin users to manage banners
*/

CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  message text NOT NULL,
  is_active boolean DEFAULT false,
  show_whatsapp_button boolean DEFAULT true,
  whatsapp_number text DEFAULT '902247770177',
  background_color text DEFAULT '#DC2626',
  text_color text DEFAULT '#FFFFFF',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active banners"
  ON banners
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all banners"
  ON banners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert banners"
  ON banners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update banners"
  ON banners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete banners"
  ON banners
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO banners (title, message, is_active, show_whatsapp_button, whatsapp_number, background_color, text_color)
VALUES (
  'Özel Günler Hakkında Bilgilendirme',
  'Değerli müşterilerimiz, özel günlerde site fiyatlarımız geçersizdir. En doğru fiyat ve stok bilgisi için WhatsApp üzerinden iletişime geçebilirsiniz.',
  false,
  true,
  '902247770177',
  '#DC2626',
  '#FFFFFF'
)
ON CONFLICT DO NOTHING;