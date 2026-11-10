import React from 'react';
import { Link } from '../context/RouterContext';
import { customErpServices } from '../config/site';
import {
  Boxes,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  Server,
  Database,
  Layers,
  Cpu,
  BarChart3,
  Lock,
  Workflow,
  Sparkles,
  Zap,
} from 'lucide-react';

export const CustomErpServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Header Banner */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
              <Boxes className="h-3.5 w-3.5 text-indigo-700" />
              <span>Core Engineering Specialization</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              End-to-End Custom ERP Development
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              We design, build, and deploy purpose-built enterprise resource planning platforms tailored exactly to your proprietary workflows, data models, and business logic—without the bloated license fees or limitations of one-size-fits-all ERP packages.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Custom%20ERP%20Development"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Discuss Your Custom ERP Architecture</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#services-breakdown"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <span>Explore ERP Modules & Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Custom ERP vs Off-the-Shelf Comparison */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Why Build Custom?
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Custom ERP vs. Commercial Off-the-Shelf (COTS)
            </h2>
            <p className="text-slate-600 text-sm">
              Standard ERP systems are designed to fit the average company. If your competitive advantage relies on proprietary workflows, custom software provides unmatched operational leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* COTS Limitations */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-200">
                  Off-The-Shelf SaaS ERPs
                </span>
                <span className="text-xs text-rose-600 font-semibold">Vendor Lock-In</span>
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Rigid Workflows & Recurring Seat Taxes
              </h3>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span><strong>Exponential Costs:</strong> Recurring monthly per-seat fees that escalate rapidly as your operational and field workforce expands.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span><strong>Operational Friction:</strong> Forces your team to reshape real-world business processes to fit arbitrary software rules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span><strong>Bloated UI:</strong> Hundreds of unused menus, screens, and fields that confuse operators and slow down daily transaction entry.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span><strong>Data Captivity:</strong> Hostage to proprietary databases, costly export fees, and vendor upgrade cycles that break third-party plugins.</span>
                </li>
              </ul>
            </div>

            {/* Custom ERP Advantages */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Karnexus Custom ERP
                </span>
                <span className="text-xs text-emerald-600 font-semibold">100% Code Ownership</span>
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Tailored Systems Built for Your DNA
              </h3>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Per-User Licensing:</strong> Run with 10 or 10,000 users without software license price spikes. You only pay standard cloud hosting.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Exact Workflow Alignment:</strong> Custom approval ladders, dynamic pricing rules, and field data entry crafted specifically for your team.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High-Performance Ergonomics:</strong> Blazing-fast interfaces built with modern React & TypeScript designed for maximum data-entry throughput.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Total IP Sovereignty:</strong> You retain complete Git source code ownership, private database schemas, and multi-cloud freedom.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Services Breakdown */}
      <section id="services-breakdown" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              End-to-End Delivery
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Complete Lifecycle Custom ERP Services
            </h2>
            <p className="text-slate-600 text-sm">
              From business process modeling to production cutover, we take complete technical responsibility for your custom ERP platform.
            </p>
          </div>

          <div className="space-y-12">
            {customErpServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-36 rounded-2xl border border-slate-200 bg-white p-8 shadow-xs lg:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-slate-100 pb-8">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-800 font-mono font-bold text-sm">
                        0{index + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                        Custom ERP Engineering
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
                      className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 transition"
                    >
                      <span>Request Scope & Estimate</span>
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
                        The Core Bottleneck This Eliminates
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
                      <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                      <span>Engineering Scope & Activities</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-700">
                      {service.scopeOfEngagement.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables & Tech Stack */}
                  <div className="flex flex-col justify-between space-y-6 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-indigo-600" />
                        <span>Tangible Technical Deliverables</span>
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
                          Core Technologies & Tooling
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
        </div>
      </section>

      {/* 4. Common Modules Built in Custom ERPs */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Modular Architecture
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Modules We Commonly Build & Integrate
            </h2>
            <p className="text-slate-600 text-sm">
              Every custom ERP is assembled from robust, independently testable domain modules configured to your precise business taxonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Custom Approval & Routing Engines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-tier authorization workflows based on dollar limits, cost centers, branch geography, and vendor classifications with instant email and mobile approvals.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Multi-Warehouse Inventory & Lot Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time stock valuation (FIFO, Weighted Average), serial number tracking, barcode scanning, bin locations, and automated purchase reorder triggers.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Custom Billing & Revenue Recognition</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Milestone-based invoicing, complex usage billing, recurring subscription engines, automated PDF tax invoicing, and bank reconciliation hooks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Customer & Supplier Self-Service Portals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Branded external portals allowing clients and vendors to place orders, upload compliance documents, track delivery manifests, and download statements securely.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Dispatch, Field Service & Fleet Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mobile-optimized dispatch consoles, GPS delivery tracking, automated proof-of-delivery signatures, and real-time field status telemetry.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Third-Party SaaS & Hardware Connectors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-volume webhooks and API integrations connecting your custom ERP with Shopify, Stripe, courier systems, IoT scales, and manufacturing PLCs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Own Your Core Business Infrastructure</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Ready to build an ERP that works the way you do?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Stop forcing your operations into someone else's software template. Collaborate directly with an experienced systems engineer to architect an enterprise platform tailored to your long-term vision.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=Custom%20ERP%20Development"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition"
            >
              <span>Schedule an ERP Architecture Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
