import React from 'react';
import { Check, Edit2, Trash2, ArrowRight } from 'lucide-react';

export const ServiceCard = ({
  service,
  onEdit,
  onDelete,
  onSelect,
  isVendorView = false,
  isSelected = false,
}) => {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'bg-brand-50/50 dark:bg-brand-950/20 border-2 border-brand-600 shadow-lg'
          : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md'
      }`}
    >
      <div>
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {service.title}
            </h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-brand-700 dark:text-brand-400">
                ${service.price?.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                / {service.unit || 'event'}
              </span>
            </div>
          </div>

          {/* Vendor Controls */}
          {isVendorView && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit && onEdit(service)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
                title="Edit Service"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete && onDelete(service)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          {service.description}
        </p>

        {/* Features Checklist */}
        {service.features && service.features.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            {service.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Select button for customers */}
      {!isVendorView && onSelect && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onSelect(service)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isSelected
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-brand-gradient hover:bg-brand-gradient-hover text-white shadow-sm'
            }`}
          >
            {isSelected ? 'Package Selected' : 'Choose Package'}
            {!isSelected && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;

