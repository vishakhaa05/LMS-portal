import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';

export const VendorCalendar = () => {
  const { user } = useAuth();
  const { vendors, bookings, events } = useData();

  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  const vendorBookings = bookings.filter(
    (b) => b.vendorId === currentVendor.id && b.status === 'Confirmed'
  );

  const [currentDate, setCurrentDate] = useState(new Date(2026, 11, 1)); // Default December 2026
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  // Helper to find bookings for a specific day
  const getBookingsForDay = (dayNum) => {
    if (!dayNum) return [];
    const formattedDay = String(dayNum).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const targetDateStr = `${year}-${formattedMonth}-${formattedDay}`;

    return vendorBookings.filter((b) => b.date === targetDateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Schedule & Gigs Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visual month planner of confirmed bookings, rehearsals, and event execution dates.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-slate-900 dark:text-white min-w-[140px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Calendar Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800 text-center text-xs font-bold uppercase tracking-wider text-slate-400 py-3 bg-slate-50/60 dark:bg-slate-800/40">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800">
          {days.map((dayNum, idx) => {
            const dayBookings = getBookingsForDay(dayNum);
            const isToday = dayNum === 18 && month === 11; // Demo today marker

            return (
              <div
                key={idx}
                className={`min-h-[100px] sm:min-h-[120px] p-2 flex flex-col justify-between transition-colors ${
                  dayNum ? 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40' : 'bg-slate-50/30 dark:bg-slate-950/20'
                }`}
              >
                {dayNum ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                          isToday
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {dayNum}
                      </span>
                      {dayBookings.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </div>

                    {/* Bookings Badges */}
                    <div className="space-y-1 mt-1">
                      {dayBookings.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedEvent(b)}
                          className="w-full text-left p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800 text-[10px] font-bold text-amber-900 dark:text-amber-300 truncate shadow-2xs hover:scale-102 transition-transform"
                        >
                          🎉 {b.eventTitle}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.eventTitle || 'Scheduled Event'}
        subtitle={`Booking Ref #${selectedEvent?.id} • Execution Date: ${selectedEvent?.date}`}
        maxWidth="max-w-md"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60">
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400 block">
                Contract Package
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedEvent.serviceTitle}
              </h4>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  ${selectedEvent.amount?.toLocaleString()}
                </span>
                <StatusBadge status={selectedEvent.status} />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Host / Client:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {selectedEvent.customerName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Escrow Security:</span>
                <span className="font-semibold text-emerald-600">
                  {selectedEvent.paymentStatus}
                </span>
              </div>
            </div>

            {selectedEvent.message && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Customer Timeline Note
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl italic">
                  "{selectedEvent.message}"
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorCalendar;

