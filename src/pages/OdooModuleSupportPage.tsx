import React from 'react';
import { Link } from '../context/RouterContext';
import { OdooModuleSupportForm } from '../components/OdooModuleSupportForm';
import { siteConfig } from '../config/site';
import {
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  Wrench,
  BookOpen,
} from 'lucide-react';

export const OdooModuleSupportPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <span>Odoo Apps Store</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-600">Module Support &amp; Enhancements</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl text-balance">
              Odoo Module Support
            </h1>

            <p className="text-base text-slate-600 leading-relaxed sm:text-lg">
              Need help installing, troubleshooting, upgrading, or extending a Karnexus Odoo module? Submit your module details and query below for direct assistance from the engineer who built it.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 lg:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Left Column: Support Form */}
            <div className="lg:col-span-7">
              <OdooModuleSupportForm />
            </div>

            {/* Right Column: Support Scope, Triage Checklist & Direct Links */}
            <div className="lg:col-span-5 space-y-6">
              {/* Support Coverage */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
                <h2 className="text-base font-bold text-slate-950">
                  What Support Covers
                </h2>

                <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-slate-900">Included Module Support</h3>
                    <p className="mt-1">
                      Bug fixes in module behavior, installation troubleshooting, standard configuration guidance, and compatibility clarification for the purchased Odoo version.
                    </p>
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <h3 className="font-semibold text-slate-900">Custom Enhancements &amp; Version Ports</h3>
                    <p className="mt-1">
                      Need extra fields, custom QWeb layouts, third-party conflict resolution, or porting a module to a newer Odoo release? Select <strong className="text-slate-800">Enhancement</strong> or <strong className="text-slate-800">Version Port</strong> and we will respond with scope and turnaround.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist for Faster Resolution */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-950">
                  For Faster First-Reply Resolution
                </h2>

                <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Exact Odoo Version &amp; Edition:</strong> Confirm whether you run Community or Enterprise (e.g. Odoo 18.0 Enterprise on Odoo.sh).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Odoo Apps Order Reference:</strong> Include your order number (e.g. <span className="font-mono text-slate-800">SO123456</span>) for paid store apps to speed up verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Error Traceback:</strong> Copy the full Python traceback or browser console error so we can pinpoint the root cause immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Reproduction Steps:</strong> Share the sequence of actions leading up to the issue or the exact outcome you want from an enhancement.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Response Time & Direct Contact */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 text-sm">
                <h2 className="text-base font-bold text-slate-950">
                  Direct Support Details
                </h2>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-indigo-600 shrink-0 mt-1" />
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900 block">Response Time</span>
                      Typically within 1 business day (Monday–Friday). Direct replies from the module developer.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-indigo-600 shrink-0 mt-1" />
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900 block">Direct Email</span>
                      <a
                        href={`mailto:${siteConfig.contact.email}?subject=Odoo%20Module%20Support%20-%20Karnexus%20Software`}
                        className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 font-medium"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex flex-col gap-2.5 text-xs">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-slate-800 hover:bg-slate-100 transition"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Wrench className="h-3.5 w-3.5 text-indigo-600" />
                      Need a full Odoo project or custom ERP?
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  </Link>

                  <Link
                    href="/odoo-faqs"
                    className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-slate-800 hover:bg-slate-100 transition"
                  >
                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-teal-600" />
                      Browse Odoo ERP FAQs
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
