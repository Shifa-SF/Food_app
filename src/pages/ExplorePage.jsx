// src/pages/ExplorePage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FOOD_ITEMS, CATEGORIES } from '../data/mockData';
import { FoodCard } from '../components/food/FoodCard';
import { Search, Sparkles, Filter, X, SlidersHorizontal } from 'lucide-react';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'ALL';
  const searchParam = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [dietaryFilter, setDietaryFilter] = useState('ALL'); // ALL, VEG, NON_VEG
  const [sortBy, setSortBy] = useState('RATING'); // RATING, PRICE_LOW, PRICE_HIGH, TIME

  // Update states when URL params change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchTerm(searchParam);
  }, [categoryParam, searchParam]);

  // Filtering
  const filteredItems = FOOD_ITEMS.filter((item) => {
    // Search filter
    if (searchTerm) {
      const matchName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesc = item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRestaurant = item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchName && !matchDesc && !matchRestaurant) return false;
    }

    // Category filter
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (dietaryFilter === 'VEG' && !item.isVeg) return false;
    if (dietaryFilter === 'NON_VEG' && item.isVeg) return false;

    return true;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'RATING') return b.rating - a.rating;
    if (sortBy === 'PRICE_LOW') return a.price - b.price;
    if (sortBy === 'PRICE_HIGH') return b.price - a.price;
    if (sortBy === 'TIME') return parseInt(a.preparationTime) - parseInt(b.preparationTime);
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setDietaryFilter('ALL');
    setSortBy('RATING');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm || selectedCategory !== 'ALL' || dietaryFilter !== 'ALL' || sortBy !== 'RATING';

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Epicurean Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-charcoal tracking-tight">
            Explore Dishes & Cravings
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Order authentic South Indian breakfast tiffins, fragrant dum biryanis, burgers, pizzas, and desserts
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-card mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search dishes (e.g. Masala Dosa, Biryani, Coffee)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F0] border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Quick Actions: Dietary & Sort */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Dietary Buttons */}
              <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
                <button
                  onClick={() => setDietaryFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dietaryFilter === 'ALL'
                      ? 'bg-white text-brand-charcoal shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('VEG')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    dietaryFilter === 'VEG'
                      ? 'bg-brand-success text-white shadow-xs'
                      : 'text-stone-500 hover:text-brand-success'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Veg
                </button>
                <button
                  onClick={() => setDietaryFilter('NON_VEG')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    dietaryFilter === 'NON_VEG'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-rose-600'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Non-Veg
                </button>
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-bold text-stone-700 focus:outline-none focus:border-brand-primary"
              >
                <option value="RATING">Top Rated</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="TIME">Fastest Prep Time</option>
              </select>

              {/* Reset Button */}
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

          {/* Categories Pill Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === 'ALL'
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                  : 'bg-[#F7F5F0] text-stone-600 border-transparent hover:border-stone-300'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-[#F7F5F0] text-stone-600 border-transparent hover:border-stone-300'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-stone-500">
            Showing <span className="text-brand-charcoal">{sortedItems.length}</span> mouth-watering dishes
          </p>
        </div>

        {/* Dishes Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal mb-1">No dishes match your search</h3>
            <p className="text-xs text-stone-500 mb-6">Try searching for other popular favorites like 'dosa', 'biryani', or 'pizza'.</p>
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
