import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }[size] || 'w-8 h-8 border-3';

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-brand-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClass} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4 animate-pulse shadow-sm"
        >
          <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-20" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4 animate-pulse shadow-sm">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3 mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md flex-1" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
        </div>
      ))}
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading Eventora workspace...
      </p>
    </div>
  );
};

export default Spinner;

