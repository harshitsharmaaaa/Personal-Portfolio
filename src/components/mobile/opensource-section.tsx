"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  contributions,
  getContributionStatus,
  getContributionStatusLabel,
  type Contribution,
} from "@/data/contributions";
import Reveal from "./reveal";

type FilterTab = "all" | "merged" | "approved" | "open";

function statusBadgeClass(contribution: Contribution) {
  const status = getContributionStatus(contribution);
  if (status === "merged") {
    return "border-emerald-500/40 bg-emerald-950/70 text-emerald-300";
  }
  if (status === "approved" || status === "reviewer-validated") {
    return "border-amber-400/40 bg-amber-950/70 text-amber-300";
  }
  if (status === "closed") {
    return "border-slate-600 bg-slate-800 text-slate-400";
  }
  return "border-cyan-500/40 bg-cyan-950/70 text-cyan-300";
}

export default function OpenSourceSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    if (activeTab === "all") return contributions;
    if (activeTab === "merged") {
      return contributions.filter((c) => getContributionStatus(c) === "merged");
    }
    if (activeTab === "approved") {
      return contributions.filter((c) => {
        const s = getContributionStatus(c);
        return s === "approved" || s === "reviewer-validated";
      });
    }
    return contributions.filter((c) => {
      const s = getContributionStatus(c);
      return s === "open" || s === "awaiting-triage" || s === "fork-work";
    });
  }, [activeTab]);

  const displayed = filtered.slice(0, visibleCount);

  return (
    <section
      id="open-source"
      className="relative overflow-hidden bg-[#0d1527] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-950/70 px-3 py-1 font-mono text-[11px] font-bold text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span>STOP 05 // OPEN-SOURCE JOURNEY</span>
        </div>

        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          UPSTREAM OPEN-SOURCE <span className="text-amber-400">CONTRIBUTIONS</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Verified root-cause fixes, runtime hardening, and architecture improvements across
          Conductor, Draco, Backstage, TraceRoot, and self-healing-hybrid-RAG, plus
          reviewer-validated work in Hono.
        </p>

        {/* View all contributions page link */}
        <div className="pt-1">
          <Link
            href="/contributions"
            className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-4 hover:text-amber-200"
          >
            <span>Open Dedicated Contributions Explorer →</span>
          </Link>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap gap-2">
        {(
          [
            ["all", "All Track Works"],
            ["merged", "Merged Upstream"],
            ["approved", "Approved"],
            ["open", "Under Review"],
          ] as [FilterTab, string][]
        ).map(([tab, label]) => {
          const isActive = activeTab === tab;
          return (
            <button
              type="button"
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setVisibleCount(6);
              }}
              aria-pressed={isActive}
              className={`min-h-[44px] rounded-full px-4 py-2 font-mono text-xs font-semibold transition active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Contribution Cards Stack */}
      <div className="mx-auto mt-6 max-w-3xl space-y-4">
        {displayed.map((c, index) => (
          <Reveal key={c.id} delay={index * 35}>
            <article className="relative rounded-xl border border-slate-700/80 bg-[#0a0f1d]/90 p-4 shadow-lg backdrop-blur-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <a
                  href={c.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center font-mono text-xs font-bold text-purple-300 hover:text-purple-200 hover:underline"
                >
                  {c.repository}
                </a>

                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${statusBadgeClass(
                    c
                  )}`}
                >
                  {getContributionStatusLabel(c)}
                </span>
              </div>

              <h3 className="mt-2.5 text-sm font-bold leading-snug text-white sm:text-base">
                {c.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {c.summary}
              </p>

              {/* Problem & Solution Details */}
              {c.problem && (
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-amber-400">Problem: </span>
                  {c.problem}
                </p>
              )}

              {/* Review Evidence */}
              {c.reviewEvidence && !c.reviewEvidence.automated && (
                <div className="mt-2.5 rounded-lg border-l-2 border-amber-400 bg-slate-900/70 p-2 text-xs text-amber-200">
                  <span className="font-bold">Maintainer Feedback: </span>
                  {c.reviewEvidence.summary}
                </div>
              )}

              {/* Technologies & Domains */}
              <div className="mt-3 flex flex-wrap gap-1">
                {c.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Direct Upstream Link */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-amber-400 underline decoration-amber-400/40 underline-offset-2 hover:text-amber-300"
                >
                  <span>
                    View Upstream {c.kind === "pull-request" ? "PR" : "Issue"} #{c.number}
                  </span>
                  <span>↗</span>
                </a>

                <span className="font-mono text-[10px] text-slate-500">
                  Verified: {c.verifiedAt}
                </span>
              </div>
            </article>
          </Reveal>
        ))}

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="min-h-[44px] w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 font-mono text-xs font-bold text-amber-300 transition hover:bg-slate-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              Show More Contributions ({filtered.length - visibleCount} Remaining) ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
