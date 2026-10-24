"use client";

import { useMemo, useState } from "react";
import {
  contributions,
  getContributionStatus,
  getContributionStatusLabel,
  type Contribution,
  type ContributionStatus,
} from "@/data/contributions";

const statusOrder: ContributionStatus[] = [
  "merged",
  "approved",
  "open",
  "closed",
  "reviewer-validated",
  "awaiting-triage",
  "fork-work",
];

const statusTone: Record<ContributionStatus, string> = {
  merged: "text-[#4ec9b0]",
  approved: "text-[#d7ba7d]",
  open: "text-[#9cdcfe]",
  closed: "text-[#c586c0]",
  "reviewer-validated": "text-[#d7ba7d]",
  "awaiting-triage": "text-[#ce9178]",
  "fork-work": "text-[#ce9178]",
};

function ContributionCard({ contribution }: { contribution: Contribution }) {
  const status = getContributionStatus(contribution);

  return (
    <details className="group border border-[#3c3c3c] bg-[#1e1e1e] open:bg-[#222222]">
      <summary className="cursor-pointer list-none p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fc1ff] [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="font-semibold text-[#569cd6]">
                {contribution.repository}
              </span>
              <span className="text-[#858585]">·</span>
              <span className="text-[#858585]">
                {contribution.kind === "pull-request" ? "PR" : "Issue"} #
                {contribution.number}
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-5 text-[#dcdcaa]">
              {contribution.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#cccccc]">
              {contribution.summary}
            </p>
          </div>
          <span className={`shrink-0 text-xs ${statusTone[status]}`}>
            {getContributionStatusLabel(contribution)}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {contribution.domains.map((domain) => (
            <span
              key={domain}
              className="border border-[#454545] bg-[#2d2d30] px-2 py-0.5 text-[10px] text-[#ce9178]"
            >
              {domain}
            </span>
          ))}
          <span className="ml-auto text-[10px] text-[#858585] group-open:hidden">
            Details +
          </span>
          <span className="ml-auto hidden text-[10px] text-[#858585] group-open:inline">
            Details −
          </span>
        </div>
      </summary>

      <div className="space-y-4 border-t border-[#3c3c3c] px-4 py-4 text-xs leading-5 text-[#cccccc]">
        <div>
          <h4 className="mb-1 font-semibold text-[#569cd6]">Problem</h4>
          <p>{contribution.problem}</p>
        </div>
        <div>
          <h4 className="mb-1 font-semibold text-[#569cd6]">Implementation</h4>
          <p>{contribution.solution}</p>
        </div>
        <div>
          <h4 className="mb-1 font-semibold text-[#569cd6]">Why it matters</h4>
          <p>{contribution.impact}</p>
        </div>
        {contribution.validation && (
          <div>
            <h4 className="mb-1 font-semibold text-[#569cd6]">
              Validation reported in source
            </h4>
            <p>{contribution.validation}</p>
          </div>
        )}
        {contribution.reviewEvidence && (
          <div className="border-l-2 border-[#d7ba7d] pl-3">
            <h4 className="mb-1 font-semibold text-[#d7ba7d]">
              {contribution.reviewEvidence.automated
                ? "Automated review context"
                : `Review context · ${contribution.reviewEvidence.reviewer}`}
            </h4>
            <p>{contribution.reviewEvidence.summary}</p>
            <a
              href={contribution.reviewEvidence.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-[#ce9178] underline underline-offset-4 hover:text-[#f4a688]"
            >
              Open review discussion
            </a>
          </div>
        )}
        {contribution.kind === "pull-request" &&
          contribution.reviewEvidence?.state === "approved" &&
          contribution.reviewEvidence.commit !== contribution.headCommit && (
            <p className="text-[#d7ba7d]">
              The recorded approval predates the current PR head and is not counted
              as a current-head approval.
            </p>
          )}
        <div className="flex flex-wrap items-center gap-3 border-t border-[#3c3c3c] pt-3">
          <a
            href={contribution.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#4fc1ff] underline underline-offset-4 hover:text-white"
          >
            Open upstream {contribution.kind === "pull-request" ? "pull request" : "issue"} #{contribution.number}
          </a>
          {contribution.kind === "issue-fork" && (
            <a
              href={contribution.forkUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#ce9178] underline underline-offset-4 hover:text-white"
            >
              View fork work
            </a>
          )}
          <span className="ml-auto text-[10px] text-[#858585]">
            Verified {contribution.verifiedAt}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#858585]">
          {contribution.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </details>
  );
}

export default function ContributionBrowser() {
  const [query, setQuery] = useState("");
  const [repository, setRepository] = useState("");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<ContributionStatus | "">("");

  const repositories = useMemo(
    () => [...new Set(contributions.map((item) => item.repository))].sort(),
    [],
  );
  const domains = useMemo(
    () => [...new Set(contributions.flatMap((item) => item.domains))].sort(),
    [],
  );
  const statuses = useMemo(
    () =>
      statusOrder.filter((value) =>
        contributions.some((item) => getContributionStatus(item) === value),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return contributions.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          item.repository,
          item.title,
          item.summary,
          item.problem,
          item.solution,
          item.impact,
          ...item.domains,
          ...item.technologies,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (!repository || item.repository === repository) &&
        (!domain || item.domains.includes(domain)) &&
        (!status || getContributionStatus(item) === status)
      );
    });
  }, [domain, query, repository, status]);

  const grouped = statusOrder
    .map((groupStatus) => ({
      status: groupStatus,
      items: filtered.filter((item) => getContributionStatus(item) === groupStatus),
    }))
    .filter((group) => group.items.length > 0);
  const hasFilters = Boolean(query || repository || domain || status);

  return (
    <section aria-labelledby="history-heading" className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[#6a9955]">{"// verified upstream records"}</p>
          <h2 id="history-heading" className="mt-1 text-lg font-semibold text-[#dcdcaa]">
            Contribution history
          </h2>
        </div>
        <p aria-live="polite" className="text-xs text-[#858585]">
          Showing {filtered.length} of {contributions.length} records
        </p>
      </div>

      <div className="grid gap-3 border border-[#3c3c3c] bg-[#252526] p-4 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(150px,0.7fr))_auto]">
        <div className="sm:col-span-2 xl:col-span-1">
          <label htmlFor="contribution-search" className="mb-1 block text-xs text-[#9cdcfe]">
            Search
          </label>
          <input
            id="contribution-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Repo, bug, technology..."
            className="w-full border border-[#454545] bg-[#1e1e1e] px-3 py-2 text-sm text-[#d4d4d4] placeholder:text-[#858585] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4fc1ff]"
          />
        </div>
        <div>
          <label htmlFor="contribution-repository" className="mb-1 block text-xs text-[#9cdcfe]">
            Repository
          </label>
          <select
            id="contribution-repository"
            value={repository}
            onChange={(event) => setRepository(event.target.value)}
            className="w-full border border-[#454545] bg-[#1e1e1e] px-3 py-2 text-sm text-[#d4d4d4] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4fc1ff]"
          >
            <option value="">All repositories</option>
            {repositories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contribution-domain" className="mb-1 block text-xs text-[#9cdcfe]">
            Engineering domain
          </label>
          <select
            id="contribution-domain"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            className="w-full border border-[#454545] bg-[#1e1e1e] px-3 py-2 text-sm text-[#d4d4d4] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4fc1ff]"
          >
            <option value="">All domains</option>
            {domains.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contribution-status" className="mb-1 block text-xs text-[#9cdcfe]">
            Contribution status
          </label>
          <select
            id="contribution-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ContributionStatus | "")
            }
            className="w-full border border-[#454545] bg-[#1e1e1e] px-3 py-2 text-sm text-[#d4d4d4] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4fc1ff]"
          >
            <option value="">All statuses</option>
            {statuses.map((value) => {
              const representative = contributions.find(
                (item) => getContributionStatus(item) === value,
              );
              return (
                <option key={value} value={value}>
                  {representative && getContributionStatusLabel(representative)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRepository("");
              setDomain("");
              setStatus("");
            }}
            disabled={!hasFilters}
            className="w-full border border-[#555] px-3 py-2 text-sm text-[#d4d4d4] hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fc1ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear filters
          </button>
        </div>
      </div>

      {grouped.length === 0 ? (
        <div className="mt-4 border border-dashed border-[#555] p-8 text-center">
          <p className="text-sm text-[#dcdcaa]">No contributions match those filters.</p>
          <p className="mt-2 text-xs text-[#858585]">
            Try another search or clear the selected filters.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-7">
          {grouped.map((group) => {
            const representative = group.items[0];
            return (
              <section key={group.status} aria-labelledby={`status-${group.status}`}>
                <h3
                  id={`status-${group.status}`}
                  className={`mb-2 border-b border-[#3c3c3c] pb-2 text-xs font-semibold uppercase tracking-wide ${statusTone[group.status]}`}
                >
                  {getContributionStatusLabel(representative)}{" "}
                  <span className="text-[#858585]">({group.items.length})</span>
                </h3>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <ContributionCard key={item.id} contribution={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
