/**
 * Cloudflare Pages Function: /api/enquire
 * Runs natively at the Cloudflare Edge on every 'git push' to Cloudflare Pages.
 * 
 * Features:
 * - 0ms cold starts across 300+ edge locations worldwide
 * - Zero server/VM cost ($0/month free tier with 100k requests/day)
 * - Native same-origin routing (no CORS issues when called from https://karnexus.com/api/enquire)
 * - Supports Resend API (recommended), Brevo API, or SendGrid API
 * - Built-in honeypot spam protection & input validation
 */

import { sendViaGmailSmtp } from './_gmail-smtp';

interface Env {
  GMAIL_USER?: string;
  GMAIL_APP_PASSWORD?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  RESEND_API_KEY?: string;
  BREVO_API_KEY?: string;
  SENDGRID_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  FROM_EMAIL?: string;
  [key: string]: string | undefined;
}

interface SupportMeta {
  ticketId?: string;
  moduleName?: string;
  odooVersion?: string;
  odooEdition?: string;
  hosting?: string;
  requestType?: string;
  orderRef?: string;
  subjectSummary?: string;
  traceback?: string;
}

interface EnquiryPayload {
  submissionType?: 'project_enquiry' | 'odoo_module_support';
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  honeypot?: string;
  supportMeta?: SupportMeta;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let payload: EnquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON payload.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  const {
    submissionType,
    name,
    email,
    company,
    service,
    budget,
    timeline,
    description,
    honeypot,
    supportMeta,
  } = payload;

