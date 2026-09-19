"use client";

import React, { useState, useEffect } from "react";
import { formatWhatsAppUrl } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  AlertCircle,
  Clock,
} from "lucide-react";
import AnimatedStepper, { StepItem } from "@/components/smoothui/animated-stepper";
import MagneticButton from "@/components/smoothui/magnetic-button";

interface CategoryOption {
  code: string;
  en: string;
  ur: string;
  descEn: string;
  descUr: string;
  irisMap: string;
  docs: { code: string; en: string; ur: string }[];
}

const CATEGORIES: CategoryOption[] = [
  {
    code: "SAL",
    en: "Salaried Individual",
    ur: "تنخواہ دار ملازم",
    descEn: "Full-time, contract, or private employment with salary deduction.",
    descUr: "تنخواہ سے کٹوتی اور سالانہ ٹیکس سرٹیفکیٹ",
    irisMap: "IRIS → Declaration → Income Tax Return → Employment",
    docs: [
      { code: "s.149", en: "Salary Slips or Employer Tax Certificate", ur: "سیلری سلپس یا ادارہ ٹیکس سرٹیفکیٹ" },
      { code: "s.235/236", en: "Electricity, Gas & Mobile WHT Certificates", ur: "بجلی، گیس اور موبائل ٹیکس ریکارڈ" },
      { code: "s.116", en: "Bank Account Statements (July 2025 – June 2026)", ur: "سالانہ بینک اسٹیٹمنٹ مع منافع" },
      { code: "s.111", en: "Vehicle / Property purchase or sale (if applicable)", ur: "گاڑی یا جائیداد کی تفصیلات (اگر کوئی ہو)" },
    ],
  },
  {
    code: "PEN",
    en: "Senior Citizen / Pensioner",
    ur: "پنشنر و بزرگ شہری",
    descEn: "Retired personnel, government or corporate pensioners.",
    descUr: "پنشن پر ٹیکس چھوٹ اور قومی بچت اسکیموں پر منافع",
    irisMap: "IRIS → Declaration → Income Tax Return → Other Sources",
    docs: [
      { code: "Exempt", en: "Pension Book / Annual Pension Statement", ur: "پنشن بک یا سالانہ پنشن اسٹیٹمنٹ" },
      { code: "s.151", en: "National Savings / Behbood Certificates profit deduction", ur: "قومی بچت یا بہبود سرٹیفکیٹس کا منافع" },
      { code: "s.116", en: "Bank Statements and Asset List", ur: "بینک اسٹیٹمنٹ اور اثاثہ جات کی فہرست" },
    ],
  },
  {
    code: "HIF",
    en: "Housewife / Non-Earning",
    ur: "گھریلو خواتین و نان ارننگ",
    descEn: "Filing for Active Taxpayer List (ATL) status without commercial income.",
    descUr: "بینک کٹوتی سے بچاؤ کے لیے ایکٹو فائلر رجسٹریشن",
    irisMap: "IRIS → Declaration → Income Tax Return → Zero Tax Filer",
    docs: [
      { code: "ID", en: "Valid CNIC Copy (Both sides)", ur: "قومی شناختی کارڈ کی کاپی" },
      { code: "s.116", en: "Active Bank Account Statement (Nominal balance)", ur: "ایکٹو بینک اکاؤنٹ اسٹیٹمنٹ" },
      { code: "Source", en: "Confirmation of Spouse / Family maintenance support", ur: "گھریلو کفالت یا شوہر کی طرف سے معاونت کا بیان" },
    ],
  },
  {
    code: "STU",
    en: "Student Filer",
    ur: "طالب علم فائلر",
    descEn: "Students saving on educational advance tax (s.236I) & bank accounts.",
    descUr: "یونیورسٹی فیس پر ایڈوانس ٹیکس کٹوتی سے نجات",
    irisMap: "IRIS → Declaration → Income Tax Return → Student Filer",
    docs: [
      { code: "ID", en: "CNIC and Student ID Card Copy", ur: "شناختی کارڈ اور اسٹوڈنٹ کارڈ" },
      { code: "s.236I", en: "University Fee Receipts (with advance tax)", ur: "یونیورسٹی فیس رسیدیں مع ٹیکس کٹوتی" },
      { code: "s.116", en: "Student Bank Account Statement", ur: "اسٹوڈنٹ اکاؤنٹ کی بینک اسٹیٹمنٹ" },
    ],
  },
  {
    code: "GOV",
    en: "Government Official",
    ur: "سرکاری ملازم",
    descEn: "Federal, Provincial, or Armed Forces employees (AGPR/Accountant General).",
    descUr: "سرکاری تنخواہ، اے جی پی آر سلپس اور جی پی فنڈ",
    irisMap: "IRIS → Declaration → Income Tax Return → Govt Employment",
    docs: [
      { code: "AGPR", en: "AGPR / Provincial Salary Slips & GP Fund Statement", ur: "اے جی پی آر سیلری سلپس اور جی پی فنڈ ریکارڈ" },
      { code: "s.149", en: "Annual Departmental Tax Deduction Certificate", ur: "محکمانہ سالانہ ٹیکس کٹوتی سرٹیفکیٹ" },
      { code: "s.116", en: "Bank Statements & Utility Bills", ur: "بینک اسٹیٹمنٹ اور بجلی کے بلز" },
    ],
  },
  {
    code: "OTH",
    en: "Other Individual",
    ur: "دیگر انفرادی ٹیکس گزار",
    descEn: "Rental income, profit on debt, foreign remittance recipients.",
    descUr: "کرایہ، بینک منافع یا بیرون ملک سے ترسیلات",
    irisMap: "IRIS → Declaration → Income Tax Return → Other Sources",
    docs: [
      { code: "Rental/Bank", en: "Rent agreements, bank profit statements, remittance slips", ur: "کرایہ نامہ، بینک منافع یا ترسیلات کی رسیدیں" },
      { code: "s.116", en: "Complete Wealth & Asset breakdown", ur: "مکمل اثاثہ جات کا گوشوارہ" },
    ],
  },
];

