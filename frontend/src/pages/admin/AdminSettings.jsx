import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Settings, Shield, Bell, DollarSign, User, Save, Key, Check } from 'lucide-react';

export const AdminSettings = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [platformSettings, setPlatformSettings] = useState({
    commissionRate: 10,
    escrowHoldHours: 48,
    currency: 'USD ($)',
    autoApproveVerified: false,
    emailAlerts: true,
    weeklyDigest: true,
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alexander Cross',
    email: user?.email || 'admin@eventora.com',
    role: 'Super Administrator',
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Platform configuration and commission rates have been updated.'
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Platform Governance & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure marketplace commission, payout buffers, escrow settings, and master administrative security.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Platform Monetization Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Marketplace Commission & Escrow Payouts
              </h3>
              <p className="text-xs text-slate-400">
                Determine revenue retention on completed vendor contracts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Platform Take Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={platformSettings.commissionRate}
                onChange={(e) =>
                  setPlatformSettings({ ...platformSettings, commissionRate: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard industry baseline: 10% - 15%
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Escrow Dispute Buffer (Hours)
              </label>
              <input
                type="number"
                min="0"
                value={platformSettings.escrowHoldHours}
                onChange={(e) =>
                  setPlatformSettings({ ...platformSettings, escrowHoldHours: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Hold period after event conclusion before auto-disbursing funds
              </span>
            </div>
          </div>
        </div>

        {/* Master Admin Profile */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Admin Profile & Identity
              </h3>
              <p className="text-xs text-slate-400">
                Primary credentials and system notification recipient
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* System Notifications & Alerts */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Notification Preferences
              </h3>
              <p className="text-xs text-slate-400">
                Choose alerts triggered by critical platform events
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  New Vendor Application Alerts
                </span>
                <span className="text-[11px] text-slate-400">
                  Notify admin whenever a new vendor applies for listing
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  Escrow Payment Disbursed Notices
                </span>
                <span className="text-[11px] text-slate-400">
                  Daily confirmation of automated stripe transfers to vendors
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

