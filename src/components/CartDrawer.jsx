import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    setAppliedCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setLoadingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, cartTotal: subtotal })
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.message || 'Invalid coupon');
      } else {
        setAppliedCoupon(data);
        setCouponSuccess(data.message);
        setCouponInput('');
      }
    } catch (err) {
      setCouponError('Failed to validate coupon.');
    } finally {
      setLoadingCoupon(false);
    }
  };

  const freeShippingNeeded = Math.max(0, 99 - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / 99) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181818] border-l border-white/10 text-on-surface shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-white">Your Cart</h2>
              <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-surface-container-low border-b border-white/5 text-xs">
            <div className="flex justify-between text-on-surface-variant mb-1 font-medium">
              <span>
                {freeShippingNeeded === 0
                  ? "🎉 You unlocked FREE Shipping!"
                  : `Add $${freeShippingNeeded.toFixed(2)} for FREE Express Shipping`}
              </span>
              <Truck size={14} className="text-primary" />
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-on-surface-variant">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Tag size={28} />
                </div>
                <p className="text-lg font-medium text-white mb-2">Your cart is empty</p>
                <p className="text-sm text-on-surface-variant max-w-xs mx-auto mb-6">
                  Explore our cozy warm white lighting and RGB strip collection.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-black font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-primary-container transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.variant}-${idx}`}
                  className="glass-card p-4 rounded-xl flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-black/40 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant mb-2">{item.variant}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-black/40 rounded-full border border-white/10 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, -1)}
                          className="text-on-surface-variant hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, 1)}
                          className="text-on-surface-variant hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.variant)}
                    className="text-on-surface-variant hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-surface-container-low/50">
              <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. DORM10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-xs text-white uppercase placeholder:normal-case placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loadingCoupon}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-xs text-red-400 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-xs text-emerald-400 mt-1">{couponSuccess}</p>}

              {appliedCoupon && (
                <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-lg p-2 mt-2 text-xs">
                  <span className="text-primary font-semibold">
                    Code '{appliedCoupon.code}' ({appliedCoupon.discountPercent}% OFF)
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-on-surface-variant hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Totals Summary */}
              <div className="space-y-1.5 text-xs text-on-surface-variant mt-4 pt-3 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full mt-5 glow-button bg-primary text-black font-extrabold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all hover:bg-primary-container text-sm"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant mt-3">
                <ShieldCheck size={12} className="text-primary" />
                <span>30-Day Money Back Guarantee & 1-Year Warranty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
