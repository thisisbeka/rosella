import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Iletisim() {
  const whatsappNumber = '905466002211';

  const handleWhatsAppClick = () => {
    const message = 'Merhaba, ROSELLA hakkında bilgi almak istiyorum.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/98 to-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-amber-400 luxury-serif">
          İletişim
        </h1>
        <p className="text-center text-amber-100/70 mb-12 text-lg">
          Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Telefon</h3>
                  <a
                    href={`tel:+${whatsappNumber}`}
                    className="text-amber-100/80 hover:text-amber-300 transition-colors"
                  >
                    +90 546 600 22 11
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">E-posta</h3>
                  <a
                    href="mailto:info@rosella.com"
                    className="text-amber-100/80 hover:text-amber-300 transition-colors"
                  >
                    info@rosella.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Adres</h3>
                  <p className="text-amber-100/80">
                    Merkez Mahallesi<br />
                    Atatürk Caddesi No: 123<br />
                    İstanbul, Türkiye
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Çalışma Saatleri</h3>
                  <div className="text-amber-100/80 space-y-1">
                    <p>Pazartesi - Cumartesi: 09:00 - 20:00</p>
                    <p>Pazar: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-amber-400 mb-6">
              Bize Mesaj Gönderin
            </h3>
            <p className="text-amber-100/80 mb-6">
              WhatsApp üzerinden bize ulaşabilir, sorularınızı sorabilir ve sipariş verebilirsiniz.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp ile İletişime Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
