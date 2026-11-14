import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Modal from '../../components/common/Modal';
import { Ban, CheckCircle, Eye, Shield, Calendar, Mail, Phone } from 'lucide-react';

export const AdminUsers = () => {
  const { users, toggleBlockUser } = useData();

  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    action: null
  });

  const columns = [
    {
      header: 'User Profile',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-[11px] text-slate-400">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Role',
      accessor: 'role',
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
            row.role === 'admin'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
              : row.role === 'vendor'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
          }`}
        >
          {row.role}
        </span>
      )
    },
    {
      header: 'Joined Date',
      accessor: 'joinedDate',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {row.joinedDate}
        </span>
      )
    },
    {
      header: 'Events Count',
      accessor: 'eventsCount',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {row.eventsCount || 0} Events
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
      cell: (row) => {
        const isBlocked = row.status === 'Blocked';
        return (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setSelectedUser(row)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Inspect User Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            {row.role !== 'admin' && (
              <button
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: isBlocked ? 'Unblock User' : 'Block User Account',
                    message: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} access for ${row.name}?`,
                    variant: isBlocked ? 'success' : 'danger',
                    action: () => toggleBlockUser(row.id)
                  });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  isBlocked
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/50'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50'
                }`}
              >
                {isBlocked ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                <span>{isBlocked ? 'Unblock' : 'Block'}</span>
              </button>
            )}
          </div>
        );
      }
    }
  ];

  const filterOptions = [
    { label: 'All Users', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Blocked', value: 'Blocked' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            User Account Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Oversee clients, coordinators, and vendor accounts with instant block and unblock controls.
          </p>
        </div>
      </div>

      <DataTable
        title="Registered Platform Users"
        subtitle={`${users.length} total user accounts`}
        columns={columns}
        data={users}
        filterKey="status"
        filterOptions={filterOptions}
        searchPlaceholder="Search by name, email, role..."
      />

      {/* User Details Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Account Details"
        subtitle={`ID: ${selectedUser?.id}`}
        maxWidth="max-w-md"
      >
        {selectedUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {selectedUser.name}
                </h4>
                <p className="text-xs text-slate-400">{selectedUser.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-100 text-brand-700">
                    {selectedUser.role}
                  </span>
                  <StatusBadge status={selectedUser.status} />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedUser.phone || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Member Since:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedUser.joinedDate}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Celebrations Created:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedUser.eventsCount || 0} Events
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

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

export default AdminUsers;

