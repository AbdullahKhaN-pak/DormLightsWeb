import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-primary/40 transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
        <img
          src={product.images && product.images[0] ? product.images[0] : ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.badge && (
            <span className="bg-primary text-black font-label-caps text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white font-label-caps text-[10px] px-2.5 py-1 rounded-full border border-white/10 uppercase">
            {product.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-red-500/20 text-red-400 border border-red-500/50'
              : 'bg-black/40 text-on-surface-variant hover:text-white border border-white/10'
          }`}
          title="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-primary mb-2">
            <Star size={14} fill="currentColor" />
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-on-surface-variant">({product.reviewsCount})</span>
          </div>

          {/* Title & Description */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-display mb-1.5">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Spec Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.specs && product.specs.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                className="text-[10px] font-label-caps font-semibold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-on-surface-variant"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="font-price-display text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-on-surface-variant line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="glow-button bg-primary/10 hover:bg-primary text-primary hover:text-black p-3 rounded-full transition-all duration-300 flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
