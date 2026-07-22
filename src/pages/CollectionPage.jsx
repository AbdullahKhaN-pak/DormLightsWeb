import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search, RefreshCw } from 'lucide-react';

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'All') queryParams.append('category', selectedCategory);
    if (searchQuery) queryParams.append('search', searchQuery);
    if (maxPrice < 250) queryParams.append('maxPrice', maxPrice);
    if (minRating > 0) queryParams.append('minRating', minRating);

    fetch(`/api/products?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory, searchQuery, maxPrice, minRating]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(250);
    setMinRating(0);
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <span className="font-label-caps text-xs text-primary tracking-[0.2em] uppercase mb-2 block font-semibold">
          THE COLLECTION
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-4">
          Dorm Lighting Catalog
        </h1>
        <p className="text-on-surface-variant text-sm max-w-2xl">
          Browse anodized profile extrusions, warm white sanctuary lamps, flexible RGBIC neon, and complete dorm room bundles.
        </p>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-primary" /> Filter Catalog
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            {/* Search Filter Input */}
            <div>
              <label className="text-xs font-label-caps text-on-surface-variant mb-2 block">
                SEARCH
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                <Search size={14} className="absolute left-3 top-3 text-on-surface-variant" />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <label className="text-xs font-label-caps text-on-surface-variant mb-2 block">
                CATEGORY
              </label>
              <div className="space-y-1.5">
                {['All', ...categories.map(c => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat !== 'All') setSearchParams({ category: cat });
                      else setSearchParams({});
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-primary text-black font-bold shadow-md'
                        : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Filter */}
            <div>
              <div className="flex justify-between text-xs font-medium text-white mb-2">
                <span className="text-on-surface-variant font-label-caps">MAX PRICE</span>
                <span className="text-primary font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="250"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary bg-surface-container-high h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Min Rating Filter */}
            <div>
              <label className="text-xs font-label-caps text-on-surface-variant mb-2 block">
                MINIMUM RATING
              </label>
              <div className="flex gap-2">
                {[0, 4.5, 4.8, 5.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      minRating === r
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'border-white/10 text-on-surface-variant hover:border-white/30'
                    }`}
                  >
                    {r === 0 ? 'Any' : `${r}★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-9">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-on-surface-variant font-medium">
              Showing <strong className="text-white">{products.length}</strong> items
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-on-surface-variant">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-white/10">
              <p className="text-lg font-bold text-white mb-2">No products match your filters</p>
              <p className="text-xs text-on-surface-variant mb-6">Try resetting filters or adjusting max price slider.</p>
              <button
                onClick={resetFilters}
                className="bg-primary text-black font-bold px-6 py-2.5 rounded-full text-xs hover:bg-primary-container"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
