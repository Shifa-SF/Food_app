// src/components/home/TrendingFoodItems.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FOOD_ITEMS } from '../../data/mockData';
import { FoodCard } from '../food/FoodCard';
import { Flame, ArrowRight, Sparkles, Filter } from 'lucide-react';

export const TrendingFoodItems = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('ALL'); // ALL, VEG, NON_VEG, CHEF

  // Filter items
  const items = FOOD_ITEMS.filter((item) => {
    // If category is passed from parent
    if (selectedCategory && item.category !== selectedCategory) return false;

    if (filterType === 'VEG') return item.isVeg;
    if (filterType === 'NON_VEG') return !item.isVeg;
    if (filterType === 'CHEF') return item.isChefSpecial;
    return true;
  });

  return (
    <section className="py-12 bg-white/60 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
              <span>Crowd Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal tracking-tight">
              Trending Cravings This Week
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Crisp ghee dosas, slow-cooked royal dum biryanis & chef-crafted delicacies ordered right now
            </p>
          </div>

          {/* Quick Dietary Filter Switches */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterType === 'ALL'
                  ? 'bg-brand-charcoal text-white border-brand-charcoal'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterType('VEG')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                filterType === 'VEG'
                  ? 'bg-brand-success text-white border-brand-success'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Pure Veg
            </button>
            <button
              onClick={() => setFilterType('NON_VEG')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                filterType === 'NON_VEG'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Non-Veg
            </button>
            <button
              onClick={() => setFilterType('CHEF')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                filterType === 'CHEF'
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Chef's Special
            </button>
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.slice(0, 12).map((food) => (
            <FoodCard key={food.id} item={food} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-charcoal hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider shadow-hover transition-all"
          >
            <span>Explore All {FOOD_ITEMS.length}+ Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
