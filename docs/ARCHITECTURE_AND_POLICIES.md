# System Architecture, Strict Policies & Engineering Guide
**Yasmeen & Sons Tax Practice Platform (`tax.yasmeensons.com`)**
**Repository**: `ateebfaiz/tax-yasmeensons`

---

## 1. Core Invariants (Non-Negotiable)

### Invariant 1: Zero-Credential Security (FBR Iris Password Protection)
- **NEVER** ask for, collect, store, transmit, or log a taxpayer's FBR Iris password or 4-digit PIN.
- The platform functions strictly as a **facilitation and preparation desk**:
  - We verify taxpayer status, compute tax slabs, audit Section 149/235/236 deductions, and balance Section 116 wealth reconciliations to 0.00.
  - The client retains exclusive custody of their official FBR Iris credentials and completes final submission themselves, or inspects the draft with guidance.
- Any pull request or commit that introduces password fields or attempts to automate Iris login with client credentials is an immediate, catastrophic security breach.

### Invariant 2: Strict Viewport Segregation (Dual Viewport Architecture)
- The site operates two fundamentally distinct viewports:
  1. **Desktop Viewport (`md:block`, `min-width: 768px`)**:
     - Authoritative, classical **two-column Senior Tax Practice** layout.
     - Left column: Sticky context, legal mandates, tax seal, practitioner contact.
     - Right column: Declarations, multi-step filing wizard (`SeniorIntakeWizard`), evidence modules.
     - **STRICT RULE**: Desktop views must **NEVER** render buttons that open mobile bottom-sheet AppClips (e.g. no "Fast AppClip Intake" buttons). All desktop actions must use standard Next.js `<Link>` navigation or deep links to `/start?tier=...`.
  2. **Mobile Viewport (`block md:hidden`, `max-width: 767px`)**:
     - All secondary pages, profile briefings, and forms render inside **frosted, translucent, liquid glass AppClips** (`AppClipSheet`).
     - **STRICT RULE**: **NEVER** embed the desktop multi-step wizard (`SeniorIntakeWizard`) inside a mobile AppClip. Mobile views must strictly use dedicated, touch-first components (e.g., [`PersonaClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/PersonaClip.tsx) and [`TaxIntakeClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/TaxIntakeClip.tsx)).
     - All mobile footer links must trigger purpose-built AppClips rather than desktop pages.

