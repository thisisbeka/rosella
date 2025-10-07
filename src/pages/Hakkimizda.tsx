import { Heart, Award, Users, Sparkles, Star, Clock, Shield, Flower2 } from 'lucide-react';

export default function Hakkimizda() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-amber-400 mb-16 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
          Hakkımızda
        </h1>

        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-xl rounded-3xl border-2 border-amber-500/30 p-10 md:p-16 shadow-2xl shadow-amber-500/20">
            <div className="flex items-center justify-center mb-8">
              <Flower2 className="w-16 h-16 text-amber-400 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-8" style={{fontFamily: 'Cinzel, serif'}}>
              Her Şey Bir İnsanı Sevmekle Başlar…
            </h2>
            <p className="text-xl text-amber-100/90 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
              ROSELLA olarak, her özel anınızı unutulmaz kılmak için çiçeklerin ve hediye
              seçeneklerinin büyüsünü sizlerle buluşturuyoruz. Zarafet, kalite ve özgünlük
              ilkelerimizle hareket ederek, her müşterimize özel tasarımlar sunuyoruz.
            </p>
            <p className="text-lg text-amber-100/80 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
              Çiçeklerimiz, teraryumlarımız, çikolatalarımız ve organizasyon hizmetlerimizle
              sevdiklerinize en özel hediyeyi vermenizi sağlıyoruz. Her ürünümüz özenle seçilmiş
              ve kaliteli malzemelerle hazırlanmıştır.
            </p>
            <p className="text-lg text-amber-100/80 leading-relaxed text-center max-w-3xl mx-auto">
              Düğünlerinizden nişanlarınıza, doğum günlerinizden özel günlerinize kadar her
              organizasyonunuzda yanınızdayız. Hayalinizdeki etkinliği gerçekleştirmek için
              profesyonel ekibimizle hizmetinizdeyiz.
            </p>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-12" style={{fontFamily: 'Cinzel, serif'}}>
          Değerlerimiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative">
              <Heart className="w-14 h-14 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Tutkuyla</h3>
              <p className="text-amber-100/70 leading-relaxed">Her işimizi sevgiyle ve özenle yapıyoruz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative">
              <Award className="w-14 h-14 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Kalite</h3>
              <p className="text-amber-100/70 leading-relaxed">Sadece en iyi ürünleri seçiyoruz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative">
              <Users className="w-14 h-14 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Müşteri Odaklı</h3>
              <p className="text-amber-100/70 leading-relaxed">Memnuniyetiniz bizim önceliğimiz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative">
              <Sparkles className="w-14 h-14 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Özgünlük</h3>
              <p className="text-amber-100/70 leading-relaxed">Her tasarım benzersiz ve özel</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-12" style={{fontFamily: 'Cinzel, serif'}}>
          Neden Bizi Seçmelisiniz?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Star className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Uzman Ekip</h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Yılların deneyimiyle alanında uzman ekibimiz, her detayı kusursuz bir şekilde hazırlar ve sizin için en özel tasarımları yaratır.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Hızlı Teslimat</h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Siparişlerinizi özenle hazırlıyor ve belirlenen sürede teslim ediyoruz. Acil siparişleriniz için özel çözümlerimiz mevcuttur.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Güvenilir Hizmet</h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Müşteri memnuniyeti bizim en büyük önceliğimizdir. Her siparişinizde güvenilir ve kaliteli hizmet garantisi sunuyoruz.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-2xl border-2 border-amber-500/20 p-8 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
            <div className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Flower2 className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-100 mb-3" style={{fontFamily: 'Cinzel, serif'}}>Taze Ürünler</h3>
                <p className="text-amber-100/70 leading-relaxed">
                  Çiçeklerimiz her gün taze olarak tedarik edilir ve özel saklama koşullarında muhafaza edilerek size ulaştırılır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
