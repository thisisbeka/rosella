import { useEffect, useState } from 'react';
import { Flower2, Gift, Calendar, Crown, Flower, Car } from 'lucide-react';
import { supabase, Product, Testimonial, getOptimizedImageUrl } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

interface HomeProps {
  onNavigate: (page: string, categorySlug?: string) => void;
}

const WHATSAPP_NUMBER = '902247770177';

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
    loadTestimonials();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(6);

      if (error) throw error;
      const products = data || [];
      setFeaturedProducts(products);

      if (products.length > 0) {
        products.slice(0, 3).forEach((product) => {
          const imageUrl = product.image_urls?.[0] || product.image_url;
          if (imageUrl) {
            const optimizedUrl = getOptimizedImageUrl(imageUrl, 600, 80);
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = optimizedUrl;
            document.head.appendChild(link);
          }
        });
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTestimonials = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-google-reviews`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Google reviews');
      }

      const data = await response.json();

      if (data.reviews && data.reviews.length > 0) {
        const formattedReviews = data.reviews.map((review: any, index: number) => ({
          id: `google-${index}`,
          customer_name: review.customer_name,
          customer_title: '',
          rating: review.rating,
          comment: review.comment,
          image_url: review.image_url,
          is_active: true,
          display_order: index,
          created_at: review.created_at,
          updated_at: review.created_at,
          relative_time: review.relative_time,
          author_url: review.author_url,
          review_photos: review.photos,
          source: 'google',
        }));

        setTestimonials(formattedReviews);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setTestimonials([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <section className="relative flex items-center justify-center overflow-hidden pt-[140px] md:pt-[160px] pb-10">
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-slide-up flex-shrink-0 -mb-[45px] md:-mb-[110px]">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/ROSELLA_mainpage_new_2.png"
                />
                <img
                  src="/ROSELLA_mainpage_new_2.png"
                  alt="ROSELLA"
                  width="580"
                  height="200"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto animate-logo-glow"
                  style={{
                    width: '580px',
                    maxWidth: '90vw',
                    height: 'auto',
                    objectFit: 'contain',
                    willChange: 'transform'
                  }}
                />
              </picture>
            </div>

            <p className="text-base md:text-lg text-amber-100 tracking-wide animate-slide-up-delay max-w-xl" style={{ marginBottom: '40px' }}>
              "Her Şey Bir İnsanı Sevmekle Başlar…"
            </p>

            <InteractiveHoverButton
              text="Katalog İncele"
              onClick={() => onNavigate('katalog')}
              className="px-12 py-4 w-auto bg-gradient-to-r from-amber-600 to-amber-500 text-white text-lg border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/50 animate-slide-up-delay-2 will-change-transform"
            />
          </div>
        </div>

      </section>

      {featuredProducts.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-8 md:mb-10 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
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

      <section className="py-16 px-4">
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
              onClick={() => onNavigate('katalog', 'cikolata')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Çikolata</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Özel günleriniz için lezzetli çikolata hediyeleri
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'teraryum')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Teraryum</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Doğal ve zarif teraryum aranjmanları
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
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Flower className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Çelenk</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Açılış & Düğün & Özel günleriniz & Veda törenleriniz için anlamlı çelenk düzenlemeleri
              </p>
            </button>

            <button
              onClick={() => onNavigate('katalog', 'arac-susleme')}
              className="group p-6 sm:p-8 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 will-change-transform"
            >
              <Car className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-logo-glow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-2 sm:mb-4">Araç Süsleme</h3>
              <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
                Düğün ve özel günleriniz için şık araç süslemeleri
              </p>
            </button>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-12 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
              Müşteri Yorumları
            </h2>
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>
      )}
    </div>
  );
}
