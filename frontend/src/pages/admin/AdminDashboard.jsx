import React, { useState } from 'react';
import {
  Users,
  Store,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Check,
  X,
  ExternalLink,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Drawer from '../../components/common/Drawer';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const {
    users,
    vendors,
    events,
    bookings,
    monthlyBookingsData,
    eventsByTypeData,
    topVendorsChartData,
    activities,
    approveVendor,
    rejectVendor
  } = useData();

  const [selectedVendorForDrawer, setSelectedVendorForDrawer] = useState(null);

  // Compute live stats
  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const totalEvents = events.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

  // Pending vendor applications
  const pendingVendors = vendors.filter((v) => v.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Super Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time platform overview, marketplace metrics, vendor applications, and financial velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/vendors"
            className="px-4 py-2 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Manage Vendors</span>
          </Link>
        </div>
      </div>

      {/* 4 GRADIENT STAT CARDS WITH TREND ARROWS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Platform Users"
          value={totalUsers.toLocaleString()}
          trend="+18.4%"
          trendPositive={true}
          period="vs last month"
          icon={Users}
          variant="gradient-indigo"
        />
        <StatCard
          title="Onboarded Vendors"
          value={totalVendors.toLocaleString()}
          trend="+12.2%"
          trendPositive={true}
          period="vs last month"
          icon={Store}
          variant="gradient-purple"
        />
        <StatCard
          title="Total Events Planned"
          value={totalEvents.toLocaleString()}
          trend="+24.8%"
          trendPositive={true}
          period="vs last month"
          icon={CalendarDays}
          variant="gradient-amber"
        />
        <StatCard
          title="Gross Booking Volume"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="+31.5%"
          trendPositive={true}
          period="vs last month"
          icon={DollarSign}
          variant="gradient-emerald"
        />
      </div>

      {/* CHARTS ROW: LINE CHART & DONUT CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Bookings & Revenue Line/Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Bookings & Revenue Velocity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Gross transaction value and booking count progression over the last 6 months
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              +38% H2 Growth
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyBookingsData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBkg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6D28D9"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBkg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Events by Type */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Events by Category
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Proportional distribution of celebrations
            </p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventsByTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventsByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val, name) => [`${val}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {eventsByTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 truncate font-medium">{item.name}</span>
                <span className="ml-auto font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: TOP VENDORS BAR CHART & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Vendors Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Top Performing Vendors
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Top revenue generating vendor studios on Eventora
              </p>
            </div>
            <Link
              to="/admin/vendors"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topVendorsChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(v) => [`$${v.toLocaleString()}`, 'Total Revenue']}
                />
                <Bar dataKey="revenue" fill="#6D28D9" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Activity
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-snug">
                      {act.text}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/admin/events"
              className="text-xs font-semibold text-center block text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Inspect Event Logs →
            </Link>
          </div>
        </div>
      </div>

      {/* PENDING VENDOR APPROVALS TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pending Vendor Approvals
              </h3>
              {pendingVendors.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                  {pendingVendors.length} Action Needed
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Review new vendor applications before they appear in public search results.
            </p>
          </div>

          <Link
            to="/admin/vendors"
            className="text-xs font-semibold text-brand-600 hover:underline self-start sm:self-auto"
          >
            Go to Vendor Directory →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Vendor Name</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Starting Price</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {pendingVendors.length > 0 ? (
                pendingVendors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{v.name}</p>
                          <p className="text-[11px] text-slate-400">{v.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">
                      {v.category}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {v.city}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      ${v.startingPrice?.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={v.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedVendorForDrawer(v)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                          title="Inspect application"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => approveVendor(v.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => rejectVendor(v.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 text-xs font-bold"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                    No pending vendor approvals at this time. All vendors are reviewed! 🎉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VENDOR DETAIL DRAWER */}
      <Drawer
        isOpen={!!selectedVendorForDrawer}
        onClose={() => setSelectedVendorForDrawer(null)}
        title={selectedVendorForDrawer?.name || 'Vendor Profile'}
        subtitle={`Category: ${selectedVendorForDrawer?.category} • ${selectedVendorForDrawer?.city}`}
      >
        {selectedVendorForDrawer && (
          <div className="space-y-6">
            <img
              src={selectedVendorForDrawer.image}
              alt={selectedVendorForDrawer.name}
              className="w-full h-48 rounded-2xl object-cover shadow-sm"
            />

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                About Business
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedVendorForDrawer.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedVendorForDrawer.phone}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedVendorForDrawer.email}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Offered Packages
              </h4>
              <div className="space-y-2">
                {(selectedVendorForDrawer.services || []).map((srv) => (
                  <div key={srv.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{srv.title}</span>
                      <span className="text-brand-600">${srv.price}</span>
                    </div>
                    <p className="text-slate-500 mt-1">{srv.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  approveVendor(selectedVendorForDrawer.id);
                  setSelectedVendorForDrawer(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Approve Vendor
              </button>
              <button
                onClick={() => {
                  rejectVendor(selectedVendorForDrawer.id);
                  setSelectedVendorForDrawer(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Reject Application
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminDashboard;

