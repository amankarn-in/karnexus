import React from 'react';
import { Link } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import {
  User,
  ShieldCheck,
  Code2,
  Layers,
  ArrowRight,
  Terminal,
  Database,
  Server,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
              <User className="h-3.5 w-3.5" />
              <span>Independent Freelance Engineering</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              About Karnexus Software
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              An independent software services consultancy providing hands-on freelance Odoo ERP engineering and Python backend development.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Founder Story & Practical Experience */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Engineering Leadership
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Built on Practical Systems Experience
                </h2>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong>Karnexus Software</strong> operates as an independent freelance engineering practice established to provide businesses with a direct, technically sound alternative to traditional software agencies.
                  </p>
                  <p>
                    Enterprise ERP implementations and backend microservices require deep architectural understanding. In many consulting agencies, projects are scoped by sales teams and passed through multiple layers of non-technical project managers before reaching the engineers. This communication gap regularly results in misaligned data models, bloated customizations, and painful delays.
                  </p>
                  <p>
                    At Karnexus Software, you work directly with the freelance engineer responsible for your system. We focus on pragmatic technical execution: building reliable Odoo workflows, robust Python microservices, resilient API connectors, and clean Docker deployments that your team can confidently own.
                  </p>
                </div>
              </div>

              {/* Technical Proficiencies */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-950">
                  Practical Technical Stack
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-600 shrink-0" />
                    <span><strong>Odoo ERP:</strong> Versions 15–18, OWL, QWeb, XML-RPC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-teal-600 shrink-0" />
                    <span><strong>Python:</strong> FastAPI, Django, Celery, Pydantic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-600 shrink-0" />
                    <span><strong>Databases:</strong> PostgreSQL, SQL query optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span><strong>DevOps:</strong> Docker, Docker Compose, Linux, NGINX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-slate-700 shrink-0" />
                    <span><strong>APIs:</strong> REST, Webhooks, HMAC signatures, JSON-RPC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>Frontend:</strong> JavaScript, TypeScript, Tailwind</span>
                  </div>
                </div>
              </div>

              {/* Working Principles */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-950">
                  How We Operate
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-semibold text-slate-900">Direct technical communication:</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        No junior intermediaries. All technical discussions and scoping occur directly with your dedicated freelance engineer.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-semibold text-slate-900">Maintainable code without core hacks:</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        We respect framework conventions so your Odoo installation and Python backends remain clean, secure, and upgradeable.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-semibold text-slate-900">Structured handover & 100% code ownership:</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        You retain full intellectual property rights, repository access, and clear documentation. No proprietary lock-in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Profile Card & Transparency Notice */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-indigo-400 font-bold text-xl shadow-xs">
                    KS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Karnexus Software</h3>
                    <p className="text-xs font-medium text-slate-500">Independent Freelance Practice</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{siteConfig.contact.location} (Worldwide Remote)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 text-xs text-slate-600 leading-relaxed">
                  {siteConfig.founder.bio}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900">Direct Contact:</div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4 text-indigo-600" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="underline underline-offset-2 hover:text-indigo-600"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Independent Provider Notice */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-slate-500" />
                  <span>Independent Provider Notice</span>
                </div>
                <p className="leading-relaxed text-slate-500">
                  Karnexus Software is an independent software development practice. We are not officially affiliated with, endorsed by, or an official partner of Odoo S.A. All Odoo product names and trademarks remain the property of their respective holders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
