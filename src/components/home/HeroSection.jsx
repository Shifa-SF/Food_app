// src/components/home/HeroSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Sparkles, ArrowRight, Clock, Star, Flame, ShieldCheck } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { activeLocation, setLocationModalOpen } = useApp();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const quickPills = [
    { label: 'Masala Dosa', category: 'south-indian' },
    { label: 'Hyderabadi Biryani', category: 'biryani' },
    { label: 'Woodfire Pizza', category: 'pizza' },
    { label: 'Filter Coffee', category: 'beverages' },
    { label: 'Smash Burger', category: 'burgers' }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#FFF9F2] via-[#F7F5F0] to-[#F7F5F0]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Search and Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Promotional Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>Flat 50% OFF On First 3 Orders &bull; Code: WELCOME50</span>
            </div>

            {/* Main Headings */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight leading-[1.12]">
              Delicious Food, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-600 to-brand-secondary">
                Delivered To Your Door.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover amazing restaurants, explore delicious dishes and enjoy your favourite meals.
              Authentic flavors, sizzling hot and delivered with lightning speed.
            </p>

            {/* Hero Search Box with Location Picker */}
            <div className="bg-white p-2.5 sm:p-3 rounded-3xl border border-stone-200 shadow-hover max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                {/* Location trigger */}
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="w-full sm:w-auto flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-stone-50 hover:bg-brand-cream/80 border border-stone-200 text-stone-700 text-xs font-bold transition-colors shrink-0"
                >
                  <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="truncate max-w-[130px]">{activeLocation?.name || 'Set Location'}</span>
                </button>

                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for biryani, dosa, pizza or restaurants..."
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-brand-charcoal placeholder-stone-400 focus:outline-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-primary hover:bg-[#e85b27] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-accent transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-stone-400 font-semibold">Popular:</span>
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => navigate(`/explore?category=${pill.category}`)}
                  className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-brand-primary hover:text-brand-primary font-medium transition-colors shadow-xs"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Trust and Key Stats */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-brand-charcoal">500+</p>
                <p className="text-xs text-stone-500 font-medium">Curated Kitchens</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-primary">24 Mins</p>
                <p className="text-xs text-stone-500 font-medium">Average Arrival</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-2xl font-black text-brand-charcoal">4.9</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Photography Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Circular / Rounded Food Showcase Image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=85"
                  alt="Delicious South Indian Feast"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlaid Banner at Bottom of Hero Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full inline-block">
                    Signature Spotlight
                  </span>
                  <h3 className="text-2xl font-black leading-tight text-white">
                    Madras Golden Dosa & Royal Biryani
                  </h3>
                  <p className="text-xs text-stone-300">
                    Slow roasted in pure cow ghee, served with shallot sambar & aromatic dum spices.
                  </p>
                  <button
                    onClick={() => navigate('/explore?category=south-indian')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-secondary hover:text-white transition-colors pt-1"
                  >
                    <span>Order Now from ₹85</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Badge 1: Live Driver Express ETA */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-hover border border-stone-100 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-xl bg-brand-success/15 text-brand-success flex items-center justify-center">
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400">Express Delivery</p>
                  <p className="text-sm font-black text-brand-charcoal">20 - 25 Mins</p>
                </div>
              </div>

              {/* Floating Badge 2: Authentic Hygiene Guarantee */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-hover border border-stone-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400">100% Quality Sealed</p>
                  <p className="text-sm font-black text-brand-charcoal">FSSAI Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
