# CLAUDE.md — tax-yasmeensons quick ref

Workspace: `/home/ateeb/projects/tax-yasmeensons`  
Site: `tax.yasmeensons.com`  
Desk API: `https://ys-fastapi-backend.fastapicloud.dev/api/tax`  
Full rules: [AGENTS.md](./AGENTS.md)

```bash
npm run check-gates    # G1–G7 (lint + real next build)
npm run build
npm run lint
npm run typecheck
npm run dev
grep -rn "03120947187" src/ | grep -v "config.ts"   # must be empty
```

## Do not

- Ask for FBR IRIS password/PIN. Column is `client_notes`, never `credentials_notes`.
- Return `{ success: true }` if the case was not written.
- Invent folio IDs (`TAX-2026-CLIP`, `YS-26-FBR`). Use `postIntake()` — requires `YS/ITR/TY2026/#####` (legacy `YS-26-#####` still looks up).
- Hardcode WhatsApp numbers. Use `SITE_CONFIG` + `formatWhatsAppUrl`.
- Skip `npm run build`. CSS/`*/ */` breaks are invisible to `tsc`.
- Put all dark-mode text in white. Headings `text-ink`, body `text-ash`.
- Add color glows (`shadow-[0_0_…]`).
- Commit `.env.local` or Neon object-storage secrets.

## Storage

| What | Where |
|---|---|
| Case row | Neon Postgres `tax_filings` via FastAPI |
| File bytes | Neon object storage bucket **`assets`**, key `tax/{uuid}/{file}` |
| File pointer | `tax_filings.raw_payload.documents[]` (`key` + `/api/documents/view?key=`) |

Env: `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION=us-east-1`, `S3_BUCKET=assets`. Must also be set on Vercel.

Update stage:

```sql
UPDATE tax_filings SET status = 'reviewing', updated_at = NOW()
WHERE reference = 'YS/ITR/TY2026/XXXXX';
```

`pending` → 1, `reviewing` → 2, `reconciled` → 3, `submitted`/`active` → 4.

## Design

- Accent: Apple Blue `#0071E3` (dark `#0A84FF`). Canvas `#F5F5F7` / `#000`.
- Type: SF Pro on Apple (`-apple-system`); Inter fallback; NY/SF Display titles; SF Mono refs; Noto Nastaliq Urdu only for Urdu.
- Default theme **light**. Logo white in dark mode.
- AppClip: `height: auto; max-height: 90dvh`.
- Human copy: “tax desk”, not “FastAPI Cloud Microservice Authority”.
