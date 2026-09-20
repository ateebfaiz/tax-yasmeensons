# System Architecture, Strict Policies & Engineering Guide
**Yasmeen & Sons Tax Practice Platform (`tax.yasmeensons.com`)**  
**Repository**: `ateebfaiz/tax-yasmeensons`  
**Backend Authority**: FastAPI Cloud (`https://ys-fastapi-backend.fastapicloud.dev`)

---

## 1. Core Invariants & Quality Gates

### Gate 1: Zero-Credential Security (FBR Iris Password Protection)
- **NEVER** ask for, collect, store, transmit, or log a taxpayer's FBR Iris password or 4-digit PIN.
- The platform functions strictly as a **facilitation and preparation desk**:
  - We verify taxpayer status, compute tax slabs, audit Section 149/235/236 deductions, and balance Section 116 wealth reconciliations to 0.00.
  - The client retains exclusive custody of their official FBR Iris credentials and completes final submission themselves, or inspects the draft with guidance.
- Schema columns and variables must use `client_notes` / `intake_notes`, never `credentials_notes`.

### Gate 2: Strict No-Hardcoding Gate
- Never hardcode WhatsApp phone numbers (`03120947187`) or URLs in components or strings.
- All numbers and URLs must be derived from `SITE_CONFIG` in [`src/lib/config.ts`](file:///home/ateeb/projects/tax-yasmeensons/src/lib/config.ts).
- Links must use `formatWhatsAppUrl(message)` which pulls from `SITE_CONFIG.contact.whatsapp`.

### Gate 3: Fail-Fast & Zero-Vanishing-Order API Contract
- API routes ([`src/app/api/intake/route.ts`](file:///home/ateeb/projects/tax-yasmeensons/src/app/api/intake/route.ts)) must **NEVER** silently swallow database or Todoist errors with empty `catch` blocks that pretend success (`{ success: true }`).
- If backend persistence fails, the API must fail fast with HTTP 502/503 and return an actionable message with an automated WhatsApp fallback so customer cases never vanish.

### Gate 4: FastAPI Cloud Database Authority
- Database persistence and Todoist P1 notifications are handled centrally by the persistent **FastAPI Cloud Backend Service** (`https://ys-fastapi-backend.fastapicloud.dev`).
- Next.js serverless functions act as authenticated HTTP proxies to FastAPI Cloud, preventing connection pooling exhaustion and environment drift.

### Gate 5: Safari History Dark Glass UI Standard
- All AppClips and secondary sheets must strictly follow the **Safari History dark glass UI** design specification:
  - Deep page/backdrop canvas: `#07131b` with a soft radial teal glow (`rgba(32, 182, 165, 0.15)`).
  - Translucent charcoal glass panels: `rgba(27, 37, 43, 0.72)` / `rgba(22, 30, 36, 0.88)` with `backdrop-filter: blur(20px) saturate(140%)`.
  - Borders: 1px fine translucent outline (`rgba(255, 255, 255, 0.12)`).
  - Accents: Emerald/Teal (`#20b6a5` / `#0d978b`) for active states, checkmarks, and primary actions.
  - **NO bright white cards** on mobile bottom sheets or AppClips.

### Gate 6: Zero Empty Space & Dynamic Viewport Standard
- **NEVER** use static `height: 92dvh` or arbitrary fixed heights that leave large blank areas at the bottom of AppClips.
- Base sheet ([`AppClipSheet.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/ui/app-clip/AppClipSheet.tsx)) and all clips must size **naturally** (`height: auto; max-height: 90dvh`).
- All mobile viewport heights must use `100dvh` instead of `100vh`.
- Safe-area bottom padding must be clamped: `padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 16px)`.
- All modals must keep close buttons in a stable top-right position with a minimum 44px tap target.

### Gate 7: FBR 8-Window Simplified Non-Business Spec (SRO 1561(I)/2025)
- Modelled strictly on FBR's simplified electronic return for non-business individuals:
  - **Clip 0:** Identity & Source Picker (Full name, CNIC, Tax Year 2026, 183+ days resident, Source flags). *Business income s.18 politely exits flow to custom concierge.*
  - **Clip 1:** Salary & Pension (`s.12` / `s.149` employer WHT).
  - **Clip 2:** Property / Rent (`s.15` / code `2031` 1/5 repair allowance, `7E` flag).
  - **Clip 3:** Other Sources (`s.39` / code `5003` bank profit, dividends, prizes).
  - **Clip 4:** Capital Gains (`s.37` securities & property).
  - **Clip 5:** Deductible Allowances & Credits (`s.60–63` Zakat, donations, pension fund).
  - **Clip 6:** Tax Already Paid (Schedule of WHT source deductions).
  - **Clip 7:** Wealth Statement (`s.116`) with **Real-Time Wealth Reconciliation to 0.00**.
- **Urdu is first-class:** Every field includes an English label, Nastaleeq Urdu label, and one-line Urdu hint.
- **Persistent FBR Codes:** Raw codes (`5003`, `2031`, `s.149`, `s.116`) are always stored in the payload even when hidden from client view.

### Gate 8: Additive Evolution Rule
- **NEVER** remove or wipe out existing sections, pages, pricing cards, or guides when making improvements.
- All enhancements (Hero updates, 4-step workflow, customer reviews, urgency deadline banner, `/track` portal, new menu links) must be **additive** and preserve all current functionality.

### Local On-Device Quality Gates Runner
- Quality gates are executed **locally and on-device** (no reliance on external GitHub actions for gating).
- **Frontend Quality Gates Runner:**
  ```bash
  # Inside /home/ateeb/projects/tax-yasmeensons
  npm run check-gates
  # or directly:
  ./scripts/run-quality-gates.sh
  ```
  Verifies:
  - G1: Prohibited credential fields (zero-passwords/PINs)
  - G2: Hardcoded phone numbers outside config
  - G3: AppClip zero-void natural height container invariants
  - G4: Mobile viewport accessibility (pinch-to-zoom preservation)
  - G5: Next.js build and route generation
- **Backend Quality Gates Runner:**
  ```bash
  # Inside /home/ateeb/projects/yasmeen-sons/backend
  ./scripts/run-quality-gates.sh
  ```
  Verifies:
  - G3: Python bytecode compilation across all 12 core modules (including `tax.py`)
  - G4: Ruff linter conformance (<= 100 char limit)
  - G5: Route matrix verification and FastAPI startup simulation
  - G6: WhatsApp protocol, HMAC signature verification, and chat agent
  - G7/G8: Credential sweep (no personal access tokens)

---

## 2. Design System & Visual Tokens

### Safari History Dark Glass Tokens
```css
:root {
  --page-bg: #07131b;
  --glass-bg: rgba(27, 37, 43, 0.72);
  --glass-bg-strong: rgba(22, 30, 36, 0.88);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-border-subtle: rgba(255, 255, 255, 0.07);
  --glass-highlight: rgba(255, 255, 255, 0.06);
  --glass-glow: rgba(32, 182, 165, 0.15);

  --text-primary: #f5f7f8;
  --text-secondary: #aeb9bf;
  --text-muted: #72828b;

  --accent: #20b6a5;
  --accent-strong: #0d978b;
  --accent-surface: rgba(32, 182, 165, 0.14);
  --accent-glow: 0 0 24px rgba(32, 182, 165, 0.28);

  --radius-panel: 28px;
  --radius-card: 20px;
  --radius-pill: 9999px;

  --glass-blur: blur(20px) saturate(140%);
}
```

---

## 3. Package Tier Codes & Pricing Structure

| Tier Code | Display Title | Fee (PKR) | Target Scope |
|---|---|---|---|
| **GF-1000** | Guided Filing | **1,000** | Single-source income, basic return preparation, self-submission. |
| **FA-2500** | Complete Assistance (Recommended) | **2,500** | Full salary reconciliation (s.149), wealth statement balance (s.116), WHT deduction audit (banks, bills, SIM). |
| **CX-4500** | Complex Filing & Wealth Audit | **4,500+** | Multiple employers, foreign remittances (PRC), capital gains, high-net-worth wealth reconciliation. |

---

## 4. Component Directory & Responsibilities

```text
src/
├── app/
│   ├── page.tsx               # Index page (Hero, Reviews, Workflow, Quick Tray, Comparison, FAQs)
│   ├── start/page.tsx          # Desktop: SeniorIntakeWizard | Mobile: FbrSimplifiedClipWizard
│   ├── track/page.tsx          # Case progress tracking portal by Reference + CNIC
│   ├── salaried/page.tsx       # Desktop: 2-column SAL | Mobile: PersonaClip(salaried)
│   ├── pensioners/page.tsx     # Desktop: 2-column PEN | Mobile: PersonaClip(pensioner)
│   ├── no-income/page.tsx      # Desktop: 2-column HIF | Mobile: PersonaClip(housewife)
│   ├── students/page.tsx       # Desktop: 2-column STU | Mobile: PersonaClip(student)
│   ├── requirements/page.tsx   # Interactive filterable documentation & evidence checklist
│   ├── services/page.tsx       # Standalone fee schedule & SLA details
│   ├── iris-guide/page.tsx     # Annex A: Comprehensive official FBR Iris portal guide
│   └── api/
│       ├── intake/route.ts     # Ingestion proxy to FastAPI Cloud backend
│       └── track/route.ts      # Status tracking proxy to FastAPI Cloud backend
├── components/
│   ├── clips/                  # Mobile-first AppClips
│   │   ├── FbrSimplifiedClipWizard.tsx # SRO 1561(I)/2025 8-Window Simplified Wizard
│   │   ├── PersonaClip.tsx     # Standalone touch experience for all 4 profiles
│   │   ├── TaxIntakeClip.tsx   # Fast 3-step mobile intake
│   │   ├── ChecklistClip.tsx   # Mobile document checklist bottom sheet
│   │   ├── PricingClip.tsx     # Mobile pricing bottom sheet
│   │   └── IrisGuideClip.tsx   # Mobile Iris Annex A bottom sheet
│   ├── ui/
│   │   ├── glass/              # Dark Glass UI Primitives
│   │   │   ├── GlassSheet.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassSegmentedControl.tsx
│   │   │   └── GlassButton.tsx
│   │   └── app-clip/           # AppClip engine (AppClipProvider, AppClipSheet, AppClipRegistry)
│   └── navigation/
│       ├── header.tsx          # Viewport-adaptive navigation header
│       ├── footer.tsx          # Grouped footer with support lines & legal disclaimers
│       └── liquid-glass-tab-bar.tsx # Floating mobile frosted glass tab bar
```
