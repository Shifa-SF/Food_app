// src/components/modals/LocationModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, X, Navigation, Check, Search } from 'lucide-react';

export const LocationModal = () => {
  const { locationModalOpen, setLocationModalOpen, locations, activeLocation, setActiveLocation, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [customAddress, setCustomAddress] = useState('');

  if (!locationModalOpen) return null;

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (loc) => {
    setActiveLocation(loc);
    setLocationModalOpen(false);
    showToast(`Delivery location set to ${loc.name}`, 'success');
  };

  const handleUseCurrentLocation = () => {
    // Simulated browser GPS geolocation
    const detected = {
      id: 'gps-loc',
      name: 'Current Location (GPS)',
      city: 'Bengaluru',
      fullAddress: '100 Feet Rd, 12th Main, Indiranagar, Bengaluru, Karnataka 560038'
    };
    setActiveLocation(detected);
    setLocationModalOpen(false);
    showToast('GPS Location acquired: Indiranagar, Bengaluru', 'success');
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customAddress.trim()) return;
    const newLoc = {
      id: 'custom-' + Date.now(),
      name: customAddress.slice(0, 24) + '...',
      city: 'Custom Area',
      fullAddress: customAddress
    };
    setActiveLocation(newLoc);
    setLocationModalOpen(false);
    setCustomAddress('');
    showToast('Location updated', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-modal overflow-hidden border border-brand-lightGrey">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-brand-cream/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-charcoal">Select Delivery Location</h3>
              <p className="text-xs text-stone-500">Pick where you want your food delivered</p>
            </div>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-brand-charcoal hover:border-stone-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Quick GPS button */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-primary">Use Current Location</p>
              <p className="text-xs text-stone-600">Using device GPS for precise door delivery</p>
            </div>
          </button>

          {/* Search Location */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search area, landmark or apartment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          {/* Popular Locations list */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Popular Delivery Hubs
            </p>
            <div className="space-y-2">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'border-brand-primary bg-brand-cream/80 shadow-soft'
                        : 'border-stone-100 hover:border-brand-primary/30 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-brand-primary text-white' : 'bg-stone-100 text-stone-500'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-brand-charcoal">{loc.name}</span>
                          <span className="text-[11px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                            {loc.city}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{loc.fullAddress}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Address Input */}
          <form onSubmit={handleAddCustom} className="pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-500 mb-2 block">
              Or Enter Full Custom Address:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="House / Flat No., Street, Landmark..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#F7F5F0] border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                disabled={!customAddress.trim()}
                className="px-4 py-2.5 bg-brand-charcoal text-white rounded-xl text-xs font-semibold hover:bg-black disabled:opacity-50 transition-colors"
              >
                Set
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
