import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, subtotal, discount, shipping, total, appliedCoupon, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@harvard.edu',
    dormHall: 'Wigglesworth Hall, Room 304',
    university: 'Harvard University',
    address: '1 Harvard Yard, Cambridge, MA 02138',
    paymentMethod: 'credit_card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (cartItems.length === 0 && !completedOrder) {
    return (
      <div className="pt-32 pb-24 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-on-surface-variant text-sm mb-6">Add lighting products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="bg-primary text-black font-bold px-6 py-3 rounded-full text-xs hover:bg-primary-container">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: `${formData.dormHall}, ${formData.university}, ${formData.address}`,
      paymentMethod: formData.paymentMethod === 'credit_card' ? 'Credit Card (Visa)' : 'Apple Pay',
      items: cartItems,
      total: total,
      couponCode: appliedCoupon ? appliedCoupon.code : null
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setCompletedOrder(data);
      clearCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Order Confirmation Receipt View */}
      {completedOrder ? (
        <div className="max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-primary/30 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 size={36} />
          </div>
          <span className="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">
            ORDER CONFIRMED
          </span>
          <h1 className="text-3xl font-extrabold text-white font-display">
            Thank You, {completedOrder.customerName}!
          </h1>
          <p className="text-sm text-on-surface-variant">
            Your DormLights order <strong className="text-primary font-mono">{completedOrder.id}</strong> has been received and is being processed for campus delivery.
          </p>

          <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-left space-y-3 text-xs">
            <div className="flex justify-between text-on-surface-variant border-b border-white/10 pb-2">
              <span>Order Number</span>
              <span className="text-white font-bold font-mono">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant border-b border-white/10 pb-2">
              <span>Shipping To</span>
              <span className="text-white font-medium">{completedOrder.shippingAddress}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant border-b border-white/10 pb-2">
              <span>Payment Method</span>
              <span className="text-white font-medium">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant font-bold text-sm pt-2">
              <span className="text-white">Total Paid</span>
              <span className="text-primary">${completedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/account"
              className="bg-primary text-black font-extrabold px-8 py-3 rounded-full text-xs hover:bg-primary-container"
            >
              View Order in Account
            </Link>
            <Link
              to="/shop"
              className="bg-white/10 text-white font-semibold px-8 py-3 rounded-full text-xs hover:bg-white/20"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-10">
            <span className="font-label-caps text-xs text-primary tracking-widest uppercase mb-1 block font-semibold">
              SECURE CHECKOUT
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display">
              Complete Your Dorm Order
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Shipping & Payment Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Customer & Dorm Address */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white font-label-caps text-primary uppercase tracking-wider flex items-center gap-2">
                  <Truck size={16} /> Campus Shipping Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-on-surface-variant mb-1 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-on-surface-variant mb-1 block">University Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-on-surface-variant mb-1 block">University Name</label>
                    <input
                      type="text"
                      required
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-on-surface-variant mb-1 block">Dorm Hall & Room #</label>
                    <input
                      type="text"
                      required
                      value={formData.dormHall}
                      onChange={(e) => setFormData({ ...formData, dormHall: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Simulator */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white font-label-caps text-primary uppercase tracking-wider flex items-center gap-2">
                    <CreditCard size={16} /> Payment Gateway
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Lock size={12} /> 256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'credit_card'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-white/5 border-white/10 text-on-surface-variant'
                    }`}
                  >
                    <CreditCard size={16} /> Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'apple_pay'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-white/5 border-white/10 text-on-surface-variant'
                    }`}
                  >
                     Express Apple Pay
                  </button>
                </div>

                {formData.paymentMethod === 'credit_card' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] text-on-surface-variant mb-1 block">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-on-surface-variant mb-1 block">Expiration Date</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-on-surface-variant mb-1 block">CVC Code</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white font-label-caps text-primary uppercase tracking-wider">
                  Order Summary ({cartItems.length} items)
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center text-xs">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-black" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{item.name}</h4>
                        <p className="text-[10px] text-on-surface-variant">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Coupon Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Campus Shipping</span>
                    <span className="text-white">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full glow-button bg-primary hover:bg-primary-container text-black font-extrabold py-4 rounded-full flex items-center justify-center gap-2 text-sm transition-all mt-4"
                >
                  {loading ? 'Processing Order...' : `Pay $${total.toFixed(2)} & Complete Order`} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
