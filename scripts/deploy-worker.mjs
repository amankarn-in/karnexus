import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SECRET_KEYS = [
  'RESEND_API_KEY',
  'BREVO_API_KEY',
  'SENDGRID_API_KEY',
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'SMTP_USER',
  'SMTP_PASS',
];

const VAR_KEYS = ['FROM_EMAIL', 'NOTIFICATION_EMAIL', 'ALLOWED_ORIGIN'];

const secrets = {};
for (const key of SECRET_KEYS) {
  const value = process.env[key]?.trim();
  if (value) {
    secrets[key] = value;
  }
}

const extraArgs = process.argv.slice(2);
const wranglerArgs = ['wrangler', 'deploy', ...extraArgs];

for (const key of VAR_KEYS) {
  const value = process.env[key]?.trim();
  if (value) {
    wranglerArgs.push('--var', `${key}:${value}`);
  }
}

let tempDir = null;

try {
  if (Object.keys(secrets).length > 0) {
    tempDir = mkdtempSync(join(tmpdir(), 'cf-secrets-'));
    const secretsPath = join(tempDir, 'secrets.json');
    writeFileSync(secretsPath, JSON.stringify(secrets), { mode: 0o600 });
    wranglerArgs.push('--secrets-file', secretsPath);
    console.log(
      `[deploy:worker] Syncing ${Object.keys(secrets).length} runtime secret(s) to Cloudflare Worker...`
    );
  } else {
    console.log(
      '[deploy:worker] No build-time secret env vars detected; running standard wrangler deploy.'
    );
  }

  execFileSync('npx', wranglerArgs, { stdio: 'inherit' });
} finally {
  if (tempDir) {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
