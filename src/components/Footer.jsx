import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Sparkles, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/10 text-on-surface-variant text-sm pt-16 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="font-display text-xl font-extrabold text-white tracking-tighter">
              Dorm<span className="text-primary">Lights</span>
            </span>
          </Link>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Engineered luxury lighting built specifically for university dorm rooms and gaming sanctuaries. Dot-free warm white & RGBIC extrusions.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary font-semibold">
            <Sparkles size={14} /> Student Guarantee: Fire-safe 12V Low Heat
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 font-display uppercase tracking-wider text-xs text-primary">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/shop" className="hover:text-primary transition-colors">Shop Full Collection</Link></li>
            <li><Link to="/story" className="hover:text-primary transition-colors">Our Brand Story</Link></li>
            <li><a href="#simulator" className="hover:text-primary transition-colors">Room Simulator</a></li>
            <li><Link to="/account" className="hover:text-primary transition-colors">Customer Portal & Orders</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 font-display uppercase tracking-wider text-xs text-primary">
            Student Support
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2"><Truck size={14} className="text-primary" /> Free Shipping over $99</li>
            <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-primary" /> 1-Year Replacement Warranty</li>
            <li className="flex items-center gap-2"><MessageCircle size={14} className="text-primary" /> 24/7 WhatsApp Support</li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-white font-bold text-sm mb-2 font-display uppercase tracking-wider text-xs text-primary">
            Dorm Inspo Newsletter
          </h4>
          <p className="text-xs text-on-surface-variant mb-4">
            Get 10% off your first lighting kit + dorm layout design guides.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Use promo code DORM10 at checkout."); }} className="space-y-2">
            <input
              type="email"
              placeholder="student@university.edu"
              required
              className="w-full bg-black/60 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full bg-primary text-black font-bold text-xs py-2.5 rounded-full hover:bg-primary-container transition-colors"
            >
              Get 10% Discount Code
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-on-surface-variant gap-4">
        <p>© 2026 DormLights Inc. All rights reserved. Built with Stitch MCP Design System.</p>
        <div className="flex items-center gap-1">
          Crafted with <Heart size={12} className="text-primary fill-primary" /> for university sanctuaries.
        </div>
      </div>
    </footer>
  );
}
