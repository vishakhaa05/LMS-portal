import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-md">
        <Sparkles className="w-10 h-10" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 leading-relaxed">
        The celebration or resource you are looking for might have been relocated, rescheduled, or does not exist.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

