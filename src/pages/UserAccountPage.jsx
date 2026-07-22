import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { User, LogOut, Package, Heart, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserAccountPage() {
  const { user, login, logout, isAdmin } = useAuth();
  const { wishlist } = useCart();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [userOrders, setUserOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          setUserOrders(data.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase()));
        })
        .catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (wishlist.length > 0) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setWishlistProducts(data.filter(p => wishlist.includes(p.id)));
        });
    } else {
      setWishlistProducts([]);
    }
  }, [wishlist]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    const res = await login(emailInput, passwordInput);
    setLoading(false);
    if (!res.success) {
      setAuthError(res.error);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-md mx-auto">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto font-bold border border-primary/30">
              <User size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">Student Account Login</h1>
            <p className="text-xs text-on-surface-variant">Sign in to track orders, manage wishlist, or access admin panel.</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-on-surface-variant mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="student@university.edu or admin@dormlights.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant mb-1 block">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-container text-black font-extrabold py-3 rounded-full text-xs transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-white/10 pt-4 text-[11px] text-on-surface-variant text-center space-y-1">
            <p><strong>Demo Admin Credentials:</strong></p>
            <p className="text-primary font-mono">admin@dormlights.com / admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Account Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary text-primary font-bold text-2xl flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              {user.name}
              {isAdmin && <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary/30"><Shield size={12} className="inline mr-1" /> Admin</span>}
            </h1>
            <p className="text-xs text-on-surface-variant">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-3">
          {isAdmin && (
            <Link to="/admin" className="bg-primary text-black font-bold text-xs px-5 py-2.5 rounded-full hover:bg-primary-container">
              Open Admin Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <Package size={20} className="text-primary" /> Order History
        </h2>

        {userOrders.length === 0 ? (
          <div className="glass-panel p-8 text-center rounded-2xl text-xs text-on-surface-variant border border-white/10">
            No order history found. Place an order in the shop to track delivery!
          </div>
        ) : (
          <div className="space-y-3">
            {userOrders.map(ord => (
              <div key={ord.id} className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono font-bold text-primary text-sm">{ord.id}</span>
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">{ord.status}</span>
                  </div>
                  <p className="text-on-surface-variant">Placed on {new Date(ord.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold text-sm block">${ord.total.toFixed(2)}</span>
                  <span className="text-on-surface-variant text-[11px]">{ord.items ? ord.items.length : 0} items</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Section */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <Heart size={20} className="text-primary" /> Your Saved Wishlist ({wishlistProducts.length})
        </h2>

        {wishlistProducts.length === 0 ? (
          <div className="glass-panel p-8 text-center rounded-2xl text-xs text-on-surface-variant border border-white/10">
            Your wishlist is currently empty. Click the heart icon on any lighting product to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
