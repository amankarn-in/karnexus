var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../functions/api/_gmail-smtp.ts
import { connect } from "cloudflare:sockets";
async function readSmtpResponse(reader, decoder) {
  let accumulated = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    accumulated += decoder.decode(value, { stream: true });
    const lines = accumulated.split("\r\n").filter((l) => l.length > 0);
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      if (/^\d{3} /.test(lastLine)) {
        const code = parseInt(lastLine.substring(0, 3), 10);
        return { code, text: accumulated };
      }
    }
  }
  return { code: 0, text: accumulated };
}
__name(readSmtpResponse, "readSmtpResponse");
async function sendViaGmailSmtp(options) {
  const { user, appPassword, to, replyTo, subject, text, html } = options;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const socket = connect(
    { hostname: "smtp.gmail.com", port: 465 },
    { secureTransport: "on" }
  );
  await socket.opened;
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  async function sendCommand(cmd) {
    await writer.write(encoder.encode(cmd + "\r\n"));
    return await readSmtpResponse(reader, decoder);
  }
  __name(sendCommand, "sendCommand");
  try {
    const banner = await readSmtpResponse(reader, decoder);
    if (banner.code !== 220) {
      throw new Error(`Gmail SMTP connection banner failed: ${banner.text}`);
    }
    const ehlo = await sendCommand("EHLO cloudflare.worker");
    if (ehlo.code !== 250) {
      throw new Error(`EHLO failed: ${ehlo.text}`);
    }
    const authStart = await sendCommand("AUTH LOGIN");
    if (authStart.code !== 334) {
      throw new Error(`AUTH LOGIN initiation failed: ${authStart.text}`);
    }
    const authUser = await sendCommand(btoa(user));
    if (authUser.code !== 334) {
      throw new Error(`AUTH Username rejected: ${authUser.text}`);
    }
    const cleanPassword = appPassword.replace(/\s+/g, "");
    const authPass = await sendCommand(btoa(cleanPassword));
    if (authPass.code !== 235) {
      throw new Error(`Gmail authentication failed (check Google App Password): ${authPass.text}`);
    }
    const mailFrom = await sendCommand(`MAIL FROM:<${user}>`);
    if (mailFrom.code !== 250) {
      throw new Error(`MAIL FROM failed: ${mailFrom.text}`);
    }
    const rcptTo = await sendCommand(`RCPT TO:<${to}>`);
    if (rcptTo.code !== 250) {
      throw new Error(`RCPT TO failed: ${rcptTo.text}`);
    }
    const dataCmd = await sendCommand("DATA");
    if (dataCmd.code !== 354) {
      throw new Error(`DATA command failed: ${dataCmd.text}`);
    }
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const encodedSubject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
    const mimeMessage = [
      `From: "Karnexus Software" <${user}>`,
      `To: <${to}>`,
      replyTo ? `Reply-To: <${replyTo}>` : "",
      `Subject: ${encodedSubject}`,
      `Date: ${(/* @__PURE__ */ new Date()).toUTCString()}`,
      `Message-ID: <${Date.now()}@karnexus.com>`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      btoa(unescape(encodeURIComponent(text))),
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      btoa(unescape(encodeURIComponent(html))),
      ``,
      `--${boundary}--`,
      `.`
    ].filter((line) => line !== "").join("\r\n");
    const sendRes = await sendCommand(mimeMessage);
    if (sendRes.code !== 250) {
      throw new Error(`Message data transmission failed: ${sendRes.text}`);
    }
    await sendCommand("QUIT");
  } finally {
    try {
      reader.releaseLock();
    } catch {
    }
    try {
      writer.releaseLock();
    } catch {
    }
    try {
      await socket.close();
    } catch {
    }
  }
}
__name(sendViaGmailSmtp, "sendViaGmailSmtp");

