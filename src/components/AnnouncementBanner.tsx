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
    <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-2xl px-4 animate-slideDown">
      <div className="relative p-[3px]">
        <PulsingBorder
          speed={1}
          roundness={0.1}
          thickness={0.3}
          softness={0.5}
          intensity={0.9}
          bloom={0.7}
          spots={6}
          spotSize={0.5}
          pulse={0.5}
          smoke={0.6}
          smokeSize={0.6}
          scale={1}
          rotation={0}
          aspectRatio="auto"
          colors={['#FFD700', '#FFA500', '#FF8C00']}
          colorBack="#00000000"
          className="absolute inset-0 rounded-2xl"
        />
        <div
          className="relative rounded-2xl shadow-2xl p-12 backdrop-blur-md flex items-center justify-center"
          style={{
            backgroundColor: banner.background_color,
            color: banner.text_color,
          }}
        >
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/30 transition-colors z-10"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center w-full px-4">
            {banner.title && banner.message ? (
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">{banner.title}</h3>
                <p className="text-base sm:text-xl leading-snug">{banner.message}</p>
              </div>
            ) : (
              <p className="text-xl sm:text-2xl font-semibold leading-tight">
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
