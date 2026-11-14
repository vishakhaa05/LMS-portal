import React from 'react';
import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const VendorCard = ({ vendor, onBookNow }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Header with Badge Overlay */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-xs">
            {vendor.category}
          </span>
          {vendor.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/90 text-white backdrop-blur-md shadow-xs">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{vendor.rating}</span>
          <span className="text-white/70 font-normal">({vendor.reviewCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
            <span className="truncate">{vendor.city}</span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 transition-colors">
            {vendor.name}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {vendor.bio}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Starting from
            </span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ${vendor.startingPrice?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/customer/vendors/${vendor.id}`}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Details
            </Link>
            <button
              onClick={() => {
                if (onBookNow) onBookNow(vendor);
                else navigate(`/customer/vendors/${vendor.id}?book=true`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-semibold shadow-xs hover:shadow-brand-500/25 transition-all flex items-center gap-1"
            >
              Book
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;

