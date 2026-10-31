import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import {
  odooEditionsComparison,
  odooHostingOptions,
  siteConfig,
} from '../config/site';
import {
  Server,
  Layers,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Cpu,
  Database,
  Cloud,
  Terminal,
  FileCheck,
  DollarSign,
} from 'lucide-react';

export const OdooEditionsAndHostingPage: React.FC = () => {
  const [selectedHostingTab, setSelectedHostingTab] = useState<string>('docker-cloud-vps');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    'all',
    'Licensing',
    'Architecture',
    'Development',
    'Core Modules',
    'Financials',
    'Operations',
    'Support',
  ];

  const filteredFeatures =
    filterCategory === 'all'
      ? odooEditionsComparison
      : odooEditionsComparison.filter((f) => f.category === filterCategory);

  const activeHosting =
    odooHostingOptions.find((h) => h.id === selectedHostingTab) ||
    odooHostingOptions[2];

  return (
    <div className="flex flex-col">
      {/* 1. Page Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900">
              <Server className="h-3.5 w-3.5 text-teal-700" />
              <span>Architectural Decision Guide</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Odoo Editions & Hosting Architecture Guide
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              An independent, unbiased technical comparison between <strong>Odoo Community</strong> and <strong>Odoo Enterprise</strong>, alongside the 4 primary deployment options: Odoo Online, Odoo.sh, Self-Hosted Docker VPS, and On-Premise.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Get a Hosting & Edition Recommendation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/odoo-faqs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <HelpCircle className="h-4 w-4 text-indigo-600" />
                <span>Read Odoo FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Summary Cards: Community vs Enterprise */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Part 1: The Editions
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Odoo Community vs. Odoo Enterprise
            </h2>
            <p className="text-slate-600 text-sm">
              Both editions share the exact same PostgreSQL database architecture and Python ORM base. The difference lies in proprietary modules, license contracts, and hosting versatility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Odoo Community Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-teal-400">
                    <Layers className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                    100% Free Open Source
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Odoo Community</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    The core open-source engine released under the LGPLv3 license. Zero software licensing fees, full source code sovereignty, and no per-user monthly bills.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Key Strengths:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Zero recurring license fees regardless of company headcount</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Unlimited custom Python module development on your own VPS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Complete database access with zero vendor lock-in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Supported by massive Odoo Community Association (OCA) ecosystem</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900">
                  <strong className="block font-semibold mb-0.5">Trade-offs to consider:</strong>
                  Lacks native dynamic accounting reports (requires community addons), no Studio drag-and-drop tool, and no official mobile native apps (uses mobile web/PWA instead).
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link
                  href="/contact?service=Odoo%20Implementation"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
                >
                  <span>Consult on Odoo Community Deployment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Odoo Enterprise Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800 border border-indigo-200">
                    Commercial Subscription
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Odoo Enterprise</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    The commercial edition layered on top of Community. Adds proprietary financial modules, automated bank feeds, barcode workflows, and native iOS/Android apps.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Key Strengths:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Full automated accounting reports, dynamic P&L, and bank synchronization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Odoo Studio for quick visual field additions and view modifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Official native mobile apps for iOS and Android</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Standard core database upgrade scripts provided by Odoo S.A.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-xs text-rose-900">
                  <strong className="block font-semibold mb-0.5">Trade-offs to consider:</strong>
                  Requires recurring annual per-user license fees. Custom modules still require manual developer migration between major versions.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link
                  href="/contact?service=Odoo%20Implementation"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                >
                  <span>Consult on Odoo Enterprise Implementation</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Side-by-Side Detailed Feature Matrix */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Feature-by-Feature Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filter by functional category to analyze specific operational requirements.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                      filterCategory === cat
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-900 uppercase font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4 w-1/4">Functional Capability</th>
                    <th className="p-4 w-1/3 bg-slate-100/80">Odoo Community</th>
                    <th className="p-4 w-1/3 bg-indigo-50/50 text-indigo-950">Odoo Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredFeatures.map((item) => (
                    <tr key={item.feature} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-semibold text-slate-900 align-top">
                        <div>{item.feature}</div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono mt-0.5 block">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 align-top bg-slate-50/40">
                        <div className="font-medium">{item.community}</div>
                      </td>
                      <td className="p-4 text-slate-900 align-top bg-indigo-50/20 font-medium">
                        <div>{item.enterprise}</div>
                        {item.notes && (
                          <div className="text-[11px] text-slate-500 mt-1 italic">
                            {item.notes}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Part 2: Hosting Options Deep Dive */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Part 2: Hosting & Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              The 4 Odoo Hosting Deployment Models
            </h2>
            <p className="text-slate-600 text-sm">
              Your choice of hosting directly dictates whether you can develop custom Python modules, access server logs, connect external background services, and control your monthly operational overhead.
            </p>
          </div>

          {/* Interactive Hosting Tabs */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 max-w-4xl mx-auto mb-10">
            {odooHostingOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedHostingTab(opt.id)}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition ${
                  selectedHostingTab === opt.id
                    ? 'border-indigo-600 bg-white text-slate-900 shadow-sm ring-2 ring-indigo-500/20 font-bold'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <span className="text-xs font-semibold uppercase text-slate-400">
                  {opt.type}
                </span>
                <span className="text-sm font-bold mt-1">{opt.title}</span>
              </button>
            ))}
          </div>

          {/* Active Hosting Details Showcase */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs lg:p-10 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
              <div>
                <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  {activeHosting.type} Deployment
                </span>
                <h3 className="text-2xl font-bold text-slate-950 mt-2">
                  {activeHosting.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{activeHosting.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <div className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                  <strong>Custom Modules:</strong>{' '}
                  {activeHosting.customModuleSupport ? (
                    <span className="text-emerald-700 font-bold">Allowed</span>
                  ) : (
                    <span className="text-rose-700 font-bold">Not Allowed</span>
                  )}
                </div>
                <div className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                  <strong>SSH / Root:</strong>{' '}
                  {activeHosting.sshAccess ? (
                    <span className="text-emerald-700 font-bold">Yes</span>
                  ) : (
                    <span className="text-rose-700 font-bold">No</span>
                  )}
                </div>
              </div>
            </div>

            {/* Pros and Cons Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Key Advantages</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeHosting.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <span>Limitations & Caveats</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeHosting.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ideal for & Karnexus role */}
            <div className="mt-8 space-y-4 pt-6 border-t border-slate-100 text-xs">
              <div>
                <strong className="text-slate-900 block font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Ideal Use Case:
                </strong>
                <p className="text-slate-600 leading-relaxed">{activeHosting.idealFor}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <strong className="text-indigo-950 block font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  How Karnexus Software Delivers This:
                </strong>
                <p className="text-slate-700 leading-relaxed">{activeHosting.karnexusRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Decision Matrix */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Guidance
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Which Combination Is Right for You?
            </h2>
            <p className="text-slate-600 text-sm">
              Use this simple decision rubric based on your team size, customization needs, and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span className="text-xs font-bold text-teal-700 uppercase">Scenario A</span>
              <h3 className="text-base font-bold text-slate-900">
                Growing Business / Cost-Conscious
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You want a powerful ERP without committing to thousands in annual per-user software license fees.
              </p>
              <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs font-medium text-slate-800">
                <strong>Recommended:</strong> Odoo Community on a Dockerized Cloud VPS (AWS / Hetzner).
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span className="text-xs font-bold text-indigo-700 uppercase">Scenario B</span>
              <h3 className="text-base font-bold text-slate-900">
                Standard Flows / Zero Code
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You need out-of-the-box accounting and have no need for custom Python addons or external server scripts.
              </p>
              <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs font-medium text-slate-800">
                <strong>Recommended:</strong> Odoo Enterprise on Odoo Online (SaaS).
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span className="text-xs font-bold text-purple-700 uppercase">Scenario C</span>
              <h3 className="text-base font-bold text-slate-900">
                High Customization / APIs / Scale
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have unique approval chains, Shopify connectors, high order velocity, and require dedicated Postgres indexing.
              </p>
              <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs font-medium text-slate-800">
                <strong>Recommended:</strong> Odoo (Community or Enterprise) on a Dedicated Docker VPS managed by Karnexus.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
            Unsure which edition or server setup fits your budget?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We review your operational workflows, user count, and third-party integrations to provide an honest, vendor-agnostic infrastructure roadmap.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition"
            >
              <span>Discuss Your Infrastructure</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
