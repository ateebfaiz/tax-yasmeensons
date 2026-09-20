"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { BilingualLabel } from "@/components/ui/bilingual-label";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl, formatCnicInput, formatPhoneInput } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
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

        window.open(formatWhatsAppUrl(msg), "_blank");
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
      title="Fast Tax Filing Intake"
      subtitle="فوری ٹیکس فائلنگ • 60 Seconds • No Password Required"
    >
      <div className="space-y-3.5 pb-3 text-[#f5f7f8]">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.08] pb-2">
          <span className="font-bold text-[#20b6a5]">
            {step === 1 && "STEP 1: IDENTITY & VERIFIED SIM"}
            {step === 2 && "STEP 2: INCOME & WHT AUDIT"}
            {step === 3 && "STEP 3: CASE REGISTERED"}
          </span>
          <span className="text-[#aeb9bf]">PART {step} / 3</span>
        </div>

        {error && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: IDENTITY & SIM */}
        {step === 1 && (
          <div className="space-y-3.5">
            {/* Persona Chips */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aeb9bf]">
                Taxpayer Category
              </label>
              <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
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
                          ? "border-[#20b6a5]/60 bg-[rgba(32,182,165,0.18)] shadow-[0_0_16px_rgba(32,182,165,0.2)] font-bold text-white"
                          : "border-white/[0.08] bg-[rgba(27,37,43,0.6)] hover:bg-[rgba(36,52,60,0.8)] text-[#aeb9bf]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#20b6a5]" : "text-[#aeb9bf]"}`} />
                        <span className="text-xs font-bold leading-tight">{p.labelEn}</span>
                      </div>
                      <div className="text-xs font-urdu opacity-85 leading-tight text-[#20b6a5]" dir="rtl">
                        {p.labelUr}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FBR IRIS Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aeb9bf]">
                FBR IRIS Registration Status
              </label>
              <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
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
                          ? "border-[#20b6a5]/60 bg-[rgba(32,182,165,0.18)] shadow-[0_0_16px_rgba(32,182,165,0.2)] font-bold text-white"
                          : "border-white/[0.08] bg-[rgba(27,37,43,0.6)] hover:bg-[rgba(36,52,60,0.8)] text-[#aeb9bf]"
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{s.labelEn}</span>
                      <span className="text-[11px] font-urdu opacity-80 leading-tight text-[#20b6a5]" dir="rtl">
                        {s.labelUr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact & Identity Details */}
            <GlassCard variant="default" className="p-4 space-y-3">
              <div>
                <BilingualLabel en="Full Name (as per CNIC)" ur="پورا نام (شناختی کارڈ کے مطابق)" htmlFor="fast-name" required />
                <input
                  id="fast-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Tariq"
                  className="w-full mt-1.5 bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#20b6a5] outline-none transition-all"
                />
              </div>

              {/* 13-Digit CNIC */}
              <div>
                <BilingualLabel en="CNIC Number (13 Digits)" ur="قومی شناختی کارڈ نمبر" htmlFor="fast-cnic" />
                <input
                  id="fast-cnic"
                  type="text"
                  value={cnic}
                  onChange={(e) => setCnic(formatCnicInput(e.target.value))}
                  placeholder="35202-0000000-0"
                  className="w-full mt-1 bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:border-[#20b6a5] outline-none transition-all"
                />
              </div>

              {/* Active Mobile SIM Ownership */}
              <div className="space-y-2 pt-1">
                <BilingualLabel en="Active Mobile SIM" ur="فعال موبائل سم" htmlFor="fast-phone" required />
                <input
                  id="fast-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                  placeholder="0312 0000000"
                  className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:border-[#20b6a5] outline-none transition-all"
                />

                <div className="pt-1 flex flex-col sm:flex-row gap-2.5 sm:gap-4 text-xs font-medium text-[#aeb9bf]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="simOwner"
                      checked={simOwner === "own"}
                      onChange={() => setSimOwner("own")}
                      className="accent-[#20b6a5] h-3.5 w-3.5"
                    />
                    <span>Registered in my own CNIC</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="simOwner"
                      checked={simOwner === "relative"}
                      onChange={() => setSimOwner("relative")}
                      className="accent-[#20b6a5] h-3.5 w-3.5"
                    />
                    <span>Blood Relative / Family SIM</span>
                  </label>
                </div>

                {simOwner === "relative" && (
                  <GlassCard variant="subtle" className="mt-2 p-3 space-y-2.5">
                    <div className="text-[11px] font-medium text-[#aeb9bf]">
                      If the SIM is registered under an immediate family member:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={relativeName}
                        onChange={(e) => setRelativeName(e.target.value)}
                        placeholder="Relative Name (رشتہ دار کا نام)"
                        className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none"
                      />
                      <input
                        type="text"
                        value={relativeRelation}
                        onChange={(e) => setRelativeRelation(e.target.value)}
                        placeholder="Relation (Father / Husband / Mother)"
                        className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={relativeCnic}
                      onChange={(e) => setRelativeCnic(formatCnicInput(e.target.value))}
                      placeholder="Relative's CNIC (رشتہ دار کا شناختی کارڈ)"
                      className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white placeholder-white/30 outline-none"
                    />
                  </GlassCard>
                )}
              </div>
            </GlassCard>

            {/* Next Button */}
            <div className="pt-2">
              <GlassButton
                type="button"
                variant="primary"
                onClick={validateStep1}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                Continue to Income, Package &amp; Claims
              </GlassButton>
            </div>
          </div>
        )}

        {/* STEP 2: INCOME, PACKAGE & CLAIMS */}
        {step === 2 && (
          <div className="space-y-3.5">
            {/* Package Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#aeb9bf]">
                Select Filing Package
              </label>
              <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
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
                          ? "border-[#20b6a5]/60 bg-[rgba(32,182,165,0.18)] shadow-[0_0_16px_rgba(32,182,165,0.2)] font-bold text-white"
                          : "border-white/[0.08] bg-[rgba(27,37,43,0.6)] hover:bg-[rgba(36,52,60,0.8)] text-[#aeb9bf]"
                      }`}
                    >
                      {t.rec && (
                        <span className="text-[9px] font-mono font-bold uppercase text-[#20b6a5]">
                          ★ Popular
                        </span>
                      )}
                      <div>
                        <div className="text-[10px] font-mono text-[#aeb9bf]">{t.code}</div>
                        <div className="text-xs font-bold text-white">{t.fee}</div>
                        <div className="text-[10px] text-[#aeb9bf] truncate">{t.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email & Guidance */}
            <GlassCard variant="default" className="p-3.5 space-y-2">
              <BilingualLabel en="Personal Email" ur="ذاتی ای میل ایڈریس" htmlFor="fast-email" />
              <input
                id="fast-email"
                type="email"
                disabled={needEmailHelp}
                value={needEmailHelp ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={needEmailHelp ? "We will create an email for you" : "client@example.com"}
                className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#20b6a5] outline-none disabled:opacity-50"
              />

              <label className="flex items-start gap-2 pt-1 cursor-pointer text-xs text-[#aeb9bf]">
                <input
                  type="checkbox"
                  checked={needEmailHelp}
                  onChange={(e) => setNeedEmailHelp(e.target.checked)}
                  className="accent-[#20b6a5] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <span className="text-xs leading-relaxed">
                  <strong className="text-white">I don&apos;t have an email</strong> — we can help along with full guidance and create email if you don&apos;t already have one.
                  <span className="block font-urdu text-[11px] text-[#20b6a5] mt-0.5" dir="rtl">
                    میرا ای میل نہیں ہے، ہمارے لیے نیا ای میل بنائیں اور ترتیب دیں۔
                  </span>
                </span>
              </label>
            </GlassCard>

            {/* Residential Address */}
            <GlassCard variant="default" className="p-3.5 space-y-1.5">
              <BilingualLabel en="Current Residential Address" ur="موجودہ رہائشی پتہ" htmlFor="fast-address" />
              <input
                id="fast-address"
                type="text"
                value={residentialAddress}
                onChange={(e) => setResidentialAddress(e.target.value)}
                placeholder="House / Street / City"
                className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#20b6a5] outline-none"
              />
            </GlassCard>

            {/* Income Source Details */}
            <GlassCard variant="default" className="p-3.5 space-y-1.5">
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
                className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#20b6a5] outline-none"
              />
            </GlassCard>

            {/* Family Consolidation & WHT Audit Options */}
            <GlassCard variant="default" className="p-3.5 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={familyConsolidation}
                  onChange={(e) => setFamilyConsolidation(e.target.checked)}
                  className="accent-[#20b6a5] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div>
                  <div className="font-bold text-white">Family Group Filing &amp; Inter-Family Transfers</div>
                  <div className="text-[11px] text-[#aeb9bf] leading-snug">
                    Reconcile internal family bank transfers (Spouse, Parents, Siblings) so funds are never double-taxed.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs border-t border-white/[0.08] pt-2.5">
                <input
                  type="checkbox"
                  checked={whtAudit}
                  onChange={(e) => setWhtAudit(e.target.checked)}
                  className="accent-[#20b6a5] h-4 w-4 mt-0.5 shrink-0 rounded"
                />
                <div>
                  <div className="font-bold text-[#20b6a5]">
                    Full Source Withholding Tax Audit (Recommended)
                  </div>
                  <div className="text-[11px] text-[#aeb9bf] leading-snug">
                    Claim and audit all deductions taken at source: ATM cash withdrawals, fuel, utility bills, mobile SIM load and package fees, card fees.
                  </div>
                </div>
              </label>
            </GlassCard>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <GlassButton
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
                className="px-4"
              >
                Back
              </GlassButton>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(true);
                }}
                className={`flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white font-bold text-xs shadow-md active:scale-95 transition-all ${
                  submitting ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{submitting ? "Opening..." : `Submit on WhatsApp (${SITE_CONFIG.contact.whatsappDisplay})`}</span>
              </a>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="text-[11px] text-[#aeb9bf] hover:text-white underline transition-all font-mono"
              >
                Or save case without opening WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & FOLIO */}
        {step === 3 && (
          <div className="text-center py-4 space-y-3.5">
            <div className="w-14 h-14 rounded-full bg-[#20b6a5]/15 text-[#20b6a5] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(32,182,165,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] text-[#aeb9bf] uppercase tracking-wider">
                CASE FOLIO ISSUED
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                {refId || "TAX-2026-RECORD"}
              </div>
              <div className="text-xs text-[#aeb9bf]">
                TY2026 • {persona.toUpperCase()} • NON-BUSINESS INDIVIDUAL
              </div>
            </div>

            <GlassCard variant="glow" className="p-3.5 text-xs text-left space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#20b6a5]" />
                <span>Zero-Credential Invariant Preserved</span>
              </div>
              <p className="text-[11px] text-[#aeb9bf] leading-relaxed">
                Your filing case has been queued with our senior desk. You will be assisted directly on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay}) with your official IRIS filing checklist.
              </p>
            </GlassCard>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={formatWhatsAppUrl(`Hi, following up on Tax Filing Case ${refId}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Open WhatsApp Chat ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>

              <GlassButton
                type="button"
                variant="ghost"
                onClick={onClose}
                className="w-full"
              >
                Close / مکمل ہوا
              </GlassButton>
            </div>
          </div>
        )}
      </div>
    </AppClipSheet>
  );
}
