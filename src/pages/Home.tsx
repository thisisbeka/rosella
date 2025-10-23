import { useEffect, useState } from 'react';
import { Flower2, Gift, Calendar, Crown, Flower } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';

interface HomeProps {
  onNavigate: (page: string, categorySlug?: string) => void;
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
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-slide-up flex-shrink-0" style={{ marginBottom: '-70px' }}>
              <img
                src="/ROSELLA_mainpage_new_2.png"
                alt="ROSELLA"
                loading="eager"
                fetchpriority="high"
                className="mx-auto animate-logo-glow"
                style={{
                  width: '600px',
                  maxWidth: '90vw',
                  height: 'auto',
                  objectFit: 'contain',
                  willChange: 'transform'
                }}
              />
            </div>
          </div>

          <p className="text-base md:text-lg text-amber-100 mb-8 tracking-wide animate-slide-up-delay max-w-xl">
            "Her Şey Bir İnsanı Sevmekle Başlar…"
          </p>

          <InteractiveHoverButton
            text="Katalog İncele"
            onClick={() => onNavigate('katalog')}
            className="px-12 py-4 w-auto bg-gradient-to-r from-amber-600 to-amber-500 text-white text-lg border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/50 animate-slide-up-delay-2 will-change-transform"
          />
        </div>

      </section>

      {featuredProducts.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-10 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
              Öne Çıkan Ürünler
            </h2>

            {isLoading ? (
              <div className="text-center text-amber-100">Yükleniyor...</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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

      <section className="py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-12 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
            Hizmetlerimiz
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <button
              onClick={() => onNavigate('cicekler')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Flower2 className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Çiçekler</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Her anınıza özel, taze ve zarif çiçek aranjmanları
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'all')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Çikolata & Teraryum</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Özel günleriniz için unutulmaz hediye seçenekleri
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'organizasyon')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Organizasyon</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Düğün, nişan ve özel etkinlikleriniz için profesyonel hizmet
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'vip-cicekler')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Vip Çiçekler</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                En seçkin ve prestijli çiçek aranjmanları
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'celenk')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 col-span-2 md:col-span-1 will-change-transform"
            >
              <Flower className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Çelenk</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Veda törenleriniz için anlamlı çelenк düzenlemeleri
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
