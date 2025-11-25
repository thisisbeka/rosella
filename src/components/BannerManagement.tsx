import { useEffect, useState } from 'react';
import { supabase, Banner } from '../lib/supabase';
import { AlertCircle, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error loading banners:', error);
      setMessage({ type: 'error', text: 'Banner yüklenirken hata oluştu' });
    }
  };

  const handleSave = async () => {
    if (!editingBanner?.message) {
      setMessage({ type: 'error', text: 'Lütfen banner mesajını girin' });
      return;
    }

    setIsLoading(true);
    try {
      if (editingBanner.id) {
        const { error } = await supabase
          .from('banners')
          .update({
            title: editingBanner.title || '',
            message: editingBanner.message,
            is_active: editingBanner.is_active ?? false,
            show_whatsapp_button: editingBanner.show_whatsapp_button ?? true,
            whatsapp_number: editingBanner.whatsapp_number || '902247770177',
            background_color: editingBanner.background_color || '#DC2626',
            text_color: editingBanner.text_color || '#FFFFFF',
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingBanner.id);

        if (error) throw error;
        setMessage({ type: 'success', text: 'Banner güncellendi' });
      } else {
        const { error } = await supabase.from('banners').insert({
          title: editingBanner.title || '',
          message: editingBanner.message,
          is_active: editingBanner.is_active ?? false,
          show_whatsapp_button: editingBanner.show_whatsapp_button ?? true,
          whatsapp_number: editingBanner.whatsapp_number || '902247770177',
          background_color: editingBanner.background_color || '#DC2626',
          text_color: editingBanner.text_color || '#FFFFFF',
        });

        if (error) throw error;
        setMessage({ type: 'success', text: 'Banner oluşturuldu' });
      }

      setEditingBanner(null);
      loadBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      setMessage({ type: 'error', text: 'Banner kaydedilirken hata oluştu' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu banner\'ı silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) throw error;
      setMessage({ type: 'success', text: 'Banner silindi' });
      loadBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      setMessage({ type: 'error', text: 'Banner silinirken hata oluştu' });
    }
  };

  const toggleActive = async (banner: Banner) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ is_active: !banner.is_active, updated_at: new Date().toISOString() })
        .eq('id', banner.id);

      if (error) throw error;
      setMessage({ type: 'success', text: banner.is_active ? 'Banner devre dışı bırakıldı' : 'Banner aktif edildi' });
      loadBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
      setMessage({ type: 'error', text: 'Banner durumu değiştirilirken hata oluştu' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-400">Banner Yönetimi</h2>
        <button
          onClick={() =>
            setEditingBanner({
              title: '',
              message: '',
              is_active: false,
              show_whatsapp_button: true,
              whatsapp_number: '902247770177',
              background_color: '#DC2626',
              text_color: '#FFFFFF',
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Banner
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}
        >
          <AlertCircle className="w-5 h-5" />
          {message.text}
        </div>
      )}

      {editingBanner && (
        <div className="bg-black/40 border border-amber-500/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-amber-400">
            {editingBanner.id ? 'Banner Düzenle' : 'Yeni Banner'}
          </h3>

          <div>
            <label className="block text-amber-100 mb-2">Başlık (İsteğe Bağlı)</label>
            <input
              type="text"
              value={editingBanner.title || ''}
              onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
              className="w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg text-amber-100 focus:border-amber-500 focus:outline-none"
              placeholder="Örn: Özel Günler Hakkında Bilgilendirme"
            />
          </div>

          <div>
            <label className="block text-amber-100 mb-2">Mesaj *</label>
            <textarea
              value={editingBanner.message || ''}
              onChange={(e) => setEditingBanner({ ...editingBanner, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg text-amber-100 focus:border-amber-500 focus:outline-none"
              placeholder="Banner mesajınızı girin..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-100 mb-2">Arka Plan Rengi</label>
              <input
                type="color"
                value={editingBanner.background_color || '#DC2626'}
                onChange={(e) => setEditingBanner({ ...editingBanner, background_color: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-amber-100 mb-2">Yazı Rengi</label>
              <input
                type="color"
                value={editingBanner.text_color || '#FFFFFF'}
                onChange={(e) => setEditingBanner({ ...editingBanner, text_color: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-amber-100">
              <input
                type="checkbox"
                checked={editingBanner.show_whatsapp_button ?? true}
                onChange={(e) => setEditingBanner({ ...editingBanner, show_whatsapp_button: e.target.checked })}
                className="w-4 h-4"
              />
              WhatsApp Butonu Göster
            </label>

            {editingBanner.show_whatsapp_button && (
              <input
                type="text"
                value={editingBanner.whatsapp_number || ''}
                onChange={(e) => setEditingBanner({ ...editingBanner, whatsapp_number: e.target.value })}
                className="flex-1 px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg text-amber-100 focus:border-amber-500 focus:outline-none"
                placeholder="WhatsApp numarası (örn: 902247770177)"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-amber-100">
              <input
                type="checkbox"
                checked={editingBanner.is_active ?? false}
                onChange={(e) => setEditingBanner({ ...editingBanner, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              Banner Aktif
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              onClick={() => setEditingBanner(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-black/40 border border-amber-500/30 rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {banner.title && <h4 className="text-lg font-semibold text-amber-400 mb-2">{banner.title}</h4>}
                <p className="text-amber-100/80">{banner.message}</p>
                <div className="flex gap-2 mt-2 text-sm text-amber-100/60">
                  <span>Renk: {banner.background_color}</span>
                  {banner.show_whatsapp_button && <span>• WhatsApp: {banner.whatsapp_number}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(banner)}
                  className={`p-2 rounded-lg transition-colors ${
                    banner.is_active
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                  title={banner.is_active ? 'Devre Dışı Bırak' : 'Aktif Et'}
                >
                  {banner.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditingBanner(banner)}
                  className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {banners.length === 0 && !editingBanner && (
          <div className="text-center text-amber-100/60 py-8">Henüz banner oluşturulmamış</div>
        )}
      </div>
    </div>
  );
}