  // 1. Spam honeypot trap
  if (honeypot && honeypot.trim().length > 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid submission detected.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  // 2. Input validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'Please provide your full name.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Please provide a valid work email address.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  if (!service || typeof service !== 'string' || service.trim().length === 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'Please select the service required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Please provide a brief description of your project (at least 10 characters).',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }

  const destinationEmail = env.NOTIFICATION_EMAIL?.trim() || 'contact@karnexus.com';
  const fromEmail = env.FROM_EMAIL?.trim() || 'onboarding@resend.dev';

  const isModuleSupport = submissionType === 'odoo_module_support' && Boolean(supportMeta);
  const submittedAt = new Date().toISOString();

  let subject: string;
  let emailText: string;
  let emailHtml: string;

  if (isModuleSupport && supportMeta) {
    const ticketId = supportMeta.ticketId?.trim() || 'KNX-SUP';
    const moduleName = supportMeta.moduleName?.trim() || service;
    const odooVersion = supportMeta.odooVersion?.trim() || 'Not specified';
    const odooEdition = supportMeta.odooEdition?.trim() || 'Not specified';
    const hosting = supportMeta.hosting?.trim() || 'Not specified';
    const requestType = supportMeta.requestType?.trim() || 'Module Support';
    const orderRef = supportMeta.orderRef?.trim() || 'Not specified';
    const subjectSummary = supportMeta.subjectSummary?.trim() || 'Module Support Query';
    const traceback = supportMeta.traceback?.trim() || '';

    subject = `[Odoo Support][${odooVersion}] ${moduleName} — ${requestType} (${ticketId})`;

    emailText = `
New Odoo Module Support Request - Karnexus Software
---------------------------------------------------
Ticket Reference: ${ticketId}
Request Type: ${requestType}
Module: ${moduleName}
Odoo Version: ${odooVersion}
Odoo Edition: ${odooEdition}
Hosting Environment: ${hosting}
Apps Store Order Ref: ${orderRef}

Customer Name: ${name}
Work Email: ${email}
Company: ${company || 'Not specified'}

Subject: ${subjectSummary}

Query Details:
${description}
${traceback ? `\nError Traceback / Server Log:\n${traceback}\n` : ''}
Submitted on: ${submittedAt}
`.trim();

    emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; line-height: 1.6; color: #1e293b;">
      <h2 style="color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Odoo Module Support Request (${escapeHtml(ticketId)})</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 170px;">Ticket Ref:</td><td style="padding: 8px; font-family: monospace;">${escapeHtml(ticketId)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Request Type:</td><td style="padding: 8px;">${escapeHtml(requestType)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Module:</td><td style="padding: 8px; font-family: monospace;">${escapeHtml(moduleName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Odoo Version:</td><td style="padding: 8px;">Odoo ${escapeHtml(odooVersion)} (${escapeHtml(odooEdition)})</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Hosting:</td><td style="padding: 8px;">${escapeHtml(hosting)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Apps Order Ref:</td><td style="padding: 8px;">${escapeHtml(orderRef)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Customer Name:</td><td style="padding: 8px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapeHtml(company || 'Not specified')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;"><strong>${escapeHtml(subjectSummary)}</strong></td></tr>
      </table>
      <h3 style="color: #0f172a; margin-top: 24px;">Query Details:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap;">${escapeHtml(description)}</div>
      ${
        traceback
          ? `<h3 style="color: #0f172a; margin-top: 24px;">Error Traceback / Server Log:</h3>
             <pre style="background-color: #0f172a; color: #f8fafc; border-radius: 6px; padding: 16px; overflow-x: auto; font-size: 12px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(traceback)}</pre>`
          : ''
      }
    </div>
  `;
  } else {
    subject = `[Project Enquiry] ${service} - ${name} (${company || 'Individual'})`;

    emailText = `
New Project Enquiry - Karnexus Software
---------------------------------------
Client Name: ${name}
Work Email: ${email}
Company: ${company || 'Not specified'}
Service Required: ${service}
Budget Range: ${budget || 'Not specified'}
Expected Timeline: ${timeline || 'Not specified'}

Project Description:
${description}

Submitted on: ${submittedAt}
`.trim();

    emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">
      <h2 style="color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Project Enquiry – Karnexus Software</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Client Name:</td><td style="padding: 8px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapeHtml(company || 'Not specified')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service Required:</td><td style="padding: 8px;">${escapeHtml(service)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget Range:</td><td style="padding: 8px;">${escapeHtml(budget || 'Not specified')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${escapeHtml(timeline || 'Not specified')}</td></tr>
      </table>
      <h3 style="color: #0f172a; margin-top: 24px;">Project Description:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap;">${escapeHtml(description)}</div>
    </div>
  `;
  }

  // 3. Dispatch via Configured Provider: Resend (Recommended) -> Brevo -> SendGrid -> Gmail SMTP
  try {
    const formattedFrom = fromEmail.includes('<')
      ? fromEmail
      : `Karnexus Software <${fromEmail}>`;

    const resendKey = env.RESEND_API_KEY?.trim();

    // Option 1: Resend API (Recommended for Cloudflare Edge)
    if (resendKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: formattedFrom,
          to: [destinationEmail],
          reply_to: email,
          subject,
          text: emailText,
          html: emailHtml,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.text();
        console.error('Resend API failed:', errorData);
        throw new Error(`Resend delivery failed: ${resendRes.status} ${errorData}`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          configured: true,
          provider: 'Resend',
          message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }

    // Option 2: Direct Gmail SMTP over cloudflare:sockets (Port 465 SSL)
    const gmailUser = (env.GMAIL_USER || env.SMTP_USER)?.trim();
    const gmailPass = (env.GMAIL_APP_PASSWORD || env.SMTP_PASS)?.trim();

    if (gmailUser && gmailPass) {
      await sendViaGmailSmtp({
        user: gmailUser,
        appPassword: gmailPass,
        to: destinationEmail,
        replyTo: email,
        subject,
        text: emailText,
        html: emailHtml,
      });

      return new Response(
        JSON.stringify({
          success: true,
          configured: true,
          provider: 'Gmail SMTP',
          message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }

    // Option B: Brevo API
    const brevoKey = env.BREVO_API_KEY?.trim();
    if (brevoKey) {
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Karnexus Software', email: fromEmail },
          to: [{ email: destinationEmail, name: 'Karnexus Admin' }],
          replyTo: { email, name },
          subject,
          textContent: emailText,
          htmlContent: emailHtml,
        }),
      });

      if (!brevoRes.ok) {
        const err = await brevoRes.text();
        console.error('Brevo API failed:', err);
        throw new Error(`Brevo delivery failed: ${brevoRes.status}`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          configured: true,
          message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }

    // Option C: SendGrid API
    const sendgridKey = env.SENDGRID_API_KEY?.trim();
    if (sendgridKey) {
      const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: destinationEmail }] }],
          from: { email: fromEmail, name: 'Karnexus Website' },
          reply_to: { email, name },
          subject,
          content: [
            { type: 'text/plain', value: emailText },
            { type: 'text/html', value: emailHtml },
          ],
        }),
      });

      if (!sendgridRes.ok) {
        const err = await sendgridRes.text();
        console.error('SendGrid API failed:', err);
        throw new Error(`SendGrid delivery failed: ${sendgridRes.status}`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          configured: true,
          message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }

    // If no email API key is set in Cloudflare environment variables
    return new Response(
      JSON.stringify({
        success: false,
        configured: false,
        error:
          'Online enquiry dispatch is not currently configured on this Cloudflare environment. Please contact us directly at contact@karnexus.com with your project details.',
        contactEmail: 'contact@karnexus.com',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  } catch (error: unknown) {
    console.error('Email dispatch error at edge worker:', error);
    return new Response(
      JSON.stringify({
        success: false,
        configured: true,
        error:
          'An internal error occurred while dispatching the message. Please contact us directly at contact@karnexus.com.',
        contactEmail: 'contact@karnexus.com',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
