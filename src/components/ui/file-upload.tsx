"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X,
  AlertCircle,
  FileSpreadsheet,
  Building2,
  CreditCard,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DocumentCategory =
  | "cnic"
  | "bank_statement"
  | "salary_slip"
  | "tax_certificate"
  | "other";

export interface UploadedTaxDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  category: DocumentCategory;
  previewUrl?: string;
  url?: string;
  uploadedAt: Date;
  status: "complete" | "uploading" | "error";
  progress?: number;
}

export interface SmoothFileUploadProps {
  onFilesChange?: (files: UploadedTaxDocument[]) => void;
  onManualEntryClick?: () => void;
  className?: string;
  maxFileSizeMb?: number;
  initialFiles?: UploadedTaxDocument[];
}

const CATEGORIES: {
  id: DocumentCategory;
  labelEn: string;
  labelUr: string;
  icon: React.ElementType;
  hint: string;
}[] = [
  {
    id: "cnic",
    labelEn: "CNIC Copies",
    labelUr: "شناختی کارڈ کاپی",
    icon: CreditCard,
    hint: "Front, Back, or Combined photo / PDF",
  },
  {
    id: "bank_statement",
    labelEn: "Bank Statements",
    labelUr: "بینک اسٹیٹمنٹ",
    icon: Building2,
    hint: "Annual statement (July 2025 – June 2026)",
  },
  {
    id: "salary_slip",
    labelEn: "Salary / Pension Slips",
    labelUr: "سیلری سلپ و پنشن بک",
    icon: FileText,
    hint: "Employer certificate or monthly pay slips",
  },
  {
    id: "tax_certificate",
    labelEn: "WHT Certificates",
    labelUr: "ٹیکس کٹوتی سرٹیفکیٹ",
    icon: FileSpreadsheet,
    hint: "Electricity, Mobile SIM, or Property tax WHT",
  },
  {
    id: "other",
    labelEn: "Other Records & Photos",
    labelUr: "دیگر دستاویزات",
    icon: FolderOpen,
    hint: "Vehicle registration, deeds, or receipts",
  },
];

