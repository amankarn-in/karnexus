/**
 * Central configuration file for Karnexus Software.
 * Update company information, services, contact details, and links here.
 */

export interface SiteConfig {
  companyName: string;
  domain: string;
  baseUrl: string;
  founder: {
    name: string;
    role: string;
    bio: string;
    skills: string[];
  };
  contact: {
    email: string;
    /**
     * Phone or WhatsApp number. Leave empty or null if not yet provided.
     * When empty, phone and WhatsApp buttons are automatically omitted from the UI.
     */
    phone: string | null;
    whatsapp: string | null;
    /**
     * Booking link (e.g. Calendly). Leave null if not configured.
     */
    bookingUrl: string | null;
    location: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  disclaimer: string;
}

export const siteConfig: SiteConfig = {
  companyName: 'Karnexus Software',
  domain: 'karnexus.com',
  baseUrl: 'https://karnexus.com',
  founder: {
    name: 'Senior Freelance Engineer',
    role: 'Principal Odoo & Python Specialist',
    bio: 'Independent freelance software engineering practice delivering hands-on Odoo ERP implementations and robust Python backend systems. Direct technical communication without layers of account management.',
    skills: ['Odoo ERP', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'Docker', 'RESTful APIs', 'JavaScript', 'Linux Systems'],
  },
  contact: {
    email: 'contact@karnexus.com',
    phone: null, // Configurable: Add formatted phone number e.g. "+91 98765 43210" when available
    whatsapp: null, // Configurable: Add WhatsApp phone string e.g. "+919876543210" when available
    bookingUrl: null, // Configurable: Add scheduling URL when available
    location: 'India',
  },
  hero: {
    headline: 'Odoo expertise. Python innovation. Software built for your business.',
    subheadline:
      'Karnexus Software helps businesses implement, customize, migrate, and integrate Odoo, while building Python applications, APIs, and automation tailored to their workflows.',
    primaryCta: 'Discuss Your Project',
    secondaryCta: 'Explore Our Services',
  },
  disclaimer:
    'Karnexus Software is an independent software services provider specializing in Odoo and Python engineering. We are not officially affiliated with or endorsed by Odoo S.A.',
};

export interface ServiceItem {
  id: string;
  title: string;
  category: 'odoo' | 'python';
  shortDescription: string;
  businessProblem: string;
  scopeOfEngagement: string[];
  deliverables: string[];
  techStack?: string[];
}

export const odooServices: ServiceItem[] = [
  {
    id: 'odoo-implementation',
    title: 'Odoo Implementation',
    category: 'odoo',
    shortDescription:
      'End-to-end ERP implementation mapped to your real operations, avoiding bloated setups and misaligned workflows.',
    businessProblem:
      'Off-the-shelf software often forces companies into rigid processes, while unstructured ERP deployments run over budget and cause operational confusion.',
    scopeOfEngagement: [
      'Comprehensive business requirements gathering and process audits',
      'Operational workflow mapping across Sales, Purchase, Inventory, and Accounting',
      'System parameter setup, chart of accounts configuration, and access permissions',
      'Historical master and transactional data import (cleaning, mapping, validation)',
      'Hands-on staff training with tailored SOP documentation',
      'Dedicated go-live support, cutover monitoring, and early operational stabilization',
    ],
    deliverables: [
      'Configured production Odoo environment',
      'Validated data import log and mapping sheets',
      'Standard Operating Procedure (SOP) quick-reference guides',
      'Post-launch stabilization signoff',
    ],
    techStack: ['Odoo 15–18', 'PostgreSQL', 'Python', 'Docker', 'Ubuntu/Debian'],
  },
  {
    id: 'odoo-migration',
    title: 'Version Migration',
    category: 'odoo',
    shortDescription:
      'Safe, structured upgrade path from legacy Odoo versions with complete data integrity and zero business interruption.',
    businessProblem:
      'Running outdated Odoo versions introduces security vulnerabilities, blocks modern features, and risks custom module breakage during standard upgrades.',
    scopeOfEngagement: [
      'Audit of existing codebase, third-party apps, and custom extensions',
      'Custom module compatibility refactoring for the target Odoo version',
      'Database schema migration planning and trial dry-runs on staging',
      'Data integrity verification and regression testing on core business flows',
      'Pre-scheduled off-hours cutover and production deployment',
    ],
    deliverables: [
      'Modernized, upgraded custom module repository',
      'Migrated and integrity-checked production database',
      'Migration report documenting schema adjustments and test results',
    ],
    techStack: ['OpenUpgrade / Native Scripts', 'PostgreSQL', 'Python', 'Git'],
  },
  {
    id: 'odoo-customization',
    title: 'Odoo Customization',
    category: 'odoo',
    shortDescription:
      'Tailoring views, reports, business logic, and security rules without compromising future maintainability.',
    businessProblem:
      'Standard ERP views and document templates frequently omit industry-specific fields, approval hierarchies, and company branding requirements.',
    scopeOfEngagement: [
      'Form, tree, kanban, and search view modifications using inheritance (no core hacks)',
      'Automated server actions and multi-level approval triggers',
      'Customized QWeb reports (quotations, tax invoices, delivery slips, purchase orders)',
      'Granular record-level access rules and user security group configurations',
      'Business logic validation and field computations',
    ],
    deliverables: [
      'Inherited, clean XML view and model extensions',
      'Custom styled QWeb PDF documents',
      'Documented security access matrix',
    ],
    techStack: ['Python', 'XML/QWeb', 'JavaScript/OWL', 'PostgreSQL'],
  },
  {
    id: 'odoo-custom-modules',
    title: 'Custom Module Development',
    category: 'odoo',
    shortDescription:
      'High-performance, standalone modules engineered for unique operational models and specialized business logic.',
    businessProblem:
      'Generic marketplace modules can introduce heavy technical debt, unwanted dependencies, or performance lag if poorly engineered.',
    scopeOfEngagement: [
      'Architectural planning adhering strictly to Odoo community development best practices',
      'Clean data model definition with appropriate indexes and relational integrity',
      'Interactive UI development leveraging Odoo OWL (Odoo Web Library) components',
      'Automated unit tests to ensure long-term stability and update readiness',
      'Complete technical documentation and clean version-controlled repository',
    ],
    deliverables: [
      'Self-contained, production-grade custom Odoo module(s)',
      'Unit test suite covering critical business calculations',
      'Installation guide and developer reference documentation',
    ],
    techStack: ['Python 3.10+', 'OWL (Odoo Web Library)', 'PostgreSQL', 'Git'],
  },
  {
    id: 'odoo-integrations',
    title: 'System & API Integrations',
    category: 'odoo',
    shortDescription:
      'Seamless data exchange between Odoo and ecommerce platforms, payment gateways, couriers, and analytics tools.',
    businessProblem:
      'Siloed software leads to duplicate manual data entry, mismatched inventory counts, and delayed order fulfillments.',
    scopeOfEngagement: [
      'E-commerce synchronization (Shopify, WooCommerce, custom webshops)',
      'Payment gateway integrations with automated reconciliation hooks',
      'Shipping carrier and courier API integration for automated label and tracking generation',
      'Bi-directional CRM, customer messaging, and marketing platform connections',
      'Robust error handling, retry queues, and sync failure notification alerts',
    ],
    deliverables: [
      'Automated bi-directional connectors',
      'Webhook listener endpoints with secure HMAC authentication',
      'Sync status logs and monitoring dashboard in Odoo',
    ],
    techStack: ['REST APIs', 'FastAPI proxy', 'Webhooks', 'XML-RPC / JSON-RPC', 'PostgreSQL'],
  },
  {
    id: 'odoo-support',
    title: 'Support and Maintenance',
    category: 'odoo',
    shortDescription:
      'Proactive system health checks, rapid issue triage, performance tuning, and ongoing functional enhancements.',
    businessProblem:
      'ERP downtime or slow queries during peak operating hours directly halt order processing, shipments, and billing.',
    scopeOfEngagement: [
      'Direct developer triage for critical operational incidents and unexpected errors',
      'Database query optimization, vacuuming, and slow query profiling',
      'Bug fixes in custom modules and configuration adjustments',
      'Regular security patch audits and minor version maintenance updates',
      'Scheduled monthly review of system performance metrics',
    ],
    deliverables: [
      'Rapid incident resolution with direct engineering communication',
      'System tuning report (PostgreSQL & Odoo worker settings)',
      'Change log of resolved issues and applied patches',
    ],
    techStack: ['PostgreSQL Tuning', 'Linux Diagnostics', 'Python Profiling', 'Sentry/Logs'],
  },
  {
    id: 'odoo-deployment',
    title: 'Deployment & Infrastructure',
    category: 'odoo',
    shortDescription:
      'Production-ready Odoo hosting setup with Docker containerization, automated backups, and staging environments.',
    businessProblem:
      'Improperly configured servers suffer from memory leaks, unmanaged worker allocation, and lack of automated disaster recovery.',
    scopeOfEngagement: [
      'Containerized deployment using Docker and Docker Compose for easy portability',
      'Multi-environment architecture: Development, Staging, and Production',
      'NGINX reverse proxy configuration with SSL termination and WebSocket/longpolling support',
      'Automated daily offsite database backup scripts with retention policies',
      'Server resource monitoring and worker process tuning',
    ],
    deliverables: [
      'Reproducible Docker Compose repository & environment configs',
      'Configured NGINX reverse proxy with auto-renewing SSL',
      'Automated disaster recovery backup routine and tested restore procedure',
    ],
    techStack: ['Docker', 'Docker Compose', 'NGINX', 'PostgreSQL', 'Linux (Ubuntu/Debian)', 'Cloud VPS'],
  },
];

export const pythonServices: ServiceItem[] = [
  {
    id: 'python-backend',
    title: 'Backend Development (FastAPI & Django)',
    category: 'python',
    shortDescription:
      'Scalable, clean-architecture backends designed for enterprise reliability, high concurrency, and clean maintainability.',
    businessProblem:
      'Monolithic or poorly organized backends become slow, difficult to test, and expensive to modify as transaction volume expands.',
    scopeOfEngagement: [
      'Domain-driven architecture planning with separation of business logic and persistence',
      'FastAPI applications for asynchronous, high-throughput microservices and APIs',
      'Django systems for complex administrative interfaces, ORM-heavy models, and rapid feature delivery',
      'Database design, normalization, migrations, and query indexing',
      'Thorough test suites (pytest) for business logic and API contracts',
    ],
    deliverables: [
      'Clean, modular Python repository with type annotations',
      'Fully documented OpenAPI / Swagger schema',
      'Automated test suite with continuous integration configuration',
    ],
    techStack: ['Python 3.11+', 'FastAPI', 'Django / Django REST Framework', 'Pydantic', 'SQLAlchemy / Django ORM', 'PostgreSQL'],
  },
  {
    id: 'python-apis',
    title: 'REST API & Third-Party Integrations',
    category: 'python',
    shortDescription:
      'Robust API endpoints, webhook listeners, and third-party connector microservices built to handle failure gracefully.',
    businessProblem:
      'External APIs experience rate limits, intermittent timeouts, and payload format changes that crash fragile consumer code.',
    scopeOfEngagement: [
      'Secure RESTful API design adhering to standard status codes and structured error payloads',
      'Resilient integration with third-party SaaS APIs (payment, CRM, logistics, accounting)',
      'Idempotent webhook receivers with cryptographic signature verification',
      'Rate-limiting, request throttling, and exponential backoff retry policies',
      'Clear interactive API documentation via OpenAPI/Swagger',
    ],
    deliverables: [
      'Hardened API endpoints with input validation via Pydantic',
      'Webhook handling pipeline with failure isolation',
      'Postman / HTTP client test collections',
    ],
    techStack: ['FastAPI', 'httpx / aiohttp', 'Pydantic v2', 'Redis', 'OAuth2 / JWT'],
  },
  {
    id: 'python-automation',
    title: 'Business Automation & Scheduled Jobs',
    category: 'python',
    shortDescription:
      'Automated background processing, batch jobs, and headless scripts eliminating repetitive operational tasks.',
    businessProblem:
      'Manual report generation, spreadsheet copying, and periodic status updates consume hundreds of staff hours and introduce human error.',
    scopeOfEngagement: [
      'Asynchronous task workers for heavy background jobs using Celery or background runners',
      'Cron-based periodic data pipelines (daily reconciliations, invoice aggregations)',
      'Automated file parsing, spreadsheet sanitization (Excel/CSV), and validation',
      'Automated email/Slack alert dispatch for operational exceptions',
    ],
    deliverables: [
      'Reliable task pipeline with dead-letter queue and retry capabilities',
      'Execution logs and alerting for failed runs',
      'Clear scheduling configuration and runbooks',
    ],
    techStack: ['Celery / RQ', 'Redis', 'Pandas / OpenPyXL', 'Cron / Systemd', 'Python'],
  },
  {
    id: 'python-sync',
    title: 'Data Synchronization & Reporting Workflows',
    category: 'python',
    shortDescription:
      'High-integrity data sync pipelines connecting ERPs, databases, data warehouses, and BI dashboards.',
    businessProblem:
      'Disparate business software leads to contradictory metrics, lagging business intelligence, and lost transaction records.',
    scopeOfEngagement: [
      'Incremental change-data-capture (CDC) and polling synchronizations',
      'Conflict-resolution logic for bidirectional syncing between systems',
      'ETL scripts converting operational ERP records into analytical schemas',
      'Direct data feeding for Power BI, Metabase, and custom reporting tools',
    ],
    deliverables: [
      'Robust synchronization engine with state checkpoints',
      'Schema-mapped analytical tables or views',
      'Auditing log displaying synced records and error tallies',
    ],
    techStack: ['Python', 'PostgreSQL', 'DuckDB / Pandas', 'REST APIs', 'Power BI / Metabase'],
  },
  {
    id: 'python-maintenance',
    title: 'Legacy Code Maintenance & Optimization',
    category: 'python',
    shortDescription:
      'Diagnosing performance bottlenecks, fixing elusive bugs, upgrading Python runtimes, and refactoring fragile codebases.',
    businessProblem:
      'Existing applications with outdated dependencies or unindexed database queries suffer from slow response times and unaddressed security advisories.',
    scopeOfEngagement: [
      'Deep architectural audit and dependency vulnerability analysis',
      'Slow database query profiling and index optimization',
      'Memory and CPU profiling to eradicate bottlenecks and leakages',
      'Refactoring messy legacy modules into testable, type-annotated services',
      'Python version upgrades (e.g. migrating legacy 3.7/3.8 codebases to Python 3.11+)',
    ],
    deliverables: [
      'Benchmark report comparing before-and-after latency and memory footprints',
      'Refactored and tested codebase with modernized dependency lockfiles',
      'Documentation of resolved issues and architectural guidelines',
    ],
    techStack: ['cProfile / Py-Spy', 'pytest', 'PostgreSQL EXPLAIN ANALYZE', 'Ruff / MyPy'],
  },
];

export interface DeliveryStep {
  number: string;
  title: string;
  description: string;
  activities: string[];
}

export const deliveryProcess: DeliveryStep[] = [
  {
    number: '01',
    title: 'Discovery & Scope Alignment',
    description:
      'We examine your operational processes, data flows, and pain points to define a clear, non-negotiable scope before writing any code.',
    activities: [
      'Workflow review and stakeholder interviews',
      'Data mapping and legacy system evaluation',
      'Feasibility analysis and architecture blueprint',
      'Transparent milestone-based timeline proposal',
    ],
  },
  {
    number: '02',
    title: 'Architecture & Technical Planning',
    description:
      'We design maintainable data models, database schemas, and integration points to avoid rework down the road.',
    activities: [
      'PostgreSQL schema and model relationship design',
      'API contract specification (OpenAPI schemas)',
      'Security role permissions and data access boundary planning',
      'Staging environment and Docker container setup',
    ],
  },
  {
    number: '03',
    title: 'Iterative Development',
    description:
      'We write clean, documented code in short milestones, providing continuous access to staging environments for early feedback.',
    activities: [
      'Adherence to Odoo community and PEP8 coding standards',
      'Automated unit and integration testing',
      'Weekly staging updates for hands-on review',
      'Direct technical communication throughout',
    ],
  },
  {
    number: '04',
    title: 'Rigorous Testing & Data Verification',
    description:
      'We validate business logic against real edge cases and dry-run data migrations until numbers match down to the cent.',
    activities: [
      'Edge-case testing across operational workflows',
      'Dry-run data imports and reconciliation checks',
      'Performance profiling under concurrent simulated load',
      'User Acceptance Testing (UAT) guidance',
    ],
  },
  {
    number: '05',
    title: 'Cutover & Production Deployment',
    description:
      'We execute planned cutover checklists during scheduled windows, minimizing business downtime to near zero.',
    activities: [
      'Pre-scheduled off-hours cutover window',
      'Final delta data sync and migration validation',
      'NGINX, SSL, and automated backup verification',
      'Direct go-live monitoring with immediate priority response',
    ],
  },
  {
    number: '06',
    title: 'Documentation, Handover & Support',
    description:
      'We deliver clean repositories, system documentation, and administrator guides so you retain total ownership of your software.',
    activities: [
      'Complete Git repository handover with clean commit history',
      'System runbooks and administrator guides',
      'User training recordings or documentation',
      'Structured post-launch warranty and maintenance support',
    ],
  },
];

export interface WhyWorkWithUsItem {
  title: string;
  description: string;
}

export const whyWorkWithUs: WhyWorkWithUsItem[] = [
  {
    title: 'Direct Technical Communication',
    description:
      'You talk directly with the freelance engineer building your system. No non-technical account managers translating your requirements incorrectly.',
  },
  {
    title: 'Maintainable, Future-Proof Code',
    description:
      'We write clean Odoo modules using proper inheritance and standard Python patterns. We never hack core files, ensuring your system remains upgradeable.',
  },
  {
    title: 'Clear, Realistic Scope',
    description:
      'We define clear milestones, honest timelines, and tangible deliverables. We do not make vague promises or upsell unnecessary bloated modules.',
  },
  {
    title: 'Thorough Technical Documentation',
    description:
      'Every module, API, and deployment includes clear documentation, schema models, and operational runbooks for your team.',
  },
  {
    title: 'Structured Handover & Full Code Ownership',
    description:
      'All custom code, configurations, and scripts belong entirely to your company. No vendor lock-in or proprietary licensing traps.',
  },
];

export interface ExampleSolution {
  id: string;
  title: string;
  category: string;
  problemScenario: string;
  architecturalSolution: string;
  technologies: string[];
  keyOutcomes: string[];
}

export const exampleSolutions: ExampleSolution[] = [
  {
    id: 'ecommerce-sync',
    title: 'Odoo & E-Commerce Synchronization',
    category: 'Odoo Integration',
    problemScenario:
      'A multi-channel retailer manually entered online webshop orders into Odoo, leading to stock discrepancies, delayed fulfillments, and duplicate customer records.',
    architecturalSolution:
      'Constructed a reliable bi-directional connector using webhooks and Python middleware. Orders and customer records ingest into Odoo in near real-time, while inventory counts push out to online stores automatically on stock changes.',
    technologies: ['Odoo 17', 'Shopify / WooCommerce REST APIs', 'Python Webhooks', 'PostgreSQL'],
    keyOutcomes: [
      'Eliminated manual order re-entry',
      'Real-time inventory synchronization preventing overselling',
      'Automated invoice generation and payment tracking',
    ],
  },
  {
    id: 'proof-of-delivery',
    title: 'Proof-of-Delivery API Integration',
    category: 'Logistics & API',
    problemScenario:
      'A wholesale distributor struggled to verify delivered goods without paper notes, delaying customer billing and invoice disputes.',
    architecturalSolution:
      'Integrated courier and mobile driver APIs with Odoo Delivery Orders. Webhook events capture GPS coordinates, timestamps, and digital customer signatures, directly attaching them to the Odoo Picking document and triggering automatic invoicing.',
    technologies: ['Odoo Inventory', 'FastAPI Webhook Receiver', 'Courier API', 'QWeb PDF'],
    keyOutcomes: [
      'Instant delivery confirmation attached directly to ERP pickings',
      'Automated transition from delivery to invoice creation',
      'Reduction in billing disputes and reconciliation time',
    ],
  },
  {
    id: 'powerbi-reporting',
    title: 'Odoo Reporting & Power BI Connectivity',
    category: 'Analytics & Data',
    problemScenario:
      'Executive leadership needed advanced cross-departmental financial and sales dashboards that standard ERP reporting could not cleanly visualize.',
    architecturalSolution:
      'Designed optimized PostgreSQL analytical views on a dedicated read-replica. Configured secure gateway pipelines allowing Power BI and Metabase to pull pre-aggregated datasets without impacting transactional ERP query performance.',
    technologies: ['PostgreSQL Analytical Views', 'Power BI Gateway', 'Python ETL', 'Odoo Core Models'],
    keyOutcomes: [
      'Interactive executive dashboards with automated daily refreshes',
      'Zero impact on live Odoo transaction performance',
      'Consolidated multi-company financial and inventory metrics',
    ],
  },
  {
    id: 'approval-workflows',
    title: 'Custom Multi-Tier Approval Workflows',
    category: 'Odoo Customization',
    problemScenario:
      'An organization required strict multi-level managerial authorization for high-value purchase orders and capital expenditures before vendor confirmation.',
    architecturalSolution:
      'Built a dedicated custom Odoo module adding tiered approval thresholds based on company cost centers, department rules, and order amounts, complete with secure one-click email signoff tokens.',
    technologies: ['Odoo Purchase & Accounting', 'Python Server Actions', 'Custom OWL Views', 'Access Control Lists'],
    keyOutcomes: [
      'Enforced compliance without manual paper trail sign-offs',
      'Mobile-friendly email action tokens for rapid manager approvals',
      'Comprehensive audit log for internal and external compliance',
    ],
  },
  {
    id: 'python-automation-apis',
    title: 'Python Automation & Backend APIs',
    category: 'Python Backend',
    problemScenario:
      'A software company needed to process thousands of partner data feeds nightly and expose high-throughput endpoints to external client applications.',
    architecturalSolution:
      'Engineered an asynchronous FastAPI backend backed by Redis queues and Celery background workers. The service ingests large JSON/CSV payloads, validates schemas using Pydantic, and synchronizes clean data into downstream services.',
    technologies: ['Python 3.11', 'FastAPI', 'Redis', 'Celery', 'PostgreSQL', 'Docker'],
    keyOutcomes: [
      'Sub-50ms API response times under high concurrency',
      'Resilient queue-based data parsing with automatic failure retries',
      'Interactive OpenAPI documentation with automated schema validation',
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Which versions of Odoo do you support?',
    answer:
      'We work with both Odoo Community and Enterprise editions, primarily versions 15, 16, 17, and 18. We also handle migration and upgrade paths for legacy systems from version 12 onwards.',
  },
  {
    question: 'How do you ensure custom modules do not break during future Odoo upgrades?',
    answer:
      'We strictly follow Odoo architectural guidelines: using model and view inheritance without editing core source code, organizing clean XML structures, avoiding direct monkey-patching, and isolating external dependencies in self-contained custom addons.',
  },
  {
    question: 'What is your typical engagement model?',
    answer:
      'We work either on a fixed-scope milestone basis for well-defined implementations, migrations, and modules, or on a flexible monthly engineering retainer for ongoing maintenance, support, and continuous feature development.',
  },
  {
    question: 'Who will actually work on my project?',
    answer:
      'You work directly with your dedicated freelance engineer. Unlike large agencies that assign senior salespeople and then hand off code to junior contractors, you receive senior-level engineering attention throughout the entire lifecycle.',
  },
  {
    question: 'How do you handle source code ownership and deployments?',
    answer:
      'You retain 100% intellectual property ownership of all custom code written for your business. We commit code to your private Git repositories and provide documented Docker deployment scripts for your own hosting infrastructure.',
  },
  {
    question: 'Can you integrate Odoo with our existing internal software or custom database?',
    answer:
      'Yes. Through Odoo’s external APIs (XML-RPC / JSON-RPC) or custom Python FastAPI microservices, we build reliable connectors to databases, external SaaS tools, legacy ERPs, and custom web applications.',
  },
];

export const commonChallenges = [
  {
    title: 'Disjointed Manual Processes',
    description:
      'Teams copy-pasting numbers between spreadsheets, emails, and outdated software, introducing human errors and delayed customer orders.',
  },
  {
    title: 'Stuck on Legacy ERP Versions',
    description:
      'Fearing upgrade risks because previous consultants hacked core code or left unmaintained custom modules without documentation.',
  },
  {
    title: 'Slow Queries & Server Bottlenecks',
    description:
      'Odoo or database instances crawling under peak transaction volume due to unoptimized PostgreSQL configurations and unindexed queries.',
  },
  {
    title: 'Brittle Third-Party Integrations',
    description:
      'Order syncs breaking silently, inventory mismatches with e-commerce stores, and courier APIs failing without notification alerts.',
  },
  {
    title: 'Lack of Direct Technical Communication',
    description:
      'Frustration with agency middlemen who lack deep Odoo/Python technical knowledge, leading to slow turnaround and misaligned deliverables.',
  },
];

export interface EditionFeature {
  feature: string;
  category: string;
  community: string;
  enterprise: string;
  notes?: string;
}

export const odooEditionsComparison: EditionFeature[] = [
  {
    feature: 'License Type & Cost',
    category: 'Licensing',
    community: '100% Free Open Source (LGPLv3)',
    enterprise: 'Proprietary Subscription (per user / month or annual)',
    notes: 'Community has no recurring software license fees. Enterprise requires an ongoing license contract with Odoo S.A.',
  },
  {
    feature: 'Source Code Access',
    category: 'Architecture',
    community: 'Complete access to all source code on GitHub',
    enterprise: 'Complete access to core + enterprise private repository',
    notes: 'Both allow self-hosting, but Enterprise requires license key validation.',
  },
  {
    feature: 'Custom Python Module Support',
    category: 'Development',
    community: 'Unlimited custom Python modules on VPS / Docker',
    enterprise: 'Supported on Odoo.sh & Self-Hosted (NOT supported on Odoo Online SaaS)',
    notes: 'Karnexus builds clean, upgrade-safe modules for both Community and Enterprise.',
  },
  {
    feature: 'Core ERP (Sales, Purchase, Invoicing, Stock)',
    category: 'Core Modules',
    community: 'Fully Functional (Standard Business Flows)',
    enterprise: 'Fully Functional + Enhanced UX & Shortcuts',
  },
  {
    feature: 'Advanced Accounting & Reconciliation',
    category: 'Financials',
    community: 'Invoicing & Payments (Advanced features via community addons or third-party)',
    enterprise: 'Full Bank Feeds, Dynamic Reports, AI OCR Invoicing & Asset Depreciation',
    notes: 'Community accounting can be supplemented with OCA (Odoo Community Association) modules.',
  },
  {
    feature: 'Odoo Studio (No-Code Customizer)',
    category: 'Customization',
    community: 'Not Included (Customization via clean XML/Python)',
    enterprise: 'Included (Drag-and-drop view/field editor)',
    notes: 'Developer note: Custom code modules are generally cleaner and more upgrade-safe than Studio metadata customizations.',
  },
  {
    feature: 'Mobile Access',
    category: 'User Experience',
    community: 'Fully Responsive Web Browser & Installable PWA',
    enterprise: 'Native iOS & Android Mobile Apps + Responsive Web',
    notes: 'Both editions are mobile-friendly on modern smartphone browsers.',
  },
  {
    feature: 'Manufacturing (MRP) & Barcode Scanning',
    category: 'Operations',
    community: 'Standard Bill of Materials & Work Orders',
    enterprise: 'Advanced Work Centers, Barcode Scanner App & Quality Control',
  },
  {
    feature: 'Multi-Company & Multi-Warehouse',
    category: 'Operations',
    community: 'Fully Supported',
    enterprise: 'Fully Supported + Inter-Company Rules Engine',
  },
  {
    feature: 'Third-Party REST API & Webhooks',
    category: 'Integrations',
    community: 'Native XML-RPC / JSON-RPC + Python Microservices',
    enterprise: 'Native XML-RPC / JSON-RPC + Native Webhooks Engine',
    notes: 'Karnexus Software builds high-performance FastAPI gateways for both editions.',
  },
  {
    feature: 'Official Odoo S.A. Technical Support',
    category: 'Support',
    community: 'Community forums & independent engineering partners',
    enterprise: 'Direct standard bug ticketing with Odoo S.A.',
    notes: 'Karnexus provides direct developer-level support for both editions.',
  },
  {
    feature: 'Version Upgrade Path',
    category: 'Maintenance',
    community: 'Via OpenUpgrade scripts & specialized database refactoring',
    enterprise: 'Included standard database upgrade script from Odoo S.A. (custom modules still require manual refactoring)',
    notes: 'Custom modules must be audited and refactored on both editions during upgrades.',
  },
];

export interface HostingOption {
  id: string;
  title: string;
  subtitle: string;
  type: 'SaaS' | 'PaaS' | 'IaaS / VPS' | 'On-Premise';
  supportedEditions: string[];
  customModuleSupport: boolean;
  sshAccess: boolean;
  pros: string[];
  cons: string[];
  idealFor: string;
  karnexusRole: string;
}

export const odooHostingOptions: HostingOption[] = [
  {
    id: 'odoo-online',
    title: 'Odoo Online',
    subtitle: 'Official SaaS (Software as a Service)',
    type: 'SaaS',
    supportedEditions: ['Odoo Enterprise Only'],
    customModuleSupport: false,
    sshAccess: false,
    pros: [
      'Zero server management or DevOps required',
      'Automatic security patches and standard backups handled by Odoo S.A.',
      'Quickest setup time for simple, unmodified businesses',
      'Included in standard Enterprise user license pricing',
    ],
    cons: [
      'STRICTLY NO custom Python modules or third-party community addons',
      'No shell/SSH terminal access or direct PostgreSQL query execution',
      'Only Studio no-code customizations permitted',
      'Cannot install external Python packages (e.g., pandas, custom SDKs)',
    ],
    idealFor: 'Small companies with standard workflows who have zero need for custom Python modules or complex integrations.',
    karnexusRole: 'Initial configuration, standard workflow mapping, data import, user training, and external API connectors via webhooks.',
  },
  {
    id: 'odoo-sh',
    title: 'Odoo.sh',
    subtitle: 'Official PaaS (Platform as a Service)',
    type: 'PaaS',
    supportedEditions: ['Odoo Enterprise Only'],
    customModuleSupport: true,
    sshAccess: true,
    pros: [
      'Full GitHub integration with automatic CI testing on every commit',
      'Isolated Development, Staging, and Production branches',
      'Web-based terminal, database manager, and automated daily backups',
      'Allows custom Python modules and third-party addons',
    ],
    cons: [
      'Requires an active Odoo Enterprise subscription',
      'Hosting costs escalate quickly as worker threads, storage, and staging branches increase',
      'Server configuration is restricted to Odoo.sh predefined templates',
      'Shared cloud performance variance during peak hosting periods',
    ],
    idealFor: 'Enterprise customers who require custom modules and prefer an integrated Git-driven deployment environment managed by Odoo.',
    karnexusRole: 'Architecture design, custom module development, Git branch workflow setup, automated testing, and CI/CD staging verification.',
  },
  {
    id: 'docker-cloud-vps',
    title: 'Self-Hosted Cloud VPS (Dockerized)',
    subtitle: 'Independent High-Performance Infrastructure (Karnexus Specialty)',
    type: 'IaaS / VPS',
    supportedEditions: ['Odoo Community', 'Odoo Enterprise'],
    customModuleSupport: true,
    sshAccess: true,
    pros: [
      'Supports both 100% Free Community and Enterprise editions',
      'Full root access and isolated Docker Compose environment',
      'No per-worker hosting fees: pay only standard cloud server costs (AWS, DigitalOcean, Hetzner, Linode)',
      'Direct PostgreSQL optimization, indexing, and dedicated read-replicas for BI reporting',
      'Custom background workers, Redis caches, and FastAPI sidecars on the same private network',
      'Automated encrypted offsite daily backups with retention policy',
    ],
    cons: [
      'Requires competent Linux and Docker sysadmin maintenance',
      'Infrastructure updates and OS security patches must be managed proactively',
    ],
    idealFor: 'Growing businesses, high-transaction operations, cost-conscious organizations, and teams requiring full data sovereignty and deep custom integrations.',
    karnexusRole: 'Turnkey Docker architecture, NGINX SSL reverse proxy, automated backup routines, PostgreSQL performance tuning, and ongoing infrastructure maintenance.',
  },
  {
    id: 'on-premise',
    title: 'On-Premise Physical Server',
    subtitle: 'Local Hardware Deployment',
    type: 'On-Premise',
    supportedEditions: ['Odoo Community', 'Odoo Enterprise'],
    customModuleSupport: true,
    sshAccess: true,
    pros: [
      'Total data isolation behind company physical firewalls',
      'Zero dependency on internet connectivity for local warehouse and factory POS terminals',
      'Compliance with strict domestic or defense regulatory frameworks',
    ],
    cons: [
      'Requires physical hardware procurement, UPS backup power, and local cooling',
      'Disaster recovery and offsite synchronization must be engineered carefully',
      'Remote staff access requires secure VPN tunneling setup',
    ],
    idealFor: 'Manufacturing plants, remote warehouses with unstable internet, or organizations with non-negotiable on-premise regulatory mandates.',
    karnexusRole: 'Bare-metal Ubuntu/Debian server setup, local Docker container orchestration, automated offsite encrypted sync, and VPN gateway configuration.',
  },
];

export interface CategorizedFaq {
  category: string;
  id: string;
  description: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const comprehensiveOdooFaqs: CategorizedFaq[] = [
  {
    category: 'Editions & Licensing',
    id: 'editions-licensing',
    description: 'Understanding the differences between Community and Enterprise, pricing models, and licensing terms.',
    items: [
      {
        question: 'What is the true difference between Odoo Community and Odoo Enterprise?',
        answer:
          'Odoo Community is 100% open source under the LGPLv3 license with no software license fees. It covers core sales, purchasing, inventory, invoicing, website, and CRM. Odoo Enterprise is a proprietary subscription built on top of Community that adds advanced dynamic accounting reports, automated bank feeds, barcode scanning app, IoT box integration, native mobile apps, and Studio. Both share the exact same underlying Python/PostgreSQL architecture.',
      },
      {
        question: 'Can we switch from Odoo Community to Odoo Enterprise later?',
        answer:
          'Yes. Migrating from Community to Enterprise is straightforward because Enterprise is built as an additive layer of modules on top of the Community base. You install the enterprise addons, activate your license key, and your existing data remains intact. Transitioning from Enterprise back to Community is also possible but requires replacing Enterprise-exclusive modules (like advanced accounting) with open-source alternatives.',
      },
      {
        question: 'Are there hidden costs with Odoo Community?',
        answer:
          'Odoo Community software is completely free, but you must account for hosting (typically $20-$80/month for a solid cloud VPS), implementation consulting, custom development if required, and ongoing maintenance. However, you avoid annual per-user recurring license fees, which often save medium-sized companies thousands of dollars annually.',
      },
      {
        question: 'Is Odoo Community sufficient for a growing business?',
        answer:
          'For many businesses—especially wholesale, retail distribution, services, and e-commerce—Odoo Community combined with well-engineered custom modules and third-party community extensions (OCA) provides 100% of the required functionality without locking the business into steep licensing contracts.',
      },
    ],
  },
  {
    category: 'Implementation & Planning',
    id: 'implementation-planning',
    description: 'Timelines, methodology, requirements discovery, and preventing ERP project failures.',
    items: [
      {
        question: 'How long does a typical Odoo implementation take?',
        answer:
          'A focused implementation for a small business with standard workflows typically takes 4 to 8 weeks. A multi-department enterprise rollout involving data migration, custom approval flows, and third-party API synchronization usually takes 2 to 4 months. We avoid multi-year drawn-out projects by launching in tight, verifiable milestones.',
      },
      {
        question: 'What causes Odoo implementations to fail and how do we prevent it?',
        answer:
          'The three main failure points are: 1) Over-customization before testing out-of-the-box workflows, 2) Poor historical data sanitation leading to garbage data in production, and 3) Lack of direct communication between operational stakeholders and the technical engineer. We prevent this through strict scoping audits, automated dry-run data cleaning, and direct engineer-to-client communication.',
      },
      {
        question: 'How is historical data imported from our existing software or Excel spreadsheets?',
        answer:
          'We follow a rigorous three-step ETL (Extract, Transform, Load) protocol. We extract your customer, vendor, product, inventory, and opening balance data, clean and normalize IDs and categories, and run trial imports on an isolated staging server to reconcile numbers down to the cent before executing the production cutover.',
      },
      {
        question: 'Should we adapt our business processes to Odoo or customize Odoo to our processes?',
        answer:
          'The best approach is pragmatic: adopt standard Odoo workflows for generic operations (like standard quotation printing or basic inventory receipts) to save budget and simplify upgrades, but build clean custom modules for operations that form your competitive advantage (such as proprietary pricing algorithms, custom approval ladders, or unique logistics dispatch).',
      },
    ],
  },
  {
    category: 'Customization & Development',
    id: 'customization-development',
    description: 'Custom modules, Studio vs code, upgrade safety, and coding standards.',
    items: [
      {
        question: 'What is the difference between Odoo Studio and custom module development?',
        answer:
          'Odoo Studio is a no-code visual editor stored directly in the database. While useful for adding simple text fields or hiding buttons, complex logic in Studio can create messy database dependencies that break unexpectedly during upgrades. Custom module development involves clean Python and XML files stored in Git, which are testable, version-controlled, and easily refactored during future migrations.',
      },
      {
        question: 'How do you guarantee custom modules will not break during future Odoo upgrades?',
        answer:
          'We strictly follow Odoo’s inheritance guidelines. We never modify original source files (no monkey-patching or core hacking). All changes are written in self-contained addon folders that inherit models, views, and controllers. This ensures standard upgrade scripts can upgrade core tables without crashing.',
      },
      {
        question: 'Can you develop custom modules for both Community and Enterprise?',
        answer:
          'Yes. Custom module architecture (Python models, QWeb templates, OWL Javascript components, PostgreSQL relationships) is identical between Community and Enterprise editions.',
      },
      {
        question: 'Who owns the custom code written for our system?',
        answer:
          'You retain 100% intellectual property ownership of all custom code written for your business. All source code is committed to your private repository with clean Git history and delivered alongside documentation upon project completion.',
      },
    ],
  },
  {
    category: 'Version Migration & Upgrades',
    id: 'version-migration',
    description: 'Upgrading between major Odoo releases, schema migrations, and downtime reduction.',
    items: [
      {
        question: 'How often does Odoo release new versions and do we have to upgrade annually?',
        answer:
          'Odoo releases a major version every year in October (e.g., Odoo 16, 17, 18). You do not need to upgrade every year. A stable, well-maintained installation can reliably serve your business for 3 to 5 years. Upgrading is recommended when you need modern UI capabilities, specific new modules, or performance improvements.',
      },
      {
        question: 'How does an Odoo database migration work in practice?',
        answer:
          'We make an exact copy of your production database onto an isolated staging environment. We run automated schema transformation scripts to migrate relational tables, migrate custom module code to the new version API, and run regression tests on your real operational transactions. Once verified, we schedule a brief off-hours cutover window for final delta data sync.',
      },
      {
        question: 'What happens to third-party App Store modules during an upgrade?',
        answer:
          'Third-party marketplace modules often require code refactoring because Odoo frequently updates internal ORM methods and OWL frontend frameworks between major versions. We audit every installed addon, update them to the target version, or rewrite obsolete dependencies into maintainable in-house modules.',
      },
      {
        question: 'How do you minimize downtime during a live ERP migration?',
        answer:
          'By performing all trial migrations and test verifications in advance on staging servers. On cutover day, the production maintenance window is limited to backing up the live database, executing the proven migration script, and verifying final DNS routing—typically completed in 2 to 4 hours over a weekend or scheduled maintenance window.',
      },
    ],
  },
  {
    category: 'Hosting & Infrastructure',
    id: 'hosting-infrastructure',
    description: 'Cloud VPS, Docker, Odoo.sh, database tuning, and backup strategies.',
    items: [
      {
        question: 'Which hosting option is best for our business?',
        answer:
          'If you use Odoo Enterprise and want simple GitHub branch management, Odoo.sh is a popular choice. If you want maximum cost efficiency, superior database performance, or run Odoo Community, a Dockerized Cloud VPS (on AWS, DigitalOcean, Hetzner, or your preferred cloud provider) is optimal because you pay zero per-worker markup and enjoy full root control.',
      },
      {
        question: 'Can we install custom Python modules on Odoo Online (SaaS)?',
        answer:
          'No. Odoo Online is a closed SaaS platform. Odoo S.A. strictly prohibits custom Python modules, external third-party marketplace apps, or command-line server access. If you need custom modules, you must use Odoo.sh or a Self-Hosted Cloud VPS.',
      },
      {
        question: 'How are automated backups and disaster recovery managed on a self-hosted instance?',
        answer:
          'We configure automated nightly cron scripts that dump both the PostgreSQL database and the Odoo filestore (attachments, documents, photos). These dumps are encrypted, compressed, and transferred to offsite cloud object storage (such as AWS S3 or Backblaze B2) with a 30-day retention policy and automated alert notifications on failure.',
      },
      {
        question: 'Why is our existing Odoo installation running slow and how do you fix it?',
        answer:
          'Odoo slowness is almost always caused by one of three issues: 1) Improper Odoo worker and memory limits allocation in odoo.conf, 2) Default unoptimized PostgreSQL settings with inadequate shared buffers, or 3) Unindexed database queries inside custom modules looping through large recordsets. We profile slow queries using EXPLAIN ANALYZE and tune system parameters for dramatic speedups.',
      },
    ],
  },
  {
    category: 'Integrations & APIs',
    id: 'integrations-apis',
    description: 'Connecting Odoo to e-commerce, payment gateways, couriers, and custom Python backends.',
    items: [
      {
        question: 'How does Odoo integrate with e-commerce stores like Shopify or WooCommerce?',
        answer:
          'We build bidirectional connectors using webhooks and REST APIs. When a customer places an order online, a webhook pushes the order, customer, and payment information directly into Odoo Sales and Invoicing. When stock changes in your physical warehouse, Odoo automatically pushes updated inventory counts back to your webshop.',
      },
      {
        question: 'Can Odoo communicate with external Python FastAPI or Django services?',
        answer:
          'Yes, seamlessly. We specialize in building custom Python FastAPI microservices that act as high-speed middleware, processing heavy batch jobs, data transformations, or partner feeds asynchronously without overburdening Odoo’s web workers.',
      },
      {
        question: 'How do proof-of-delivery and courier tracking updates integrate with Odoo?',
        answer:
          'We connect courier APIs directly to Odoo Delivery Orders (Stock Pickings). When a delivery driver marks a parcel as delivered, a webhook automatically captures the delivery timestamp, tracking number, and customer signature, marking the Odoo transfer as done and triggering automated customer invoice generation.',
      },
      {
        question: 'Can we connect Odoo to Power BI or Metabase for executive reporting?',
        answer:
          'Yes. Rather than running heavy analytical queries on your live transactional database, we configure optimized PostgreSQL views or dedicated read-replicas. Tools like Power BI, Tableau, or Metabase can query aggregated financial and inventory data in real time with zero performance degradation on daily ERP operations.',
      },
    ],
  },
];

