// src/components/home/ExperienceBanner.jsx
import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, Smartphone, ShieldCheck, Heart, Zap, Award } from 'lucide-react';

export const ExperienceBanner = () => {
  return (
    <section className="py-16 bg-[#FFF9F2] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Grid */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-brand-primary">
            The Cravery Difference
          </span>
          <h2 className="text-3xl font-black text-brand-charcoal tracking-tight mt-1">
            Re-engineering Food Delivery
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            We partner exclusively with top-tier restaurants and use intelligent routing to ensure food arrives with kitchen-fresh temperature and aroma.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-charcoal text-base mb-1">Express Dispatch</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Automated AI dispatch assigns your delivery hero while your food is sizzling in the pan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-charcoal text-base mb-1">Thermal Insulation</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Food travels in multi-layer temperature-locked canisters. Dosas stay crisp, biryanis stay steamy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-charcoal text-base mb-1">Kitchen Audits</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every restaurant on Cravery passes strict hygiene, fresh oil, and quality ingredients checks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-brand-charcoal text-base mb-1">Zero Spills Guarantee</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Specially engineered leak-proof containers guarantee no spillage of sambar or curries.
            </p>
          </div>
        </div>

        {/* Customer Testimonials Carousel/Cards */}
        <div className="bg-brand-charcoal rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-brand-secondary">
                Verified Foodie Testimonials
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Loved By Over 2.5 Million Cravings
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic">
                      "{t.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-primary"
                    />
                    <div>
                      <h5 className="font-bold text-white text-xs">{t.name}</h5>
                      <p className="text-[10px] text-stone-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
