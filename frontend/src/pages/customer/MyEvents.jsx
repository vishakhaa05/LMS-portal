import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import Drawer from '../../components/common/Drawer';
import {
  Calendar,
  PlusCircle,
  MapPin,
  DollarSign,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ListTodo,
  CheckSquare,
  Square
} from 'lucide-react';

export const MyEvents = () => {
  const { user } = useAuth();
  const { events } = useData();

  // Find events belonging to current user or show initial customer events
  const myEvents = events.filter(
    (e) => e.customerId === user?.id || e.customerEmail === user?.email || user?.role === 'customer'
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [eventChecklists, setEventChecklists] = useState({
    'evt-101': [
      { id: 1, text: 'Confirm Grand Ballroom banquet buyout contract', done: true },
      { id: 2, text: 'Lock in full-day cinematography & drone schedule', done: true },
      { id: 3, text: 'Tasting appointment for 5-course plated dinner', done: true },
      { id: 4, text: 'Select floral arch & table centerpieces with florist', done: false },
      { id: 5, text: 'Send formal invitation RSVPs & dietary options', done: false },
      { id: 6, text: 'Final balance disbursement via escrow release', done: false },
    ],
    'evt-102': [
      { id: 1, text: 'Contract convention center keynote stage', done: true },
      { id: 2, text: 'Schedule Lumina Lens multi-cam conference crew', done: true },
      { id: 3, text: 'Select grazing station banquet menu', done: true },
      { id: 4, text: 'Publish attendee schedule and livestream links', done: false },
    ],
  });

  const toggleChecklistItem = (eventId, itemId) => {
    setEventChecklists((prev) => {
      const list = prev[eventId] || [
        { id: 1, text: 'Reserve event venue', done: true },
        { id: 2, text: 'Contract key vendors', done: false },
        { id: 3, text: 'Finalize RSVP list', done: false },
      ];
      return {
        ...prev,
        [eventId]: list.map((item) =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      };
    });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Celebrations & Planning Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track planning milestones, booked vendor contracts, budget allocation, and guest counts.
          </p>
        </div>

        <Link
          to="/customer/create-event"
          className="px-5 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-2 self-start sm:self-auto transition-all hover:scale-102"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Plan New Event</span>
        </Link>
      </div>

      {/* Events List */}
      {myEvents.length > 0 ? (
        <div className="space-y-6">
          {myEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                      {ev.type}
                    </span>
                    <StatusBadge status={ev.status} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {ev.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-brand-600" />
                      {ev.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {ev.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      {ev.guests || 100} Guests
                    </span>
                  </div>
                </div>

                {/* Budget Stat */}
                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Total Event Budget
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    ${ev.budget?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    Planning Progress Tracker
                  </span>
                  <span className="text-brand-600 dark:text-brand-400">
                    {ev.progress || 35}% Complete ({(ev.bookedVendors || []).length} Vendors Contracted)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gradient transition-all duration-500 rounded-full"
                    style={{ width: `${ev.progress || 35}%` }}
                  />
                </div>
              </div>

              {/* Booked Vendors Preview & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Contracted:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {(ev.bookedVendors || []).length > 0 ? (
                      ev.bookedVendors.map((b, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {b.vendorName}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No vendors booked yet</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEvent(ev)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    View Details
                  </button>
                  <Link
                    to={`/customer/browse?cat=${ev.categorySlug || 'wedding'}`}
                    className="px-4 py-2 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <span>Browse More Vendors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No events in planning yet"
          description="Start planning your dream wedding, gala, or birthday party with Eventora's smart wizard."
          actionText="Create First Event"
          onAction={() => (window.location.href = '/customer/create-event')}
        />
      )}

      {/* EVENT DETAILS DRAWER */}
      <Drawer
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Itinerary'}
        subtitle={`Category: ${selectedEvent?.type} • Date: ${selectedEvent?.date}`}
        width="max-w-xl"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-slate-800/60 border border-brand-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="uppercase text-brand-700 dark:text-brand-300">Total Budget</span>
                <span className="text-lg text-slate-900 dark:text-white">
                  ${selectedEvent.budget?.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gradient rounded-full"
                  style={{ width: `${selectedEvent.progress || 35}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {selectedEvent.progress || 35}% of vendors booked and confirmed.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Execution Date:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedEvent.date} @ {selectedEvent.time || '18:00'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Location:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedEvent.location}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Guest Count:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedEvent.guests} Guests
                </span>
              </div>
            </div>

            {/* Booked Vendors Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Contracted Vendors & Gigs ({(selectedEvent.bookedVendors || []).length})
              </h4>
              <div className="space-y-2">
                {(selectedEvent.bookedVendors || []).length > 0 ? (
                  selectedEvent.bookedVendors.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {b.vendorName}
                        </span>
                        <span className="text-slate-400 text-[11px]">{b.service}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 dark:text-white block">
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

            {/* Planning Milestone Checklist */}
            {(() => {
              const currentList = eventChecklists[selectedEvent.id] || [
                { id: 1, text: 'Confirm event venue and deposit', done: true },
                { id: 2, text: 'Contract key service vendors', done: (selectedEvent.bookedVendors || []).length > 0 },
                { id: 3, text: 'Send invitations & collect RSVPs', done: false },
                { id: 4, text: 'Finalize music, entry timeline & schedule', done: false },
              ];
              const completedCount = currentList.filter((item) => item.done).length;
              const percentDone = Math.round((completedCount / currentList.length) * 100);

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ListTodo className="w-3.5 h-3.5 text-brand-600" />
                      <span>Planning Milestones Checklist</span>
                    </h4>
                    <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
                      {completedCount} / {currentList.length} Done ({percentDone}%)
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${percentDone}%` }}
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {currentList.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleChecklistItem(selectedEvent.id, item.id)}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all ${
                          item.done
                            ? 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-300'
                        }`}
                      >
                        {item.done ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className="flex-1 font-medium">{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {selectedEvent.notes && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Design Notes
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  {selectedEvent.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MyEvents;

