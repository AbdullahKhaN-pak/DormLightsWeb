import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, ShoppingBag, Check, Sparkles } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedLength, setSelectedLength] = useState('3 Meters');
  const [selectedColorTemp, setSelectedColorTemp] = useState('2700K Warm Gold');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.images && data.images.length) {
          setSelectedImage(data.images[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-on-surface-variant">Loading product details...</div>;
  if (!product) return <div className="pt-32 text-center text-white">Product not found. <Link to="/shop" className="text-primary underline">Return to Shop</Link></div>;

  const isWishlisted = wishlist.includes(product.id);
  const fullVariantString = `${selectedLength} / ${selectedColorTemp}`;

  const handleAddToCart = () => {
    addToCart(product, quantity, fullVariantString);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Back Link */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery & Light Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10">
            <img
              src={selectedImage || (product.images ? product.images[0] : '')}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-primary text-black font-label-caps text-xs px-3.5 py-1 rounded-full font-extrabold uppercase shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-primary scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Options */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-label-caps text-primary font-bold tracking-widest uppercase mb-1 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 text-xs mb-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-on-surface-variant">({product.reviewsCount} verified dorm reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-price-display text-4xl font-extrabold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-on-surface-variant line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                In Stock ({product.stock} units left)
              </span>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variant Selector 1: Length */}
          <div>
            <label className="text-xs font-label-caps text-on-surface-variant mb-2 block font-semibold">
              SELECT PROFILE LENGTH
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['1.5 Meters', '3 Meters', '5 Meters'].map((len) => (
                <button
                  key={len}
                  onClick={() => setSelectedLength(len)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedLength === len
                      ? 'bg-primary text-black border-primary shadow-lg'
                      : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Selector 2: Light Temperature */}
          <div>
            <label className="text-xs font-label-caps text-on-surface-variant mb-2 block font-semibold">
              LIGHT TEMPERATURE / COLOR
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['2700K Warm Gold', '4000K Neutral', 'RGBIC Neon Zone'].map((temp) => (
                <button
                  key={temp}
                  onClick={() => setSelectedColorTemp(temp)}
                  className={`py-2.5 px-2 rounded-xl text-[11px] font-bold transition-all border text-center ${
                    selectedColorTemp === temp
                      ? 'bg-primary/20 text-primary border-primary'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-white'
                  }`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-white/20 rounded-full px-3 py-2 bg-black/40">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-on-surface-variant hover:text-white px-2"
                >
                  -
                </button>
                <span className="font-bold text-white px-2 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-on-surface-variant hover:text-white px-2"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 glow-button bg-primary hover:bg-primary-container text-black font-extrabold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all text-sm"
              >
                <ShoppingBag size={18} /> Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                    : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {addedNotice && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2 font-semibold">
                <Check size={16} /> Added to your cart successfully!
              </div>
            )}
          </div>

          {/* Key Features List */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2.5 text-xs text-on-surface-variant">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 font-label-caps text-primary">
              ENGINEERING FEATURES
            </h4>
            {product.features && product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Sparkles size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 text-xs text-on-surface-variant pt-2">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-primary" />
              <span>Free Express Ship over $99</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              <span>1-Year Replacement Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
