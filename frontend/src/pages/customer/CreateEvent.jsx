import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HeartHandshake,
  Cake,
  Briefcase,
  Music,
  Camera,
  Utensils
} from 'lucide-react';

export const CreateEvent = () => {
  const { categories, createEvent } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Wedding',
    date: '2027-02-14',
    time: '17:00',
    location: '',
    budget: 25000,
    guests: 150,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Please provide a celebration title';
      if (!formData.type) errs.type = 'Please pick an event category';
    } else if (step === 2) {
      if (!formData.date) errs.date = 'Event date is required';
      if (!formData.location.trim()) errs.location = 'Venue or city location is required';
    } else if (step === 3) {
      if (!formData.budget || formData.budget < 500) errs.budget = 'Please enter a valid budget';
      if (!formData.guests || formData.guests < 1) errs.guests = 'Guest count must be at least 1';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    createEvent({
      ...formData,
      customerId: user?.id || 'usr-3',
      customerName: user?.name || 'Sophia Miller',
      customerEmail: user?.email || 'sophia@example.com',
      customerPhone: user?.phone || '+1 (555) 301-8842',
    });

    navigate('/customer/my-events');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Event Conception Wizard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Plan Your Next Grand Event
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Tell us about your celebration vision and we'll match you with curated vendors.
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { step: 1, label: 'Type & Title' },
            { step: 2, label: 'Date & Venue' },
            { step: 3, label: 'Budget & Guests' },
            { step: 4, label: 'Review & Launch' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                  currentStep >= item.step
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {currentStep > item.step ? <CheckCircle2 className="w-4 h-4" /> : item.step}
              </div>
              <span
                className={`text-[11px] font-semibold hidden sm:block ${
                  currentStep >= item.step
                    ? 'text-brand-700 dark:text-brand-300'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Linear Bar */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-brand-gradient transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Multi-Step Form Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl transition-all">
        {/* STEP 1: TYPE & TITLE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Step 1: What are you celebrating?
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Event Title / Working Name
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Liam & Chloe's Coastal Wedding"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-semibold"
              />
              {errors.title && (
                <p className="text-xs text-rose-500 font-semibold mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Select Event Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setFormData({ ...formData, type: c.name })}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      formData.type === c.name
                        ? 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {c.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & VENUE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Step 2: Date & Geographic Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-rose-500 font-semibold mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Venue Location or Destination City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Napa Valley Wine Estate, California"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>
              {errors.location && (
                <p className="text-xs text-rose-500 font-semibold mt-1">{errors.location}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET & GUESTS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Step 3: Budget Envelope & Attendance
            </h3>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Total Budget Envelope ($)
                </label>
                <span className="text-xl font-black text-brand-600">
                  ${Number(formData.budget).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="150000"
                step="1000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full accent-brand-600 cursor-pointer mb-2"
              />
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              {errors.budget && (
                <p className="text-xs text-rose-500 font-semibold mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Estimated Guest Count
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="5"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>
              {errors.guests && (
                <p className="text-xs text-rose-500 font-semibold mt-1">{errors.guests}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Style Notes, Colors & Dietary Requirements
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Bohemian rustic theme, organic catering, jazz band preference..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & LAUNCH */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Step 4: Review Celebration Summary
            </h3>

            <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-slate-800/60 border border-brand-200/60 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                    {formData.type}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {formData.title}
                  </h4>
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${formData.budget?.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                <div>
                  <span className="text-slate-400 block">Date & Time:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {formData.date} @ {formData.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {formData.location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Guests:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {formData.guests} Attendees
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Host:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {user?.name || 'Sophia Miller'}
                  </span>
                </div>
              </div>

              {formData.notes && (
                <div className="text-xs pt-2">
                  <span className="text-slate-400 block">Notes:</span>
                  <p className="text-slate-600 dark:text-slate-300 italic">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Stepper Controls */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-102"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-102"
            >
              <span>Launch Event & Browse Vendors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

