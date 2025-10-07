import { useEffect, useState } from 'react';
import { supabase, Product, Category } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

const WHATSAPP_NUMBER = '902247770177';

export default function Katalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (productsResult.error) throw productsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setProducts(productsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-amber-400 mb-12 tracking-wide">
          Katalog
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/50'
                : 'bg-black/60 text-amber-100 border border-amber-500/30 hover:border-amber-500/60'
            }`}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/50'
                  : 'bg-black/60 text-amber-100 border border-amber-500/30 hover:border-amber-500/60'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center text-amber-100 text-xl">Yükleniyor...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-amber-100/70 text-xl">
            Bu kategoride henüz ürün bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
