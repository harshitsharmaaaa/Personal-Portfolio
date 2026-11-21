"use client";

import { useState } from "react";
import { profile } from "@/data/projects";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070b16] px-4 py-16 text-slate-100 sm:px-6 sm:py-24"
    >
      {/* Decorative Closing Route Convergence Lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
        >
          <path
            d="M 50,0 Q 150,150 200,200"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
          />
          <path
            d="M 200,0 L 200,200"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
          />
          <path
            d="M 350,0 Q 250,150 200,200"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
          />
          <circle cx="200" cy="200" r="12" fill="#fbbf24" stroke="#ffffff" strokeWidth="4" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
        {/* Terminal Station Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/70 px-3.5 py-1 font-mono text-[11px] font-bold text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>STOP 07 // TERMINAL STATION</span>
        </div>

        {/* Dramatic Closing Headline */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            LET&apos;S BUILD <span className="text-amber-400">SOMETHING</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
            End of the line. Open for software engineering opportunities, distributed systems challenges,
            and high-impact technical collaborations.
          </p>
        </div>

        {/* Copy Email Primary CTA Box */}
        <div className="mx-auto max-w-md rounded-2xl border border-amber-400/30 bg-[#0d162b] p-5 shadow-2xl backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between border-b border-slate-700 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
              DISPATCH CHANNEL
            </span>
            <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
          </div>

          <div className="font-mono text-sm sm:text-base font-bold text-white break-all">
            {profile.email}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={handleCopyEmail}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-amber-400 px-4 text-xs font-bold text-[#0a0f1d] hover:bg-amber-300 transition active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span>{copied ? "Copied to Clipboard! ✓" : "Copy Email Address"}</span>
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-4 text-xs font-semibold text-white hover:border-amber-400 hover:text-amber-300 transition active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span>Open Mail App</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Verified Social & Technical Links */}
        <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-2.5 pt-4">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition active:scale-95"
          >
            <span>Resume</span>
            <span>↗</span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition active:scale-95"
          >
            <span>GitHub</span>
            <span>↗</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition active:scale-95"
          >
            <span>LinkedIn</span>
            <span>↗</span>
          </a>

          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition active:scale-95"
          >
            <span>X / Twitter</span>
            <span>↗</span>
          </a>
        </div>

        {/* Return to Departure Terminal (Back to Top) */}
        <div className="pt-8">
          <button
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-[#0a0f1d] px-4 py-2 font-mono text-xs text-slate-400 hover:border-slate-600 hover:text-amber-400 transition active:scale-95"
          >
            <span>↑ Back to First Stop</span>
          </button>
        </div>

        {/* Technical Footer */}
        <footer className="pt-10 border-t border-slate-800/80 text-center font-mono text-[11px] text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} Harshit Sharma · Subway Editorial Edition</p>
          <p>Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4</p>
        </footer>
      </div>
    </section>
  );
}
