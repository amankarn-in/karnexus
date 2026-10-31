import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '../context/RouterContext';
import { comprehensiveOdooFaqs, siteConfig } from '../config/site';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  Layers,
  Server,
  Code2,
  RefreshCw,
  Cpu,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const OdooFaqsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'editions-licensing-0': true,
  });

  // Inject Schema.org FAQPage JSON-LD on mount
  useEffect(() => {
    const allQuestions = comprehensiveOdooFaqs.flatMap((cat) => cat.items);
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allQuestions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'odoo-faq-schema';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('odoo-faq-schema');
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const expandAll = () => {
    const allKeys: Record<string, boolean> = {};
    comprehensiveOdooFaqs.forEach((cat) => {
      cat.items.forEach((_, idx) => {
        allKeys[`${cat.id}-${idx}`] = true;
      });
    });
    setOpenItems(allKeys);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  // Filter items based on category and search query
  const filteredCategories = useMemo(() => {
    return comprehensiveOdooFaqs
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        if (!searchQuery.trim()) {
          return cat;
        }
        const q = searchQuery.toLowerCase();
        const matchingItems = cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        );
        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalQuestionsFound = filteredCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Odoo Knowledge Base</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions About Odoo
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Transparent, technical answers to common questions about Odoo licensing, implementation timelines, custom module development, version migration, and cloud hosting.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/odoo-editions-and-hosting"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <Server className="h-4 w-4 text-teal-400" />
                <span>View Editions & Hosting Guide</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Mail className="h-4 w-4 text-indigo-600" />
                <span>Ask a Specific Question</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Navigation */}
      <section className="sticky top-[65px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md py-4 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. migration, accounting, studio, backup)..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-900 transition placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>{totalQuestionsFound} answers found</span>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={expandAll}
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                Expand all
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-slate-600 hover:text-slate-800 underline underline-offset-2"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics ({comprehensiveOdooFaqs.reduce((a, c) => a + c.items.length, 0)})
            </button>
            {comprehensiveOdooFaqs.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.category} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAQ Content Accordions */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No matching questions found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find an answer matching "{searchQuery}". Try searching for terms like "migration", "accounting", "hosting", or "pricing".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredCategories.map((catGroup) => (
              <div key={catGroup.id} className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                    <span>{catGroup.category}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{catGroup.description}</p>
                </div>

                <div className="space-y-3">
                  {catGroup.items.map((item, idx) => {
                    const key = `${catGroup.id}-${idx}`;
                    const isOpen = Boolean(openItems[key]);

                    return (
                      <div
                        key={item.question}
                        className="rounded-xl border border-slate-200 bg-white shadow-2xs transition hover:border-slate-300 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(key)}
                          className="flex w-full items-start justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-bold text-slate-900 pr-4 leading-snug">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-400 shrink-0 mt-0.5 transition-transform ${
                              isOpen ? 'rotate-180 text-indigo-600' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Still Have Questions CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50/60 via-white to-purple-50/40 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Have a question specific to your software setup?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto">
              Send your current operational pain point or technical requirement directly to your lead freelance engineer for an honest evaluation.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Ask Your Technical Question</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Odoo%20Technical%20Question`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Mail className="h-4 w-4 text-indigo-600" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
