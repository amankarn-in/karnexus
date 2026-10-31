import React from 'react';
import { Link } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import { Home, ArrowLeft, Mail } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs max-w-lg w-full space-y-6">
        <span className="font-mono text-5xl font-extrabold text-indigo-600 block">404</span>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you requested could not be located. You can navigate back to our home page or explore our technical services.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Mail className="h-4 w-4 text-indigo-600" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
