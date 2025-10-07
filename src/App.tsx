import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Katalog from './pages/Katalog';
import CategoryPage from './pages/CategoryPage';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'katalog':
        return <Katalog />;
      case 'buket':
        return (
          <CategoryPage
            categorySlug="buket"
            title="Buket"
            description="Özel anlarınız için zarif buketler"
          />
        );
      case 'saksi':
        return (
          <CategoryPage
            categorySlug="saksi"
            title="Saksı"
            description="Evlerinize yeşillik katacak saksı çiçekleri"
          />
        );
      case 'orkide':
        return (
          <CategoryPage
            categorySlug="orkide"
            title="Orkide"
            description="Zarafet ve incelik simgesi orkideler"
          />
        );
      case 'teraryum':
        return (
          <CategoryPage
            categorySlug="teraryum"
            title="Teraryum"
            description="Mini bahçeleriniz için teraryumlar"
          />
        );
      case 'cicek-cikolata':
        return (
          <CategoryPage
            categorySlug="cicek-cikolata"
            title="Çiçek & Çikolata"
            description="Çiçek ve çikolata bir arada"
          />
        );
      case 'cikolata':
        return (
          <CategoryPage
            categorySlug="cikolata"
            title="Çikolata"
            description="Özel günleriniz için lezzetli çikolatalar"
          />
        );
      case 'organizasyon':
        return (
          <CategoryPage
            categorySlug="organizasyon"
            title="Organizasyon"
            description="Düğün, nişan ve özel etkinlikleriniz için profesyonel hizmet"
          />
        );
      case 'vip-cicekler':
        return (
          <CategoryPage
            categorySlug="vip-cicekler"
            title="Vip Çiçekler"
            description="Lüks ve özel çiçek düzenlemeleri"
          />
        );
      case 'celenk':
        return (
          <CategoryPage
            categorySlug="celenk"
            title="Çelenk"
            description="Anma ve saygı duruşlarınız için çelenkler"
          />
        );
      case 'hakkimizda':
        return <Hakkimizda />;
      case 'iletisim':
        return <Iletisim />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-amber-100">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
