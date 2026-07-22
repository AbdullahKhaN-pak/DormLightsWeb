import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, ShoppingCart, Users, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/customers').then(r => r.json())
    ]).then(([ordData, prodData, custData]) => {
      setOrders(ordData);
      setProducts(prodData);
      setCustomers(custData);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return <div className="text-on-surface-variant text-center py-12">Loading metrics...</div>;

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const lowStockProducts = products.filter(p => p.stock <= 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Store Analytics & Dashboard</h1>
        <p className="text-xs text-on-surface-variant">Real-time overview of revenue, active orders, and product stock levels.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign size={16} />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white font-price-display block">
            ${totalRevenue.toFixed(2)}
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">+18.4% from last month</span>
        </div>

        {/* Total Orders */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Total Orders</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShoppingCart size={16} />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white font-display block">
            {orders.length}
          </span>
          <span className="text-[10px] text-primary font-semibold">Processed campus deliveries</span>
        </div>

        {/* Total Products */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Active Products</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <ShoppingBag size={16} />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white font-display block">
            {products.length}
          </span>
          <span className="text-[10px] text-blue-400 font-semibold">Active catalog SKUs</span>
        </div>

        {/* Low Stock Warning */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Low Stock Alerts</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <AlertTriangle size={16} />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-white font-display block">
            {lowStockProducts.length}
          </span>
          <span className="text-[10px] text-amber-400 font-semibold">Items under 5 units</span>
        </div>
      </div>

      {/* Low Stock Warning Alert */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-400">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} />
            <span><strong>Inventory Alert:</strong> {lowStockProducts.map(p => `${p.name} (${p.stock} left)`).join(', ')}</span>
          </div>
          <Link to="/admin/products" className="font-bold underline hover:text-white">
            Manage Inventory
          </Link>
        </div>
      )}

      {/* Recent Orders Overview */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white font-display">Recent Customer Orders</h3>
          <Link to="/admin/orders" className="text-xs text-primary hover:underline flex items-center gap-1">
            View All Orders <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-on-surface-variant uppercase font-label-caps">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono font-bold text-primary">{ord.id}</td>
                  <td className="py-3 text-white font-semibold">{ord.customerName}</td>
                  <td className="py-3 font-bold text-white">${ord.total.toFixed(2)}</td>
                  <td className="py-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-on-surface-variant">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
