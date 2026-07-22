import React, { useState } from 'react';
import { Sun, Sparkles, Moon, Sliders, Layers } from 'lucide-react';

export default function LightSimulator() {
  const [brightness, setBrightness] = useState(85);
  const [temp, setTemp] = useState(2700); // 2700K Warm to 6500K Cool
  const [rgbMode, setRgbMode] = useState(false);
  const [rgbColor, setRgbColor] = useState('#ffd584');

  // Convert Kelvin to approx RGB hex/string
  const getGlowColor = () => {
    if (rgbMode) return rgbColor;
    if (temp <= 3000) return '#ffd584'; // Warm Gold
    if (temp <= 4500) return '#ffebd4'; // Warm White
    return '#d4f0ff'; // Cool White
  };

  const currentGlow = getGlowColor();

  return (
    <section id="simulator" className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-caps text-xs text-primary tracking-[0.2em] uppercase mb-2 block">
          INTERACTIVE DEMO
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">
          Dorm Room Lighting Simulator
        </h2>
        <p className="text-on-surface-variant text-sm mt-3">
          Experience how our Warm Gold & RGBIC profiles transform dorm room ambient lighting in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Control Panel */}
        <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders size={18} className="text-primary" /> Light Controls
            </h3>
            <span className="text-xs px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full font-semibold">
              Live Preview
            </span>
          </div>

          {/* Mode Switcher */}
          <div>
            <label className="text-xs font-label-caps text-on-surface-variant mb-2 block">
              LIGHT MODE
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/50 rounded-full border border-white/10">
              <button
                onClick={() => setRgbMode(false)}
                className={`py-2 px-4 rounded-full text-xs font-semibold transition-all ${
                  !rgbMode ? 'bg-primary text-black font-bold shadow-md' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Warm Sanctuary (Kelvin)
              </button>
              <button
                onClick={() => setRgbMode(true)}
                className={`py-2 px-4 rounded-full text-xs font-semibold transition-all ${
                  rgbMode ? 'bg-primary text-black font-bold shadow-md' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                RGBIC Neon Glow
              </button>
            </div>
          </div>

          {/* Brightness Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-white mb-2">
              <span className="flex items-center gap-1"><Sun size={14} className="text-primary" /> Brightness</span>
              <span className="font-mono text-primary">{brightness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-primary bg-surface-container-high h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Kelvin Temperature or RGB Color Picker */}
          {!rgbMode ? (
            <div>
              <div className="flex justify-between text-xs font-medium text-white mb-2">
                <span className="flex items-center gap-1"><Moon size={14} className="text-primary" /> Color Temperature</span>
                <span className="font-mono text-primary">{temp}K ({temp <= 3000 ? "Sanctuary Warm" : temp <= 4500 ? "Neutral White" : "Cool Focus"})</span>
              </div>
              <input
                type="range"
                min="2700"
                max="6500"
                step="100"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full accent-primary bg-surface-container-high h-2 rounded-lg cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-label-caps text-on-surface-variant mb-2 block">
                SELECT AMBIENT RGB ACCENT
              </label>
              <div className="flex gap-3">
                {['#ffd584', '#ff4b4b', '#a855f7', '#3b82f6', '#10b981'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setRgbColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${
                      rgbColor === c ? 'scale-110 border-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c, boxShadow: `0 0 15px ${c}` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Live Specs Display */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-on-surface-variant">
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <span className="block text-[10px] text-primary uppercase font-bold">Dot-Free Diffusion</span>
              <span className="text-white font-semibold">100% Opalescent</span>
            </div>
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <span className="block text-[10px] text-primary uppercase font-bold">App Sync & Control</span>
              <span className="text-white font-semibold">WiFi 6 & Bluetooth</span>
            </div>
          </div>
        </div>

        {/* Live Visual Canvas */}
        <div className="lg:col-span-7 relative h-[420px] rounded-3xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center">
          {/* Room Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuApuY8jRXu5yrOTVwouzmKhU01k5fL3_9pLaTa2ePC7ajznfsgP3QwSsst3ch4DZK0uXUBcgxBxxs0fPofS_iOBX72e4-o1QsVz_3eJQob_XtMBUUXKEbzhXQu7l9WndOVTUK_m1v0vwILo9yWf45dqluQdoi2PiUm_ZMSuuf1L4qIQQSP958HhKABxxz0gBwGFtX5C4fVF2TdQUMpEpYt3rBCFnNFF-s4CrYkfapib9UlLAU8U7iMt28_rECPGg7TyH_UWM6EL02HW')`,
              filter: `brightness(${brightness / 100 + 0.3}) contrast(1.1)`
            }}
          />

          {/* Dynamic Light Overlay Glow */}
          <div
            className="absolute inset-0 transition-all duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${currentGlow} ${brightness * 0.6}%, transparent 80%)`,
              opacity: brightness / 100
            }}
          />

          {/* Ambient Lighting Strip Bar Simulation */}
          <div className="relative z-10 w-4/5 p-6 glass-panel rounded-2xl border border-white/20 backdrop-blur-xl text-center space-y-3">
            <div
              className="h-3 rounded-full w-full transition-all duration-300 shadow-2xl"
              style={{
                backgroundColor: currentGlow,
                boxShadow: `0 0 ${brightness * 0.4}px ${brightness * 0.2}px ${currentGlow}`
              }}
            />
            <div className="flex items-center justify-between text-xs font-semibold text-white pt-2">
              <span className="flex items-center gap-1 text-primary">
                <Sparkles size={14} /> DormLights Extrusion Profile
              </span>
              <span>{rgbMode ? "RGBIC Ambient Zone" : `${temp}K Warm Sanctuary`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
