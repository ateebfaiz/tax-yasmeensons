# System Architecture, Strict Policies & Engineering Guide
**Yasmeen & Sons Tax Practice Platform (`tax.yasmeensons.com`)**  
**Repository**: `ateebfaiz/tax-yasmeensons`  
**Desk API**: FastAPI Cloud (`https://ys-fastapi-backend.fastapicloud.dev/api/tax`)  
**Object storage**: Neon S3-compatible bucket `assets` (not an S3 column in Postgres)

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
- Next.js serverless functions proxy intake/track to FastAPI. File bytes go to Neon object storage (`assets`), not through FastAPI S3.

### Gate 5: Apple Human Interface Guidelines (HIG) Foundations Standard
All UI components, sheets, navigation, and pages MUST strictly conform to **Apple's Human Interface Guidelines (HIG) Foundations**:
1. **Accessibility & Contrast First**:
   - Every text element must achieve at least **4.5:1** (WCAG AA) and ideally **7:1+** (WCAG AAA) contrast in **BOTH** Light and Dark modes.
   - Never place white text on light backgrounds or dark text on dark backgrounds.
   - All interactive controls (buttons, tabs, inputs, close icons, checkboxes) MUST have a minimum tap target of **44x44 pt (44px)**.
2. **Official Apple Default System Palette**:
   All colors strictly adhere to Apple HIG default system colors:
   - **Apple Blue (CTA / links)**: Light `#0071E3`, Dark System Blue `#0A84FF`. One accent.
   - **System Orange (`systemOrange`)**: Accents, highlights, badges. Light: `#FF9500`, Dark: `#FF9F0A`.
   - **System Green (`systemGreen`)**: Success, verified, WhatsApp. Light: `#34C759`, Dark: `#30D158`.
   - **System Red (`systemRed`)**: Destructive, warnings, required badges. Light: `#FF3B30`, Dark: `#FF453A`.
   - **System Gray 1–6**: Dynamic elevation backgrounds, borders, and fills.
   - **Dynamic Labels**: Primary `#000000` / `#FFFFFF`, Secondary `rgba(60,60,67,0.60)` / `rgba(235,235,245,0.60)`.
3. **Official Apple System Typography**:
   - Default Sans: `-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter` (SF on Apple devices; Inter is the licensed web fallback — do not commit Apple font files)
   - Default Serif: `"New York", -apple-system-ui-serif, ui-serif, Georgia, serif`
   - Default Mono: `ui-monospace, "SF Mono", "SFProMono-Regular", Menlo, Monaco, monospace`
   - Default Rounded: `ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, sans-serif`
   - Urdu Script: `Noto Nastaliq Urdu` preserved exclusively for Nastaleeq typography.
4. **First-Class Dual Appearance (Light & Dark Modes)**:
   - Light and Dark modes are equal first-class citizens.
   - The user can seamlessly toggle between Light, Dark, and System preference via the Header theme toggle.
5. **Optical Translucent Glass Blur & Vibrancy**:
   - Surfaces use Apple-grade hardware-accelerated materials: `backdrop-filter: blur(24px-32px) saturate(180%-190%)` (with `WebkitBackdropFilter`).
   - Scrims use subtle `bg-black/25 dark:bg-black/50` allowing real optical refraction of background elements.
   - Fine 0.5px–1px specular hairline rim borders (`border-black/[0.08] dark:border-white/[0.12]`).
6. **Safe Areas & Natural Viewport Sizing**:
   - Respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
   - Bottom sheets and AppClips MUST size naturally to their content (`height: auto; max-height: 90dvh`).
   - Zero empty vertical voids and zero horizontal overflow (`hasOverflow: false`).
7. **Tactile Feedback & Inputs**:
   - All buttons and interactive cards provide tactile spring press feedback (`active:scale-[0.97]`).
   - Inputs provide clear focus states: `focus:border-apple-blue`.

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

### Gate 9: UI Craft by SmoothDev & SmoothUI File-Upload Standard
- **SmoothUI File-Upload Integration (`SmoothFileUpload`)**:
  - Direct file upload for taxpayers to attach CNIC images (front, back, combined), bank statements, salary slips, and withholding tax certificates.
  - Drag-and-drop frosted glass upload surface with live file manifest, category selection, thumbnail preview, file size limits (15MB), and removal triggers.
- **Manual Filing Routing Rule**:
  - For taxpayers who prefer to enter tax details manually without uploading files, an explicit and prominent affordance must route them to the FBR 8-Window Simplified e-Return AppClip (`fbr-simplified-intake`).
  - Available across `SmoothFileUpload`, `ChecklistClip`, `TaxIntakeClip`, and `/requirements`.

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
  - G5: Apple palette `#0071E3` / `#F5F5F7`, valid CSS comments, no fake folio refs, `/api/documents` uploads, dark-mode white logo
  - G6: ESLint (`next lint`)
  - G7: Next.js production `npm run build` (never hide webpack output; `tsc` is not enough)
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

Source of truth: `src/themes/tokens.css`. No teal/gunmetal glow palette. No `--accent-glow`.

| Role | Light | Dark |
|---|---|---|
| Canvas | `#F5F5F7` | `#000000` |
| Label | `#000000` (`text-ink`) | `#FFFFFF` |
| Secondary body | Space Gray / 60% label (`text-ash`) | `#8E8E93` |
| CTA | `#0071E3` | `#0A84FF` |

Default theme is **light**. Logo is white in dark mode. Headings use label color; body copy uses secondary — never all-white text in dark mode.

## 2b. Documents & case storage

- **Bytes:** Neon object storage, bucket `assets`, key `tax/{uuid}/{filename}`. Client: `src/lib/s3.ts`. Upload: `POST /api/documents`. View: `GET /api/documents/view?key=`.
- **Pointers:** Neon Postgres `tax_filings.raw_payload.documents[]` (`key`, `url`, `name`, `category`). No S3 column.
- **Cases:** FastAPI `POST /api/tax/intake`, `GET /api/tax/track`. Folio `YS-26-#####` only via `postIntake()`.
- **Stage update:** `UPDATE tax_filings SET status = 'reviewing' WHERE reference = 'YS-26-XXXXX';` (`pending`/`reviewing`/`reconciled`/`submitted`).

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
│       ├── intake/route.ts     # Proxy to FastAPI /api/tax/intake
│       ├── track/route.ts      # Proxy to FastAPI /api/tax/track
│       └── documents/          # PUT to Neon bucket `assets`; view signs GET
├── components/
│   ├── clips/                  # Mobile-first AppClips
│   │   ├── FbrSimplifiedClipWizard.tsx # SRO 1561(I)/2025 8-Window Simplified Wizard
│   │   ├── PersonaClip.tsx     # Standalone touch experience for all 4 profiles
│   │   ├── TaxIntakeClip.tsx   # Fast 3-step mobile intake
│   │   ├── ChecklistClip.tsx   # Mobile document checklist bottom sheet
│   │   ├── PricingClip.tsx     # Mobile pricing bottom sheet
│   │   └── IrisGuideClip.tsx   # Mobile Iris Annex A bottom sheet
│   ├── ui/
│   │   ├── file-upload.tsx     # SmoothFileUpload → /api/documents
│   │   ├── glass/              # Glass primitives (no glow)
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
