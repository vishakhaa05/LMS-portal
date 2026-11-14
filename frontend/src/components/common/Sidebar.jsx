import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  CalendarDays,
  FileCheck2,
  Tags,
  Settings,
  Sparkles,
  DollarSign,
  PackageCheck,
  CalendarCheck2,
  X,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose, role = 'admin' }) => {
  const location = useLocation();
  const { user } = useAuth();

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Vendors', path: '/admin/vendors', icon: Store },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Events', path: '/admin/events', icon: CalendarDays },
    { label: 'Bookings', path: '/admin/bookings', icon: FileCheck2 },
    { label: 'Categories', path: '/admin/categories', icon: Tags },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const vendorNavItems = [
    { label: 'Dashboard', path: '/vendor', icon: LayoutDashboard, exact: true },
    { label: 'My Profile', path: '/vendor/profile', icon: Building2 },
    { label: 'My Services', path: '/vendor/services', icon: PackageCheck },
    { label: 'Booking Requests', path: '/vendor/requests', icon: FileCheck2 },
    { label: 'Calendar View', path: '/vendor/calendar', icon: CalendarCheck2 },
    { label: 'Earnings & Payouts', path: '/vendor/earnings', icon: DollarSign },
  ];

  const navItems = role === 'admin' ? adminNavItems : vendorNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Eventora
              </span>
              <span className={`block text-[10px] font-bold uppercase tracking-wider ${
                role === 'admin' ? 'text-brand-400' : 'text-amber-400'
              }`}>
                {role === 'admin' ? 'Super Admin' : 'Vendor Portal'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 mb-2">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Card Bottom */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || 'Alexander Cross'}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="capitalize">{role} verified</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

