# Karnexus Software – Website & Enquiry System

Official website for **Karnexus Software**, an independent freelance software engineering practice specializing in Odoo ERP consulting and Python backend development.

- **Domain:** [karnexus.com](https://karnexus.com)
- **Production URL:** `https://karnexus.com`
- **Practice:** Independent Freelance Engineering
- **Business Email:** `contact@karnexus.com`
- **Location:** India (serving worldwide clients)

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm / yarn / pnpm

### Installation
```bash
# Install dependencies
npm install

# Start local full-stack development server (Express + Vite on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 2. Where to Edit Business Details & Content

All business details, copy, services, processes, and contact numbers are centralized in:

📁 **`src/config/site.ts`**

Key configuration properties:
- **`companyName`**: `"Karnexus Software"`
- **`founder`**: Role, biography, and skill competencies.
- **`contact.email`**: `contact@karnexus.com`
- **`contact.phone`**: Set to a phone number (e.g. `"+91 98765 43210"`) when available. Phone buttons are automatically hidden until configured.
- **`contact.whatsapp`**: Set to a WhatsApp number (e.g. `"+919876543210"`) when available. WhatsApp buttons are automatically hidden until configured.
- **`contact.bookingUrl`**: Add Calendly / cal.com booking link when ready.
- **`odooServices`**: Detailed copy, deliverables, problems solved, and tech stacks for all 7 Odoo service offerings.
- **`odooEditionsComparison`**: Feature comparison matrix between Odoo Community (Open Source) and Odoo Enterprise.
- **`odooHostingOptions`**: Complete technical breakdown of Odoo Online, Odoo.sh, Self-Hosted Docker VPS, and On-Premise.
- **`comprehensiveOdooFaqs`**: 24+ categorized technical FAQs spanning licensing, implementation, customization, migration, hosting, and APIs.
- **`pythonServices`**: Detailed copy, deliverables, problems solved, and tech stacks for all 5 Python service offerings.
- **`exampleSolutions`**: Architectural solution blueprints (ecommerce sync, proof of delivery API, Power BI reporting, etc.).
- **`faqs`**: Frequently asked questions and answers for the homepage.

---

## 3. How to Configure Enquiry Email Delivery (SMTP)

The server contains a secured endpoint at `POST /api/enquire` with:
- Server-side field validation.
- Honeypot spam bot traps.
- Graceful degradation: if email credentials are not configured, the server informs the visitor and presents a pre-filled direct email link preserving all their entered fields.

To enable live email dispatch to `contact@karnexus.com`, set the following environment variables in your `.env` file or hosting control panel:

```env
# Outgoing SMTP Configuration
SMTP_HOST="smtp.yourprovider.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_SECURE="false"

# Notification destination
NOTIFICATION_EMAIL="contact@karnexus.com"
FROM_EMAIL="noreply@karnexus.com"
```

Common SMTP providers include Google Workspace / Gmail (App Password), SendGrid, Postmark, Amazon SES, or Brevo.

---

## 4. Cloudflare Pages + Cloudflare Workers Architecture (Recommended)

To completely eliminate VM hosting costs, Linux maintenance, and CORS complexities, this project is fully configured for a **unified Cloudflare serverless edge architecture**:
- **Frontend**: Vite + React SPA served from Cloudflare's global edge network via **Cloudflare Pages**.
- **Backend API**: Cloudflare Pages Functions (located in `/functions/api`) running as an Edge Cloudflare Worker.

### Key Efficiency & Architectural Advantages:
1. **$0/month Infrastructure Cost**: No VPS / VM monthly rental fees ($5–$20/month saved). Cloudflare Pages and Workers include 100,000 requests/day on the free tier.
2. **Zero Maintenance & No Servers to Crash**: No NGINX configurations, no system updates, no Uvicorn/systemd processes, and no SSL renewal headaches.
3. **Same-Origin (Zero CORS Headaches)**: The backend API runs under the exact same domain (`https://karnexus.com/api/enquire`). You don't need cross-origin API headers or separate subdomains.
4. **Single-Step Automatic Deployments**: Pushing to GitHub deploys both the frontend Vite build AND the edge backend worker simultaneously in under 30 seconds.
5. **Modern HTTP Email API**: Instead of fragile TCP SMTP on a VM, the worker uses modern edge email dispatch via **Resend** (3,000 emails/month free) or **Brevo** (300 emails/day free).

---

### How to Configure & Deploy on Cloudflare Pages

1. **Push your code to GitHub/GitLab**.
2. Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Set your build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. Cloudflare Pages automatically detects the `/functions` folder and compiles `/functions/api/enquire.ts` and `/functions/api/health.ts` into native edge Workers!
5. In your Cloudflare Pages project, go to **Settings** > **Environment variables**, and add:
   - `RESEND_API_KEY`: Your API key from [resend.com](https://resend.com) (free)
   - `NOTIFICATION_EMAIL`: `contact@karnexus.com`
   - `FROM_EMAIL`: `onboarding@resend.dev` (or your verified domain sender like `enquiry@karnexus.com`)

*Note: If you leave `VITE_API_URL` empty, the frontend automatically defaults to same-origin `/api/enquire`.*

---

### Alternative: Standalone Cloudflare Worker (`/cloudflare-worker`)

If you prefer deploying the API on a dedicated custom subdomain (e.g. `https://api.karnexus.com`):
1. Navigate to `/cloudflare-worker`:
   ```bash
   cd cloudflare-worker
   npx wrangler secret put RESEND_API_KEY
   npx wrangler deploy
   ```
2. Set `VITE_API_URL=https://api.karnexus.com` in your Cloudflare Pages environment variables.

---

### Alternative: Python FastAPI on VM (`/backend`)

The complete Python backend code and configuration is located in the **`/backend`** folder:
- `backend/main.py`: FastAPI app with Pydantic validation, CORS, honeypot spam protection, and async email dispatch.
- `backend/requirements.txt`: Python package dependencies.
- `backend/Dockerfile` & `backend/docker-compose.yml`: Ready-to-run container setup.
- `backend/.env.example`: Configuration template for CORS origins and SMTP credentials.

#### Option 1: Quick Deployment with Docker Compose (Recommended)
On your VM:
```bash
# 1. Clone repository or copy the backend folder
cd backend

# 2. Create your .env file
cp .env.example .env
nano .env   # Fill in CORS_ORIGINS and SMTP credentials

# 3. Launch the container
docker compose up -d --build
```
The FastAPI backend will run on port `8000` (bound to `127.0.0.1:8000`).

#### Option 2: Running directly with Python / Uvicorn + Systemd
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### C. NGINX Reverse Proxy & SSL on the VM
Point a subdomain (e.g., `api.karnexus.com`) to your VM's IP, then add this NGINX configuration:
```nginx
server {
    server_name api.karnexus.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Obtain free SSL with Certbot:
```bash
sudo certbot --nginx -d api.karnexus.com
```

---

## 5. SEO & Structured Data

- Structured data is defined using Schema.org `Organization` and `ProfessionalService` JSON-LD in `index.html`.
- Dynamic page title & description management configured in `src/context/RouterContext.tsx`.
- Robots and Sitemap configured in:
  - `public/robots.txt`
  - `public/sitemap.xml`

