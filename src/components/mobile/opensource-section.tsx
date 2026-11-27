"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  contributions,
  getContributionMetrics,
  getContributionStatus,
  getContributionStatusLabel,
  type Contribution,
} from "@/data/contributions";
import Reveal from "./reveal";

type FilterTab = "all" | "merged" | "approved" | "open";

function statusTone(contribution: Contribution) {
  const status = getContributionStatus(contribution);
  if (status === "merged") return "merged";
  if (status === "approved" || status === "reviewer-validated") return "approved";
  if (status === "closed") return "closed";
  return "open";
}

export default function OpenSourceSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const metrics = getContributionMetrics();

  const filtered = useMemo(() => {
    if (activeTab === "all") return contributions;
    if (activeTab === "merged") return contributions.filter((c) => getContributionStatus(c) === "merged");
    if (activeTab === "approved") {
      return contributions.filter((c) => {
        const status = getContributionStatus(c);
        return status === "approved" || status === "reviewer-validated";
      });
    }
    return contributions.filter((c) => {
      const status = getContributionStatus(c);
      return status === "open" || status === "awaiting-triage" || status === "fork-work";
    });
  }, [activeTab]);

  const tabs: { id: FilterTab; label: string; count: number }[] = useMemo(
    () => [
      { id: "all", label: "All work", count: contributions.length },
      { id: "merged", label: "Merged", count: metrics.merged },
      {
        id: "approved",
        label: "Validated",
        count: contributions.filter((c) =>
          ["approved", "reviewer-validated"].includes(getContributionStatus(c)),
        ).length,
      },
      {
        id: "open",
        label: "In review",
        count: contributions.filter((c) =>
          ["open", "awaiting-triage", "fork-work"].includes(getContributionStatus(c)),
        ).length,
      },
    ],
    [metrics.merged],
  );

  const displayed = filtered.slice(0, visibleCount);

  return (
    <section id="open-source" className="rail-section rail-section--oss" aria-labelledby="oss-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> STOP 05 <span className="rail-eyebrow__sep">·</span> UPSTREAM</p>
        <h2 id="oss-heading">Work that ships <span>elsewhere.</span></h2>
        <p className="rail-section__intro">
          Verified pull requests, fixes and review-validated work in real repositories. Merged and
          in-review contributions are counted separately; fork-only work is never presented as merged.
        </p>
        <Link href="/contributions" className="rail-inline-link">
          Open the dedicated contributions explorer <span aria-hidden="true">↗</span>
        </Link>
      </Reveal>

      <div className="rail-oss__tabs" role="group" aria-label="Filter contributions by status">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={activeTab === tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            onClick={() => {
              setActiveTab(tab.id);
              setVisibleCount(6);
            }}
          >
            {tab.label}<span>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="rail-oss__list">
        {displayed.map((contribution, index) => {
          const tone = statusTone(contribution);
          return (
            <Reveal key={contribution.id} delay={Math.min(index, 5) * 35}>
              <article className="rail-oss__card">
                <div className="rail-oss__top">
                  <a href={contribution.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    {contribution.repository}
                  </a>
                  <span className={`rail-oss__status rail-oss__status--${tone}`}>
                    {getContributionStatusLabel(contribution)}
                  </span>
                </div>

                <div className="rail-oss__title-row">
                  <span className="rail-oss__number">#{contribution.number}</span>
                  <h3>{contribution.title}</h3>
                </div>

                <p className="rail-oss__summary">{contribution.summary}</p>
                <p className="rail-oss__detail"><strong>Problem.</strong> {contribution.problem}</p>
                <p className="rail-oss__detail"><strong>Change.</strong> {contribution.solution}</p>

                {contribution.reviewEvidence && !contribution.reviewEvidence.automated && (
                  <p className="rail-oss__review"><strong>Review.</strong> {contribution.reviewEvidence.summary}</p>
                )}

                <div className="rail-oss__tech">
                  {contribution.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}
                </div>

                <div className="rail-oss__foot">
                  <a href={contribution.url} target="_blank" rel="noopener noreferrer">
                    View upstream {contribution.kind === "pull-request" ? "PR" : "issue"} #{contribution.number} <span aria-hidden="true">↗</span>
                  </a>
                  <span>Verified {contribution.verifiedAt}</span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {visibleCount < filtered.length && (
        <button
          type="button"
          className="rail-oss__more"
          onClick={() => setVisibleCount((count) => count + 6)}
        >
          Show more contributions <span>({filtered.length - visibleCount} remaining)</span>
        </button>
      )}
    </section>
  );
}
