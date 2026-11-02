// src/pages/OrderTrackingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Bike,
  Utensils,
  ArrowRight,
  Sparkles,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { orders, showToast } = useApp();

  // Find order by ID or take latest
  const order = orders.find((o) => o.id === orderId) || orders[0] || {
    id: orderId || 'CRV-98241',
    restaurantName: 'Dakshin Heritage Kitchen',
    restaurantImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=300&q=80',
    total: 335,
    items: [{ name: 'Crispy Masala Dosa', quantity: 2, price: 130 }],
    deliveryAddress: 'Flat 402, Green Glen Orchid, 4th Block, Koramangala',
    driver: {
      name: 'Ramesh Kumar',
      phone: '+91 94812 77410',
      rating: 4.9,
      vehicle: 'Ather 450X (KA-01-EQ-4421)'
    },
    etaMinutes: 22
  };

  const [currentStep, setCurrentStep] = useState(2); // 1: Placed, 2: Kitchen, 3: On Way, 4: Delivered
  const [eta, setEta] = useState(18);

  // Auto progression simulation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const advanceStep = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === 3) {
        showToast('Rider Ramesh Kumar picked up your food and is on the way!', 'info');
      } else if (nextStep === 4) {
        showToast('Your order has been delivered! Enjoy your meal 😋', 'success');
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  };

  const steps = [
    { id: 1, title: 'Order Confirmed', sub: 'Kitchen accepted your order' },
    { id: 2, title: 'Cooking in Kitchen', sub: 'Master chef is preparing fresh dishes' },
    { id: 3, title: 'Out for Delivery', sub: 'Rider is on the way to your door' },
    { id: 4, title: 'Delivered', sub: 'Order handed over safely' }
  ];

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                  Live Tracking
                </span>
                <span className="text-xs font-bold text-stone-400">Order #{order.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal mt-1">
                {currentStep === 4
                  ? 'Delivered & Enjoyed! 🎉'
                  : `Arriving in ${eta} minutes`}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                From <strong className="text-brand-charcoal">{order.restaurantName}</strong>
              </p>
            </div>

            {/* Step simulation trigger for testing */}
            <div className="flex items-center gap-2">
              {currentStep < 4 && (
                <button
                  onClick={advanceStep}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Simulate Next Step &rarr;
                </button>
              )}
              <Link
                to="/explore"
                className="px-4 py-2 bg-brand-charcoal hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
              >
                Order More
              </Link>
            </div>
          </div>

          {/* Interactive Live Map Illustration */}
          <div className="relative my-6 rounded-2xl overflow-hidden bg-[#ECE8E1] border border-stone-200 h-64 sm:h-80 flex items-center justify-center">
            {/* Map Background Grid / Roads styling */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DCD6CC" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Curved Delivery Route Path */}
              <path
                d="M 120 180 C 240 100, 380 240, 520 150"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="5"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Restaurant Pin */}
            <div className="absolute left-[15%] sm:left-[20%] top-[45%] -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal text-white flex items-center justify-center shadow-hover border-2 border-white">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm text-brand-charcoal">
                Kitchen
              </span>
            </div>

            {/* Moving Scooter Marker */}
            <div
              className={`absolute top-[35%] -translate-y-1/2 transition-all duration-1000 flex flex-col items-center z-10 ${
                currentStep === 1
                  ? 'left-[22%]'
                  : currentStep === 2
                  ? 'left-[35%]'
                  : currentStep === 3
                  ? 'left-[58%]'
                  : 'left-[78%]'
              }`}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-accent border-2 border-white animate-bounce">
                  <Bike className="w-7 h-7" />
                </div>
                <div className="absolute -inset-2 bg-brand-primary/30 rounded-2xl animate-ping pointer-events-none" />
              </div>
              <span className="text-[10px] font-black uppercase mt-1 bg-brand-primary text-white px-2 py-0.5 rounded-full shadow-sm">
                Rider On Route
              </span>
            </div>

            {/* Delivery Destination Pin */}
            <div className="absolute right-[15%] sm:right-[20%] top-[40%] -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-success text-white flex items-center justify-center shadow-hover border-2 border-white">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm text-brand-charcoal">
                Your Doorstep
              </span>
            </div>
          </div>

          {/* Progress Timeline Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {steps.map((st) => {
              const isDone = currentStep >= st.id;
              const isCurrent = currentStep === st.id;
              return (
                <div
                  key={st.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-brand-primary bg-brand-cream shadow-soft'
                      : isDone
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-stone-100 bg-stone-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.id}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-brand-primary' : 'text-brand-charcoal'
                      }`}
                    >
                      {st.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">{st.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Info: Delivery Partner Card & Order Items Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Hero Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-4">
            <h3 className="font-bold text-sm text-brand-charcoal pb-3 border-b border-stone-100">
              Delivery Partner Assigned
            </h3>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Delivery Hero"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-primary"
                />
                <div>
                  <h4 className="font-bold text-sm text-brand-charcoal">
                    {order.driver?.name || 'Ramesh Kumar'}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span className="font-bold text-brand-charcoal">⭐ 4.9</span>
                    <span>&bull;</span>
                    <span>1,420 deliveries</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5 font-mono">
                    {order.driver?.vehicle || 'Ather 450X (KA-01-EQ-4421)'}
                  </p>
                </div>
              </div>

              {/* Phone call CTA */}
              <a
                href="tel:+919481277410"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Calling driver: +91 94812 77410...', 'info');
                }}
                className="w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
                title="Call Driver"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Vaccinated & sanitised thermal carrier box verified</span>
            </div>
          </div>

          {/* Order Details Accordion / Summary */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card space-y-4">
            <h3 className="font-bold text-sm text-brand-charcoal pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary ({order.items?.length || 0} items)</span>
              <span className="text-xs text-brand-primary font-black">Paid ₹{order.total}</span>
            </h3>

            <div className="space-y-2 text-xs max-h-40 overflow-y-auto pr-1">
              {order.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-stone-700">
                  <span>
                    <strong className="text-brand-charcoal">{it.quantity}x</strong> {it.name}
                  </span>
                  <span className="font-bold text-stone-800">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <p className="font-bold text-stone-700">Delivery Address:</p>
              <p className="truncate mt-0.5">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
