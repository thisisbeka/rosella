import { useEffect, useState } from 'react';
import { Flower2, Gift, Calendar } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const WHATSAPP_NUMBER = '902247770177';

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(6);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Flower2
              className="text-amber-400 animate-bloom flex-shrink-0"
              style={{
                width: '80px',
                height: '80px',
                filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))',
                marginBottom: '-60px'
              }}
            />

            <div className="animate-slide-up flex-shrink-0" style={{ marginTop: '0px', marginBottom: '-90px' }}>
              <img
                src="/ROSELLA_mainpage.png"
                alt="ROSELLA"
                className="mx-auto animate-logo-glow"
                style={{
                  width: '600px',
                  maxWidth: '90vw',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          <p className="text-base md:text-lg text-amber-100 mb-8 tracking-wide animate-slide-up-delay max-w-xl">
            Herşey bir insanı sevmekle başlar
          </p>

          <button
            onClick={() => onNavigate('katalog')}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 animate-slide-up-delay-2"
          >
            Katalog İncele
          </button>
        </div>

      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-400 mb-16 tracking-wide">
            Hizmetlerimiz
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              onClick={() => onNavigate('cicekler')}
              className="group p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <Flower2 className="w-16 h-16 text-amber-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-semibold text-amber-100 mb-4">Çiçekler</h3>
              <p className="text-amber-100/70 leading-relaxed">
                Her anınıza özel, taze ve zarif çiçek aranjmanları
              </p>
            </button>

            <button
              onClick={() => onNavigate('cikolata')}
              className="group p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <Gift className="w-16 h-16 text-amber-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-semibold text-amber-100 mb-4">Çikolata & Teraryum</h3>
              <p className="text-amber-100/70 leading-relaxed">
                Özel günleriniz için unutulmaz hediye seçenekleri
              </p>
            </button>

            <button
              onClick={() => onNavigate('organizasyon')}
              className="group p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <Calendar className="w-16 h-16 text-amber-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-semibold text-amber-100 mb-4">Organizasyon</h3>
              <p className="text-amber-100/70 leading-relaxed">
                Düğün, nişan ve özel etkinlikleriniz için profesyonel hizmet
              </p>
            </button>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-400 mb-16 tracking-wide">
              Öne Çıkan Ürünler
            </h2>

            {isLoading ? (
              <div className="text-center text-amber-100">Yükleniyor...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatsappNumber={WHATSAPP_NUMBER}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
