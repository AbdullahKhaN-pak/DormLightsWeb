import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, CheckCircle, Clock, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders();
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = !searchQuery ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">Customer Order Management</h1>
          <p className="text-xs text-on-surface-variant">Update order fulfillment status from Processing to Shipped and Delivered.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-on-surface-variant" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                statusFilter === status
                  ? 'bg-primary text-black'
                  : 'bg-white/5 border border-white/10 text-on-surface-variant hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center text-on-surface-variant py-12">Loading orders...</div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant uppercase font-label-caps bg-black/40">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer & Campus Address</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className="font-mono font-bold text-primary block">{ord.id}</span>
                      <span className="text-[10px] text-on-surface-variant">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white block">{ord.customerName}</span>
                      <span className="text-[10px] text-on-surface-variant block">{ord.customerEmail}</span>
                      <span className="text-[10px] text-primary">{ord.shippingAddress}</span>
                    </td>
                    <td className="p-4 font-bold text-white text-sm">${ord.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        ord.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        ord.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-primary/20 text-primary border border-primary/30'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-1">
                        {['Processing', 'Shipped', 'Delivered'].map(st => (
                          <button
                            key={st}
                            disabled={ord.status === st}
                            onClick={() => handleUpdateStatus(ord.id, st)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              ord.status === st
                                ? 'bg-white/20 text-white cursor-default'
                                : 'bg-white/5 hover:bg-primary/20 text-on-surface-variant hover:text-primary border border-white/10'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
