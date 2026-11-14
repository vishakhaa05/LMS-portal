import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  DollarSign,
  FileCheck2,
  CalendarCheck,
  Star,
  ArrowRight,
  TrendingUp,
  PackagePlus,
  Building2,
  Clock,
  MapPin
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const VendorDashboard = () => {
  const { user } = useAuth();
  const { vendors, bookings, events, vendorMonthlyEarnings } = useData();

  // Find current vendor
  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  // Vendor's bookings
  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id);
  const pendingRequests = vendorBookings.filter((b) => b.status === 'Pending');
  const confirmedBookings = vendorBookings.filter((b) => b.status === 'Confirmed');

  // Compute total earnings
  const totalEarned = vendorBookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
            <span>✨ Storefront Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome, {currentVendor.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track client inquiries, accepted gigs, escrow disbursements, and monthly performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/vendor/services"
            className="px-4 py-2 rounded-xl bg-accent-gradient hover:opacity-95 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Manage Services</span>
          </Link>
          <Link
            to="/vendor/calendar"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            Calendar
          </Link>
        </div>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Net Contract Volume"
          value={`$${totalEarned.toLocaleString()}`}
          trend="+22.5%"
          trendPositive={true}
          period="vs last month"
          icon={DollarSign}
          variant="gradient-amber"
        />
        <StatCard
          title="Pending Booking Requests"
          value={pendingRequests.length}
          trend={pendingRequests.length > 0 ? 'Requires action' : 'All clear'}
          trendPositive={pendingRequests.length === 0}
          period="In queue"
          icon={FileCheck2}
          variant="default"
        />
        <StatCard
          title="Upcoming Confirmed Gigs"
          value={confirmedBookings.length}
          trend="+3 new this month"
          trendPositive={true}
          period="Next: Dec 18"
          icon={CalendarCheck}
          variant="default"
        />
        <StatCard
          title="Client Rating"
          value={`${currentVendor.rating} ★`}
          trend={`${currentVendor.reviewCount} Reviews`}
          trendPositive={true}
          period="Top 1% in Category"
          icon={Star}
          variant="default"
        />
      </div>

      {/* CHART ROW: REVENUE TREND & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Earnings Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Earnings Velocity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Disbursed funds received through Eventora escrow guarantee
              </p>
            </div>
            <Link
              to="/vendor/earnings"
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              <span>Full Statements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendorMonthlyEarnings}>
                <defs>
                  <linearGradient id="vendorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Monthly Net']}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#vendorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Shortcuts & Profile Health */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Storefront Health
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Your profile is verified and visible to 14,000+ monthly host planners.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-slate-800 dark:text-white">{currentVendor.category}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Listed Packages:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {(currentVendor.services || []).length} Packages
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">City Base:</span>
                <span className="font-bold text-slate-800 dark:text-white">{currentVendor.city}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Response Rate:</span>
                <span className="font-bold text-emerald-600">100% (under 2 hours)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <Link
              to="/vendor/requests"
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-between transition-colors"
            >
              <span>Review Inquiries ({pendingRequests.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/vendor/profile"
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span>Edit Storefront Bio & Photos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* UPCOMING BOOKINGS LIST */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming Booked Celebrations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Scheduled event dates confirmed in your master calendar
            </p>
          </div>

          <Link
            to="/vendor/calendar"
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            Open Interactive Calendar →
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {vendorBookings.length > 0 ? (
            vendorBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase">
                      {b.date ? new Date(b.date).toLocaleString('default', { month: 'short' }) : 'DEC'}
                    </span>
                    <span className="text-base font-black leading-tight">
                      {b.date ? new Date(b.date).getDate() : '18'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {b.eventTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client: <span className="font-semibold text-slate-700 dark:text-slate-300">{b.customerName}</span> • Package: {b.serviceTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                      ${b.amount?.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">{b.paymentStatus}</span>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No upcoming bookings at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

