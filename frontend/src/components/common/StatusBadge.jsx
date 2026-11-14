import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'active':
      case 'confirmed':
      case 'completed':
      case 'paid':
      case 'paid in full':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60';
      case 'pending':
      case 'planning':
      case 'deposit paid':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60';
      case 'rejected':
      case 'cancelled':
      case 'blocked':
      case 'suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60';
      case 'ongoing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/60';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getDotStyle = () => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'active':
      case 'confirmed':
      case 'completed':
      case 'paid':
      case 'paid in full':
        return 'bg-emerald-500';
      case 'pending':
      case 'planning':
      case 'deposit paid':
        return 'bg-amber-500';
      case 'rejected':
      case 'cancelled':
      case 'blocked':
      case 'suspended':
        return 'bg-rose-500';
      case 'ongoing':
        return 'bg-indigo-500 animate-pulse';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotStyle()}`} />
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;

