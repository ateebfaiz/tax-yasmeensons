# Yasmeen & Sons Tax Facilitation Desk (`tax.yasmeensons.com`)

An authoritative, independent individual tax facilitation and return preparation platform for **Tax Year 2026**, adhering strictly to Federal Board of Revenue (FBR) Inland Revenue form grammar, statutory protections under the Income Tax Ordinance, 2001, and dual-viewport responsive architecture.

---

## 🌟 Key Architecture Pillars

### 1. Zero-Credential Security (Customer-Controlled Authentication)
- **Zero Password Storage**: We never request, collect, or store taxpayer FBR Iris passwords or 4-digit PINs.
- **Custody of Accounts**: Clients maintain absolute custody over their official FBR accounts. We prepare figures, conduct audits, balance wealth statements, and assist clients in entering them into the official FBR portal (`iris.fbr.gov.pk`).

### 2. Dual-Viewport Architecture
- **Desktop Viewport (`>= 768px`)**:
  - Authoritative 2-column Senior Tax Practice docket.
  - Classical sticky context on the left; full declaration wizard or evidence modules on the right.
  - Zero AppClip triggers or bottom-sheets on desktop.
- **Mobile Viewport (`< 768px`)**:
  - Ultra-frosted, translucent liquid glass AppClips (`AppClipSheet`) powered by `framer-motion`.
  - Translucency: `bg-white/55 dark:bg-[#07121D]/60` with `backdrop-blur-3xl backdrop-saturate-150` and specular highlight rims.
  - Purpose-built mobile components (`PersonaClip.tsx` and `TaxIntakeClip.tsx`) ensuring zero desktop wizard embeds in mobile sheets.

### 3. Mandatory Bilingual Interface (English & Nastaleeq Urdu)
- Every card, form label, header, and button features stacked or side-by-side English and Nastaleeq Urdu (`font-urdu` with `dir="rtl"`).
- Standardized via `BilingualLabel` components.

### 4. Database & Notifications
- **Neon PostgreSQL**: Dedicated `tax-yasmeensons` branch with Drizzle ORM schema for intake records.
- **Todoist P1 Dispatch**: Real-time task dispatch with client details, category code, and case reference number (`YS-26-XXXXX`).
- **WhatsApp Concierge**: Instant case dispatch to senior facilitation desk at `03120947187`.

---

## 📦 Package Tiers & Codes

| Tier Code | Display Title | Fee (PKR) | Target Scope |
|---|---|---|---|
| **GF-1000** | Guided Filing | **1,000** | Single-source income, basic return preparation, self-submission. |
| **FA-2500** | Complete Assistance (Recommended) | **2,500** | Full salary reconciliation (s.149), wealth statement balance (s.116), WHT deduction audit (banks, bills, SIM). |
| **CX-4500** | Complex Filing & Wealth Audit | **4,500+** | Multiple employers, foreign remittances (PRC), capital gains, high-net-worth wealth reconciliation. |

---

## 📚 Official Guides & Documentation

All guides are available in the [`docs/`](file:///home/ateeb/projects/tax-yasmeensons/docs) directory:
- [**System Architecture & Strict Policies**](file:///home/ateeb/projects/tax-yasmeensons/docs/ARCHITECTURE_AND_POLICIES.md): DOs, DON'Ts, design tokens, and viewport specifications.
- [**FBR Individual Registration & NTN Guide**](file:///home/ateeb/projects/tax-yasmeensons/docs/FBR_INDIVIDUAL_REGISTRATION_GUIDE.md): Iris portal registration, SIM requirements, personal email assistance, and overseas NICOP rules.
- [**WHT & PRC Message Templates**](file:///home/ateeb/projects/tax-yasmeensons/docs/MESSAGE_TEMPLATES_PRC_WHT.md): Copy-paste message templates in English and Urdu for bank WHT (s.164), freelancer PRC, mobile SIM, and utility bills.
- [**Agent & Assistant Instructions**](file:///home/ateeb/projects/tax-yasmeensons/AGENTS.md): Strict invariants and developer rules.
- [**Claude Quick Reference**](file:///home/ateeb/projects/tax-yasmeensons/CLAUDE.md): CLI commands and checklist.

---

## 🛠️ Development & Quality Assurance

### Prerequisites
- Node.js 18+
- npm 9+
- Google Chrome (for automated Puppeteer UI audits)

### Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Compile production build & static export
npm run build

# Run Headless Puppeteer UI Audit (Mobile & Desktop)
node scripts/audit_ui.mjs
```

---

## 🚀 Deployment

Step-by-step: [AGENTS.md — Ship](./AGENTS.md#ship-frontend-pr--backend-fastapi-cloud).

- Domain: `tax.yasmeensons.com` (Vercel production — do not promote until asked)
- Frontend PR: [ateebfaiz/tax-yasmeensons #1](https://github.com/ateebfaiz/tax-yasmeensons/pull/1) (`feat/tax-platform-preview`)
- Preview: https://tax-yasmeensons-git-feat-tax-19e19d-ateebfaiz64-6628s-projects.vercel.app
- Desk API: `https://ys-fastapi-backend.fastapicloud.dev` — `uv run fastapi cloud deploy` from `yasmeen-sons/backend`
