import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { Compass, PlusCircle, Calendar, FileCheck, Sparkles, Heart } from 'lucide-react';

export const CustomerLayout = () => {
  const customerTabs = [
    { label: 'Browse Vendors', path: '/customer/browse', icon: Compass },
    { label: 'Plan & Create Event', path: '/customer/create-event', icon: PlusCircle },
    { label: 'My Events', path: '/customer/my-events', icon: Calendar },
    { label: 'My Bookings', path: '/customer/my-bookings', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col transition-colors">
      <Navbar isDashboard={false} />

      {/* Secondary Customer Subnav Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
            {customerTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Eventora Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with celebration & elegance for modern event planners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;

