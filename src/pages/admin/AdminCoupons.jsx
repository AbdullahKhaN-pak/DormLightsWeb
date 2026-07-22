import React, { useState, useEffect } from 'react';
import { Tag, Plus, Check } from 'lucide-react';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minSpend, setMinSpend] = useState(50);

  const fetchCoupons = () => {
    fetch('/api/coupons')
      .then(r => r.json())
      .then(setCoupons);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code.toUpperCase(),
        discountPercent: parseInt(discountPercent),
        minSpend: parseFloat(minSpend)
      })
    });

    setCode('');
    fetchCoupons();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Coupons & Promo Codes</h1>
        <p className="text-xs text-on-surface-variant">Create discount codes for student marketing campaigns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Plus size={16} className="text-primary" /> Create Promo Code
          </h3>
          <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
            <div>
              <label className="text-on-surface-variant mb-1 block">Promo Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. HARVARD15"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-on-surface-variant mb-1 block">Discount %</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="90"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-on-surface-variant mb-1 block">Min Spend ($)</label>
                <input
                  type="number"
                  required
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-black font-extrabold py-2.5 rounded-full hover:bg-primary-container"
            >
              Generate Coupon Code
            </button>
          </form>
        </div>

        {/* Existing Coupons */}
        <div className="lg:col-span-7 space-y-3">
          {coupons.map((c) => (
            <div key={c.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
              <div>
                <h4 className="font-mono font-extrabold text-primary text-base flex items-center gap-2">
                  <Tag size={16} /> {c.code}
                </h4>
                <p className="text-on-surface-variant text-[11px] mt-0.5">
                  {c.discountPercent}% OFF • Min Spend ${c.minSpend}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full text-[10px] block mb-1">
                  {c.status}
                </span>
                <span className="text-[10px] text-on-surface-variant">{c.usageCount} times used</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
