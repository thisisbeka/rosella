import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Ana Sayfa', page: 'home' },
    { name: 'Katalog', page: 'katalog' },
    { name: 'Çiçekler', page: 'cicekler' },
    { name: 'Çikolata', page: 'cikolata' },
    { name: 'Organizasyon', page: 'organizasyon' },
    { name: 'Hakkımızda', page: 'hakkimizda' },
    { name: 'İletişim', page: 'iletisim' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-full border ${
          isScrolled
            ? 'bg-black/30 backdrop-blur-[40px] backdrop-saturate-[180%] shadow-2xl shadow-black/50 border-white/20'
            : 'bg-black/20 backdrop-blur-[60px] backdrop-saturate-[180%] border-white/10 shadow-xl shadow-black/30'
        }`}
        style={{
          WebkitBackdropFilter: isScrolled ? 'blur(40px) saturate(180%)' : 'blur(60px) saturate(180%)',
        }}
      >
        <div className="flex justify-between items-center h-20 px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/ROSELLA_mainpage_new.png"
              alt="ROSELLA"
              className="h-16 w-auto object-contain"
            />
          </button>

          <ul className="hidden lg:flex gap-8 text-base">
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`relative text-amber-100 hover:text-amber-300 transition-all duration-300 tracking-wide font-medium ${
                    currentPage === item.page ? 'text-amber-400' : ''
                  }`}
                >
                  {item.name}
                  {currentPage === item.page && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-amber-400 hover:text-amber-300 transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden mt-4 rounded-3xl overflow-hidden animate-menu-bubble"
          style={{
            background: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)',
          }}
        >
          <div className="p-4 space-y-3">
            {navItems.map((item, index) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-center px-6 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-300 animate-bubble-in ${
                  currentPage === item.page
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 shadow-lg shadow-amber-500/15'
                    : 'bg-white/3 text-amber-100 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-amber-600/15 hover:text-amber-300 hover:shadow-lg hover:shadow-amber-500/10'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: currentPage === item.page
                    ? '1px solid rgba(251, 191, 36, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.03)',
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
