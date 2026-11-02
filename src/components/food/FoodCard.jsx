// src/components/food/FoodCard.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Star, Plus, Minus, Clock, Flame, Sparkles } from 'lucide-react';
import { ItemCustomizationModal } from '../modals/ItemCustomizationModal';

export const FoodCard = ({ item }) => {
  const { cart, addToCart, updateQuantity, toggleWishlist, isWishlisted } = useApp();
  const [imgError, setImgError] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // Check if item is already in cart
  const cartItem = cart.find((ci) => ci.id === item.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const wishlisted = isWishlisted(item.id);

  const handleAdd = () => {
    if (item.customizable) {
      setCustomizeOpen(true);
    } else {
      addToCart(item);
    }
  };

  return (
    <>
      <div className="group bg-white rounded-3xl border border-stone-100 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden relative">
        {/* Badges on top of card */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {item.isBestseller && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.8 rounded-full shadow-sm tracking-wide">
              Bestseller
            </span>
          )}
          {item.isChefSpecial && (
            <span className="bg-brand-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-0.8 rounded-full shadow-sm tracking-wide flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Chef Special
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(item.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-md scale-110'
              : 'bg-white/80 text-stone-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Image Container with hover zoom */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={
              imgError
                ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
                : item.image
            }
            alt={item.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />

          {/* Bottom gradient overlay on image */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Quick info over image bottom */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px]">
              <Clock className="w-3 h-3 text-brand-secondary" />
              {item.preparationTime || '15 mins'}
            </span>
            {item.calories && (
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px]">
                <Flame className="w-3 h-3 text-orange-400" />
                {item.calories}
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
          <div>
            {/* Veg / Non-Veg Indicator and Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {/* Standard FSSAI Veg / Non-Veg Indicator */}
                <div
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 ${
                    item.isVeg ? 'border-brand-success' : 'border-rose-600'
                  }`}
                  title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.isVeg ? 'bg-brand-success' : 'bg-rose-600'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-400 tracking-tight">
                  {item.restaurantName}
                </span>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg text-xs font-bold border border-emerald-200">
                <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                <span>{item.rating}</span>
                <span className="text-[10px] text-emerald-600/70">({item.ratingCount})</span>
              </div>
            </div>

            {/* Title & Description */}
            <h4 className="font-bold text-brand-charcoal text-base group-hover:text-brand-primary transition-colors line-clamp-1">
              {item.name}
            </h4>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-brand-charcoal">₹{item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{item.originalPrice}
                  </span>
                )}
              </div>
              {item.customizable && (
                <span className="text-[10px] text-brand-primary font-bold tracking-tight">
                  Customisable
                </span>
              )}
            </div>

            {/* Cart Button or Quantity Counter */}
            {inCartQty === 0 ? (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-brand-cream border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1"
              >
                <span>Add</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center bg-brand-primary text-white rounded-xl overflow-hidden shadow-accent">
                <button
                  onClick={() => updateQuantity(item.id, inCartQty - 1)}
                  className="px-2.5 py-1.5 hover:bg-black/20 text-white font-bold transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 py-1.5 text-xs font-extrabold">{inCartQty}</span>
                <button
                  onClick={() => updateQuantity(item.id, inCartQty + 1)}
                  className="px-2.5 py-1.5 hover:bg-black/20 text-white font-bold transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customization modal if applicable */}
      {item.customizable && (
        <ItemCustomizationModal
          item={item}
          isOpen={customizeOpen}
          onClose={() => setCustomizeOpen(false)}
        />
      )}
    </>
  );
};
