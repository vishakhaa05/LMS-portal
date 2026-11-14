import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { FileCheck, DollarSign, Calendar, Eye, Download, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminBookings = () => {
  const { bookings, respondToBooking } = useData();
  const { addToast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const columns = [
    {
      header: 'Booking ID',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
          #{row.id}
        </span>
      )
    },
    {
      header: 'Event Title',
      accessor: 'eventTitle',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block line-clamp-1">
            {row.eventTitle}
          </span>
          <span className="text-[11px] text-slate-400">By {row.customerName}</span>
        </div>
      )
    },
    {
      header: 'Contracted Vendor',
      accessor: 'vendorName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
            {row.vendorName}
          </span>
          <span className="text-[11px] text-slate-400">{row.serviceTitle}</span>
        </div>
      )
    },
    {
      header: 'Event Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {row.date}
        </span>
      )
    },
    {
      header: 'Total Value',
      accessor: 'amount',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-slate-900 dark:text-white">
          ${row.amount?.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Payment State',
      accessor: 'paymentStatus',
      sortable: true,
      cell: (row) => <StatusBadge status={row.paymentStatus} />
    },
    {
      header: 'Booking Status',
      accessor: 'status',
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <button
          onClick={() => setSelectedBooking(row)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
          title="Inspect Invoice & Receipt"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  const filterOptions = [
    { label: 'All Bookings', value: 'all' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' },
  ];

  const handleDownloadInvoice = () => {
    addToast({
      type: 'success',
      title: 'Invoice Downloaded',
      message: `Invoice #${selectedBooking?.id} PDF has been generated.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Bookings & Escrow Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track client reservations, milestone payouts, deposit states, and service fulfillment.
          </p>
        </div>
      </div>

      <DataTable
        title="All Platform Bookings"
        subtitle={`${bookings.length} reservations on file`}
        columns={columns}
        data={bookings}
        filterKey="status"
        filterOptions={filterOptions}
        searchPlaceholder="Search by ID, event title, vendor, customer..."
      />

      {/* BOOKING DETAILS MODAL */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Booking Record #${selectedBooking?.id}`}
        subtitle="Escrow-protected transaction details"
        maxWidth="max-w-lg"
      >
        {selectedBooking && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block">
                  Contract Status
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={selectedBooking.status} />
                  <StatusBadge status={selectedBooking.paymentStatus} />
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold uppercase text-slate-400 block">
                  Total Contract
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ${selectedBooking.amount?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Event:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedBooking.eventTitle}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Host Customer:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {selectedBooking.customerName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Assigned Vendor:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {selectedBooking.vendorName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Package Title:</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {selectedBooking.serviceTitle}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Execution Date:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {selectedBooking.date}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Deposit Secured:</span>
                <span className="font-bold text-emerald-600">
                  ${selectedBooking.deposit?.toLocaleString() || '0'}
                </span>
              </div>
            </div>

            {selectedBooking.message && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Client Request Notes
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  {selectedBooking.message}
                </p>
              </div>
            )}

            <button
              onClick={handleDownloadInvoice}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Official Invoice PDF</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminBookings;

