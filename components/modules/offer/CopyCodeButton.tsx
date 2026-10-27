"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeButtonProps {
  code: string;
}

const CopyCodeButton = ({ code }: CopyCodeButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy coupon code:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-w-24 items-center justify-center gap-1.5 rounded-lg bg-invert-foreground px-3 py-2 text-xs font-semibold text-invert transition-opacity hover:opacity-90 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy Code
        </>
      )}
    </button>
  );
};

export default CopyCodeButton;