import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ServiceCard from '../../components/common/ServiceCard';
import Modal from '../../components/common/Modal';
import {
  Star,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Share2,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Clock
} from 'lucide-react';

export const VendorDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const shouldOpenBook = searchParams.get('book') === 'true';

  const { vendors, events, bookVendor } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const vendor = vendors.find((v) => v.id === id) || vendors[0];

  const [selectedPackage, setSelectedPackage] = useState(
    vendor.services && vendor.services.length > 0 ? vendor.services[0] : null
  );
  const [isBookModalOpen, setIsBookModalOpen] = useState(shouldOpenBook);
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    eventId: events.length > 0 ? events[0].id : '',
    eventTitle: events.length > 0 ? events[0].title : '',
    date: '2026-12-18',
    guests: 150,
    message: 'We are very excited about your portfolio and would love to contract this package for our celebration.',
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      addToast({
        type: 'error',
        title: 'Package Required',
        message: 'Please choose an offered service package before booking.'
      });
      return;
    }

    const payload = {
      eventId: bookingForm.eventId,
      eventTitle: bookingForm.eventTitle || 'Personal Event Celebration',
      customerId: user?.id || 'usr-3',
      customerName: user?.name || 'Sophia Miller',
      vendorId: vendor.id,
      vendorName: vendor.name,
      serviceTitle: selectedPackage.title,
      date: bookingForm.date,
      amount: selectedPackage.price,
      deposit: Math.round(selectedPackage.price * 0.3),
      message: bookingForm.message,
    };

    bookVendor(payload);
    setIsBookModalOpen(false);
    navigate('/customer/my-bookings');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/customer/browse')} className="hover:text-slate-800 dark:hover:text-white">
            Vendors
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">{vendor.category}</span>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white truncate">{vendor.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              addToast({ type: 'info', title: 'Link Copied', message: 'Shareable vendor URL copied to clipboard.' });
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </button>
        </div>
      </div>

      {/* PHOTO GALLERY SHOWCASE (Mosaic Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-sm">
        {/* Main Big Photo */}
        <div
          onClick={() => setSelectedImageModal(vendor.banner || vendor.image)}
          className="md:col-span-2 md:row-span-2 aspect-16/10 md:aspect-auto h-[320px] md:h-[420px] relative overflow-hidden cursor-pointer group bg-slate-900"
        >
          <img
            src={vendor.banner || vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-600/90 backdrop-blur-md">
              Featured Showcase
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">{vendor.name}</h2>
          </div>
        </div>

        {/* Small Gallery Photos */}
        {(vendor.gallery && vendor.gallery.length > 0
          ? vendor.gallery
          : [
              vendor.image,
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
            ]
        )
          .slice(0, 4)
          .map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageModal(imgUrl)}
              className="aspect-4/3 h-[155px] md:h-[204px] relative overflow-hidden cursor-pointer group bg-slate-800"
            >
              <img
                src={imgUrl}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
      </div>

      {/* VENDOR HEADER & STATS BAR */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
              {vendor.category}
            </span>
            {vendor.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Verified Partner
              </span>
            )}
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {vendor.city}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {vendor.name}
          </h1>

          <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1 text-slate-800 dark:text-white">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold">{vendor.rating}</span>
              <span className="text-slate-400 font-normal">({vendor.reviewCount} client reviews)</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Fast 2-hour response
            </span>
          </div>
        </div>

        {/* Starting Envelope & Book Button */}
        <div className="flex items-center gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Starting from
            </span>
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              ${vendor.startingPrice?.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-102"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TWO COLUMN CONTENT: ABOUT & SERVICES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: About & Services Packages */}
        <div className="lg:col-span-2 space-y-10">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              About {vendor.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {vendor.bio}
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Experience</span>
                <span className="font-bold text-slate-900 dark:text-white">8+ Years Active</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Insurance</span>
                <span className="font-bold text-emerald-600">Full Liability Covered</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Payment Terms</span>
                <span className="font-bold text-slate-900 dark:text-white">30% Escrow Deposit</span>
              </div>
            </div>
          </div>

          {/* Services & Packages Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Available Service Packages
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a transparent package to customize deliverables for your celebration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(vendor.services || []).map((srv) => (
                <ServiceCard
                  key={srv.id}
                  service={srv}
                  isVendorView={false}
                  isSelected={selectedPackage?.id === srv.id}
                  onSelect={(s) => {
                    setSelectedPackage(s);
                    setIsBookModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Reviews & Testimonials Section */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Client Reviews & Ratings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified reviews from hosts who orchestrated events with this vendor
                </p>
              </div>
              <div className="flex items-center gap-1 text-base font-bold text-slate-900 dark:text-white">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{vendor.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              {(vendor.reviews && vendor.reviews.length > 0
                ? vendor.reviews
                : [
                    {
                      id: 'rev-def-1',
                      author: 'Elena Rostova',
                      rating: 5,
                      date: '2026-10-14',
                      comment: 'Unbelievable execution! Everything was delivered flawlessly according to contract.'
                    },
                    {
                      id: 'rev-def-2',
                      author: 'Marcus Sterling',
                      rating: 5,
                      date: '2026-09-22',
                      comment: 'Highest recommendation. Arrived early, set up silently, and blew away our audience.'
                    }
                  ]
              ).map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Booking Sidebar Card */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
                Direct Reservation
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Reserve Your Date
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your payment is held safely in escrow until you verify services on event day.
              </p>
            </div>

            {selectedPackage ? (
              <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-brand-700 dark:text-brand-300">
                  Selected Package
                </span>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {selectedPackage.title}
                  </h4>
                  <span className="text-lg font-black text-brand-700 dark:text-brand-400">
                    ${selectedPackage.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Select a package from the left to book.</p>
            )}

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Escrow Protection Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Free cancellation up to 30 days prior</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <span>Proceed to Booking Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title={`Book ${vendor.name}`}
        subtitle={`Package: ${selectedPackage?.title || 'Custom Inquiries'}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Select Your Planned Event
            </label>
            <select
              value={bookingForm.eventId}
              onChange={(e) => {
                const found = events.find((ev) => ev.id === e.target.value);
                setBookingForm({
                  ...bookingForm,
                  eventId: e.target.value,
                  eventTitle: found?.title || 'Celebration',
                  date: found?.date || bookingForm.date,
                });
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.date})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Target Event Date
              </label>
              <input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Estimated Guests
              </label>
              <input
                type="number"
                value={bookingForm.guests}
                onChange={(e) => setBookingForm({ ...bookingForm, guests: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Special Requests or Inquiries
            </label>
            <textarea
              rows={3}
              value={bookingForm.message}
              onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>Total Package Cost:</span>
              <span>${selectedPackage?.price?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-600">
              <span>Escrow Deposit (30%):</span>
              <span>${Math.round((selectedPackage?.price || 0) * 0.3).toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-1.5"
            >
              <span>Submit Booking Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Modal>

      {/* Photo Lightbox Modal */}
      <Modal
        isOpen={!!selectedImageModal}
        onClose={() => setSelectedImageModal(null)}
        title="Portfolio Preview"
        maxWidth="max-w-3xl"
      >
        {selectedImageModal && (
          <img
            src={selectedImageModal}
            alt="Expanded showcase"
            className="w-full h-auto rounded-2xl max-h-[70vh] object-contain mx-auto"
          />
        )}
      </Modal>
    </div>
  );
};

export default VendorDetail;