### Invariant 3: Mandatory Bilingual Mirroring (English & Nastaleeq Urdu)
- Every single label, card, heading, form input, and error notification must provide stacked or side-by-side **English** and **Nastaleeq Urdu** (`font-urdu` with `dir="rtl"`).
- Always use the [`BilingualLabel`](file:///home/ateeb/projects/tax-yasmeensons/src/components/tax/BilingualLabel.tsx) component for form controls.

---

## 2. Design System & Visual Tokens

### Color Palette
```css
--ink:           #0B1C2C;   /* Deep corporate navy */
--iris-teal:     #0E5C57;   /* FBR Inland Revenue teal */
--brass:         #C4A046;   /* Rich antique brass / gold */
--brass-light:   #E2C374;   /* Illuminated brass highlight */
--paper:         #F4EFE6;   /* Warm parchment background */
--paper-light:   #FBF8F3;   /* Light card surface */
--folio:         #FFFFFF;   /* Crisp document paper */
--rule:          #D7D0C4;   /* Subtle docket border */
--rule-light:    #EBE6DD;   /* Secondary hairline divider */
--stamp-red:     #8E1D2A;   /* Statutory red seal */
--ash:           #5A6472;   /* Muted administrative gray */
```

### Liquid Glassmorphism Tokens
- Sheet container: `bg-white/55 dark:bg-[#07121D]/60`
- Blur & saturation: `backdrop-blur-3xl backdrop-saturate-150`
- Specular highlight rim: `border-t border-x border-white/70 dark:border-white/20`
- Inset specular reflection: `shadow-[0_-20px_60px_rgba(0,0,0,0.18),inset_0_1px_1px_0_rgba(255,255,255,0.85)]`
- Inner glass cards: `bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10`

### Typography Hierarchy
- **Serif Headers**: `Playfair Display`, `font-serif`
- **Body & Sans**: `IBM Plex Sans`, `font-sans`
- **Monospace Codes & Tiers**: `IBM Plex Mono`, `font-mono`
- **Urdu Text**: `Noto Nastaliq Urdu`, `font-urdu` with `dir="rtl"`

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
│   ├── page.tsx               # Index page (Hero, Quick Tray, Comparison, FAQs, Pricing)
│   ├── start/page.tsx          # Desktop: SeniorIntakeWizard | Mobile: TaxIntakeClip
│   ├── salaried/page.tsx       # Desktop: 2-column SAL | Mobile: PersonaClip(salaried)
│   ├── pensioners/page.tsx     # Desktop: 2-column PEN | Mobile: PersonaClip(pensioner)
│   ├── no-income/page.tsx      # Desktop: 2-column HIF | Mobile: PersonaClip(housewife)
│   ├── students/page.tsx       # Desktop: 2-column STU | Mobile: PersonaClip(student)
│   ├── requirements/page.tsx   # Interactive filterable documentation & evidence checklist
│   ├── services/page.tsx       # Standalone fee schedule & SLA details
│   ├── iris-guide/page.tsx     # Annex A: Comprehensive official FBR Iris portal guide
│   └── api/intake/route.ts     # Ingestion endpoint: Neon DB + Todoist P1 dispatch
├── components/
│   ├── clips/                  # Mobile-first AppClips
│   │   ├── PersonaClip.tsx     # Standalone touch experience for all 4 profiles
│   │   ├── TaxIntakeClip.tsx   # 3-step fast mobile intake with instant WhatsApp dispatch
│   │   ├── ChecklistClip.tsx   # Mobile document checklist bottom sheet
│   │   ├── PricingClip.tsx     # Mobile pricing bottom sheet
│   │   └── IrisGuideClip.tsx   # Mobile Iris Annex A bottom sheet
│   ├── navigation/
│   │   ├── footer.tsx          # Dual-viewport footer (Mobile AppClips / Desktop Links)
│   │   └── liquid-glass-tab-bar.tsx # Floating mobile frosted glass tab bar
│   ├── tax/
│   │   ├── SeniorIntakeWizard.tsx  # Desktop 4-part filing wizard
│   │   ├── TaxCertificateTemplates.tsx # Copy-paste PRC & WHT templates
│   │   └── BilingualLabel.tsx      # Mandatory dual-language label
│   └── ui/
│       ├── app-clip/           # AppClip engine (AppClipProvider, AppClipSheet, AppClipRegistry)
│       ├── tax-dynamic-island.tsx # Viewport-adaptive dynamic island
│       └── tax-seal.tsx        # Official Yasmeen & Sons tax seal
```

---

## 5. Strict Engineering Policies (DOs & DON'Ts)

### DO:
1. **DO verify both viewports**: Always test changes at **390px** (Mobile) and **1440px** (Desktop).
2. **DO run the Puppeteer audit**: Run `node scripts/audit_ui.mjs` before committing any visual or layout changes. Ensure zero horizontal scroll (`scrollWidth === innerWidth`).
3. **DO use `md:hidden` and `hidden md:inline`**: Separate mobile AppClip triggers from desktop standard links cleanly.
4. **DO validate CNIC formatting**: Always enforce the 13-digit format (`35202-XXXXXXX-X`) for display and 13 clean digits for API submissions.
5. **DO handle SIM ownership**: Record whether the mobile SIM is in the taxpayer's own name or an immediate blood relative's name.

### DON'T:
1. **DON'T add AppClip buttons to Desktop**: Desktop users must never see "Fast AppClip Form" or trigger slide-up bottom sheets.
2. **DON'T embed Desktop wizards in Mobile sheets**: Never put `SeniorIntakeWizard` into an `AppClipSheet`. Use `TaxIntakeClip` or `PersonaClip`.
3. **DON'T omit Urdu text**: Never submit single-language English UI components.
4. **DON'T touch Iris credentials**: Never create input fields with `type="password"` for Iris or ask for Iris PINs.
5. **DON'T hardcode WhatsApp numbers**: Always use `03120947187` and format links via `formatWhatsAppUrl(message, "03120947187")`.
6. **DON'T break the Neon DB contract**: Case references must strictly follow `YS-26-XXXXX`.
