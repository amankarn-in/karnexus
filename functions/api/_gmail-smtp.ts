import { connect } from 'cloudflare:sockets';

export interface SendGmailOptions {
  user: string;
  appPassword: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Reads SMTP responses from Gmail, properly waiting for the terminal line.
 * In SMTP, intermediate lines look like '250-...' and the final line is '250 ...'.
 */
async function readSmtpResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  decoder: TextDecoder
): Promise<{ code: number; text: string }> {
  let accumulated = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    accumulated += decoder.decode(value, { stream: true });

    const lines = accumulated.split('\r\n').filter((l) => l.length > 0);
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      // A final line starts with a 3-digit code followed by a space (not a hyphen)
      if (/^\d{3} /.test(lastLine)) {
        const code = parseInt(lastLine.substring(0, 3), 10);
        return { code, text: accumulated };
      }
    }
  }
  return { code: 0, text: accumulated };
}

export async function sendViaGmailSmtp(options: SendGmailOptions): Promise<void> {
  const { user, appPassword, to, replyTo, subject, text, html } = options;

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Connect to Gmail SMTPS (Port 465 with implicit TLS)
  const socket = connect(
    { hostname: 'smtp.gmail.com', port: 465 },
    { secureTransport: 'on' }
  );

  await socket.opened;

  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();

  async function sendCommand(cmd: string): Promise<{ code: number; text: string }> {
    await writer.write(encoder.encode(cmd + '\r\n'));
    return await readSmtpResponse(reader, decoder);
  }

  try {
    // 1. Initial banner from Gmail (expect 220)
    const banner = await readSmtpResponse(reader, decoder);
    if (banner.code !== 220) {
      throw new Error(`Gmail SMTP connection banner failed: ${banner.text}`);
    }

    // 2. EHLO
    const ehlo = await sendCommand('EHLO cloudflare.worker');
    if (ehlo.code !== 250) {
      throw new Error(`EHLO failed: ${ehlo.text}`);
    }

    // 3. AUTH LOGIN
    const authStart = await sendCommand('AUTH LOGIN');
    if (authStart.code !== 334) {
      throw new Error(`AUTH LOGIN initiation failed: ${authStart.text}`);
    }

    // Send Base64 Username
    const authUser = await sendCommand(btoa(user));
    if (authUser.code !== 334) {
      throw new Error(`AUTH Username rejected: ${authUser.text}`);
    }

    // Send Base64 Password (clean out any spaces in the 16-character Google App Password)
    const cleanPassword = appPassword.replace(/\s+/g, '');
    const authPass = await sendCommand(btoa(cleanPassword));
    if (authPass.code !== 235) {
      throw new Error(`Gmail authentication failed (check Google App Password): ${authPass.text}`);
    }

    // 4. Envelope: MAIL FROM & RCPT TO
    const mailFrom = await sendCommand(`MAIL FROM:<${user}>`);
    if (mailFrom.code !== 250) {
      throw new Error(`MAIL FROM failed: ${mailFrom.text}`);
    }

    const rcptTo = await sendCommand(`RCPT TO:<${to}>`);
    if (rcptTo.code !== 250) {
      throw new Error(`RCPT TO failed: ${rcptTo.text}`);
    }

    // 5. DATA command
    const dataCmd = await sendCommand('DATA');
    if (dataCmd.code !== 354) {
      throw new Error(`DATA command failed: ${dataCmd.text}`);
    }

    // 6. Build MIME message (RFC 5322) with boundary for multipart/alternative
    const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    // Encode UTF-8 Subject in RFC 2047 format if contains special characters
    const encodedSubject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;

    const mimeMessage = [
      `From: "Karnexus Software" <${user}>`,
      `To: <${to}>`,
      replyTo ? `Reply-To: <${replyTo}>` : '',
      `Subject: ${encodedSubject}`,
      `Date: ${new Date().toUTCString()}`,
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
      `.`,
    ]
      .filter((line) => line !== '')
      .join('\r\n');

    const sendRes = await sendCommand(mimeMessage);
    if (sendRes.code !== 250) {
      throw new Error(`Message data transmission failed: ${sendRes.text}`);
    }

    // 7. QUIT
    await sendCommand('QUIT');
  } finally {
    try {
      reader.releaseLock();
    } catch {}
    try {
      writer.releaseLock();
    } catch {}
    try {
      await socket.close();
    } catch {}
  }
}
