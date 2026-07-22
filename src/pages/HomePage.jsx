import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LightSimulator from '../components/LightSimulator';
import { ArrowRight, Sparkles, ShieldCheck, Star, Award, Sliders, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden">
        {/* Background Image & Ambient Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-[10s] ease-linear hover:scale-100 opacity-70"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4XyxL4-YckADlSx_U_oVvNIEs7lglK-YtJ_ZQWe6YW7uQl1CKEmAS9OFah1N9xwQyhCIDZSuB02Z7mFs2Uo2alFvrrsmmstiqbiaGfgcPUGxXxgAEdfkCJLzc0lM_-vyKlIwUCKoXhVVTNfAOZ2FqKFeTGJliql_dEFXYxZ-ZRhVdMpEnnBCHjygUjb3KBVxnEPb1tUzWRVoaB3lbPE_llt_NaTu_rgJdNFW6yvm3CJdgo8MRc7ewN-5o6bMErrMLNePxJmsB7Mji')`
            }}
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 px-4 md:px-12 max-w-7xl mx-auto w-full py-16">
          <div className="max-w-3xl">
            <span className="font-label-caps text-xs text-primary mb-4 inline-flex items-center gap-2 px-3.5 py-1 bg-primary/10 border border-primary/30 rounded-full tracking-[0.25em] font-semibold">
              <Sparkles size={14} /> STUDENT SANCTUARY
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
              Transform <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">
                Your Dorm.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed opacity-90">
              Premium warm gold & RGBIC lighting engineered to turn small university rooms into cozy, aesthetic sanctuaries for peak focus and relaxation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="glow-button inline-flex items-center justify-center bg-primary text-black font-extrabold px-9 py-4 rounded-full text-base transition-all hover:bg-primary-container"
              >
                Shop Collection <ArrowRight size={18} className="ml-2" />
              </Link>
              <a
                href="#simulator"
                className="specular-border inline-flex items-center justify-center text-white font-semibold px-9 py-4 rounded-full backdrop-blur-md transition-all hover:bg-white/5 text-base"
              >
                Room Simulator <Sliders size={18} className="ml-2 text-primary" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-on-surface-variant border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span>Fire-Safe 12V Low Voltage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Damage-Free 3M Tape</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-primary fill-primary" />
                <span>4.9/5 Student Rating (2,500+ Dorms)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Category Showcase */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="font-label-caps text-xs text-primary tracking-widest uppercase mb-2 block font-semibold">
              EXPLORE CATEGORIES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">
              Curated Lighting Collections
            </h2>
          </div>
          <p className="text-on-surface-variant text-sm max-w-md">
            Every strip and lamp is designed to be invisible when turned off and atmospheric when turned on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {/* Warm White (Large 2 Col) */}
          <Link
            to="/shop?category=Warm%20White"
            className="md:col-span-2 glass-panel rounded-3xl overflow-hidden group relative flex flex-col justify-end p-8 min-h-[300px] border border-white/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuApuY8jRXu5yrOTVwouzmKhU01k5fL3_9pLaTa2ePC7ajznfsgP3QwSsst3ch4DZK0uXUBcgxBxxs0fPofS_iOBX72e4-o1QsVz_3eJQob_XtMBUUXKEbzhXQu7l9WndOVTUK_m1v0vwILo9yWf45dqluQdoi2PiUm_ZMSuuf1L4qIQQSP958HhKABxxz0gBwGFtX5C4fVF2TdQUMpEpYt3rBCFnNFF-s4CrYkfapib9UlLAU8U7iMt28_rECPGg7TyH_UWM6EL02HW')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="bg-primary/20 text-primary text-[10px] font-label-caps px-3 py-1 rounded-full mb-3 inline-block font-bold">
                2700K INCANDESCENT COZY
              </span>
              <h3 className="text-3xl font-bold text-white mb-2 font-display">Warm White Sanctuary</h3>
              <p className="text-on-surface-variant text-sm mb-4">
                The original cozy dorm vibe. Soft golden glow for relaxing bedframes & study desks.
              </p>
              <span className="text-xs font-bold text-primary inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                EXPLORE COLLECTION <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* RGB Neon */}
          <Link
            to="/shop?category=RGB%20Neon"
            className="glass-panel rounded-3xl overflow-hidden group relative flex flex-col justify-end p-6 min-h-[250px] border border-white/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYKI4aki-T_Fsx2EX-S0SC2SAAN8cXwei8QsY4bcsePquSmR2dH98aScOzufI_4sYFM-TFhlD8q5fPXRpZoRk7vRp_4mN1VmqZMnw30GYapheQnX6t2RFKG54d-1_x5ZODtNlokdWYLE69xaV7ULTcPDnGUJEAd1MAB_9bfFR0jMZ6bgLPbTmUmar-es0wtvkZWVCxp_KESxqEaVvcDMpPWCr0xNPw3NXrEMv0zVjEKfaFa1tflVqoHZ8GHVdXJ1fcBFi_CgSjOSeF')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-white font-display mb-1">RGBIC Neon Flex</h4>
              <span className="text-xs text-primary inline-flex items-center gap-1">
                View 16M Colors <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Profile Strips */}
          <Link
            to="/shop?category=Profile%20Strips"
            className="glass-panel rounded-3xl overflow-hidden group relative flex flex-col justify-end p-6 min-h-[250px] border border-white/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXwsFFfObahWYN4-ueUN_FfSv3rY_TmrfzJUOK7bFCLozG5LsLvJ5V8OBL59dw8t4fhvab32VFMktlo85OU0xZ5mdNg1THsUrKT39zAupGHagX6SYi9u4OfiUMkMMbaye8iYIbScY0hjSmaTS2-dyvMzJ0jb-Ni-NSLTGkD8LuAbQ8MnGOylTRZOJzPoC-dut5H9SCYK-eNIYEruQbWYHkBZbch4LjxGu1EFnwkaoOyJJbIl-D4IHenpDJWxlceMvZDOxlzaYZzjif')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-white font-display mb-1">Aluminum Extrusions</h4>
              <span className="text-xs text-primary inline-flex items-center gap-1">
                Dot-Free Glow <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Signature Kits */}
      <section className="bg-surface-container-low/50 py-24 border-y border-white/5">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-label-caps text-xs text-primary tracking-widest uppercase mb-2 block font-semibold">
                BEST SELLERS
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                Signature Dorm Lighting Kits
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-on-surface-variant">Loading kits...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Lighting Simulator */}
      <LightSimulator />

      {/* Student Reviews & Testimonials */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-label-caps text-xs text-primary tracking-widest uppercase mb-2 block font-semibold">
            REAL DORM REVIEWS
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            Loved by 2,500+ University Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Marcus Vance",
              univ: "MIT '27",
              quote: "The Pro Profile Strip turned my dark, dreary dorm room into a high-end Tesla interior. No ugly visible LED dots at all!",
              rating: 5
            },
            {
              name: "Elena Rostova",
              univ: "Stanford '26",
              quote: "Super easy 3M tape installation. RA checked my room and confirmed it's 100% fire-safe low voltage. The warm gold glow is perfect for late night study.",
              rating: 5
            },
            {
              name: "David Kim",
              univ: "Harvard '28",
              quote: "Got the Sanctuary Room Bundle for my desk and bedframe. Syncing with WhatsApp support was instant. Best purchase for college life!",
              rating: 5
            }
          ].map((rev, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex text-primary gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                "{rev.quote}"
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs">
                <span className="font-bold text-white">{rev.name}</span>
                <span className="text-primary font-semibold">{rev.univ}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
