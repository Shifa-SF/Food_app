// src/pages/WishlistPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FOOD_ITEMS, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/food/FoodCard';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { Heart, ArrowRight, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist } = useApp();

  // Wishlisted dishes
  const savedDishes = FOOD_ITEMS.filter((item) => wishlist.includes(item.id));
  // Wishlisted restaurants
  const savedRestaurants = RESTAURANTS.filter((r) => wishlist.includes(r.id));

  const totalSaved = savedDishes.length + savedRestaurants.length;

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-charcoal tracking-tight">
            Your Wishlist ({totalSaved})
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Quickly re-order the dishes and dining places you love most
          </p>
        </div>

        {totalSaved > 0 ? (
          <div className="space-y-12">
            {/* Saved Dishes */}
            {savedDishes.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                  <span>Favorite Dishes</span>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                    {savedDishes.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {savedDishes.map((dish) => (
                    <FoodCard key={dish.id} item={dish} />
                  ))}
                </div>
              </div>
            )}

            {/* Saved Restaurants */}
            {savedRestaurants.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                  <span>Favorite Restaurants</span>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                    {savedRestaurants.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center max-w-lg mx-auto border border-stone-200 shadow-card">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-brand-charcoal mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed mb-6 max-w-sm mx-auto">
              Tap the heart icon on any mouth-watering South Indian tiffin, royal biryani, or restaurant card to save it here for quick ordering.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-3.5 bg-brand-primary hover:bg-[#e85b27] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-accent transition-all inline-flex items-center gap-2"
            >
              <span>Explore Food Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
