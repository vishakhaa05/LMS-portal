import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ServiceCard from '../../components/common/ServiceCard';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import { Plus, Package, Sparkles } from 'lucide-react';

export const VendorServices = () => {
  const { user } = useAuth();
  const { vendors, addService, updateService, deleteService } = useData();

  const currentVendor =
    vendors.find((v) => v.id === user?.vendorId || v.email === user?.email) || vendors[0];

  const services = currentVendor.services || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    unit: 'per event',
    description: '',
    featuresText: '',
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    serviceId: null,
    title: '',
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      price: '',
      unit: 'per event',
      description: '',
      featuresText: 'Dedicated Day-of Lead, All Equipment Included, Full Teardown & Logistics',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      price: srv.price,
      unit: srv.unit || 'per event',
      description: srv.description || '',
      featuresText: (srv.features || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price) return;

    const payload = {
      title: formData.title.trim(),
      price: Number(formData.price),
      unit: formData.unit,
      description: formData.description,
      features: formData.featuresText
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    if (editingService) {
      updateService(currentVendor.id, editingService.id, payload);
    } else {
      addService(currentVendor.id, payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Offered Service Packages & Pricing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create tier packages, hourly rates, and all-inclusive event bundles available for direct client booking.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-accent-gradient hover:opacity-95 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 self-start sm:self-auto transition-all hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service Package</span>
        </button>
      </div>

      {/* Services Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <ServiceCard
              key={srv.id}
              service={srv}
              isVendorView={true}
              onEdit={handleOpenEdit}
              onDelete={(s) =>
                setConfirmDialog({
                  isOpen: true,
                  serviceId: s.id,
                  title: s.title,
                })
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No service packages yet"
          description="Create your first package to allow clients to request quotes and book directly."
          actionText="Add First Package"
          onAction={handleOpenAdd}
        />
      )}

      {/* Add / Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Package' : 'Create New Service Package'}
        subtitle="Specify price, deliverables, and features included"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Service / Package Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Master Ceremony Audio & Lighting Rig"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="2500"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Pricing Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="per event">per event</option>
                <option value="per guest">per guest</option>
                <option value="per hour">per hour</option>
                <option value="per day">per day</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Service Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What makes this package exceptional? Outline gear, staffing, and deliverables."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Features (Comma separated)
            </label>
            <input
              type="text"
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
              placeholder="e.g. 8 Hours Coverage, 2 Lead Photographers, 4K Drone Footage"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Items will appear with green checkmarks on customer cards.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-accent-gradient hover:opacity-95 text-white text-xs font-bold shadow-md shadow-amber-500/25"
            >
              {editingService ? 'Save Changes' : 'Publish Package'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={() => deleteService(currentVendor.id, confirmDialog.serviceId)}
        title="Remove Service Package"
        message={`Are you sure you want to delete "${confirmDialog.title}"? Clients will no longer see this package option.`}
        variant="danger"
        confirmText="Delete Service"
      />
    </div>
  );
};

export default VendorServices;

