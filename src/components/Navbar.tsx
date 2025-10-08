import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
    <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-6">
      <div
        className={`max-w-7xl mx-auto liquid-glass-nav transition-all duration-700 ease-out ${
          isScrolled ? 'liquid-glass-scrolled' : ''
        }`}
      >
        <div className="flex justify-between items-center h-20 px-8 lg:px-10">
          <button
            onClick={() => onNavigate('home')}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/ROSELLA_mainpage_new_2.png"
              alt="ROSELLA"
              className="h-16 w-auto object-contain"
            />
          </button>

          <ul className="hidden lg:flex gap-2 text-base">
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`relative px-5 py-2.5 rounded-full transition-all duration-500 ease-out tracking-wide font-medium liquid-glass-bubble ${
                    currentPage === item.page
                      ? 'liquid-glass-bubble-active text-amber-100'
                      : 'text-amber-100/80 hover:liquid-glass-bubble-hover'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-amber-200 hover:text-amber-100 transition-all duration-300 p-2 rounded-full liquid-glass-bubble-hover"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
          />
          <div className="lg:hidden mt-4 liquid-glass-mobile animate-menu-bubble">
            <div className="p-3 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-center px-6 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-500 ease-out animate-bubble-in liquid-glass-bubble ${
                    currentPage === item.page
                      ? 'liquid-glass-bubble-active text-amber-100'
                      : 'text-amber-100/80 hover:liquid-glass-bubble-hover'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
