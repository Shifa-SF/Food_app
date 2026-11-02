// src/components/food/RestaurantCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Star, Clock, MapPin, Tag, Heart, ShieldCheck } from 'lucide-react';

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useApp();
  const [imgError, setImgError] = useState(false);
  const wishlisted = isWishlisted(restaurant.id);

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="group bg-white rounded-3xl border border-stone-100 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {restaurant.badge && (
          <span className="bg-brand-charcoal text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {restaurant.badge}
          </span>
        )}
        {restaurant.pureVeg && (
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md">
            Pure Veg
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(restaurant.id);
        }}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
          wishlisted
            ? 'bg-rose-500 text-white shadow-md scale-110'
            : 'bg-white/85 text-stone-600 hover:text-rose-500 hover:bg-white'
        }`}
        aria-label="Save Restaurant"
      >
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image with hover zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={
            imgError
              ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
              : restaurant.image
          }
          alt={restaurant.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Gradient shadow */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Quick Offer Pill */}
        {restaurant.offer && (
          <div className="absolute bottom-2.5 left-3 bg-brand-primary text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <Tag className="w-3 h-3" />
            <span>{restaurant.offer}</span>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Header Row: Name & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-brand-charcoal text-lg group-hover:text-brand-primary transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-xs font-black shrink-0">
              <Star className="w-3 h-3 fill-white" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-stone-500 line-clamp-1">
            {restaurant.cuisines.join(' • ')}
          </p>
        </div>

        {/* Delivery Time, Distance, Price for two */}
        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span className="text-stone-300">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{restaurant.distance}</span>
          </div>
          <span className="text-stone-300">•</span>
          <span className="text-brand-charcoal font-bold">{restaurant.costForTwo}</span>
        </div>
      </div>
    </div>
  );
};
