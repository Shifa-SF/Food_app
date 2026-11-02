// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, orders, addToCart, setAuthModalOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('ORDERS'); // ORDERS, ADDRESSES
  const [newAddrTitle, setNewAddrTitle] = useState('');
  const [newAddrText, setNewAddrText] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.id || 'reorder-' + item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        price: item.price,
        restaurantId: order.restaurantId,
        restaurantName: order.restaurantName,
        image:
          order.restaurantImage ||
          'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
        isVeg: true
      });
    });
    showToast(`Items from ${order.restaurantName} added to cart!`, 'success');
    navigate('/cart');
  };

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
                }
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-3xl object-cover border-4 border-brand-primary shadow-soft"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-brand-charcoal">
                    {user?.name || 'Food Explorer'}
                  </h1>
                  <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Gourmet VIP
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    {user?.phone || '+91 98402 12345'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    {user?.email || 'user@cravery.com'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl border border-stone-200 hover:border-brand-primary text-xs font-bold text-stone-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mb-6 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ORDERS'
                ? 'bg-brand-charcoal text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Past Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('ADDRESSES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ADDRESSES'
                ? 'bg-brand-charcoal text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Saved Addresses
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-brand-charcoal">
                          {ord.restaurantName}
                        </h3>
                        <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {ord.status || 'Delivered'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Order #{ord.id} &bull; {ord.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/order-tracking/${ord.id}`)}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                      >
                        Live Tracking
                      </button>
                      <button
                        onClick={() => handleReorder(ord)}
                        className="px-4 py-2 rounded-xl bg-brand-primary text-white hover:bg-[#e85b27] text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    {ord.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span>
                          <strong className="text-brand-charcoal">{it.quantity}x</strong> {it.name}
                        </span>
                        <span className="font-bold text-stone-700">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">Total Bill Paid:</span>
                    <span className="text-base font-black text-brand-charcoal">₹{ord.total}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-stone-200">
                <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <h3 className="font-bold text-base text-brand-charcoal">No past orders yet</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Browse delicious dishes and treat yourself today!
                </p>
                <button
                  onClick={() => navigate('/explore')}
                  className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-bold"
                >
                  Order Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'ADDRESSES' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(user?.savedAddresses || []).map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-brand-charcoal">{addr.title}</h4>
                      {addr.tag && (
                        <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {addr.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{addr.address}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{addr.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
