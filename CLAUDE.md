# CLAUDE.md — Quick Reference for Claude & AI Coding Assistants
**Workspace**: `/home/ateeb/projects/tax-yasmeensons`  
**Platform**: `tax.yasmeensons.com` (Pakistani Inland Revenue Individual Tax Facilitation)  
**Backend Authority**: FastAPI Cloud (`https://ys-fastapi-backend.fastapicloud.dev`)

---

## ⚡ Essential Commands
```bash
# Run All Local On-Device Quality Gates
npm run check-gates

# Build & Typecheck (Must compile cleanly)
npm run build

# Start Dev Server
npm run dev

# Run Automated Puppeteer UI Audit (Mobile & Desktop Viewports)
node scripts/audit_ui.mjs

# Strict No-Hardcoding Gate
grep -rn "03120947187" src/ | grep -v "config.ts"
```

---

## 🛡️ Strict Quality Gates & Invariants

1. **Zero-Credential Security**: NEVER ask for, store, or accept FBR Iris passwords or PINs. Column name is `client_notes`, never `credentials_notes`.
2. **Strict No-Hardcoding**: Never hardcode WhatsApp phone numbers or API URLs. Always import from `SITE_CONFIG` ([`src/lib/config.ts`](file:///home/ateeb/projects/tax-yasmeensons/src/lib/config.ts)) and use `formatWhatsAppUrl`.
3. **Fail-Fast API Contract**: `/api/intake` must NEVER silently swallow DB errors and pretend success. If backend fails, return 502/503 with WhatsApp fallback.
4. **FastAPI Cloud Database Authority**: All DB persistence and Todoist P1 dispatching must route to FastAPI Cloud backend (`https://ys-fastapi-backend.fastapicloud.dev/api/tax`).
5. **Apple HIG Foundations Standard**: Full Apple HIG compliance across colors, contrast (WCAG AAA 7:1+), dual light/dark appearance, 44x44pt touch targets, Apple optical frosted materials (`backdrop-filter: blur(24px-32px) saturate(180%-190%)` with `WebkitBackdropFilter`), official Apple system colors (System Blue `#007AFF`/`#0A84FF`, System Green `#34C759`/`#30D158`, System Orange `#FF9500`/`#FF9F0A`, System Red `#FF3B30`/`#FF453A`), and Apple system typography (SF Pro, New York, SF Mono, SF Pro Rounded).
6. **Zero Empty Space Gate**: All AppClips and `AppClipSheet` must size naturally (`height: auto; max-height: 90dvh`) without artificial blank voids below the content or CTAs. Use `100dvh` and clamped `env(safe-area-inset-bottom)`.
7. **FBR 8-Window Simplified Non-Business Spec (SRO 1561(I)/2025)**: Modular clips 0–7 with bilingual labels, Urdu hints, FBR code persistence (`5003`, `2031`, `s.149`, `s.116`), and real-time wealth recon to 0.00. Business income exits flow.
8. **Additive Evolution Rule**: Never remove existing sections or features. Enhancements to hero, menu, reviews, workflow, and tracking must be strictly additive.
9. **UI Craft by SmoothDev & SmoothUI File-Upload Standard**: Drag-and-drop file upload via `SmoothFileUpload` for bank statements, CNIC copies, and tax records, with prominent manual entry routing to `fbr-simplified-intake`.
