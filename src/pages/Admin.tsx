import { useEffect, useState } from 'react';
import { Plus, Trash2, CreditCard as Edit2, X, Check } from 'lucide-react';
import { supabase, Product, Category } from '../lib/supabase';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    is_featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (productsResult.error) throw productsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setProducts(productsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        category_id: formData.category_id,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }

      await loadData();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Ürün kaydedilirken bir hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ürün silinirken bir hata oluştu.');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category_id: product.category_id || '',
      is_featured: product.is_featured,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category_id: '',
      is_featured: false,
    });
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Kategori Yok';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-amber-100 text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wide">
            Admin Paneli
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            Yeni Ürün
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-black to-gray-900 border border-amber-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400">
                  {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
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
                  <label className="block text-amber-100 mb-2">Ürün Adı</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-100 mb-2">Açıklama</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 h-24"
                  />
                </div>

                <div>
                  <label className="block text-amber-100 mb-2">Fiyat (₺)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-100 mb-2">Ürün Resmi</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setFormData({ ...formData, image_url: '' });
                        }
                      }}
                      className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 file:cursor-pointer"
                    />
                    {imageFile && (
                      <p className="text-sm text-amber-400">Seçili dosya: {imageFile.name}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-amber-500/30"></div>
                      <span className="text-amber-100/50 text-sm">veya</span>
                      <div className="flex-1 h-px bg-amber-500/30"></div>
                    </div>
                    <input
                      type="url"
                      placeholder="Resim URL'si girin"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImageFile(null);
                      }}
                      className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                      disabled={!!imageFile}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-100 mb-2">Kategori</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                    required
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <label htmlFor="is_featured" className="text-amber-100">
                    Ana Sayfada Göster
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check size={20} />
                    {isUploading ? 'Yükleniyor...' : editingProduct ? 'Güncelle' : 'Ekle'}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-amber-100 flex-1">
                    {product.name}
                  </h3>
                  {product.is_featured && (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">
                      Öne Çıkan
                    </span>
                  )}
                </div>

                <p className="text-sm text-amber-100/70 mb-2">{getCategoryName(product.category_id || '')}</p>

                <p className="text-2xl font-bold text-amber-400 mb-4">
                  {product.price.toLocaleString('tr-TR')} ₺
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-all duration-300"
                  >
                    <Edit2 size={16} />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                  >
                    <Trash2 size={16} />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
