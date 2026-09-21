"use client";

import React, { useState, useMemo } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl, formatCnicInput, formatPhoneInput } from "@/lib/utils";
import { CaseFolioCard } from "@/components/tax/CaseFolioCard";
import { postIntake } from "@/lib/intake";
import { SITE_CONFIG } from "@/lib/config";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Info,
  Check,
} from "lucide-react";

interface FbrSimplifiedClipWizardProps {
  onClose: () => void;
  payload?: { defaultPersona?: string; defaultTier?: string };
}

export default function FbrSimplifiedClipWizard({
  onClose,
  payload,
}: FbrSimplifiedClipWizardProps) {
  // Navigation
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Clip 0: Identity & Source Flags
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [isResident, setIsResident] = useState(true);

  const [flags, setFlags] = useState({
    salary: true,
    property: false,
    other: true,
    cg: false,
    deductions: false,
    business: false,
  });

  // Clip 1: Salary & Pension (s.12 / s.149)
  const [salary, setSalary] = useState({
    employerName: "",
    employerNtn: "",
    grossSalary: "",
    exemptAllowances: "",
    perquisites: "",
    taxDeductedEmployer: "",
    pension: "",
  });

  // Clip 2: Property / Rent (s.15)
  const [property, setProperty] = useState({
    address: "",
    grossRent: "",
    repairAllowanceAuto: true, // 1/5 statutory
    propertyTax: "",
    insurance: "",
    excludeFrom7E: true,
  });

  // Clip 3: Other Sources (s.39)
  const [otherSources, setOtherSources] = useState({
    profitOnDebt: "", // 5003
    dividend: "", // 5002
    prizeBonds: "", // 5028
    miscReceipts: "",
  });

  // Clip 4: Capital Gains (s.37)
  const [capitalGains, setCapitalGains] = useState({
    assetType: "securities", // securities | immovable_property | other
    holdingMonths: "12",
    saleProceeds: "",
    costAcquisition: "",
  });

  // Clip 5: Deductible Allowances & Credits (s.60-63)
  const [deductions, setDeductions] = useState({
    zakat: "", // s.60
    donations: "", // s.61
    pensionFund: "", // s.63
  });

  // Clip 6: Tax Already Paid (WHT Schedule)
  const [taxPaid, setTaxPaid] = useState({
    simWht: "", // s.236
    electricityWht: "", // s.235
    bankCashWht: "", // s.231A
    bankProfitWht: "", // s.151
    vehicleWht: "", // s.231B/234
    propertyWht: "", // s.236K/236C
    advanceTax147: "", // s.147
  });

  // Clip 7: Wealth Statement (s.116) + Recon
  const [wealth, setWealth] = useState({
    immovableProperty: "",
    vehicles: "",
    bankBalance: "",
    cashInHand: "",
    investmentsGold: "",
    liabilities: "",
    openingNetAssets: "",
    personalExpenses: "",
    giftsReceived: "",
    foreignRemittances: "",
    giftsGiven: "",
  });

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [caseReference, setCaseReference] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Dynamic Clip Graph based on selections
  const activeGraph = useMemo(() => {
    const list: { id: string; labelEn: string; labelUr: string; num: string }[] = [
      { id: "clip0", labelEn: "ID", labelUr: "شناخت", num: "0" },
    ];
    if (flags.salary) {
      list.push({ id: "clip1", labelEn: "Salary", labelUr: "تنخواہ", num: "1" });
    }
    if (flags.property) {
      list.push({ id: "clip2", labelEn: "Rent", labelUr: "کرایہ", num: "2" });
    }
    if (flags.other) {
      list.push({ id: "clip3", labelEn: "Other", labelUr: "دیگر", num: "3" });
    }
    if (flags.cg) {
      list.push({ id: "clip4", labelEn: "Gains", labelUr: "گین", num: "4" });
    }
    if (flags.deductions) {
      list.push({ id: "clip5", labelEn: "Credits", labelUr: "کٹوتی", num: "5" });
    }
    list.push({ id: "clip6", labelEn: "WHT", labelUr: "کٹوتی", num: "6" });
    list.push({ id: "clip7", labelEn: "s.116", labelUr: "دولت", num: "7" });
    list.push({ id: "review", labelEn: "Review", labelUr: "جائزہ", num: "✓" });
    return list;
  }, [flags]);

  const currentStep = activeGraph[activeStepIndex] || activeGraph[0];

  // Calculations
  const parseNum = (val: string) => parseFloat(val.replace(/,/g, "")) || 0;

  // Income calculations
  const totalSalaryIncome = useMemo(() => {
    const gross = parseNum(salary.grossSalary);
    const exempt = parseNum(salary.exemptAllowances);
    const perq = parseNum(salary.perquisites);
    const pension = parseNum(salary.pension);
    return Math.max(0, gross - exempt) + perq + pension;
  }, [salary]);

  const totalPropertyIncome = useMemo(() => {
    const gross = parseNum(property.grossRent);
    const repair = property.repairAllowanceAuto ? gross * 0.2 : 0;
    const tax = parseNum(property.propertyTax);
    const ins = parseNum(property.insurance);
    return Math.max(0, gross - repair - tax - ins);
  }, [property]);

  const totalOtherIncome = useMemo(() => {
    return (
      parseNum(otherSources.profitOnDebt) +
      parseNum(otherSources.dividend) +
      parseNum(otherSources.prizeBonds) +
      parseNum(otherSources.miscReceipts)
    );
  }, [otherSources]);

  const totalCapitalGains = useMemo(() => {
    const sale = parseNum(capitalGains.saleProceeds);
    const cost = parseNum(capitalGains.costAcquisition);
    return Math.max(0, sale - cost);
  }, [capitalGains]);

  const totalTaxableIncome = useMemo(() => {
    return totalSalaryIncome + totalPropertyIncome + totalOtherIncome + totalCapitalGains;
  }, [totalSalaryIncome, totalPropertyIncome, totalOtherIncome, totalCapitalGains]);

  // Tax Paid Calculation
  const totalTaxPaid = useMemo(() => {
    return (
      parseNum(salary.taxDeductedEmployer) +
      parseNum(taxPaid.simWht) +
      parseNum(taxPaid.electricityWht) +
      parseNum(taxPaid.bankCashWht) +
      parseNum(taxPaid.bankProfitWht) +
      parseNum(taxPaid.vehicleWht) +
      parseNum(taxPaid.propertyWht) +
      parseNum(taxPaid.advanceTax147)
    );
  }, [salary.taxDeductedEmployer, taxPaid]);

  // Wealth Statement (s.116) Calculations
  const closingNetAssets = useMemo(() => {
    const assets =
      parseNum(wealth.immovableProperty) +
      parseNum(wealth.vehicles) +
      parseNum(wealth.bankBalance) +
      parseNum(wealth.cashInHand) +
      parseNum(wealth.investmentsGold);
    const liab = parseNum(wealth.liabilities);
    return assets - liab;
  }, [wealth]);

  const netAssetsChange = useMemo(() => {
    const opening = parseNum(wealth.openingNetAssets);
    return closingNetAssets - opening;
  }, [closingNetAssets, wealth.openingNetAssets]);

  const totalInflows = useMemo(() => {
    const gifts = parseNum(wealth.giftsReceived);
    const remittances = parseNum(wealth.foreignRemittances);
    return totalTaxableIncome + gifts + remittances;
  }, [totalTaxableIncome, wealth.giftsReceived, wealth.foreignRemittances]);

  const totalOutflows = useMemo(() => {
    const exp = parseNum(wealth.personalExpenses);
    const giftsGiven = parseNum(wealth.giftsGiven);
    return exp + giftsGiven;
  }, [wealth.personalExpenses, wealth.giftsGiven]);

  // Reconciliation: Net Assets Change vs (Inflows - Outflows)
  // Formula: Net Assets Change = Inflows - Outflows  => Unreconciled = Net Assets Change - (Inflows - Outflows)
  const unreconciledGap = useMemo(() => {
    const netSurplus = totalInflows - totalOutflows;
    return Math.round(netAssetsChange - netSurplus);
  }, [netAssetsChange, totalInflows, totalOutflows]);

  // Helper to auto-balance personal expenses to reconcile to exactly 0.00
  const handleAutoReconcileExpenses = () => {
    // We want: netAssetsChange = totalInflows - (personalExpenses + giftsGiven)
    // => personalExpenses = totalInflows - giftsGiven - netAssetsChange
    const targetExpenses = totalInflows - parseNum(wealth.giftsGiven) - netAssetsChange;
    setWealth((prev) => ({
      ...prev,
      personalExpenses: Math.max(0, targetExpenses).toString(),
    }));
  };

  // Step Validation & Navigation
  const handleNext = () => {
    setError(null);
    if (currentStep.id === "clip0") {
      if (!fullName.trim()) {
        setError("Please enter your full name as per CNIC / شناختی کارڈ کے مطابق پورا نام درج کریں");
        return;
      }
      if (!phone.trim() || phone.replace(/\D/g, "").length < 11) {
        setError("Please enter a valid 11-digit mobile number / درست موبائل نمبر درج کریں");
        return;
      }
    }
    if (activeStepIndex < activeGraph.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setError(null);
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  // Final Submit
  const handleFinalSubmit = async (viaWhatsApp: boolean = false) => {
    setSubmitting(true);
    setError(null);

    const fbrPayload = {
      tax_year: 2026,
      residence: isResident ? "resident" : "non-resident",
      flags,
      fbr_heads: {
        salary: {
          employer: salary.employerName,
          employer_ntn: salary.employerNtn,
          code_1000_gross: parseNum(salary.grossSalary),
          code_exempt: parseNum(salary.exemptAllowances),
          code_perquisites: parseNum(salary.perquisites),
          wht_149: parseNum(salary.taxDeductedEmployer),
          pension: parseNum(salary.pension),
          net_taxable_salary: totalSalaryIncome,
        },
        property: {
          address: property.address,
          code_2001_gross_rent: parseNum(property.grossRent),
          code_2031_repair_allowance: property.repairAllowanceAuto ? parseNum(property.grossRent) * 0.2 : 0,
          code_2033_tax: parseNum(property.propertyTax),
          net_property_income: totalPropertyIncome,
        },
        other_sources: {
          code_5003_profit_on_debt: parseNum(otherSources.profitOnDebt),
          code_5002_dividend: parseNum(otherSources.dividend),
          code_5028_prize_bonds: parseNum(otherSources.prizeBonds),
        },
        capital_gains: {
          asset_type: capitalGains.assetType,
          sale_proceeds: parseNum(capitalGains.saleProceeds),
          cost_acb: parseNum(capitalGains.costAcquisition),
          net_gain: totalCapitalGains,
        },
        deductions: {
          code_60_zakat: parseNum(deductions.zakat),
          code_61_donations: parseNum(deductions.donations),
          code_63_pension: parseNum(deductions.pensionFund),
        },
        tax_paid_wht: {
          employer_149: parseNum(salary.taxDeductedEmployer),
          sim_236: parseNum(taxPaid.simWht),
          bills_235: parseNum(taxPaid.electricityWht),
          bank_cash_231a: parseNum(taxPaid.bankCashWht),
          bank_profit_151: parseNum(taxPaid.bankProfitWht),
          advance_tax_147: parseNum(taxPaid.advanceTax147),
          total_wht_claimed: totalTaxPaid,
        },
        wealth_116: {
          closing_net_assets: closingNetAssets,
          opening_net_assets: parseNum(wealth.openingNetAssets),
          net_assets_change: netAssetsChange,
          total_inflows: totalInflows,
          total_outflows: totalOutflows,
          unreconciled_difference: unreconciledGap,
        },
      },
    };

    try {
      const result = await postIntake({
        fullName: fullName.trim(),
        phone: phone.trim(),
        cnic: cnic.trim(),
        email: email.trim(),
        persona: flags.salary ? "salaried" : flags.property ? "landlord" : "individual",
        serviceTier: payload?.defaultTier || "assistance_2500",
        contactPreference: viaWhatsApp ? "whatsapp" : "web",
        clientNotes: `FBR SRO 1561(I)/2025 Simplified Return. Taxable: PKR ${totalTaxableIncome.toLocaleString()}, WHT: PKR ${totalTaxPaid.toLocaleString()}, Wealth gap: PKR ${unreconciledGap}`,
        documentsSummary: `FBR 8-Window Wizard: TY2026. Taxable Inc: PKR ${totalTaxableIncome.toLocaleString()}, WHT: PKR ${totalTaxPaid.toLocaleString()}, Wealth Balance Gap: PKR ${unreconciledGap}`,
        source: "fbr_simplified_clip_wizard",
        fbrPayload,
      });

      if (!result.ok) {
        setError(result.error);
        if (viaWhatsApp) window.open(result.fallbackWhatsAppUrl, "_blank");
        return;
      }

      const generatedRef = result.reference;
      setCaseReference(generatedRef);
      setSubmissionSuccess(true);

      if (viaWhatsApp) {
        const msg =
          `*Tax Year 2026 Simplified Return Case: ${generatedRef}*\n\n` +
          `*Name:* ${fullName}\n` +
          `*CNIC:* ${cnic || "Pending"}\n` +
          `*Phone:* ${phone}\n` +
          `*Declared Taxable Income:* PKR ${totalTaxableIncome.toLocaleString()}\n` +
          `*Source Tax (WHT) Claimed:* PKR ${totalTaxPaid.toLocaleString()}\n` +
          `*Wealth Reconciliation Gap:* PKR ${unreconciledGap} (0.00 Target)\n` +
          `*FBR Heads:* ${Object.entries(flags)
            .filter(([_, v]) => v)
            .map(([k]) => k.toUpperCase())
            .join(", ")}\n\n` +
          `I would like to verify and finalize my return on official IRIS.`;

        window.open(formatWhatsAppUrl(msg), "_blank");
      }
    } catch {
      setError("Network connection issue. Please connect directly via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppClipSheet
      onClose={onClose}
      title="FBR Simplified e-Return"
      subtitle={`SRO 1561(I)/2025 • Window ${currentStep.num} / ${activeGraph.length - 1}`}
    >
      <div className="space-y-3.5 pb-3 text-ink dark:text-white">
        {/* Graph Progress Indicator */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 pr-6">
          {activeGraph.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => idx <= activeStepIndex && setActiveStepIndex(idx)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-apple-blue text-white font-bold"
                    : isCompleted
                    ? "bg-white/[0.08] text-apple-blue hover:bg-white/[0.12]"
                    : "bg-white/[0.03] text-ash dark:text-white/60/50 pointer-events-none"
                }`}
              >
                <span>{step.num}</span>
                <span className="whitespace-nowrap">{step.labelEn}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 0: IDENTITY & SOURCE PICKER */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip0" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 0 • Identity
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  آپ کا ٹیکس سال — ایک منٹ میں
                </span>
              </div>
              <p className="text-[13px] text-ash">
                Tick every source you earned this year. This desk is for individuals.
              </p>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                  Full Name (as per CNIC) / پورا نام
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Usman"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3.5 py-2.5 text-xs placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                    Mobile SIM Number / فعال موبائل نمبر
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                    placeholder="0312 0000000"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                    CNIC (13 Digits) / شناختی کارڈ
                  </label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(formatCnicInput(e.target.value))}
                    placeholder="35202-0000000-0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Income Source Toggles */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ash dark:text-white/60">
                Income Sources (Tax Year 2026) / آمدنی کے ذرائع
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    key: "salary",
                    en: "Salary or Pension (s.12)",
                    ur: "تنخواہ یا پنشن",
                    code: "s.12 / 149",
                  },
                  {
                    key: "property",
                    en: "Rent from Property (s.15)",
                    ur: "جائیداد کا کرایہ",
                    code: "s.15 / 2031",
                  },
                  {
                    key: "other",
                    en: "Bank Profit / Dividends (s.39)",
                    ur: "بینک منافع و ڈیویڈنڈ",
                    code: "5003 / s.39",
                  },
                  {
                    key: "cg",
                    en: "Sold Shares or Property (s.37)",
                    ur: "شیئرز یا پراپرٹی بیچی",
                    code: "s.37",
                  },
                  {
                    key: "deductions",
                    en: "Zakat / Donations (Credits)",
                    ur: "زکوٰۃ یا خیراتی کٹوتی",
                    code: "s.60-63",
                  },
                ].map((item) => {
                  const isChecked = (flags as any)[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setFlags((prev) => ({ ...prev, [item.key]: !(prev as any)[item.key] }))
                      }
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                        isChecked
                          ? "border-apple-blue bg-apple-blue/15 text-ink dark:text-white font-bold"
                          : "border-rule/60 dark:border-white/[0.10] bg-paper-light/50 dark:bg-[#1c1c1e]/60 text-ash dark:text-white/60 hover:border-apple-blue/40"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{item.en}</span>
                        </div>
                        <div className="text-[11px] font-urdu text-apple-blue" dir="rtl">
                          {item.ur}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-apple-blue text-white border-apple-blue"
                            : "border-rule dark:border-palette-sky/30 bg-transparent"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Business Income Exit Flag */}
              <GlassCard
                variant={flags.business ? "glow" : "subtle"}
                className={`p-3 transition-all ${
                  flags.business ? "border-amber-500/60 bg-amber-500/10" : ""
                }`}
              >
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flags.business}
                    onChange={(e) => setFlags((prev) => ({ ...prev, business: e.target.checked }))}
                    className="accent-amber-500 h-4 w-4 mt-0.5 rounded shrink-0"
                  />
                  <div>
                    <div className="text-[13px] font-semibold text-ink">
                      Shop or company income? This desk is for individuals.
                    </div>
                    <div className="text-[13px] text-ash font-urdu" dir="rtl">
                      دکان یا کمپنی کی آمدنی؟ واٹس ایپ پر پوچھیں
                    </div>
                  </div>
                </label>

                {flags.business && (
                  <div className="mt-2 pt-2 border-t border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                    <p className="text-[13px] text-ink">
                      Individual Form 114(1) does not cover a shop or company. WhatsApp the desk.
                    </p>
                    <a
                      href={formatWhatsAppUrl("Hi, I have income that may need a different return for Tax Year 2026.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#128C7E] underline whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp the desk</span>
                    </a>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 1: SALARY AND PENSION (s.12 / s.149) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip1" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 1 • Salary &amp; Pension
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  آپ کی تنخواہ (سیکشن 12)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Keep your Employer Tax Certificate (Section 149 / Form 16) handy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                    Employer Name / ادارے کا نام
                  </label>
                  <input
                    type="text"
                    value={salary.employerName}
                    onChange={(e) => setSalary((p) => ({ ...p, employerName: e.target.value }))}
                    placeholder="e.g. Ministry / Corporate Ltd"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                    Employer NTN (Optional)
                  </label>
                  <input
                    type="text"
                    value={salary.employerNtn}
                    onChange={(e) => setSalary((p) => ({ ...p, employerNtn: e.target.value }))}
                    placeholder="7-digit NTN"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Gross Annual Salary (PKR) • Code 1000
                </label>
                <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                  مجموعی سالانہ تنخواہ (بیسک، بونس اور تمام الاؤنسز)
                </span>
                <input
                  type="number"
                  value={salary.grossSalary}
                  onChange={(e) => setSalary((p) => ({ ...p, grossSalary: e.target.value }))}
                  placeholder="e.g. 1800000"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Exempt Allowances (PKR)
                  </label>
                  <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                    مستثنیٰ الاؤنسز (مثلاً میڈیکل)
                  </span>
                  <input
                    type="number"
                    value={salary.exemptAllowances}
                    onChange={(e) => setSalary((p) => ({ ...p, exemptAllowances: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Tax Deducted by Employer (s.149)
                  </label>
                  <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                    آجر کا کاٹا ہوا انکم ٹیکس
                  </span>
                  <input
                    type="number"
                    value={salary.taxDeductedEmployer}
                    onChange={(e) => setSalary((p) => ({ ...p, taxDeductedEmployer: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Annual Pension Received (if any) / پنشن
                </label>
                <input
                  type="number"
                  value={salary.pension}
                  onChange={(e) => setSalary((p) => ({ ...p, pension: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-ash dark:text-white/60">Calculated Net Salary Income:</span>
                <span className="font-mono font-bold text-apple-blue">
                  PKR {totalSalaryIncome.toLocaleString()}
                </span>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 2: PROPERTY / RENT (s.15) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip2" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 2 • Property Rent
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  جائیداد سے کرایہ (سیکشن 15)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Annual rent received. Statutory 20% repair allowance is automatically calculated per SRO.
              </p>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                  Property Address / جائیداد کا پتہ
                </label>
                <input
                  type="text"
                  value={property.address}
                  onChange={(e) => setProperty((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Plot/Flat number, Sector, City"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Gross Rent Received (Annual) • Code 2001
                </label>
                <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                  سال بھر کا مجموعی کرایہ
                </span>
                <input
                  type="number"
                  value={property.grossRent}
                  onChange={(e) => setProperty((p) => ({ ...p, grossRent: e.target.value }))}
                  placeholder="e.g. 600000"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Property Tax Paid • Code 2033
                  </label>
                  <input
                    type="number"
                    value={property.propertyTax}
                    onChange={(e) => setProperty((p) => ({ ...p, propertyTax: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Insurance Premium • Code 2032
                  </label>
                  <input
                    type="number"
                    value={property.insurance}
                    onChange={(e) => setProperty((p) => ({ ...p, insurance: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-ash dark:text-white/60">Statutory 1/5 Repair Allowance (20%):</span>
                <span className="font-mono font-bold text-ink dark:text-white">
                  PKR {(parseNum(property.grossRent) * 0.2).toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-ash dark:text-white/60">Net Taxable Rent Income:</span>
                <span className="font-mono font-bold text-apple-blue">
                  PKR {totalPropertyIncome.toLocaleString()}
                </span>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 3: OTHER SOURCES (s.39) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip3" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 3 • Other Sources
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  بینک منافع و ڈیویڈنڈ (سیکشن 39)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Check profit on debt from your annual bank profit certificate.
              </p>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Profit on Debt / Bank Profit (PKR) • Code 5003
                </label>
                <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                  بینک اکاؤنٹس یا قومی بچت سے حاصل شدہ سالانہ منافع
                </span>
                <input
                  type="number"
                  value={otherSources.profitOnDebt}
                  onChange={(e) => setOtherSources((p) => ({ ...p, profitOnDebt: e.target.value }))}
                  placeholder="e.g. 150000"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Dividends from Listed Shares (PKR) • Code 5002
                </label>
                <input
                  type="number"
                  value={otherSources.dividend}
                  onChange={(e) => setOtherSources((p) => ({ ...p, dividend: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Prize Bond Winnings • Code 5028
                  </label>
                  <input
                    type="number"
                    value={otherSources.prizeBonds}
                    onChange={(e) => setOtherSources((p) => ({ ...p, prizeBonds: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Misc Other Receipts
                  </label>
                  <input
                    type="number"
                    value={otherSources.miscReceipts}
                    onChange={(e) => setOtherSources((p) => ({ ...p, miscReceipts: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 4: CAPITAL GAINS (s.37) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip4" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 4 • Capital Gains
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  کیپٹل گین (سیکشن 37)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Gain or loss on disposal of securities, shares, or immovable properties.
              </p>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-1">
                  Asset Class / اثاثے کی قسم
                </label>
                <select
                  value={capitalGains.assetType}
                  onChange={(e) => setCapitalGains((p) => ({ ...p, assetType: e.target.value }))}
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2.5 text-xs text-ink dark:text-white focus:border-apple-blue outline-none"
                >
                  <option value="securities" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">
                    Securities / Listed Shares (s.37A)
                  </option>
                  <option value="immovable_property" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">
                    Immovable Property / Plot / Flat (s.37)
                  </option>
                  <option value="other" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">
                    Other Capital Assets
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Sale Consideration (PKR)
                  </label>
                  <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                    فروخت کی رقم
                  </span>
                  <input
                    type="number"
                    value={capitalGains.saleProceeds}
                    onChange={(e) => setCapitalGains((p) => ({ ...p, saleProceeds: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Acquisition Cost (ACB)
                  </label>
                  <span className="text-[11px] text-ash dark:text-white/60 block mb-1">
                    خریداری کی لاگت
                  </span>
                  <input
                    type="number"
                    value={capitalGains.costAcquisition}
                    onChange={(e) => setCapitalGains((p) => ({ ...p, costAcquisition: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-ash dark:text-white/60">Computed Capital Gain:</span>
                <span className="font-mono font-bold text-apple-blue">
                  PKR {totalCapitalGains.toLocaleString()}
                </span>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 5: DEDUCTIBLE ALLOWANCES & CREDITS (s.60-63) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip5" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 5 • Allowances &amp; Credits
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  چھوٹ اور ٹیکس کریڈٹ (سیکشن 60 تا 63)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Zakat Paid under Zakat &amp; Ushr Ordinance • Code 6001
                </label>
                <input
                  type="number"
                  value={deductions.zakat}
                  onChange={(e) => setDeductions((p) => ({ ...p, zakat: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Donations to Approved Charities (s.61)
                </label>
                <input
                  type="number"
                  value={deductions.donations}
                  onChange={(e) => setDeductions((p) => ({ ...p, donations: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                  Contribution to Approved Voluntary Pension Scheme (s.63)
                </label>
                <input
                  type="number"
                  value={deductions.pensionFund}
                  onChange={(e) => setDeductions((p) => ({ ...p, pensionFund: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 6: TAX ALREADY PAID (WHT SCHEDULE) */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip6" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 6 • Tax Already Paid
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  پہلے سے کٹا ہوا ٹیکس (مالومات تصدیق)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Claim all advance taxes deducted at source to reduce your final tax bill or claim refund.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Mobile SIM Withholding (s.236)
                  </label>
                  <span className="text-[10px] text-ash dark:text-white/60 block mb-1">
                    جاز، زونگ، یوفون، ٹیلی نار کٹوتی
                  </span>
                  <input
                    type="number"
                    value={taxPaid.simWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, simWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Electricity &amp; Gas Bills (s.235)
                  </label>
                  <span className="text-[10px] text-ash dark:text-white/60 block mb-1">
                    بجلی کے بلوں پر ودہولڈنگ ٹیکس
                  </span>
                  <input
                    type="number"
                    value={taxPaid.electricityWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, electricityWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Bank Cash Withdrawals (s.231A)
                  </label>
                  <input
                    type="number"
                    value={taxPaid.bankCashWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, bankCashWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    WHT on Bank Profit (s.151)
                  </label>
                  <input
                    type="number"
                    value={taxPaid.bankProfitWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, bankProfitWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Vehicle Token / Purchase (s.231B/234)
                  </label>
                  <input
                    type="number"
                    value={taxPaid.vehicleWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, vehicleWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-white mb-0.5">
                    Property Purchase/Sale (s.236K/C)
                  </label>
                  <input
                    type="number"
                    value={taxPaid.propertyWht}
                    onChange={(e) => setTaxPaid((p) => ({ ...p, propertyWht: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-ash dark:text-white/60">Total Advance Tax Claimed:</span>
                <span className="font-mono font-bold text-apple-blue text-sm">
                  PKR {totalTaxPaid.toLocaleString()}
                </span>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CLIP 7: WEALTH STATEMENT (s.116) & RECONCILIATION TO 0.00 */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "clip7" && (
          <div className="space-y-3.5">
            <GlassCard variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-apple-blue font-bold uppercase">
                  Window 7 • Wealth &amp; Reconciliation
                </span>
                <span className="font-urdu text-xs text-apple-blue" dir="rtl">
                  دولت کا گوشوارہ (سیکشن 116)
                </span>
              </div>
              <p className="text-xs text-ash dark:text-white/60">
                Declare assets and liabilities as of 30th June 2026. Real-time reconciliation balances the difference to 0.00.
              </p>

              {/* ASSETS SECTION */}
              <div className="space-y-2 pt-1 border-t border-white/[0.08]">
                <span className="font-bold text-xs text-ink dark:text-white block">
                  1. Assets as of 30 June 2026 (اثاثہ جات)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Immovable Property / مکان و پلاٹ
                    </label>
                    <input
                      type="number"
                      value={wealth.immovableProperty}
                      onChange={(e) => setWealth((p) => ({ ...p, immovableProperty: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Motor Vehicles / گاڑیاں
                    </label>
                    <input
                      type="number"
                      value={wealth.vehicles}
                      onChange={(e) => setWealth((p) => ({ ...p, vehicles: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Bank Balances (30 June) / بینک بیلنس
                    </label>
                    <input
                      type="number"
                      value={wealth.bankBalance}
                      onChange={(e) => setWealth((p) => ({ ...p, bankBalance: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Cash in Hand / کیش ان ہینڈ
                    </label>
                    <input
                      type="number"
                      value={wealth.cashInHand}
                      onChange={(e) => setWealth((p) => ({ ...p, cashInHand: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                    Gold &amp; Capital Investments / سونا و سرمایہ کاری
                  </label>
                  <input
                    type="number"
                    value={wealth.investmentsGold}
                    onChange={(e) => setWealth((p) => ({ ...p, investmentsGold: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                    Liabilities &amp; Outstanding Loans / واجب الادا قرضے
                  </label>
                  <input
                    type="number"
                    value={wealth.liabilities}
                    onChange={(e) => setWealth((p) => ({ ...p, liabilities: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                  />
                </div>
              </div>

              {/* RECONCILIATION SECTION */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="font-bold text-xs text-ink dark:text-white block">
                  2. Wealth Reconciliation (اثاثوں کا میل)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Opening Net Assets (Last Year)
                    </label>
                    <span className="text-[10px] text-ash dark:text-white/60 block mb-1">
                      گزشتہ سال کے خالص اثاثے
                    </span>
                    <input
                      type="number"
                      value={wealth.openingNetAssets}
                      onChange={(e) => setWealth((p) => ({ ...p, openingNetAssets: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Personal / Household Expenses
                    </label>
                    <span className="text-[10px] text-ash dark:text-white/60 block mb-1">
                      سالانہ ذاتی و گھریلو اخراجات
                    </span>
                    <input
                      type="number"
                      value={wealth.personalExpenses}
                      onChange={(e) => setWealth((p) => ({ ...p, personalExpenses: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Gifts / Inheritance Inflows
                    </label>
                    <input
                      type="number"
                      value={wealth.giftsReceived}
                      onChange={(e) => setWealth((p) => ({ ...p, giftsReceived: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash dark:text-white/60 mb-0.5">
                      Foreign Remittance Inflows (PRC)
                    </label>
                    <input
                      type="number"
                      value={wealth.foreignRemittances}
                      onChange={(e) => setWealth((p) => ({ ...p, foreignRemittances: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-black/[0.04] dark:bg-[#1c1c1e]/80 border border-black/[0.10] dark:border-white/[0.15] text-ink dark:text-white focus:ring-2 focus:ring-apple-blue rounded-xl px-3 py-2 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* REAL-TIME RECONCILIATION INDICATOR */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  unreconciledGap === 0
                    ? "bg-apple-blue text-apple-blue border-apple-blue/50 font-bold"
                    : "bg-amber-500/15 border-amber-500/40 text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {unreconciledGap === 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-apple-blue" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-400" />
                    )}
                    <div>
                      <span className="text-xs font-bold block">
                        {unreconciledGap === 0
                          ? "Wealth Statement Balanced (0.00 Difference)"
                          : `Unreconciled Difference: PKR ${unreconciledGap.toLocaleString()}`}
                      </span>
                      <span className="text-[11px] opacity-80">
                        {unreconciledGap === 0
                          ? "آپ کا دولت کا گوشوارہ مکمل طور پر متوازن ہے۔"
                          : "اثاثوں میں فرق موجود ہے، نیچے دیے گئے بٹن سے اخراجات خودکار متوازن کریں۔"}
                      </span>
                    </div>
                  </div>

                  {unreconciledGap !== 0 && (
                    <button
                      type="button"
                      onClick={handleAutoReconcileExpenses}
                      className="px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-[11px] shadow active:scale-95 transition-all shrink-0"
                    >
                      Auto-Balance to 0.00
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* REVIEW & SUBMIT */}
        {/* ------------------------------------------------------------------ */}
        {currentStep.id === "review" && (
          <div className="space-y-3.5">
            {submissionSuccess ? (
              <div className="text-center py-4 space-y-3.5">
                <CaseFolioCard reference={caseReference} name={fullName} meta="Form 114(1) · SRO 1561(I)/2025" />
                <p className="text-[13px] text-ash font-urdu" dir="rtl">
                  ڈاکٹ نمبر محفوظ کریں۔ آئرس پاس ورڈ آپ کے پاس رہتا ہے۔
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href={formatWhatsAppUrl(
                      `Hi, I submitted Form 114(1) docket ${caseReference} for ${fullName}. Ready to review and file on iris.fbr.gov.pk.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-11 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-semibold text-[15px] active:scale-95 whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    WhatsApp the desk
                  </a>

                  <GlassButton
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="w-full"
                  >
                    Done / بند کریں
                  </GlassButton>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <GlassCard variant="glow" className="p-4 space-y-3 border-apple-blue/50">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="font-serif text-sm font-bold text-ink dark:text-white">
                      Tax Year 2026 Summary
                    </span>
                    <span className="font-mono text-xs text-apple-blue font-bold">
                      SRO 1561(I)/2025
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ash dark:text-white/60">Taxpayer:</span>
                      <span className="font-bold text-ink dark:text-white">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash dark:text-white/60">CNIC:</span>
                      <span className="font-mono text-ink dark:text-white">{cnic || "Pending"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash dark:text-white/60">Total Declared Income:</span>
                      <span className="font-mono font-bold text-apple-blue">
                        PKR {totalTaxableIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash dark:text-white/60">Total Source Tax (WHT):</span>
                      <span className="font-mono font-bold text-apple-blue">
                        PKR {totalTaxPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ash dark:text-white/60">Wealth Balance Difference:</span>
                      <span
                        className={`font-mono font-bold ${
                          unreconciledGap === 0 ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        PKR {unreconciledGap.toLocaleString()} {unreconciledGap === 0 && "✓ (Balanced)"}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFinalSubmit(true);
                    }}
                    className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white font-bold text-xs shadow-md active:scale-95 transition-all whitespace-nowrap px-4 ${
                      submitting ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>
                      {submitting ? "Submitting..." : `Submit via WhatsApp (${SITE_CONFIG.contact.whatsappDisplay})`}
                    </span>
                  </a>

                  <GlassButton
                    type="button"
                    variant="secondary"
                    onClick={() => handleFinalSubmit(false)}
                    disabled={submitting}
                    className="w-full"
                  >
                    Save Return Online without WhatsApp
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Bar */}
        {!submissionSuccess && (
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/[0.08]">
            <GlassButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Previous
            </GlassButton>

            {currentStep.id !== "review" && (
              <GlassButton
                type="button"
                variant="primary"
                size="sm"
                onClick={handleNext}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Next Window
              </GlassButton>
            )}
          </div>
        )}
      </div>
    </AppClipSheet>
  );
}
