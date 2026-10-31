import os
import json
import logging
from typing import Optional, List
from email.message import EmailMessage

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import aiosmtplib

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("karnexus-api")

app = FastAPI(
    title="Karnexus Software API",
    description="Python FastAPI backend handling project enquiries, integrations, and health checks.",
    version="1.0.0",
)

# Parse CORS origins from environment
def get_cors_origins() -> List[str]:
    raw_origins = os.getenv(
        "CORS_ORIGINS",
        '["https://karnexus.com", "https://www.karnexus.com", "https://karnexus.pages.dev", "http://localhost:3000"]',
    )
    try:
        parsed = json.loads(raw_origins)
        if isinstance(parsed, list):
            return parsed
    except Exception:
        pass
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

cors_origins = get_cors_origins()
logger.info(f"Loaded CORS origins: {cors_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class EnquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=120)
    service: str = Field(..., min_length=2, max_length=120)
    description: str = Field(..., min_length=10, max_length=5000)
    budget: Optional[str] = Field(None, max_length=80)
    timeline: Optional[str] = Field(None, max_length=80)
    honeypot: Optional[str] = Field(None, description="Spam trap field; must remain empty")


def is_smtp_configured() -> bool:
    host = os.getenv("SMTP_HOST", "").strip()
    user = os.getenv("SMTP_USER", "").strip()
    password = os.getenv("SMTP_PASS", "").strip()
    return bool(host and user and password)


@app.get("/api/health")
async def health_check():
    """Health & runtime check endpoint."""
    return {
        "status": "ok",
        "service": "Karnexus Software FastAPI Backend",
        "emailConfigured": is_smtp_configured(),
    }


@app.post("/api/enquire")
async def submit_enquiry(payload: EnquiryRequest, request: Request):
    """
    Handles project enquiry form submissions from Cloudflare Pages.
    Validates input, checks honeypot spam bot traps, and sends an email via aiosmtplib.
    """
    # 1. Spam bot honeypot validation
    if payload.honeypot and payload.honeypot.strip():
        logger.warning(f"Bot submission dropped via honeypot from {request.client.host if request.client else 'unknown'}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid submission detected.",
        )

    # 2. Check if SMTP is configured
    if not is_smtp_configured():
        logger.info("Enquiry received, but SMTP is not configured. Informing client gracefully.")
        return {
            "success": False,
            "configured": False,
            "error": "Online enquiry dispatch is not currently configured on this server environment. Please email us directly at contact@karnexus.com with your project details.",
            "contactEmail": "contact@karnexus.com",
        }

    # 3. Build email message
    smtp_host = os.getenv("SMTP_HOST", "").strip()
    smtp_port = int(os.getenv("SMTP_PORT", "587").strip())
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()
    smtp_starttls = os.getenv("SMTP_STARTTLS", "true").lower() in ("true", "1", "yes")

    notification_email = os.getenv("NOTIFICATION_EMAIL", "contact@karnexus.com").strip()
    from_email = os.getenv("FROM_EMAIL", smtp_user or "contact@karnexus.com").strip()

    msg = EmailMessage()
    msg["Subject"] = f"[Project Enquiry] {payload.service} - {payload.name} ({payload.company or 'Individual'})"
    msg["From"] = f"Karnexus Website Enquiries <{from_email}>"
    msg["To"] = notification_email
    msg["Reply-To"] = str(payload.email)

    text_body = f"""
New Project Enquiry - Karnexus Software
---------------------------------------
Client Name: {payload.name}
Work Email: {payload.email}
Company: {payload.company or 'Not specified'}
Service Required: {payload.service}
Budget Range: {payload.budget or 'Not specified'}
Target Timeline: {payload.timeline or 'Not specified'}

Project Description:
{payload.description}
    """.strip()

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">
      <h2 style="color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Project Enquiry – Karnexus Software</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Client Name:</td><td style="padding: 8px;">{payload.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:{payload.email}">{payload.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">{payload.company or 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service Required:</td><td style="padding: 8px;">{payload.service}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget Range:</td><td style="padding: 8px;">{payload.budget or 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">{payload.timeline or 'Not specified'}</td></tr>
      </table>
      <h3 style="color: #0f172a; margin-top: 24px;">Project Description:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap;">{payload.description}</div>
    </div>
    """

    msg.set_content(text_body)
    msg.add_alternative(html_body, subtype="html")

    # 4. Asynchronous SMTP dispatch
    try:
        await aiosmtplib.send(
            msg,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_user,
            password=smtp_pass,
            start_tls=smtp_starttls,
        )
        logger.info(f"Successfully dispatched project enquiry from {payload.email}")
        return {
            "success": True,
            "configured": True,
            "message": "Thank you for contacting Karnexus Software. Your enquiry has been received and you will receive a response shortly.",
        }
    except Exception as exc:
        logger.error(f"Failed to dispatch email: {exc}", exc_info=True)
        return {
            "success": False,
            "configured": True,
            "error": "An internal error occurred while dispatching the message. Please contact us directly at contact@karnexus.com.",
            "contactEmail": "contact@karnexus.com",
        }
