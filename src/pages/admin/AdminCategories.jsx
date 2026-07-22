import React, { useState, useEffect } from 'react';
import { Plus, FolderTree, Save } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const fetchCats = () => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(setCategories);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCatName, description: newCatDesc })
    });

    setNewCatName('');
    setNewCatDesc('');
    fetchCats();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Category Management</h1>
        <p className="text-xs text-on-surface-variant">Organize products into warm sanctuary lighting categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Add Category Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Plus size={16} className="text-primary" /> Create New Category
          </h3>
          <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
            <div>
              <label className="text-on-surface-variant mb-1 block">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Desk Backlights"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-on-surface-variant mb-1 block">Description</label>
              <textarea
                rows="2"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Short description of this product line..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-black font-extrabold py-2.5 rounded-full hover:bg-primary-container"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-7 space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <FolderTree size={16} className="text-primary" /> {cat.name}
                </h4>
                <p className="text-on-surface-variant text-[11px] mt-1">{cat.description}</p>
              </div>
              <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-[10px]">
                {cat.slug}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
