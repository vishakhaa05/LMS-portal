import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import VendorCard from '../../components/common/VendorCard';
import EmptyState from '../../components/common/EmptyState';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  DollarSign,
  Filter,
  X,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const BrowseVendors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const initialCity = searchParams.get('city') || 'all';

  const { vendors, categories } = useData();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'price-desc'

  // Extract unique cities
  const cities = useMemo(() => {
    const set = new Set(vendors.map((v) => v.city));
    return Array.from(set);
  }, [vendors]);

  // Filtered & Sorted vendors
  const filteredVendors = useMemo(() => {
    return vendors
      .filter((v) => {
        // Status check: only show Approved in public browse
        if (v.status !== 'Approved') return false;

        // Category filter
        if (selectedCategory !== 'all') {
          const matchSlug = v.categorySlug?.toLowerCase() === selectedCategory.toLowerCase();
          const matchName = v.category?.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchSlug && !matchName) return false;
        }

        // City filter
        if (selectedCity !== 'all' && v.city?.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Rating filter
        if (v.rating < minRating) return false;

        // Price filter
        if (v.startingPrice > maxPrice) return false;

        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = v.name?.toLowerCase().includes(q);
          const matchBio = v.bio?.toLowerCase().includes(q);
          const matchCity = v.city?.toLowerCase().includes(q);
          const matchCat = v.category?.toLowerCase().includes(q);
          if (!matchName && !matchBio && !matchCity && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return 0;
      });
  }, [vendors, search, selectedCategory, selectedCity, minRating, maxPrice, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedCity('all');
    setMinRating(0);
    setMaxPrice(10000);
    setSortBy('rating');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCity !== 'all' ||
    minRating > 0 ||
    maxPrice < 10000 ||
    search.trim() !== '';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Browse Verified Event Vendors
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore top-rated venues, catering masters, cinematic videographers, and audio-visual artists.
        </p>
      </div>

      {/* FILTER & SEARCH BAR PANEL */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top search & sorting row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vendor name, services, style, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold w-full md:w-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-800 dark:text-white focus:outline-hidden cursor-pointer"
              >
                <option value="rating" className="dark:bg-slate-900">Highest Rated First</option>
                <option value="price-asc" className="dark:bg-slate-900">Starting Price: Low to High</option>
                <option value="price-desc" className="dark:bg-slate-900">Starting Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* City / Location Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              City / Metro
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="all">All Locations</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="0">Any Rating</option>
              <option value="4.5">★ 4.5 Stars & Above</option>
              <option value="4.8">★ 4.8 Stars (Top Tier)</option>
              <option value="4.9">★ 4.9 Stars (Exceptional)</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Max Starting Budget</span>
              <span className="text-brand-600 font-black">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="50"
              max="10000"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing{' '}
          <strong className="text-slate-900 dark:text-white font-bold">
            {filteredVendors.length}
          </strong>{' '}
          vetted vendor partners
        </span>

        {selectedCategory !== 'all' && (
          <span className="px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold text-[11px]">
            Filtered: {selectedCategory}
          </span>
        )}
      </div>

      {/* VENDORS GRID */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No vendors found"
          description="Try broadening your search term, increasing the maximum budget, or clearing category filters."
          actionText="Reset All Filters"
          onAction={handleClearFilters}
        />
      )}
    </div>
  );
};

export default BrowseVendors;

