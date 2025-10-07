import { Phone, Mail, MapPin, Instagram, Facebook, Shield } from 'lucide-react';

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
              src="/07259bd5-b4e6-418b-ab97-bd8c2868bd04.JPG"
              alt="ROSELLA"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-amber-100/80">
              Zarafetin Çiçeklerle Buluştuğu Yer
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-amber-400" />
                <span>+90 5XX XXX XX XX</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-amber-400" />
                <span>info@rosella.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-amber-400 mt-1" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Sosyal Medya</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-500/20 text-center text-sm text-amber-100/60">
          <p>&copy; {new Date().getFullYear()} ROSELLA. Tüm hakları saklıdır.</p>
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
