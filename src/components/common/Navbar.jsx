// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Search,
  Percent,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  UtensilsCrossed,
  Compass
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    activeLocation,
    setLocationModalOpen,
    totalCartCount,
    wishlist,
    user,
    setAuthModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Explore Food', path: '/explore' },
    { name: 'Offers', path: '/offers', badge: '50% OFF' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF9F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Brand Logo & Location Selector */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-accent group-hover:scale-105 transition-transform">
                  <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black tracking-tight text-brand-charcoal">
                      CRAVE<span className="text-brand-primary">RY</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-secondary -mt-1">
                    Modern Food Experience
                  </span>
                </div>
              </Link>

              {/* Location Selector Pill */}
              <button
                onClick={() => setLocationModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-stone-200 hover:border-brand-primary/50 hover:bg-stone-50 transition-all text-left shadow-card group"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="max-w-[140px] lg:max-w-[180px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-brand-charcoal truncate block">
                      {activeLocation?.name || 'Select Location'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <span className="text-[10px] text-stone-500 truncate block">
                    {activeLocation?.city || 'Locate Me'}
                  </span>
                </div>
              </button>
            </div>

            {/* Middle: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-brand-charcoal hover:text-brand-primary hover:bg-white/60'
                    }`
                  }
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-brand-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: Quick Search, Wishlist, Cart & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search trigger */}
              <button
                onClick={() => navigate('/explore')}
                className="w-10 h-10 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:border-brand-primary hover:text-brand-primary flex items-center justify-center transition-all shadow-card"
                title="Search Dishes & Restaurants"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:border-brand-primary hover:text-brand-primary flex items-center justify-center transition-all shadow-card"
                title="Saved Items"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-brand-charcoal hover:bg-black text-white transition-all shadow-soft group"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-brand-secondary group-hover:scale-110 transition-transform" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-brand-primary text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-brand-charcoal animate-bounce">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
              </Link>

              {/* Profile / Login */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 p-1 sm:px-3 sm:py-2 rounded-2xl bg-white border border-stone-200 hover:border-brand-primary transition-all shadow-card"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover border border-brand-primary/40"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-bold text-brand-charcoal hidden md:inline max-w-[80px] truncate">
                  {user ? user.name.split(' ')[0] : 'Sign In'}x``
                </span>
              </button>

              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-2xl bg-white border border-stone-200 text-stone-700 flex items-center justify-center hover:bg-stone-50"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
            {/* Mobile Location button */}
            <button
              onClick={() => {
                setLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-brand-cream border border-stone-200 text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-brand-charcoal">{activeLocation?.name}</p>
                <p className="text-[11px] text-stone-500">{activeLocation?.city}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                      isActive
                        ? 'bg-brand-primary text-white'
                        : 'text-brand-charcoal hover:bg-stone-100'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-amber-400 text-brand-charcoal text-[10px] font-black px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-brand-charcoal hover:bg-stone-100"
              >
                <span>My Orders & Profile</span>
                <User className="w-4 h-4 text-stone-400" />
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
