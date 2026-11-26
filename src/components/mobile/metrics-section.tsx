"use client";

import { useEffect, useRef, useState } from "react";
import { allProjectList, projects } from "@/data/projects";
import {
  contributions,
  getContributionMetrics,
  getContributionStatus,
} from "@/data/contributions";
import { useMobileActive } from "./experience-context";
import Reveal from "./reveal";

type Metric = {
  label: string;
  value: string;
  badge: string;
  detail: string;
  color: string;
};

function leadingNumber(value: string | undefined, fallback: string) {
  return value?.match(/\d+/)?.[0] ?? fallback;
}

function useCountUp(target: number, active: boolean, duration = 900) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;

    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        setValue(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [active, duration, target]);

  return { ref, value };
}

function MetricCard({ metric }: { metric: Metric }) {
  const active = useMobileActive();
  const numericValue = Number.parseInt(metric.value, 10);
  const hasNumber = Number.isFinite(numericValue);
  const suffix = hasNumber ? metric.value.slice(String(numericValue).length) : "";
  const { ref, value } = useCountUp(hasNumber ? numericValue : 0, active);
  const display = hasNumber ? `${value}${suffix}` : metric.value;

  return (
    <div
      ref={ref}
      className={`flex h-full flex-col justify-between rounded-xl border ${metric.color} p-4 shadow-md backdrop-blur-sm sm:p-5`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
            {metric.badge}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        </div>
        <div className="mt-2 font-mono text-2xl font-black tracking-tight sm:text-4xl">
          <span className="sr-only">{metric.value}</span>
          <span aria-hidden="true">{display}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-bold leading-tight text-white">{metric.label}</div>
        <div className="mt-1 font-mono text-[10px] leading-tight text-slate-400">
          {metric.detail}
        </div>
      </div>
    </div>
  );
}

export default function MetricsSection() {
  const ossMetrics = getContributionMetrics();
  const mergedRepositories = new Set(
    contributions
      .filter((contribution) => getContributionStatus(contribution) === "merged")
      .map((contribution) => contribution.repository)
  );

  const keymesh = projects["projects/keymesh.ts"];
  const blackbox = projects["projects/blackbox.ts"];
  const rateLimiter = projects["projects/rate-limiter.ts"];

  const foundryTests =
    keymesh.metrics?.find((metric) => metric.label === "Foundry Tests")?.value ?? "268+";
  const sandboxedLanguages = leadingNumber(
    blackbox.metrics?.find((metric) => metric.label === "Languages")?.value,
    "4"
  );
  const rateLimitAlgorithms = leadingNumber(
    rateLimiter.highlights.find((highlight) => highlight.startsWith("4 algorithms")),
    "4"
  );

  const metricsGrid: Metric[] = [
    {
      label: "Upstream PRs Merged",
      value: `${ossMetrics.merged}`,
      badge: "OSS",
      detail: `Across ${mergedRepositories.size} repositories; Draco #9/#11 cover overlapping work.`,
      color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-400",
    },
    {
      label: "Upstream Repositories",
      value: `${ossMetrics.repositories}`,
      badge: "CODEBASE",
      detail: `${ossMetrics.repositories} repositories with PR activity; ${mergedRepositories.size} contain merged work.`,
      color: "border-blue-500/40 bg-blue-950/30 text-blue-400",
    },
    {
      label: "Foundry Contract Tests",
      value: foundryTests,
      badge: "SECURITY",
      detail: "Invariants & fuzz testing across 13 test suites in KEYMESH",
      color: "border-amber-400/40 bg-amber-950/30 text-amber-400",
    },
    {
      label: "Engineered Projects",
      value: `${allProjectList.length}`,
      badge: "FULL-STACK",
      detail: "Sandboxed runtimes, threshold cryptography & AI automation",
      color: "border-purple-500/40 bg-purple-950/30 text-purple-400",
    },
    {
      label: "Sandboxed Languages",
      value: sandboxedLanguages,
      badge: "SYSTEMS",
      detail: "Python, Node.js, C++, and Java in TheBlackBox runner",
      color: "border-cyan-500/40 bg-cyan-950/30 text-cyan-400",
    },
    {
      label: "Rate-Limit Algorithms",
      value: rateLimitAlgorithms,
      badge: "DISTRIBUTED",
      detail: "Fixed Window, Sliding Window, Token Bucket, Leaky Bucket",
      color: "border-rose-500/40 bg-rose-950/30 text-rose-400",
    },
  ];

  return (
    <section
      id="metrics"
      className="relative overflow-hidden bg-[#0a0f1d] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl space-y-3">
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
      </Reveal>

      {/* Metrics Transit Grid */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {metricsGrid.map((metric, index) => (
          <Reveal key={metric.label} className="h-full" delay={index * 45}>
            <MetricCard metric={metric} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
