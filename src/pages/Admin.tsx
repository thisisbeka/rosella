import { useEffect, useState } from 'react';
import { Plus, Trash2, CreditCard as Edit2, X, Check, LogOut } from 'lucide-react';
import { supabase, Product, Category, ProductCategory } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Admin() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    is_featured: false,
    discount_percentage: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [productCategories, setProductCategories] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const getProductCategories = async (productId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('product_categories')
      .select('category_id')
      .eq('product_id', productId);

    if (error) {
      console.error('Error loading product categories:', error);
      return [];
    }

    return data.map((pc) => pc.category_id);
  };

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

  useEffect(() => {
    const loadProductCategories = async () => {
      const categoryMap: Record<string, string[]> = {};
      for (const product of products) {
        const cats = await getProductCategories(product.id);
        categoryMap[product.id] = cats;
      }
      setProductCategories(categoryMap);
    };

    if (products.length > 0) {
      loadProductCategories();
    }
  }, [products]);

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

      const discountValue = formData.discount_percentage ? parseInt(formData.discount_percentage) : null;

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        category_id: selectedCategories.length > 0 ? selectedCategories[0] : null,
        is_featured: formData.is_featured,
        discount_percentage: discountValue,
        updated_at: new Date().toISOString(),
      };

      let productId: string;

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        productId = editingProduct.id;

        await supabase
          .from('product_categories')
          .delete()
          .eq('product_id', productId);
      } else {
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;
        productId = newProduct.id;
      }

      if (selectedCategories.length > 0) {
        const categoryEntries = selectedCategories.map((catId) => ({
          product_id: productId,
          category_id: catId,
        }));

        const { error: categoriesError } = await supabase
          .from('product_categories')
          .insert(categoryEntries);

        if (categoriesError) throw categoriesError;
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

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category_id: product.category_id || '',
      is_featured: product.is_featured,
      discount_percentage: product.discount_percentage ? product.discount_percentage.toString() : '',
    });

    const productCats = await getProductCategories(product.id);
    setSelectedCategories(productCats);
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
      discount_percentage: '',
    });
    setSelectedCategories([]);
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Kategori Yok';
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await signIn(loginEmail, loginPassword);
    if (error) {
      setLoginError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-amber-100 text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-black to-gray-900 border border-amber-500/30 rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">Admin Girişi</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-amber-100 mb-2">E-posta</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-amber-100 mb-2">Şifre</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              {loginError && (
                <div className="text-red-400 text-sm text-center">{loginError}</div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wide">
            Admin Paneli
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus size={20} />
              Yeni Ürün
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all duration-300"
            >
              <LogOut size={20} />
              Çıkış
            </button>
          </div>
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
                  <label className="block text-amber-100 mb-3">Kategoriler</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto bg-black/50 border border-amber-500/30 rounded-lg p-4">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-amber-500/10 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="w-5 h-5 text-amber-500 bg-black/50 border-amber-500/30 rounded focus:ring-amber-500 focus:ring-2"
                        />
                        <span className="text-amber-100">{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {selectedCategories.length === 0 && (
                    <p className="text-amber-400/70 text-sm mt-2">En az bir kategori seçin</p>
                  )}
                </div>

                <div>
                  <label className="block text-amber-100 mb-2">İndirim Yüzdesi (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                    placeholder="Örn: 10, 20, 50"
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-amber-400/70 text-sm mt-1">İndirim yoksa boş bırakın</p>
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
                    disabled={isUploading || selectedCategories.length === 0}
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

                <div className="flex flex-wrap gap-1 mb-2">
                  {productCategories[product.id]?.length > 0 ? (
                    productCategories[product.id].map((catId) => (
                      <span
                        key={catId}
                        className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded"
                      >
                        {getCategoryName(catId)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-amber-100/70">Kategori Yok</span>
                  )}
                </div>

                {product.discount_percentage ? (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg text-amber-100/50 line-through">
                        {product.price.toLocaleString('tr-TR')} ₺
                      </span>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">
                        {product.discount_percentage}% İNDİRİM
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-amber-400">
                      {(product.price * (1 - product.discount_percentage / 100)).toLocaleString('tr-TR')} ₺
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-amber-400 mb-4">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </p>
                )}

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
