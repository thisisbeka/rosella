import { useEffect, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { supabase, Banner } from '../lib/supabase';

export default function AnnouncementBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    loadActiveBanner();
  }, []);

  const loadActiveBanner = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setBanner(data);
        const dismissed = sessionStorage.getItem(`banner-dismissed-${data.id}`);
        setIsVisible(!dismissed);
      }
    } catch (error) {
      console.error('Error loading banner:', error);
    }
  };

  const handleDismiss = () => {
    if (banner) {
      sessionStorage.setItem(`banner-dismissed-${banner.id}`, 'true');
    }
    setIsVisible(false);
  };

  const handleWhatsApp = () => {
    if (banner?.whatsapp_number) {
      window.open(`https://wa.me/${banner.whatsapp_number}`, '_blank');
    }
  };

  if (!banner || !isVisible) return null;

  return (
    <div
      className="relative px-4 py-4 md:py-6 shadow-2xl animate-slideDown mt-20 md:mt-24"
      style={{
        backgroundColor: banner.background_color,
        color: banner.text_color,
      }}
    >
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={handleDismiss}
          className="absolute -top-1 right-0 md:right-2 p-2 rounded-full hover:bg-black/20 transition-colors z-10"
          aria-label="Kapat"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="text-center space-y-3 md:space-y-4 pr-10">
          {banner.title && (
            <h3 className="text-lg md:text-2xl font-bold">
              {banner.title}
            </h3>
          )}

          <p className="text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
            {banner.message}
          </p>

          {banner.show_whatsapp_button && banner.whatsapp_number && (
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp ile İletişim: +90 {banner.whatsapp_number.slice(2, 5)} {banner.whatsapp_number.slice(5, 8)} {banner.whatsapp_number.slice(8, 10)} {banner.whatsapp_number.slice(10)}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
