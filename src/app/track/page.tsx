"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl, formatCnicInput } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface CaseResult {
  reference: string;
  full_name: string;
  cnic?: string;
  persona: string;
  status: string;
  service_tier?: string;
  created_at?: string;
  documents_summary?: string;
}

export default function TrackCasePage() {
  const [ref, setRef] = useState("");
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseResult | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) {
      setError("Please enter your Case Reference Number (e.g. YS-26-12345)");
      return;
    }

    setLoading(true);
    setError(null);
    setCaseData(null);

    try {
      const query = new URLSearchParams({ ref: ref.trim() });
      if (cnic.trim()) query.append("cnic", cnic.trim());

      const res = await fetch(`/api/track?${query.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Case not found. Please verify your reference number.");
      } else {
        setCaseData(data);
      }
    } catch {
      setError("Network issue. Please connect directly with our WhatsApp desk.");
    } finally {
      setLoading(false);
    }
  };

  // Determine stage index (0 to 3) based on status string
  const getStageIndex = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("active") || s.includes("complete") || s.includes("submitted")) return 3;
    if (s.includes("recon") || s.includes("wealth") || s.includes("ready")) return 2;
    if (s.includes("audit") || s.includes("review") || s.includes("in_progress")) return 1;
    return 0;
  };

  const currentStage = caseData ? getStageIndex(caseData.status) : 0;

  const STAGES = [
    {
      num: "01",
      titleEn: "Intake Queued",
      titleUr: "کیس کا اندراج",
      desc: "Folio generated and assigned to senior tax desk.",
    },
    {
      num: "02",
      titleEn: "Document & WHT Audit",
      titleUr: "ٹیکس کٹوتی آڈٹ",
      desc: "Employer s.149, telecom SIM, and banking taxes audited.",
    },
    {
      num: "03",
      titleEn: "Wealth Recon (0.00)",
      titleUr: "دولت کا گوشوارہ",
      desc: "s.116 wealth balance reconciled without unexplained gaps.",
    },
    {
      num: "04",
      titleEn: "IRIS & ATL Active",
      titleUr: "آئرس سبمشن و فعال نام",
      desc: "Final return submitted; Active Taxpayer status confirmed.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="font-mono text-xs text-palette-coral font-bold uppercase tracking-widest bg-palette-coral/10 border border-palette-coral/30 px-3.5 py-1 rounded-full">
          CASE PROGRESS TRACKER · TY2026
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink dark:text-palette-frost tracking-tight">
          Track Your Tax Filing Case
        </h1>
        <p className="text-xs sm:text-sm text-ash max-w-lg mx-auto leading-relaxed">
          Enter your Reference Number (<code className="font-mono text-ink dark:text-palette-frost">YS-26-XXXXX</code>) and optional CNIC to view live verification, audit, and ATL filing status.
        </p>
      </div>

      {/* Lookup Form */}
      <GlassCard variant="default" className="p-5 sm:p-7 max-w-2xl mx-auto space-y-4 shadow-md">
        <form onSubmit={handleLookup} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-ink dark:text-palette-frost mb-1 font-mono">
                CASE REFERENCE NUMBER *
              </label>
              <input
                type="text"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. YS-26-72811"
                className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-white/30 focus:border-palette-coral outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink dark:text-palette-frost mb-1 font-mono">
                CNIC (13 DIGITS - OPTIONAL)
              </label>
              <input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(formatCnicInput(e.target.value))}
                placeholder="35202-0000000-0"
                className="w-full bg-[rgba(15,22,27,0.7)] border border-white/[0.14] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-white/30 focus:border-palette-coral outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <GlassButton
            type="submit"
            variant="primary"
            disabled={loading}
            icon={<Search className="w-4 h-4" />}
            className="w-full"
          >
            {loading ? "Verifying Status with Database..." : "Check Case Status"}
          </GlassButton>
        </form>

        <div className="pt-2 flex items-center justify-between text-[11px] text-ash border-t border-white/[0.08]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-palette-coral" />
            <span>FastAPI Cloud Microservice Authority</span>
          </span>
          <a
            href={formatWhatsAppUrl("Hi, I lost my Tax Filing Case Reference Number.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-palette-coral hover:underline"
          >
            Lost Reference?
          </a>
        </div>
      </GlassCard>

      {/* Case Result Card */}
      {caseData && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
          <GlassCard variant="glow" className="p-6 space-y-4 border-palette-coral/50">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div>
                <span className="font-mono text-[11px] text-palette-coral font-bold uppercase tracking-wider">
                  CASE FOLIO: {caseData.reference}
                </span>
                <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                  {caseData.full_name}
                </h2>
                <div className="text-xs text-ash mt-0.5">
                  Category: <span className="text-white font-mono uppercase">{caseData.persona}</span>
                  {caseData.cnic && ` · CNIC: ${caseData.cnic}`}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-palette-coral/20 text-palette-coral border border-palette-coral/40 uppercase">
                  {caseData.status || "In Progress"}
                </span>
                {caseData.created_at && (
                  <div className="text-[10px] text-ash font-mono mt-1">
                    Queued: {new Date(caseData.created_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {/* 4-Stage Visualizer */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[11px] text-ash uppercase tracking-wider block">
                FILING LIFECYCLE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {STAGES.map((stg, idx) => {
                  const isDone = idx <= currentStage;
                  const isCurrent = idx === currentStage;
                  return (
                    <div
                      key={stg.num}
                      className={`p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? "bg-[rgba(32,182,165,0.18)] border-palette-coral shadow-[0_0_12px_rgba(32,182,165,0.25)] text-white"
                          : isDone
                          ? "bg-white/[0.04] border-white/20 text-[#aeb9bf]"
                          : "bg-white/[0.02] border-white/[0.06] text-[#aeb9bf]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="font-bold">{stg.num}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-palette-coral" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 opacity-40" />
                        )}
                      </div>
                      <div className="font-bold text-xs leading-tight">{stg.titleEn}</div>
                      <div className="text-[10px] font-urdu opacity-80 leading-tight mt-0.5" dir="rtl">
                        {stg.titleUr}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Action Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-ash text-center sm:text-left">
                Need to submit supporting bank certificates or expedite filing?
              </div>
              <a
                href={formatWhatsAppUrl(
                  `Hi, following up on Tax Filing Case ${caseData.reference} (${caseData.full_name}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs flex items-center gap-1.5 shadow active:scale-95 transition-all shrink-0"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
