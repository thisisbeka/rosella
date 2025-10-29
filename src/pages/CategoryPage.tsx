import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductSchema from '../components/ProductSchema';
import { supabase, Product, Category } from '../lib/supabase';

interface CategoryPageProps {
  categorySlug: string | string[];
  title: string;
  description: string;
}

export default function CategoryPage({ categorySlug, title, description }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const whatsappNumber = '905466002211';

  useEffect(() => {
    loadProducts();
  }, [categorySlug]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const slugs = Array.isArray(categorySlug) ? categorySlug : [categorySlug];

      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('id')
        .in('slug', slugs);

      if (catError) throw catError;

      if (categoriesData && categoriesData.length > 0) {
        const categoryIds = categoriesData.map(c => c.id);

        const { data: productCategories, error: pcError } = await supabase
          .from('product_categories')
          .select('product_id')
          .in('category_id', categoryIds);

        if (pcError) throw pcError;

        const productIds = productCategories?.map(pc => pc.product_id) || [];

        if (productIds.length > 0) {
          const { data: productsData, error: prodError } = await supabase
            .from('products')
            .select('*')
            .in('id', productIds)
            .order('display_order', { ascending: true });

          if (prodError) throw prodError;
          setProducts(productsData || []);
        } else {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/98 to-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-amber-400 luxury-serif">
          {title}
        </h1>
        <p className="text-center text-amber-100/70 mb-12 text-lg">
          {description}
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-amber-100/70 py-20">
            <p className="text-xl">Bu kategoride henüz ürün bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} whatsappNumber={whatsappNumber} />
                <ProductSchema product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
