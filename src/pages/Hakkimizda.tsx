import { Heart, Award, Users, Sparkles, Star, Clock, Shield, Flower2 } from 'lucide-react';

export default function Hakkimizda() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-amber-400 mb-12 tracking-wide" style={{fontFamily: 'Cinzel, serif'}}>
          Hakkımızda
        </h1>

        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-xl rounded-3xl border border-amber-500/30 p-8 md:p-12 shadow-2xl shadow-amber-500/20">
            <div className="flex items-center justify-center mb-6">
              <Flower2 className="w-12 h-12 md:w-14 md:h-14 text-amber-400 animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-amber-400 mb-6" style={{fontFamily: 'Cinzel, serif'}}>
              Her Şey Bir İnsanı Sevmekle Başlar…
            </h2>
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-amber-100/90 leading-relaxed">
                ROSELLA olarak, her özel anınızı unutulmaz kılmak için çiçeklerin ve hediye
                seçeneklerinin büyüsünü sizlerle buluşturuyoruz. Zarafet, kalite ve özgünlük
                ilkelerimizle hareket ederek, her müşterimize özel tasarımlar sunuyoruz.
              </p>
              <p className="text-sm md:text-base text-amber-100/80 leading-relaxed">
                Çiçeklerimiz, teraryumlarımız, çikolatalarımız ve organizasyon hizmetlerimizle
                sevdiklerinize en özel hediyeyi vermenizi sağlıyoruz. Her ürünümüz özenle seçilmiş
                ve kaliteli malzemelerle hazırlanmıştır.
              </p>
              <p className="text-sm md:text-base text-amber-100/80 leading-relaxed">
                Düğünlerinizden nişanlarınıza, doğum günlerinizden özel günlerinize kadar her
                organizasyonunuzda yanınızdayız. Hayalinizdeki etkinliği gerçekleştirmek için
                profesyonel ekibimizle hizmetinizdeyiz.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-amber-400 mb-8" style={{fontFamily: 'Cinzel, serif'}}>
          Değerlerimiz
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-4 md:p-6 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500 animate-logo-glow" />
              <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Tutkuyla</h3>
              <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">Her işimizi sevgiyle yapıyoruz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-4 md:p-6 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500 animate-logo-glow" />
              <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Kalite</h3>
              <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">En iyi ürünleri seçiyoruz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-4 md:p-6 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500 animate-logo-glow" />
              <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Müşteri Odaklı</h3>
              <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">Memnuniyetiniz önceliğimiz</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-4 md:p-6 text-center hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500 animate-logo-glow" />
              <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Özgünlük</h3>
              <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">Benzersiz tasarımlar</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-amber-400 mb-8" style={{fontFamily: 'Cinzel, serif'}}>
          Neden Bizi Seçmelisiniz?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-5 md:p-6 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative flex gap-4 md:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Star className="w-6 h-6 md:w-7 md:h-7 text-amber-400 animate-logo-glow" />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Uzman Ekip</h3>
                <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">
                  Yılların deneyimiyle alanında uzman ekibimiz, her detayı kusursuz bir şekilde hazırlar ve sizin için en özel tasarımları yaratır.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-5 md:p-6 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative flex gap-4 md:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 text-amber-400 animate-logo-glow" />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Hızlı Teslimat</h3>
                <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">
                  Siparişlerinizi özenle hazırlıyor ve belirlenen sürede teslim ediyoruz. Acil siparişleriniz için özel çözümlerimiz mevcuttur.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-5 md:p-6 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative flex gap-4 md:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Shield className="w-6 h-6 md:w-7 md:h-7 text-amber-400 animate-logo-glow" />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Güvenilir Hizmet</h3>
                <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">
                  Müşteri memnuniyeti bizim en büyük önceliğimizdir. Her siparişinizde güvenilir ve kaliteli hizmet garantisi sunuyoruz.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-xl border border-amber-500/20 p-5 md:p-6 hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-500"></div>
            <div className="relative flex gap-4 md:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Flower2 className="w-6 h-6 md:w-7 md:h-7 text-amber-400 animate-logo-glow" />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Cinzel, serif'}}>Taze Ürünler</h3>
                <p className="text-xs md:text-sm text-amber-100/70 leading-relaxed">
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
