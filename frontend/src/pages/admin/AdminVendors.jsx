import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Drawer from '../../components/common/Drawer';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import {
  Check,
  X,
  Ban,
  Eye,
  Star,
  Plus,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const AdminVendors = () => {
  const { vendors, categories, approveVendor, rejectVendor, blockVendor } = useData();

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    action: null
  });

  const columns = [
    {
      header: 'Vendor / Business',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 dark:text-white">{row.name}</span>
              {row.verified && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Verified" />
              )}
            </div>
            <span className="text-[11px] text-slate-400 block">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: true,
      cell: (row) => (
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {row.category}
        </span>
      )
    },
    {
      header: 'Location',
      accessor: 'city',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400" />
          {row.city}
        </span>
      )
    },
    {
      header: 'Rating',
      accessor: 'rating',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{row.rating}</span>
          <span className="text-[11px] text-slate-400 font-normal">({row.reviewCount})</span>
        </div>
      )
    },
    {
      header: 'Base Price',
      accessor: 'startingPrice',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-slate-900 dark:text-white">
          ${row.startingPrice?.toLocaleString()}
        </span>
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
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedVendor(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {row.status === 'Pending' ? (
            <>
              <button
                onClick={() => approveVendor(row.id)}
                className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                title="Approve Vendor"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => rejectVendor(row.id)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                title="Reject Vendor"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const isSuspended = row.status === 'Suspended';
                setConfirmDialog({
                  isOpen: true,
                  title: isSuspended ? 'Reactivate Vendor' : 'Suspend Vendor Access',
                  message: `Are you sure you want to ${isSuspended ? 'reactivate' : 'suspend'} "${row.name}"?`,
                  variant: isSuspended ? 'success' : 'danger',
                  action: () => blockVendor(row.id)
                });
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                row.status === 'Suspended'
                  ? 'text-emerald-600 hover:bg-emerald-50'
                  : 'text-amber-600 hover:bg-amber-50'
              }`}
              title={row.status === 'Suspended' ? 'Unblock' : 'Suspend'}
            >
              <Ban className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Suspended', value: 'Suspended' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Vendor Directory & Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search, filter, inspect and approve verified service providers across all event verticals.
          </p>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        title="All Registered Vendors"
        subtitle={`${vendors.length} vendors in database`}
        columns={columns}
        data={vendors}
        filterKey="status"
        filterOptions={filterOptions}
        searchPlaceholder="Filter by name, category, city..."
      />

      {/* VENDOR DETAIL DRAWER */}
      <Drawer
        isOpen={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        title={selectedVendor?.name || 'Vendor Profile'}
        subtitle={`Category: ${selectedVendor?.category} • ${selectedVendor?.city}`}
        width="max-w-xl"
      >
        {selectedVendor && (
          <div className="space-y-6">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedVendor.banner || selectedVendor.image}
                alt={selectedVendor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <StatusBadge status={selectedVendor.status} />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Executive Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedVendor.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div>
                <span className="text-slate-400 block">Contact Phone:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedVendor.phone}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Direct Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedVendor.email}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Review Score:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ⭐ {selectedVendor.rating} ({selectedVendor.reviewCount} verified reviews)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Starting Envelope:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${selectedVendor.startingPrice?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Services List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Offered Service Packages ({(selectedVendor.services || []).length})
              </h4>
              <div className="space-y-2.5">
                {(selectedVendor.services || []).map((srv) => (
                  <div
                    key={srv.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                      <span className="text-slate-900 dark:text-white">{srv.title}</span>
                      <span className="text-brand-600 dark:text-brand-400">
                        ${srv.price?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{srv.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              {selectedVendor.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => {
                      approveVendor(selectedVendor.id);
                      setSelectedVendor(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Application</span>
                  </button>
                  <button
                    onClick={() => {
                      rejectVendor(selectedVendor.id);
                      setSelectedVendor(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Application</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    blockVendor(selectedVendor.id);
                    setSelectedVendor(null);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                    selectedVendor.status === 'Suspended'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {selectedVendor.status === 'Suspended' ? 'Reactivate Vendor Access' : 'Suspend Vendor'}
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={() => confirmDialog.action && confirmDialog.action()}
        title={confirmDialog.title}
        message={confirmDialog.message}
        variant={confirmDialog.variant}
      />
    </div>
  );
};

export default AdminVendors;

