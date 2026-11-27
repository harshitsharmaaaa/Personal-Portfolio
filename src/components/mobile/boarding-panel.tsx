"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/data/railway";

const STORAGE_KEY = "harshit-railway-boarding";

export default function BoardingPanel({ onShowMe }: { onShowMe: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "dismissed") setVisible(false);
    } catch {
      // Storage may be unavailable; the panel simply stays visible.
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Persistence is best-effort only.
    }
  };

  const showMe = () => {
    dismiss();
    onShowMe();
    window.setTimeout(() => scrollToId("stations", -120), 0);
  };

  return (
    <aside className="rail-boarding" aria-labelledby="rail-boarding-title">
      <button type="button" className="rail-boarding__close" onClick={dismiss} aria-label="Dismiss boarding information">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <p className="rail-boarding__eyebrow">
        <span className="rail-boarding__pulse" aria-hidden="true" />
        NOW BOARDING
        <span className="rail-boarding__platform">PLATFORM 01</span>
      </p>

      <h2 id="rail-boarding-title" className="rail-boarding__title">
        Pick a stop.<br />
        <span>Ride the line.</span>
      </h2>

      <p className="rail-boarding__copy">
        Tap a station to explore my engineering work, projects and open-source contributions.
      </p>

      <div className="rail-boarding__actions">
        <button type="button" className="rail-boarding__primary" onClick={showMe}>
          SHOW ME
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </button>
        <button type="button" className="rail-boarding__secondary" onClick={dismiss}>
          GOT IT
        </button>
      </div>
    </aside>
  );
}
