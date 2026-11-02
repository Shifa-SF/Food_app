// src/components/modals/ItemCustomizationModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Sparkles, Check } from 'lucide-react';

export const ItemCustomizationModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useApp();
  const [selectedSpice, setSelectedSpice] = useState(
    item?.options?.spiciness?.[0] || item?.options?.spiceLevel?.[0] || 'Medium'
  );
  const [selectedPortion, setSelectedPortion] = useState(
    item?.options?.portion?.[0] || item?.options?.crust?.[0] || null
  );
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const toggleExtra = (extra) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleConfirm = () => {
    const customization = {
      portion: selectedPortion,
      spice: selectedSpice,
      extras: selectedExtras
    };
    addToCart(item, customization, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-modal overflow-hidden border border-stone-200">
        {/* Header with image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-brand-primary px-2.5 py-0.5 rounded-full inline-block mb-1">
              Customizable Delight
            </span>
            <h3 className="text-xl font-bold text-white leading-tight">{item.name}</h3>
            <p className="text-stone-300 text-xs mt-0.5">₹{item.price}</p>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Spice Level */}
          {(item.options?.spiciness || item.options?.spiceLevel) && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Select Spice Preference
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(item.options?.spiciness || item.options?.spiceLevel).map((spice) => {
                  const isSelected = selectedSpice === spice;
                  return (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                        isSelected
                          ? 'border-brand-primary bg-brand-cream text-brand-primary ring-1 ring-brand-primary'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {spice}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portion / Crust */}
          {(item.options?.portion || item.options?.crust) && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Choose Portion / Crust
              </p>
              <div className="space-y-2">
                {(item.options?.portion || item.options?.crust).map((opt) => {
                  const isSelected = selectedPortion === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => setSelectedPortion(opt)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-primary bg-brand-cream text-brand-primary font-bold'
                          : 'border-stone-200 text-stone-700 text-xs'
                      }`}
                    >
                      <span className="text-xs">{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-brand-primary bg-brand-primary' : 'border-stone-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Addons */}
          {(item.options?.addExtra || item.options?.extraToppings) && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Add Gourmet Extras
              </p>
              <div className="space-y-2">
                {(item.options?.addExtra || item.options?.extraToppings).map((extra) => {
                  const isSelected = selectedExtras.includes(extra);
                  return (
                    <div
                      key={extra}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-primary bg-brand-cream text-brand-primary font-semibold'
                          : 'border-stone-200 text-stone-700 text-xs'
                      }`}
                    >
                      <span className="text-xs">{extra}</span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-brand-primary bg-brand-primary' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-600">Quantity</span>
            <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold text-brand-charcoal">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-stone-400">Total Price</p>
            <p className="text-lg font-black text-brand-charcoal">₹{item.price * quantity}</p>
          </div>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl text-sm hover:bg-[#e85b27] transition-all shadow-accent flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
