import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto space-y-24">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full inline-block">
          THE DORMLIGHTS PHILOSOPHY
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display leading-tight">
          Turning Student Rooms into <br />
          <span className="text-primary">Cozy Modern Sanctuaries</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
          We founded DormLights with one simple mission: University students deserve better than cold, flickering fluorescent tube lighting. We build premium, dot-free warm white and RGBIC lighting profiles engineered for focus, relaxation, and aesthetics.
        </p>
      </div>

      {/* Visual Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApuY8jRXu5yrOTVwouzmKhU01k5fL3_9pLaTa2ePC7ajznfsgP3QwSsst3ch4DZK0uXUBcgxBxxs0fPofS_iOBX72e4-o1QsVz_3eJQob_XtMBUUXKEbzhXQu7l9WndOVTUK_m1v0vwILo9yWf45dqluQdoi2PiUm_ZMSuuf1L4qIQQSP958HhKABxxz0gBwGFtX5C4fVF2TdQUMpEpYt3rBCFnNFF-s4CrYkfapib9UlLAU8U7iMt28_rECPGg7TyH_UWM6EL02HW"
            alt="Warm Sanctuary"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white font-display">
            The 2700K Incandescent Gold Standard
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Standard cheap LED strips expose bare circuit diodes that blind your eyes and look tacky on video calls. Our anodized aluminum profile extrusions use frosted opalescent diffusion lenses that spread light into an uninterrupted ambient wave.
          </p>
          <div className="space-y-3 text-xs text-on-surface-variant">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <Sparkles size={18} className="text-primary" />
              <span><strong>100% Dot-Free:</strong> Smooth light output with zero diode spots.</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <ShieldCheck size={18} className="text-primary" />
              <span><strong>Fire-Safe & RA Approved:</strong> Low-voltage 12V DC power units compliant with campus dorm rules.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="glass-panel p-12 rounded-3xl text-center max-w-4xl mx-auto border border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-bold text-white font-display">Ready to Transform Your Space?</h3>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
            Join thousands of students across top universities who have upgraded their living experience.
          </p>
          <a
            href="/shop"
            className="glow-button inline-flex items-center justify-center bg-primary text-black font-extrabold px-8 py-3.5 rounded-full text-sm hover:bg-primary-container transition-all"
          >
            Explore Dorm Collection
          </a>
        </div>
      </div>
    </div>
  );
}
