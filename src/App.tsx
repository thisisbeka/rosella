import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Katalog from './pages/Katalog';
import CategoryPage from './pages/CategoryPage';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={(page, categorySlug) => {
          setCurrentPage(page);
          setSelectedCategorySlug(categorySlug || null);
        }} />;
      case 'katalog':
        return <Katalog initialCategorySlug={selectedCategorySlug} />;
      case 'cicekler':
        return (
          <CategoryPage
            categorySlug={['buket', 'orkide', 'saksi', 'vip-cicekler']}
            title="Çiçekler"
            description="Her anınıza özel, taze ve zarif çiçek aranjmanları"
          />
        );
      case 'cikolata':
        return (
          <CategoryPage
            categorySlug="cikolata"
            title="Çikolata & Teraryum"
            description="Özel günleriniz için unutulmaz hediye seçenekleri"
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
      case 'hakkimizda':
        return <Hakkimizda />;
      case 'iletisim':
        return <Iletisim />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={(page, categorySlug) => {
          setCurrentPage(page);
          setSelectedCategorySlug(categorySlug || null);
        }} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-amber-100">
        <Navbar currentPage={currentPage} onNavigate={(page, categorySlug) => {
          setCurrentPage(page);
          setSelectedCategorySlug(categorySlug || null);
        }} />
        <main>{renderPage()}</main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </AuthProvider>
  );
}

export default App;
