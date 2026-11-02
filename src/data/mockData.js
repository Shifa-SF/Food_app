// src/data/mockData.js
// Ultra-realistic, high-resolution food photography and authentic commercial restaurant data

export const LOCATIONS = [
  { id: 'blr-kor', name: 'Koramangala 4th Block', city: 'Bengaluru', fullAddress: '80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034' },
  { id: 'blr-ind', name: 'Indiranagar 100ft Rd', city: 'Bengaluru', fullAddress: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038' },
  { id: 'chn-ann', name: 'Anna Nagar West', city: 'Chennai', fullAddress: '2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040' },
  { id: 'chn-tng', name: 'T. Nagar Panagal Park', city: 'Chennai', fullAddress: 'Usman Road, T. Nagar, Chennai, Tamil Nadu 600017' },
  { id: 'mum-ban', name: 'Bandra West (Pali Hill)', city: 'Mumbai', fullAddress: 'Pali Mala Road, Bandra West, Mumbai, Maharashtra 400050' },
  { id: 'hyd-jub', name: 'Jubilee Hills Rd 36', city: 'Hyderabad', fullAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033' },
];

export const CATEGORIES = [
  {
    id: 'south-indian',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    count: 24,
    badge: 'Authentic'
  },
  {
    id: 'biryani',
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    count: 18,
    badge: 'Popular'
  },
  {
    id: 'north-indian',
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    count: 20,
    badge: 'Royal'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    count: 16,
    badge: 'Trending'
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    count: 14,
    badge: 'Juicy'
  },
  {
    id: 'chinese',
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    count: 15,
    badge: 'Sizzling'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    count: 19,
    badge: 'Sweet'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    count: 12,
    badge: 'Chilled'
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    count: 22,
    badge: 'Quick'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    count: 11,
    badge: 'Crispy'
  }
];

export const COUPONS = [
  {
    code: 'WELCOME50',
    discountPercent: 50,
    maxDiscount: 150,
    minOrder: 199,
    title: '50% OFF up to ₹150',
    description: 'Valid on first 3 orders on Cravery.',
    color: 'from-orange-500 to-amber-500',
    badge: 'BESTSELLER'
  },
  {
    code: 'FEAST20',
    discountPercent: 20,
    maxDiscount: 200,
    minOrder: 499,
    title: '20% OFF up to ₹200',
    description: 'Applicable on orders above ₹499.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'POPULAR'
  },
  {
    code: 'FREEDEL',
    discountPercent: 0,
    flatDiscount: 40,
    isFreeDelivery: true,
    minOrder: 299,
    title: 'FREE DELIVERY',
    description: 'Enjoy zero delivery fee on all restaurants.',
    color: 'from-blue-600 to-indigo-600',
    badge: 'SUPER SAVER'
  },
  {
    code: 'CRAVE100',
    discountPercent: 0,
    flatDiscount: 100,
    minOrder: 599,
    title: 'FLAT ₹100 OFF',
    description: 'Instant ₹100 off on party orders above ₹599.',
    color: 'from-purple-600 to-pink-600',
    badge: 'PARTY DEALS'
  }
];

export const RESTAURANTS = [
  {
    id: 'dakshin-heritage',
    name: 'Dakshin Heritage Kitchen',
    rating: 4.8,
    ratingCount: '12.4k+',
    deliveryTime: '20-25 mins',
    distance: '1.8 km',
    costForTwo: '₹350 for two',
    costNumerical: 350,
    cuisines: ['South Indian', 'Chettinad', 'Tiffin'],
    pureVeg: true,
    featured: true,
    badge: 'Trending #1',
    offer: '50% OFF up to ₹100',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80',
    address: '84, Gandhi Bazaar Main Rd, Basavanagudi',
    categories: ['Breakfast & Tiffin', 'Signature Dosas', 'Meals & Combos', 'Beverages']
  },
  {
    id: 'royal-biryani-nawabs',
    name: 'Nawabi Dum Biryani House',
    rating: 4.7,
    ratingCount: '8.9k+',
    deliveryTime: '30-35 mins',
    distance: '3.2 km',
    costForTwo: '₹500 for two',
    costNumerical: 500,
    cuisines: ['Biryani', 'Mughlai', 'Kebabs'],
    pureVeg: false,
    featured: true,
    badge: 'Chef Choice',
    offer: 'Flat ₹125 OFF above ₹499',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    address: '12th Cross, 100 Feet Rd, Indiranagar',
    categories: ['Biryani Specialties', 'Starters & Kebabs', 'Royal Curries', 'Breads & Desserts']
  },
  {
    id: 'madras-tiffin-room',
    name: 'Madras Tiffin Room 1968',
    rating: 4.9,
    ratingCount: '15.1k+',
    deliveryTime: '18-22 mins',
    distance: '1.2 km',
    costForTwo: '₹250 for two',
    costNumerical: 250,
    cuisines: ['South Indian', 'Kerala', 'Beverages'],
    pureVeg: true,
    featured: true,
    badge: 'Iconic Tiffin',
    offer: '20% OFF on Combos',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80',
    address: 'Old Airport Road, Kodihalli',
    categories: ['Traditional Tiffin', 'Crisp Dosas', 'South Indian Combos', 'Filter Coffee']
  },
  {
    id: 'artisan-woodfire-pizza',
    name: 'Crust & Craft Woodfire Pizza',
    rating: 4.6,
    ratingCount: '6.2k+',
    deliveryTime: '25-30 mins',
    distance: '2.5 km',
    costForTwo: '₹650 for two',
    costNumerical: 650,
    cuisines: ['Pizza', 'Italian', 'Pastas'],
    pureVeg: false,
    featured: false,
    badge: 'Neapolitan Style',
    offer: 'Buy 1 Get 1 on Large Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    address: 'Corner House Ln, Koramangala 5th Block',
    categories: ['Woodfire Pizzas', 'Handmade Pastas', 'Garlic Breads', 'Artisan Desserts']
  },
  {
    id: 'punjabi-angithi',
    name: 'Dhaba 1947 — Punjabi Angithi',
    rating: 4.5,
    ratingCount: '9.4k+',
    deliveryTime: '30-40 mins',
    distance: '4.0 km',
    costForTwo: '₹450 for two',
    costNumerical: 450,
    cuisines: ['North Indian', 'Tandoor', 'Dal Makhani'],
    pureVeg: false,
    featured: false,
    badge: 'Authentic Dhaba',
    offer: 'Free Gulab Jamun on ₹399+',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
    address: 'Brigade Road, Ashok Nagar',
    categories: ['Tandoor Grills', 'Rich Curries', 'Clay Oven Breads', 'Lassi & Desserts']
  },
  {
    id: 'smash-burger-co',
    name: 'The Smash Burger & Shake Co.',
    rating: 4.7,
    ratingCount: '5.8k+',
    deliveryTime: '20-28 mins',
    distance: '2.1 km',
    costForTwo: '₹400 for two',
    costNumerical: 400,
    cuisines: ['Burgers', 'Fast Food', 'Shakes'],
    pureVeg: false,
    featured: true,
    badge: 'Gourmet Buns',
    offer: 'Free Fries with any Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    address: 'Near Forum Mall, Hosur Road',
    categories: ['Smash Burgers', 'Loaded Fries', 'Milkshakes', 'Wings & Dips']
  },
  {
    id: 'golden-dragon-wok',
    name: 'Golden Dragon Asian Wok',
    rating: 4.4,
    ratingCount: '4.7k+',
    deliveryTime: '28-35 mins',
    distance: '3.6 km',
    costForTwo: '₹550 for two',
    costNumerical: 550,
    cuisines: ['Chinese', 'Asian', 'Dimsums'],
    pureVeg: false,
    featured: false,
    badge: 'Wok Hei Special',
    offer: 'Flat 20% OFF on Dimsums',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=80',
    address: 'Lavelle Road, Shanthala Nagar',
    categories: ['Steamed Dimsums', 'Wok Tossed Noodles', 'Sizzlers', 'Appetizers']
  },
  {
    id: 'sweet-tooth-patisserie',
    name: 'Velvet Spoon Artisanal Bakery',
    rating: 4.9,
    ratingCount: '7.8k+',
    deliveryTime: '15-20 mins',
    distance: '1.5 km',
    costForTwo: '₹300 for two',
    costNumerical: 300,
    cuisines: ['Desserts', 'Bakery', 'Coffee'],
    pureVeg: true,
    featured: false,
    badge: 'Pure Delight',
    offer: 'Flat ₹50 OFF on Cakes',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    address: 'Defence Colony, Indiranagar',
    categories: ['Cakes & Pastries', 'Cheesecakes', 'Cold Brews & Coffee', 'Ice Creams']
  }
];

// Complete list of dishes with ALL explicitly requested South Indian items and commercial favorites
export const FOOD_ITEMS = [
  // SOUTH INDIAN DISHES (Explicitly Requested)
  {
    id: 'masala-dosa',
    name: 'Crispy Masala Dosa',
    category: 'south-indian',
    restaurantId: 'madras-tiffin-room',
    restaurantName: 'Madras Tiffin Room 1968',
    price: 130,
    originalPrice: 160,
    rating: 4.9,
    ratingCount: 3840,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Golden crisp fermented crepe generously smeared with fresh spiced potato palya, served with 3 signature chutneys and piping hot drumstick sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '340 kcal',
    customizable: true,
    options: {
      spiciness: ['Mild', 'Medium Spicy', 'Extra Spicy'],
      addExtra: ['Extra Ghee (₹25)', 'Extra Coconut Chutney (₹15)', 'Extra Sambar (₹20)']
    }
  },
  {
    id: 'ghee-roast-dosa',
    name: 'Neyyappam Ghee Roast Dosa',
    category: 'south-indian',
    restaurantId: 'dakshin-heritage',
    restaurantName: 'Dakshin Heritage Kitchen',
    price: 155,
    originalPrice: 180,
    rating: 4.9,
    ratingCount: 2950,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Ultra thin, paper-crisp golden cone dosa roasted to perfection in pure cow desi ghee, paired with spicy tomato relish and peanut chutney.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '410 kcal',
    customizable: true,
    options: {
      spiciness: ['Regular', 'Podi Dusted'],
      addExtra: ['Gunpowder Podi + Ghee (₹30)', 'Extra Coconut Chutney (₹15)']
    }
  },
  {
    id: 'idly-sambar-chutney',
    name: 'Steamed Idly with Sambar & Trio Chutneys',
    category: 'south-indian',
    restaurantId: 'madras-tiffin-room',
    restaurantName: 'Madras Tiffin Room 1968',
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    ratingCount: 4120,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Three melt-in-mouth pillow soft steamed rice idlies served submerged in aromatic shallot sambar with fresh mint, coconut and tomato chutneys.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    calories: '210 kcal',
    customizable: false
  },
  {
    id: 'poori-masala',
    name: 'Puffed Poori Masala (3 Pcs)',
    category: 'south-indian',
    restaurantId: 'dakshin-heritage',
    restaurantName: 'Dakshin Heritage Kitchen',
    price: 120,
    originalPrice: 140,
    rating: 4.7,
    ratingCount: 1820,
    isVeg: true,
    isBestseller: false,
    isChefSpecial: false,
    description: 'Three fluffy, golden inflated whole wheat pooris paired with mildly spiced homestyle potato kurma and tangy lemon onion pickle.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    preparationTime: '12 mins',
    calories: '460 kcal',
    customizable: false
  },
  {
    id: 'kerala-parotta-salna',
    name: 'Flaky Kerala Parotta with Salna (2 Pcs)',
    category: 'south-indian',
    restaurantId: 'dakshin-heritage',
    restaurantName: 'Dakshin Heritage Kitchen',
    price: 145,
    originalPrice: 175,
    rating: 4.9,
    ratingCount: 3100,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Authentic multi-layered Malabar parottas beaten to fluffy perfection, served with roadside style rich aromatic tomato-fennel salna gravy.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    preparationTime: '18 mins',
    calories: '520 kcal',
    customizable: true,
    options: {
      salnaType: ['Veg Salna', 'Chicken Salna Flavor (Non-Veg Gravy)'],
      addExtra: ['Extra Parotta (₹40)', 'Onion Raita (₹20)']
    }
  },
  {
    id: 'south-indian-banana-leaf-meals',
    name: 'Grand South Indian Meals on Banana Leaf',
    category: 'south-indian',
    restaurantId: 'dakshin-heritage',
    restaurantName: 'Dakshin Heritage Kitchen',
    price: 260,
    originalPrice: 320,
    rating: 4.9,
    ratingCount: 2200,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Royal festive spread with Ponni rice, Drumstick Sambar, Tomato Rasam, Mysore Karakuzhambu, Poriyal, Kootu, Appalam, Curd, Payasam, and Pickle.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    preparationTime: '20 mins',
    calories: '680 kcal',
    customizable: false
  },
  {
    id: 'ghee-pongal',
    name: 'Temple Style Desi Ghee Pongal',
    category: 'south-indian',
    restaurantId: 'madras-tiffin-room',
    restaurantName: 'Madras Tiffin Room 1968',
    price: 110,
    originalPrice: 130,
    rating: 4.8,
    ratingCount: 1640,
    isVeg: true,
    isBestseller: false,
    isChefSpecial: false,
    description: 'Comforting mash of rice and split moong lentils tempered with roasted whole cashews, crushed tellicherry peppercorns, cumin and abundant pure cow ghee.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    calories: '390 kcal',
    customizable: false
  },
  {
    id: 'medu-vada',
    name: 'Crispy Medu Vada (2 Pcs)',
    category: 'south-indian',
    restaurantId: 'madras-tiffin-room',
    restaurantName: 'Madras Tiffin Room 1968',
    price: 80,
    originalPrice: 95,
    rating: 4.8,
    ratingCount: 3480,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Golden brown crunchy black gram fritters with crushed black pepper and fresh curry leaves, crunchy outside, spongy inside, served with hot sambar.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    calories: '280 kcal',
    customizable: false
  },
  {
    id: 'chicken-biryani',
    name: 'Royal Dum Hyderabadi Chicken Biryani',
    category: 'biryani',
    restaurantId: 'royal-biryani-nawabs',
    restaurantName: 'Nawabi Dum Biryani House',
    price: 320,
    originalPrice: 380,
    rating: 4.9,
    ratingCount: 6500,
    isVeg: false,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Long grain aged basmati rice slow-cooked in handi with marinated tender bone-in chicken cuts, saffron milk, fried shallots, accompanied by Mirchi ka Salan & Burani Raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    calories: '750 kcal',
    customizable: true,
    options: {
      portion: ['Regular (Serves 1-2)', 'Family Pack + Egg (₹580)'],
      spiceLevel: ['Mild Hyderabadi', 'Authentic Spicy', 'Double Masala']
    }
  },
  {
    id: 'mutton-biryani',
    name: 'Lucknowi Shahi Mutton Biryani',
    category: 'biryani',
    restaurantId: 'royal-biryani-nawabs',
    restaurantName: 'Nawabi Dum Biryani House',
    price: 440,
    originalPrice: 510,
    rating: 4.8,
    ratingCount: 4210,
    isVeg: false,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Tender baby mutton chunks marinated overnight in yogurt and 24 secret potli spices, sealed with dough and steamed on slow charcoal embers.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    calories: '860 kcal',
    customizable: true,
    options: {
      portion: ['Regular (Serves 1-2)', 'Special Feast (₹750)'],
      spiceLevel: ['Royal Mild', 'Spicy Awadhi']
    }
  },
  {
    id: 'chicken-65',
    name: 'Chennai Street Style Chicken 65',
    category: 'snacks',
    restaurantId: 'royal-biryani-nawabs',
    restaurantName: 'Nawabi Dum Biryani House',
    price: 240,
    originalPrice: 280,
    rating: 4.9,
    ratingCount: 3950,
    isVeg: false,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Bite-sized boneless chicken cubes tossed with fiery red chillies, curry leaves, garlic slices and freshly squeezed lime.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '410 kcal',
    customizable: false
  },
  {
    id: 'filter-coffee',
    name: 'Degree Kumbakonam Filter Coffee',
    category: 'beverages',
    restaurantId: 'madras-tiffin-room',
    restaurantName: 'Madras Tiffin Room 1968',
    price: 55,
    originalPrice: 70,
    rating: 4.9,
    ratingCount: 5200,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Strong first-decoction coffee brewed from dark roasted Chikmagalur peaberry beans, frothed high with fresh farm milk in traditional brass dabara-tumbler.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    preparationTime: '8 mins',
    calories: '110 kcal',
    customizable: true,
    options: {
      sweetness: ['Regular Sugar', 'Jaggery (Naatu Sakkarai)', 'Sugar-free', 'Strong / No Sugar']
    }
  },

  // NORTH INDIAN SPECIALTIES
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala & Garlic Naan Combo',
    category: 'north-indian',
    restaurantId: 'punjabi-angithi',
    restaurantName: 'Dhaba 1947 — Punjabi Angithi',
    price: 280,
    originalPrice: 330,
    rating: 4.7,
    ratingCount: 2890,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Velvety makhani gravy infused with kasuri methi and butter, loaded with soft malai paneer cubes, served with 2 freshly baked butter garlic naans.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    preparationTime: '20 mins',
    calories: '620 kcal',
    customizable: false
  },
  {
    id: 'dal-makhani-dhaba',
    name: 'Slow Simmered Dal Makhani',
    category: 'north-indian',
    restaurantId: 'punjabi-angithi',
    restaurantName: 'Dhaba 1947 — Punjabi Angithi',
    price: 230,
    originalPrice: 270,
    rating: 4.8,
    ratingCount: 3120,
    isVeg: true,
    isBestseller: false,
    isChefSpecial: true,
    description: 'Whole black lentils and kidney beans slow cooked overnight on charcoal tandoor with unsalted white butter and dairy cream.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '480 kcal',
    customizable: false
  },

  // PIZZA & ITALIAN
  {
    id: 'truffle-margherita-pizza',
    name: 'Artisan Burrata Margherita Pizza (12")',
    category: 'pizza',
    restaurantId: 'artisan-woodfire-pizza',
    restaurantName: 'Crust & Craft Woodfire Pizza',
    price: 490,
    originalPrice: 580,
    rating: 4.8,
    ratingCount: 1980,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: '48-hour fermented sourdough crust topped with San Marzano tomato coulis, fresh creamy buffalo mozzarella, sweet basil and cold-pressed extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    preparationTime: '22 mins',
    calories: '720 kcal',
    customizable: true,
    options: {
      crust: ['Classic Hand-Tossed', 'Cheese Burst (+₹90)', 'Thin & Crispy'],
      extraToppings: ['Fresh Burrata (₹80)', 'Jalapeños (₹30)', 'Smoked Olives (₹35)']
    }
  },
  {
    id: 'peri-peri-chicken-pizza',
    name: 'Fiery Peri-Peri Grilled Chicken Pizza (12")',
    category: 'pizza',
    restaurantId: 'artisan-woodfire-pizza',
    restaurantName: 'Crust & Craft Woodfire Pizza',
    price: 540,
    originalPrice: 620,
    rating: 4.7,
    ratingCount: 1450,
    isVeg: false,
    isBestseller: false,
    isChefSpecial: false,
    description: 'Spiced tomato base, shredded mozzarella, peri-peri spiced roast chicken, charred bell peppers, caramelized onions and spicy mayo drizzle.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    preparationTime: '22 mins',
    calories: '810 kcal',
    customizable: true
  },

  // BURGERS & FAST FOOD
  {
    id: 'double-smash-cheese-burger',
    name: 'Double Truffle Smash Cheeseburger',
    category: 'burgers',
    restaurantId: 'smash-burger-co',
    restaurantName: 'The Smash Burger & Shake Co.',
    price: 340,
    originalPrice: 399,
    rating: 4.8,
    ratingCount: 2310,
    isVeg: false,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Two smashed tender patties with crispy lace edges, double aged cheddar, caramelized shallots, house secret sauce in a toasted brioche bun with salted fries.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    preparationTime: '18 mins',
    calories: '780 kcal',
    customizable: true,
    options: {
      sides: ['Crinkle Cut Fries', 'Loaded Cheese Fries (+₹60)', 'Onion Rings (+₹50)'],
      drink: ['None', 'Classic Salted Caramel Shake (+₹120)', 'Coke Zero (+₹45)']
    }
  },
  {
    id: 'crispy-paneer-burger',
    name: 'Spicy Herb Crisp Paneer Burger',
    category: 'burgers',
    restaurantId: 'smash-burger-co',
    restaurantName: 'The Smash Burger & Shake Co.',
    price: 250,
    originalPrice: 299,
    rating: 4.6,
    ratingCount: 1780,
    isVeg: true,
    isBestseller: false,
    isChefSpecial: false,
    description: 'Thick block of fresh paneer marinated in cajun spices, crumb fried until super crunchy, layered with iceberg lettuce, pickled gherkins and chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '590 kcal',
    customizable: false
  },

  // CHINESE
  {
    id: 'schezwan-triple-noodles',
    name: 'Wok Sizzled Schezwan Hakka Noodles',
    category: 'chinese',
    restaurantId: 'golden-dragon-wok',
    restaurantName: 'Golden Dragon Asian Wok',
    price: 240,
    originalPrice: 290,
    rating: 4.6,
    ratingCount: 1650,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Hand-pulled noodles stir-fried in a fiery Cantonese wok with shredded cabbage, crunchy scallions, carrots and homemade pungent schezwan sauce.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    preparationTime: '18 mins',
    calories: '450 kcal',
    customizable: false
  },
  {
    id: 'chilli-garlic-dimsum',
    name: 'Crystal Veg Dimsums in Chilli Oil (6 Pcs)',
    category: 'chinese',
    restaurantId: 'golden-dragon-wok',
    restaurantName: 'Golden Dragon Asian Wok',
    price: 270,
    originalPrice: 320,
    rating: 4.7,
    ratingCount: 1140,
    isVeg: true,
    isBestseller: false,
    isChefSpecial: true,
    description: 'Translucent steamed dumplings stuffed with water chestnuts, shiitake mushrooms and bok choy, drizzled with roasted garlic chilli crisp oil.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    calories: '240 kcal',
    customizable: false
  },

  // DESSERTS & SWEETS
  {
    id: 'belgian-chocolate-fudge-cake',
    name: 'Warm Belgian Dark Chocolate Truffle Cake',
    category: 'desserts',
    restaurantId: 'sweet-tooth-patisserie',
    restaurantName: 'Velvet Spoon Artisanal Bakery',
    price: 220,
    originalPrice: 260,
    rating: 4.9,
    ratingCount: 3890,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: true,
    description: 'Decadent 70% Single Origin Callebaut Belgian dark chocolate molten ganache over moist sponge cake. Pure indulgence served warm.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    calories: '420 kcal',
    customizable: false
  },
  {
    id: 'gulab-jamun-rabri',
    name: 'Desi Ghee Shahi Gulab Jamun with Rabri',
    category: 'desserts',
    restaurantId: 'punjabi-angithi',
    restaurantName: 'Dhaba 1947 — Punjabi Angithi',
    price: 150,
    originalPrice: 180,
    rating: 4.9,
    ratingCount: 2470,
    isVeg: true,
    isBestseller: true,
    isChefSpecial: false,
    description: 'Two hot melt-in-mouth mawa gulab jamuns fried in pure ghee, served over chilled saffron-cardamom lachhedar rabri garnished with slivered pistachios.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    preparationTime: '8 mins',
    calories: '360 kcal',
    customizable: false
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sundaram',
    role: 'Food Blogger & Tech Lead, Bangalore',
    rating: 5,
    comment: 'The Masala Dosa arrived crispy and boiling hot within 22 minutes! The packaging kept the chutneys separate without leaks. Cravery feels miles ahead of traditional delivery apps.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Product Designer, Indiranagar',
    rating: 5,
    comment: 'Flawless UI, super crisp photography, and live driver tracking that actually works accurately. Nawabi Dum Biryani has become my Friday ritual.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Kavitha Ranganathan',
    role: 'Architect, Chennai',
    rating: 5,
    comment: 'Finally a delivery platform that treats South Indian breakfast with the culinary respect it deserves. The Kumbakonam degree coffee in a sealed thermal flask is pure genius.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

export const INITIAL_USER = {
  name: 'S. Sheik Almadeen',
  phone: '+91 98402 12345',
  email: 'sheik.almadeen@cravery.com',
  memberSince: 'October 2026',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Home',
      tag: 'DEFAULT',
      address: 'Flat 402, Green Glen Orchid, 4th Block, Koramangala',
      city: 'Bengaluru, Karnataka 560034',
      phone: '+91 98402 12345'
    },
    {
      id: 'addr-2',
      title: 'Office',
      tag: 'WORK',
      address: 'WeWork Galaxy, 43 Residency Road, Shanthala Nagar',
      city: 'Bengaluru, Karnataka 560025',
      phone: '+91 98402 12345'
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'CRV-98241',
    date: '31 Oct 2026, 12:15 PM',
    restaurantName: 'Dakshin Heritage Kitchen',
    restaurantId: 'dakshin-heritage',
    restaurantImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=300&q=80',
    status: 'Delivered',
    statusStep: 4,
    items: [
      { name: 'Crispy Masala Dosa', quantity: 2, price: 130 },
      { name: 'Degree Kumbakonam Filter Coffee', quantity: 2, price: 55 }
    ],
    itemTotal: 370,
    discount: 50,
    deliveryFee: 0,
    total: 335,
    deliveryAddress: 'Flat 402, Green Glen Orchid, 4th Block, Koramangala, Bengaluru'
  }
];
