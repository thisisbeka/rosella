import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Check, Star, GripVertical } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

interface TestimonialManagementProps {
  testimonials: Testimonial[];
  onUpdate: () => void;
}

export default function TestimonialManagement({ testimonials, onUpdate }: TestimonialManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [draggedItem, setDraggedItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_title: '',
    rating: 5,
    comment: '',
    image_url: '',
    is_active: true,
    display_order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTestimonial.id);

        if (error) throw error;
      } else {
        const { data: maxOrderTestimonial } = await supabase
          .from('testimonials')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)
          .maybeSingle();

        const newDisplayOrder = maxOrderTestimonial ? maxOrderTestimonial.display_order + 1 : 0;

        const { error } = await supabase
          .from('testimonials')
          .insert([{ ...formData, display_order: newDisplayOrder }]);

        if (error) throw error;
      }

      onUpdate();
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Yorum kaydedilirken bir hata oluştu.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Yorum silinirken bir hata oluştu.');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_title: testimonial.customer_title,
      rating: testimonial.rating,
      comment: testimonial.comment,
      image_url: testimonial.image_url,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_title: '',
      rating: 5,
      comment: '',
      image_url: '',
      is_active: true,
      display_order: 0,
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };

  const handleDragStart = (e: React.DragEvent, testimonial: Testimonial) => {
    setDraggedItem(testimonial);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetTestimonial: Testimonial) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetTestimonial.id) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = testimonials.findIndex(t => t.id === draggedItem.id);
    const targetIndex = testimonials.findIndex(t => t.id === targetTestimonial.id);

    const newTestimonials = [...testimonials];
    newTestimonials.splice(draggedIndex, 1);
    newTestimonials.splice(targetIndex, 0, draggedItem);

    try {
      for (let i = 0; i < newTestimonials.length; i++) {
        await supabase
          .from('testimonials')
          .update({ display_order: i })
          .eq('id', newTestimonials[i].id);
      }
      onUpdate();
    } catch (error) {
      console.error('Error updating order:', error);
    }

    setDraggedItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-amber-400">Müşteri Yorumları</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          <Plus size={20} />
          Yeni Yorum
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-black to-gray-900 border border-amber-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-400">
                {editingTestimonial ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}
              </h2>
              <button
                onClick={resetForm}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-amber-100 mb-2">Müşteri Adı</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-amber-100 mb-2">Ünvan (Opsiyonel)</label>
                <input
                  type="text"
                  value={formData.customer_title}
                  onChange={(e) => setFormData({ ...formData, customer_title: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  placeholder="Örn: Mimar, Doktor, vs."
                />
              </div>

              <div>
                <label className="block text-amber-100 mb-2">Değerlendirme</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-amber-100 mb-2">Yorum</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-amber-100 mb-2">Fotoğraf URL (Opsiyonel)</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="is_active" className="text-amber-100">
                  Aktif (Sitede Göster)
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300"
                >
                  <Check size={20} />
                  {editingTestimonial ? 'Güncelle' : 'Ekle'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-black/50 border border-amber-500/30 text-amber-100 rounded-lg font-medium hover:bg-black/70 transition-all duration-300"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            draggable
            onDragStart={(e) => handleDragStart(e, testimonial)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, testimonial)}
            className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6 cursor-move hover:border-amber-500/40 transition-all relative"
          >
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
              <GripVertical className="text-amber-400" size={20} />
            </div>

            <div className="flex items-start gap-4 mb-4">
              {testimonial.image_url && (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/50 flex-shrink-0">
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.customer_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-amber-100">{testimonial.customer_name}</h3>
                {testimonial.customer_title && (
                  <p className="text-sm text-amber-100/70">{testimonial.customer_title}</p>
                )}
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {testimonial.is_active ? (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Aktif</span>
                ) : (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Pasif</span>
                )}
              </div>
            </div>

            <p className="text-amber-100/80 mb-4 italic">"{testimonial.comment}"</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-all duration-300"
              >
                <Edit2 size={16} />
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
              >
                <Trash2 size={16} />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-amber-100/70">
          Henüz yorum eklenmemiş.
        </div>
      )}
    </div>
  );
}
