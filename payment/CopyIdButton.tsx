"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyIdButtonProps {
  label: string;
  value: string;
}

export function CopyIdButton({ label, value }: CopyIdButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 hover:bg-muted text-xs sm:text-sm font-mono cursor-pointer transition-colors group"
      title={`Click to copy ${label}`}
    >
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-bold text-foreground">{value}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
      )}
    </button>
  );
}
