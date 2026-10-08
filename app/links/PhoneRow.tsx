"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE, PHONE_TEL } from "@/lib/contact";

// The number stays behind a tap, then opens up into call, text and copy.

export default function PhoneRow() {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const call = useRef<HTMLAnchorElement>(null);

  // The button that was focused is gone once the number shows, so hand focus on.
  useEffect(() => {
    if (shown) call.current?.focus();
  }, [shown]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PHONE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  if (!shown) {
    return (
      <button type="button" className="link-row" onClick={() => setShown(true)}>
        <span className="label">Phone</span>
        <span className="detail">Show number</span>
      </button>
    );
  }

  return (
    <div className="link-row phone">
      <span className="label">Phone</span>
      <span className="detail">
        <span className="number">{PHONE}</span>
        <span className="actions">
          <a ref={call} href={`tel:${PHONE_TEL}`}>
            Call
          </a>
          <a href={`sms:${PHONE_TEL}`}>Text</a>
          <button type="button" onClick={copy} aria-live="polite">
            {copied ? "Copied" : "Copy"}
          </button>
        </span>
      </span>
    </div>
  );
}
