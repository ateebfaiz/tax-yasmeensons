# AGENTS.md — Developer & Agent Instructions for tax-yasmeensons

Welcome to **`tax.yasmeensons.com`** ([github.com/ateebfaiz/tax-yasmeensons](https://github.com/ateebfaiz/tax-yasmeensons)).
All agents operating in this repository must strictly adhere to the policies, invariants, and architectural rules documented here.

---

## 1. Non-Negotiable Invariants

### 1.1 Zero-Credential Security
- **NEVER** ask for, collect, store, transmit, or log a taxpayer's FBR Iris password or 4-digit PIN.
- Any password input or automated Iris login attempt is an immediate, critical vulnerability.

### 1.2 Strict Dual Viewport Segregation
- **Desktop (`min-width: 768px`)**:
  - Classical 2-column Senior Tax Practice format (left sticky context, right declaration wizard/evidence).
  - **NEVER** display buttons that trigger mobile bottom-sheet AppClips on desktop. Use standard `<Link>` elements or deep links (`/start?tier=...`).
- **Mobile (`max-width: 767px`)**:
  - Secondary pages, persona briefings, and intakes must render inside **ultra-frosted, translucent liquid glass AppClips** (`AppClipSheet`).
  - **NEVER** embed the desktop multi-step form (`SeniorIntakeWizard`) inside an AppClip. Use dedicated touch components (`PersonaClip.tsx` and `TaxIntakeClip.tsx`).
  - Mobile footer links must trigger AppClips via `appClip.open(...)`.

### 1.3 Mandatory Bilingual Mirroring (English & Urdu)
- All labels, cards, error messages, and form fields must have both English and Urdu Nastaleeq (`font-urdu` with `dir="rtl"`).
- Always use `BilingualLabel` for form controls.

---

## 2. Essential Documentation & Guides

Before undertaking changes, consult the relevant guides in the [`docs/`](file:///home/ateeb/projects/tax-yasmeensons/docs) directory:
- [`docs/ARCHITECTURE_AND_POLICIES.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/ARCHITECTURE_AND_POLICIES.md) — Architectural tokens, glassmorphism specs, and full DOs/DON'Ts.
- [`docs/FBR_INDIVIDUAL_REGISTRATION_GUIDE.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/FBR_INDIVIDUAL_REGISTRATION_GUIDE.md) — Comprehensive FBR Iris portal registration rules, SIM ownership, email assistance, and overseas NICOP procedures.
- [`docs/MESSAGE_TEMPLATES_PRC_WHT.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/MESSAGE_TEMPLATES_PRC_WHT.md) — Ready-to-use copy-paste templates for PRC, Bank WHT (s.164), and Mobile SIM tax statements.

---

## 3. Package Tiers & Official Codes

- **GF-1000**: Guided Filing — Single source income, self-submission (PKR 1,000).
- **FA-2500**: Complete Assistance (Recommended) — Employer s.149, wealth statement balance s.116, WHT audit (PKR 2,500).
- **CX-4500**: Complex Filing & Wealth Audit — Multi-employer, freelance foreign remittance PRC, high-net-worth wealth statement (PKR 4,500+).

---

## 4. Key Component Mapping

| Purpose | Component File | Viewport |
|---|---|---|
| Desktop 4-Part Filing Wizard | [`src/components/tax/SeniorIntakeWizard.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/tax/SeniorIntakeWizard.tsx) | Desktop (`hidden md:block`) |
| Mobile 3-Step Filing Clip | [`src/components/clips/TaxIntakeClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/TaxIntakeClip.tsx) | Mobile (`block md:hidden`) |
| Mobile Persona Briefings | [`src/components/clips/PersonaClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/PersonaClip.tsx) | Mobile (`block md:hidden`) |
| Liquid Glass Bottom Sheet | [`src/components/ui/app-clip/AppClipSheet.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/ui/app-clip/AppClipSheet.tsx) | Mobile (`max-w-lg fixed bottom-0`) |
| Mobile Tab Navigation | [`src/components/navigation/liquid-glass-tab-bar.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/navigation/liquid-glass-tab-bar.tsx) | Mobile (`block md:hidden`) |
| Viewport-Adaptive Header | [`src/components/ui/tax-dynamic-island.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/ui/tax-dynamic-island.tsx) | Desktop & Mobile |
| Footer | [`src/components/navigation/footer.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/navigation/footer.tsx) | Dual-Viewport |

---

## 5. Verification Checklist Before Any Commit or PR

1. **Static Build Check**:
   ```bash
   npm run build
   ```
   Must compile 14/14 static pages with zero TypeScript or lint errors.

2. **Puppeteer Headless UI Audit**:
   ```bash
   node scripts/audit_ui.mjs
   ```
   Must verify that all 7 routes at 390px and 1440px have `hasOverflow: false` (0 horizontal bleeding) and mobile AppClip interaction opens smoothly.

3. **Viewport Review**:
   Ensure no `appClip.open(...)` buttons are visible on desktop viewports.
