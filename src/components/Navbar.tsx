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
            className="fixed inset-0 lg:hidden animate-mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 10, 5, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03] animate-gradient-shift"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
              }}
            />
          </div>

          <div
            className="fixed inset-0 lg:hidden overflow-y-auto"
            style={{ zIndex: 101 }}
            onClick={(e) => e.target === e.currentTarget && setIsMobileMenuOpen(false)}
          >
            <div className="min-h-full flex flex-col p-4 pt-6">
              <div className="flex justify-between items-center mb-8 animate-mobile-header">
                <img
                  src="/ROSELLA_mainpage_new_2.png"
                  alt="ROSELLA"
                  className="h-14 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-amber-400 hover:text-red-400 transition-all duration-300 hover:rotate-90 hover:scale-110 p-2 rounded-full hover:bg-red-500/10"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-3 pb-20">
                {navItems.map((item, index) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-mobile-item"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      background: currentPage === item.page
                        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: currentPage === item.page
                        ? '1px solid rgba(251, 191, 36, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: currentPage === item.page
                        ? '0 8px 32px rgba(251, 191, 36, 0.15)'
                        : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
                    <div className="relative flex items-center justify-between px-6 py-5">
                      <span
                        className={`font-semibold text-lg tracking-wide transition-colors duration-300 ${
                          currentPage === item.page
                            ? 'text-amber-400'
                            : 'text-amber-100 group-hover:text-amber-300'
                        }`}
                      >
                        {item.name}
                      </span>
                      <ChevronRight
                        size={20}
                        className={`transition-all duration-300 group-hover:translate-x-1 ${
                          currentPage === item.page
                            ? 'text-amber-400'
                            : 'text-amber-100/50 group-hover:text-amber-400'
                        }`}
                      />
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
