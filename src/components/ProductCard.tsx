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

  return (
    <div className="group relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-amber-100 mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-amber-100/70 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-400">
            {product.price.toLocaleString('tr-TR')} ₺
          </span>

          <button
            onClick={handleWhatsAppOrder}
            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
