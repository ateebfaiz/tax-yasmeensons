"use client";

import React, { useState, useEffect } from "react";
import { formatWhatsAppUrl } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  FileCheck,
  AlertCircle,
  Clock,
} from "lucide-react";

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
  const [email, setEmail] = useState<string>("");
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
    if (!consented) {
      setError("Please check the authorization box to proceed.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          cnic,
          email,
          persona: categoryCode.toLowerCase(),
          irisStatus,
          serviceTier: currentPkg.id,
          contactPreference: "whatsapp",
          credentialsNotes,
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
          (email ? `*Email:* ${email}\n` : "") +
          `*Category:* ${currentCategory.en} (${currentCategory.code})\n` +
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
            <MessageCircle className="w-4 h-4" />
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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-xs text-ash">
          <span className="font-bold text-ink">
            PART 0{currentPart} / 04
          </span>
          <span>
            {currentPart === 1 && "WHO ARE YOU? · CATEGORY"}
            {currentPart === 2 && "IRIS ACCOUNT STATUS"}
            {currentPart === 3 && "SERVICE & FEE SELECTION"}
            {currentPart === 4 && "TAXPAYER PARTICULARS"}
          </span>
        </div>

        {/* Thin Brass Progress Bar */}
        <div className="w-full h-1 bg-rule rounded-full overflow-hidden">
          <div
            className="h-full bg-brass transition-all duration-300"
            style={{ width: `${(currentPart / 4) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-stamp-bg border border-stamp-red rounded text-stamp-red text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ============================================================
          PART 01 — PERSON (Category cards with codes)
          ============================================================ */}
      {currentPart === 1 && (
        <div className="glass-card p-6 space-y-5 border-rule">
          <div className="border-b border-rule pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="form-code">Res. status / source</span>
              <span className="fbr-chip">{currentCategory.irisMap}</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-ink">
              Part 01 — Select Your Income Profile
            </h2>
            <p className="text-xs text-ash">
              This selects your document checklist and tax slab schedule. It is not your final IRIS return type yet.
            </p>
          </div>

          <div className="space-y-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = categoryCode === cat.code;
              return (
                <div
                  key={cat.code}
                  onClick={() => setCategoryCode(cat.code)}
                  className={`p-3.5 rounded border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "border-brass bg-brass-subtle ring-1 ring-brass"
                      : "border-rule bg-folio hover:border-ash"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink px-1.5 py-0.5 rounded bg-paper border border-rule">
                        {cat.code}
                      </span>
                      <span className="font-bold text-xs text-ink">{cat.en}</span>
                    </div>
                    <div className="font-urdu text-xs text-ash" dir="rtl">{cat.ur}</div>
                    <p className="text-[11px] text-ash leading-tight">{cat.descEn}</p>
                  </div>

                  <input
                    type="radio"
                    name="category"
                    checked={isSelected}
                    onChange={() => setCategoryCode(cat.code)}
                    className="accent-ink h-4 w-4 mt-1"
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
        <div className="glass-card p-6 space-y-5 border-rule">
          <div className="border-b border-rule pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="form-code">IRIS Authentication</span>
              <span className="fbr-chip">IRIS → e-Enrollment</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-ink">
              Part 02 — FBR IRIS Account Access
            </h2>
            <p className="text-xs text-ash">
              Do you have login credentials for the official federal tax system?
            </p>
          </div>

          {/* Stamp */}
          <div className="stamp-box p-3 rounded text-center text-xs space-y-0.5">
            <div>PASSWORD NOT REQUIRED AT INTAKE</div>
            <div className="text-[10px] font-normal opacity-90">
              You will sign into iris.fbr.gov.pk yourself. We never store credentials.
            </div>
          </div>

          <div className="space-y-2.5">
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
                  className={`p-3.5 rounded border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "border-brass bg-brass-subtle ring-1 ring-brass"
                      : "border-rule bg-folio hover:border-ash"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs text-ink">{opt.titleEn}</div>
                    <div className="font-urdu text-xs text-ash" dir="rtl">{opt.titleUr}</div>
                    <p className="text-[11px] text-ash">{opt.descEn}</p>
                  </div>
                  <input
                    type="radio"
                    name="irisStatus"
                    checked={isSelected}
                    onChange={() => setIrisStatus(opt.id)}
                    className="accent-ink h-4 w-4 mt-1"
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
        <div className="glass-card p-6 space-y-5 border-rule">
          <div className="border-b border-rule pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="form-code">Fee schedule</span>
              <span className="fbr-chip">Schedule 03 — TY2026</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-ink">
              Part 03 — Choose Service Package
            </h2>
            <p className="text-xs text-ash">
              All fees confirmed after initial review. No hidden retainers.
            </p>
          </div>

          <div className="space-y-3">
            {PACKAGES.map((pkg) => {
              const isSelected = packageCode === pkg.code;
              return (
                <div
                  key={pkg.code}
                  onClick={() => setPackageCode(pkg.code)}
                  className={`p-4 rounded border cursor-pointer transition-all flex items-start justify-between gap-3 relative ${
                    isSelected
                      ? "border-brass bg-brass-subtle ring-1 ring-brass"
                      : "border-rule bg-folio hover:border-ash"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-ink px-1.5 py-0.5 rounded bg-paper border border-rule">
                        {pkg.code}
                      </span>
                      <span className="font-bold text-xs text-ink">{pkg.nameEn}</span>
                      <span className="font-serif font-black text-xs text-ink ml-1">{pkg.fee}</span>
                      {pkg.isRecommended && (
                        <span className="font-mono text-[9px] font-bold bg-brass text-ink px-1.5 py-0.2 rounded uppercase">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="font-urdu text-xs text-ash" dir="rtl">{pkg.nameUr}</div>
                    <p className="text-xs text-ash leading-relaxed">{pkg.descEn}</p>
                    {pkg.code === "CX-4500" && (
                      <p className="font-mono text-[10px] text-brass font-semibold">
                        * Final fee confirmed after document review.
                      </p>
                    )}
                  </div>

                  <input
                    type="radio"
                    name="package"
                    checked={isSelected}
                    onChange={() => setPackageCode(pkg.code)}
                    className="accent-ink h-4 w-4 mt-1"
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
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5 border-rule">
          <div className="border-b border-rule pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="form-code">Part I — Particulars</span>
              <span className="font-mono text-[11px] text-brass font-bold">
                {categoryCode} · {packageCode}
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-ink">
              Part 04 — Taxpayer Particulars & Folio
            </h2>
            <p className="text-xs text-ash">
              Enter your details. Case ID will be issued immediately upon submission.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Full Name */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide">
                  Full Name (as per CNIC) <span className="text-stamp-red">*</span>
                </label>
                <span className="form-code">Part I — Name</span>
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Muhammad Tariq"
                className="w-full bg-folio border border-rule rounded px-3 py-2 text-xs font-semibold text-ink focus:border-ink focus:ring-1 focus:ring-ink"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide">
                  WhatsApp Contact <span className="text-stamp-red">*</span>
                </label>
                <span className="form-code">Contact phone</span>
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="0312 0000000"
                className="w-full bg-folio border border-rule rounded px-3 py-2 text-xs font-semibold text-ink font-mono focus:border-ink focus:ring-1 focus:ring-ink"
              />
            </div>

            {/* CNIC */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide">
                  CNIC (13 digits)
                </label>
                <span className="form-code">CNIC / NTN</span>
              </div>
              <input
                type="text"
                value={cnic}
                onChange={(e) => handleCnicChange(e.target.value)}
                placeholder="35202-0000000-0"
                className="w-full bg-folio border border-rule rounded px-3 py-2 text-xs font-semibold text-ink font-mono focus:border-ink focus:ring-1 focus:ring-ink"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide">
                  Email Address <span className="text-ash font-normal">(Optional)</span>
                </label>
                <span className="form-code">Electronic notice</span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full bg-folio border border-rule rounded px-3 py-2 text-xs font-semibold text-ink focus:border-ink focus:ring-1 focus:ring-ink"
              />
            </div>

            {/* Generated Document List from Part 01 */}
            <div className="pt-2 border-t border-rule space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink">Required Documents for {categoryCode}:</span>
                <span className="form-code">Evidence schedule</span>
              </div>
              <div className="space-y-1.5 p-3 rounded bg-paper-light border border-rule-light text-xs font-mono">
                {currentCategory.docs.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-brass font-bold">{d.code}</span>
                    <span className="text-ink">{d.en}</span>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-ink font-medium">
                <input
                  type="checkbox"
                  checked={sendViaWhatsApp}
                  onChange={(e) => setSendViaWhatsApp(e.target.checked)}
                  className="accent-ink h-4 w-4 rounded"
                />
                <span>I will send document photos / PDFs directly on WhatsApp.</span>
              </label>
            </div>

            {/* Optional Notes */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide">
                  Additional Notes (Optional)
                </label>
                <span className="form-code">Remarks</span>
              </div>
              <textarea
                rows={2}
                value={credentialsNotes}
                onChange={(e) => setCredentialsNotes(e.target.value)}
                placeholder="Any special remarks or prior filing details..."
                className="w-full bg-folio border border-rule rounded px-3 py-2 text-xs text-ink focus:border-ink focus:ring-1 focus:ring-ink"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded bg-paper-light border border-rule">
                <input
                  type="checkbox"
                  required
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
                  className="accent-ink h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <span className="text-xs text-ink leading-relaxed">
                  <strong>Authority to prepare:</strong> I authorize Yasmeen & Sons tax specialists to review provided records and prepare figures for Tax Year 2026. <em>No filing will be submitted without my review and direct IRIS sign-in.</em>
                </span>
              </label>
            </div>
          </div>
        </form>
      )}

      {/* Sticky Wizard Footer */}
      <div className="sticky bottom-0 z-30 bg-folio/95 backdrop-blur-md border-t border-rule p-4 -mx-4 sm:mx-0 sm:rounded-md flex items-center justify-between gap-4">
        {currentPart > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPart((p) => p - 1)}
            className="text-xs font-mono font-bold text-ash hover:text-ink flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20to%20start%20my%20Tax%20Year%202026%20filing."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-ash hover:text-ink flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <span>WhatsApp Instead</span>
          </a>
        )}

        <div className="flex items-center gap-3">
          {currentPart < 4 ? (
            <button
              type="button"
              onClick={validateAndNext}
              className="inline-flex items-center gap-1.5 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs px-6 py-2.5 rounded shadow transition-all"
            >
              <span>Continue →</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs px-6 py-2.5 rounded shadow transition-all disabled:opacity-60"
            >
              <span>{submitting ? "Recording Folio..." : "Generate Case File (YS-26-XXXXX)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
