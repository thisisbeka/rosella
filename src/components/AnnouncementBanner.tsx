import { useEffect, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { supabase, Banner } from '../lib/supabase';
import { PulsingBorder } from '@paper-design/shaders-react';

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
    <div className="px-4 sm:px-6 lg:px-8 mt-2">
      <div className="relative max-w-7xl mx-auto animate-slideDown" style={{ height: '48px' }}>
        <PulsingBorder
          speed={1}
          roundness={0.5}
          thickness={0.2}
          softness={0.75}
          intensity={0.5}
          bloom={0.4}
          spots={5}
          spotSize={0.5}
          pulse={0.3}
          smoke={0.4}
          smokeSize={0.6}
          scale={0.8}
          rotation={0}
          aspectRatio="auto"
          colors={['#FFD700', '#FFA500', '#FF8C00']}
          colorBack="#00000000"
          className="absolute inset-0 rounded-full pointer-events-none z-0"
          style={{ width: '100%', height: '100%' }}
        />
        <div
          className="relative rounded-full shadow-xl py-1.5 px-4 sm:px-6 overflow-hidden z-10 h-full flex items-center"
          style={{
            backgroundColor: banner.background_color,
            color: banner.text_color,
          }}
        >
          <button
            onClick={handleDismiss}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 p-1 sm:p-1.5 rounded-full hover:bg-black/20 transition-colors z-10"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="text-center pr-6 sm:pr-8 w-full">
            {banner.title && banner.message ? (
              <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                <span className="font-bold">{banner.title}:</span> {banner.message}
              </p>
            ) : (
              <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                {banner.title || banner.message}
              </p>
            )}
          </div>
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
