import Link from "next/link";
import {
  contributions,
  getContributionStatusLabel,
  type Contribution,
} from "@/data/contributions";

const featuredIds = [
  "draco-11",
  "traceroot-2607",
  "traceroot-2526",
  "traceroot-2672",
];

function statusClass(contribution: Contribution) {
  if (contribution.kind === "pull-request" && contribution.upstreamState === "merged") {
    return "text-[#4ec9b0]";
  }
  if (getContributionStatusLabel(contribution).startsWith("Approved")) {
    return "text-[#d7ba7d]";
  }
  return "text-[#9cdcfe]";
}

export default function OpenSourcePreview({ theme }: { theme: "dark" | "light" }) {
  const items = featuredIds
    .map((id) => contributions.find((contribution) => contribution.id === id))
    .filter((contribution): contribution is Contribution => contribution !== undefined);
  const muted = theme === "dark" ? "text-[#858585]" : "text-[#6e7781]";
  const body = theme === "dark" ? "text-[#d4d4d4]" : "text-[#1f2328]";
  const panel = theme === "dark" ? "border-[#3c3c3c] bg-[#252526]" : "border-[#d0d7de] bg-[#f6f8fa]";

  return (
    <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 sm:px-6 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3c3c3c] pb-4">
        <div>
          <p className="text-xs text-[#6a9955]">{"// upstream engineering work"}</p>
          <h1 className="mt-1 text-xl font-semibold text-[#dcdcaa] sm:text-2xl">
            Open Source
          </h1>
          <p className={`mt-2 max-w-2xl text-sm leading-6 ${body}`}>
            Root-cause fixes and tested improvements across security, observability,
            workflow execution, and developer tooling.
          </p>
        </div>
        <Link
          href="/contributions"
          className="rounded border border-[#007acc] px-3 py-2 text-sm text-[#9cdcfe] transition hover:bg-[#094771] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fc1ff]"
        >
          Explore all contributions →
        </Link>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {items.map((contribution) => (
          <article
            key={contribution.id}
            className={`min-w-0 border ${panel} p-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href={contribution.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold tracking-wide text-[#569cd6] hover:underline focus-visible:outline-2 focus-visible:outline-[#4fc1ff]"
              >
                {contribution.repository}
              </a>
              <span className={`text-xs ${statusClass(contribution)}`}>
                {getContributionStatusLabel(contribution)}
              </span>
            </div>
            <h2 className={`mt-2 text-sm font-semibold leading-5 ${body}`}>
              {contribution.title}
            </h2>
            <p className={`mt-2 text-xs leading-5 ${muted}`}>
              {contribution.summary}
            </p>
            <a
              href={contribution.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-xs text-[#ce9178] underline decoration-[#ce9178]/50 underline-offset-4 hover:text-[#f4a688] focus-visible:outline-2 focus-visible:outline-[#4fc1ff]"
            >
              View upstream {contribution.kind === "pull-request" ? "PR" : "issue"} #
              {contribution.number}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