export function SmoothFileUpload({
  onFilesChange,
  onManualEntryClick,
  className = "",
  maxFileSizeMb = 15,
  initialFiles = [],
}: SmoothFileUploadProps) {
  const [files, setFiles] = useState<UploadedTaxDocument[]>(initialFiles);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("cnic");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = useCallback(
    async (file: File, category: DocumentCategory) => {
      const maxBytes = maxFileSizeMb * 1024 * 1024;
      if (file.size > maxBytes) {
        setErrorMessage(`File "${file.name}" exceeds maximum allowed size of ${maxFileSizeMb}MB.`);
        return;
      }

      setErrorMessage(null);
      const isImg = file.type.startsWith("image/");
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const previewUrl = isImg ? URL.createObjectURL(file) : undefined;

      const pending: UploadedTaxDocument = {
        id,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        category,
        previewUrl,
        uploadedAt: new Date(),
        status: "uploading",
        progress: 20,
      };

      setFiles((prev) => {
        const updated = [...prev, pending];
        onFilesChange?.(updated);
        return updated;
      });

      try {
        const form = new FormData();
        form.append("file", file);
        form.append("category", category);
        const res = await fetch("/api/documents", { method: "POST", body: form });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }
        setFiles((prev) => {
          const updated = prev.map((f) =>
            f.id === id
              ? { ...f, url: data.url as string, status: "complete" as const, progress: 100 }
              : f
          );
          onFilesChange?.(updated);
          return updated;
        });
      } catch {
        setErrorMessage(`Could not save “${file.name}”. Please retry or send it on WhatsApp.`);
        setFiles((prev) => {
          const updated = prev.map((f) =>
            f.id === id ? { ...f, status: "error" as const } : f
          );
          onFilesChange?.(updated);
          return updated;
        });
      }
    },
    [maxFileSizeMb, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        Array.from(e.dataTransfer.files).forEach((file) => {
          processFile(file, activeCategory);
        });
      }
    },
    [activeCategory, processFile]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        processFile(file, activeCategory);
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      onFilesChange?.(updated);
      return updated;
    });
  };

  const currentCategoryMeta = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const filesForCurrentCategory = files.filter((f) => f.category === activeCategory);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Category Tabs: Apple Segmented Pill Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-ink dark:text-white uppercase tracking-wider font-mono">
          Document Category / دستاویز کی قسم
        </label>
        <div
          className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] overflow-x-auto no-scrollbar"
          style={{
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            backdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = files.filter((f) => f.category === cat.id).length;
            const isSelected = cat.id === activeCategory;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 select-none flex items-center gap-1.5",
                  isSelected
                    ? "bg-white dark:bg-[#2c2c2e] text-apple-blue font-bold shadow-sm border border-black/[0.04] dark:border-white/[0.08]"
                    : "text-ash hover:text-ink dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate max-w-[110px] sm:max-w-none">{cat.labelEn}</span>
                {count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-apple-blue text-white text-[10px] font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SmoothUI Frosted Drag-and-Drop Surface */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer p-6 sm:p-8 rounded-[24px] border-2 border-dashed transition-all duration-200 text-center select-none",
          "bg-white/60 dark:bg-[#1c1c1e]/60",
          isDragging
            ? "border-apple-blue bg-apple-blue/10 scale-[1.01]"
            : "border-black/[0.12] dark:border-white/[0.16] hover:border-apple-blue/60 hover:bg-white/80 dark:hover:bg-[#1c1c1e]/80"
        )}
        data-smooth-upload="true"
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2.5">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200",
              isDragging
                ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/30"
                : "bg-apple-blue/10 text-apple-blue dark:bg-apple-blue/20"
            )}
          >
            <Upload className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="font-serif text-sm sm:text-base font-bold text-ink dark:text-white">
              Upload {currentCategoryMeta.labelEn}
            </div>
            <div className="font-urdu text-xs text-apple-blue mt-0.5" dir="rtl">
              {currentCategoryMeta.labelUr} — فائل یہاں ڈراپ کریں یا منتخب کریں
            </div>
          </div>

          <p className="text-xs text-ash dark:text-white/60 max-w-xs leading-relaxed font-sans">
            {currentCategoryMeta.hint}. Supports PDF, JPEG, and PNG up to {maxFileSizeMb}MB.
          </p>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apple-blue/10 text-apple-blue font-mono text-[11px] font-bold border border-apple-blue/25 group-hover:bg-apple-blue group-hover:text-white transition-colors">
            <span>Browse Files</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 rounded-2xl bg-apple-red/10 border border-apple-red/25 text-apple-red text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Files Manifest */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-1"
          >
            <div className="flex items-center justify-between text-xs font-mono text-ash dark:text-white/60 px-1">
              <span>Attached Documents ({files.length})</span>
              <span className="text-apple-green flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ready for Case Review</span>
              </span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {files.map((file) => {
                const isImage = file.type.startsWith("image/");
                return (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 dark:bg-[#2c2c2e]/70 border border-black/[0.06] dark:border-white/[0.10] text-xs transition-all shadow-sm"
                    style={{
                      WebkitBackdropFilter: "blur(18px)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      {isImage && file.previewUrl ? (
                        // Blob/object URLs are not valid next/image sources
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="w-8 h-8 rounded-lg object-cover border border-black/[0.08] dark:border-white/[0.12] shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-apple-blue/10 text-apple-blue flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-ink dark:text-white truncate text-xs">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-ash dark:text-white/50 font-mono flex items-center gap-1.5">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span className="uppercase text-apple-blue font-semibold">
                            {CATEGORIES.find((c) => c.id === file.category)?.labelEn || file.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-ash hover:text-apple-red hover:bg-apple-red/10 transition-colors shrink-0"
                      aria-label="Remove document"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Filing Route Fallback Card */}
      {onManualEntryClick && (
        <div
          onClick={onManualEntryClick}
          className="p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-apple-blue/5 hover:bg-apple-blue/10 dark:bg-apple-blue/10 dark:hover:bg-apple-blue/15 transition-all cursor-pointer flex items-center justify-between gap-3 group"
          style={{
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-0.5 min-w-0">
            <div className="text-xs font-bold text-ink dark:text-white flex items-center gap-1.5">
              <span>Prefer to enter information manually?</span>
            </div>
            <div className="text-[11px] text-ash dark:text-white/70 leading-relaxed font-sans">
              Skip document uploads and calculate your return via the simplified 8-Window e-Return.
            </div>
            <div className="font-urdu text-[11px] text-apple-blue pt-0.5" dir="rtl">
              کاغذات نہیں ہیں؟ ایف بی آر کا 8-ونڈو ریٹرن فارم خود مکمل کریں۔
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-apple-blue text-white font-mono text-xs font-bold shrink-0 whitespace-nowrap group-hover:translate-x-0.5 transition-transform shadow-sm">
            <span>Manual Form</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );
}

export default SmoothFileUpload;
