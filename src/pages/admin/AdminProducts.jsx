import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Save, AlertCircle } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Profile Strips',
    price: 49.00,
    originalPrice: 59.00,
    stock: 20,
    badge: 'NEW',
    description: '',
    specsStr: 'WARM GOLD, DIMMABLE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtuTOpkOFihU9tCyuDaflF3mGNYghLjp6i_DyDasS8r0Ylqmw8HEqbVavIe_hNXrr300KY1LrKdyfV4dX59wQiEn-gs5gFg8uuA6xyViSZ4Zzl5hHG1KR6vOPZtACUoYW7577Vlb22n6Etp4h-EyY03Ivp0lqgPq7z3rJLWIW14d8fvTTAbB2747QnVD-mqThq_927wbWgUbT-b-GMVn0UrzSJHUck_SPphEbqYOcj6T381Va5_mvQpnMIi6-kjK11nUxyW66C7HIK'
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Profile Strips',
      price: 49.00,
      originalPrice: 59.00,
      stock: 20,
      badge: 'NEW',
      description: 'Premium warm gold lighting extrusion for dorm desk.',
      specsStr: 'WARM GOLD, DIMMABLE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtuTOpkOFihU9tCyuDaflF3mGNYghLjp6i_DyDasS8r0Ylqmw8HEqbVavIe_hNXrr300KY1LrKdyfV4dX59wQiEn-gs5gFg8uuA6xyViSZ4Zzl5hHG1KR6vOPZtACUoYW7577Vlb22n6Etp4h-EyY03Ivp0lqgPq7z3rJLWIW14d8fvTTAbB2747QnVD-mqThq_927wbWgUbT-b-GMVn0UrzSJHUck_SPphEbqYOcj6T381Va5_mvQpnMIi6-kjK11nUxyW66C7HIK'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price + 10,
      stock: prod.stock,
      badge: prod.badge || '',
      description: prod.description,
      specsStr: prod.specs ? prod.specs.join(', ') : '',
      imageUrl: prod.images && prod.images[0] ? prod.images[0] : ''
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      stock: parseInt(formData.stock),
      badge: formData.badge,
      description: formData.description,
      specs: formData.specsStr.split(',').map(s => s.trim()).filter(Boolean),
      images: [formData.imageUrl]
    };

    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    setShowModal(false);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">Product Catalog Management</h1>
          <p className="text-xs text-on-surface-variant">Add, update pricing, manage stock, and edit product specifications.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-primary hover:bg-primary-container text-black font-extrabold text-xs px-4 py-2.5 rounded-full flex items-center gap-2"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {loading ? (
        <div className="text-center text-on-surface-variant py-12">Loading products...</div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant uppercase font-label-caps bg-black/40">
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={prod.images && prod.images[0] ? prod.images[0] : ''} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-black" />
                      <div>
                        <span className="font-bold text-white block">{prod.name}</span>
                        <span className="text-[10px] text-on-surface-variant">{prod.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant font-medium">{prod.category}</td>
                    <td className="p-4 font-bold text-primary">${prod.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        prod.stock <= 5 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {prod.stock} in stock
                      </span>
                    </td>
                    <td className="p-4">
                      {prod.badge && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">{prod.badge}</span>}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl glass-panel p-6 rounded-3xl border border-primary/30 relative max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingId ? 'Edit Lighting Product' : 'Add New Lighting Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-on-surface-variant mb-1 block font-medium">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-on-surface-variant mb-1 block font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Profile Strips">Profile Strips</option>
                    <option value="Warm White">Warm White</option>
                    <option value="RGB Neon">RGB Neon</option>
                    <option value="Bundles">Bundles</option>
                  </select>
                </div>
                <div>
                  <label className="text-on-surface-variant mb-1 block font-medium">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. BEST SELLER"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-on-surface-variant mb-1 block font-medium">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-on-surface-variant mb-1 block font-medium">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-on-surface-variant mb-1 block font-medium">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-on-surface-variant mb-1 block font-medium">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-on-surface-variant mb-1 block font-medium">Specifications (comma separated)</label>
                <input
                  type="text"
                  value={formData.specsStr}
                  onChange={(e) => setFormData({ ...formData, specsStr: e.target.value })}
                  placeholder="2700K WARM, DIMMABLE, 3M TAPE"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-on-surface-variant mb-1 block font-medium">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-black font-extrabold py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary-container"
                >
                  <Save size={14} /> {editingId ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