const PACKAGES = [
  {
    code: "GF-1000",
    id: "guided_1000",
    nameEn: "Guided Filing",
    nameUr: "رہنمائی مع سیلف فائلنگ",
    fee: "PKR 1,000",
    descEn: "We audit figures and give you a field-by-field checklist. You log into IRIS and file independently.",
    descUr: "ہم حساب کتاب تیار کر کے دیں گے، آپ خود آئرس پر لاگ ان ہو کر جمع کروائیں گے۔",
  },
  {
    code: "FA-2500",
    id: "assistance_2500",
    nameEn: "Complete Filing Assistance",
    nameUr: "مکمل فائلنگ اسسٹنس",
    fee: "PKR 2,500",
    descEn: "Full return & wealth statement (s.116) preparation with screen assistance on official IRIS. Most popular.",
    descUr: "مکمل گوشوارہ اور ویلتھ اسٹیٹمنٹ کی تیاری مع آفیشل آئرس اسکرین رہنمائی۔",
    isRecommended: true,
  },
  {
    code: "CX-4500",
    id: "complex_5000",
    nameEn: "Complex Individual Review",
    nameUr: "پیچیدہ کیس جائزہ",
    fee: "PKR 4,500+",
    descEn: "Multi-bank, prior unfiled years, or section 111 asset reconciliations. Quoted after document review.",
    descUr: "متعدد سالوں کے پرانے گوشوارے، پراپرٹی ٹرانزیکشنز یا بیرونی ترسیلات۔",
  },
];

