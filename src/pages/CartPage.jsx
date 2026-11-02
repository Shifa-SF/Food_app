// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    deliveryFee,
    platformFee,
    taxes,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    activeLocation,
    setLocationModalOpen,
    placeOrder,
    showToast
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [deliveryInstruction, setDeliveryInstruction] = useState('Leave at door');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsPlacingOrder(true);
    setTimeout(() => {
      const order = placeOrder({
        paymentMethod: selectedPayment,
        deliveryAddress: activeLocation.fullAddress,
        deliveryInstructions: deliveryInstruction
      });
      setIsPlacingOrder(false);
      navigate(`/order-tracking/${order.id}`);
    }, 1200);
  };

  const instructionsList = [
    'Leave at door',
    'Avoid calling',
    'Do not ring bell',
    'Leave with security guard'
  ];

  if (cart.length === 0) {
    return (
      <div className="py-20 min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-stone-200 shadow-card">
          <div className="w-20 h-20 rounded-full bg-brand-cream text-brand-primary flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-brand-charcoal mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-stone-500 leading-relaxed mb-6">
            Good food is always cooking! Explore our authentic South Indian tiffins, royal biryanis, and chef specials.
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="px-8 py-3.5 bg-brand-primary hover:bg-[#e85b27] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-accent transition-all inline-flex items-center gap-2"
          >
            <span>Browse Delicious Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const freeDeliveryProgress = Math.min(100, Math.round((cartSubtotal / 399) * 100));

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-brand-charcoal tracking-tight">
              Order Checkout
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              From <strong className="text-brand-charcoal">{cart[0]?.restaurantName}</strong> &bull; Average 24 mins arrival
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items, Instructions, Address & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free Delivery Bar */}
            {cartSubtotal < 399 ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
                  <span>Add ₹{399 - cartSubtotal} more for FREE Delivery!</span>
                  <span>{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-amber-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hurrah! You have unlocked FREE Express Delivery on this order!</span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-4">
              <h3 className="font-bold text-base text-brand-charcoal pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>Selected Delicacies ({cart.length})</span>
                <span className="text-xs text-stone-400 font-normal">Customizable</span>
              </h3>

              <div className="divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Veg indicator */}
                      <div
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 shrink-0 ${
                          item.isVeg ? 'border-brand-success' : 'border-rose-600'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-brand-success' : 'bg-rose-600'
                          }`}
                        />
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />

                      <div>
                        <h4 className="font-bold text-brand-charcoal text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-brand-charcoal">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-[11px] text-stone-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        {item.options && (
                          <p className="text-[10px] text-brand-primary font-medium mt-0.5">
                            {item.options.portion || item.options.spice || 'Customized'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity modifier controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-black text-brand-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-brand-charcoal min-w-[50px] text-right">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card">
              <h3 className="font-bold text-sm text-brand-charcoal mb-3">
                Delivery Instructions for Driver
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {instructionsList.map((inst) => {
                  const isSelected = deliveryInstruction === inst;
                  return (
                    <button
                      key={inst}
                      type="button"
                      onClick={() => setDeliveryInstruction(inst)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                        isSelected
                          ? 'border-brand-primary bg-brand-cream text-brand-primary font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {inst}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-charcoal">Delivery Address</h3>
                    <p className="text-[11px] text-stone-400">Doorstep delivery</p>
                  </div>
                </div>
                <button
                  onClick={() => setLocationModalOpen(true)}
                  className="text-xs font-bold text-brand-primary hover:underline"
                >
                  Change Address
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <p className="font-bold text-brand-charcoal">{activeLocation.name}</p>
                <p className="text-stone-500 mt-0.5">{activeLocation.fullAddress}</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card">
              <h3 className="font-bold text-sm text-brand-charcoal mb-3">
                Select Payment Method
              </h3>
              <div className="space-y-2.5">
                {[
                  {
                    id: 'UPI',
                    name: 'UPI (Google Pay, PhonePe, Paytm)',
                    sub: 'Instant verification • Recommended',
                    icon: QrCode
                  },
                  {
                    id: 'CARD',
                    name: 'Credit / Debit Cards',
                    sub: 'Visa, MasterCard, RuPay, Amex',
                    icon: CreditCard
                  },
                  {
                    id: 'COD',
                    name: 'Cash / Pay on Delivery',
                    sub: 'Pay via UPI / Cash upon arrival',
                    icon: Banknote
                  }
                ].map((pm) => {
                  const isSelected = selectedPayment === pm.id;
                  const Icon = pm.icon;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-primary bg-brand-cream shadow-soft'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-brand-primary text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-charcoal">{pm.name}</p>
                          <p className="text-[11px] text-stone-500">{pm.sub}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-brand-primary bg-brand-primary' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Coupon & Bill Summary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Promo Code Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-brand-primary" />
                <h3 className="font-bold text-sm text-brand-charcoal">Apply Discount Coupon</h3>
              </div>

              {appliedCoupon ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-black text-emerald-900">
                        {appliedCoupon.code} APPLIED
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        You saved ₹{discountAmount} on this order!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter WELCOME50 or FEAST20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2.5 bg-[#F7F5F0] border border-stone-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-brand-primary uppercase"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-charcoal text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Quick Coupon shortcuts */}
              {!appliedCoupon && (
                <div className="pt-3 mt-3 border-t border-stone-100 flex flex-wrap gap-2 text-xs">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block w-full">
                    Try these codes:
                  </span>
                  <button
                    type="button"
                    onClick={() => applyCoupon('WELCOME50')}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-brand-cream text-stone-700 hover:text-brand-primary font-mono text-[11px] font-bold border border-stone-200 transition-colors"
                  >
                    WELCOME50
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCoupon('FEAST20')}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-brand-cream text-stone-700 hover:text-brand-primary font-mono text-[11px] font-bold border border-stone-200 transition-colors"
                  >
                    FEAST20
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCoupon('FREEDEL')}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-brand-cream text-stone-700 hover:text-brand-primary font-mono text-[11px] font-bold border border-stone-200 transition-colors"
                  >
                    FREEDEL
                  </button>
                </div>
              )}
            </div>

            {/* Bill Details Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-4">
              <h3 className="font-bold text-base text-brand-charcoal pb-3 border-b border-stone-100">
                Bill Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Item Total</span>
                  <span className="font-bold text-brand-charcoal">₹{cartSubtotal}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>Delivery Fee</span>
                    <span className="text-[10px] text-stone-400">| Express</span>
                  </span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    <span className="font-bold text-brand-charcoal">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Platform Fee</span>
                  <span className="font-bold text-brand-charcoal">₹{platformFee}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>GST & Restaurant Packaging (5%)</span>
                  <span className="font-bold text-brand-charcoal">₹{taxes}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                    <span>Coupon Savings ({appliedCoupon?.code})</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
              </div>

              {/* Total Payable */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase text-stone-400">To Pay</p>
                  <p className="text-2xl font-black text-brand-charcoal">₹{grandTotal}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Savings: ₹{discountAmount + (cartSubtotal >= 399 ? 35 : 0)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                onClick={handleCheckout}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-brand-primary hover:bg-[#e85b27] text-white rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-accent flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Order to Kitchen...</span>
                  </div>
                ) : (
                  <>
                    <span>Place Order &bull; ₹{grandTotal}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>100% Secure Payment & FSSAI Food Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
