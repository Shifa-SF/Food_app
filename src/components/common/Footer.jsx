// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Heart, Shield, Award, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-12 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800 text-stone-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Gourmet Curation</h5>
              <p className="text-xs text-stone-400 mt-0.5">Handpicked premium dining spots</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Lightning Delivery</h5>
              <p className="text-xs text-stone-400 mt-0.5">Average 24 mins doorstep arrival</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">100% Tamper Proof</h5>
              <p className="text-xs text-stone-400 mt-0.5">Hygiene sealed insulated bags</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Live GPS Tracking</h5>
              <p className="text-xs text-stone-400 mt-0.5">Real-time rider location updates</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CRAVE<span className="text-brand-primary">RY</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Cravery is India's premier culinary delivery experience. Bringing authentic heritage flavors,
              crispy South Indian tiffins, fragrant dum biryanis, and artisanal woodfire crusts directly to your table with five-star precision.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-brand-primary text-stone-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                X
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-brand-primary text-stone-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-brand-primary text-stone-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                IN
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-brand-primary text-stone-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                YT
              </a>
            </div>
          </div>

          {/* Column: Popular Cuisines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cuisines</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/explore?category=south-indian" className="hover:text-brand-primary transition-colors">South Indian Tiffins</Link></li>
              <li><Link to="/explore?category=biryani" className="hover:text-brand-primary transition-colors">Hyderabadi Biryani</Link></li>
              <li><Link to="/explore?category=north-indian" className="hover:text-brand-primary transition-colors">North Indian Grills</Link></li>
              <li><Link to="/explore?category=pizza" className="hover:text-brand-primary transition-colors">Woodfire Pizzas</Link></li>
              <li><Link to="/explore?category=desserts" className="hover:text-brand-primary transition-colors">Artisanal Patisserie</Link></li>
            </ul>
          </div>

          {/* Column: Delivery Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Cities</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="text-stone-300 font-medium">Bengaluru</span> (Koramangala, Indiranagar)</li>
              <li><span className="text-stone-300 font-medium">Chennai</span> (Anna Nagar, T. Nagar)</li>
              <li><span className="text-stone-300 font-medium">Mumbai</span> (Bandra, Juhu, Powai)</li>
              <li><span className="text-stone-300 font-medium">Hyderabad</span> (Jubilee Hills, Gachibowli)</li>
              <li><span className="text-stone-300 font-medium">Delhi NCR</span> (Cyber Hub, CP)</li>
            </ul>
          </div>

          {/* Column: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>+91 1800 240 9898 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span>support@cravery.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                <span>Koramangala, Bengaluru 560034</span>
              </li>
              <li className="pt-2">
                <span className="inline-block bg-brand-primary/20 text-brand-secondary px-2.5 py-1 rounded-lg font-bold text-[10px]">
                  FSSAI Lic. No: 11224334000912
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Cravery Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-400">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400">Terms of Service</a>
            <a href="#" className="hover:text-stone-400">Restaurant Partner Portal</a>
            <a href="#" className="hover:text-stone-400">Rider Onboarding</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