// worker.ts
var getCorsHeaders = /* @__PURE__ */ __name((origin, allowedOrigin) => ({
  "Access-Control-Allow-Origin": allowedOrigin || origin || "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}), "getCorsHeaders");
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml, "escapeHtml");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGIN);
    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (url.pathname === "/api/health" || url.pathname === "/health") {
      const hasResend = Boolean(env.RESEND_API_KEY);
      const hasGmail = Boolean(
        (env.GMAIL_USER || env.SMTP_USER) && (env.GMAIL_APP_PASSWORD || env.SMTP_PASS)
      );
      const hasBrevo = Boolean(env.BREVO_API_KEY);
      const hasSendGrid = Boolean(env.SENDGRID_API_KEY);
      const isEmailConfigured = hasResend || hasGmail || hasBrevo || hasSendGrid;
      const provider = hasResend ? "Resend API" : hasGmail ? "Gmail SMTP (cloudflare:sockets)" : hasBrevo ? "Brevo API" : hasSendGrid ? "SendGrid API" : "None";
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "Karnexus Software Cloudflare Worker",
          runtime: "Cloudflare Edge V8",
          provider,
          emailConfigured: isEmailConfigured,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }
    if (url.pathname === "/api/enquire" && request.method === "POST") {
      let payload;
      try {
        payload = await request.json();
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON payload." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      const {
        name,
        email,
        company,
        service,
        budget,
        timeline,
        description,
        honeypot
      } = payload;
      if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid submission detected." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Please provide your full name." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(
          JSON.stringify({ success: false, error: "Please provide a valid work email address." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      if (!service || typeof service !== "string" || service.trim().length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Please select the service required." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      if (!description || typeof description !== "string" || description.trim().length < 10) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Please provide a brief description of your project (at least 10 characters)."
          }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      const destinationEmail = env.NOTIFICATION_EMAIL || "contact@karnexus.com";
      const fromEmail = env.FROM_EMAIL || "onboarding@resend.dev";
      const formattedFrom = fromEmail.includes("<") ? fromEmail : `Karnexus Software <${fromEmail}>`;
      const subject = `[Project Enquiry] ${service} - ${name} (${company || "Individual"})`;
      const emailText = `
New Project Enquiry - Karnexus Software
---------------------------------------
Client Name: ${name}
Work Email: ${email}
Company: ${company || "Not specified"}
Service Required: ${service}
Budget Range: ${budget || "Not specified"}
Expected Timeline: ${timeline || "Not specified"}

Project Description:
${description}

Submitted on: ${(/* @__PURE__ */ new Date()).toISOString()}
`.trim();
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">
          <h2 style="color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Project Enquiry \u2013 Karnexus Software</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Client Name:</td><td style="padding: 8px;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapeHtml(company || "Not specified")}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Service Required:</td><td style="padding: 8px;">${escapeHtml(service)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Budget Range:</td><td style="padding: 8px;">${escapeHtml(budget || "Not specified")}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${escapeHtml(timeline || "Not specified")}</td></tr>
          </table>
          <h3 style="color: #0f172a; margin-top: 24px;">Project Description:</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap;">${escapeHtml(description)}</div>
        </div>
      `;
      try {
        if (env.RESEND_API_KEY) {
          const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: formattedFrom,
              to: [destinationEmail],
              reply_to: email,
              subject,
              text: emailText,
              html: emailHtml
            })
          });
          if (!resendRes.ok) {
            const err = await resendRes.text();
            console.error("Resend API error:", err);
            throw new Error(`Resend delivery failed: ${resendRes.status} ${err}`);
          }
          return new Response(
            JSON.stringify({
              success: true,
              configured: true,
              provider: "Resend",
              message: "Thank you for contacting Karnexus Software. Your enquiry has been received."
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        const gmailUser = env.GMAIL_USER || env.SMTP_USER;
        const gmailPass = env.GMAIL_APP_PASSWORD || env.SMTP_PASS;
        if (gmailUser && gmailPass) {
          await sendViaGmailSmtp({
            user: gmailUser,
            appPassword: gmailPass,
            to: destinationEmail,
            replyTo: email,
            subject,
            text: emailText,
            html: emailHtml
          });
          return new Response(
            JSON.stringify({
              success: true,
              configured: true,
              provider: "Gmail SMTP",
              message: "Thank you for contacting Karnexus Software. Your enquiry has been received."
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        if (env.BREVO_API_KEY) {
          const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": env.BREVO_API_KEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              sender: { name: "Karnexus Software", email: fromEmail },
              to: [{ email: destinationEmail, name: "Karnexus Admin" }],
              replyTo: { email, name },
              subject,
              textContent: emailText,
              htmlContent: emailHtml
            })
          });
          if (!brevoRes.ok) {
            const err = await brevoRes.text();
            throw new Error(`Brevo delivery failed: ${brevoRes.status} ${err}`);
          }
          return new Response(
            JSON.stringify({
              success: true,
              configured: true,
              provider: "Brevo",
              message: "Thank you for contacting Karnexus Software. Your enquiry has been received."
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        if (env.SENDGRID_API_KEY) {
          const sendgridRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              personalizations: [{ to: [{ email: destinationEmail }] }],
              from: { email: fromEmail, name: "Karnexus Software" },
              reply_to: { email, name },
              subject,
              content: [
                { type: "text/plain", value: emailText },
                { type: "text/html", value: emailHtml }
              ]
            })
          });
          if (!sendgridRes.ok) {
            const err = await sendgridRes.text();
            throw new Error(`SendGrid delivery failed: ${sendgridRes.status} ${err}`);
          }
          return new Response(
            JSON.stringify({
              success: true,
              configured: true,
              provider: "SendGrid",
              message: "Thank you for contacting Karnexus Software. Your enquiry has been received."
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        return new Response(
          JSON.stringify({
            success: false,
            configured: false,
            error: "Online enquiry dispatch is not currently configured on this Cloudflare environment. Please contact us directly at contact@karnexus.com.",
            contactEmail: "contact@karnexus.com"
          }),
          { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      } catch (err) {
        console.error("Worker enquiry error:", err);
        return new Response(
          JSON.stringify({
            success: false,
            configured: true,
            error: "An internal error occurred while dispatching the message. Please contact us directly at contact@karnexus.com.",
            contactEmail: "contact@karnexus.com"
          }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response(JSON.stringify({ error: "Endpoint not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
