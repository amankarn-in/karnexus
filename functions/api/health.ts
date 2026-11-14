/**
 * Cloudflare Pages Function: /api/health
 */

interface Env {
  GMAIL_USER?: string;
  GMAIL_APP_PASSWORD?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  RESEND_API_KEY?: string;
  BREVO_API_KEY?: string;
  SENDGRID_API_KEY?: string;
  [key: string]: string | undefined;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const hasGmail = Boolean(
    (context.env.GMAIL_USER || context.env.SMTP_USER)?.trim() &&
      (context.env.GMAIL_APP_PASSWORD || context.env.SMTP_PASS)?.trim()
  );
  const hasResend = Boolean(context.env.RESEND_API_KEY?.trim());
  const hasBrevo = Boolean(context.env.BREVO_API_KEY?.trim());
  const hasSendGrid = Boolean(context.env.SENDGRID_API_KEY?.trim());

  const isEmailConfigured = hasResend || hasGmail || hasBrevo || hasSendGrid;
  const provider = hasResend
    ? 'Resend API'
    : hasGmail
    ? 'Gmail SMTP (cloudflare:sockets)'
    : hasBrevo
    ? 'Brevo API'
    : hasSendGrid
    ? 'SendGrid API'
    : 'None';

  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'Karnexus Software Cloudflare Pages Functions API',
      runtime: 'Cloudflare Edge V8',
      provider,
      emailConfigured: isEmailConfigured,
      envDetected: {
        RESEND_API_KEY: hasResend,
        FROM_EMAIL: Boolean(context.env.FROM_EMAIL?.trim()),
        NOTIFICATION_EMAIL: Boolean(context.env.NOTIFICATION_EMAIL?.trim()),
      },
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    }
  );
}
