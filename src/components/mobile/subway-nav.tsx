"use client";

import { useEffect, useState } from "react";
import { useMobileActive } from "./experience-context";

type NavItem = {
  id: string;
  number: string;
  label: string;
  lineColor: string;
};

const navItems: NavItem[] = [
  { id: "hero", number: "01", label: "The First Stop", lineColor: "#fbbf24" },
  { id: "journey", number: "02", label: "Engineering Route", lineColor: "#3b82f6" },
  { id: "routes", number: "03", label: "Three Lines", lineColor: "#ef4444" },
  { id: "projects", number: "04", label: "Selected Projects", lineColor: "#10b981" },
  { id: "open-source", number: "05", label: "Open-Source Journey", lineColor: "#8b5cf6" },
  { id: "metrics", number: "06", label: "Transit Metrics", lineColor: "#f59e0b" },
  { id: "contact", number: "07", label: "Final Stop", lineColor: "#06b6d4" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function SubwayNav() {
  const active = useMobileActive();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (!active) return;

    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  useEffect(() => {
    if (!active || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, isOpen]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-400/20 bg-[#0a0f1d]/90 backdrop-blur-md transition-all">
      {/* Top Transit Indicator Bar */}
      <div className="flex h-1.5 w-full">
        <div className="h-full flex-1 bg-amber-400" />
        <div className="h-full flex-1 bg-blue-500" />
        <div className="h-full flex-1 bg-rose-500" />
        <div className="h-full flex-1 bg-emerald-500" />
        <div className="h-full flex-1 bg-purple-500" />
      </div>

      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Transit Line Brand */}
        <button
          type="button"
          onClick={() => handleNavClick("hero")}
          className="group flex min-h-[44px] items-center gap-2 text-left focus-visible:outline-2 focus-visible:outline-amber-400"
          aria-label="Back to top"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-400 font-bold text-[#0a0f1d] shadow-sm">
            <span className="text-xs font-black tracking-tighter">HS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-wider text-amber-300">
              HARSHIT SHARMA
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
              Line 2027 · Transit System
            </span>
          </div>
        </button>

        {/* Route Summary & Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-slate-600/60 bg-slate-900/70 px-2.5 py-1 text-[10px] font-medium text-slate-300 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>7 STOPS · 3 LINES</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex min-h-[44px] items-center gap-2 rounded-full border border-amber-400/30 bg-slate-900/80 px-3.5 text-xs font-semibold text-amber-300 transition hover:border-amber-400 hover:bg-slate-800 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
            aria-expanded={isOpen}
            aria-controls="subway-navigation-menu"
            aria-label="Toggle Station Menu"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {isOpen ? "Close" : "Stations"}
            </span>
            <MenuIcon open={isOpen} />
          </button>
        </div>
      </div>

      {/* Slide-down Station Navigation Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[63px] z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="subway-navigation-menu"
            className="absolute inset-x-0 top-full z-40 max-h-[calc(100svh-63px)] overflow-y-auto border-b border-amber-400/20 bg-[#0d1527] px-4 py-4 shadow-2xl sm:px-6"
            aria-label="Transit stations navigation"
          >
            <div className="mb-2 flex items-center justify-between border-b border-slate-700/50 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                Select Destination Station
              </span>
              <span className="font-mono text-[10px] text-amber-400">7 Stops Total</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-left transition active:scale-[0.98] ${
                      isActive
                        ? "border border-amber-400/40 bg-amber-400/15 text-amber-300"
                        : "border border-transparent text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: item.lineColor }}
                      >
                        {item.number}
                      </span>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="font-mono text-[10px] font-bold text-amber-400">
                        ● CURRENT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="w-full min-h-[44px] rounded-full bg-amber-400 py-2.5 text-center text-xs font-bold text-[#0a0f1d] transition hover:bg-amber-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                Express To Contact →
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
