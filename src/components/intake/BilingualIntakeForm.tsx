"use client";

import React, { useState } from "react";
import { BilingualLabel } from "@/components/ui/bilingual-label";
import { formatWhatsAppUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ShieldCheck, Phone, ArrowRight, CheckCircle2, Lock, FileText, AlertCircle } from "lucide-react";

const PERSONAS = [
  { id: "salaried", en: "Salaried Individual", ur: "تنخواہ دار ملازم", descEn: "Salary slips, tax certificates", descUr: "تنخواہ کی سلپ اور ود ہولڈنگ سرٹیفکیٹ" },
  { id: "pensioner", en: "Senior / Pensioner", ur: "پنشنر و بزرگ شہری", descEn: "Pension book, exempt income", descUr: "پنشن کی تفصیلات اور چھوٹ" },
  { id: "no_income", en: "Housewife / No Income", ur: "گھریلو خواتین و بغیر آمدنی", descEn: "Zero-tax active filer status", descUr: "ایکٹو فائلر بننے کے لیے" },
  { id: "student", en: "Student Filer", ur: "طالب علم فائلر", descEn: "Fee concession, bank account", descUr: "تعلیمی رعایت اور بینک اکاؤنٹ" },
  { id: "govt", en: "Government Employee", ur: "سرکاری ملازم", descEn: "Govt salary, AGPR slips", descUr: "سرکاری تنخواہ اور اے جی پی آر" },
  { id: "other", en: "Other Individual", ur: "دیگر انفرادی ٹیکس گزار", descEn: "Rental, profit on debt, etc.", descUr: "کرایہ، بینک منافع وغیرہ" },
];

const IRIS_STATUSES = [
  { id: "active", en: "I have active IRIS credentials", ur: "میرے پاس فعال آئرس پاس ورڈ ہے", hintEn: "You will sign in yourself during filing", hintUr: "آپ فائلنگ کے وقت خود لاگ ان کریں گے" },
  { id: "forgot_password", en: "Forgot IRIS Password / Pin", ur: "میں پاس ورڈ یا پن بھول گیا ہوں", hintEn: "We guide you through official FBR reset", hintUr: "ہم آفیشل ایف بی آر ری سیٹ میں رہنمائی کریں گے" },
  { id: "unregistered", en: "Not registered on IRIS / No NTN", ur: "ابھی تک آئرس پر رجسٹرڈ نہیں ہوں", hintEn: "We assist with official e-enrollment", hintUr: "ہم آفیشل رجسٹریشن میں مدد کریں گے" },
];

const SERVICE_TIERS = [
  {
    id: "guided_1000",
    en: "Guided Self-Filing",
    ur: "رہنمائی مع سیلف فائلنگ",
    fee: "PKR 1,000",
    descEn: "We reconcile documents & give you step-by-step figures; you submit on IRIS.",
    descUr: "ہم دستاویزات کا جائزہ لے کر مکمل اعداد و شمار تیار کریں گے اور آپ خود سبمٹ کریں گے۔",
    badge: "Most Popular / مقبول ترین",
  },
  {
    id: "assistance_2500",
    en: "Complete Filing Assistance",
    ur: "مکمل فائلنگ اسسٹنس",
    fee: "PKR 2,500",
    descEn: "Full return & wealth statement preparation, screen assistance, reconciliation.",
    descUr: "انکم ٹیکس ریٹرن، ویلتھ اسٹیٹمنٹ کی مکمل تیاری اور اسکرین پر مکمل رہنمائی۔",
    badge: "Recommended / تجویز کردہ",
  },
  {
    id: "complex_5000",
    en: "Complex Review & Filing",
    ur: "پیچیدہ کیس و تفصیلی ریویو",
    fee: "PKR 4,500+",
    descEn: "Multiple bank accounts, prior year reconciliations, foreign assets/remittances.",
    descUr: "متعدد بینک اکاؤنٹس، پرانے سالوں کا حساب یا بیرون ملک سے ترسیلات۔",
    badge: "Comprehensive",
  },
];

