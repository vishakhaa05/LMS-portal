import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import VendorCard from '../../components/common/VendorCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Award,
  Users,
  Search,
  CheckCircle2,
  ChevronRight,
  Star,
  HeartHandshake,
  Cake,
  Briefcase,
  Music,
  Camera,
  Utensils,
  Calculator,
  DollarSign,
  SlidersHorizontal
} from 'lucide-react';

export const LandingPage = () => {
  const { categories, vendors } = useData();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Interactive Budget Estimator State
  const [calcType, setCalcType] = useState('Wedding');
  const [calcGuests, setCalcGuests] = useState(120);
  const [calcTier, setCalcTier] = useState('premium');

  const tierMultipliers = {
    standard: 1,
    premium: 1.5,
    luxury: 2.6,
  };

  const basePerGuest = {
    Wedding: 140,
    Birthday: 65,
    Corporate: 110,
    'Concert & Festival': 45,
    'Photography & Film': 80,
    'Catering & Dining': 70,
  };

  const calculatedBase = (basePerGuest[calcType] || 100) * calcGuests * (tierMultipliers[calcTier] || 1.5);
  const totalEstimated = Math.round(calculatedBase / 100) * 100;

  const costBreakdown = [
    { label: 'Venue & Production Styling', percent: 40, amount: Math.round(totalEstimated * 0.40), color: 'bg-indigo-600' },
    { label: 'Gourmet Catering & Mixology', percent: 35, amount: Math.round(totalEstimated * 0.35), color: 'bg-amber-500' },
    { label: 'Cinematography & Visual Arts', percent: 15, amount: Math.round(totalEstimated * 0.15), color: 'bg-purple-600' },
    { label: 'Live Music & DJ Entertainment', percent: 10, amount: Math.round(totalEstimated * 0.10), color: 'bg-emerald-500' },
  ];

  const featuredVendors = vendors.filter((v) => v.featured || v.rating >= 4.9).slice(0, 4);

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'wedding': return <HeartHandshake className="w-5 h-5" />;
      case 'birthday': return <Cake className="w-5 h-5" />;
      case 'corporate': return <Briefcase className="w-5 h-5" />;
      case 'concert': return <Music className="w-5 h-5" />;
      case 'photography': return <Camera className="w-5 h-5" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedCategory) query.set('cat', selectedCategory);
    if (searchCity) query.set('city', searchCity);
    navigate(`/customer/browse?${query.toString()}`);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-radial from-violet-600/10 via-slate-50 to-transparent dark:from-violet-950/20 dark:via-slate-950 dark:to-slate-950">
        {/* Ambient Blur Bubbles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Event Management Redefined for 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Orchestrate Unforgettable <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-700 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Celebrations & Events
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Eventora brings together top-tier banquet halls, Michelin-level caterers, cinematic photographers, and chart-topping DJs into one unified, transparent planning platform.
            </p>

            {/* Quick Hero Search Box */}
            <form
              onSubmit={handleSearch}
              className="mt-8 p-2 sm:p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-full border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5 sm:border-r border-slate-200 dark:border-slate-800">
                <Search className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-hidden font-medium cursor-pointer"
                >
                  <option value="" className="dark:bg-slate-900">All Event Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug} className="dark:bg-slate-900">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5">
                <input
                  type="text"
                  placeholder="City (e.g. New York, San Francisco)"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Find Vendors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100% Verified Vendors
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Escrow Protected Payouts
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                4.9/5 Average Review Score
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">14,200+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Events Orchestrated</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">1,850+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Vetted Artisans & Vendors</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">99.8%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Satisfaction Guarantee</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">$28M+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Securely Contracted</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore by Event Type
            </h2>
          </div>
          <Link
            to="/customer/browse"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/customer/browse?cat=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white">
                    {getCategoryIcon(cat.slug)}
                  </span>
                  <span className="text-[11px] font-semibold text-white/80">
                    {cat.count}+ Available
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED VENDORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Spotlight Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Top Rated Event Vendors
            </h2>
          </div>
          <Link
            to="/customer/browse"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Browse Full Directory</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 STEPS) */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-20 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Simplicity at Scale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              How Eventora Works in 3 Easy Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              From conception to day-of execution, we streamline the entire lifecycle of your dream event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-xl mb-6 shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Define Your Event Vision
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Use our multi-step planner to configure dates, budget envelopes, estimated guest counts, and personal aesthetic preferences in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center font-black text-xl mb-6 shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Select & Compare Verified Vendors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Filter through verified caterers, venues, photographers, and audio-visual artists. Review real portfolios, customer ratings, and transparent prices.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center font-black text-xl mb-6 shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Book Securely & Celebrate
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Confirm bookings with milestone escrow guarantees. Track vendor timelines in one synchronized dashboard and relish an immaculate event day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 INTERACTIVE SMART BUDGET ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 text-xs font-bold mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Real-Time Estimation Tool</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Instant Celebration Budget Estimator
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Adjust guest attendance and service tier to simulate transparent market pricing from vetted vendors.
                </p>
              </div>

              {/* Event Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Event Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Wedding', 'Corporate', 'Birthday', 'Concert & Festival'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCalcType(type)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        calcType === type
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Estimated Guests
                  </label>
                  <span className="text-base font-extrabold text-brand-700 dark:text-brand-400">
                    {calcGuests} Attendees
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={calcGuests}
                  onChange={(e) => setCalcGuests(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Intimate (20)</span>
                  <span>Grand Celebration (500)</span>
                </div>
              </div>

              {/* Tier Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Experience Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', title: 'Essential', sub: 'Standard vendors' },
                    { id: 'premium', title: 'Signature', sub: 'Top-rated artisans' },
                    { id: 'luxury', title: 'Luxury VIP', sub: 'Full production' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCalcTier(tier.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        calcTier === tier.id
                          ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {tier.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Computed Estimates & Breakdown */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6">
              <div className="flex justify-between items-baseline border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Estimated Budget
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                    ${totalEstimated.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Average</span>
                  <span className="text-xs font-bold text-slate-200">
                    ~${Math.round(totalEstimated / calcGuests)} / guest
                  </span>
                </div>
              </div>

              {/* Allocation Breakdown Progress Bars */}
              <div className="space-y-3 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Recommended Budget Allocation
                </span>
                {costBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300 text-[11px]">
                      <span>{item.label} ({item.percent}%)</span>
                      <span className="font-bold">${item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={`/customer/create-event?type=${encodeURIComponent(calcType)}&budget=${totalEstimated}&guests=${calcGuests}`}
                className="w-full py-3 px-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-bold shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Plan Event with this Budget</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Loved By Planners & Hosts
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Real Stories, Real Celebrations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "Eventora saved our wedding planning sanity. We booked Grand Crystal Palace and Lumina Lens directly through the portal with total payment security. Truly magical experience."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Sophia Miller"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">Sophia Miller</h5>
                <p className="text-[11px] text-slate-400">Bride, Los Angeles</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "For our 500-attendee corporate summit, coordinating catering and AV was a nightmare in prior years. Eventora let us manage everything in one synchronized calendar."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Marcus Sterling"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">Marcus Sterling</h5>
                <p className="text-[11px] text-slate-400">VP of Events, TechNova</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "As a DJ business owner, the vendor dashboard is unmatched. Inquiries arrive organized with complete event budgets and guest numbers. Our monthly revenue tripled!"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="DJ Vance"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">Liam Vance</h5>
                <p className="text-[11px] text-slate-400">Founder, DJ Pulse Works</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-600 to-brand-900 p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Host an Exceptional Event?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Join thousands of delighted planners and world-class vendors making memorable experiences happen every day.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/customer/create-event"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-brand-800 text-xs sm:text-sm font-bold shadow-lg hover:bg-slate-100 transition-colors"
              >
                Plan Your Event Free
              </Link>
              <Link
                to="/register?role=vendor"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-colors"
              >
                Become a Vendor Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

