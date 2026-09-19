import React from "react";

interface BilingualLabelProps {
  en: string;
  ur: string;
  htmlFor?: string;
  required?: boolean;
  dark?: boolean;
  className?: string;
}

export function BilingualLabel({
  en,
  ur,
  htmlFor,
  required = false,
  dark = false,
  className = "",
}: BilingualLabelProps) {
  return (
    <div className={`field-label-wrap ${className}`}>
      <label htmlFor={htmlFor} className={`label-en${dark ? " label-en-dark" : ""}`}>
        {en} {required && <span className="text-theme-danger">*</span>}
      </label>
      <span className={`label-ur${dark ? " label-ur-dark" : ""}`} dir="rtl">
        {ur} {required && <span className="text-theme-danger">*</span>}
      </span>
    </div>
  );
}
