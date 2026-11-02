// src/pages/OffersPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COUPONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Tag, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Gift, CreditCard } from 'lucide-react';

export const OffersPage = () => {
  const navigate = useNavigate();
  const { applyCoupon, appliedCoupon } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const bankOffers = [
    {
      bank: 'HDFC Bank Millennia Cards',
      discount: '15% Instant Cashback up to ₹100',
      minSpend: 'Min spend ₹499',
      tag: 'CREDIT CARD'
    },
    {
      bank: 'ICICI Bank NetBanking',
      discount: 'Flat ₹75 OFF on First Payment',
      minSpend: 'Min spend ₹399',
      tag: 'NETBANKING'
    },
    {
      bank: 'CRED Pay UPI',
      discount: 'Assured ₹30 to ₹100 Cashback',
      minSpend: 'Valid twice this month',
      tag: 'UPI SPECIAL'
    }
  ];

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-2 bg-brand-primary/10 px-3 py-1 rounded-full">
            <Gift className="w-3.5 h-3.5" />
            <span>Exclusive Savings & Perks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-charcoal tracking-tight">
            Cravery Deals & Coupons
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Save big on your favorite restaurants with verified promotional discount codes and partner bank rewards.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {COUPONS.map((coupon) => {
            const isApplied = appliedCoupon?.code === coupon.code;
            return (
              <div
                key={coupon.code}
                className="bg-white rounded-3xl border border-stone-200/80 shadow-card hover:shadow-hover transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Decorative border cutouts like real coupons */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F7F5F0] border border-stone-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F7F5F0] border border-stone-200" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {coupon.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      Verified & Active
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-brand-charcoal mb-1">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    {coupon.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-stone-400 font-semibold mb-6">
                    <span>Minimum order value: ₹{coupon.minOrder}</span>
                  </div>
                </div>

                {/* Voucher Code Strip */}
                <div className="pt-4 border-t border-dashed border-stone-200 flex items-center justify-between gap-4">
                  <div className="bg-brand-cream border-2 border-dashed border-brand-primary/40 px-3.5 py-2 rounded-xl flex items-center gap-2 font-mono font-black text-sm text-brand-primary">
                    <Tag className="w-4 h-4" />
                    <span>{coupon.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 ${
                      isApplied || copiedCode === coupon.code
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brand-charcoal text-white hover:bg-black'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Applied</span>
                      </>
                    ) : copiedCode === coupon.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy & Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bank & Payment Partner Offers */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-card mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-charcoal">Bank & Wallet Offers</h3>
              <p className="text-xs text-stone-500">Applicable automatically at checkout</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bankOffers.map((bo, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F7F5F0] border border-stone-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md">
                  {bo.tag}
                </span>
                <h4 className="font-bold text-sm text-brand-charcoal">{bo.bank}</h4>
                <p className="text-xs text-brand-primary font-bold">{bo.discount}</p>
                <p className="text-[11px] text-stone-400">{bo.minSpend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-primary hover:bg-[#e85b27] text-white text-xs font-black uppercase tracking-wider shadow-accent transition-all"
          >
            <span>Explore Dishes & Save Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
