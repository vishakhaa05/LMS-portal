import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Building2,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';

export const VendorProfile = () => {
  const { user } = useAuth();
  const { vendors, updateVendorProfile } = useData();
  const { addToast } = useToast();

  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  const [formData, setFormData] = useState({
    name: currentVendor.name || '',
    category: currentVendor.category || 'Photography & Film',
    city: currentVendor.city || '',
    phone: currentVendor.phone || '',
    email: currentVendor.email || '',
    startingPrice: currentVendor.startingPrice || 1000,
    bio: currentVendor.bio || '',
    banner: currentVendor.banner || '',
    image: currentVendor.image || '',
  });

  const [gallery, setGallery] = useState(currentVendor.gallery || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setGallery((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
    addToast({
      type: 'success',
      title: 'Image Added',
      message: 'New photo added to your public portfolio showcase.'
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    addToast({
      type: 'info',
      title: 'Photo Removed',
      message: 'Photo removed from portfolio.'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVendorProfile(currentVendor.id, {
      ...formData,
      gallery,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Business Profile & Media Showcase
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your storefront presentation, contact details, bio, and visual gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Banner & Logo Header Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="relative h-48 bg-slate-800">
            <img
              src={formData.banner || formData.image}
              alt="Storefront banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
                Public Header Banner
              </span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
            <div className="flex items-end gap-4">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
              />
              <div className="mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {formData.name}
                </h2>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {formData.category} • {formData.city}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-accent-gradient hover:opacity-95 text-white text-xs font-bold shadow-md shadow-amber-500/25 flex items-center gap-2 self-start sm:self-auto transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </div>

        {/* Core Business Information */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Company & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Brand / Studio Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Event Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                City / Service Metro
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Starting Package Price ($)
              </label>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Public Inquiry Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Inquiry Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Storefront Bio & Philosophy
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* IMAGE GALLERY UPLOAD & MANAGER */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Portfolio Photo Gallery ({gallery.length} Images)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                High-resolution photos showcasing past events, setup aesthetics, and craftsmanship.
              </p>
            </div>
          </div>

          {/* Quick Add Image URL input */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="url"
              placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Gallery</span>
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-2 rounded-xl bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                    title="Remove from Gallery"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-accent-gradient hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Publish All Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorProfile;

