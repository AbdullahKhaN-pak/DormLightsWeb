import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const phone = "18005553676"; // Store WhatsApp support line
    const text = encodeURIComponent(message || "Hi DormLights team! I have a question about lighting my dorm room.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="w-80 glass-panel p-5 rounded-2xl border border-primary/30 shadow-2xl space-y-4 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
                <MessageCircle size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">DormLights Student Desk</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online Now
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white">
              <X size={16} />
            </button>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-on-surface-variant leading-relaxed">
            👋 Hey! Need help picking between Warm Gold 2700K or RGBIC Flex rope for your dorm desk? Chat with us directly on WhatsApp!
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-on-surface-variant focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={14} /> Chat on WhatsApp
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="glow-button p-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          title="WhatsApp Support"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
