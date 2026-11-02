// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LOCATIONS, COUPONS, FOOD_ITEMS, INITIAL_USER, INITIAL_ORDERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // LocalStorage initializers with fallbacks
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cravery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cravery_wishlist');
      return saved ? JSON.parse(saved) : ['masala-dosa', 'chicken-biryani', 'dakshin-heritage'];
    } catch {
      return ['masala-dosa', 'chicken-biryani', 'dakshin-heritage'];
    }
  });

  const [activeLocation, setActiveLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('cravery_location');
      return saved ? JSON.parse(saved) : LOCATIONS[0];
    } catch {
      return LOCATIONS[0];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cravery_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('cravery_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cravery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cravery_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cravery_location', JSON.stringify(activeLocation));
  }, [activeLocation]);

  useEffect(() => {
    localStorage.setItem('cravery_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cravery_user', JSON.stringify(user));
  }, [user]);

  // Toast System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDeliveryEligible = cartSubtotal >= 399 || (appliedCoupon && appliedCoupon.isFreeDelivery);
  const deliveryFee = cart.length === 0 ? 0 : isFreeDeliveryEligible ? 0 : 35;
  const platformFee = cart.length === 0 ? 0 : 5;
  const taxes = Math.round(cartSubtotal * 0.05);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.discountPercent > 0) {
      discountAmount = Math.min(
        Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100),
        appliedCoupon.maxDiscount || Infinity
      );
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = appliedCoupon.flatDiscount;
    }
  }

  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + platformFee + taxes - discountAmount);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add to cart with cross-restaurant conflict check
  const addToCart = (item, options = null, qty = 1) => {
    if (cart.length > 0 && cart[0].restaurantId !== item.restaurantId) {
      setPendingCartItem({ item, options, qty });
      setConflictModalOpen(true);
      return;
    }

    executeAddToCart(item, options, qty);
  };

  const executeAddToCart = (item, options, qty) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id && JSON.stringify(ci.options) === JSON.stringify(options)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            isVeg: item.isVeg,
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
            quantity: qty,
            options: options || null
          }
        ];
      }
    });

    showToast(`Added ${item.name} to cart!`, 'success');
  };

  const resolveConflict = (replace) => {
    if (replace && pendingCartItem) {
      setCart([]);
      setTimeout(() => {
        executeAddToCart(pendingCartItem.item, pendingCartItem.options, pendingCartItem.qty);
      }, 50);
      showToast('Cart replaced with new restaurant dishes', 'info');
    }
    setConflictModalOpen(false);
    setPendingCartItem(null);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupons
  const applyCoupon = (code) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try WELCOME50 or FEAST20' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Add ₹${found.minOrder - cartSubtotal} more to apply coupon ${found.code}`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! You saved on this order.`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from favorites', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Added to your favorites ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isWishlisted = (id) => wishlist.includes(id);

  // Place Order with Live Tracking initialization & Confetti celebration
  const placeOrder = ({ paymentMethod, deliveryAddress, deliveryInstructions }) => {
    const orderId = 'CRV-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      restaurantName: cart[0]?.restaurantName || 'Dakshin Heritage Kitchen',
      restaurantId: cart[0]?.restaurantId || 'dakshin-heritage',
      restaurantImage: cart[0]?.image,
      items: [...cart],
      itemTotal: cartSubtotal,
      deliveryFee,
      taxes,
      platformFee,
      discount: discountAmount,
      total: grandTotal,
      status: 'Order Placed',
      statusStep: 1, // 1: Placed, 2: Preparing, 3: Out for Delivery, 4: Delivered
      paymentMethod,
      deliveryAddress: deliveryAddress || activeLocation.fullAddress,
      deliveryInstructions: deliveryInstructions || 'None',
      driver: {
        name: 'Ramesh Kumar',
        phone: '+91 94812 77410',
        rating: 4.9,
        vehicle: 'Ather 450X (KA-01-EQ-4421)'
      },
      etaMinutes: 24
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  // Auth
  const login = (userData) => {
    setUser(userData);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartCount,
        cartSubtotal,
        deliveryFee,
        platformFee,
        taxes,
        grandTotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isFreeDeliveryEligible,
        wishlist,
        toggleWishlist,
        isWishlisted,
        locations: LOCATIONS,
        activeLocation,
        setActiveLocation,
        locationModalOpen,
        setLocationModalOpen,
        authModalOpen,
        setAuthModalOpen,
        user,
        login,
        logout,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        toasts,
        showToast,
        removeToast,
        conflictModalOpen,
        resolveConflict,
        pendingCartItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
