// src/components/home/PopularRestaurants.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../../data/mockData';
import { RestaurantCard } from '../food/RestaurantCard';
import { Utensils, ArrowRight, Sparkles, Filter } from 'lucide-react';

export const PopularRestaurants = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    if (activeFilter === 'VEG') return r.pureVeg;
    if (activeFilter === 'TOP_RATED') return r.rating >= 4.7;
    if (activeFilter === 'FAST') return parseInt(r.deliveryTime) <= 25;
    if (activeFilter === 'OFFERS') return Boolean(r.offer);
    return true;
  });

  const filterTabs = [
    { id: 'ALL', label: 'All Places' },
    { id: 'VEG', label: '🌿 Pure Veg' },
    { id: 'TOP_RATED', label: '⭐ Rating 4.7+' },
    { id: 'FAST', label: '⚡ Fast Delivery' },
    { id: 'OFFERS', label: '🏷️ Deals & Offers' }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Rated Kitchens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal tracking-tight">
              Popular Restaurants Around You
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Handpicked dining brands known for hygienic kitchens and legendary taste
            </p>
          </div>

          <button
            onClick={() => navigate('/restaurants')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-charcoal transition-colors group self-start md:self-auto"
          >
            <span>See All {RESTAURANTS.length} Restaurants</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-soft'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-brand-primary/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.slice(0, 8).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};
