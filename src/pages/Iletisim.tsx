import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Iletisim() {
  const handleWhatsApp = () => {
    const message = 'Merhaba, bilgi almak istiyorum.';
    window.open(`https://wa.me/902247770177?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-amber-400 mb-16 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
          İletişim
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-amber-400 mb-8">
              Bize Ulaşın
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-100 mb-1">Telefon</h3>
                  <a href="tel:+902247770177" className="text-amber-100/70 hover:text-amber-400 transition-colors">
                    0224 777 01 77
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-100 mb-1">E-posta</h3>
                  <a href="mailto:rosellacicek@gmail.com" className="text-amber-100/70 hover:text-amber-400 transition-colors">
                    rosellacicek@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-100 mb-1">Adres</h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Turgutalp,+Mimar+Sinan+Cd.+No:12,+16400+İnegöl/Bursa,+Türkiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-100/70 hover:text-amber-400 transition-colors"
                  >
                    Turgutalp, Mimar Sinan Cd. No:12, 16400 İnegöl/Bursa, Türkiye
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-100 mb-1">Çalışma Saatleri</h3>
                  <p className="text-amber-100/70">Pazartesi - Cumartesi: 09:00 - 19:00</p>
                  <p className="text-amber-100/70">Pazar: 10:00 - 18:00</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              WhatsApp ile İletişime Geç
            </button>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-amber-400 mb-8">
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-amber-100 mb-2">
                  Teslimat yapıyor musunuz?
                </h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Evet, İstanbul genelinde aynı gün teslimat hizmeti sunuyoruz. Diğer şehirler için
                  kargo ile gönderim yapılmaktadır.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-amber-100 mb-2">
                  Özel tasarım yapabiliyor musunuz?
                </h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Tabii ki! Her müşterimizin isteğine özel tasarımlar hazırlıyoruz. WhatsApp
                  üzerinden bizimle iletişime geçerek detayları paylaşabilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-amber-100 mb-2">
                  Organizasyon hizmetleriniz nelerdir?
                </h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Düğün, nişan, doğum günü ve kurumsal etkinlikler için çiçek düzenleme ve dekorasyon
                  hizmeti sunuyoruz. Profesyonel ekibimiz tüm detayları sizin için planlar.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-amber-100 mb-2">
                  Nasıl sipariş verebilirim?
                </h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Ürün sayfalarındaki WhatsApp butonuna tıklayarak doğrudan sipariş verebilir veya
                  bizi arayarak telefon üzerinden sipariş oluşturabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
