import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const handleWhatsAppOrder = () => {
    const imageUrl = `${window.location.origin}${product.image_url}`;
    const message = `Merhaba, bu ürünle ilgileniyorum:\n\n${product.name}\n${imageUrl}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const discountedPrice = product.discount_percentage
    ? product.price * (1 - product.discount_percentage / 100)
    : null;

  return (
    <div className="group relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discount_percentage && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-2 py-1 rounded-lg shadow-lg font-semibold text-xs z-10 animate-pulse">
            %{product.discount_percentage} İNDİRİM
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold text-amber-100 mb-1 sm:mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs sm:text-sm text-amber-100/70 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {product.discount_percentage ? (
            <div className="flex flex-col gap-1">
              <span className="text-sm sm:text-base text-amber-100/50 line-through">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
              <span className="text-lg sm:text-2xl font-bold text-red-400">
                {discountedPrice?.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          ) : (
            <span className="text-lg sm:text-2xl font-bold text-amber-400">
              {product.price.toLocaleString('tr-TR')} ₺
            </span>
          )}

          <button
            onClick={handleWhatsAppOrder}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-1 sm:gap-2"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Sipariş
          </button>
        </div>
      </div>
    </div>
  );
}
