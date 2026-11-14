import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, switchRole } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Access Restricted
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            You are currently signed in as a <span className="font-semibold uppercase text-brand-600">{role}</span>, which does not have permission to view this section.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            {allowedRoles.map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-gradient hover:bg-brand-gradient-hover text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Switch to {r.toUpperCase()} Demo Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ))}

            <Link
              to="/"
              className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Return to Landing Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

