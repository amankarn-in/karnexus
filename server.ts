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

// API: Project enquiry submission
app.post('/api/enquire', async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    email,
    company,
    service,
    description,
    budget,
    timeline,
    honeypot,
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
  const subject = `[Project Enquiry] ${service} - ${name} (${company || 'Individual'})`;

  const emailText = `
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

Submitted on: ${new Date().toISOString()}
  `.trim();

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">
      <h2 style="color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Project Enquiry – Karnexus Software</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Client Name:</td><td style="padding: 8px;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${company || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service Required:</td><td style="padding: 8px;">${service}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget Range:</td><td style="padding: 8px;">${budget || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${timeline || 'Not specified'}</td></tr>
      </table>
      <h3 style="color: #0f172a; margin-top: 24px;">Project Description:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap;">${description}</div>
    </div>
  `;

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
