"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { BilingualLabel } from "@/components/ui/bilingual-label";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

interface FastIntakeProps {
  onClose: () => void;
  payload?: { defaultPersona?: string; defaultTier?: string };
}

const PERSONAS = [
  { id: "salaried", labelEn: "Salaried", labelUr: "تنخواہ دار", icon: Briefcase },
  { id: "pensioner", labelEn: "Pensioner", labelUr: "پنشنر", icon: HeartHandshake },
  { id: "housewife", labelEn: "Housewife", labelUr: "گھریلو خاتون", icon: Users },
  { id: "student", labelEn: "Student", labelUr: "طالب علم", icon: GraduationCap },
  { id: "business", labelEn: "Business/Freelance", labelUr: "کاروبار / فری لانسر", icon: Building2 },
];

export default function TaxIntakeClip({ onClose, payload }: FastIntakeProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [persona, setPersona] = useState(payload?.defaultPersona || "salaried");
  const [tier, setTier] = useState(payload?.defaultTier || "assistance_2500");
  const [irisStatus, setIrisStatus] = useState<"has_account" | "needs_registration" | "guidance_needed">("has_account");

  // Basic Info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [simOwner, setSimOwner] = useState<"own" | "relative">("own");
  const [relativeName, setRelativeName] = useState("");
  const [relativeCnic, setRelativeCnic] = useState("");
  const [relativeRelation, setRelativeRelation] = useState("Father / والد");

  // Email & Address
  const [email, setEmail] = useState("");
  const [needEmailHelp, setNeedEmailHelp] = useState(false);
  const [residentialAddress, setResidentialAddress] = useState("");

  // Income & Claims
  const [incomeDetails, setIncomeDetails] = useState("");
  const [familyConsolidation, setFamilyConsolidation] = useState(false);
  const [whtAudit, setWhtAudit] = useState(true);

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);

  const handleCnicChange = (val: string) => {
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
    const digits = val.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }
    setPhone(formatted);
  };

  const validateStep1 = () => {
    setError(null);
    if (!fullName.trim()) {
      setError("Please enter your Full Name as per CNIC / شناختی کارڈ کے مطابق نام درج کریں");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 11) {
      setError("Please enter a valid 11-digit mobile number / درست 11 ہندسوں کا موبائل نمبر درج کریں");
      return;
    }
    if (simOwner === "relative" && (!relativeName.trim() || !relativeCnic.trim())) {
      setError("Please provide relative's name and CNIC / قریبی رشتہ دار کا نام اور شناختی کارڈ درج کریں");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (submitViaWhatsApp: boolean) => {
    setError(null);
    setSubmitting(true);

    try {
      const irisStatusLabel =
        irisStatus === "needs_registration"
          ? "Need New FBR Registration (NTN)"
          : irisStatus === "has_account"
          ? "Already have IRIS login"
          : "Need guidance on IRIS status";

      const notesSummary = [
        `IRIS Status: ${irisStatusLabel}`,
        simOwner === "relative" ? `SIM on Relative: ${relativeName} (${relativeRelation}), CNIC: ${relativeCnic}` : "SIM: Registered in own CNIC",
        needEmailHelp ? "Customer requests email creation assistance" : email ? `Email: ${email}` : "No email",
        residentialAddress ? `Address: ${residentialAddress}` : "",
        incomeDetails ? `Income details: ${incomeDetails}` : "",
        familyConsolidation ? "Family group filing / inter-family transfers reconciliation requested" : "",
        whtAudit ? "Full withholding tax deduction claim audit enabled (banks, bills, SIM, fuel)" : "",
      ].filter(Boolean).join(" | ");

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          cnic: cnic.trim(),
          email: needEmailHelp ? "needs_email_help@fbr.local" : email.trim(),
          persona,
          serviceTier: tier,
          contactPreference: submitViaWhatsApp ? "whatsapp" : "web",
          credentialsNotes: notesSummary,
          documentsSummary: `Mobile AppClip Intake: ${persona.toUpperCase()} (${irisStatusLabel})`,
          source: "fast_app_clip",
        }),
      });

      const data = await res.json();
      const generatedRef = data.reference || "TAX-2026-CLIP";
      setRefId(generatedRef);

      if (submitViaWhatsApp) {
        const tierLabel =
          tier === "guided_1000"
            ? "Guided Filing GF-1000 (PKR 1,000)"
            : tier === "complex_5000"
            ? "Complex Audit CX-4500 (PKR 4,500+)"
            : "Complete Assistance FA-2500 (PKR 2,500)";

        const msg = `*Tax Year 2026 Mobile Intake | Case: ${generatedRef}*\n\n` +
          `*Name:* ${fullName}\n` +
          `*Phone:* ${phone}\n` +
          (cnic ? `*CNIC:* ${cnic}\n` : "") +
          `*FBR Status:* ${irisStatusLabel}\n` +
          (simOwner === "relative" ? `*SIM on:* ${relativeName} (${relativeRelation}, CNIC: ${relativeCnic})\n` : `*SIM:* Own CNIC\n`) +
          (needEmailHelp ? `*Email:* Help requested to create email\n` : email ? `*Email:* ${email}\n` : "") +
          (residentialAddress ? `*Address:* ${residentialAddress}\n` : "") +
          `*Category:* ${persona.toUpperCase()}\n` +
          (incomeDetails ? `*Income Source:* ${incomeDetails}\n` : "") +
          (familyConsolidation ? `*Family Consolidation:* Reconcile family transfers\n` : "") +
          (whtAudit ? `*WHT Audit:* Claim all ATM, fuel, utility, SIM source taxes\n` : "") +
          `*Tier:* ${tierLabel}\n\n` +
          `I am ready to start my Tax Year 2026 return filing.`;

        window.open(formatWhatsAppUrl(msg, "03120947187"), "_blank");
      }
      setStep(3);
    } catch {
      setError("Network error. Please tap to connect directly on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Fast Tax Filing Intake"
      subtitle="فوری ٹیکس فائلنگ • 60 Seconds • No Password Required"
    >
      <div className="space-y-4 pb-24 text-ink dark:text-[#F4EFE6]">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
          <span className="font-bold text-[#128C7E] dark:text-[#C4A046]">
            {step === 1 && "STEP 1: IDENTITY & VERIFIED SIM"}
            {step === 2 && "STEP 2: INCOME & WHT AUDIT"}
            {step === 3 && "STEP 3: CASE REGISTERED"}
          </span>
          <span className="text-ash dark:text-[#8C959F]">PART {step} / 3</span>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: IDENTITY & SIM */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Persona Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ash dark:text-[#8C959F]">
                Taxpayer Category
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                ٹیکس گزار کی صنف کا انتخاب کریں
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PERSONAS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = persona === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPersona(p.id)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 active:scale-95 flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? "border-[#128C7E] bg-[#128C7E]/15 dark:border-[#C4A046] dark:bg-[#C4A046]/15 font-bold shadow-sm"
                          : "border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md hover:bg-white/60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#128C7E] dark:text-[#C4A046]" : "text-ash"}`} />
                        <span className="text-xs font-bold leading-tight">{p.labelEn}</span>
                      </div>
                      <div className="text-xs font-urdu opacity-85 leading-tight" dir="rtl">{p.labelUr}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FBR IRIS Status */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ash dark:text-[#8C959F]">
                FBR IRIS Registration Status
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                آئرس اکاؤنٹ یا این ٹی این رجسٹریشن کی صورتحال
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "has_account", labelEn: "Already Have IRIS Account", labelUr: "پہلے سے اکاؤنٹ موجود ہے" },
                  { id: "needs_registration", labelEn: "Need New FBR NTN", labelUr: "نیا این ٹی این بنوانا ہے" },
                  { id: "guidance_needed", labelEn: "Need Guidance / Help", labelUr: "معلومات نہیں، رہنمائی دیں" },
                ].map((s) => {
                  const isSelected = irisStatus === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setIrisStatus(s.id as any)}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-200 active:scale-95 flex flex-col justify-between gap-0.5 ${
                        isSelected
                          ? "border-[#128C7E] bg-[#128C7E]/15 dark:border-[#C4A046] dark:bg-[#C4A046]/15 font-bold shadow-sm"
                          : "border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md hover:bg-white/60"
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{s.labelEn}</span>
                      <span className="text-[11px] font-urdu opacity-80 leading-tight" dir="rtl">{s.labelUr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact & Identity Details */}
            <div className="bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl p-4 rounded-2xl border border-white/70 dark:border-white/10 space-y-3.5 shadow-sm">
              <div>
                <BilingualLabel en="Full Name (as per CNIC)" ur="پورا نام (شناختی کارڈ کے مطابق)" htmlFor="fast-name" required />
                <input
                  id="fast-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Tariq"
                  className="w-full mt-1.5 bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#128C7E] outline-none"
                />
              </div>

              {/* 13-Digit CNIC */}
              <div>
                <BilingualLabel en="CNIC Number (13 Digits)" ur="قومی شناختی کارڈ نمبر" htmlFor="fast-cnic" />
                <input
                  id="fast-cnic"
                  type="text"
                  value={cnic}
                  onChange={(e) => handleCnicChange(e.target.value)}
                  placeholder="35202-0000000-0"
                  className="w-full mt-1 bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-mono font-semibold focus:border-[#128C7E] outline-none"
                />
              </div>

              {/* Active Mobile SIM Ownership */}
              <div className="space-y-2 pt-1">
                <BilingualLabel en="Active Mobile SIM" ur="فعال موبائل سم" htmlFor="fast-phone" required />
                <input
                  id="fast-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="0312 0000000"
                  className="w-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-mono font-semibold focus:border-[#128C7E] outline-none"
                />

                <div className="pt-1 flex flex-col sm:flex-row gap-2.5 sm:gap-4 text-xs font-medium">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="simOwner"
                      checked={simOwner === "own"}
                      onChange={() => setSimOwner("own")}
                      className="accent-[#128C7E] h-3.5 w-3.5"
                    />
                    <span>Registered in my own CNIC</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="simOwner"
                      checked={simOwner === "relative"}
                      onChange={() => setSimOwner("relative")}
                      className="accent-[#128C7E] h-3.5 w-3.5"
                    />
                    <span>Blood Relative / Family SIM</span>
                  </label>
                </div>

                {simOwner === "relative" && (
                  <div className="mt-2 p-3 bg-brass-subtle/40 dark:bg-white/[0.04] backdrop-blur-md border border-[#C4A046]/40 rounded-xl space-y-2.5">
                    <div className="text-[11px] font-medium text-ash dark:text-[#8C959F]">
                      If the SIM is registered under an immediate family member:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          value={relativeName}
                          onChange={(e) => setRelativeName(e.target.value)}
                          placeholder="Relative Name (رشتہ دار کا نام)"
                          className="w-full bg-white/85 dark:bg-black/40 border border-white/80 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={relativeRelation}
                          onChange={(e) => setRelativeRelation(e.target.value)}
                          placeholder="Relation (Father / Husband / Mother)"
                          className="w-full bg-white/85 dark:bg-black/40 border border-white/80 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={relativeCnic}
                      onChange={(e) => handleRelativeCnicChange(e.target.value)}
                      placeholder="Relative's CNIC (رشتہ دار کا شناختی کارڈ)"
                      className="w-full bg-white/85 dark:bg-black/40 border border-white/80 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={validateStep1}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#128C7E] to-[#0A6054] hover:from-[#149989] hover:to-[#0D6D60] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <span>Continue to Income, Package &amp; Claims</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INCOME, PACKAGE & CLAIMS */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Package Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ash dark:text-[#8C959F]">
                Select Filing Package
              </label>
              <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                فائلنگ پیکیج کا انتخاب کریں
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "guided_1000", code: "GF-1000", fee: "PKR 1,000", label: "Guided Self-Filing" },
                  { id: "assistance_2500", code: "FA-2500", fee: "PKR 2,500", label: "Full Assistance", rec: true },
                  { id: "complex_5000", code: "CX-4500", fee: "PKR 4,500+", label: "Complex Audit" },
                ].map((t) => {
                  const isSelected = tier === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTier(t.id)}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-200 active:scale-95 flex flex-col justify-between gap-1 relative ${
                        isSelected
                          ? "border-[#128C7E] bg-[#128C7E]/15 dark:border-[#C4A046] dark:bg-[#C4A046]/15 ring-1 ring-[#128C7E] shadow-sm"
                          : "border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md hover:bg-white/60"
                      }`}
                    >
                      {t.rec && (
                        <span className="text-[9px] font-mono font-bold uppercase text-[#128C7E] dark:text-[#C4A046]">
                          ★ Popular
                        </span>
                      )}
                      <div>
                        <div className="text-[10px] font-mono text-ash">{t.code}</div>
                        <div className="text-xs font-bold">{t.fee}</div>
                        <div className="text-[10px] text-ash truncate">{t.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email & Guidance */}
            <div className="bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/70 dark:border-white/10 space-y-2.5 shadow-sm">
              <BilingualLabel en="Personal Email" ur="ذاتی ای میل ایڈریس" htmlFor="fast-email" />
              <input
                id="fast-email"
                type="email"
                disabled={needEmailHelp}
                value={needEmailHelp ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={needEmailHelp ? "We will create an email for you" : "client@example.com"}
                className="w-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#128C7E] outline-none disabled:opacity-50"
              />

              <label className="flex items-start gap-2 pt-1 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={needEmailHelp}
                  onChange={(e) => setNeedEmailHelp(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <span className="text-xs leading-relaxed">
                  <strong>I don&apos;t have an email</strong> — we can help along with full guidance and create email if you don&apos;t already have one.
                  <span className="block font-urdu text-[11px] text-ash mt-0.5" dir="rtl">
                    میرا ای میل نہیں ہے، ہمارے لیے نیا ای میل بنائیں اور ترتیب دیں۔
                  </span>
                </span>
              </label>
            </div>

            {/* Residential Address */}
            <div className="bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/70 dark:border-white/10 space-y-1.5 shadow-sm">
              <BilingualLabel en="Current Residential Address" ur="موجودہ رہائشی پتہ" htmlFor="fast-address" />
              <input
                id="fast-address"
                type="text"
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
                placeholder="House / Street / City"
                className="w-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#128C7E] outline-none"
              />
            </div>

            {/* Income Source Details */}
            <div className="bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/70 dark:border-white/10 space-y-1.5 shadow-sm">
              <BilingualLabel en="Income Source Particulars" ur="آمدن اور روزگار کی تفصیلات" htmlFor="fast-income" />
              <input
                id="fast-income"
                type="text"
                value={incomeDetails}
                onChange={(e) => setIncomeDetails(e.target.value)}
                placeholder={
                  persona === "salaried"
                    ? "Employer Name & City (or NTN if known)"
                    : persona === "business"
                    ? "Business Name & Principal Activity"
                    : "e.g. Household allowance, rent, or pension"
                }
                className="w-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-white/80 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#128C7E] outline-none"
              />
            </div>

            {/* Family Consolidation & WHT Audit Options */}
            <div className="bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl p-3.5 rounded-2xl border border-white/70 dark:border-white/10 space-y-3 shadow-sm">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={familyConsolidation}
                  onChange={(e) => setFamilyConsolidation(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div>
                  <div className="font-bold">Family Group Filing &amp; Inter-Family Transfers</div>
                  <div className="text-[11px] text-ash dark:text-[#8C959F] leading-snug">
                    Reconcile internal family bank transfers (Spouse, Parents, Siblings) so funds are never double-taxed.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs border-t border-black/[0.06] dark:border-white/[0.08] pt-2.5">
                <input
                  type="checkbox"
                  checked={whtAudit}
                  onChange={(e) => setWhtAudit(e.target.checked)}
                  className="accent-[#128C7E] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div>
                  <div className="font-bold text-[#128C7E] dark:text-[#C4A046]">
                    Full Source Withholding Tax Audit (Recommended)
                  </div>
                  <div className="text-[11px] text-ash dark:text-[#8C959F] leading-snug">
                    Claim and audit all deductions taken at source: ATM cash withdrawals, fuel, utility bills, mobile SIM load and package fees, card fees.
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-full border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md text-xs font-mono active:scale-95 transition-all"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={submitting}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{submitting ? "Opening..." : "Submit on WhatsApp (03120947187)"}</span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="text-[11px] text-ash hover:text-ink dark:hover:text-white underline transition-all font-mono"
              >
                Or save case without opening WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & FOLIO */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] text-ash uppercase tracking-wider">
                CASE FOLIO ISSUED
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
                {refId || "TAX-2026-RECORD"}
              </div>
              <div className="text-xs text-ash">
                TY2026 • {persona.toUpperCase()} • NON-BUSINESS INDIVIDUAL
              </div>
            </div>

            <div className="p-3.5 bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/70 dark:border-white/10 text-xs text-left space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-ink dark:text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#128C7E]" />
                <span>Zero-Credential Invariant Preserved</span>
              </div>
              <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
                Your filing case has been queued with our senior desk. You will be assisted directly on WhatsApp (03120947187) with your official IRIS filing checklist.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={formatWhatsAppUrl(`Hi, following up on Tax Filing Case ${refId}`, "03120947187")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Open WhatsApp Chat (0312 0947187)</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-full border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md text-xs font-semibold text-ash hover:text-ink dark:hover:text-white transition-all active:scale-95"
              >
                Close / مکمل ہوا
              </button>
            </div>
          </div>
        )}
      </div>
    </AppClipSheet>
  );
}
