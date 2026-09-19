# CLAUDE.md — Quick Reference for Claude & AI Coding Assistants
**Workspace**: `/home/ateeb/projects/tax-yasmeensons`  
**Platform**: `tax.yasmeensons.com` (Pakistani Inland Revenue Individual Tax Facilitation)

---

## ⚡ Essential Commands
```bash
# Build & Typecheck
npm run build

# Start Dev Server
npm run dev

# Run Automated Puppeteer UI Audit (Mobile & Desktop Viewports)
node scripts/audit_ui.mjs
```

---

## 🛡️ Strict Policies & Invariants

1. **Zero-Credential Security**: NEVER ask for, store, or accept FBR Iris passwords or PINs.
2. **Strict Viewport Partitioning**:
   - **Desktop (>= 768px)**: 2-column layout. NO buttons opening mobile bottom-sheet AppClips.
   - **Mobile (< 768px)**: Subpages & intakes open inside ultra-frosted liquid glass AppClips. NEVER embed desktop `SeniorIntakeWizard` into an AppClip.
3. **Bilingual Requirement**: All user-facing text must include English and Urdu Nastaleeq (`font-urdu`, `dir="rtl"`).
4. **WhatsApp Dispatch**: Operator number is `03120947187`. Pre-fill with case folio.

---

## 📚 Key Reference Documentation
- Full Architectural Spec: [`docs/ARCHITECTURE_AND_POLICIES.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/ARCHITECTURE_AND_POLICIES.md)
- FBR Iris Registration Guide: [`docs/FBR_INDIVIDUAL_REGISTRATION_GUIDE.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/FBR_INDIVIDUAL_REGISTRATION_GUIDE.md)
- PRC & WHT Copy-Paste Templates: [`docs/MESSAGE_TEMPLATES_PRC_WHT.md`](file:///home/ateeb/projects/tax-yasmeensons/docs/MESSAGE_TEMPLATES_PRC_WHT.md)
- Agent Rules & Subagent Protocol: [`AGENTS.md`](file:///home/ateeb/projects/tax-yasmeensons/AGENTS.md)
