import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_urls: string[];
  category_id: string;
  is_featured: boolean;
  discount_percentage: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  product_id: string;
  category_id: string;
  created_at: string;
}

export interface ReviewPhoto {
  reference: string;
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_title: string;
  rating: number;
  comment: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  relative_time?: string;
  author_url?: string;
  review_photos?: ReviewPhoto[];
  source?: string;
}

export interface Banner {
  id: string;
  title: string;
  message: string;
  is_active: boolean;
  show_whatsapp_button: boolean;
  whatsapp_number: string;
  background_color: string;
  text_color: string;
  created_at: string;
  updated_at: string;
}

export function getOptimizedImageUrl(url: string, width: number = 800, quality: number = 75): string {
  if (!url || !url.includes('supabase.co/storage')) {
    return url;
  }

  const urlObj = new URL(url);
  urlObj.searchParams.set('width', width.toString());
  urlObj.searchParams.set('quality', quality.toString());

  return urlObj.toString();
}
