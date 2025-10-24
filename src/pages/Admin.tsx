import { useEffect, useState } from 'react';
import { Plus, Trash2, CreditCard as Edit2, X, Check, LogOut, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, Product, Category, ProductCategory } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import imageCompression from 'browser-image-compression';

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [productCategories, setProductCategories] = useState<Record<string, string[]>>({});
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);
  const [productImageIndex, setProductImageIndex] = useState<Record<string, number>>({});

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
        supabase.from('products').select('*').order('display_order', { ascending: true }),
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
      let uploadedUrls: string[] = [...imageUrls];

      if (imageFiles.length > 0) {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.8
        };

        for (const imageFile of imageFiles) {
          const compressedFile = await imageCompression(imageFile, options);
          const fileExt = 'jpg';
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, compressedFile);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

          uploadedUrls.push(publicUrl);
        }
      }

      if (uploadedUrls.length === 0) {
        alert('Lütfen en az bir resim yükleyin');
        setIsUploading(false);
        return;
      }

      const discountValue = formData.discount_percentage ? parseInt(formData.discount_percentage) : null;

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: uploadedUrls[0],
        image_urls: uploadedUrls,
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
        const { data: maxOrderProduct } = await supabase
          .from('products')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)
          .maybeSingle();

        const newDisplayOrder = maxOrderProduct ? maxOrderProduct.display_order + 1 : 0;

        const { data: allProducts } = await supabase
          .from('products')
          .select('id, display_order')
          .order('display_order', { ascending: true });

        if (allProducts && allProducts.length > 0) {
          for (let i = 0; i < allProducts.length; i++) {
            await supabase
              .from('products')
              .update({ display_order: i + 1 })
              .eq('id', allProducts[i].id);
          }
        }

        const { data: newProduct, error } = await supabase
          .from('products')
          .insert([{ ...productData, display_order: 0 }])
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

    setImageUrls(product.image_urls || [product.image_url]);
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
    setImageFiles([]);
    setImageUrls([]);
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

  const handleDragStart = (e: React.DragEvent, product: Product) => {
    setDraggedItem(product);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetProduct: Product) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetProduct.id) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = products.findIndex(p => p.id === draggedItem.id);
    const targetIndex = products.findIndex(p => p.id === targetProduct.id);

    const newProducts = [...products];
    newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedItem);

    setProducts(newProducts);

    try {
      for (let i = 0; i < newProducts.length; i++) {
        await supabase
          .from('products')
          .update({ display_order: i })
          .eq('id', newProducts[i].id);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      await loadData();
    }

    setDraggedItem(null);
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

  const removeImageUrl = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const newUrls = [...imageUrls];
    [newUrls[index - 1], newUrls[index]] = [newUrls[index], newUrls[index - 1]];
    setImageUrls(newUrls);
  };

  const moveImageDown = (index: number) => {
    if (index === imageUrls.length - 1) return;
    const newUrls = [...imageUrls];
    [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
    setImageUrls(newUrls);
  };

  const cycleProductImage = (productId: string, direction: 'prev' | 'next', imageCount: number) => {
    setProductImageIndex(prev => {
      const current = prev[productId] || 0;
      let next = direction === 'next' ? current + 1 : current - 1;
      if (next < 0) next = imageCount - 1;
      if (next >= imageCount) next = 0;
      return { ...prev, [productId]: next };
    });
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
                  <label className="block text-amber-100 mb-2">
                    Ürün Resimleri {imageUrls.length > 0 && `(${imageUrls.length} resim)`}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          setImageFiles(prev => [...prev, ...files]);
                        }
                      }}
                      className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 file:cursor-pointer"
                    />

                    {imageFiles.length > 0 && (
                      <div className="text-sm text-amber-400 space-y-1">
                        <p className="font-medium">Yeni resimler ({imageFiles.length}):</p>
                        {imageFiles.map((file, index) => (
                          <p key={index} className="text-amber-300">• {file.name}</p>
                        ))}
                      </div>
                    )}

                    {imageUrls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-amber-400 font-medium">
                          Mevcut resimler (ilk resim ana görsel):
                        </p>
                        {imageUrls.map((url, index) => (
                          <div key={index} className="flex items-center gap-2 bg-black/50 p-2 rounded-lg">
                            <img src={url} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                            <span className="flex-1 text-amber-100 text-sm truncate">
                              {index === 0 && <span className="text-green-400 font-bold mr-2">★ ANA</span>}
                              Resim {index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => moveImageUp(index)}
                              disabled={index === 0}
                              className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500/30"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImageDown(index)}
                              disabled={index === imageUrls.length - 1}
                              className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500/30"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImageUrl(index)}
                              className="px-2 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
          {products.map((product) => {
            const images = product.image_urls && product.image_urls.length > 0 ? product.image_urls : [product.image_url];
            const currentImageIndex = productImageIndex[product.id] || 0;
            const currentImage = images[currentImageIndex];

            return (
              <div
                key={product.id}
                draggable
                onDragStart={(e) => handleDragStart(e, product)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, product)}
                className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden cursor-move hover:border-amber-500/40 transition-all"
              >
                <div className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                  <GripVertical className="text-amber-400" size={20} />
                </div>
                <div className="aspect-square overflow-hidden relative group">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleProductImage(product.id, 'prev', images.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleProductImage(product.id, 'next', images.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex ? 'bg-amber-400 w-4' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
