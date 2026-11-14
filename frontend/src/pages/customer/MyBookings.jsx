import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import {
  FileCheck2,
  Calendar,
  Store,
  DollarSign,
  Download,
  Eye,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const MyBookings = () => {
  const { user } = useAuth();
  const { bookings } = useData();
  const { addToast } = useToast();

  const myBookings = bookings.filter(
    (b) => b.customerId === user?.id || b.customerName === user?.name || user?.role === 'customer'
  );

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = myBookings.filter((b) => {
    if (activeFilter === 'all') return true;
    return b.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleDownloadReceipt = (bookingId) => {
    addToast({
      type: 'success',
      title: 'Booking Receipt Downloaded',
      message: `Official receipt #${bookingId} has been saved to your downloads.`
    });
  };

  const handleContactVendor = (vendorName) => {
    addToast({
      type: 'info',
      title: 'Direct Vendor Messenger',
      message: `A secure direct chat channel with "${vendorName}" has been opened.`
    });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Vendor Bookings & Escrow Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review status updates, deposit states, scheduled performance dates, and vendor communications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200 dark:border-slate-800">
          {['all', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                activeFilter === f
                  ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Cards Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Booking #{b.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={b.status} />
                    <StatusBadge status={b.paymentStatus} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    {b.eventTitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {b.vendorName}
                  </h3>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mt-1">
                    {b.serviceTitle}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Event Date</span>
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      {b.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Total Package</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${b.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {b.message && (
                  <p className="text-xs text-slate-500 italic mt-3 line-clamp-2">
                    "{b.message}"
                  </p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleContactVendor(b.vendorName)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                  <span>Message Vendor</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDownloadReceipt(b.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold transition-colors"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileCheck2}
          title="No bookings in this category"
          description="Browse vendors to secure services for your upcoming celebration."
          actionText="Browse Vendors Directory"
          onAction={() => (window.location.href = '/customer/browse')}
        />
      )}

      {/* Booking Receipt Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Official Escrow Booking Voucher"
        subtitle={`Voucher ID: ${selectedBooking?.id}`}
        maxWidth="max-w-md"
      >
        {selectedBooking && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-slate-800/60 border border-brand-200/60 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-700 dark:text-brand-300">
                  Escrow Guaranteed
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={selectedBooking.status} />
                  <StatusBadge status={selectedBooking.paymentStatus} />
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Voucher Total
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  ${selectedBooking.amount?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Celebration:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedBooking.eventTitle}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Contracted Vendor:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedBooking.vendorName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Package Deliverable:</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {selectedBooking.serviceTitle}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Performance Date:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedBooking.date}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleDownloadReceipt(selectedBooking.id)}
              className="w-full py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice & Receipt</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyBookings;

