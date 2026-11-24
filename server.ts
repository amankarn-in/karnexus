import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API: Health check & configuration status
app.get('/api/health', (_req: Request, res: Response) => {
  const hasGmail = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasBrevo = Boolean(process.env.BREVO_API_KEY);
  const hasSmtp = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
  const isEmailConfigured = hasGmail || hasResend || hasBrevo || hasSmtp;

  res.json({
    status: 'ok',
    service: 'Karnexus Software API (Cloudflare & Local Dev)',
    provider: hasResend ? 'Resend' : hasGmail ? 'Gmail SMTP' : hasBrevo ? 'Brevo' : hasSmtp ? 'SMTP' : 'None',
    emailConfigured: isEmailConfigured,
  });
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// API: Project enquiry & Odoo module support submission
app.post('/api/enquire', async (req: Request, res: Response): Promise<void> => {
  const {
    submissionType,
    name,
    email,
    company,
    service,
    description,
    budget,
    timeline,
    honeypot,
    supportMeta,
  } = req.body;

  // Basic bot/spam protection via honeypot
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    res.status(400).json({
      success: false,
      error: 'Invalid submission detected.',
    });
    return;
  }

  // Server-side validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Please provide your full name.',
    });
    return;
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid work email address.',
    });
    return;
  }

  if (!service || typeof service !== 'string' || service.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Please select the service required.',
    });
    return;
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    res.status(400).json({
      success: false,
      error: 'Please provide a brief description of your project (at least 10 characters).',
    });
    return;
  }

  const hasGmail = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasBrevo = Boolean(process.env.BREVO_API_KEY);
  const hasSmtp = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
  const isEmailConfigured = hasGmail || hasResend || hasBrevo || hasSmtp;

  if (!isEmailConfigured) {
    res.status(503).json({
      success: false,
      configured: false,
      error:
        'Online enquiry dispatch is not currently configured on this environment. Please email us directly at contact@karnexus.com with your project details.',
      contactEmail: 'contact@karnexus.com',
    });
    return;
  }

  const destinationEmail = process.env.NOTIFICATION_EMAIL || 'contact@karnexus.com';
  const senderEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  const isModuleSupport = submissionType === 'odoo_module_support' && Boolean(supportMeta);
  const submittedAt = new Date().toISOString();

  let subject: string;
  let emailText: string;
  let emailHtml: string;

  if (isModuleSupport && supportMeta) {
    const ticketId = String(supportMeta.ticketId || 'KNX-SUP').trim();
    const moduleName = String(supportMeta.moduleName || service).trim();
    const odooVersion = String(supportMeta.odooVersion || 'Not specified').trim();
    const odooEdition = String(supportMeta.odooEdition || 'Not specified').trim();
    const hosting = String(supportMeta.hosting || 'Not specified').trim();
    const requestType = String(supportMeta.requestType || 'Module Support').trim();
    const orderRef = String(supportMeta.orderRef || 'Not specified').trim();
    const subjectSummary = String(supportMeta.subjectSummary || 'Module Support Query').trim();
    const traceback = String(supportMeta.traceback || '').trim();

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

  try {
    const formattedFrom = senderEmail.includes('<')
      ? senderEmail
      : `Karnexus Software <${senderEmail}>`;

    // 1. Resend API (Same as Cloudflare Worker / Pages Functions)
    if (hasResend) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
        const errorText = await resendRes.text();
        throw new Error(`Resend delivery failed: ${errorText}`);
      }

      res.json({
        success: true,
        configured: true,
        provider: 'Resend',
        message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
      });
      return;
    }

    // 2. Direct Gmail SMTP (Node.js)
    if (hasGmail) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
        },
      });

      await transporter.sendMail({
        from: `"Karnexus Website Enquiries" <${process.env.GMAIL_USER}>`,
        to: destinationEmail,
        replyTo: email,
        subject,
        text: emailText,
        html: emailHtml,
      });

      res.json({
        success: true,
        configured: true,
        provider: 'Gmail SMTP',
        message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
      });
      return;
    }

    // 2. SMTP Transport
    if (hasSmtp) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Karnexus Website Enquiries" <${senderEmail}>`,
        to: destinationEmail,
        replyTo: email,
        subject,
        text: emailText,
        html: emailHtml,
      });

      res.json({
        success: true,
        configured: true,
        message: 'Thank you for contacting Karnexus Software. Your enquiry has been received.',
      });
      return;
    }

    res.status(503).json({
      success: false,
      configured: false,
      error: 'No valid email delivery provider configured.',
    });
  } catch (error: unknown) {
    console.error('Failed to send email:', error);
    res.status(500).json({
      success: false,
      configured: true,
      error: 'An internal error occurred while dispatching the message. Please contact us directly at contact@karnexus.com.',
      contactEmail: 'contact@karnexus.com',
    });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Karnexus Software server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
