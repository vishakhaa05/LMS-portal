import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import {
  FileCheck2,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Check,
  X,
  MessageSquare,
  Mail,
  Phone
} from 'lucide-react';

export const VendorRequests = () => {
  const { user } = useAuth();
  const { vendors, bookings, events, respondToBooking } = useData();

  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id);

  const [activeFilter, setActiveFilter] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    action: null
  });

  const filteredRequests = vendorBookings.filter((b) => {
    if (activeFilter === 'all') return true;
    return b.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Client Booking Inquiries & Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review event requirements, guest estimates, proposed budgets, and accept or decline gigs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200 dark:border-slate-800">
          {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                activeFilter === f
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const correspondingEvent = events.find((e) => e.id === req.eventId);

            return (
              <div
                key={req.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Event & Customer Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{req.id}
                    </span>
                    <StatusBadge status={req.status} />
                    <span className="text-xs font-semibold text-slate-400">
                      Received {req.createdAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {req.eventTitle}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                      Requested Package: {req.serviceTitle}
                    </p>
                  </div>

                  {/* Details Badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {req.date}
                    </span>
                    {correspondingEvent?.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {correspondingEvent.location}
                      </span>
                    )}
                    {correspondingEvent?.guests && (
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {correspondingEvent.guests} Guests
                      </span>
                    )}
                  </div>

                  {/* Client Note */}
                  {req.message && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="italic leading-relaxed">"{req.message}"</p>
                    </div>
                  )}

                  {/* Customer Contact */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Host: <strong className="text-slate-700 dark:text-slate-300">{req.customerName}</strong></span>
                    {correspondingEvent?.customerPhone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {correspondingEvent.customerPhone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Value & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Contract Value
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      ${req.amount?.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      Escrow Deposit: ${req.deposit?.toLocaleString()}
                    </span>
                  </div>

                  {req.status === 'Pending' ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => respondToBooking(req.id, 'Confirmed')}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Gig</span>
                      </button>

                      <button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Decline Booking Request',
                            message: `Are you sure you want to decline "${req.eventTitle}"? The host will be notified to explore alternative vendors.`,
                            variant: 'danger',
                            action: () => respondToBooking(req.id, 'Cancelled')
                          });
                        }}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 text-xs font-bold transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Status: <strong className="text-slate-800 dark:text-slate-200">{req.status}</strong>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FileCheck2}
          title="No booking requests in this filter"
          description="Inquiries from event organizers will show up here as clients explore your services."
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={() => confirmDialog.action && confirmDialog.action()}
        title={confirmDialog.title}
        message={confirmDialog.message}
        variant={confirmDialog.variant}
        confirmText="Confirm Response"
      />
    </div>
  );
};

export default VendorRequests;

