# AGENTS.md — tax.yasmeensons.com

Repo: [ateebfaiz/tax-yasmeensons](https://github.com/ateebfaiz/tax-yasmeensons)  
Live: `https://tax.yasmeensons.com`  
Desk API: `https://ys-fastapi-backend.fastapicloud.dev/api/tax`  
Branch: `feat/tax-platform-preview` (PR #1)

Read this file before editing. Do not invent architecture that contradicts it.

---

## Always before a commit or PR

```bash
npm run check-gates   # G1–G7 including ESLint + real `next build`
```

Gates (in `scripts/run-quality-gates.sh`):

| # | Check |
|---|---|
| G1 | No IRIS password/PIN / `credentials_notes` / `credentialsNotes` in `src/` |
| G2 | No hardcoded `0312…` phones outside `src/lib/config.ts` |
| G3 | No `h-[92dvh]` AppClip sheets |
| G4 | Pinch-to-zoom stays on (`userScalable` not false) |
| G5 | Apple Blue `#0071E3`, off-white `#F5F5F7`, no stray `*/ */` in CSS, no fake folio refs, uploads POST `/api/documents`, dark-mode white logo |
| G6 | `next lint` — zero errors |
| G7 | `npm run build` — must compile (do not hide webpack output) |

Also: `npm run typecheck`. Never skip G7. The Vercel CSS `*/ */` break was missed because a prior agent ran `tsc` only.

---

## Data plane (do not reverse this)

```
Browser
  POST /api/documents     → Neon Object Storage bucket `assets`  (bytes)
  POST /api/intake        → FastAPI /api/tax/intake              (case row)
  GET  /api/track         → FastAPI /api/tax/track               (status)
  GET  /api/documents/view?key=tax/…  → signed GET from `assets`
```

- **Cases** live in Neon Postgres table `tax_filings`. Next.js does **not** write this table itself.
- **Files** live in Neon S3-compatible storage. There is **no S3 column**. Pointers are JSON in `tax_filings.raw_payload.documents`.
- Client success requires a real folio from `postIntake()`. New dockets match `YS/ITR/TY2026/#####` (Yasmeen & Sons · Form 114(1) · Tax Year 2026). Lookup also accepts legacy `YS-26-#####`. Never mint `TAX-2026-CLIP`, `TAX-2026-DIRECT`, or `YS-26-FBR`.
- If intake fails: HTTP 503 + WhatsApp fallback. Never `{ success: true }` on a missed write.

### Object storage

Env (local `.env.local`, also required on Vercel):

```
AWS_ENDPOINT_URL_S3=https://….storage.c-9.us-east-1.aws.neon.tech
AWS_ACCESS_KEY_ID=nak_live_…
AWS_SECRET_ACCESS_KEY=nsk_live_…
AWS_REGION=us-east-1
S3_BUCKET=assets
```

- Client: `src/lib/s3.ts` (`forcePathStyle: true`)
- PUT key: `tax/{uuid}/{safe-filename}`
- View URL stored on the case: `/api/documents/view?key=tax/…` (re-signs; do not persist expiring signed URLs)

### Update a case (desk)

```sql
UPDATE tax_filings
SET status = 'reviewing',   -- pending | reviewing | reconciled | submitted
    updated_at = NOW()
WHERE reference = 'YS/ITR/TY2026/XXXXX';
```

| `status` | `/track` stage |
|---|---|
| `pending` | 1 Received |
| `reviewing` / `in_progress` | 2 Document & WHT audit |
| `reconciled` / `ready_for_approval` | 3 Wealth recon |
| `submitted` / `completed` / `active` | 4 IRIS & ATL |

Optional: `PATCH /api/tax/cases/{ref}` with header `X-Tax-Desk-Key` = `TAX_DESK_TOKEN` or `FASTAPI_API_KEY`.

---

## Invariants

1. **Zero IRIS credentials.** Never ask for / store FBR password or PIN. Column is `client_notes`, never `credentials_notes`.
2. **No hardcoded phones or desk URLs.** `SITE_CONFIG` + `formatWhatsAppUrl`. FastAPI via `FASTAPI_BACKEND_URL`.
3. **Fail-fast intake.** Proxy errors to 502/503. Clips must not show a folio unless `postIntake()` returns `ok`.
4. **Human copy.** Do not say “FastAPI Cloud Microservice Authority”. Say “filing desk” / “tax desk”.
5. **Apple HIG color & type** (see below). No color/text glows (`shadow-[0_0_…]`, `--accent-glow`).
6. **AppClips size to content** (`height: auto; max-height: 90dvh`), `100dvh`, 44px tap targets.
7. **FBR 8-window** (SRO 1561(I)/2025) clips 0–7. Business s.18 exits to concierge. Persist FBR codes in payload.
8. **Additive UI.** Do not delete existing pages/sections to “clean up” unless asked.
9. **Uploads.** `SmoothFileUpload` → `/api/documents` → bucket `assets`. Manual path: `fbr-simplified-intake`.
10. **Default theme is light.** Logo: black in light, **white** in dark (`StoreLogo variant`).

---

## Color (HIG labels, one accent)

Tokens: `src/themes/tokens.css`. Do not hardcode competing palettes.

| Role | Light | Dark |
|---|---|---|
| Canvas | Off-white `#F5F5F7` | `#000000` |
| Card | `#FFFFFF` | `#1C1C1E` / `#2C2C2E` |
| Label (headings) | `#000000` → `text-ink` | `#FFFFFF` |
| Secondary (body) | Space Gray / `rgba(60,60,67,0.60)` → `text-ash` | System Gray `#8E8E93` |
| Tertiary (captions) | `rgba(60,60,67,0.30)` | `rgba(235,235,245,0.30)` |
| Accent / CTA / links | Apple Blue `#0071E3` | System Blue `#0A84FF` |
| Success | `#34C759` | `#30D158` |
| Danger | `#FF3B30` | `#FF453A` |
| Silver | `#A2AAAD` | — |

Never paint all dark-mode copy `text-white`. Headings = label; body = `text-ash`. CSS comments must be valid (one `*/` per comment).

---

## Type

- **SF Pro** via `-apple-system, BlinkMacSystemFont, "SF Pro Text"` on Apple devices. Do **not** commit Apple font files.
- **Inter** (`next/font`, `--font-inter`) is the web fallback.
- **SF Pro Display** / New York (`font-display` / `font-serif`) for large titles.
- **SF Mono** (`font-mono`) for `YS/ITR/TY2026/#####` and FBR codes.
- **SF Rounded** (`font-rounded`) for pills/badges.
- **Noto Nastaliq Urdu** (`font-urdu`, `--font-urdu`) for Urdu only.
- Body ~17px Regular (HIG). Avoid Thin/Ultralight. Min ~11px.

---

## Map

| What | Where |
|---|---|
| Intake proxy | `src/app/api/intake/route.ts` |
| Track proxy | `src/app/api/track/route.ts` |
| Upload PUT | `src/app/api/documents/route.ts` + `src/lib/s3.ts` |
| Signed GET | `src/app/api/documents/view/route.ts` |
| Folio helper | `src/lib/intake.ts` → `postIntake()` |
| Config | `src/lib/config.ts` |
| Desktop wizard | `src/components/intake/SeniorIntakeWizard.tsx` |
| Mobile 8-window | `src/components/clips/FbrSimplifiedClipWizard.tsx` |
| Mobile 3-step | `src/components/clips/TaxIntakeClip.tsx` |
| Sheet | `src/components/ui/app-clip/AppClipSheet.tsx` |
| Upload UI | `src/components/ui/file-upload.tsx` |
| Track UI | `src/app/track/page.tsx` |
| Tax API (backend repo) | `yasmeen-sons/backend/tax.py` |

Tiers: GF-1000 / FA-2500 / CX-4500.

---

## Copy & UI nits

- Season banner: mobile `Tax Season 2026 · ATL Open` (no wrap); desktop full sentence; island `TAX SEASON 2026 · ATL OPEN`.
- Do not wrap other CTAs that already use `whitespace-nowrap`.
- No glow-hover grids. No `credentialsNotes` in submit payloads.
