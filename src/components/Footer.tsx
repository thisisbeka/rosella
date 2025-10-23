import { Phone, Mail, MapPin, Instagram, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-black border-t border-amber-500/20 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/ROSELLA_mainpage_new_2.png"
              alt="ROSELLA"
              loading="lazy"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-amber-100/80">
              "Her Şey Bir İnsanı Sevmekle Başlar…"
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-amber-400" />
                <a href="tel:+902247770177" className="hover:text-amber-400 transition-colors">
                  0224 777 01 77
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-amber-400" />
                <a href="mailto:rosellacicek@gmail.com" className="hover:text-amber-400 transition-colors">
                  rosellacicek@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-amber-400 mt-1" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Turgutalp,+Mimar+Sinan+Cd.+No:12,+16400+İnegöl/Bursa,+Türkiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Turgutalp, Mimar Sinan Cd. No:12, 16400 İnegöl/Bursa, Türkiye
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Sosyal Medya</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/rosellacicekcikolata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-500/20 text-center text-sm text-amber-100/60">
          <p>&copy; {new Date().getFullYear()} ROSELLA. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            Bu web sitesi B&P medya & Digital agency tarafından tasarlanmıştır{' '}
            <a
              href="https://instagram.com/bpmedyam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              @bpmedyam
            </a>
          </p>
        </div>
      </div>

      {onNavigate && (
        <button
          onClick={() => onNavigate('admin')}
          className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/5 hover:bg-amber-500/10 text-amber-400/30 hover:text-amber-400/50 transition-all duration-300"
          title="Admin Paneli"
        >
          <Shield size={16} />
        </button>
      )}
    </footer>
  );
}
