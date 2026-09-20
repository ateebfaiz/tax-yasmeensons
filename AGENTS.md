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

### 1.5 Gate 5: Safari History Dark Glass UI Standard
- All AppClips must strictly follow the **Safari History dark glass UI** design specification:
  - Deep page/backdrop canvas: `#07131b` with a soft radial teal glow (`rgba(32, 182, 165, 0.15)`).
  - Translucent charcoal glass panels: `rgba(27, 37, 43, 0.72)` / `rgba(22, 30, 36, 0.88)` with `backdrop-filter: blur(20px) saturate(140%)`.
  - Borders: 1px fine translucent outline (`rgba(255, 255, 255, 0.12)`).
  - Accents: Emerald/Teal (`#20b6a5` / `#0d978b`) for active states, checkmarks, and primary actions.
  - **NO bright white cards** on mobile bottom sheets or AppClips.

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

1. **Local Quality Gates Runner (All 5 gates on-device)**:
   ```bash
   npm run check-gates
   # or: ./scripts/run-quality-gates.sh
   ```
   Must pass all 5 gates (Zero-credentials, No-hardcoding, AppClip natural height, Mobile accessibility, Next.js build).

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
