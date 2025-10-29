import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductSchema from '../components/ProductSchema';
import { supabase, Product, Category } from '../lib/supabase';

interface KatalogProps {
  initialCategorySlug?: string | null;
}

export default function Katalog({ initialCategorySlug }: KatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategorySlug || null);
  const [isLoading, setIsLoading] = useState(true);

  const whatsappNumber = '905466002211';

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });

      if (selectedCategory) {
        const categoryData = categories.find(c => c.slug === selectedCategory);
        if (categoryData) {
          const { data: productCategories } = await supabase
            .from('product_categories')
            .select('product_id')
            .eq('category_id', categoryData.id);

          const productIds = productCategories?.map(pc => pc.product_id) || [];
          query = query.in('id', productIds);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
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
          Katalog
        </h1>
        <p className="text-center text-amber-100/70 mb-12 text-lg">
          Tüm ürünlerimizi keşfedin
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/50'
                : 'bg-white/10 text-amber-100 hover:bg-white/20'
            }`}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.slug
                  ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/50'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

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
