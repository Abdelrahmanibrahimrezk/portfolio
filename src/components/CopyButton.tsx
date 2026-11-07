"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link remains available.
    }
  };

  return (
    <button type="button" className="btn" onClick={copy} aria-label={label} title={label}>
      {copied ? <Check /> : <Copy />}
      <span aria-live="polite" className="visually-hidden">{copied ? "Email copied" : ""}</span>
    </button>
  );
}
