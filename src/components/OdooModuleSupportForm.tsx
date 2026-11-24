import React, { useEffect, useMemo, useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { useRouter } from '../context/RouterContext';
import {
  ODOO_EDITIONS,
  ODOO_HOSTING_ENVIRONMENTS,
  ODOO_VERSIONS,
  SUPPORT_REQUEST_TYPES,
  SupportRequestTypeId,
  generateSupportTicketId,
  normalizeEdition,
  normalizeOdooVersion,
  normalizeRequestType,
  odooStoreModules,
  resolveModuleFromQuery,
} from '../config/odooModules';

interface SupportFormState {
  requestType: SupportRequestTypeId;
  moduleName: string;
  odooVersion: string;
  odooEdition: string;
  hosting: string;
  orderRef: string;
  name: string;
  email: string;
  company: string;
  subjectSummary: string;
  description: string;
  traceback: string;
  honeypot: string;
}

interface SubmittedSupportTicket extends SupportFormState {
  ticketId: string;
  requestTypeLabel: string;
}

function parseSupportSearchParams(search: string) {
  const params = new URLSearchParams(search);
  const rawModule = params.get('module') || params.get('app') || params.get('addon');
  const rawVersion = params.get('version') || params.get('odoo_version') || params.get('v');
  const rawEdition = params.get('edition') || params.get('ed');
  const rawType = params.get('type') || params.get('issue');
  const rawOrder = params.get('order') || params.get('ref');

  const { moduleName } = resolveModuleFromQuery(rawModule);
  const odooVersion = normalizeOdooVersion(rawVersion);
  const odooEdition = normalizeEdition(rawEdition);
  const requestType = normalizeRequestType(rawType);
  const orderRef = rawOrder?.trim() || '';

  return {
    moduleName,
    odooVersion,
    odooEdition,
    requestType,
    orderRef,
    hasDeepLink: Boolean(moduleName || odooVersion),
  };
}

export const OdooModuleSupportForm: React.FC = () => {
  const { currentSearch } = useRouter();
  const initialQuery = useMemo(() => parseSupportSearchParams(currentSearch), [currentSearch]);

  const [formData, setFormData] = useState<SupportFormState>(() => ({
    requestType: initialQuery.requestType,
    moduleName: initialQuery.moduleName,
    odooVersion: initialQuery.odooVersion,
    odooEdition: initialQuery.odooEdition || 'Community',
    hosting: '',
    orderRef: initialQuery.orderRef,
    name: '',
    email: '',
    company: '',
    subjectSummary: '',
    description: '',
    traceback: '',
    honeypot: '',
  }));

  const [showTraceback, setShowTraceback] = useState<boolean>(() => {
    const active = SUPPORT_REQUEST_TYPES.find((t) => t.id === initialQuery.requestType);
    return active ? active.showTracebackByDefault : true;
  });

  const [prefilledContext, setPrefilledContext] = useState<{
    moduleName: string;
    odooVersion: string;
  } | null>(() =>
    initialQuery.hasDeepLink
      ? { moduleName: initialQuery.moduleName, odooVersion: initialQuery.odooVersion }
      : null
  );

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'unconfigured' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittedTicket, setSubmittedTicket] = useState<SubmittedSupportTicket | null>(null);

  // Sync URL query params if the user navigates with a different deep link
  useEffect(() => {
    const parsed = parseSupportSearchParams(currentSearch);
    if (parsed.hasDeepLink || currentSearch) {
      setFormData((prev) => ({
        ...prev,
        moduleName: parsed.moduleName || prev.moduleName,
        odooVersion: parsed.odooVersion || prev.odooVersion,
        odooEdition: parsed.odooEdition || prev.odooEdition,
        requestType: parsed.requestType || prev.requestType,
        orderRef: parsed.orderRef || prev.orderRef,
      }));
      if (parsed.hasDeepLink) {
        setPrefilledContext({
          moduleName: parsed.moduleName,
          odooVersion: parsed.odooVersion,
        });
      }
      const active = SUPPORT_REQUEST_TYPES.find((t) => t.id === parsed.requestType);
      if (active) {
        setShowTraceback(active.showTracebackByDefault);
      }
    }
  }, [currentSearch]);

  const activeRequestType = useMemo(
    () => SUPPORT_REQUEST_TYPES.find((t) => t.id === formData.requestType) || SUPPORT_REQUEST_TYPES[0],
    [formData.requestType]
  );

  const versionOptions = useMemo(() => {
    if (formData.odooVersion && !ODOO_VERSIONS.includes(formData.odooVersion)) {
      return [formData.odooVersion, ...ODOO_VERSIONS];
    }
    return ODOO_VERSIONS;
  }, [formData.odooVersion]);

  const handleRequestTypeChange = (typeId: SupportRequestTypeId) => {
    const selected = SUPPORT_REQUEST_TYPES.find((t) => t.id === typeId);
    setFormData((prev) => ({ ...prev, requestType: typeId }));
    if (selected) {
      setShowTraceback(selected.showTracebackByDefault || formData.traceback.trim().length > 0);
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleResetPrefill = () => {
    setFormData((prev) => ({
      ...prev,
      moduleName: '',
      odooVersion: '',
    }));
    setPrefilledContext(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.moduleName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter the Odoo module name or technical name.');
      return;
    }

    if (!formData.odooVersion) {
      setStatus('error');
      setErrorMessage('Please select your Odoo version.');
      return;
    }

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    if (!formData.subjectSummary.trim()) {
      setStatus('error');
      setErrorMessage('Please provide a short subject summarizing your query.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please describe your issue or enhancement request in at least 10 characters.');
      return;
    }

    if (formData.honeypot) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const ticketId = generateSupportTicketId();
    const requestTypeLabel = activeRequestType.label;

    try {
      const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';
      const endpoint = `${apiBase}/api/enquire`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionType: 'odoo_module_support',
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: `Odoo Module Support — ${formData.moduleName.trim()} (Odoo ${formData.odooVersion})`,
          description: formData.description.trim(),
          honeypot: formData.honeypot,
          supportMeta: {
            ticketId,
            moduleName: formData.moduleName.trim(),
            odooVersion: formData.odooVersion,
            odooEdition: formData.odooEdition || 'Not specified',
            hosting: formData.hosting || 'Not specified',
            requestType: requestTypeLabel,
            orderRef: formData.orderRef.trim() || 'Not specified',
            subjectSummary: formData.subjectSummary.trim(),
            traceback: formData.traceback.trim(),
          },
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setSubmittedTicket({
          ...formData,
          ticketId,
          requestTypeLabel,
        });
        setStatus('success');
        setFormData((prev) => ({
          ...prev,
          subjectSummary: '',
          description: '',
          traceback: '',
          honeypot: '',
        }));
      } else if (response.status === 503 || result.configured === false) {
        setStatus('unconfigured');
        setErrorMessage(
          result.error ||
            'Online support dispatch is not currently configured on this server environment. Please send your ticket directly via email.'
        );
      } else {
        setStatus('error');
        setErrorMessage(
          result.error || 'Unable to submit your support request right now. Please email us directly.'
        );
      }
    } catch (err: unknown) {
      console.error('Support request failed:', err);
      setStatus('unconfigured');
      setErrorMessage(
        'Online submission service is currently unreachable. Please send your module support details directly via email.'
      );
    }
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `[Odoo Support][${formData.odooVersion || 'Version TBD'}] ${formData.moduleName || 'Odoo Module'} — ${activeRequestType.shortLabel}: ${formData.subjectSummary || 'Support Query'}`
    );
    const body = encodeURIComponent(
      `Hello Karnexus Software,\n\nI need support for an Odoo module.\n\n` +
        `Request Type: ${activeRequestType.label}\n` +
        `Module: ${formData.moduleName || 'N/A'}\n` +
        `Odoo Version: ${formData.odooVersion || 'N/A'}\n` +
        `Edition: ${formData.odooEdition || 'N/A'}\n` +
        `Hosting: ${formData.hosting || 'N/A'}\n` +
        `Odoo Apps Order Ref: ${formData.orderRef || 'N/A'}\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'N/A'}\n\n` +
        `Subject: ${formData.subjectSummary}\n\n` +
        `Query / Details:\n${formData.description}\n` +
        (formData.traceback.trim() ? `\nError Traceback / Logs:\n${formData.traceback.trim()}\n` : '') +
        `\nBest regards,\n${formData.name}`
    );
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      {/* Success State */}
      {status === 'success' && submittedTicket && (
        <div className="space-y-6 py-4 animate-fade-in" role="status" aria-live="polite">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-7 w-7 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xl font-bold text-slate-950">Support Request Submitted</h3>
              <p className="mt-1 text-sm text-slate-600">
                Thank you, {submittedTicket.name}. Your module support ticket has been logged and forwarded to the module author.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <span className="text-sm font-semibold text-slate-900">Ticket Summary</span>
              <span className="font-mono text-xs font-semibold text-indigo-700 tabular-nums">
                Ref: {submittedTicket.ticketId}
              </span>
            </div>

            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-xs sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Module</dt>
                <dd className="mt-0.5 font-mono font-semibold text-slate-900 break-all">
                  {submittedTicket.moduleName}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Odoo Environment</dt>
                <dd className="mt-0.5 font-medium text-slate-900 tabular-nums">
                  Odoo {submittedTicket.odooVersion} · {submittedTicket.odooEdition}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Request Type</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{submittedTicket.requestTypeLabel}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Reply Email</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{submittedTicket.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Subject</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{submittedTicket.subjectSummary}</dd>
              </div>
            </dl>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs text-indigo-950 leading-relaxed">
            <Clock className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">What happens next:</span> Our Odoo engineer will review your module context and reply to{' '}
              <span className="font-medium">{submittedTicket.email}</span> within 1 business day. Reference{' '}
              <span className="font-mono font-semibold tabular-nums">{submittedTicket.ticketId}</span> if you follow up by email.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition whitespace-nowrap"
          >
            Submit Another Support Query
          </button>
        </div>
      )}

      {/* Unconfigured Fallback State */}
      {status === 'unconfigured' && (
        <div
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50/90 p-5 text-amber-950 animate-fade-in"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-slate-900">Direct Email Fallback</h4>
                <p className="mt-1 text-xs text-slate-700 leading-relaxed">{errorMessage}</p>
              </div>

              <p className="text-xs text-slate-700">
                Your entered module details and query are preserved. Click below to open your email client pre-filled with this support request:
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={generateMailtoUrl()}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition whitespace-nowrap"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Send via Email ({siteConfig.contact.email})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation / General Error State */}
      {status === 'error' && errorMessage && (
        <div
          className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 animate-fade-in"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Please check your submission: </span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Main Support Form */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="support_honeypot">Leave this blank</label>
            <input
              type="text"
              id="support_honeypot"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {/* Pre-filled context indicator when arriving from Odoo Store docs */}
          {prefilledContext && (prefilledContext.moduleName || prefilledContext.odooVersion) && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-xs text-slate-700">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-semibold text-indigo-950">Pre-filled from documentation</span>
                {formData.moduleName && (
                  <>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span>
                      Module:{' '}
                      <strong className="font-mono text-slate-950">{formData.moduleName}</strong>
                    </span>
                  </>
                )}
                {formData.odooVersion && (
                  <>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="tabular-nums">
                      Version: <strong className="text-slate-950">Odoo {formData.odooVersion}</strong>
                    </span>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={handleResetPrefill}
                className="inline-flex items-center gap-1 font-medium text-indigo-700 hover:text-indigo-900 transition whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear pre-fill</span>
              </button>
            </div>
          )}

          {/* 1. Request Type Segmented Selector */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              How can we help with this module? <span className="text-rose-500">*</span>
            </span>
            <div
              className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5"
              role="radiogroup"
              aria-label="Support request type"
            >
              {SUPPORT_REQUEST_TYPES.map((option) => {
                const isSelected = formData.requestType === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleRequestTypeChange(option.id)}
                    className={`flex-1 min-w-fit rounded-lg px-3 py-2 text-xs font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                      isSelected
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {option.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Module & Version */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <label htmlFor="moduleName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Odoo Module Name / Technical Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="moduleName"
                name="moduleName"
                list={odooStoreModules.length > 0 ? 'odoo-store-modules-list' : undefined}
                required
                aria-required="true"
                value={formData.moduleName}
                onChange={handleChange}
                placeholder="e.g. knx_sale_approval or Module Display Name"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
              {odooStoreModules.length > 0 && (
                <datalist id="odoo-store-modules-list">
                  {odooStoreModules.map((mod) => (
                    <option
                      key={mod.technicalName}
                      value={`${mod.name} (${mod.technicalName})`}
                    />
                  ))}
                </datalist>
              )}
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="odooVersion" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Odoo Version <span className="text-rose-500">*</span>
              </label>
              <select
                id="odooVersion"
                name="odooVersion"
                required
                aria-required="true"
                value={formData.odooVersion}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition tabular-nums focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value="">Select version...</option>
                {versionOptions.map((version) => (
                  <option key={version} value={version}>
                    {version === 'Older / Custom' ? version : `Odoo ${version}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Edition, Hosting & Order Ref */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="odooEdition" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Odoo Edition
              </label>
              <select
                id="odooEdition"
                name="odooEdition"
                value={formData.odooEdition}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                {ODOO_EDITIONS.map((edition) => (
                  <option key={edition} value={edition}>
                    {edition}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hosting" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Hosting <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <select
                id="hosting"
                name="hosting"
                value={formData.hosting}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value="">Select environment...</option>
                {ODOO_HOSTING_ENVIRONMENTS.map((env) => (
                  <option key={env} value={env}>
                    {env}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="orderRef" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Apps Order Ref <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="orderRef"
                name="orderRef"
                value={formData.orderRef}
                onChange={handleChange}
                placeholder="e.g. SO123456"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* 4. Customer Details */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="support-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="support-name"
                name="name"
                required
                aria-required="true"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Patel"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            <div>
              <label htmlFor="support-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="support-email"
                name="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sarah@company.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="support-company" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Company / Organization <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="support-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Northstar Distribution Ltd"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          {/* 5. Query Subject & Detailed Description */}
          <div>
            <label htmlFor="subjectSummary" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Summary / Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="subjectSummary"
              name="subjectSummary"
              required
              aria-required="true"
              value={formData.subjectSummary}
              onChange={handleChange}
              placeholder={activeRequestType.subjectPlaceholder}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div>
            <label htmlFor="support-description" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Query Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="support-description"
              name="description"
              rows={5}
              required
              aria-required="true"
              value={formData.description}
              onChange={handleChange}
              placeholder={activeRequestType.queryPlaceholder}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          {/* 6. Optional Error Traceback / Server Log */}
          <div>
            <button
              type="button"
              onClick={() => setShowTraceback((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-700 transition"
              aria-expanded={showTraceback}
            >
              {showTraceback ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
              <span>
                {showTraceback
                  ? 'Hide Error Traceback / Server Log (optional)'
                  : 'Attach Error Traceback or Odoo Server Log (optional)'}
              </span>
            </button>

            {showTraceback && (
              <div className="mt-2 animate-fade-in">
                <textarea
                  id="traceback"
                  name="traceback"
                  rows={4}
                  value={formData.traceback}
                  onChange={handleChange}
                  placeholder="Paste Python traceback, QWeb/OWL console error, or relevant odoo.log lines here..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-xs text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                />
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your query goes directly to the module engineer at Karnexus Software. Never share live database passwords or API keys in support messages.
            </span>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Submitting Support Request...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Support Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
