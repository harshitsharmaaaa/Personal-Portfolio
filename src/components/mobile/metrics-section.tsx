"use client";

import { getContributionMetrics } from "@/data/contributions";

export default function MetricsSection() {
  const ossMetrics = getContributionMetrics();

  const metricsGrid = [
    {
      label: "Upstream PRs Merged",
      value: `${ossMetrics.merged}`,
      badge: "OSS",
      detail: "Verified merges into Conductor, Draco, Backstage, TraceRoot",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    },
    {
      label: "Upstream Repositories",
      value: `${ossMetrics.repositories}`,
      badge: "CODEBASE",
      detail: "Distributed engines, devtools & observability platforms",
      color: "border-blue-500/40 text-blue-400 bg-blue-950/30",
    },
    {
      label: "Foundry Contract Tests",
      value: "268+",
      badge: "SECURITY",
      detail: "Invariants & fuzz testing across 13 test suites in KEYMESH",
      color: "border-amber-400/40 text-amber-400 bg-amber-950/30",
    },
    {
      label: "Engineered Projects",
      value: "6",
      badge: "FULL-STACK",
      detail: "Sandboxed runtimes, threshold cryptography & AI automation",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/30",
    },
    {
      label: "Sandboxed Languages",
      value: "4",
      badge: "SYSTEMS",
      detail: "Python, Node.js, C++, and Java in TheBlackBox runner",
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    },
    {
      label: "Rate-Limit Algorithms",
      value: "4",
      badge: "DISTRIBUTED",
      detail: "Fixed Window, Sliding Window, Token Bucket, Leaky Bucket",
      color: "border-rose-500/40 text-rose-400 bg-rose-950/30",
    },
  ];

  return (
    <section
      id="metrics"
      className="relative overflow-hidden bg-[#0a0f1d] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-950/70 px-3 py-1 font-mono text-[11px] font-bold text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span>STOP 06 // SYSTEM METRICS</span>
        </div>

        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          ENGINEERING AT A <span className="text-amber-400">GLANCE</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Quantifiable milestones derived strictly from verified project implementations,
          cryptographic test suites, and merged open-source pull requests.
        </p>
      </div>

      {/* Metrics Transit Grid */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {metricsGrid.map((m) => (
          <div
            key={m.label}
            className={`flex flex-col justify-between rounded-xl border ${m.color} p-4 sm:p-5 backdrop-blur-sm shadow-md`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-400">
                  {m.badge}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              </div>
              <div className="mt-2 text-2xl font-black tracking-tight sm:text-4xl font-mono">
                {m.value}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xs font-bold text-white leading-tight">
                {m.label}
              </div>
              <div className="mt-1 font-mono text-[10px] text-slate-400 leading-tight">
                {m.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
