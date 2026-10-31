import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { Send, CheckCircle2, AlertCircle, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  honeypot: string; // Anti-spam hidden field
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  description: '',
  budget: '',
  timeline: '',
  honeypot: '',
};

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'unconfigured' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side quick validation
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

    if (!formData.service) {
      setStatus('error');
      setErrorMessage('Please select the service required.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please provide a brief description of your project (at least 10 characters).');
      return;
    }

    // Bot detection
    if (formData.honeypot) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';
      const endpoint = `${apiBase}/api/enquire`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setSubmittedData({ ...formData });
        setStatus('success');
        setFormData(initialFormState);
      } else if (response.status === 503 || result.configured === false) {
        // Email service is not configured on the server
        setStatus('unconfigured');
        setErrorMessage(
          result.error ||
            'Online enquiry dispatch is not currently configured on this server environment. Please contact us directly via email.'
        );
      } else {
        setStatus('error');
        setErrorMessage(
          result.error || 'Unable to submit your enquiry at this moment. Please email us directly.'
        );
      }
    } catch (err: unknown) {
      console.error('Submission request failed:', err);
      // In case server is offline or connection dropped, explain and offer direct email
      setStatus('unconfigured');
      setErrorMessage(
        'Online submission service is currently unreachable. Please send your project details directly via email.'
      );
    }
  };

  // Generate a pre-filled mailto link so the visitor loses zero work if SMTP is unconfigured
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Enquiry: ${formData.service || 'Software Services'} - ${formData.name || 'New Client'}`);
    const body = encodeURIComponent(
      `Hello Karnexus Software,\n\nI would like to discuss a project.\n\n` +
      `Name: ${formData.name}\n` +
      `Work Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Service: ${formData.service || 'N/A'}\n` +
      `Estimated Budget: ${formData.budget || 'N/A'}\n` +
      `Target Timeline: ${formData.timeline || 'N/A'}\n\n` +
      `Project Details:\n${formData.description}\n\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Success State */}
      {status === 'success' && submittedData && (
        <div className="space-y-6 text-left py-4 animate-fade-in" role="status" aria-live="polite">
          <div className="flex items-center gap-3 text-emerald-700">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Enquiry Received</h3>
              <p className="text-sm text-slate-600">
                Thank you, {submittedData.name}. Your project details have been successfully transmitted.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-sm text-slate-700">
            <div className="font-semibold text-slate-900 border-b border-slate-200 pb-2">
              Submission Summary
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500">Service: </span>
                <span className="font-medium text-slate-900">{submittedData.service}</span>
              </div>
              <div>
                <span className="text-slate-500">Email: </span>
                <span className="font-medium text-slate-900">{submittedData.email}</span>
              </div>
              {submittedData.company && (
                <div>
                  <span className="text-slate-500">Company: </span>
                  <span className="font-medium text-slate-900">{submittedData.company}</span>
                </div>
              )}
              {submittedData.timeline && (
                <div>
                  <span className="text-slate-500">Timeline: </span>
                  <span className="font-medium text-slate-900">{submittedData.timeline}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-indigo-50 p-4 text-xs text-indigo-950">
            <Clock className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Next steps:</span> Your project brief is reviewed directly by your lead freelance engineer, who will respond to your work email within 1 business day with questions or an initial consultation invitation.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Submit Another Enquiry
          </button>
        </div>
      )}

      {/* Unconfigured Email State (Honest & Transparent) */}
      {status === 'unconfigured' && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/90 p-5 text-amber-950 animate-fade-in" role="alert">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-slate-900">Online Submission Gateway Notice</h4>
                <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                  {errorMessage}
                </p>
              </div>

              <div className="rounded-lg bg-white/80 border border-amber-200/60 p-3 text-xs text-slate-800">
                <span className="font-semibold block mb-1">Send Directly via Email:</span>
                We have preserved your entered information. Click the button below to open your email client pre-filled with your details:
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={generateMailtoUrl()}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 transition"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Send via Email Client ({siteConfig.contact.email})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Error State */}
      {status === 'error' && errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 animate-fade-in" role="alert">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Please check your submission: </span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Form (visible when not in success mode) */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot field for spam bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_honeypot">Leave this blank</label>
            <input
              type="text"
              id="website_honeypot"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Miller"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@company.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Logistics Ltd"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              />
            </div>

            {/* Service Required */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Service Required <span className="text-rose-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                aria-required="true"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value="">Select a service category...</option>
                <optgroup label="Odoo Services">
                  <option value="Odoo Implementation">Odoo Implementation</option>
                  <option value="Odoo Version Migration">Odoo Version Migration</option>
                  <option value="Odoo Customization">Odoo Customization</option>
                  <option value="Odoo Custom Module Development">Odoo Custom Module Development</option>
                  <option value="Odoo System Integrations">Odoo System Integrations</option>
                  <option value="Odoo Support & Maintenance">Odoo Support & Maintenance</option>
                  <option value="Odoo Deployment & Docker">Odoo Deployment & Docker</option>
                </optgroup>
                <optgroup label="Python Development">
                  <option value="Python Backend (FastAPI / Django)">Python Backend (FastAPI / Django)</option>
                  <option value="REST APIs & Integrations">REST APIs & Integrations</option>
                  <option value="Business Automation & Scripts">Business Automation & Scripts</option>
                  <option value="Data Sync & Power BI Workflows">Data Sync & Power BI Workflows</option>
                  <option value="Codebase Maintenance & Optimization">Codebase Maintenance & Optimization</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="Combined Odoo & Python Project">Combined Odoo & Python Project</option>
                  <option value="Technical Consulting & Architecture Audit">Technical Consulting & Architecture Audit</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Estimated Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Estimated Budget <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value="">Select an approximate range...</option>
                <option value="Under $2,000">Under $2,000</option>
                <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                <option value="$10,000+">$10,000+</option>
                <option value="Monthly Engineering Retainer">Monthly Engineering Retainer</option>
                <option value="To be discussed / Flexible">To be discussed / Flexible</option>
              </select>
            </div>

            {/* Expected Timeline */}
            <div>
              <label htmlFor="timeline" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Timeline <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value="">Select target start or completion...</option>
                <option value="Immediate / Critical fix">Immediate / Critical fix</option>
                <option value="Within 2-4 weeks">Within 2–4 weeks</option>
                <option value="1-3 months">1–3 months</option>
                <option value="Planning / Exploratory">Planning / Exploratory</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Project Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              aria-required="true"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your current software setup, operational bottleneck, or specific modules/endpoints required..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
            <span className="mt-1 block text-xs text-slate-500">
              Include details like your Odoo edition/version, third-party apps, or specific Python requirements.
            </span>
          </div>

          {/* Privacy & Direct Attention notice */}
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your enquiry goes directly to the lead freelance engineer at Karnexus Software. We do not share your contact details or spam your inbox.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Transmitting Brief...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Project Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
