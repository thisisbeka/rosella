import { useState, useEffect } from 'react';
import { WavyBackground } from '../components/ui/wavy-background';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import ProductCard from '../components/ProductCard';
import ProductSchema from '../components/ProductSchema';
import { supabase, Product } from '../lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, categorySlug?: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const whatsappNumber = '905466002211';

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <div className="relative">
      <WavyBackground className="min-h-screen flex items-center justify-center px-4">
        <div className="relative z-10 text-center max-w-5xl mx-auto pt-32 pb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 animate-fade-in luxury-serif">
            ROSELLA
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 text-amber-100/90 animate-slide-up luxury-serif">
            Her Anınıza Zarafet Katın
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay">
            <InteractiveHoverButton
              text="Katalog"
              onClick={() => onNavigate('katalog')}
            />
            <InteractiveHoverButton
              text="İletişim"
              onClick={() => onNavigate('iletisim')}
            />
          </div>
        </div>
      </WavyBackground>

      {!isLoading && featuredProducts.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-black via-black/95 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400 luxury-serif">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-center text-amber-100/70 mb-12 text-lg">
              Sizin için özenle seçtiklerimiz
            </p>

            <div className="relative">
              {featuredProducts.length > 3 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black/70 hover:bg-black/90 text-amber-400 p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Previous products"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black/70 hover:bg-black/90 text-amber-400 p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Next products"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out gap-6"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / Math.min(featuredProducts.length, 3))}%)`,
                  }}
                >
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                    >
                      <ProductCard product={product} whatsappNumber={whatsappNumber} />
                      <ProductSchema product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {featuredProducts.length > 3 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.max(0, featuredProducts.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-amber-400 w-8' : 'bg-amber-400/30 w-2'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-400 luxury-serif">
            Kategoriler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Çiçekler',
                slug: 'cicekler',
                description: 'Taze ve zarif çiçek aranjmanları',
                image: '/img2.jpg',
              },
              {
                title: 'Çikolata',
                slug: 'cikolata',
                description: 'Özel çikolata hediyeleri',
                image: '/img3.jpg',
              },
              {
                title: 'Organizasyon',
                slug: 'organizasyon',
                description: 'Özel günleriniz için hizmet',
                image: '/img4.jpg',
              },
            ].map((category) => (
              <button
                key={category.slug}
                onClick={() => onNavigate(category.slug)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] hover:scale-105 transition-all duration-500"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-amber-400 mb-2 luxury-serif group-hover:text-amber-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-amber-100/80 group-hover:text-amber-100 transition-colors">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
