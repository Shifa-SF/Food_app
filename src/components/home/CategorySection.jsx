// src/components/home/CategorySection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategorySection = ({ activeCategory, onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId === activeCategory ? null : catId);
    } else {
      navigate(`/explore?category=${catId}`);
    }
  };

  return (
    <section className="py-12 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Taste Horizons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal tracking-tight">
              Inspiration For Your Next Order
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Explore handpicked culinary favorites across authentic South Indian & global cravings
            </p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-charcoal transition-colors group"
          >
            <span>View All Cuisines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group cursor-pointer flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-brand-cream ring-2 ring-brand-primary shadow-soft -translate-y-1'
                    : 'hover:-translate-y-1'
                }`}
              >
                {/* Rounded category image container */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2.5 transition-all p-1 ${
                    isSelected
                      ? 'border-2 border-brand-primary bg-white shadow-accent'
                      : 'border-2 border-stone-100 group-hover:border-brand-primary/40 bg-stone-50 shadow-sm'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-500"
                  />
                  {category.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-brand-charcoal text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h4
                  className={`text-xs font-bold tracking-tight transition-colors line-clamp-1 ${
                    isSelected
                      ? 'text-brand-primary'
                      : 'text-brand-charcoal group-hover:text-brand-primary'
                  }`}
                >
                  {category.name}
                </h4>
                <span className="text-[10px] text-stone-400 font-medium">
                  {category.count}+ items
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
