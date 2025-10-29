import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, categorySlug?: string) => void;
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
              src="/ROSELLA_mainpage_new_2.png"
              alt="ROSELLA"
              loading="eager"
              fetchpriority="high"
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
        <>
          <div
            className="fixed inset-0 lg:hidden bg-black/50 animate-mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ zIndex: 100 }}
          />

          <div
            className="fixed top-4 right-4 left-4 lg:hidden animate-slide-in"
            style={{ zIndex: 101 }}
          >
            <div
              className="rounded-3xl border shadow-2xl shadow-black/50 overflow-hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderColor: 'rgba(251, 191, 36, 0.3)',
              }}
            >
              <div className="flex justify-between items-center h-16 px-5 border-b border-amber-500/20">
                <img
                  src="/ROSELLA_mainpage_new_2.png"
                  alt="ROSELLA"
                  className="h-12 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-amber-400 hover:text-red-400 transition-all duration-300 hover:rotate-90 p-2"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
                {navItems.map((item, index) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-mobile-item"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      background: currentPage === item.page
                        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)'
                        : 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: currentPage === item.page
                        ? '1px solid rgba(251, 191, 36, 0.5)'
                        : '1px solid rgba(251, 191, 36, 0.2)',
                      boxShadow: currentPage === item.page
                        ? '0 4px 20px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div className="relative flex items-center justify-center px-5 py-4">
                      <span
                        className={`font-semibold text-base tracking-wide transition-colors duration-300 ${
                          currentPage === item.page
                            ? 'text-amber-400'
                            : 'text-amber-100 group-hover:text-amber-300'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
