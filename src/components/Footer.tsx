import React from 'react';
import { Link } from '../context/RouterContext';
import { siteConfig, odooServices, pythonServices } from '../config/site';
import { Mail, MapPin, ArrowUpRight, ShieldCheck, Phone, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="5" y="5" width="9" height="9" rx="2" fill="#ffffff" />
                  <rect x="18" y="5" width="9" height="9" rx="2" fill="#5eead4" />
                  <rect x="18" y="18" width="9" height="9" rx="2" fill="#818cf8" />
                  <circle cx="9.5" cy="22.5" r="2.5" fill="#5eead4" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteConfig.companyName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Specialized Odoo ERP implementations, safe version migrations, custom module development, and high-performance Python backends. Independent freelance engineering with direct technical communication.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="font-semibold text-slate-200">Practice:</span>
                <span>Independent Freelance Engineering</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-teal-400 shrink-0" />
                <span>{siteConfig.contact.location} (Working with global clients)</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-indigo-300 hover:text-white transition-colors underline underline-offset-2"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Show Phone / WhatsApp only when provided */}
              {siteConfig.contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              )}

              {siteConfig.contact.whatsapp && (
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Odoo Services Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Odoo Services
            </h3>
            <ul className="space-y-2 text-sm">
              {odooServices.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/odoo-services#${service.id}`}
                    className="text-slate-400 hover:text-white transition-colors block py-0.5"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/odoo-editions-and-hosting"
                  className="text-teal-300 hover:text-white transition-colors block py-0.5 font-medium"
                >
                  Editions & Hosting Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/odoo-faqs"
                  className="text-teal-300 hover:text-white transition-colors block py-0.5 font-medium"
                >
                  Odoo ERP FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/odoo-services"
                  className="inline-flex items-center gap-1 text-xs font-medium text-teal-300 hover:text-teal-200 pt-1"
                >
                  View All Odoo Services <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Python Services Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Python Development
            </h3>
            <ul className="space-y-2 text-sm">
              {pythonServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/python-development#${service.id}`}
                    className="text-slate-400 hover:text-white transition-colors block py-0.5"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Company & Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Karnexus Software
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Discuss Your Project
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}?subject=Project%20Inquiry%20-%20Karnexus%20Software`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Email Us Directly
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Independent Disclaimer */}
        <div className="mt-12 rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">Independent Provider Notice: </span>
              {siteConfig.disclaimer}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Canonical: https://karnexus.com</span>
            <span>Independent Software Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