export function SeniorIntakeWizard({
  initialCategory = "SAL",
  initialTier = "assistance_2500",
}: {
  initialCategory?: string;
  initialTier?: string;
}) {
  const { isUrdu } = useLanguage();

  // Part tracking (1 to 4)
  const [currentPart, setCurrentPart] = useState<number>(1);

  // Form State
  const [categoryCode, setCategoryCode] = useState<string>(initialCategory.toUpperCase());
  const [irisStatus, setIrisStatus] = useState<string>("active");
  const [packageCode, setPackageCode] = useState<string>(
    initialTier === "guided_1000" ? "GF-1000" : initialTier === "complex_5000" ? "CX-4500" : "FA-2500"
  );
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cnic, setCnic] = useState<string>("");
  const [simOwner, setSimOwner] = useState<"own" | "relative">("own");
  const [relativeName, setRelativeName] = useState<string>("");
  const [relativeCnic, setRelativeCnic] = useState<string>("");
  const [relativeRelation, setRelativeRelation] = useState<string>("Father / والد");
  const [email, setEmail] = useState<string>("");
  const [needEmailHelp, setNeedEmailHelp] = useState<boolean>(false);
  const [residentialAddress, setResidentialAddress] = useState<string>("");
  const [incomeDetails, setIncomeDetails] = useState<string>("");
  const [familyConsolidation, setFamilyConsolidation] = useState<boolean>(false);
  const [whtAudit, setWhtAudit] = useState<boolean>(true);
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState<boolean>(true);
  const [credentialsNotes, setCredentialsNotes] = useState<string>("");
  const [consented, setConsented] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [caseFolio, setCaseFolio] = useState<{
    reference: string;
    categoryCode: string;
    packageCode: string;
    fullName: string;
    phone: string;
  } | null>(null);

  const currentCategory = CATEGORIES.find((c) => c.code === categoryCode) || CATEGORIES[0];
  const currentPkg = PACKAGES.find((p) => p.code === packageCode) || PACKAGES[1];

  // If user came from a specific persona page, lock category and can start at Part 02
  useEffect(() => {
    if (initialCategory && initialCategory !== "SAL") {
      const found = CATEGORIES.find(
        (c) => c.code === initialCategory.toUpperCase() || c.code.toLowerCase().includes(initialCategory.toLowerCase())
      );
      if (found) {
        setCategoryCode(found.code);
      }
    }
  }, [initialCategory]);

  const handleCnicChange = (val: string) => {
    // Format CNIC as XXXXX-XXXXXXX-X
    const digits = val.replace(/\D/g, "").slice(0, 13);
    let formatted = digits;
    if (digits.length > 5 && digits.length <= 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else if (digits.length > 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    }
    setCnic(formatted);
  };

  const handleRelativeCnicChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 13);
    let formatted = digits;
    if (digits.length > 5 && digits.length <= 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else if (digits.length > 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    }
    setRelativeCnic(formatted);
  };

  const handlePhoneChange = (val: string) => {
    // Format Phone as 03XX XXXXXXX
    const digits = val.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }
    setPhone(formatted);
  };

  const validateAndNext = () => {
    setError(null);
    if (currentPart === 1) {
      if (!categoryCode) {
        setError("Please select your tax category.");
        return;
      }
      setCurrentPart(2);
    } else if (currentPart === 2) {
      if (!irisStatus) {
        setError("Please select your IRIS account status.");
        return;
      }
      setCurrentPart(3);
    } else if (currentPart === 3) {
      if (!packageCode) {
        setError("Please choose a filing package.");
        return;
      }
      setCurrentPart(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your Full Name (as per CNIC).");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 11) {
      setError("Please enter a valid 11-digit WhatsApp/Mobile number.");
      return;
    }
    if (simOwner === "relative" && (!relativeName.trim() || !relativeCnic.trim())) {
      setError("Please enter relative's name and CNIC / قریبی رشتہ دار کا نام اور شناختی کارڈ درج کریں۔");
      return;
    }
    if (!consented) {
      setError("Please check the authorization box to proceed.");
      return;
    }

    setSubmitting(true);
    try {
      const notesSummary = [
        simOwner === "relative" ? `SIM on Relative: ${relativeName} (${relativeRelation}), CNIC: ${relativeCnic}` : "SIM: Registered in own CNIC",
        needEmailHelp ? "Customer requests email creation assistance" : email ? `Email: ${email}` : "No email",
        residentialAddress ? `Address: ${residentialAddress}` : "",
        incomeDetails ? `Income details: ${incomeDetails}` : "",
        familyConsolidation ? "Family group filing / inter-family transfers reconciliation requested" : "",
        whtAudit ? "Full withholding tax deduction claim audit enabled (banks, bills, SIM, fuel)" : "",
        credentialsNotes ? `Notes: ${credentialsNotes}` : "",
      ].filter(Boolean).join(" | ");

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          cnic: cnic.trim(),
          email: needEmailHelp ? "needs_email_help@fbr.local" : email.trim(),
          persona: categoryCode.toLowerCase(),
          irisStatus,
          serviceTier: currentPkg.id,
          contactPreference: "whatsapp",
          credentialsNotes: notesSummary,
          documentsSummary: sendViaWhatsApp ? "Will send documents on WhatsApp" : "Direct filing",
          source: "senior_wizard",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const ref = data.reference;
        setCaseFolio({
          reference: ref,
          categoryCode,
          packageCode,
          fullName,
          phone,
        });

        const waMsg = `Case ${ref} | ${categoryCode} | ${packageCode} | TY2026\n\n` +
          `*Name:* ${fullName}\n` +
          `*Phone:* ${phone}\n` +
          (cnic ? `*CNIC:* ${cnic}\n` : "") +
          (simOwner === "relative" ? `*SIM on:* ${relativeName} (${relativeRelation}, CNIC: ${relativeCnic})\n` : `*SIM:* Own CNIC\n`) +
          (needEmailHelp ? `*Email:* Help requested to create email\n` : email ? `*Email:* ${email}\n` : "") +
          (residentialAddress ? `*Address:* ${residentialAddress}\n` : "") +
          `*Category:* ${currentCategory.en} (${currentCategory.code})\n` +
          (incomeDetails ? `*Income Source:* ${incomeDetails}\n` : "") +
          (familyConsolidation ? `*Family Consolidation:* Reconcile family transfers\n` : "") +
          (whtAudit ? `*WHT Audit:* Claim all ATM, fuel, utility, SIM source taxes\n` : "") +
          `*Service:* ${currentPkg.nameEn} (${currentPkg.fee})\n` +
          `*IRIS Status:* ${irisStatus}\n` +
          (credentialsNotes ? `*Notes:* ${credentialsNotes}\n` : "") +
          `\nI have registered this filing case on tax.yasmeensons.com and am ready to proceed.`;

        window.open(formatWhatsAppUrl(waMsg, "03120947187"), "_blank");
      } else {
        setError(data.error || "Failed to create case record. Please retry.");
      }
    } catch {
      setError("Network connection issue. You can contact WhatsApp directly at 0312 0947187.");
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS SCREEN (Full-Screen Folio with Rubber Stamp Block)
  if (caseFolio) {
    const waPrefill = `Case ${caseFolio.reference} | ${caseFolio.categoryCode} | ${caseFolio.packageCode} | TY2026`;
    return (
      <div className="max-w-2xl mx-auto glass-card p-6 sm:p-10 text-center space-y-6 border-brass shadow-lg">
        {/* Rubber Stamp Block */}
        <div className="border-2 border-dashed border-ink/80 bg-paper-light p-6 rounded-md space-y-3 relative overflow-hidden">
          <div className="text-[10px] font-mono text-ash tracking-widest uppercase">
            YASMEEN & SONS TAX PRACTICE · INTAKE RECORD
          </div>

          <div className="py-2">
            <div className="font-mono text-3xl sm:text-4xl font-black text-ink tracking-tight">
              {caseFolio.reference}
            </div>
            <div className="font-mono text-xs font-bold text-brass tracking-wider mt-1">
              TY2026 · {caseFolio.categoryCode} · {caseFolio.packageCode}
            </div>
          </div>

          <div className="border-t border-rule pt-3 text-xs font-mono text-ash flex items-center justify-between">
            <span>CLIENT: {caseFolio.fullName.toUpperCase()}</span>
            <span>CONTACT: {caseFolio.phone}</span>
          </div>

          <div className="stamp-box py-1 text-[11px] rounded">
            CASE RECORDED · ASSIGNED TO OPERATOR DESK
          </div>
        </div>

        <div className="space-y-2 text-xs text-ash leading-relaxed max-w-md mx-auto">
          <p>
            Your case file is officially generated and logged in our tax desk. WhatsApp chat has been initiated with our consultant on <strong>0312 0947187</strong>.
          </p>
          <p className="font-urdu text-ink font-semibold" dir="rtl">
            آپ کا کیس نمبر محفوظ ہو چکا ہے۔ براہ کرم واٹس ایپ پر رابطہ جاری رکھیں۔
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center font-mono text-xs">
          <a
            href={formatWhatsAppUrl(`Hi, following up on ${waPrefill}`, "03120947187")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0e7064] text-white font-bold py-3.5 px-6 rounded shadow transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Open WhatsApp Chat (0312 0947187)</span>
          </a>

          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-paper-light border border-rule hover:bg-paper text-ink font-bold py-3.5 px-5 rounded transition-all"
          >
            <span>Official IRIS Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  const wizardSteps: StepItem[] = [
    { label: "Category", description: isUrdu ? "صنف ٹیکس" : "Who you are" },
    { label: "IRIS Status", description: isUrdu ? "آئرس اکاؤنٹ" : "FBR Portal" },
    { label: "Package", description: isUrdu ? "پیکج فیس" : "Service Fee" },
    { label: "Review", description: isUrdu ? "کوائف و تصدیق" : "Dispatch" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* SmoothUI Animated Stepper Header */}
      <div className="space-y-4 bg-paper-light/80 dark:bg-[#07121D]/80 p-5 sm:p-6 rounded-3xl border border-rule shadow-sm">
        <AnimatedStepper
          steps={wizardSteps}
          currentStep={currentPart - 1}
          onStepChange={(stepIdx) => {
            if (stepIdx < currentPart - 1) {
              setCurrentPart(stepIdx + 1);
            }
          }}
          allowClickNavigation={true}
          variant="horizontal"
          className="w-full"
        />
        <div className="flex items-center justify-between font-mono text-xs text-ash pt-2 border-t border-rule-light">
          <span className="font-bold text-ink tracking-wider">
            STEP 0{currentPart} OF 04
          </span>
          <span className="uppercase text-[11px] tracking-wider text-brass font-bold">
            {currentPart === 1 && (isUrdu ? "ٹیکس گزار کی صنف کا انتخاب" : "CATEGORY SELECTION")}
            {currentPart === 2 && (isUrdu ? "آئرس اکاؤنٹ اور این ٹی این کیفیت" : "IRIS ACCOUNT & NTN")}
            {currentPart === 3 && (isUrdu ? "سروس اور پیکج کا انتخاب" : "SERVICE SELECTION")}
            {currentPart === 4 && (isUrdu ? "شناختی کوائف اور تصدیق" : "VERIFICATION & DISPATCH")}
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-stamp-bg border border-stamp-red rounded-2xl text-stamp-red text-xs font-mono flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* ============================================================
          PART 01 — PERSON (Category cards with codes)
          ============================================================ */}
      {currentPart === 1 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border-rule">
          <div className="border-b border-rule pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="form-code">Res. status / source</span>
              <span className="fbr-chip">{currentCategory.irisMap}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              Part 01 — Select Your Income Profile
            </h2>
            <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              براہِ کرم اپنی آمدنی یا ٹیکس دہندہ کی صنف کا انتخاب کریں
            </div>
            <p className="text-xs sm:text-sm text-ash leading-relaxed">
              This selects your tailored document checklist and tax schedule. It is not your final IRIS return type yet.
            </p>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const isSelected = categoryCode === cat.code;
              return (
                <div
                  key={cat.code}
                  onClick={() => setCategoryCode(cat.code)}
                  className={`p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? "border-brass bg-brass-subtle/80 ring-2 ring-brass shadow-sm"
                      : "border-rule bg-folio hover:border-ash hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-ink px-2.5 py-0.5 rounded-full bg-paper border border-rule">
                        {cat.code}
                      </span>
                      <span className="font-bold text-base sm:text-lg text-ink">
                        {cat.en}
                      </span>
                    </div>

                    <div className="font-urdu text-sm font-semibold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      {cat.ur}
                    </div>

                    <p className="text-xs sm:text-sm text-ash leading-relaxed">
                      {cat.descEn}
                    </p>

                    <div className="font-urdu text-xs text-ash/80 leading-relaxed" dir="rtl">
                      {cat.descUr}
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="category"
                    checked={isSelected}
                    onChange={() => setCategoryCode(cat.code)}
                    className="accent-ink h-5 w-5 mt-1 shrink-0 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          PART 02 — IRIS ACCOUNT STATUS
          ============================================================ */}
      {currentPart === 2 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border-rule">
          <div className="border-b border-rule pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="form-code">IRIS Authentication</span>
              <span className="fbr-chip">IRIS → e-Enrollment</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              Part 02 — FBR IRIS Account Access
            </h2>
            <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              کیا آپ کے پاس سرکاری ایف بی آر پورٹل کا فعال لاگ ان موجود ہے؟
            </div>
            <p className="text-xs sm:text-sm text-ash leading-relaxed">
              Do you have login credentials for the official federal tax system?
            </p>
          </div>

          {/* Stamp / Security Invariant */}
          <div className="stamp-box p-4 rounded-2xl text-center space-y-1">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-stamp-red">
              PASSWORD NOT REQUIRED AT INTAKE
            </div>
            <div className="text-xs text-ink/80 leading-relaxed">
              You will sign into iris.fbr.gov.pk yourself during submission. We never ask for or store credentials.
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "active",
                titleEn: "Active IRIS credentials",
                titleUr: "فعال آئرس پاس ورڈ موجود ہے",
                descEn: "You know your CNIC/Password. You will log in yourself during filing.",
                descUr: "آپ فائلنگ کے وقت آفیشل پورٹل پر خود لاگ ان ہوں گے۔",
              },
              {
                id: "forgot_password",
                titleEn: "Password / PIN recovery required",
                titleUr: "پاس ورڈ یا پن ری سیٹ درکار ہے",
                descEn: "We guide you through official FBR reset codes sent to your SIM/email.",
                descUr: "ہم آفیشل ایف بی آر طریقہ کار کے تحت کوڈز منگوا کر ری سیٹ کروائیں گے۔",
              },
              {
                id: "unregistered",
                titleEn: "Not on IRIS / No NTN yet",
                titleUr: "ابھی تک آئرس پر رجسٹرڈ نہیں ہوں",
                descEn: "We assist with official e-enrollment on FBR using your CNIC.",
                descUr: "ہم شناختی کارڈ پر ایف بی آر کی ای انرولمنٹ میں معاونت کریں گے۔",
              },
            ].map((opt) => {
              const isSelected = irisStatus === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setIrisStatus(opt.id)}
                  className={`p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? "border-brass bg-brass-subtle/80 ring-2 ring-brass shadow-sm"
                      : "border-rule bg-folio hover:border-ash hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="font-bold text-base sm:text-lg text-ink">
                      {opt.titleEn}
                    </div>
                    <div className="font-urdu text-sm font-semibold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      {opt.titleUr}
                    </div>
                    <p className="text-xs sm:text-sm text-ash leading-relaxed">
                      {opt.descEn}
                    </p>
                    <div className="font-urdu text-xs text-ash/80 leading-relaxed" dir="rtl">
                      {opt.descUr}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="irisStatus"
                    checked={isSelected}
                    onChange={() => setIrisStatus(opt.id)}
                    className="accent-ink h-5 w-5 mt-1 shrink-0 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          PART 03 — SERVICE + FEE
          ============================================================ */}
      {currentPart === 3 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border-rule">
          <div className="border-b border-rule pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="form-code">Fee schedule</span>
              <span className="fbr-chip">Schedule 03 — TY2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              Part 03 — Choose Service Package
            </h2>
            <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              شفاف اور پیشگی فیس • کوئی پوشیدہ اخراجات نہیں
            </div>
            <p className="text-xs sm:text-sm text-ash leading-relaxed">
              All fees are fixed and confirmed upfront after initial review. No hidden retainers.
            </p>
          </div>

          <div className="space-y-4">
            {PACKAGES.map((pkg) => {
              const isSelected = packageCode === pkg.code;
              return (
                <div
                  key={pkg.code}
                  onClick={() => setPackageCode(pkg.code)}
                  className={`p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 relative ${
                    isSelected
                      ? "border-brass bg-brass-subtle/80 ring-2 ring-brass shadow-sm"
                      : "border-rule bg-folio hover:border-ash hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-2.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-ink px-2.5 py-0.5 rounded-full bg-paper border border-rule">
                        {pkg.code}
                      </span>
                      <span className="font-serif font-black text-xl sm:text-2xl text-ink">
                        {pkg.fee}
                      </span>
                      {pkg.isRecommended && (
                        <span className="font-mono text-[10px] font-bold bg-brass text-ink px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-base sm:text-lg text-ink">
                      {pkg.nameEn}
                    </div>

                    <div className="font-urdu text-sm font-semibold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      {pkg.nameUr}
                    </div>

                    <p className="text-xs sm:text-sm text-ash leading-relaxed">
                      {pkg.descEn}
                    </p>

                    <div className="font-urdu text-xs text-ash/80 leading-relaxed" dir="rtl">
                      {pkg.descUr}
                    </div>

                    {pkg.code === "CX-4500" && (
                      <p className="font-mono text-xs text-brass font-semibold pt-1">
                        * Final fee confirmed after document review.
                      </p>
                    )}
                  </div>

                  <input
                    type="radio"
                    name="package"
                    checked={isSelected}
                    onChange={() => setPackageCode(pkg.code)}
                    className="accent-ink h-5 w-5 mt-1 shrink-0 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          PART 04 — FOLIO (Particulars, Docs, Consent)
          ============================================================ */}
      {currentPart === 4 && (
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border-rule">
          <div className="border-b border-rule pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="form-code">Part I — Particulars</span>
              <span className="font-mono text-xs text-brass font-bold bg-brass/10 px-2.5 py-0.5 rounded-full border border-brass/20">
                {categoryCode} · {packageCode}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
              Part 04 — Taxpayer Particulars &amp; Folio
            </h2>
            <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              بنیادی شناختی کوائف اور تصدیق برائے انفرادی کیس
            </div>
            <p className="text-xs sm:text-sm text-ash leading-relaxed">
              Enter your contact and tax details. Your confidential Case Folio will be generated immediately.
            </p>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Full Name (as per CNIC) <span className="text-stamp-red">*</span>
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                شناختی کارڈ کے مطابق پورا نام
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Muhammad Tariq"
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />
            </div>

            {/* WhatsApp & Active Mobile SIM */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Active Mobile SIM / WhatsApp Contact <span className="text-stamp-red">*</span>
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                فعال موبائل سم / واٹس ایپ نمبر (او ٹی پی و تصدیق کے لیے)
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="0312 0000000"
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink font-mono focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />

              <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-rule bg-paper-light hover:bg-paper transition-all">
                  <input
                    type="radio"
                    name="seniorSimOwner"
                    checked={simOwner === "own"}
                    onChange={() => setSimOwner("own")}
                    className="accent-[#128C7E] h-4 w-4"
                  />
                  <span>SIM in own name (اپنے نام پر سم)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-rule bg-paper-light hover:bg-paper transition-all">
                  <input
                    type="radio"
                    name="seniorSimOwner"
                    checked={simOwner === "relative"}
                    onChange={() => setSimOwner("relative")}
                    className="accent-[#128C7E] h-4 w-4"
                  />
                  <span>Blood Relative / Family SIM (خونی رشتہ دار)</span>
                </label>
              </div>

              {simOwner === "relative" && (
                <div className="mt-3 p-4 bg-paper-light border border-rule rounded-2xl space-y-3 text-xs">
                  <div className="text-xs text-ash leading-relaxed">
                    If SIM is not in your own name, provide relative details for verification codes:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={relativeName}
                      onChange={(e) => setRelativeName(e.target.value)}
                      placeholder="Relative Full Name (رشتہ دار کا نام)"
                      className="w-full bg-folio border border-rule rounded-xl px-3 py-2 text-xs text-ink"
                    />
                    <input
                      type="text"
                      value={relativeRelation}
                      onChange={(e) => setRelativeRelation(e.target.value)}
                      placeholder="Relationship (e.g. Father, Husband)"
                      className="w-full bg-folio border border-rule rounded-xl px-3 py-2 text-xs text-ink"
                    />
                  </div>
                  <input
                    type="text"
                    value={relativeCnic}
                    onChange={(e) => handleRelativeCnicChange(e.target.value)}
                    placeholder="Relative's 13-digit CNIC (رشتہ دار کا شناختی کارڈ)"
                    className="w-full bg-folio border border-rule rounded-xl px-3 py-2 text-xs text-ink font-mono"
                  />
                </div>
              )}
            </div>

            {/* CNIC */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                CNIC (13 digits)
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                قومی شناختی کارڈ نمبر (۱۳ ہندسے)
              </div>
              <input
                type="text"
                value={cnic}
                onChange={(e) => handleCnicChange(e.target.value)}
                placeholder="35202-0000000-0"
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink font-mono focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />
            </div>

            {/* Email Address & Assistance */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Personal Email Address <span className="text-ash font-normal">(Optional)</span>
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                ذاتی ای میل ایڈریس (نوٹسز اور تصدیق کے لیے)
              </div>
              <input
                type="email"
                disabled={needEmailHelp}
                value={needEmailHelp ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={needEmailHelp ? "We will help create and configure your email" : "client@domain.com"}
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all disabled:opacity-60"
              />

              <label className="flex items-start gap-3 p-3 rounded-xl border border-rule bg-paper-light cursor-pointer text-xs text-ink">
                <input
                  type="checkbox"
                  checked={needEmailHelp}
                  onChange={(e) => setNeedEmailHelp(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <span className="leading-relaxed">
                  <strong>I don&apos;t have an email</strong> — we can help along with full guidance and create email if you don&apos;t already have one.
                  <span className="block font-urdu text-xs text-[#128C7E] dark:text-[#C4A046] mt-1" dir="rtl">
                    میرا ای میل نہیں ہے، ہمارے لیے نیا ای میل بنائیں اور مکمل رہنمائی دیں۔
                  </span>
                </span>
              </label>
            </div>

            {/* Current Residential Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Current Residential Address <span className="text-ash font-normal">(FBR Form 181 requirement)</span>
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                موجودہ رہائشی پتہ مع شہر و ضلع
              </div>
              <input
                type="text"
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
                placeholder="House / Street / Area / City"
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />
            </div>

            {/* Income Source Particulars */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Income Source Details <span className="text-ash font-normal">(Optional)</span>
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                آمدن یا روزگار کے ذرائع کی مختصر تفصیل
              </div>
              <input
                type="text"
                value={incomeDetails}
                onChange={(e) => setIncomeDetails(e.target.value)}
                placeholder={
                  categoryCode === "SAL"
                    ? "Employer Name, Office Address & NTN (if known)"
                    : categoryCode === "PEN"
                    ? "Pension Book No. / National Savings profit branch"
                    : categoryCode === "HIF"
                    ? "Husband / Family financial maintenance"
                    : "Rental property address or business activity"
                }
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-sm font-semibold text-ink focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />
            </div>

            {/* Family Group Filing & WHT Deductions Audit */}
            <div className="p-4 sm:p-5 rounded-2xl bg-paper-light border border-rule space-y-4">
              <label className="flex items-start gap-3 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={familyConsolidation}
                  onChange={(e) => setFamilyConsolidation(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div className="space-y-1">
                  <div className="font-bold text-ink text-sm">Family Group Filing &amp; Inter-Family Transfers Reconciliation</div>
                  <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                    خاندانی بینک ٹرانسفرز کی تصدیق تاکہ دہرے ٹیکس سے بچاؤ ممکن ہو سکے
                  </div>
                  <div className="text-xs text-ash leading-relaxed">
                    Reconcile internal family bank transfers (Spouse, Parents, Children) so transfers are not mistaken for income or double-taxed.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer text-xs border-t border-rule pt-3">
                <input
                  type="checkbox"
                  checked={whtAudit}
                  onChange={(e) => setWhtAudit(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div className="space-y-1">
                  <div className="font-bold text-[#128C7E] dark:text-[#C4A046] text-sm">Full Source Withholding Tax Audit (Recommended)</div>
                  <div className="font-urdu text-xs text-ash" dir="rtl">
                    تمام ودہولڈنگ ٹیکس کٹوتیوں کا کلیم (بجلی، گیس، موبائل، بینک و اے ٹی ایم)
                  </div>
                  <div className="text-xs text-ash leading-relaxed">
                    Claim and audit all deductions taken at source: ATM cash withdrawals, fuel, utility bills, mobile SIM load &amp; package fees, card fees.
                  </div>
                </div>
              </label>
            </div>

            {/* Generated Document List from Part 01 */}
            <div className="pt-2 border-t border-rule space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink">Required Documents for {categoryCode}:</span>
                <span className="form-code">Evidence schedule</span>
              </div>
              <div className="space-y-2 p-4 rounded-2xl bg-paper-light border border-rule-light text-xs font-mono">
                {currentCategory.docs.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-brass font-bold shrink-0">{d.code}</span>
                    <span className="text-ink leading-relaxed">{d.en}</span>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1 text-xs text-ink font-medium">
                <input
                  type="checkbox"
                  checked={sendViaWhatsApp}
                  onChange={(e) => setSendViaWhatsApp(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 rounded"
                />
                <span>I will send document photos / PDFs directly on WhatsApp.</span>
              </label>
            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={credentialsNotes}
                onChange={(e) => setCredentialsNotes(e.target.value)}
                placeholder="Any special remarks or prior filing details..."
                className="w-full bg-folio border border-rule rounded-xl px-4 py-3 text-xs text-ink focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E] outline-none transition-all"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-paper-light border border-rule">
                <input
                  type="checkbox"
                  required
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <span className="text-xs text-ink leading-relaxed">
                  <strong>Authority to prepare:</strong> I authorize Yasmeen &amp; Sons tax specialists to review provided records and prepare figures for Tax Year 2026. <em>No filing will be submitted without my review and direct IRIS sign-in.</em>
                </span>
              </label>
            </div>
          </div>
        </form>
      )}

      {/* Sticky Wizard Footer */}
      <div className="sticky bottom-6 z-30 bg-paper-light/95 dark:bg-[#07121D]/95 backdrop-blur-xl border border-rule p-4 sm:p-5 rounded-3xl flex items-center justify-between gap-4 shadow-xl mt-8">
        {currentPart > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPart((p) => p - 1)}
            className="text-xs font-mono font-bold text-ash hover:text-ink flex items-center gap-1.5 px-4 py-2.5 rounded-full hover:bg-paper transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20to%20start%20my%20Tax%20Year%202026%20filing."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-ash hover:text-ink flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-paper transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#128C7E]" />
            <span>WhatsApp Instead</span>
          </a>
        )}

        <div className="flex items-center gap-3">
          {currentPart < 4 ? (
            <button
              type="button"
              onClick={validateAndNext}
              className="inline-flex items-center gap-2 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-md transition-all active:scale-95"
            >
              <span>Continue →</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white font-mono font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-md transition-all disabled:opacity-60 active:scale-95"
            >
              <span>{submitting ? "Recording Folio..." : "Generate Case File (YS-26-XXXXX)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
