import React, { useState, useEffect } from 'react';
import { Settings, Save, Check } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: 'DormLights Digital Experience',
    supportEmail: 'support@dormlights.com',
    currency: 'USD',
    taxRate: 6.5,
    freeShippingThreshold: 99.00,
    whatsappNumber: '+18005553676'
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.storeName) setSettings(data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Store Settings & Configuration</h1>
        <p className="text-xs text-on-surface-variant">Manage global store defaults, tax rates, and WhatsApp support line.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        {savedNotice && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2 font-semibold">
            <Check size={16} /> Store settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-on-surface-variant mb-1 block font-medium">Store Title</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-on-surface-variant mb-1 block font-medium">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-on-surface-variant mb-1 block font-medium">WhatsApp Support Phone</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-on-surface-variant mb-1 block font-medium">Base Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-primary"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-on-surface-variant mb-1 block font-medium">State Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-on-surface-variant mb-1 block font-medium">Free Ship Limit ($)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-black font-extrabold py-3 rounded-full flex items-center justify-center gap-2 text-xs transition-colors mt-2"
          >
            <Save size={16} /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}
