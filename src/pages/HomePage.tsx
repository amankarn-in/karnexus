import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import {
  siteConfig,
  odooServices,
  pythonServices,
  commonChallenges,
  deliveryProcess,
  whyWorkWithUs,
  exampleSolutions,
  faqs,
} from '../config/site';
import { HeroWorkflowVisual } from '../components/HeroWorkflowVisual';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  ShieldCheck,
  ChevronDown,
  Terminal,
  Database,
  RefreshCw,
  Cpu,
  Mail,
  Zap,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-white via-slate-50/50 to-slate-100/30 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/70 px-3.5 py-1 text-xs font-semibold text-indigo-900">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span>Independent Freelance Odoo & Python Engineering</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-5.5xl leading-[1.12]">
                {siteConfig.hero.headline}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {siteConfig.hero.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-98"
                >
                  <span>{siteConfig.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#services-overview"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 shadow-xs transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <span>{siteConfig.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Direct contact with your lead engineer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Maintainable, upgrade-safe code</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Docker staging & production</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Architecture Visual */}
            <div className="lg:col-span-6 lg:pl-4">
              <HeroWorkflowVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW SECTION */}
      <section id="services-overview" className="scroll-mt-16 py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Technical Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Core Engineering Services
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We specialize in two tightly coupled disciplines: enterprise ERP systems powered by Odoo, and scalable backend microservices powered by Python.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Odoo Group Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 flex flex-col justify-between transition hover:border-slate-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Layers className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
                    ERP Specialization
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Odoo Consulting & Development</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    From fresh rollouts to high-stakes version migrations and intricate custom modules. We build ERP workflows that match your exact business logic without hacking core code.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Key Offerings:
                  </span>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {odooServices.slice(0, 4).map((s) => (
                      <li key={s.id} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-900">{s.title}: </strong>
                          <span className="text-slate-600">{s.shortDescription}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link
                  href="/odoo-services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition"
                >
                  <span>Explore all 7 Odoo service areas</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Python Group Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 flex flex-col justify-between transition hover:border-slate-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-200">
                    Backend & APIs
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Python Backend Development</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    FastAPI, Django, asynchronous background automation, and resilient data integration pipelines engineered for high reliability, maintainability, and clean architecture.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Key Offerings:
                  </span>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {pythonServices.slice(0, 4).map((s) => (
                      <li key={s.id} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-900">{s.title}: </strong>
                          <span className="text-slate-600">{s.shortDescription}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link
                  href="/python-development"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 transition"
                >
                  <span>Explore all Python backend capabilities</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMON BUSINESS CHALLENGES WE HELP SOLVE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Pragmatic Problem Solving
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Common Challenges We Help Solve
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We frequently rescue and stabilize projects after initial setbacks, unmanaged growth, or unmaintained customizations.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commonChallenges.map((challenge, idx) => (
              <div
                key={challenge.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-xs transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}

            {/* Direct consultation callout card */}
            <div className="rounded-xl border border-indigo-200 bg-linear-to-br from-indigo-50/80 to-purple-50/60 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Facing a different bottleneck?
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-950">
                  Discuss Your Architecture
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Share your technical bottlenecks directly with your lead engineer for an honest, actionable appraisal.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-indigo-100">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                >
                  <span>Request Technical Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR DELIVERY PROCESS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Structured Methodology
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Our 6-Stage Delivery Process
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Every project follows an engineering-driven lifecycle with defined milestones, test verification, and full handover documentation.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryProcess.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="font-mono text-xl font-extrabold text-indigo-600">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Stage Milestone
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block">
                    Included activities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {step.activities.map((act) => (
                      <li key={act} className="flex items-start gap-1.5">
                        <span className="text-indigo-600 font-bold shrink-0">&bull;</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY WORK WITH US */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Freelance Engineering Practice
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Why Work With Karnexus Software
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Large agencies often sell with senior executives and staff your project with junior offshore developers. At Karnexus Software, you collaborate directly with your lead freelance engineer from architecture planning to production cutover.
              </p>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Our Engineering Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Clean repositories, standard Odoo inheritance without core hacks, type annotations in Python, and full code ownership retained by your company.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-white transition"
                >
                  <span>Learn more about Karnexus Software</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {whyWorkWithUs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-800 bg-slate-800/50 p-5 transition hover:border-slate-700 hover:bg-slate-800/80"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="mt-2 pl-7 text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EXAMPLE SOLUTION AREAS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
              <span>Architectural Blueprints</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Example Solutions
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              These representative solution areas illustrate how we approach complex integration, automation, and customization challenges using Odoo and Python.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {exampleSolutions.map((ex) => (
              <div
                key={ex.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                      {ex.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Example Blueprint
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {ex.title}
                  </h3>

                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Problem Context:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ex.problemScenario}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-700 block mb-1">
                      Architectural Solution:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ex.architecturalSolution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">
                      Technologies Involved:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase text-emerald-700 block mb-1">
                      Target Outcomes:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {ex.keyOutcomes.map((out) => (
                        <li key={out} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="scroll-mt-16 py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Transparent answers regarding Odoo versions, migration safety, code ownership, and how engagements are structured.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-white transition hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-xl"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/odoo-faqs"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 transition"
            >
              <HelpCircle className="h-4 w-4 text-indigo-600" />
              <span>Explore All Categorized Odoo FAQs & Knowledge Base</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CONTACT CTA */}
      <section className="py-20 bg-linear-to-b from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700">
              <Mail className="h-3.5 w-3.5" />
              <span>Let's Discuss Your Software Architecture</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Ready to build, customize, or migrate your software?
            </h2>

            <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
              Send your requirements for an honest technical assessment. We review your scope, identify potential architectural challenges, and outline a realistic milestone plan.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`mailto:${siteConfig.contact.email}?subject=Project%20Inquiry%20-%20Karnexus%20Software`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Mail className="h-4 w-4 text-indigo-600" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>

            <div className="pt-4 text-xs text-slate-500">
              No sales pressure. Direct technical communication with your lead engineer.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
