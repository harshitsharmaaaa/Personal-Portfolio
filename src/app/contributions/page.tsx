import type { Metadata } from "next";
import Link from "next/link";
import ContributionBrowser from "@/components/contributions/contribution-browser";
import {
  contributions,
  getContributionMetrics,
  getContributionStatusLabel,
  type Contribution,
} from "@/data/contributions";

export const metadata: Metadata = {
  title: "Open Source Contributions | Harshit Sharma",
  description:
    "Verified open-source engineering work across security, reliability, observability, backend correctness, and developer tooling.",
};

const featuredIds = [
  "draco-11",
  "traceroot-2607",
  "traceroot-2526",
  "traceroot-2672",
  "conductor-1747",
  "hono-5565",
];

const metricLabels = [
  ["merged", "Upstream PRs merged"],
  ["repositories", "Upstream repositories"],
  ["open", "Open upstream PRs"],
  ["approved", "Approved · awaiting merge"],
] as const;

function FeaturedContribution({ contribution }: { contribution: Contribution }) {
  const merged = contribution.kind === "pull-request" && contribution.upstreamState === "merged";
  const approved = getContributionStatusLabel(contribution).startsWith("Approved");

  return (
    <article className="min-w-0 border border-[#3c3c3c] bg-[#252526] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <a
          href={contribution.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-[#569cd6] hover:underline focus-visible:outline-2 focus-visible:outline-[#4fc1ff]"
        >
          {contribution.repository}
        </a>
        <span className={`text-xs ${merged ? "text-[#4ec9b0]" : approved ? "text-[#d7ba7d]" : "text-[#9cdcfe]"}`}>
          {getContributionStatusLabel(contribution)}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold leading-5 text-[#dcdcaa]">
        {contribution.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-[#cccccc]">
        <span className="font-semibold text-[#569cd6]">Problem: </span>
        {contribution.problem}
      </p>
      <p className="mt-2 text-xs leading-5 text-[#cccccc]">
        <span className="font-semibold text-[#569cd6]">Change: </span>
        {contribution.solution}
      </p>
      <p className="mt-2 text-xs leading-5 text-[#858585]">
        <span className="font-semibold text-[#9cdcfe]">Why it matters: </span>
        {contribution.impact}
      </p>
      {contribution.validation && (
        <p className="mt-2 text-xs leading-5 text-[#858585]">
          <span className="font-semibold text-[#9cdcfe]">Validation: </span>
          {contribution.validation}
        </p>
      )}
      {contribution.reviewEvidence && !contribution.reviewEvidence.automated && (
        <p className="mt-2 border-l-2 border-[#d7ba7d] pl-2 text-xs leading-5 text-[#d7ba7d]">
          Review: {contribution.reviewEvidence.summary}
        </p>
      )}
      <a
        href={contribution.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex text-xs text-[#ce9178] underline decoration-[#ce9178]/50 underline-offset-4 hover:text-[#f4a688] focus-visible:outline-2 focus-visible:outline-[#4fc1ff]"
      >
        View upstream {contribution.kind === "pull-request" ? "PR" : "issue"} #{contribution.number}
      </a>
    </article>
  );
}

export default function ContributionsPage() {
  const metrics = getContributionMetrics();
  const featured = featuredIds
    .map((id) => contributions.find((contribution) => contribution.id === id))
    .filter((contribution): contribution is Contribution => contribution !== undefined);
  const humanFeedback = contributions.filter(
    (item) => item.reviewEvidence && !item.reviewEvidence.automated,
  );

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-6 font-mono text-[#d4d4d4] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#3c3c3c] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              href="/"
              className="text-[#9cdcfe] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fc1ff]"
            >
              ← Back to portfolio
            </Link>
            <a
              href="https://github.com/harshitsharmaaaa"
              target="_blank"
              rel="noreferrer"
              className="text-[#9cdcfe] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fc1ff]"
            >
              GitHub profile ↗
            </a>
          </div>
          <p className="mt-8 text-xs text-[#6a9955]">{"// reviewed upstream work"}</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#dcdcaa] sm:text-3xl">
            Open Source Contributions
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#cccccc]">
            Engineering fixes, reliability improvements, security hardening, and
            developer tooling across open-source projects.
          </p>
          <p className="mt-3 text-[11px] leading-5 text-[#858585]">
            Statuses verified against upstream GitHub records on 24 Oct 2026.
            Fork-only work and issue reports are not counted as merged pull requests.
          </p>
        </header>

        <section aria-label="Contribution metrics" className="mt-6 grid grid-cols-2 gap-px border border-[#3c3c3c] bg-[#3c3c3c] lg:grid-cols-4">
          {metricLabels.map(([key, label]) => (
            <div key={key} className="bg-[#1e1e1e] p-4 sm:p-5">
              <p className="text-2xl font-semibold text-[#4ec9b0]">
                {metrics[key]}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#858585]">{label}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="featured-heading" className="mt-10">
          <div className="mb-4">
            <p className="text-xs text-[#6a9955]">{"// selected engineering work"}</p>
            <h2 id="featured-heading" className="mt-1 text-lg font-semibold text-[#dcdcaa]">
              Featured contributions
            </h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {featured.map((item) => (
              <FeaturedContribution key={item.id} contribution={item} />
            ))}
          </div>
        </section>

        <ContributionBrowser />

        <section aria-labelledby="feedback-heading" className="mt-10 border-t border-[#3c3c3c] pt-6">
          <p className="text-xs text-[#6a9955]">{"// human review evidence"}</p>
          <h2 id="feedback-heading" className="mt-1 text-lg font-semibold text-[#dcdcaa]">
            Maintainer and contributor feedback
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {humanFeedback.map((item) => (
              <article key={item.id} className="border border-[#3c3c3c] bg-[#1e1e1e] p-4">
                <p className="text-xs font-semibold text-[#d7ba7d]">
                  {item.reviewEvidence?.reviewer} · {item.repository}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#cccccc]">
                  {item.reviewEvidence?.summary}
                </p>
                <a
                  href={item.reviewEvidence?.url ?? item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-[#ce9178] underline underline-offset-4 hover:text-[#f4a688]"
                >
                  Read the original discussion
                </a>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#3c3c3c] pt-5 text-xs text-[#858585]">
          <span>Static contribution records · last verified 24 Oct 2026</span>
          <Link href="/" className="text-[#9cdcfe] hover:text-white">
            Return to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
