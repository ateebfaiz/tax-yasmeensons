"use client";

import React, { useState } from "react";
import AnimatedTabs from "@/components/smoothui/animated-tabs";
import { Copy, Check, Smartphone, Building, Zap, Flame, Calculator, Sparkles, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

interface TemplateItem {
  id: string;
  titleEn: string;
  titleUr: string;
  subtitleEn: string;
  subtitleUr: string;
  badge: string;
  subject: string;
  bodyEn: string;
  instructionsUr: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "prc",
    titleEn: "1. Freelancers: Proceeds Realization Certificate (PRC)",
    titleUr: "فری لانسرز: فارن ریمیٹنس انکیشمنٹ / پی آر سی سرٹیفکیٹ",
    subtitleEn: "Use this to request proof of foreign remittance from your bank.",
    subtitleUr: "بینک سے بیرون ملک سے موصول ہونے والی رقم کی قانونی تصدیق حاصل کرنے کے لیے۔",
    badge: "FREELANCER / EXPORT",
    subject: "Request for Proceeds Realization Certificate (PRC) / Encashment Certificate",
    bodyEn: `Subject: Request for Proceeds Realization Certificate (PRC) / Encashment Certificate

Dear Customer Support Team,

I am writing to formally request the Proceeds Realization Certificate (PRC) / Remittance Encashment Certificate for the foreign funds credited to my account.

Account Details:
- Account Title: [Your Full Name]
- Account Number / IBAN: [Your Account Number]
- CNIC Number: [Your CNIC]

Transaction Details:
- Approximate Date of Credit: [Date or Month]
- Amount Received: [Amount and Currency, e.g., $500 USD]
- Remitter Name/Source: [e.g., Upwork, Fiverr, Client Name]

These documents are urgently required for filing my income tax returns and updating my wealth statement with the Federal Board of Revenue (FBR). Please issue the certificate digitally or notify me when it is ready for collection at my home branch.

Thank you for your prompt assistance.

Best regards,

[Your Name]
[Your Contact Number]`,
    instructionsUr: "یہ ای میل اپنے بینک کی ہیلپ لائن کو بھیجیں۔ اس سرٹیفکیٹ کی بنیاد پر فری لانسنگ آمدنی پر قانونی ٹیکس چھوٹ یا رعایتی شرح حاصل کی جاتی ہے۔",
  },
  {
    id: "bank_wht",
    titleEn: "2. Bank WHT Certificate (Section 164)",
    titleUr: "بینک ودہولڈنگ ٹیکس سرٹیفکیٹ (سیکشن 164)",
    subtitleEn: "Claim tax credits on cash withdrawals, profit on debt, and banking transactions.",
    subtitleUr: "کیش نکلوانے، بینک منافع اور ٹرانزیکشنز پر کٹنے والے ٹیکس کا ایڈجسٹمنٹ کلیم۔",
    badge: "SALARIED / ALL FILERS",
    subject: "Request for Annual Withholding Tax Certificate (Section 164) – Tax Year 2026",
    bodyEn: `Subject: Request for Annual Withholding Tax Certificate (Section 164) – Tax Year 2026

Dear Sir/Madam,

Please issue the Annual Withholding Tax (WHT) Certificate under Section 164 of the Income Tax Ordinance, 2001, for my account for the period covering July 1, 2025 to June 30, 2026.

Account Details:
- Account Title: [Your Full Name]
- Account Number: [Your Account Number]
- CNIC Number: [Your CNIC]

Kindly email a digital PDF copy of the tax certificate to this email address or provide a downloadable link.

Thank you.

Sincerely,

[Your Name]
[Your Contact Number]`,
    instructionsUr: "سیکشن 164 سرٹیفکیٹ سے بینک میں کٹا ہوا تمام ودہولڈنگ ٹیکس آپ کے سالانہ ٹیکس ریٹرن میں ایڈجسٹ ہو جاتا ہے۔",
  },
  {
    id: "sim_tax",
    titleEn: "3. Mobile SIM Tax Certificate (WhatsApp / Helpline)",
    titleUr: "موبائل سم ٹیکس سرٹیفکیٹ (واٹس ایپ / ہیلپ لائن)",
    subtitleEn: "Copy and paste this into Jazz, Telenor, Zong, or Ufone official WhatsApp chat.",
    subtitleUr: "جاز، زونگ، یوفون یا ٹیلی نار کی آفیشل واٹس ایپ چیٹ میں کاپی پیسٹ کریں۔",
    badge: "ALL INDIVIDUALS",
    subject: "Mobile SIM Annual Tax Certificate Request",
    bodyEn: `Hello Team,

I need the Annual Tax Certificate / Withholding Tax Statement for my mobile number for the tax year ending June 30, 2026.

SIM Details:
- Mobile Number: [Your Mobile Number]
- Network: [Jazz / Zong / Telenor / Ufone]
- SIM Owner Name: [Your Full Name]
- CNIC Number: [Your CNIC]

Please send the PDF certificate to my registered email address or provide it in this chat thread so I can use it for my FBR tax filing.

Thank you.`,
    instructionsUr: "موبائل ری چارج اور پوسٹ پیڈ بلوں پر کٹنے والا ایڈوانس ٹیکس ایف بی آر میں واپسی کے قابل ہوتا ہے۔",
  },
  {
    id: "utility_wht",
    titleEn: "4. Utility Companies WHT Certificate (Electricity & Gas)",
    titleUr: "بجلی و گیس کمپنیوں سے ٹیکس سرٹیفکیٹ (لیسکو، کے الیکٹرک، سوئی گیس)",
    subtitleEn: "Send to LESCO, K-Electric, IESCO, FESCO, SNGPL, SSGC for residential/commercial bills.",
    subtitleUr: "بلوں پر کٹنے والے ایڈوانس ٹیکس کا باضابطہ سرٹیفکیٹ حاصل کرنے کے لیے۔",
    badge: "HOMEOWNERS / TENANTS",
    subject: "Request for Annual Withholding Tax Certificate (Section 164) – Tax Year 2026",
    bodyEn: `Subject: Request for Annual Withholding Tax Certificate (Section 164) – Tax Year 2026

Dear Customer Support Team,

I am writing to formally request the Annual Withholding Tax (WHT) Certificate under Section 164 of the Income Tax Ordinance, 2001, for the fiscal tax year covering July 1, 2025 to June 30, 2026.

Connection Details:
- Company Name: [e.g., LESCO / K-Electric / SNGPL / SSGC]
- Consumer Number / Reference Number: [Found on your bill]
- Account Title (Name on Bill): [Name]
- CNIC of Account Holder: [CNIC Number]

Please send a digital PDF copy of the certificate to this email address at your earliest convenience so that I can proceed with my FBR tax filing.

Thank you.

Best regards,

[Your Name]
[Your Contact Number]`,
    instructionsUr: "اگر میٹر آپ کے یا مالک مکان کے نام پر ہے تو 25 ہزار سے زائد کے بجلی بلوں پر کٹا ہوا ٹیکس گوشوارے میں کلیم کیا جا سکتا ہے۔",
  },
];