const CONTACT_PREFERENCES = [
  {
    id: "whatsapp",
    en: "Instant WhatsApp Dispatch",
    ur: "واٹس ایپ پر فوری رابطہ",
    descEn: "Generates case reference and opens direct WhatsApp chat with our tax specialist.",
    descUr: "کیس ریفرنس بن کر براہِ راست واٹس ایپ پر ٹیکس ماہر سے بات چیت شروع ہوگی۔",
    icon: WhatsAppIcon,
  },
  {
    id: "phone_call",
    en: "Phone / Web Consultation",
    ur: "بذریعہ فون و ای میل رابطہ",
    descEn: "Save your case and our certified tax operator will call you back today.",
    descUr: "آپ کا کیس محفوظ ہوگا اور ٹیکس سپیشلسٹ جلد آپ سے فون پر رابطہ کرے گا۔",
    icon: Phone,
  },
];

export function BilingualIntakeForm({
  defaultPersona = "salaried",
  onSuccess,
}: {
  defaultPersona?: string;
  onSuccess?: (ref: string) => void;
}) {
  const [persona, setPersona] = useState(defaultPersona);
  const [irisStatus, setIrisStatus] = useState("active");
  const [serviceTier, setServiceTier] = useState("assistance_2500");
  const [contactPreference, setContactPreference] = useState("whatsapp");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [credentialsNotes, setCredentialsNotes] = useState("");
  const [documentsSummary, setDocumentsSummary] = useState("");
  const [consented, setConsented] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedRef, setCompletedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError("Please fill in your Full Name and Mobile/WhatsApp number.");
      return;
    }
    if (!consented) {
      setError("Please check the authorization box to proceed.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          cnic,
          email,
          persona,
          irisStatus,
          serviceTier,
          contactPreference,
          credentialsNotes,
          documentsSummary,
          source: "bilingual_web_intake",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const ref = data.reference;
        setCompletedRef(ref);
        if (onSuccess) onSuccess(ref);

        if (contactPreference === "whatsapp") {
          const selectedPersonaObj = PERSONAS.find((p) => p.id === persona);
          const selectedTierObj = SERVICE_TIERS.find((t) => t.id === serviceTier);

          const waMsg = `*Tax Year 2026 Filing Case Intake*\n\n` +
            `*Case Ref:* ${ref}\n` +
            `*Name:* ${fullName}\n` +
            `*Phone:* ${phone}\n` +
            `${cnic ? `*CNIC:* ${cnic}\n` : ""}` +
            `${email ? `*Email:* ${email}\n` : ""}` +
            `*Category:* ${selectedPersonaObj?.en} (${selectedPersonaObj?.ur})\n` +
            `*IRIS Status:* ${irisStatus}\n` +
            `*Selected Service:* ${selectedTierObj?.en} - ${selectedTierObj?.fee}\n` +
            `${documentsSummary ? `*Documents Mentioned:* ${documentsSummary}\n` : ""}` +
            `${credentialsNotes ? `*User Notes:* ${credentialsNotes}\n` : ""}\n` +
            `I have submitted my tax filing inquiry on tax.yasmeensons.com and would like to proceed.`;

          const waUrl = formatWhatsAppUrl(waMsg, "03120947187");
          window.open(waUrl, "_blank");
        }
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection or connect on WhatsApp directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (completedRef) {
    return (
      <div className="glass-card p-6 md:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-theme-success/10 text-theme-success rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-theme-text">Case Intake Received!</h3>
          <p className="text-sm font-semibold text-theme-success font-urdu" dir="rtl">
            آپ کا کیس کامیابی کے ساتھ درج کر لیا گیا ہے!
          </p>
        </div>
        <div className="bg-theme-surface/70 border border-theme-border rounded-xl p-4 max-w-sm mx-auto">
          <div className="text-[11px] font-bold text-theme-text-muted uppercase tracking-wider">
            Case Reference Number / کیس نمبر
          </div>
          <div className="text-2xl font-mono font-extrabold text-theme-primary mt-1">
            {completedRef}
          </div>
        </div>
        <p className="text-xs text-theme-text-secondary max-w-md mx-auto leading-relaxed">
          Your information has been logged securely in our tax desk. Our filer operator will review your profile and assist you screen-by-screen. Your FBR password stays under your full control.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={formatWhatsAppUrl(`Hi, I am following up on Case Ref: ${completedRef}`, "03120947187")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#1ebd59] transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" /> Connect on WhatsApp (03120947187)
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trust Guarantee Header */}
      <div className="rounded-2xl p-4 bg-theme-primary/10 border border-theme-primary/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-theme-primary shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-theme-text flex items-center justify-between">
            <span>Zero-Credential Security Policy</span>
            <span className="font-urdu text-[13px] text-theme-primary" dir="rtl">
              پاس ورڈ کی رازداری کا وعدہ
            </span>
          </div>
          <p className="text-theme-text-secondary leading-relaxed">
            We never ask you to hand over your FBR IRIS password. You sign in directly on official FBR portal while we prepare and reconcile your return figures.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl p-3 bg-theme-danger/10 border border-theme-danger/20 text-theme-danger text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Persona */}
      <div className="space-y-3">
        <BilingualLabel
          en="1. Select Your Income Category"
          ur="اپنی آمدنی کی قسم منتخب کریں"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PERSONAS.map((p) => {
            const isSelected = persona === p.id;
            return (
              <label
                key={p.id}
                className={`relative flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-theme-primary/10 border-theme-primary shadow-sm ring-1 ring-theme-primary"
                    : "bg-theme-surface/50 border-theme-border/70 hover:border-theme-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-theme-text">{p.en}</span>
                  <input
                    type="radio"
                    name="persona"
                    value={p.id}
                    checked={isSelected}
                    onChange={() => setPersona(p.id)}
                    className="accent-theme-primary h-4 w-4"
                  />
                </div>
                <div className="text-[13px] font-semibold text-theme-primary font-urdu mt-0.5" dir="rtl">
                  {p.ur}
                </div>
                <div className="text-[11px] text-theme-text-muted mt-1">
                  {p.descEn} • <span className="font-urdu">{p.descUr}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 2: IRIS Status */}
      <div className="space-y-3">
        <BilingualLabel
          en="2. FBR IRIS Account Status"
          ur="ایف بی آر آئرس اکاؤنٹ کی صورتحال"
        />
        <div className="space-y-2">
          {IRIS_STATUSES.map((status) => {
            const isSelected = irisStatus === status.id;
            return (
              <label
                key={status.id}
                className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-theme-primary/10 border-theme-primary shadow-sm ring-1 ring-theme-primary"
                    : "bg-theme-surface/50 border-theme-border/70 hover:border-theme-primary/40"
                }`}
              >
                <div className="space-y-0.5 pr-3">
                  <div className="text-xs font-bold text-theme-text">{status.en}</div>
                  <div className="text-[12px] font-semibold text-theme-primary font-urdu" dir="rtl">
                    {status.ur}
                  </div>
                  <div className="text-[10px] text-theme-text-muted">{status.hintEn} • <span className="font-urdu">{status.hintUr}</span></div>
                </div>
                <input
                  type="radio"
                  name="irisStatus"
                  value={status.id}
                  checked={isSelected}
                  onChange={() => setIrisStatus(status.id)}
                  className="accent-theme-primary h-4 w-4 mt-1"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 3: Service Tier Radio Buttons */}
      <div className="space-y-3">
        <BilingualLabel
          en="3. Choose Your Filing Service"
          ur="سروس کا انتخاب کریں"
        />
        <div className="space-y-2.5">
          {SERVICE_TIERS.map((tier) => {
            const isSelected = serviceTier === tier.id;
            return (
              <label
                key={tier.id}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-theme-primary/10 border-theme-primary shadow-md ring-2 ring-theme-primary/30"
                    : "bg-theme-surface/50 border-theme-border/70 hover:border-theme-primary/40"
                }`}
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-theme-text">{tier.en}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-primary text-white">
                      {tier.fee}
                    </span>
                  </div>
                  <div className="text-[13px] font-bold text-theme-primary font-urdu" dir="rtl">
                    {tier.ur}
                  </div>
                  <p className="text-xs text-theme-text-secondary leading-relaxed">{tier.descEn}</p>
                  <p className="text-[11px] text-theme-text-muted font-urdu leading-relaxed" dir="rtl">
                    {tier.descUr}
                  </p>
                </div>
                <input
                  type="radio"
                  name="serviceTier"
                  value={tier.id}
                  checked={isSelected}
                  onChange={() => setServiceTier(tier.id)}
                  className="accent-theme-primary h-5 w-5 mt-1"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 4: Contact & Identity */}
      <div className="space-y-4 pt-2 border-t border-theme-border/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <BilingualLabel en="Full Name" ur="پورا نام" htmlFor="intake-name" required />
            <input
              id="intake-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Muhammad Ateeb"
              className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
            />
          </div>

          <div>
            <BilingualLabel en="WhatsApp / Mobile" ur="واٹس ایپ / موبائل نمبر" htmlFor="intake-phone" required />
            <input
              id="intake-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0312 0000000"
              className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
            />
          </div>

          <div>
            <BilingualLabel en="CNIC (13 Digits)" ur="قومی شناختی کارڈ نمبر" htmlFor="intake-cnic" />
            <input
              id="intake-cnic"
              type="text"
              maxLength={15}
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="XXXXX-XXXXXXX-X"
              className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
            />
          </div>

          <div>
            <BilingualLabel en="Email Address" ur="ای میل ایڈریس" htmlFor="intake-email" />
            <input
              id="intake-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
            />
          </div>
        </div>

        <div>
          <BilingualLabel
            en="Available Documents Summary (Optional)"
            ur="موجود دستاویزات کی تفصیل"
            htmlFor="intake-docs"
          />
          <textarea
            id="intake-docs"
            rows={2}
            value={documentsSummary}
            onChange={(e) => setDocumentsSummary(e.target.value)}
            placeholder="e.g. 12 months salary slip, electricity bill WHT certificate, bank statement..."
            className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
          />
        </div>

        <div>
          <BilingualLabel
            en="Additional Instructions & Notes (Optional)"
            ur="اضافی ہدایات یا تفصیلات"
            htmlFor="intake-notes"
          />
          <textarea
            id="intake-notes"
            rows={2}
            value={credentialsNotes}
            onChange={(e) => setCredentialsNotes(e.target.value)}
            placeholder="Note: IRIS password is NOT required. Any details provided here are safely stored with your case."
            className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary transition-all placeholder:text-theme-text-muted"
          />
        </div>
      </div>

      {/* Section 5: Contact Preference (Radio buttons) */}
      <div className="space-y-3 pt-2 border-t border-theme-border/40">
        <BilingualLabel
          en="4. Select Contact & Handoff Preference"
          ur="رابطہ کا ترجیحی طریقہ منتخب کریں"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACT_PREFERENCES.map((pref) => {
            const isSelected = contactPreference === pref.id;
            const Icon = pref.icon;
            return (
              <label
                key={pref.id}
                className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-theme-primary/10 border-theme-primary shadow-sm ring-1 ring-theme-primary"
                    : "bg-theme-surface/50 border-theme-border/70 hover:border-theme-primary/40"
                }`}
              >
                <div className="flex items-start gap-2.5 pr-2">
                  <Icon className="w-5 h-5 text-theme-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-theme-text">{pref.en}</div>
                    <div className="text-[12px] font-semibold text-theme-primary font-urdu" dir="rtl">
                      {pref.ur}
                    </div>
                    <p className="text-[11px] text-theme-text-secondary leading-tight">{pref.descEn}</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="contactPreference"
                  value={pref.id}
                  checked={isSelected}
                  onChange={() => setContactPreference(pref.id)}
                  className="accent-theme-primary h-4 w-4 mt-1"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Authorization Consent */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-theme-surface/40 border border-theme-border">
          <input
            type="checkbox"
            required
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="accent-theme-primary h-4 w-4 mt-0.5 shrink-0"
          />
          <span className="text-xs text-theme-text leading-relaxed">
            I authorize Yasmeen & Sons tax specialists to review my provided documents for Tax Year 2026 return preparation. Final figures will be reviewed and approved by me prior to submission.
            <span className="block font-urdu text-[11px] text-theme-text-secondary mt-1" dir="rtl">
              میں تصدیق کرتا/کرتی ہوں کہ میری فراہم کردہ تفصیلات کا جائزہ لے کر ٹیکس ریٹرن تیار کی جائے اور فائلنگ سے قبل حتمی تصدیق مجھ سے کروائی جائے گی۔
            </span>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full btn-shimmer bg-theme-primary hover:bg-theme-primary-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-theme-primary/20 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-60"
      >
        {submitting ? (
          <span>Recording Case / کیس درج کیا جا رہا ہے...</span>
        ) : (
          <>
            <span>Submit Intake Case / فائلنگ کا آغاز کریں</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
