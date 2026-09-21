#!/usr/bin/env bash
# Local quality gates for tax.yasmeensons.com
set -euo pipefail

fail() { echo "ERROR: [$1 FAILED] $2"; exit 1; }
pass() { echo "    [$1 PASSED] $2"; }

echo "================================================="
echo "   Tax Yasmeensons Frontend - Local Quality Gates "
echo "================================================="

# G1 - Zero-Credentials
echo "--> [G1] Prohibited credential fields..."
if grep -rEi "(iris_password|irisPassword|iris_pin|irisPin|user_password|fbr_password|credentials_notes|credentialsNotes)" src/ 2>/dev/null; then
  fail G1 "Credential collection pattern found in src/."
fi
pass G1 "Zero-credentials policy maintained."

# G2 - No hardcoded phones
echo "--> [G2] Hardcoded phone numbers..."
if grep -rE --exclude="config.ts" "0312[0-9]{7}|92312[0-9]{7}" src/ 2>/dev/null; then
  fail G2 "Hardcoded WhatsApp numbers. Use SITE_CONFIG.contact.whatsapp."
fi
pass G2 "Contact numbers only in config.ts."

# G3 - AppClip natural height
echo "--> [G3] AppClip dead-space heights..."
if grep -rE "h-\[92dvh\]" src/components/ui/app-clip/ 2>/dev/null; then
  fail G3 "Static h-[92dvh] in AppClipSheet."
fi
pass G3 "Natural sheet height."

# G4 - Pinch-to-zoom
echo "--> [G4] Viewport accessibility..."
if grep -q "userScalable: false" src/app/layout.tsx; then
  fail G4 "userScalable: false in layout.tsx."
fi
pass G4 "Pinch-to-zoom preserved."

# G5 - Apple palette + persist + no fake refs
echo "--> [G5] Apple palette, uploads, no fake folio refs..."
grep -q "#0071[Ee]3\|0 113 227" src/themes/tokens.css || fail G5 "Apple Blue #0071E3 missing from tokens.css."
grep -q "#[Ff]5[Ff]5[Ff]7\|245 245 247" src/themes/tokens.css || fail G5 "Off-white #F5F5F7 missing from tokens.css."
if grep -nE '\*/[[:space:]]*\*/' src/themes/tokens.css src/app/*.css 2>/dev/null; then
  fail G5 "Broken CSS comment (stray */) in tokens/globals."
fi
if grep -rE "TAX-2026-(CLIP|DIRECT|RECORD)|YS-26-FBR" src/ 2>/dev/null; then
  fail G5 "Fake case-reference fallback still present."
fi
grep -q "export async function postIntake" src/lib/intake.ts || fail G5 "postIntake helper missing."
grep -q "/api/documents" src/components/ui/file-upload.tsx || fail G5 "File upload does not POST /api/documents."
[ -f src/app/api/documents/route.ts ] || fail G5 "src/app/api/documents/route.ts missing."
grep -q "variant={resolvedTheme === \"dark\" ? \"white\" : \"black\"}" src/components/navigation/header.tsx \
  || fail G5 "Header logo is not white in dark mode."
pass G5 "Palette, CSS comments, uploads, and folio contract OK."

# G6 - Lint (must not be skipped; Vercel runs next lint during build if eslint is present)
echo "--> [G6] ESLint..."
npx next lint
pass G6 "Lint clean."

# G7 - Production build (do not hide output — CSS/webpack errors must be visible)
echo "--> [G7] Next.js production build..."
npm run build
pass G7 "Production build succeeded."

echo "================================================="
echo "   ALL FRONTEND QUALITY GATES PASSED (100% OK)   "
echo "================================================="
