import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { Calendar, MapPin, DollarSign, Users, Eye, CheckCircle2, FileText } from 'lucide-react';

export const AdminEvents = () => {
  const { events } = useData();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const columns = [
    {
      header: 'Event Name & Type',
      accessor: 'title',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.title}</span>
          <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
            {row.type}
          </span>
        </div>
      )
    },
    {
      header: 'Host / Customer',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
            {row.customerName}
          </span>
          <span className="text-[11px] text-slate-400">{row.customerEmail}</span>
        </div>
      )
    },
    {
      header: 'Event Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {row.date} ({row.time || 'TBD'})
        </span>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      cell: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[180px]">
          {row.location}
        </span>
      )
    },
    {
      header: 'Budget',
      accessor: 'budget',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-slate-900 dark:text-white">
          ${row.budget?.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Progress',
      accessor: 'progress',
      cell: (row) => (
        <div className="w-24">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
            <span>{row.progress || 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full"
              style={{ width: `${row.progress || 0}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <button
          onClick={() => setSelectedEvent(row)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
          title="View Event Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  const filterOptions = [
    { label: 'All Events', value: 'all' },
    { label: 'Planning', value: 'Planning' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Completed', value: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Events Master Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            View active celebrations, budget envelopes, booking statuses, and itinerary milestones.
          </p>
        </div>
      </div>

      <DataTable
        title="All Events on Eventora"
        subtitle={`${events.length} tracked events`}
        columns={columns}
        data={events}
        filterKey="status"
        filterOptions={filterOptions}
        searchPlaceholder="Filter events by title, host, city..."
      />

      {/* EVENT DETAILS MODAL */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Details'}
        subtitle={`ID: ${selectedEvent?.id} • Category: ${selectedEvent?.type}`}
        maxWidth="max-w-2xl"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-50/60 dark:bg-slate-800/60 border border-brand-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-brand-700 dark:text-brand-300 uppercase">
                  Planning Status
                </span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedEvent.status} />
                  <span className="text-xs text-slate-500">
                    ({selectedEvent.progress || 0}% vendors confirmed)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block uppercase font-bold">
                  Total Budget
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ${selectedEvent.budget?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-0.5">Date & Time</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedEvent.date} @ {selectedEvent.time || '18:00'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-0.5">Estimated Guests</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedEvent.guests || 100} Guests
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block mb-0.5">Host Contact</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {selectedEvent.customerName}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Venue Location
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                {selectedEvent.location}
              </p>
            </div>

            {/* Booked Vendors List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Contracted Vendors ({(selectedEvent.bookedVendors || []).length})
              </h4>
              <div className="space-y-2">
                {(selectedEvent.bookedVendors || []).length > 0 ? (
                  selectedEvent.bookedVendors.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {b.vendorName}
                        </span>
                        <span className="text-slate-400 text-[11px]">{b.service}</span>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="font-bold text-slate-900 dark:text-white">
                          ${b.amount?.toLocaleString()}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No vendors booked yet.</p>
                )}
              </div>
            </div>

            {selectedEvent.notes && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Special Notes & Dietary Instructions
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  {selectedEvent.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminEvents;

