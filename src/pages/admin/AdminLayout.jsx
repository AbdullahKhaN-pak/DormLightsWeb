import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, ShoppingBag, FolderTree, ShoppingCart, Users, Tag, Settings, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    return (
      <div className="pt-32 pb-24 text-center px-4 max-w-md mx-auto">
        <div className="glass-panel p-8 rounded-3xl border border-red-500/30 text-center space-y-4">
          <ShieldAlert size={40} className="text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Admin Access Restricted</h2>
          <p className="text-xs text-on-surface-variant">Please log in as an administrator to view the store management panel.</p>
          <Link to="/account" className="inline-block bg-primary text-black font-extrabold px-6 py-2.5 rounded-full text-xs hover:bg-primary-container">
            Log in as Admin
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Products Catalog', path: '/admin/products', icon: ShoppingBag },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Customer Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Coupons & Promos', path: '/admin/coupons', icon: Tag },
    { label: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="pt-24 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Admin Sidebar */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 sticky top-28">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-label-caps text-primary tracking-widest uppercase font-bold block mb-1">
                MANAGEMENT PANEL
              </span>
              <h2 className="text-lg font-bold text-white font-display">DormLights Admin</h2>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-primary text-black font-bold shadow-md'
                        : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => {
                  logout();
                  navigate('/account');
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
              >
                <LogOut size={16} /> Exit Admin Mode
              </button>
            </div>
          </div>
        </div>

        {/* Main Admin Content Outlet */}
        <div className="lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
