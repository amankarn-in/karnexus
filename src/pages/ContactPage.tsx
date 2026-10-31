import React, { useEffect } from 'react';
import { EnquiryForm } from '../components/EnquiryForm';
import { siteConfig } from '../config/site';
import { Mail, MapPin, Clock, ShieldCheck, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    // Read any query params if user clicked "Request Proposal for this Service"
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      const selectEl = document.getElementById('service') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = serviceParam;
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
              <Mail className="h-3.5 w-3.5" />
              <span>Project Consultation & Enquiries</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Discuss Your Project
            </h1>

            <p className="text-base text-slate-600 leading-relaxed sm:text-lg">
              Whether you need a full Odoo ERP implementation, custom module development, safe version migration, or a scalable Python backend, send your project details below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

            {/* Right Column: Direct Contact & Preparation Advice */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Details Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
                <h2 className="text-lg font-bold text-slate-950">
                  Direct Contact Information
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">
                        Business Email
                      </span>
                      <a
                        href={`mailto:${siteConfig.contact.email}?subject=Project%20Inquiry%20-%20Karnexus%20Software`}
                        className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 font-medium"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">
                        Location
                      </span>
                      <span className="text-slate-600">
                        {siteConfig.contact.location} (Collaborating with global clients)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">
                        Response Expectation
                      </span>
                      <span className="text-slate-600">
                        Typically within 1 business day. Direct response from your dedicated freelance engineer.
                      </span>
                    </div>
                  </div>

                  {/* Show Phone or WhatsApp ONLY if configured */}
                  {siteConfig.contact.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">
                          Phone
                        </span>
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                          className="text-slate-700 hover:text-slate-950"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {siteConfig.contact.whatsapp && (
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">
                          WhatsApp
                        </span>
                        <a
                          href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
                        >
                          Message on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* What helps us provide an accurate estimate */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  What Helps in Your Project Brief
                </h3>

                <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Current System:</strong> Your current Odoo version (e.g. 15, 16, 17) or current backend framework.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Integrations:</strong> Any third-party APIs (Shopify, Stripe, shipping carriers, external databases).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Scope & Pain Points:</strong> Specific workflows that are causing delays or requiring custom development.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Target Deadlines:</strong> When you need the project delivered or go-live window.</span>
                  </li>
                </ul>
              </div>

              {/* Confidentiality & Ethics */}
              <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4 text-xs text-slate-500 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  All shared project details, schemas, and operational requirements remain strictly confidential. Non-disclosure agreements (NDAs) signed upon request prior to technical audits.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
