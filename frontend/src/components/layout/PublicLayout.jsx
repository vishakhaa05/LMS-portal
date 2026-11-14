import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { Sparkles, Heart, Mail, ArrowRight, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col transition-colors">
      <Navbar isDashboard={false} />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Rich Public Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                  Eventora
                </span>
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                The modern orchestration platform for memorable events. Seamlessly connecting event hosts with world-class venues, caterers, photographers, and entertainment artisans.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#twitter" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#instagram" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#linkedin" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#github" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Celebrations
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/customer/browse?cat=wedding" className="hover:text-white transition-colors">Bespoke Weddings</Link></li>
                <li><Link to="/customer/browse?cat=corporate" className="hover:text-white transition-colors">Tech & Business Summits</Link></li>
                <li><Link to="/customer/browse?cat=birthday" className="hover:text-white transition-colors">Milestone Birthdays</Link></li>
                <li><Link to="/customer/browse?cat=concert" className="hover:text-white transition-colors">Live Concerts & Festivals</Link></li>
                <li><Link to="/customer/browse" className="hover:text-white transition-colors">Charity Galas</Link></li>
              </ul>
            </div>

            {/* Col 3: Vendors & Partners */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                For Vendors
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/register?role=vendor" className="hover:text-white transition-colors">Apply as Vendor</Link></li>
                <li><Link to="/vendor" className="hover:text-white transition-colors">Vendor Portal</Link></li>
                <li><Link to="/vendor/services" className="hover:text-white transition-colors">Storefront Management</Link></li>
                <li><Link to="/vendor/earnings" className="hover:text-white transition-colors">Escrow & Fast Payouts</Link></li>
                <li><a href="#vendor-handbook" className="hover:text-white transition-colors">Vendor Success Guide</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Stay Inspired
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Receive curated vendor showcases, seasonal trendbooks, and exclusive planning discounts.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Eventora Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
              <a href="#security" className="hover:text-slate-300">Security & Trust</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

