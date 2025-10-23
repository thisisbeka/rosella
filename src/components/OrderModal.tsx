import { useState } from 'react';
import { X } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  onSubmit: (orderDetails: OrderDetails) => void;
}

export interface OrderDetails {
  receiverName: string;
  senderName: string;
  deliveryAddress: string;
  note: string;
  addressInfo: string;
  receiverPhone: string;
  senderPhone: string;
  deliveryTime: string;
}

export default function OrderModal({ isOpen, onClose, productName, productPrice, onSubmit }: OrderModalProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    receiverName: '',
    senderName: '',
    deliveryAddress: '',
    note: '',
    addressInfo: '',
    receiverPhone: '',
    senderPhone: '',
    deliveryTime: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 p-2 bg-black/50 rounded-full text-amber-100 hover:text-amber-400 hover:bg-black/70 transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">Sipariş Detayları</h2>
          <p className="text-amber-100/70 mb-6">
            {productName} - {productPrice}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="receiverName" className="block text-amber-100 font-medium mb-2">
                Alıcı adı *
              </label>
              <input
                type="text"
                id="receiverName"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Alıcının adını girin"
              />
            </div>

            <div>
              <label htmlFor="senderName" className="block text-amber-100 font-medium mb-2">
                Gönderen adı *
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Gönderenin adını girin"
              />
            </div>

            <div>
              <label htmlFor="deliveryAddress" className="block text-amber-100 font-medium mb-2">
                Teslimat adresi *
              </label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Teslimat adresini girin"
              />
            </div>

            <div>
              <label htmlFor="addressInfo" className="block text-amber-100 font-medium mb-2">
                Adres bilgisi *
              </label>
              <textarea
                id="addressInfo"
                name="addressInfo"
                value={formData.addressInfo}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                placeholder="Detaylı adres bilgisini girin"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-amber-100 font-medium mb-2">
                Not bilgisi
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                placeholder="Varsa özel notlarınızı girin"
              />
            </div>

            <div>
              <label htmlFor="receiverPhone" className="block text-amber-100 font-medium mb-2">
                Alıcı iletişim numarası *
              </label>
              <input
                type="tel"
                id="receiverPhone"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Örn: 0555 123 45 67"
              />
            </div>

            <div>
              <label htmlFor="senderPhone" className="block text-amber-100 font-medium mb-2">
                Gönderen iletişim numarası *
              </label>
              <input
                type="tel"
                id="senderPhone"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Örn: 0555 123 45 67"
              />
            </div>

            <div>
              <label htmlFor="deliveryTime" className="block text-amber-100 font-medium mb-2">
                Teslimat saati *
              </label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Örn: 14:00"
              />
              <p className="text-amber-100/50 text-sm mt-1">
                En erken 10:00, en geç 21:00
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-semibold transition-all"
              >
                WhatsApp'a Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