export function TaxCertificateTemplates() {
  const [mainTab, setMainTab] = useState<string>("templates");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mini calculator state
  const [billType, setBillType] = useState<"electric" | "gas">("electric");
  const [billAmount, setBillAmount] = useState<string>("35000");
  const [isFiler, setIsFiler] = useState<boolean>(true);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Utility calculations
  const parsedAmount = parseFloat(billAmount.replace(/,/g, "")) || 0;
  let calculatedTax = 0;
  let taxFormulaText = "";

  if (billType === "electric") {
    // Threshold Rs. 25,000, 7.5%
    if (parsedAmount > 25000) {
      calculatedTax = Math.round(parsedAmount * 0.075);
      taxFormulaText = `PKR ${parsedAmount.toLocaleString()} × 7.5% = PKR ${calculatedTax.toLocaleString()} (Threshold > 25,000)`;
    } else {
      calculatedTax = 0;
      taxFormulaText = `Bill is PKR ${parsedAmount.toLocaleString()} (≤ 25,000 threshold) → WHT is PKR 0`;
    }
  } else {
    // Gas: Threshold Rs. 2,500. 5% Filer / 10% Non-Filer
    if (parsedAmount > 2500) {
      const rate = isFiler ? 0.05 : 0.10;
      calculatedTax = Math.round(parsedAmount * rate);
      taxFormulaText = `PKR ${parsedAmount.toLocaleString()} × ${isFiler ? "5% (Filer)" : "10% (Non-Filer)"} = PKR ${calculatedTax.toLocaleString()}`;
    } else {
      calculatedTax = 0;
      taxFormulaText = `Bill is PKR ${parsedAmount.toLocaleString()} (≤ 2,500 threshold) → WHT is PKR 0`;
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-brass/20 text-ink uppercase">
              CERTIFICATES & EVIDENCE HUB
            </span>
            <span className="font-mono text-xs text-ash">FBR TY2026</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink mt-1">
            Tax Deduction Certificates &amp; App Pathways
          </h2>
          <div className="font-urdu text-sm font-bold text-ink" dir="rtl">
            ودہولڈنگ ٹیکس سرٹیفکیٹس حاصل کرنے کے پیغامات، موبائل ایپس گائیڈ اور بل فارمولہ
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="overflow-x-auto no-scrollbar">
          <AnimatedTabs
            variant="pill"
            activeTab={mainTab}
            onChange={setMainTab}
            tabs={[
              { id: "templates", label: "Copy-Paste Templates" },
              { id: "apps", label: "Instant App Guides" },
              { id: "utility_rules", label: "Utility WHT Calc" },
            ]}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          TAB 1: COPY-PASTE MESSAGE TEMPLATES
          ───────────────────────────────────────────────────────── */}
      {mainTab === "templates" && (
        <div className="space-y-6">
          <p className="text-xs text-ash leading-relaxed">
            Copy and send these ready-to-use message templates directly to your bank, telecom operator, or utility provider to obtain official tax deduction certificates required for filing.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {TEMPLATES.map((tmpl) => {
              const isCopied = copiedId === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  className="glass-card p-6 sm:p-7 rounded-[26px] border border-rule space-y-4 shadow-sm relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-rule pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle border border-brass/20">
                          {tmpl.badge}
                        </span>
                        <h3 className="font-serif text-base font-bold text-ink">{tmpl.titleEn}</h3>
                      </div>
                      <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{tmpl.titleUr}</div>
                      <p className="text-xs text-ash mt-1">{tmpl.subtitleEn}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(tmpl.id, tmpl.bodyEn)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all shrink-0 active:scale-95 shadow-sm ${
                        isCopied
                          ? "bg-apple-blue text-white"
                          : "bg-ink hover:bg-theme-primary-hover text-paper-light"
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Copied! / کاپی ہو گیا" : "Copy Template"}</span>
                    </button>
                  </div>

                  {/* Code snippet block */}
                  <div className="relative">
                    <pre className="bg-paper-light dark:bg-paper-light p-4 rounded-xl text-xs font-mono text-ink/90 overflow-x-auto whitespace-pre-wrap border border-rule leading-relaxed">
                      {tmpl.bodyEn}
                    </pre>
                  </div>

                  {/* Urdu note */}
                  <div className="p-3 rounded-xl bg-folio border border-rule-light text-xs text-ash font-urdu" dir="rtl">
                    💡 <strong>رہنمائی:</strong> {tmpl.instructionsUr}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          TAB 2: INSTANT APP GENERATION PATHWAYS
          ───────────────────────────────────────────────────────── */}
      {mainTab === "apps" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-brass-subtle border border-brass/40 flex items-start gap-3 text-xs text-ink">
            <Sparkles className="w-4 h-4 text-brass shrink-0 mt-0.5" />
            <div>
              <strong>Instant App Generation (No Support Wait):</strong> You do not need to wait for a representative. Follow these exact menu pathways in your telecom, banking, and digital wallet apps to download your tax certificates in seconds.
            </div>
          </div>

          {/* SIM Operators Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-ink">
                <Smartphone className="w-4 h-4 text-apple-blue" />
                <span>Mobile SIM Operators (Jazz, Zong, Ufone, Telenor)</span>
              </div>
              <span className="font-urdu text-xs text-ash" dir="rtl">موبائل سم ایپس سے ٹیکس سرٹیفکیٹ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jazz */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-ink font-bold">📱 JAZZ (Simosa App)</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-600 font-bold">JAZZ</span>
                </div>
                <ol className="text-xs text-ash space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>Simosa</strong> (formerly Jazz World) app.</li>
                  <li>Look at the home screen or tap <strong>Menu / Support</strong>.</li>
                  <li>Select <strong>Tax Certificate</strong>.</li>
                  <li>Choose the tax year (e.g., 2025 or 2026).</li>
                  <li>Enter the 4-digit verification PIN received via SMS.</li>
                  <li>Tap <strong>Download</strong> to save the PDF directly.</li>
                </ol>
                <div className="p-2 rounded bg-folio text-[11px] font-mono text-ink border border-rule-light">
                  💡 Dial code: <strong>*444#</strong> → My Accounts → Tax Certificate
                </div>
              </div>

              {/* Zong */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-ink font-bold">📱 ZONG (My Zong App)</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-500/10 text-green-600 font-bold">ZONG</span>
                </div>
                <ol className="text-xs text-ash space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>My Zong</strong> app.</li>
                  <li>Tap <strong>Menu</strong> or <strong>More</strong> from the bottom bar.</li>
                  <li>Scroll to <strong>Value Added Services (VAS)</strong>.</li>
                  <li>Tap on <strong>Tax Certificate</strong>.</li>
                  <li>Enter start date (July 1) and end date (June 30).</li>
                  <li>Click <strong>Download / View</strong> to export your PDF.</li>
                </ol>
              </div>

              {/* Ufone */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-ink font-bold">📱 UFONE (UPTCL App)</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 font-bold">UFONE</span>
                </div>
                <ol className="text-xs text-ash space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>UPTCL</strong> (formerly My Ufone) app.</li>
                  <li>From the dashboard or side menu, tap <strong>Tax Certificate</strong>.</li>
                  <li>Choose the fiscal tenure / tax year (e.g. 2025-2026).</li>
                  <li>Confirm your email address or account details.</li>
                  <li>Click <strong>Download / OK</strong> to view and save the file.</li>
                </ol>
              </div>

              {/* Telenor */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-ink font-bold">📱 TELENOR (My Telenor App)</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-bold">TELENOR</span>
                </div>
                <ol className="text-xs text-ash space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>My Telenor</strong> app.</li>
                  <li>On the home dashboard, tap the <strong>Tax Certificate</strong> shortcut.</li>
                  <li>Enter your CNIC number and select target tax year.</li>
                  <li>Provide active email address and enter SMS verification PIN.</li>
                  <li>The PDF downloads instantly and is delivered to your inbox.</li>
                </ol>
                <div className="p-2 rounded bg-folio text-[11px] font-mono text-ink border border-rule-light">
                  💡 SMS code: Send <strong>TAX your-email@address.com</strong> to <strong>2009</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Banks & Wallets Grid */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-ink">
                <Building className="w-4 h-4 text-brass" />
                <span>Commercial Banks &amp; Digital Wallets</span>
              </div>
              <span className="font-urdu text-xs text-ash" dir="rtl">بینکنگ ایپس اور والٹس گائیڈ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Commercial Banks */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <strong className="text-sm text-ink font-bold">🏦 Commercial Banks (Meezan, HBL, Alfalah, UBL, etc.)</strong>
                <ol className="text-xs text-ash space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Log in securely with biometric face/fingerprint or PIN.</li>
                  <li>Go to <strong>More</strong>, <strong>Services</strong>, or <strong>Account Settings</strong>.</li>
                  <li>Select <strong>Statements &amp; Certificates</strong> or <strong>Document Requests</strong>.</li>
                  <li>Tap <strong>Withholding Tax Certificate (Section 164)</strong>.</li>
                  <li>Select Tax Year 2026 (July 1, 2025 – June 30, 2026).</li>
                  <li>Tap <strong>View</strong> or <strong>Download PDF</strong>.</li>
                </ol>
                <div className="p-2.5 rounded bg-brass-subtle border border-brass/30 text-[11px] text-ink">
                  💡 <strong>Freelancers (PRC):</strong> Look under <em>Freelancer Digital Account</em>, <em>Home Remittance</em>, or <em>Export Dashboard</em> tabs.
                </div>
              </div>

              {/* Wallets */}
              <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2.5 shadow-xs">
                <strong className="text-sm text-ink font-bold">📲 Digital Wallets (Easypaisa &amp; JazzCash)</strong>
                <div className="space-y-3 text-xs text-ash">
                  <div className="p-2.5 rounded-xl border border-rule bg-paper">
                    <strong className="text-ink">Easypaisa:</strong> Log in → Tap <strong>Account Profile Icon</strong> (top left) → Tap <strong>Tax Certificate</strong> → Select Tax Year → Tap <strong>Download</strong>.
                  </div>
                  <div className="p-2.5 rounded-xl border border-rule bg-paper">
                    <strong className="text-ink">JazzCash:</strong> Log in → Tap <strong>My Account</strong> → Tap <strong>Tax Certificate</strong> → Choose Tax Year → <strong>Generate PDF</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          TAB 3: UTILITY WHT RULES & CALCULATOR
          ───────────────────────────────────────────────────────── */}
      {mainTab === "utility_rules" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Electricity Rule */}
            <div className="p-6 rounded-[24px] border border-rule bg-paper-light space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>1. Electricity Bills (Domestic Sec 235)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brass/20 text-ink font-bold">
                  RATE: 7.5%
                </span>
              </div>

              <div className="text-xs text-ash space-y-2 leading-relaxed">
                <div>
                  <strong>Exemption Threshold:</strong> Monthly bill up to <strong>Rs. 25,000</strong> has <strong>Rs. 0 WHT</strong>.
                </div>
                <div>
                  <strong>Above Threshold:</strong> Bills of <strong>Rs. 25,001 or more</strong> incur <strong>7.5% tax</strong> on the total consumption cost.
                </div>
                <div className="p-3 rounded-xl bg-folio border border-rule-light font-mono text-[11px] text-ink">
                  Formula: [Base Electricity Cost + Fuel Adjustment] × 0.075
                  <br />
                  Example: Rs. 35,000 bill × 0.075 = <strong>Rs. 2,625 WHT</strong>
                </div>
                <div className="font-urdu text-[11px] text-ash" dir="rtl">
                  بل پر &quot;Advance Income Tax&quot; یا &quot;WHT Sec 235&quot; کی لائن چیک کریں۔
                </div>
              </div>
            </div>

            {/* Gas Rule */}
            <div className="p-6 rounded-[24px] border border-rule bg-paper-light space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>2. Gas Bills (Domestic Sec 234A)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brass/20 text-ink font-bold">
                  5% / 10%
                </span>
              </div>

              <div className="text-xs text-ash space-y-2 leading-relaxed">
                <div>
                  <strong>Exemption Threshold:</strong> Monthly bill up to <strong>Rs. 2,500</strong> has <strong>Rs. 0 WHT</strong>.
                </div>
                <div>
                  <strong>Filer vs Non-Filer:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Active Filer: <strong>5%</strong> tax</li>
                    <li>Non-Filer: <strong>10%</strong> tax</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-folio border border-rule-light font-mono text-[11px] text-ink">
                  Example (Rs. 6,000 bill):
                  <br />
                  Filer: 6,000 × 0.05 = <strong>Rs. 300 WHT</strong>
                  <br />
                  Non-Filer: 6,000 × 0.10 = <strong>Rs. 600 WHT</strong>
                </div>
                <div className="font-urdu text-[11px] text-ash" dir="rtl">
                  بل پر &quot;Income Tax&quot; یا &quot;WHT Sec 234A&quot; کا اندراج چیک کریں۔
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mini-Calculator */}
          <div className="glass-card p-6 sm:p-7 rounded-[28px] border-2 border-brass/40 space-y-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-brass" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  Interactive Utility Tax Credit Estimator
                </h3>
              </div>
              <span className="font-urdu text-xs text-ash" dir="rtl">بجلی و گیس ٹیکس کلیم کا فوری حساب</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Type Select */}
              <div>
                <label className="block text-xs font-mono font-bold text-ash mb-1">
                  UTILITY TYPE / بل کی قسم
                </label>
                <select
                  value={billType}
                  onChange={(e) => setBillType(e.target.value as "electric" | "gas")}
                  className="w-full p-2.5 rounded-xl border border-rule bg-paper text-ink text-xs font-bold focus:ring-2 focus:ring-brass"
                >
                  <option value="electric">⚡ Electricity (LESCO / K-Electric / IESCO)</option>
                  <option value="gas">🔥 Gas (SNGPL / SSGC)</option>
                </select>
              </div>

              {/* Monthly Bill Amount */}
              <div>
                <label className="block text-xs font-mono font-bold text-ash mb-1">
                  MONTHLY BILL (PKR) / رقم بل
                </label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full p-2.5 rounded-xl border border-rule bg-paper text-ink text-xs font-mono font-bold focus:ring-2 focus:ring-brass"
                />
              </div>

              {/* Filer Status */}
              <div>
                <label className="block text-xs font-mono font-bold text-ash mb-1">
                  ATL FILER STATUS / فائلر کیفیت
                </label>
                <select
                  value={isFiler ? "yes" : "no"}
                  onChange={(e) => setIsFiler(e.target.value === "yes")}
                  className="w-full p-2.5 rounded-xl border border-rule bg-paper text-ink text-xs font-bold focus:ring-2 focus:ring-brass"
                >
                  <option value="yes">Active Filer (ایکٹو فائلر)</option>
                  <option value="no">Non-Filer / New (نان فائلر)</option>
                </select>
              </div>
            </div>

            {/* Result Box */}
            <div className="p-4 rounded-2xl bg-paper-light border border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[11px] font-mono text-ash uppercase tracking-wider">
                  ESTIMATED MONTHLY WITHHOLDING TAX
                </div>
                <div className="font-mono text-2xl font-black text-ink">
                  PKR {calculatedTax.toLocaleString()}
                </div>
                <div className="text-xs text-ash font-mono">{taxFormulaText}</div>
              </div>

              <div className="p-3 rounded-xl bg-folio border border-rule-light text-center sm:text-right space-y-0.5">
                <div className="text-[10px] font-mono text-ash uppercase">
                  ANNUAL 12-MONTH CLAIM VALUE
                </div>
                <div className="font-mono text-xl font-bold text-brass">
                  PKR {(calculatedTax * 12).toLocaleString()}
                </div>
                <div className="text-[10px] text-ash">FBR Tax Return Credit</div>
              </div>
            </div>
          </div>

          {/* 6-Step Manual Utility Verification Routine */}
          <div className="p-6 rounded-[24px] border border-rule bg-paper-light space-y-4 shadow-xs">
            <div className="border-b border-rule pb-2 flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-ink">
                📋 Step-by-Step Manual Utility Tax Verification Routine
              </h4>
              <span className="font-urdu text-xs text-ash" dir="rtl">بلوں کی تصدیق کا ۶ مرحلہ وار طریقہ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ash">
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 1: Collect 12 Monthly Bills</div>
                <p>Gather all 12 utility bills covering July 1 to June 30 of the tax year.</p>
              </div>
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 2: Identify Base Amount</div>
                <p>Check cost of electricity/gas consumed before GST or TV fees are added.</p>
              </div>
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 3: Check Thresholds</div>
                <p>Verify if base amount crosses Rs. 25,000 for electricity or Rs. 2,500 for gas.</p>
              </div>
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 4: Calculate Applicable Percentage</div>
                <p>Multiply by 7.5% for electricity or 5%/10% for gas.</p>
              </div>
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 5: Compare with Printed Row</div>
                <p>Match your figure with the printed &quot;Advance Income Tax&quot; row on the bill.</p>
              </div>
              <div className="p-3 rounded-xl border border-rule-light bg-paper space-y-1">
                <div className="font-bold text-ink">Step 6: Sum up All 12 Months</div>
                <p>This final total is the absolute tax credit you will claim in your IRIS return.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
