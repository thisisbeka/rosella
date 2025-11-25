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
    <>
      <div className="h-20 md:h-24" style={{ backgroundColor: banner.background_color }}></div>
      <div
        className="relative px-4 py-4 md:py-6 shadow-2xl animate-slideDown"
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
    </>
  );
}
