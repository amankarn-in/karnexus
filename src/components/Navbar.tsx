import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath } = useRouter();
  // State-based mobile menu toggle
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close mobile navigation menu when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  // Lock body scroll only when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Odoo Services', href: '/odoo-services' },
    { label: 'Editions & Hosting', href: '/odoo-editions-and-hosting' },
    { label: 'Odoo FAQs', href: '/odoo-faqs' },
    { label: 'Python Development', href: '/python-development' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-indigo-400 shadow-sm transition-transform group-hover:scale-105">
              <svg
                className="h-6 w-6"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Geometric node connector logo */}
                <rect x="5" y="5" width="9" height="9" rx="2" fill="#6366f1" />
                <rect x="18" y="5" width="9" height="9" rx="2" fill="#0d9488" />
                <rect x="18" y="18" width="9" height="9" rx="2" fill="#4338ca" />
                <path
                  d="M9.5 14V22.5C9.5 23.6 10.4 24.5 11.5 24.5H15"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                />
                <path
                  d="M14 9.5H18"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="9.5" cy="22.5" r="2.5" fill="#6366f1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-slate-950 text-lg leading-tight">
                {siteConfig.companyName}
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-slate-500">
                Odoo &bull; Python Backend
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-98"
            >
              <span>{siteConfig.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2.5 text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 active:bg-slate-200"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-nav-panel"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Accordion Dropdown Panel (expands directly underneath header bar) */}
        {isOpen && (
          <div
            id="mobile-nav-panel"
            className="md:hidden w-full border-t border-slate-200 bg-white shadow-xl transition-all animate-fade-in"
          >
            <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span>{siteConfig.contact.email}</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 active:scale-[0.99]"
                >
                  <span>{siteConfig.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop overlay underneath the dropdown panel */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] z-30 bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
