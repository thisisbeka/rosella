import { useState } from 'react';
import { createPortal } from 'react-dom';
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

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-lg"
      onClick={onClose}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-0 md:p-4">
          <div
            className="relative w-full md:w-auto md:min-w-[600px] md:max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 md:rounded-3xl border-0 md:border md:border-amber-500/40 shadow-2xl md:shadow-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex justify-end p-4 bg-gradient-to-b from-gray-900 to-transparent">
              <button
                onClick={onClose}
                className="p-3 bg-black/70 rounded-full text-amber-100 hover:text-amber-400 hover:bg-black/90 transition-all hover:scale-110 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8 -mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">Sipariş Detayları</h2>
          <p className="text-amber-100/70 mb-6">
            {productName} - {productPrice}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all hover:scale-[1.02]"
              >
                İptal
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/50"
              >
                WhatsApp'a Gönder
              </button>
            </div>
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
