// src/pages/RestaurantDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RESTAURANTS, FOOD_ITEMS } from '../data/mockData';
import { FoodCard } from '../components/food/FoodCard';
import { useApp } from '../context/AppContext';
import {
  Star,
  Clock,
  MapPin,
  Tag,
  Search,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Heart,
  Share2,
  CheckCircle2
} from 'lucide-react';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, totalCartCount, cartSubtotal, toggleWishlist, isWishlisted, showToast } = useApp();

  const [searchMenu, setSearchMenu] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Find restaurant
  const restaurant = RESTAURANTS.find((r) => r.id === id) || RESTAURANTS[0];
  const wishlisted = isWishlisted(restaurant.id);

  // Dishes belonging to this restaurant (or fallbacks to South Indian favorites for Dakshin/Madras)
  const allRestaurantDishes = FOOD_ITEMS.filter((item) => {
    if (item.restaurantId === restaurant.id) return true;
    // For rich menu experience, also include general items matching cuisines
    return restaurant.cuisines.some((c) =>
      item.category.toLowerCase().includes(c.toLowerCase().split(' ')[0])
    );
  });

  // Filter dishes
  const filteredDishes = allRestaurantDishes.filter((dish) => {
    if (searchMenu) {
      const matchName = dish.name.toLowerCase().includes(searchMenu.toLowerCase());
      const matchDesc = dish.description.toLowerCase().includes(searchMenu.toLowerCase());
      if (!matchName && !matchDesc) return false;
    }
    if (vegOnly && !dish.isVeg) return false;
    if (activeCategory !== 'ALL' && dish.category !== activeCategory) return false;
    return true;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Restaurant link copied to clipboard!', 'info');
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Back button & Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-1.5 font-bold text-stone-600 hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(restaurant.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 font-bold ${
                wishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{wishlisted ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 font-bold transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Header Hero Banner */}
      <div className="bg-white border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Restaurant Cover Image */}
            <div className="md:col-span-4 rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-card border border-stone-100">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Restaurant Details */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {restaurant.badge && (
                  <span className="bg-brand-primary text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    {restaurant.badge}
                  </span>
                )}
                {restaurant.pureVeg && (
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Pure Veg
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-charcoal tracking-tight">
                  {restaurant.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {restaurant.cuisines.join(' • ')}
                </p>
                <div className="flex items-center gap-1 text-xs text-stone-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{restaurant.address}</span>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-stone-100 text-xs">
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-emerald-600 text-white px-2.5 py-1 rounded-xl font-bold">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span className="text-sm font-black">{restaurant.rating}</span>
                  <span className="text-[10px] text-emerald-100 font-normal">({restaurant.ratingCount})</span>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-1.5 text-stone-600 font-semibold bg-stone-100 px-3 py-1.5 rounded-xl">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                {/* Cost for two */}
                <div className="text-stone-700 font-bold bg-stone-100 px-3 py-1.5 rounded-xl">
                  {restaurant.costForTwo}
                </div>
              </div>

              {/* Promo Banner Strip */}
              {restaurant.offer && (
                <div className="flex items-center gap-2 p-3 bg-brand-cream border border-brand-primary/20 rounded-2xl text-xs font-bold text-brand-primary">
                  <Tag className="w-4 h-4 text-brand-primary" />
                  <span>Special Offer: {restaurant.offer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Sticky Sub-nav & Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search within Menu & Veg Only switch */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Menu Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search in menu..."
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F7F5F0] border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          {/* Veg Only switch */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-stone-600">Veg Only</span>
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                vegOnly ? 'bg-brand-success' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  vegOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-brand-charcoal">
            Recommended Menu ({filteredDishes.length})
          </h2>
          <span className="text-xs text-stone-400 font-semibold">
            Freshly prepared on order
          </span>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-stone-200">
            <p className="text-sm font-bold text-stone-500">No dishes match your search or filter.</p>
            <button
              onClick={() => {
                setSearchMenu('');
                setVegOnly(false);
              }}
              className="mt-3 text-xs font-bold text-brand-primary hover:underline"
            >
              Reset Menu Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Bar: Cart Reminder (like Swiggy/Zomato) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-2xl mx-auto z-40 animate-bounce">
          <div className="bg-brand-charcoal text-white rounded-2xl p-4 shadow-modal border border-brand-primary/40 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-black text-sm">
                {totalCartCount}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-200">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in your cart
                </p>
                <p className="text-sm font-black text-brand-secondary">
                  ₹{cartSubtotal} <span className="text-xs font-normal text-stone-400">+ taxes</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="px-5 py-2.5 bg-brand-primary hover:bg-[#e85b27] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-accent flex items-center gap-1.5"
            >
              <span>View Cart</span>
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
