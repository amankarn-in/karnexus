import React from 'react';
import { Link } from '../context/RouterContext';
import { siteConfig, odooServices } from '../config/site';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileCode,
  Terminal,
  Cpu,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react';

export const OdooServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-900">
              <Layers className="h-3.5 w-3.5" />
              <span>Independent Odoo Engineering Practice</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Odoo Consulting, Customization & Development Services
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Tailored ERP implementations, safe database migrations, clean module development, and high-performance integrations built strictly around your operational workflows.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Discuss Your Odoo Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Jump Navigation */}
      <section className="sticky top-[65px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md py-3 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-2">
              Jump to:
            </span>
            {odooServices.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {odooServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-36 rounded-2xl border border-slate-200 bg-white p-8 shadow-xs lg:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-slate-100 pb-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-800 font-mono font-bold text-sm">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Odoo ERP Service
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    {service.title}
                  </h2>

                  <p className="text-base text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2.5 text-xs font-semibold text-purple-900 hover:bg-purple-100 transition"
                  >
                    <span>Request Proposal for this Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Business Problem Solved */}
              <div className="mt-8 rounded-xl border border-rose-100 bg-rose-50/40 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      The Business Problem We Solve
                    </h3>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                      {service.businessProblem}
                    </p>
                  </div>
                </div>
              </div>

              {/* Engagement Scope & Deliverables Grid */}
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Scope */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>What the Engagement Includes</span>
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {service.scopeOfEngagement.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0 mt-2" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables & Tech Stack */}
                <div className="flex flex-col justify-between space-y-6 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-purple-600" />
                      <span>Tangible Deliverables</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-700">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.techStack && (
                    <div className="pt-4 border-t border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Technologies & Standards
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout Banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-8 md:p-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Architectural Integrity
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
                Why We Never Hack Odoo Core Code
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Many developers take shortcuts by modifying core Odoo Python files or executing ad-hoc database updates. While this works initially, it causes catastrophic failures when upgrading versions or installing official security patches.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                At Karnexus Software, we strictly use inherited models, custom views, OWL extension components, and isolated custom addon repositories. Your system remains standard-compliant, secure, and ready for future upgrades.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition"
                >
                  <span>Schedule Technical Review</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
