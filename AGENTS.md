# AGENTS.md — Developer & Agent Instructions for tax-yasmeensons

Welcome to **`tax.yasmeensons.com`** ([github.com/ateebfaiz/tax-yasmeensons](https://github.com/ateebfaiz/tax-yasmeensons)).  
All agents operating in this repository must strictly adhere to the policies, invariants, and architectural quality gates documented here.

---

## 1. Non-Negotiable Invariants & Quality Gates

### 1.1 Invariant 1: Zero-Credential Security (FBR Iris Password Protection)
- **NEVER** ask for, collect, store, transmit, or log a taxpayer's FBR Iris password or 4-digit PIN.
- Any password input or automated Iris login attempt is an immediate, critical vulnerability.
- Schema columns and variables must use `client_notes` / `intake_notes`, never `credentials_notes`.

### 1.2 Gate 2: Strict No-Hardcoding Gate
- **NEVER** hardcode WhatsApp phone numbers (`03120947187`) or URLs directly in components or strings.
- **ALWAYS** import from `SITE_CONFIG` ([`src/lib/config.ts`](file:///home/ateeb/projects/tax-yasmeensons/src/lib/config.ts)) and format links via `formatWhatsAppUrl(message)`.
- Backend endpoints must be resolved through `FASTAPI_BACKEND_URL` (`https://ys-fastapi-backend.fastapicloud.dev`).

### 1.3 Gate 3: Fail-Fast & Zero-Vanishing-Order API Contract
- API routes ([`src/app/api/intake/route.ts`](file:///home/ateeb/projects/tax-yasmeensons/src/app/api/intake/route.ts)) must **NEVER** silently swallow database or Todoist errors with empty `catch` blocks that pretend success (`{ success: true }`).
- If backend persistence fails, the API must fail fast with HTTP 502/503 and return an actionable message with an automated WhatsApp fallback so customer cases never vanish into thin air.

### 1.4 Gate 4: FastAPI Cloud Database & Todoist Authority
- Database persistence and Todoist P1 notifications are handled centrally by the persistent **FastAPI Cloud Backend Service** ([`https://ys-fastapi-backend.fastapicloud.dev`](https://ys-fastapi-backend.fastapicloud.dev)).
- Next.js serverless functions act as authenticated HTTP proxies to FastAPI Cloud, preventing connection pooling exhaustion and environment drift.

### 1.5 Gate 5: Apple Human Interface Guidelines (HIG) Foundations Standard
- All components, sheets, navigation, and pages MUST strictly conform to **Apple Human Interface Guidelines (HIG) Foundations**:
  - **Official Apple System Palette**: Strictly use Apple default system colors: System Blue (`#007AFF` / `#0A84FF`), System Orange (`#FF9500` / `#FF9F0A`), System Green (`#34C759` / `#30D158`), System Red (`#FF3B30` / `#FF453A`), System Gray 1–6, and dynamic labels/materials.
  - **Official Apple System Typography**: Adopt Apple's default font stacks (SF Pro Text/Display for sans, New York for serif, SF Mono for code, SF Pro Rounded for metrics). Urdu script uses Noto Nastaliq Urdu exclusively.
  - **Contrast & Legibility First**: All text must maintain minimum 4.5:1 (AA) and ideally 7:1+ (AAA) contrast in BOTH Light and Dark modes.
  - **First-Class Dual Appearance**: Seamless toggle and automatic system preference support for Light and Dark modes.
  - **Optical Frosted Glass Blur & Vibrancy**: Hardware-accelerated materials (`backdrop-filter: blur(24px-32px) saturate(180%-190%)` with `WebkitBackdropFilter`), subtle scrims (`bg-black/25 dark:bg-black/50`), and fine specular borders (`border-black/[0.08] dark:border-white/[0.12]`).
  - **44x44pt Touch Targets**: All buttons, links, inputs, and close triggers MUST have at least 44x44px touch targets.
  - **Safe Areas & Natural Viewports**: Clamped `env(safe-area-inset-bottom)` and naturally sizing content (`max-height: 90dvh`).
  - **Tactile Feedback**: Spring animations and `active:scale-[0.97]` touch responsiveness.

### 1.6 Gate 6: Zero Empty Space & Dynamic Viewport Standard
- **NEVER** use static `height: 92dvh` or arbitrary fixed heights that leave large blank areas at the bottom of AppClips.
- Base sheet ([`AppClipSheet.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/ui/app-clip/AppClipSheet.tsx)) and all clips must size **naturally** (`height: auto; max-height: 90dvh`).
- All mobile viewport heights must use `100dvh` instead of `100vh`.
- Safe-area bottom padding must be clamped: `padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 16px)`.
- All modals must keep close buttons in a stable top-right position with a minimum 44px tap target.

### 1.7 Gate 7: FBR 8-Window Simplified Non-Business Spec (SRO 1561(I)/2025)
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

### 1.8 Gate 8: Additive Evolution Rule
- **NEVER** remove or wipe out existing sections, pages, pricing cards, or guides when making improvements.
- All enhancements (Hero updates, 4-step workflow, customer reviews, urgency deadline banner, `/track` portal, new menu links) must be **additive** and preserve all current functionality.

### 1.9 Gate 9: UI Craft by SmoothDev & SmoothUI File-Upload Standard
- Direct file upload for taxpayers via `SmoothFileUpload` to attach bank statements, CNIC copies (front, back, combined), salary slips, and withholding tax certificates.
- Explicit and prominent manual entry routing to FBR 8-Window Simplified e-Return AppClip (`fbr-simplified-intake`) for taxpayers who prefer entering numbers manually.

---

## 2. Key Component & File Mapping

| Purpose | Component File | Viewport |
|---|---|---|
| Desktop 4-Part Filing Wizard | [`src/components/intake/SeniorIntakeWizard.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/intake/SeniorIntakeWizard.tsx) | Desktop (`hidden md:block`) |
| FBR 8-Window Simplified AppClip Wizard | [`src/components/clips/FbrSimplifiedClipWizard.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/FbrSimplifiedClipWizard.tsx) | Mobile (`block md:hidden`) |
| Mobile 3-Step Filing Clip | [`src/components/clips/TaxIntakeClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/TaxIntakeClip.tsx) | Mobile (`block md:hidden`) |
| Mobile Persona Briefings | [`src/components/clips/PersonaClip.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/clips/PersonaClip.tsx) | Mobile (`block md:hidden`) |
| Dark Glass Bottom Sheet | [`src/components/ui/app-clip/AppClipSheet.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/ui/app-clip/AppClipSheet.tsx) | Mobile (`max-w-lg fixed bottom-0`) |
| Dark Glass Primitives | `src/components/ui/glass/` (`GlassSheet`, `GlassCard`, `GlassButton`) | Universal |
| Mobile Tab Navigation | [`src/components/navigation/liquid-glass-tab-bar.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/components/navigation/liquid-glass-tab-bar.tsx) | Mobile (`block md:hidden`) |
| Case Progress Tracking | [`src/app/track/page.tsx`](file:///home/ateeb/projects/tax-yasmeensons/src/app/track/page.tsx) / `/api/track` | Dual-Viewport |
| FastAPI Cloud Backend | `https://ys-fastapi-backend.fastapicloud.dev/api/tax` | Microservice |

---

## 3. Verification Checklist Before Any Commit or PR

1. **Local Quality Gates Runner (All 7 gates on-device)**:
   ```bash
   npm run check-gates
   # or: ./scripts/run-quality-gates.sh
   ```
   Must pass all 7 gates (Zero-credentials, No-hardcoding, AppClip natural height, Mobile accessibility, Apple palette + uploads + CSS comments, ESLint, Next.js production build).

2. **Puppeteer Headless UI Audit**:
   ```bash
   node scripts/audit_ui.mjs
   ```
   Must verify that all routes at 390px and 1440px have `hasOverflow: false` (0 horizontal bleeding) and mobile AppClip interaction opens smoothly with zero blank vertical gaps.

3. **No-Hardcoding Check**:
   ```bash
   grep -rn "03120947187" src/ | grep -v "config.ts"
   ```
   Must return zero lines.
