import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  trend,
  trendPositive = true,
  period = 'vs last month',
  icon: Icon,
  variant = 'default', // 'default', 'gradient-purple', 'gradient-indigo', 'gradient-amber', 'gradient-emerald'
  className = '',
}) => {
  const isGradient = variant.startsWith('gradient');

  const getGradientClass = () => {
    switch (variant) {
      case 'gradient-purple':
        return 'bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-indigo-500/20';
      case 'gradient-indigo':
        return 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-blue-500/20';
      case 'gradient-amber':
        return 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20';
      case 'gradient-emerald':
        return 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/20';
      default:
        return 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getGradientClass()} ${className}`}
    >
      {/* Decorative background glow */}
      {isGradient && (
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium tracking-wide ${
              isGradient ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${
              isGradient
                ? 'bg-white/20 text-white backdrop-blur-md'
                : 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
              isGradient
                ? 'bg-white/25 text-white'
                : trendPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
            }`}
          >
            {trendPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend}
          </span>
          <span
            className={
              isGradient ? 'text-white/70 font-normal' : 'text-slate-400 dark:text-slate-500 font-normal'
            }
          >
            {period}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

