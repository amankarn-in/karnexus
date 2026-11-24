/**
 * Configuration for Odoo Apps Store Module Support.
 *
 * Deep-linking from Odoo Apps Store documentation (`static/description/index.html`):
 * Link your "Support" or "Need Help?" button directly to:
 *   https://karnexus.com/odoo-module-support?module=YOUR_MODULE_TECHNICAL_NAME&version=18.0
 *
 * Supported query parameters (all optional, case-insensitive aliases supported):
 * - `module` (aliases: `app`, `addon`)       -> Pre-fills & locks the module name/technical name
 * - `version` (aliases: `odoo_version`, `v`) -> Pre-selects Odoo version (e.g. 19.0, 18.0, 17.0, 16.0, 15.0)
 * - `edition` (alias: `ed`)                  -> Pre-selects Community or Enterprise
 * - `type` (alias: `issue`)                  -> Pre-selects bug | installation | enhancement | upgrade | presales
 * - `order` (alias: `ref`)                   -> Pre-fills Odoo Apps Store order/invoice reference
 */

export interface OdooStoreModule {
  /** Odoo module technical name, e.g. 'knx_sale_approval' */
  technicalName: string;
  /** Human-friendly display title shown on Odoo Apps Store */
  name: string;
  /** Supported Odoo versions for this module */
  versions: string[];
  /** Optional Odoo Apps Store listing URL */
  storeUrl?: string;
}

export type SupportRequestTypeId =
  | 'bug'
  | 'installation'
  | 'enhancement'
  | 'upgrade'
  | 'presales';

export interface SupportRequestTypeOption {
  id: SupportRequestTypeId;
  label: string;
  shortLabel: string;
  subjectPlaceholder: string;
  queryPlaceholder: string;
  showTracebackByDefault: boolean;
}

export const ODOO_VERSIONS: string[] = [
  '19.0',
  '18.0',
  '17.0',
  '16.0',
  '15.0',
  '14.0',
  'Older / Custom',
];

export const ODOO_EDITIONS: string[] = [
  'Community',
  'Enterprise',
  'Not sure',
];

export const ODOO_HOSTING_ENVIRONMENTS: string[] = [
  'Odoo.sh',
  'Self-Hosted (VPS / Docker)',
  'On-Premise Server',
  'Odoo Online (SaaS)',
  'Local / Staging',
];

export const SUPPORT_REQUEST_TYPES: SupportRequestTypeOption[] = [
  {
    id: 'bug',
    label: 'Bug Report / Error',
    shortLabel: 'Bug Report',
    subjectPlaceholder: 'e.g. Validation error when confirming invoice with module enabled',
    queryPlaceholder:
      'Describe what happened, the exact steps to reproduce the issue, and what you expected to happen...',
    showTracebackByDefault: true,
  },
  {
    id: 'installation',
    label: 'Installation & Setup',
    shortLabel: 'Setup Help',
    subjectPlaceholder: 'e.g. Assistance configuring access rights or initial settings',
    queryPlaceholder:
      'Share where you are in the installation or setup process, any missing Python dependencies, or configuration questions...',
    showTracebackByDefault: true,
  },
  {
    id: 'enhancement',
    label: 'Feature Enhancement',
    shortLabel: 'Enhancement',
    subjectPlaceholder: 'e.g. Add multi-warehouse filter or custom PDF field to report',
    queryPlaceholder:
      'Describe the workflow improvement or custom feature you would like added to this module and how your team plans to use it...',
    showTracebackByDefault: false,
  },
  {
    id: 'upgrade',
    label: 'Version Upgrade / Port',
    shortLabel: 'Version Port',
    subjectPlaceholder: 'e.g. Request migration or release availability for Odoo 18.0 / 19.0',
    queryPlaceholder:
      'Let us know your current Odoo version, target version, and whether you have local customizations on top of the module...',
    showTracebackByDefault: false,
  },
  {
    id: 'presales',
    label: 'Pre-Sales Question',
    shortLabel: 'Pre-Sales',
    subjectPlaceholder: 'e.g. Compatibility check with Enterprise accounting or multi-company',
    queryPlaceholder:
      'Ask about compatibility, multi-company behavior, Odoo.sh readiness, or specific use cases before purchasing...',
    showTracebackByDefault: false,
  },
];

/**
 * Optional catalog of your published Odoo Apps Store modules.
 * Add entries here if you want them listed in quick-select suggestions.
 * Note: Any module name passed via `?module=...` in a store documentation link
 * works automatically even if it is not listed below.
 */
export const odooStoreModules: OdooStoreModule[] = [];

export function normalizeOdooVersion(raw: string | null): string {
  if (!raw) return '';
  const cleaned = raw.trim().toLowerCase().replace(/^odoo\s*/i, '').replace(/^v/i, '');
  if (!cleaned) return '';

  // Match exact version like "18.0" or major version like "18"
  const majorMatch = cleaned.match(/^(\d{2})(?:\.0)?$/);
  if (majorMatch) {
    const normalized = `${majorMatch[1]}.0`;
    if (ODOO_VERSIONS.includes(normalized)) {
      return normalized;
    }
    const majorNum = parseInt(majorMatch[1], 10);
    if (majorNum < 14) {
      return 'Older / Custom';
    }
    return normalized;
  }

  const exactMatch = ODOO_VERSIONS.find((v) => v.toLowerCase() === cleaned);
  return exactMatch || raw.trim();
}

export function normalizeEdition(raw: string | null): string {
  if (!raw) return '';
  const cleaned = raw.trim().toLowerCase();
  if (cleaned === 'ce' || cleaned === 'community' || cleaned === 'odoo community') {
    return 'Community';
  }
  if (cleaned === 'ee' || cleaned === 'enterprise' || cleaned === 'odoo enterprise') {
    return 'Enterprise';
  }
  return '';
}

export function normalizeRequestType(raw: string | null): SupportRequestTypeId {
  if (!raw) return 'bug';
  const cleaned = raw.trim().toLowerCase();
  if (['install', 'installation', 'setup', 'config', 'configuration'].includes(cleaned)) {
    return 'installation';
  }
  if (['enhancement', 'feature', 'custom', 'customization', 'request'].includes(cleaned)) {
    return 'enhancement';
  }
  if (['upgrade', 'migration', 'port', 'version'].includes(cleaned)) {
    return 'upgrade';
  }
  if (['presales', 'pre-sales', 'sales', 'question', 'query'].includes(cleaned)) {
    return 'presales';
  }
  return 'bug';
}

export function resolveModuleFromQuery(raw: string | null): {
  moduleName: string;
  matchedModule: OdooStoreModule | null;
} {
  if (!raw || !raw.trim()) {
    return { moduleName: '', matchedModule: null };
  }

  const cleaned = raw.trim();
  const lower = cleaned.toLowerCase();
  const matched =
    odooStoreModules.find(
      (mod) =>
        mod.technicalName.toLowerCase() === lower ||
        mod.name.toLowerCase() === lower
    ) || null;

  return {
    moduleName: matched ? `${matched.name} (${matched.technicalName})` : cleaned,
    matchedModule: matched,
  };
}

export function generateSupportTicketId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `KNX-SUP-${suffix}`;
}
