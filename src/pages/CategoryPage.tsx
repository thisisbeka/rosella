import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
  categorySlug: string | string[];
  title: string;
  description: string;
}

const WHATSAPP_NUMBER = '902247770177';

export default function CategoryPage({ categorySlug, title, description }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [categorySlug]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const slugs = Array.isArray(categorySlug) ? categorySlug : [categorySlug];

      const { data: categories } = await supabase
        .from('categories')
        .select('id')
        .in('slug', slugs);

      if (categories && categories.length > 0) {
        const categoryIds = categories.map(cat => cat.id);

        const { data: productCategories } = await supabase
          .from('product_categories')
          .select('product_id')
          .in('category_id', categoryIds);

        if (productCategories && productCategories.length > 0) {
          const productIds = productCategories.map(pc => pc.product_id);
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .in('id', productIds)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setProducts(data || []);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
            {title}
          </h1>
          <p className="text-xl text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-amber-100 text-lg sm:text-xl">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-amber-100/70 text-lg sm:text-xl">
            Bu kategoride henüz ürün bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={WHATSAPP_NUMBER}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
