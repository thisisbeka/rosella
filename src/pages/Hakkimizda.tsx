import { Heart, Award, Users, Sparkles } from 'lucide-react';

export default function Hakkimizda() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-amber-400 mb-16 tracking-wide">
          Hakkımızda
        </h1>

        <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 md:p-12 mb-12">
          <p className="text-lg text-amber-100/80 leading-relaxed mb-6">
            ROSELLA olarak, her özel anınızı unutulmaz kılmak için çiçeklerin ve hediye
            seçeneklerinin büyüsünü sizlerle buluşturuyoruz. Zarafet, kalite ve özgünlük
            ilkelerimizle hareket ederek, her müşterimize özel tasarımlar sunuyoruz.
          </p>
          <p className="text-lg text-amber-100/80 leading-relaxed mb-6">
            Çiçeklerimiz, teraryumlarımız, çikolatalarımız ve organizasyon hizmetlerimizle
            sevdiklerinize en özel hediyeyi vermenizi sağlıyoruz. Her ürünümüz özenle seçilmiş
            ve kaliteli malzemelerle hazırlanmıştır.
          </p>
          <p className="text-lg text-amber-100/80 leading-relaxed">
            Düğünlerinizden nişanlarınıza, doğum günlerinizden özel günlerinize kadar her
            organizasyonunuzda yanınızdayız. Hayalinizdeki etkinliği gerçekleştirmek için
            profesyonel ekibimizle hizmetinizdeyiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 text-center hover:border-amber-500/50 transition-all duration-500 hover:scale-105">
            <Heart className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Tutkuyla</h3>
            <p className="text-amber-100/70">Her işimizi sevgiyle ve özenle yapıyoruz</p>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 text-center hover:border-amber-500/50 transition-all duration-500 hover:scale-105">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Kalite</h3>
            <p className="text-amber-100/70">Sadece en iyi ürünleri seçiyoruz</p>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 text-center hover:border-amber-500/50 transition-all duration-500 hover:scale-105">
            <Users className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Müşteri Odaklı</h3>
            <p className="text-amber-100/70">Memnuniyetiniz bizim önceliğimiz</p>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 text-center hover:border-amber-500/50 transition-all duration-500 hover:scale-105">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-100 mb-2">Özgünlük</h3>
            <p className="text-amber-100/70">Her tasarım benzersiz ve özel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
