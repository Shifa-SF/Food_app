// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { PromotionalBanners } from '../components/home/PromotionalBanners';
import { PopularRestaurants } from '../components/home/PopularRestaurants';
import { TrendingFoodItems } from '../components/home/TrendingFoodItems';
import { ExperienceBanner } from '../components/home/ExperienceBanner';

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <PromotionalBanners />
      <PopularRestaurants />
      <TrendingFoodItems selectedCategory={selectedCategory} />
      <ExperienceBanner />
    </div>
  );
};
