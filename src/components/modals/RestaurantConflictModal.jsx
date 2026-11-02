// src/components/modals/RestaurantConflictModal.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Trash2, ArrowRight } from 'lucide-react';

export const RestaurantConflictModal = () => {
  const { conflictModalOpen, resolveConflict, cart, pendingCartItem } = useApp();

  if (!conflictModalOpen || !pendingCartItem) return null;

  const currentRestaurantName = cart[0]?.restaurantName || 'current restaurant';
  const newRestaurantName = pendingCartItem.item.restaurantName || 'new restaurant';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-modal overflow-hidden border border-brand-lightGrey p-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-center text-brand-charcoal mb-2">
          Replace cart items?
        </h3>
        <p className="text-xs text-stone-500 text-center leading-relaxed mb-6">
          Your cart currently contains dishes from <strong className="text-brand-charcoal">{currentRestaurantName}</strong>.
          Do you want to discard your current cart and add items from{' '}
          <strong className="text-brand-primary">{newRestaurantName}</strong> instead?
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => resolveConflict(true)}
            className="w-full py-3.5 bg-brand-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e85b27] transition-colors shadow-accent"
          >
            <Trash2 className="w-4 h-4" />
            Yes, Discard & Add New Dish
          </button>
          <button
            onClick={() => resolveConflict(false)}
            className="w-full py-3 bg-stone-100 text-stone-700 rounded-xl text-sm font-semibold hover:bg-stone-200 transition-colors"
          >
            No, Keep Current Cart
          </button>
        </div>
      </div>
    </div>
  );
};
