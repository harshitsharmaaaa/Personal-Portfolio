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
      { threshold: 0.4 },
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
    <div ref={ref} className="rail-metric" style={{ "--metric-color": metric.color } as React.CSSProperties}>
      <span className="rail-metric__badge">{metric.badge}</span>
      <div className="rail-metric__value">
        <span className="sr-only">{metric.value}</span>
        <span aria-hidden="true">{display}</span>
      </div>
      <div className="rail-metric__label">{metric.label}</div>
      <p className="rail-metric__detail">{metric.detail}</p>
    </div>
  );
}

export default function MetricsSection() {
  const ossMetrics = getContributionMetrics();
  const mergedRepositories = new Set(
    contributions
      .filter((contribution) => getContributionStatus(contribution) === "merged")
      .map((contribution) => contribution.repository),
  );

  const keymesh = projects["projects/keymesh.ts"];
  const blackbox = projects["projects/blackbox.ts"];
  const rateLimiter = projects["projects/rate-limiter.ts"];

  const foundryTests =
    keymesh.metrics?.find((metric) => metric.label === "Foundry Tests")?.value ?? "268+";
  const sandboxedLanguages = leadingNumber(
    blackbox.metrics?.find((metric) => metric.label === "Languages")?.value,
    "4",
  );
  const rateLimitAlgorithms = leadingNumber(
    rateLimiter.highlights.find((highlight) => highlight.startsWith("4 algorithms")),
    "4",
  );

  const metricsGrid: Metric[] = [
    {
      label: "Upstream PRs Merged",
      value: `${ossMetrics.merged}`,
      badge: "OSS",
      detail: `Across ${mergedRepositories.size} repositories; Draco #9/#11 cover overlapping work.`,
      color: "#34c78b",
    },
    {
      label: "Upstream Repositories",
      value: `${ossMetrics.repositories}`,
      badge: "CODEBASE",
      detail: `${ossMetrics.repositories} repositories with PR activity; ${mergedRepositories.size} contain merged work.`,
      color: "#4f8cff",
    },
    {
      label: "Foundry Contract Tests",
      value: foundryTests,
      badge: "SECURITY",
      detail: "Invariants & fuzz testing across 13 test suites in KEYMESH",
      color: "#f4c04f",
    },
    {
      label: "Engineered Projects",
      value: `${allProjectList.length}`,
      badge: "FULL-STACK",
      detail: "Sandboxed runtimes, threshold cryptography & AI automation",
      color: "#b58cff",
    },
    {
      label: "Sandboxed Languages",
      value: sandboxedLanguages,
      badge: "SYSTEMS",
      detail: "Python, Node.js, C++, and Java in TheBlackBox runner",
      color: "#67c9e8",
    },
    {
      label: "Rate-Limit Algorithms",
      value: rateLimitAlgorithms,
      badge: "DISTRIBUTED",
      detail: "Fixed Window, Sliding Window, Token Bucket, Leaky Bucket",
      color: "#f05257",
    },
  ];

  return (
    <section id="metrics" className="rail-section rail-section--metrics" aria-labelledby="metrics-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> STOP 07 <span className="rail-eyebrow__sep">·</span> SYSTEM METRICS</p>
        <h2 id="metrics-heading">By the <span>numbers.</span></h2>
        <p className="rail-section__intro">
          Quantifiable milestones derived strictly from verified implementations, test suites and
          merged pull requests.
        </p>
      </Reveal>

      <div className="rail-metrics">
        {metricsGrid.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 40}>
            <MetricCard metric={metric} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
