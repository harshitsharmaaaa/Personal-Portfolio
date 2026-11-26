"use client";

import { journeyMilestones } from "@/data/projects";
import Reveal from "./reveal";

const stationColors: Record<string, { stroke: string; fill: string; bg: string; text: string }> = {
  blue: {
    stroke: "#3b82f6",
    fill: "#1d4ed8",
    bg: "bg-blue-950/60 border-blue-500/40",
    text: "text-blue-400",
  },
  green: {
    stroke: "#10b981",
    fill: "#047857",
    bg: "bg-emerald-950/60 border-emerald-500/40",
    text: "text-emerald-400",
  },
  purple: {
    stroke: "#8b5cf6",
    fill: "#6d28d9",
    bg: "bg-purple-950/60 border-purple-500/40",
    text: "text-purple-400",
  },
};

export default function JourneySection() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#0d1527] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Station Signboard Header */}
      <Reveal className="mx-auto max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-950/70 px-3 py-1 font-mono text-[11px] font-bold text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span>STOP 02 // ROUTE MAP</span>
        </div>

        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          MY ROUTE INTO <span className="text-amber-400">ENGINEERING</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          A chronological journey through academic foundations at VIT Chennai, systems sandboxing,
          cryptographic threshold protocols, and merged production open-source contributions.
        </p>
      </Reveal>

      {/* Vertical Subway Route Line & Stations Container */}
      <div className="relative mx-auto mt-10 max-w-3xl pl-4 sm:pl-8">
        <Reveal className="journey-route">
          {/* Continuous Transit Track Line */}
          <div
            className="journey-track absolute left-7 top-4 bottom-8 w-1 rounded-full bg-gradient-to-b from-amber-400 via-blue-500 via-emerald-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.3)] sm:left-11"
            aria-hidden="true"
          />

          {/* Milestone Stations */}
          <div className="space-y-10">
            {journeyMilestones.map((item, index) => {
              const colors = stationColors[item.routeColor] || stationColors.blue;

              return (
                <Reveal key={item.code} className="journey-station" delay={index * 70}>
                  <div className="relative flex items-start gap-4 sm:gap-6">
                    {/* Station Interchange Dot */}
                    <div
                      className="station-marker relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#0a0f1d] shadow-md sm:h-8 sm:w-8"
                      style={{ color: colors.stroke }}
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: colors.stroke }}
                      />
                      <span
                        className="absolute -inset-1 rounded-full opacity-25"
                        style={{ backgroundColor: colors.stroke }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Station Editorial Card */}
                    <article
                      className={`flex-1 rounded-xl border ${colors.bg} p-4 shadow-lg backdrop-blur-sm sm:p-5`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${colors.text}`}>
                            {item.station}
                          </span>
                          <span className="whitespace-nowrap rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                            {item.code}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-amber-300">
                          {item.phase}
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-base font-bold text-white sm:text-lg">
                        {item.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <span className="font-mono text-[11px] text-slate-300">{item.route}</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#f3f1eb] sm:text-sm">
                        {item.summary}
                      </p>

                      {/* Station Tech Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-800/80 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-700/60 bg-slate-900/90 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
