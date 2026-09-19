# Yasmeen & Sons Tax Facilitation Desk (tax.yasmeensons.com)

Independent non-business individual tax filing facilitation platform for Tax Year 2026.

## Architecture Highlights
- **Zero-Credential Security**: Customer-controlled authentication. We never ask for or store taxpayer FBR IRIS passwords.
- **Mandatory Bilingual System**: English / Nastaleeq Urdu side-by-side on all forms, inputs, and AppClips (`BilingualLabel`).
- **Liquid Frosted Glass & AppClips**: Mobile-first spring-animated bottom sheets (`framer-motion`) and floating `LiquidGlassTabBar`.
- **Neon PostgreSQL**: Dedicated `tax-yasmeensons` database branch with Drizzle ORM schema for `tax_filings`.
- **Doist Notifications**: Direct P1 task dispatch to Todoist on case intake.
- **WhatsApp Integration**: Operator deep-link dispatch to `03120947187`.

## Deployment
- Framework: Next.js 15+ (App Router)
- Subdomain: `tax.yasmeensons.com`
