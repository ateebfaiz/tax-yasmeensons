#!/usr/bin/env bash
# Local On-Device Quality Gates Runner for Tax Yasmeensons Frontend
# Runs all 5 UI, Security, Hardcoding, and Build gates locally on-device.

set -euo pipefail

echo "================================================="
echo "   Tax Yasmeensons Frontend - Local Quality Gates "
echo "================================================="

# G1 - Zero-Credentials Gate
echo "--> [G1] Checking for prohibited credential fields (IRIS password/PIN)..."
if grep -rEi "(iris_password|irisPassword|iris_pin|irisPin|user_password|fbr_password)" src/ 2>/dev/null; then
  echo "ERROR: [G1 FAILED] Credential collection pattern found in src/! Never request IRIS passwords/PINs."
  exit 1
fi
echo "    [G1 PASSED] Zero-credentials policy maintained."

# G2 - No-Hardcoding Gate
echo "--> [G2] Checking for hardcoded phone numbers in src/ (excluding config.ts)..."
if grep -rE --exclude="config.ts" "0312[0-9]{7}|92312[0-9]{7}" src/ 2>/dev/null; then
  echo "ERROR: [G2 FAILED] Hardcoded WhatsApp phone numbers found in src/! Use SITE_CONFIG.contact.whatsapp."
  exit 1
fi
echo "    [G2 PASSED] Zero hardcoded contact numbers in UI source."

# G3 - AppClip Zero-Void Layout Gate
echo "--> [G3] Checking AppClip viewport containers for dead space patterns..."
if grep -rE "h-\[92dvh\]" src/components/ui/app-clip/ 2>/dev/null; then
  echo "ERROR: [G3 FAILED] Found static fixed height h-[92dvh] in AppClipSheet! Must use natural dynamic sizing."
  exit 1
fi
echo "    [G3 PASSED] Dynamic natural sheet height enforced."

# G4 - Mobile Viewport & Accessibility Gate
echo "--> [G4] Checking viewport accessibility configuration in layout.tsx..."
if grep -q "userScalable: false" src/app/layout.tsx; then
  echo "ERROR: [G4 FAILED] userScalable: false detected in layout.tsx! Pinch-to-zoom must remain accessible."
  exit 1
fi
echo "    [G4 PASSED] Mobile accessibility pinch-to-zoom preserved."

# G5 - UI Craft by SmoothDev & Apple HIG System Design Gate
echo "--> [G5] Checking UI Craft by SmoothDev and Apple HIG compliance..."
if [ ! -f "src/components/ui/file-upload.tsx" ]; then
  echo "ERROR: [G5 FAILED] SmoothFileUpload component missing from src/components/ui/file-upload.tsx!"
  exit 1
fi
if ! grep -q "export function SmoothFileUpload" src/components/ui/file-upload.tsx; then
  echo "ERROR: [G5 FAILED] SmoothFileUpload is not properly exported in src/components/ui/file-upload.tsx!"
  exit 1
fi
if ! grep -q "fbr-simplified-intake" src/components/ui/app-clip/AppClipRegistry.tsx; then
  echo "ERROR: [G5 FAILED] Manual entry fallback 'fbr-simplified-intake' missing from AppClipRegistry.tsx!"
  exit 1
fi
if ! grep -q "WebkitBackdropFilter" src/components/ui/app-clip/AppClipSheet.tsx; then
  echo "ERROR: [G5 FAILED] WebkitBackdropFilter missing from AppClipSheet.tsx! Apple frosted glass blur required."
  exit 1
fi
if ! grep -q "\-\-apple-blue" src/themes/tokens.css; then
  echo "ERROR: [G5 FAILED] Apple system blue token missing from tokens.css!"
  exit 1
fi
echo "    [G5 PASSED] UI Craft by SmoothDev & Apple HIG design tokens verified."

# G6 - TypeScript Build & Route Generation Gate
echo "--> [G6] Running Next.js build & typecheck..."
npm run build > /dev/null
echo "    [G6 PASSED] Next.js build succeeded (all routes compiled)."

echo "================================================="
echo "   ALL FRONTEND QUALITY GATES PASSED (100% OK)   "
echo "================================================="
