import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  DollarSign,
  TrendingUp,
  Download,
  CreditCard,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const VendorEarnings = () => {
  const { user } = useAuth();
  const { vendors, bookings, vendorMonthlyEarnings, vendorTransactions } = useData();
  const { addToast } = useToast();

  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id);

  const grossEarnings = vendorBookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const platformFee = Math.round(grossEarnings * 0.1);
  const netEarnings = grossEarnings - platformFee;
  const pendingEscrow = vendorBookings
    .filter((b) => b.status === 'Pending')
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const handleDownloadInvoice = (txnId) => {
    addToast({
      type: 'success',
      title: 'Disbursement Receipt Exported',
      message: `Receipt #${txnId} PDF has been downloaded.`
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Financial Statements & Payouts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Transparent breakdown of gross contracts, platform facilitation fees, and automated Stripe deposits.
        </p>
      </div>

      {/* 4 SUMMARY FINANCIAL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Gross Bookings"
          value={`$${grossEarnings.toLocaleString()}`}
          trend="+18.4%"
          trendPositive={true}
          period="Total contracted"
          icon={DollarSign}
          variant="gradient-amber"
        />
        <StatCard
          title="Platform Fee (10%)"
          value={`$${platformFee.toLocaleString()}`}
          period="Facilitation & Insurance"
          icon={CreditCard}
          variant="default"
        />
        <StatCard
          title="Net Disbursed to Bank"
          value={`$${netEarnings.toLocaleString()}`}
          trend="Next deposit: Friday"
          trendPositive={true}
          period="Direct ACH"
          icon={CheckCircle2}
          variant="default"
        />
        <StatCard
          title="Pending in Escrow"
          value={`$${pendingEscrow.toLocaleString()}`}
          period="Pending client completion"
          icon={Clock}
          variant="default"
        />
      </div>

      {/* MONTHLY REVENUE BAR CHART */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Payout Volume History (H2 2026)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Net revenue transferred to your registered business bank account
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            100% Payout Success Rate
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorMonthlyEarnings}>
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
                formatter={(val) => [`$${val.toLocaleString()}`, 'Net Transferred']}
              />
              <Bar dataKey="amount" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TRANSACTION HISTORY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Itemized Payout History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed breakdown of past event disbursements and platform withholdings
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Event Reference</th>
                <th className="py-3.5 px-6">Gross Amount</th>
                <th className="py-3.5 px-6">Platform Fee (10%)</th>
                <th className="py-3.5 px-6">Net Deposited</th>
                <th className="py-3.5 px-6">Disbursement Status</th>
                <th className="py-3.5 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {vendorTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {t.id}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {t.date}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                    {t.event}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">
                    ${t.amount?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    -${t.fee?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-extrabold text-emerald-600">
                    ${t.net?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(t.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                      title="Download Invoice PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;

