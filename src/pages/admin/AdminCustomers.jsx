import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = () => {
    setLoading(true);
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleCustomerStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
    await fetch(`/api/customers/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchCustomers();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display">Customer Accounts Overview</h1>
        <p className="text-xs text-on-surface-variant">View student purchase history and toggle account status.</p>
      </div>

      {loading ? (
        <div className="text-center text-on-surface-variant py-12">Loading customers...</div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant uppercase font-label-caps bg-black/40">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Orders Placed</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map(cust => (
                  <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-white block">{cust.name}</span>
                      <span className="text-[10px] text-on-surface-variant">{cust.email}</span>
                    </td>
                    <td className="p-4 font-bold text-white">{cust.ordersCount}</td>
                    <td className="p-4 font-bold text-primary">${(cust.totalSpent || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        cust.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleCustomerStatus(cust.id, cust.status)}
                        className={`px-3 py-1 rounded-lg font-bold text-[10px] transition-colors ${
                          cust.status === 'Active'
                            ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {cust.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
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
