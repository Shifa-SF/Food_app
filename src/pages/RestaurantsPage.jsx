// src/pages/RestaurantsPage.jsx
import React, { useState } from 'react';
import { RESTAURANTS, CATEGORIES } from '../data/mockData';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { Search, SlidersHorizontal, Star, Clock, Sparkles, X } from 'lucide-react';

export const RestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('RATING'); // RATING, TIME, COST_LOW, COST_HIGH

  const cuisinesList = ['ALL', 'South Indian', 'Biryani', 'North Indian', 'Pizza', 'Burgers', 'Chinese', 'Desserts'];

  // Filtering
  const filtered = RESTAURANTS.filter((r) => {
    // Search
    if (searchTerm) {
      const matchName = r.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCuisine = r.cuisines.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!matchName && !matchCuisine) return false;
    }

    // Cuisine
    if (selectedCuisine !== 'ALL') {
      const hasCuisine = r.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine.toLowerCase()));
      if (!hasCuisine) return false;
    }

    // Veg Only
    if (vegOnly && !r.pureVeg) return false;

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'RATING') return b.rating - a.rating;
    if (sortBy === 'TIME') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    if (sortBy === 'COST_LOW') return a.costNumerical - b.costNumerical;
    if (sortBy === 'COST_HIGH') return b.costNumerical - a.costNumerical;
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('ALL');
    setVegOnly(false);
    setSortBy('RATING');
  };

  const hasActiveFilters = searchTerm || selectedCuisine !== 'ALL' || vegOnly || sortBy !== 'RATING';

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Partner Kitchens</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-charcoal tracking-tight">
            Explore All Restaurants
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Discover {RESTAURANTS.length} verified dining spots near you delivering fresh, piping hot food
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-card mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search restaurant or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F0] border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Quick Filter Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Veg Only Toggle */}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  vegOnly
                    ? 'bg-brand-success text-white border-brand-success shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-brand-success/50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-500'}`} />
                Pure Veg Only
              </button>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-bold text-stone-700 focus:outline-none focus:border-brand-primary"
              >
                <option value="RATING">Sort: Top Rated</option>
                <option value="TIME">Sort: Fastest Delivery</option>
                <option value="COST_LOW">Cost: Low to High</option>
                <option value="COST_HIGH">Cost: High to Low</option>
              </select>

              {/* Clear Filters button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Cuisines Pill Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100">
            <span className="text-[11px] font-bold text-stone-400 uppercase shrink-0">Cuisine:</span>
            {cuisinesList.map((cuisine) => {
              const isSelected = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-[#F7F5F0] text-stone-600 border-transparent hover:border-stone-300'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-stone-500">
            Showing <span className="text-brand-charcoal">{sorted.length}</span> restaurants
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal mb-1">No restaurants match your filters</h3>
            <p className="text-xs text-stone-500 mb-6">Try clearing your filters or search keywords to see all available places.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-[#e85b27] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
