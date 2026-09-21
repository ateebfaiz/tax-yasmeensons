"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { CaseFolioCard } from "@/components/tax/CaseFolioCard";
import { formatWhatsAppUrl, formatCnicInput, FOLIO_EXAMPLE, normalizeFolio } from "@/lib/utils";
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface CaseDocument {
  name: string;
  category: string;
  url: string;
}

interface CaseResult {
  reference: string;
  fullName: string;
  persona: string;
  status: string;
  serviceTier?: string;
  createdAt?: string;
  stage?: number;
  stageLabel?: string;
  stageLabelUrdu?: string;
  notesSummary?: string;
  documents?: CaseDocument[];
}

const STAGES = [
  {
    num: "1",
    titleEn: "Received",
    titleUr: "موصول",
    desc: "Form 114(1) intake logged with the desk.",
  },
  {
    num: "2",
    titleEn: "WHT audit",
    titleUr: "کٹوتی آڈٹ",
    desc: "s.149, s.151, s.164, s.235, s.236 credits checked.",
  },
  {
    num: "3",
    titleEn: "Wealth s.116",
    titleUr: "دولت 116",
    desc: "Opening + inflows = outflows + closing, to 0.00.",
  },
  {
    num: "4",
    titleEn: "IRIS & ATL",
    titleUr: "آئرس و اے ٹی ایل",
    desc: "You file on iris.fbr.gov.pk. ATL updates weekly.",
  },
];

function stageIndex(data: CaseResult): number {
  if (typeof data.stage === "number") return Math.max(0, Math.min(3, data.stage - 1));
  const s = data.status?.toLowerCase() || "";
  if (s.includes("active") || s.includes("complete") || s.includes("submitted")) return 3;
  if (s.includes("recon") || s.includes("wealth") || s.includes("ready")) return 2;
  if (s.includes("audit") || s.includes("review") || s.includes("in_progress")) return 1;
  return 0;
}

export function TrackPanel({ compact = false }: { compact?: boolean }) {
  const [ref, setRef] = useState("");
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseResult | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) {
      setError(`Enter your docket number (e.g. ${FOLIO_EXAMPLE})`);
      return;
    }

    setLoading(true);
    setError(null);
    setCaseData(null);

    try {
      const query = new URLSearchParams({ ref: normalizeFolio(ref.trim()) });
      if (cnic.trim()) query.append("cnic", cnic.trim());
      const res = await fetch(`/api/track?${query.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Case not found. Check the docket number.");
      } else {
        setCaseData(data);
      }
    } catch {
      setError("Network issue. WhatsApp the desk with your docket number.");
    } finally {
      setLoading(false);
    }
  };

  const currentStage = caseData ? stageIndex(caseData) : 0;

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <GlassCard className="p-5 sm:p-6 space-y-4">
        <form onSubmit={handleLookup} className="space-y-3.5">
          <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-3`}>
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1">
                Docket number
              </label>
              <input
                type="text"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder={FOLIO_EXAMPLE}
                autoCapitalize="characters"
                className="w-full bg-black/[0.04] dark:bg-white/[0.08] border-[0.5px] border-black/[0.08] dark:border-white/[0.10] text-ink rounded-xl px-3.5 py-2.5 text-[15px] font-mono placeholder:text-ash/50 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 outline-none uppercase min-h-11"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1">
                CNIC (optional)
              </label>
              <input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(formatCnicInput(e.target.value))}
                placeholder="35202-0000000-0"
                className="w-full bg-black/[0.04] dark:bg-white/[0.08] border-[0.5px] border-black/[0.08] dark:border-white/[0.10] text-ink rounded-xl px-3.5 py-2.5 text-[15px] font-mono placeholder:text-ash/50 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 outline-none min-h-11"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-apple-red/10 rounded-2xl text-apple-red text-[13px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <GlassButton
            type="submit"
            variant="primary"
            disabled={loading}
            icon={<Search className="w-4 h-4" />}
            className="w-full min-h-11 whitespace-nowrap"
          >
            {loading ? "Looking up…" : "Check status"}
          </GlassButton>
        </form>

        <div className="pt-1 flex items-center justify-between text-[13px] text-ash">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-apple-blue" />
            Live from the filing desk
          </span>
          <a
            href={formatWhatsAppUrl("Hi, I lost my Form 114(1) docket number for Tax Year 2026.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-apple-blue whitespace-nowrap"
          >
            Lost number?
          </a>
        </div>
      </GlassCard>

      {caseData && (
        <div className="space-y-4">
          <CaseFolioCard
            reference={caseData.reference}
            name={caseData.fullName}
            meta={`${caseData.persona} · ${caseData.stageLabel || caseData.status}`}
          />

          <div className={`grid grid-cols-1 ${compact ? "gap-2" : "sm:grid-cols-4 gap-2"}`}>
            {STAGES.map((stg, idx) => {
              const isDone = idx <= currentStage;
              const isCurrent = idx === currentStage;
              return (
                <div
                  key={stg.num}
                  className={`p-3 rounded-2xl ${
                    isCurrent
                      ? "bg-apple-blue/12 text-apple-blue"
                      : isDone
                      ? "bg-black/[0.03] dark:bg-white/[0.04] text-ash"
                      : "text-ash/60"
                  }`}
                  style={{ border: "0.5px solid var(--glass-border)" }}
                >
                  <div className="flex items-center justify-between text-[13px] font-mono mb-1">
                    <span className="font-semibold">{stg.num}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                  <div className="font-semibold text-[13px] leading-tight">{stg.titleEn}</div>
                  <div className="text-[12px] font-urdu mt-0.5" dir="rtl">
                    {stg.titleUr}
                  </div>
                  {!compact && (
                    <p className="text-[12px] text-ash mt-1 leading-snug">{stg.desc}</p>
                  )}
                </div>
              );
            })}
          </div>

          {caseData.documents && caseData.documents.length > 0 && (
            <ul className="space-y-1 text-[13px]">
              {caseData.documents.map((doc) => (
                <li key={doc.url}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-apple-blue">
                    {doc.category} · {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a
            href={formatWhatsAppUrl(
              `Hi, following up on Form 114(1) docket ${caseData.reference} (${caseData.fullName}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-full bg-[#25D366] text-white font-semibold text-[15px] whitespace-nowrap active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp the desk
          </a>
        </div>
      )}
    </div>
  );
}
