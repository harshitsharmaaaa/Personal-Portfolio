"use client";

import { profile } from "@/data/projects";

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] overflow-hidden bg-[#0a0f1d] px-4 py-8 text-slate-100 subway-grid-pattern sm:px-6 sm:py-12 flex flex-col justify-between"
    >
      {/* Original Subway Schematic Vector Graphic Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-25">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="blueTrack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="redTrack" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="greenTrack" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Grid coordinates */}
          <line x1="50" y1="0" x2="50" y2="700" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="150" y1="0" x2="150" y2="700" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="250" y1="0" x2="250" y2="700" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="350" y1="0" x2="350" y2="700" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="140" x2="400" y2="140" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="350" x2="400" y2="350" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="520" x2="400" y2="520" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Diagonal & intersecting subway lines */}
          <path
            d="M -20,80 L 120,80 L 220,180 L 220,550 L 360,690"
            fill="none"
            stroke="url(#blueTrack)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 420,140 L 280,140 L 180,240 L 180,500 L 40,640"
            fill="none"
            stroke="url(#redTrack)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 50,720 L 50,420 L 150,320 L 320,320 L 410,410"
            fill="none"
            stroke="url(#greenTrack)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 10,260 L 390,260"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeDasharray="6 6"
          />

          {/* Interchanges / Stations */}
          <circle cx="120" cy="80" r="10" fill="#0a0f1d" stroke="#3b82f6" strokeWidth="4" />
          <circle cx="280" cy="140" r="10" fill="#0a0f1d" stroke="#ef4444" strokeWidth="4" />
          <circle cx="200" cy="210" r="14" fill="#fbbf24" stroke="#0a0f1d" strokeWidth="3" />
          <circle cx="180" cy="420" r="9" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
          <circle cx="220" cy="520" r="9" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        </svg>
      </div>

      {/* Hero Header Signage */}
      <div className="relative z-10 space-y-4">
        {/* Transit Station Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-300">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>TERMINAL STATION 01 // FIRST STOP</span>
          </div>

          <div className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 font-mono text-[10px] text-slate-300">
            CHENNAI, IN [12.84° N, 80.15° E]
          </div>
        </div>

        {/* Oversized Geometric Editorial Typography */}
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
            SOFTWARE ENGINEER & BUILDER
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">
            HARSHIT <span className="text-amber-400">SHARMA</span>
          </h1>
          <p className="font-mono text-sm font-semibold text-slate-300 sm:text-base">
            VIT Chennai · CSE AI & Robotics (2023 — 2027)
          </p>
        </div>

        {/* Positioning & Bio in Warm Off-White */}
        <div className="max-w-xl rounded-xl border border-slate-700/80 bg-[#0d162b]/80 p-4 sm:p-5 backdrop-blur-sm shadow-xl">
          <div className="mb-2 flex items-center justify-between border-b border-slate-700/60 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
              ENGINEERING ROUTE MANIFEST
            </span>
            <span className="font-mono text-[10px] text-emerald-400">STATUS: ACTIVE</span>
          </div>
          <p className="text-sm leading-relaxed text-[#f8f7f4] sm:text-base">
            {profile.bio}
          </p>

          {/* Core Values Subway Pills */}
          <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            {profile.values.map((val) => (
              <span
                key={val}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] text-amber-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Transit Line Route Indicator Strip */}
      <div className="relative z-10 my-6 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-lg border border-blue-500/40 bg-blue-950/40 p-2.5 text-center">
          <div className="font-mono text-[10px] font-bold text-blue-400 uppercase">BLUE LINE</div>
          <div className="text-xs font-semibold text-white">Backend & Systems</div>
        </div>
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-2.5 text-center">
          <div className="font-mono text-[10px] font-bold text-rose-400 uppercase">RED LINE</div>
          <div className="text-xs font-semibold text-white">AI & Automation</div>
        </div>
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-center">
          <div className="font-mono text-[10px] font-bold text-emerald-400 uppercase">GREEN LINE</div>
          <div className="text-xs font-semibold text-white">Blockchain & Web3</div>
        </div>
      </div>

      {/* Hero CTA Actions */}
      <div className="relative z-10 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          onClick={() => handleScrollTo("projects")}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 font-bold text-[#0a0f1d] shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span>Explore Selected Projects</span>
          <span className="text-base">↓</span>
        </button>

        <button
          onClick={() => handleScrollTo("journey")}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/90 px-6 font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span>View Route Map</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </section>
  );
}
