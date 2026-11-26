"use client";

import { routesData, projects } from "@/data/projects";
import Reveal from "./reveal";

const routeColorStyles = {
  "route-blue": {
    badge: "bg-blue-600 text-white",
    border: "border-blue-500/50",
    bg: "bg-[#0b1736]",
    accent: "text-blue-400",
    track: "bg-blue-500",
    pill: "border-blue-500/40 bg-blue-950/60 text-blue-200",
  },
  "route-red": {
    badge: "bg-rose-600 text-white",
    border: "border-rose-500/50",
    bg: "bg-[#240c14]",
    accent: "text-rose-400",
    track: "bg-rose-500",
    pill: "border-rose-500/40 bg-rose-950/60 text-rose-200",
  },
  "route-green": {
    badge: "bg-emerald-600 text-white",
    border: "border-emerald-500/50",
    bg: "bg-[#08211b]",
    accent: "text-emerald-400",
    track: "bg-emerald-500",
    pill: "border-emerald-500/40 bg-emerald-950/60 text-emerald-200",
  },
} as const;

export default function RoutesSection() {
  const handleScrollToProject = (projectId: string) => {
    const el = document.getElementById(projectId);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="routes"
      className="relative overflow-hidden bg-[#0a0f1d] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-950/70 px-3 py-1 font-mono text-[11px] font-bold text-rose-300">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span>STOP 03 // THREE ENGINEERING ROUTES</span>
        </div>

        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          THREE SPECIALIZED <span className="text-amber-400">TRANSIT LINES</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Every project connects to one of three core engineering tracks: high-throughput systems,
          AI automation workflows, and cryptographic threshold protocols.
        </p>
      </Reveal>

      {/* Routes Grid */}
      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        {routesData.map((route, index) => {
          const style = routeColorStyles[route.id as keyof typeof routeColorStyles];

          return (
            <Reveal key={route.id} delay={index * 80}>
              <article
                className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} p-5 shadow-xl backdrop-blur-md sm:p-6`}
              >
                {/* Route Line Color Accent Ribbon */}
                <div className={`route-ribbon absolute inset-x-0 top-0 h-1.5 ${style.track}`} />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 font-mono text-xs font-black uppercase tracking-wider ${style.badge}`}
                    >
                      {route.name}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Track: {route.slug}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">
                  {route.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#f3f1eb] sm:text-sm">
                  {route.description}
                </p>

                {/* Technologies Pill Grid */}
                <div className="mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    Core Technologies:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {route.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${style.pill}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Matching Projects Links */}
                <div className="mt-5 border-t border-slate-700/60 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                    Connected Station Projects:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {route.projectKeys.map((pKey) => {
                      const p = projects[pKey];
                      if (!p) return null;
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => handleScrollToProject(`project-${p.id}`)}
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-600 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
                        >
                          <span className="font-mono text-[10px] text-amber-400">
                            [{p.stationCode}]
                          </span>
                          <span>{p.title}</span>
                          <span className="text-[10px] text-slate-400">↓</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
