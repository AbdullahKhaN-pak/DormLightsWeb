import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Search, User, Shield, X, Menu } from 'lucide-react';

export default function Navbar({ onSearch }) {
  const { cartItems, wishlist, setIsCartOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-12 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <span className="font-display text-2xl font-extrabold tracking-tighter text-white group-hover:text-primary transition-colors">
                Dorm<span className="text-primary">Lights</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/shop" className="text-on-surface-variant hover:text-primary transition-colors">
                Shop Collection
              </Link>
              <Link to="/story" className="text-on-surface-variant hover:text-primary transition-colors">
                Our Story
              </Link>
              <a href="#simulator" className="text-on-surface-variant hover:text-primary transition-colors">
                Room Simulator
              </a>
              {isAdmin && (
                <Link to="/admin" className="text-primary flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold">
                  <Shield size={12} /> Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5">
            {/* Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all"
              title="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/account"
              className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-black font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[text-primary] bg-primary/10 hover:bg-primary text-primary hover:text-black rounded-full transition-all flex items-center justify-center"
              title="Cart"
            >
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-on-primary font-extrabold text-xs rounded-full flex items-center justify-center shadow-lg">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            {user ? (
              <Link
                to={isAdmin ? "/admin" : "/account"}
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 bg-surface-container-high border border-white/10 rounded-full text-xs font-medium text-white hover:border-primary/50 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate max-w-[100px]">{user.name}</span>
              </Link>
            ) : (
              <Link
                to="/account"
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-surface-container-high hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-white transition-all"
              >
                <User size={14} /> Account
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 pb-4">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-medium"
            >
              Shop Collection
            </Link>
            <Link
              to="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-medium"
            >
              Our Story
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-medium"
            >
              {user ? `Account (${user.name})` : "Login / Account"}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary font-semibold flex items-center gap-2"
              >
                <Shield size={16} /> Admin Management
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl glass-panel p-6 rounded-2xl relative border border-primary/30">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-sm font-label-caps text-primary tracking-widest uppercase mb-4">
              Search Dorm Lights
            </h3>
            <form onSubmit={handleSearchSubmit} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search warm white strips, RGB neon, desk bars..."
                className="w-full bg-black/50 border border-white/20 rounded-full px-5 py-3 text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary text-black font-bold px-6 rounded-full hover:bg-primary-container transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
