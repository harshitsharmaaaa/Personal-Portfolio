"use client";

import { profile } from "@/data/projects";

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-[#0a0f1d] px-4 py-8 text-slate-100 subway-grid-pattern sm:px-6 sm:py-12"
    >
      {/* Original subway schematic vector background */}
      <div className="hero-background pointer-events-none absolute inset-0 z-0 opacity-25" aria-hidden="true">
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
            className="hero-route-path"
            pathLength={1}
            style={{ animationDelay: "120ms" }}
            d="M -20,80 L 120,80 L 220,180 L 220,550 L 360,690"
            fill="none"
            stroke="url(#blueTrack)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            className="hero-route-path"
            pathLength={1}
            style={{ animationDelay: "380ms" }}
            d="M 420,140 L 280,140 L 180,240 L 180,500 L 40,640"
            fill="none"
            stroke="url(#redTrack)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            className="hero-route-path"
            pathLength={1}
            style={{ animationDelay: "620ms" }}
            d="M 50,720 L 50,420 L 150,320 L 320,320 L 410,410"
            fill="none"
            stroke="url(#greenTrack)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            className="hero-route-dash"
            d="M 10,260 L 390,260"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeDasharray="6 6"
          />

          {/* Interchanges / stations */}
          <circle className="hero-route-node" style={{ animationDelay: "500ms" }} cx="120" cy="80" r="10" fill="#0a0f1d" stroke="#3b82f6" strokeWidth="4" />
          <circle className="hero-route-node" style={{ animationDelay: "700ms" }} cx="280" cy="140" r="10" fill="#0a0f1d" stroke="#ef4444" strokeWidth="4" />
          <circle className="hero-route-node" style={{ animationDelay: "900ms" }} cx="200" cy="210" r="14" fill="#fbbf24" stroke="#0a0f1d" strokeWidth="3" />
          <circle className="hero-route-node" style={{ animationDelay: "1050ms" }} cx="180" cy="420" r="9" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
          <circle className="hero-route-node" style={{ animationDelay: "1200ms" }} cx="220" cy="520" r="9" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
        </svg>
      </div>

      {/* Hero header signage */}
      <div className="relative z-10 space-y-4">
        <div className="hero-enter flex flex-wrap items-center gap-2" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-300">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <span>TERMINAL STATION 01 // FIRST STOP</span>
          </div>

          <div className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 font-mono text-[10px] text-slate-300">
            {profile.location.toUpperCase()}
          </div>
        </div>

        {/* Oversized geometric editorial typography */}
        <div className="space-y-1">
          <p
            className="hero-enter font-mono text-xs uppercase tracking-[0.22em] text-amber-400"
            style={{ animationDelay: "150ms" }}
          >
            {profile.role.toUpperCase()}
          </p>
          <h1
            className="hero-enter text-4xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl"
            style={{ animationDelay: "240ms" }}
          >
            HARSHIT <span className="text-amber-400">SHARMA</span>
          </h1>
          <p
            className="hero-enter font-mono text-sm font-semibold leading-snug text-slate-300 sm:text-base"
            style={{ animationDelay: "330ms" }}
          >
            {profile.education}
          </p>
        </div>

        {/* Positioning & bio in warm off-white */}
        <div
          className="hero-enter max-w-xl rounded-xl border border-slate-700/80 bg-[#0d162b]/80 p-4 shadow-xl backdrop-blur-sm sm:p-5"
          style={{ animationDelay: "420ms" }}
        >
          <div className="mb-2 flex items-center justify-between border-b border-slate-700/60 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
              ENGINEERING ROUTE MANIFEST
            </span>
            <span className="font-mono text-[10px] text-emerald-400">3 LINES · 7 STOPS</span>
          </div>
          <p className="text-sm leading-relaxed text-[#f8f7f4] sm:text-base">
            {profile.bio}
          </p>

          {/* Core values subway pills */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-2">
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

      {/* Transit line route indicator strip */}
      <div className="hero-enter relative z-10 my-6 grid grid-cols-3 gap-2 sm:gap-3" style={{ animationDelay: "520ms" }}>
        <div className="rounded-lg border border-blue-500/40 bg-blue-950/40 p-2 text-center sm:p-2.5">
          <div className="font-mono text-[9px] font-bold uppercase text-blue-400 sm:text-[10px]">BLUE LINE</div>
          <div className="mt-0.5 text-[11px] font-semibold leading-tight text-white sm:text-xs">Backend & Systems</div>
        </div>
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-2 text-center sm:p-2.5">
          <div className="font-mono text-[9px] font-bold uppercase text-rose-400 sm:text-[10px]">RED LINE</div>
          <div className="mt-0.5 text-[11px] font-semibold leading-tight text-white sm:text-xs">AI & Automation</div>
        </div>
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-2 text-center sm:p-2.5">
          <div className="font-mono text-[9px] font-bold uppercase text-emerald-400 sm:text-[10px]">GREEN LINE</div>
          <div className="mt-0.5 text-[11px] font-semibold leading-tight text-white sm:text-xs">Blockchain & Web3</div>
        </div>
      </div>

      {/* Hero CTA actions */}
      <div className="hero-enter relative z-10 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center" style={{ animationDelay: "620ms" }}>
        <button
          onClick={() => handleScrollTo("projects")}
          className="flex h-12 min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 font-bold text-[#0a0f1d] shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 sm:flex-1"
        >
          <span>Explore Selected Projects</span>
          <span className="text-base" aria-hidden="true">↓</span>
        </button>

        <button
          onClick={() => handleScrollTo("journey")}
          className="flex h-12 min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-900/90 px-6 font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 sm:flex-1"
        >
          <span>View Route Map</span>
          <span className="text-base" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
