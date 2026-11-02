// src/components/home/PromotionalBanners.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';

export const PromotionalBanners = () => {
  const navigate = useNavigate();
  const { applyCoupon, showToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const banners = [
    {
      id: 1,
      title: 'Grand South Indian Tiffin Festival',
      subtitle: 'Crispy Ghee Dosas, Soft Steamed Idlies & Kumbakonam Filter Coffee',
      tag: 'CRAFTED WITH PURE DESI GHEE',
      code: 'WELCOME50',
      discount: '50% OFF',
      gradient: 'from-[#FF6B35] via-[#FF8A50] to-[#FF9F43]',
      bgImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
      category: 'south-indian'
    },
    {
      id: 2,
      title: 'Royal Dum Biryani Bonanza',
      subtitle: 'Slow cooked handi biryani with Mirchi ka Salan & Burani Raita',
      tag: 'CHARCOAL DUM SPECIAL',
      code: 'FEAST20',
      discount: 'FLAT 20% OFF',
      gradient: 'from-[#202124] via-[#35363a] to-[#202124]',
      bgImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      category: 'biryani'
    }
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((b) => (
            <div
              key={b.id}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${b.gradient} text-white shadow-soft p-6 sm:p-8 flex flex-col justify-between min-h-[220px] group`}
            >
              {/* Background food preview image overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden opacity-35 mix-blend-overlay pointer-events-none">
                <img
                  src={b.bgImage}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Tag and Discount badge */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {b.tag}
                </span>
                <span className="bg-white text-brand-charcoal text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                  {b.discount}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="relative z-10 space-y-1.5 my-2">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed max-w-sm">
                  {b.subtitle}
                </p>
              </div>

              {/* Action Strip: Code copy & Browse dishes */}
              <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleCopyCode(b.code)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl text-xs font-mono font-bold text-white border border-white/20 transition-colors"
                >
                  <Tag className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>Code: {b.code}</span>
                  {copiedCode === b.code ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-stone-300" />
                  )}
                </button>

                <button
                  onClick={() => navigate(`/explore?category=${b.category}`)}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-white text-brand-charcoal hover:bg-brand-cream px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
