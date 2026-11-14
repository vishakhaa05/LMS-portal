import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Building2, User } from 'lucide-react';

export const LoginPage = () => {
  const { login, switchRole } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@eventora.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let role = 'customer';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('lumina') || email.includes('vendor')) role = 'vendor';

      const result = login(email, password, role);
      addToast({
        type: 'success',
        title: 'Welcome Back!',
        message: `Signed in successfully as ${result.user.name}.`
      });

      if (role === 'admin') navigate('/admin');
      else if (role === 'vendor') navigate('/vendor');
      else navigate('/customer/browse');
    }, 600);
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
    addToast({
      type: 'success',
      title: 'Demo Session Active',
      message: `Switched to ${role.toUpperCase()} workspace.`
    });
    if (role === 'admin') navigate('/admin');
    else if (role === 'vendor') navigate('/vendor');
    else navigate('/customer/browse');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Left Column: Celebratory Visual Brand Side */}
      <div className="hidden lg:relative lg:flex flex-col justify-between p-12 bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
            alt="Event celebration"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-brand-950/40" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl font-black tracking-tight text-white">
            Eventora
          </span>
        </div>

        {/* Quote / Highlight */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
            <span>✨ The Modern Celebration Operating System</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            "Every memorable gathering begins with exceptional partners."
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Manage vendor contracts, milestone disbursements, multi-day itineraries, and guest reservations in real time.
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-6">
          <span>Trusted by 12,000+ event creators worldwide</span>
          <span>© 2026 Eventora Inc.</span>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Header */}
          <div>
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold">Eventora</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Welcome back! Please enter your details or select a 1-click demo role.
            </p>
          </div>

          {/* 1-Click Role Demo Badges */}
          <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-slate-900 border border-brand-200/70 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider block">
              ⚡ Instant Demo Quick-Login
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-xs font-bold text-slate-800 dark:text-white flex flex-col items-center gap-1 shadow-xs transition-all hover:scale-102"
              >
                <Shield className="w-4 h-4 text-brand-600" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('vendor')}
                className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-xs font-bold text-slate-800 dark:text-white flex flex-col items-center gap-1 shadow-xs transition-all hover:scale-102"
              >
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Vendor</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-bold text-slate-800 dark:text-white flex flex-col items-center gap-1 shadow-xs transition-all hover:scale-102"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>Customer</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
                  } bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-500 font-medium mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border ${
                    errors.password
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
                  } bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-500 font-medium mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an Eventora account?{' '}
            <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

