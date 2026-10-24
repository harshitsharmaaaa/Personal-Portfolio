export type ContributionKind = "pull-request" | "issue-fork";
export type PullRequestState = "open" | "closed" | "merged";
export type ReviewState = "approved" | "changes-requested" | "commented";
export type ContributionStatus =
  | "merged"
  | "approved"
  | "open"
  | "closed"
  | "reviewer-validated"
  | "awaiting-triage"
  | "fork-work";

type ReviewEvidence = {
  reviewer: string;
  state: ReviewState;
  summary: string;
  url: string;
  commit?: string;
  automated?: boolean;
};

type ContributionBase = {
  id: string;
  repository: string;
  repositoryUrl: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  domains: string[];
  technologies: string[];
  url: string;
  validation?: string;
  reviewEvidence?: ReviewEvidence;
  verifiedAt: string;
  featured?: boolean;
};

export type PullRequestContribution = ContributionBase & {
  kind: "pull-request";
  number: number;
  upstreamState: PullRequestState;
  mergedAt?: string;
  headCommit?: string;
  reviewEvidence?: ReviewEvidence;
};

export type IssueForkContribution = ContributionBase & {
  kind: "issue-fork";
  number: number;
  status: "reviewer-validated" | "awaiting-triage" | "fork-work";
  forkUrl: string;
  reviewEvidence?: ReviewEvidence;
};

export type Contribution = PullRequestContribution | IssueForkContribution;

export const contributions: Contribution[] = [
  {
    id: "draco-11",
    kind: "pull-request",
    number: 11,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Production security and reliability hardening",
    summary:
      "Closed production gaps across outbound fetching, proxy trust, TLS, retrieval limits, rate limiting, and document ingestion.",
    problem:
      "Several production paths accepted unsafe network or TLS settings, lacked bounded work, or failed open when infrastructure was unavailable.",
    solution:
      "Added private-host protections, trusted proxy CIDRs, safe TLS defaults, execution and ingestion bounds, fail-closed rate limiting, and regression coverage.",
    impact:
      "Raises security and reliability defaults across user-controlled fetching, retrieval, and ingestion.",
    domains: ["Security", "Reliability", "Backend correctness", "Testing"],
    technologies: ["Python", "OpenSearch", "Redis", "PDF ingestion"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/11",
    upstreamState: "merged",
    mergedAt: "2026-10-23T12:25:57Z",
    validation:
      "PR reports 114 application checks passed (3 skipped), 57 unit/reliability tests passed, plus compileall and diff checks. Full integration coverage was limited by missing optional packages and unavailable services.",
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "draco-10",
    kind: "pull-request",
    number: 10,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Document the current system architecture",
    summary:
      "Reworked the project README to describe the current architecture.",
    problem: "The README no longer reflected the project's current architecture.",
    solution: "Updated the README with the current architecture and project structure.",
    impact: "Makes the system easier for contributors to understand and navigate.",
    domains: ["Documentation"],
    technologies: ["Markdown"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/10",
    upstreamState: "merged",
    mergedAt: "2026-10-22T15:34:53Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-9",
    kind: "pull-request",
    number: 9,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Address four security and reliability issues",
    summary:
      "Consolidated production security and backend reliability fixes; later hardening is summarized in PR #11.",
    problem: "The backend had multiple security and reliability gaps.",
    solution: "Submitted a consolidated set of fixes across the affected backend paths.",
    impact: "Contributed to the project's production hardening; avoid double-counting overlapping work with PR #11.",
    domains: ["Security", "Reliability", "Backend correctness"],
    technologies: ["Python", "Backend"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/9",
    upstreamState: "merged",
    mergedAt: "2026-10-22T08:56:10Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-8",
    kind: "pull-request",
    number: 8,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Correct retrieval behavior",
    summary: "Fixed a retrieval correctness issue.",
    problem: "The retrieval path could return incorrect results.",
    solution: "Corrected the retrieval behavior in the upstream fix.",
    impact: "Improves the correctness of retrieved results.",
    domains: ["Backend correctness", "Reliability"],
    technologies: ["Python", "Retrieval"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/8",
    upstreamState: "merged",
    mergedAt: "2026-10-14T13:34:10Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-7",
    kind: "pull-request",
    number: 7,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Strengthen security and input validation",
    summary: "Added security and validation hardening.",
    problem: "Input and security boundaries needed stronger validation.",
    solution: "Hardened validation and security handling in the affected paths.",
    impact: "Reduces exposure to invalid or unsafe inputs.",
    domains: ["Security", "Backend correctness"],
    technologies: ["Python"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/7",
    upstreamState: "merged",
    mergedAt: "2026-10-14T13:34:32Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-6",
    kind: "pull-request",
    number: 6,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Make resource lifecycles safer",
    summary: "Improved deterministic resource lifecycle handling.",
    problem: "Some resources were not managed safely through their lifecycle.",
    solution: "Adjusted the affected lifecycle handling to close and release resources safely.",
    impact: "Reduces resource leaks and improves reliability.",
    domains: ["Reliability", "Backend correctness"],
    technologies: ["Python", "SQLite"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/6",
    upstreamState: "merged",
    mergedAt: "2026-10-14T13:34:57Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-5",
    kind: "pull-request",
    number: 5,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Follow up on backend reliability fixes",
    summary:
      "Addressed follow-up reliability issues across retrieval, Qdrant, detector, and calibration paths.",
    problem: "Several backend paths needed reliability follow-up.",
    solution: "Applied targeted fixes across retrieval, Qdrant, detector, and calibration code.",
    impact: "Improves consistency across core backend workflows.",
    domains: ["Reliability", "Backend correctness"],
    technologies: ["Python", "Qdrant"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/5",
    upstreamState: "merged",
    mergedAt: "2026-10-13T11:39:22Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-4",
    kind: "pull-request",
    number: 4,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Improve reliability across backend services",
    summary: "Fixed reliability issues in tools, memory, configuration, and routes.",
    problem: "Several backend components had reliability edge cases.",
    solution: "Applied focused fixes across tools, memory, configuration, and routes.",
    impact: "Improves behavior across commonly used backend paths.",
    domains: ["Reliability", "Backend correctness"],
    technologies: ["Python", "Backend"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/4",
    upstreamState: "merged",
    mergedAt: "2026-10-13T11:26:56Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-3",
    kind: "pull-request",
    number: 3,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Consolidate backend reliability fixes",
    summary: "Consolidated registry, reciprocal-rank fusion, settings, and test fixes.",
    problem: "Backend registry and retrieval paths needed correctness and reliability work.",
    solution: "Updated registry and settings behavior, fixed RRF, and added tests.",
    impact: "The merged change also superseded earlier Draco PRs #1 and #2.",
    domains: ["Reliability", "Backend correctness", "Testing"],
    technologies: ["Python", "SQLite", "Retrieval"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/3",
    upstreamState: "merged",
    mergedAt: "2026-10-12T18:24:18Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2533",
    kind: "pull-request",
    number: 2533,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Pin GitHub Actions to immutable commit SHAs",
    summary:
      "Pinned external GitHub Actions in six workflow files to verified SHAs while retaining readable version comments.",
    problem: "Mutable action tags can move and change the code executed by CI.",
    solution: "Used verified immutable action commit references without changing intended workflow behavior.",
    impact: "Reduces CI supply-chain risk while preserving human-readable release versions.",
    domains: ["CI", "Security"],
    technologies: ["GitHub Actions", "YAML"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2533",
    upstreamState: "merged",
    mergedAt: "2026-10-14T06:36:34Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2648",
    kind: "pull-request",
    number: 2648,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Preserve precision in alert thresholds",
    summary:
      "Changed sub-dollar currency formatting to preserve three significant digits and added a regression case such as 0.0004567 → 0.000457.",
    problem: "Default locale formatting rounded small alert thresholds to misleading values.",
    solution: "Added shared threshold formatting that preserves significant precision for small currency amounts.",
    impact: "Keeps displayed alert thresholds faithful to the configured value.",
    domains: ["Observability", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "React"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2648",
    upstreamState: "merged",
    mergedAt: "2026-10-21T06:36:56Z",
    headCommit: "ca2aa243a4054da2de480c608265267fba6d6b99",
    validation: "The PR reports 142 focused resource-card tests passing.",
    reviewEvidence: {
      reviewer: "GabrielDrapor",
      state: "approved",
      summary:
        "Asked for a more discriminating rounding regression; the example was added before approval and merge.",
      url: "https://github.com/traceroot-ai/traceroot/pull/2648",
    },
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2607",
    kind: "pull-request",
    number: 2607,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Count completed detector runs toward scan quota",
    summary:
      "Corrected quota accounting so failed runs without inference do not consume scan quota or distort overage calculations.",
    problem:
      "Every detector-run row was counted, including failed runs; retry versions could also leave stale completed rows beside newer failures.",
    solution:
      "Collapsed each run to its latest version before counting completed runs, and tracked inference usage for billing correctness.",
    impact:
      "Keeps scan limits and paid usage calculations aligned with actual completed work and inference.",
    domains: ["Backend correctness", "Reliability", "Testing"],
    technologies: ["TypeScript", "ClickHouse", "SQL"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2607",
    upstreamState: "merged",
    mergedAt: "2026-10-16T08:01:58Z",
    headCommit: "0a1f6424137d403a5ff79ab85c496730312c22bf",
    validation: "Reviewer tested retries, ties, window boundaries, and a second project against ClickHouse.",
    reviewEvidence: {
      reviewer: "GabrielDrapor",
      state: "approved",
      summary:
        "Validated the revised accounting against ClickHouse and confirmed the approach before merge.",
      url: "https://github.com/traceroot-ai/traceroot/pull/2607",
    },
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "self-healing-hybrid-rag-1",
    kind: "pull-request",
    number: 1,
    repository: "self-healing-hybrid-RAG",
    repositoryUrl: "https://github.com/AmartyaRanjan/self-healing-hybrid-RAG",
    title: "Setup and robustness improvements",
    summary: "Contributed setup and robustness changes to the project.",
    problem: "The project needed setup and robustness improvements.",
    solution: "Submitted the setup and robustness changes in the merged PR.",
    impact: "Improved the project's setup and baseline reliability.",
    domains: ["Reliability", "Documentation"],
    technologies: ["Python"],
    url: "https://github.com/AmartyaRanjan/self-healing-hybrid-RAG/pull/1",
    upstreamState: "merged",
    mergedAt: "2026-10-06T19:53:01Z",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2526",
    kind: "pull-request",
    number: 2526,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Make alert delivery badges match retry behavior",
    summary:
      "Aligned undelivered-alert messages with worker retry behavior and carried notification severity through the public schema and assistant card.",
    problem:
      "Badge wording could imply redelivery when a failure was permanent or retries were exhausted; severity was also missing from a public display path.",
    solution:
      "Centralized delivery-reason logic, distinguished retryable and permanent cases, and added severity propagation plus regression tests.",
    impact:
      "Makes alert status clearer without promising a retry the worker will not perform.",
    domains: ["Observability", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "React", "OpenAPI"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2526",
    upstreamState: "open",
    headCommit: "6b8b58bdfcc353f476490103eba0732d26c01ffb",
    validation: "The packet reports 27/27 focused alert display and list-card tests passing.",
    reviewEvidence: {
      reviewer: "Prasad8830",
      state: "approved",
      summary:
        "Checked badge wording against worker behavior and approved the current PR head on 22 Oct 2026.",
      url: "https://github.com/traceroot-ai/traceroot/pull/2526",
      commit: "6b8b58bdfcc353f476490103eba0732d26c01ffb",
    },
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "conductor-1747",
    kind: "pull-request",
    number: 1747,
    repository: "Conductor",
    repositoryUrl: "https://github.com/conductor-oss/conductor",
    title: "Guard malformed failure-workflow parameter paths",
    summary:
      "Validates failureWorkflow parameter expressions before indexing, preventing termination from crashing on malformed paths.",
    problem:
      "Short expressions such as `$` or `$.input` caused an array-index exception during workflow termination.",
    solution:
      "Validates path components, logs invalid values, and skips starting an invalid failure workflow while preserving valid paths.",
    impact: "Prevents malformed configuration from leaving a workflow stuck during termination.",
    domains: ["Backend correctness", "Reliability", "Testing"],
    technologies: ["Java", "Workflow engines"],
    url: "https://github.com/conductor-oss/conductor/pull/1747",
    upstreamState: "open",
    headCommit: "930d5ed68e78560b2901602d3f72633c616eeb9a",
    validation: "Adds regression coverage for malformed expressions and defensive null/type handling.",
    reviewEvidence: {
      reviewer: "jhaabhijeet864",
      state: "approved",
      summary:
        "Approved an earlier commit and praised the focused fix; approval commit differs from the current PR head, so it is not counted as current-head approval.",
      url: "https://github.com/conductor-oss/conductor/pull/1747",
      commit: "95d23b59bc161c346fa966f1de5abea6a8834117",
    },
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "hono-5565",
    kind: "issue-fork",
    number: 5565,
    repository: "Hono",
    repositoryUrl: "https://github.com/honojs/hono",
    title: "Correct response generics in the nine-handler overload",
    summary:
      "Fixes the createHandlers x9 return tuple so each position preserves its own response type rather than reusing the first handler's type.",
    problem:
      "The nine-handler overload typed all returned handlers with the first response generic, losing type information for handlers two through nine.",
    solution:
      "Updated the overload's tuple slots to use their corresponding response generics R2 through R9.",
    impact:
      "Restores correct TypeScript inference for consumers using the nine-handler form.",
    domains: ["TypeScript", "Developer tooling", "Testing"],
    technologies: ["TypeScript", "Vitest", "Bun", "Deno"],
    url: "https://github.com/honojs/hono/issues/5565",
    status: "reviewer-validated",
    forkUrl: "https://github.com/harshitsharmaaaa/hono/tree/fix/factory-createhandlers-x9-response-types",
    validation:
      "The packet reports 18 focused tests and 5,228 suite tests passing (46 skipped), plus type, lint, format, runtime-suite, and build checks.",
    reviewEvidence: {
      reviewer: "okarin1511",
      state: "commented",
      summary:
        "Checked the fork branch, said the generic correction looked right, and suggested the maintainer pick it up; no upstream PR or merge was found.",
      url: "https://github.com/honojs/hono/issues/5565",
    },
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "traceroot-2734",
    kind: "pull-request",
    number: 2734,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Handle remote-parent entry spans",
    summary:
      "Normalizes OTLP entry spans with remote-parent context so they are not mistaken for the local trace root.",
    problem:
      "A service entry span carrying W3C traceparent context could be selected as the trace root and distort trace identity.",
    solution:
      "Decodes remote-parent flag bits, normalizes flagged entry spans, and preserves true local roots as authoritative.",
    impact: "Improves trace identity and parent handling for distributed ingestion.",
    domains: ["Observability", "Backend correctness", "Testing"],
    technologies: ["Python", "OpenTelemetry", "OTLP", "W3C Trace Context"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2734",
    upstreamState: "open",
    validation: "The packet reports 863 worker tests and Ruff checks passing; REST checks had documented baseline/environment caveats.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-cli-183",
    kind: "pull-request",
    number: 183,
    repository: "TraceRoot CLI",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot-cli",
    title: "Parse copied timestamps across time zones",
    summary:
      "Aligns timestamp display and parsing so copied CLI timestamps with timezone names round-trip correctly.",
    problem:
      "The CLI formatter emitted timezone labels that its parser rejected, including abbreviations and multi-word names.",
    solution:
      "Uses a consistent display locale and validates zone names consistently, with round-trip coverage across supported IANA zones.",
    impact: "Makes copy-and-paste timestamp workflows reliable across time zones.",
    domains: ["Developer tooling", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "Node.js", "IANA time zones"],
    url: "https://github.com/traceroot-ai/traceroot-cli/pull/183",
    upstreamState: "open",
    validation:
      "The packet reports 50/50 focused tests on Node 22 and 20 plus build, codegen, typecheck, lint, and format checks; full-suite failures reproduced on the base under Windows.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-skills-44",
    kind: "pull-request",
    number: 44,
    repository: "TraceRoot Skills",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot-skills",
    title: "Document instrumentation with existing OpenTelemetry providers",
    summary:
      "Expanded instrumentation guidance for Python and TypeScript projects that already register an OpenTelemetry provider.",
    problem:
      "Existing provider setup can prevent instrumentation from joining the active SDK or producing useful traces.",
    solution:
      "Documents provider initialization order, joining behavior, diagnostics, and verification of actual application spans.",
    impact: "Helps users validate instrumentation against real entrypoint, child, tool, and LLM spans.",
    domains: ["Observability", "Developer tooling", "Documentation", "Testing"],
    technologies: ["OpenTelemetry", "Python", "TypeScript"],
    url: "https://github.com/traceroot-ai/traceroot-skills/pull/44",
    upstreamState: "open",
    validation:
      "The packet reports Python tests (7), TypeScript initialization tests (43), typecheck, build, and link checks passing.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "conductor-1743",
    kind: "pull-request",
    number: 1743,
    repository: "Conductor",
    repositoryUrl: "https://github.com/conductor-oss/conductor",
    title: "Preserve task runtime metadata on empty updates",
    summary:
      "Avoids clearing existing TaskDef runtimeMetadata when worker registration sends an update without that field.",
    problem:
      "An omitted metadata field could overwrite existing runtime metadata used for credential injection.",
    solution:
      "Preserves stored metadata when an incoming task definition leaves it unset and adds a regression test.",
    impact: "Keeps runtime configuration intact across worker registration updates and restarts.",
    domains: ["Backend correctness", "Reliability", "Testing"],
    technologies: ["Java", "Conductor"],
    url: "https://github.com/conductor-oss/conductor/pull/1743",
    upstreamState: "open",
    validation: "The PR reports 31 tests and spotlessCheck.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "conductor-1744",
    kind: "pull-request",
    number: 1744,
    repository: "Conductor",
    repositoryUrl: "https://github.com/conductor-oss/conductor",
    title: "Sandbox the Python evaluator",
    summary:
      "Restricts GraalVM Python host access and I/O, bounds execution time, and validates workflow-supplied input.",
    problem:
      "The evaluator's Python execution path exposed an unsafe host-access surface and unbounded execution risks.",
    solution:
      "Added isolation restrictions, execution limits, input handling, and regression tests; a reviewer raised concurrency and lifecycle concerns and follow-up work was pushed.",
    impact:
      "Strengthens the evaluator boundary; review concerns mean this remains under review, not accepted or shipped.",
    domains: ["Security", "Reliability", "Testing"],
    technologies: ["Java", "GraalVM", "Python"],
    url: "https://github.com/conductor-oss/conductor/pull/1744",
    upstreamState: "open",
    validation: "The PR includes sandbox and invalid-input regression coverage.",
    reviewEvidence: {
      reviewer: "jhaabhijeet864",
      state: "changes-requested",
      summary:
        "Confirmed isolation addressed the reported vector but requested changes for concurrency, throughput, and lifecycle safety; response commits followed, with no later approval recorded.",
      url: "https://github.com/conductor-oss/conductor/pull/1744",
      commit: "f5a1df02e00ef09d563bb463bedc3fbbe2e76796",
    },
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2672",
    kind: "pull-request",
    number: 2672,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Evaluate detector conditions after traces settle",
    summary:
      "Defers trigger evaluation until the trace is settled so detector eligibility does not depend on span or batch arrival order.",
    problem:
      "A root-bearing batch could make an eligibility decision before later child spans changed the trace conditions.",
    solution:
      "Keeps deterministic candidate selection at root arrival, then evaluates trigger conditions against the settled trace.",
    impact:
      "Makes the same trace produce consistent detector eligibility regardless of OTLP batch ordering.",
    domains: ["Observability", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "OpenTelemetry", "OTLP"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2672",
    upstreamState: "open",
    headCommit: "283e8dce8fa0daef6a124c378e136cb1dea51ed5",
    validation: "Reviewer tested root-first, child-first, and same-batch arrivals with the local stack.",
    reviewEvidence: {
      reviewer: "Prasad8830",
      state: "commented",
      summary:
        "Reported that the tested arrival orders queued the expected candidates; the PR remains open without formal approval.",
      url: "https://github.com/traceroot-ai/traceroot/pull/2672",
      commit: "283e8dce8fa0daef6a124c378e136cb1dea51ed5",
    },
    verifiedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "opencode-58178",
    kind: "pull-request",
    number: 58178,
    repository: "OpenCode",
    repositoryUrl: "https://github.com/anomalyco/opencode",
    title: "Resolve URL-style paths inside Windows workspaces",
    summary:
      "Resolves single-leading-slash and backslash paths against the workspace while preserving drive-qualified, UNC, and POSIX paths.",
    problem:
      "Windows path handling could resolve workspace assets incorrectly outside the project context.",
    solution:
      "Updated path normalization and local image reads, with coverage for platform-specific path forms.",
    impact: "Makes workspace asset resolution consistent on Windows without changing other path styles.",
    domains: ["Developer tooling", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "Bun", "Windows"],
    url: "https://github.com/anomalyco/opencode/pull/58178",
    upstreamState: "open",
    validation:
      "The packet reports 768 app tests and root checks passing, with manual testing on a Windows server; the browser test was not run.",
    reviewEvidence: {
      reviewer: "opencode-agent",
      state: "commented",
      summary: "Automated review compared base and branch behavior; this is not a human maintainer approval.",
      url: "https://github.com/anomalyco/opencode/pull/58178",
      automated: true,
    },
    verifiedAt: "2026-10-24",
  },
  {
    id: "opencode-56539",
    kind: "pull-request",
    number: 56539,
    repository: "OpenCode",
    repositoryUrl: "https://github.com/anomalyco/opencode",
    title: "Start local service with read-only configuration",
    summary:
      "Allows a local service to start with a read-only config directory by using an ephemeral password when persistence is not required.",
    problem:
      "Local service startup failed when configuration could not be written, even when local-only access did not require persistence.",
    solution:
      "Uses a transient credential for local service use while retaining persistence requirements for remote access.",
    impact: "Supports restricted local environments without weakening remote service requirements.",
    domains: ["Developer tooling", "Reliability", "Testing"],
    technologies: ["TypeScript", "Bun", "File systems"],
    url: "https://github.com/anomalyco/opencode/pull/56539",
    upstreamState: "open",
    validation: "Automated review tested the read-only mount scenario; a root-only test failure was handled separately.",
    reviewEvidence: {
      reviewer: "opencode-agent",
      state: "commented",
      summary: "Automated test confirmed local startup; no human maintainer approval was found.",
      url: "https://github.com/anomalyco/opencode/pull/56539",
      automated: true,
    },
    verifiedAt: "2026-10-24",
  },
  {
    id: "mcp-use-2861",
    kind: "pull-request",
    number: 2861,
    repository: "mcp-use",
    repositoryUrl: "https://github.com/mcp-use/mcp-use",
    title: "Add a supported OAuth admission hook",
    summary:
      "Adds an OAuth hook while preserving anonymous discovery and no-auth tools in mixed-auth servers.",
    problem:
      "OAuth admission needed to coexist with public discovery and protected tools without bypassing challenges or misclassifying failures.",
    solution:
      "Added an explicit defer path for mixed-auth cases, preserved protected-tool challenges, and covered auth/error modes with regression tests.",
    impact: "Makes OAuth integration compatible with existing mixed authentication behavior.",
    domains: ["Backend correctness", "Developer tooling", "Testing"],
    technologies: ["TypeScript", "OAuth", "MCP"],
    url: "https://github.com/mcp-use/mcp-use/pull/2861",
    upstreamState: "open",
    validation: "Regression coverage includes auth modes, fallback, fetch/listen, identity/resource data, and scopes.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "opencode-55834",
    kind: "pull-request",
    number: 55834,
    repository: "OpenCode",
    repositoryUrl: "https://github.com/anomalyco/opencode",
    title: "Stream resumed parent-session updates over ACP",
    summary: "Attempts to deliver resumed parent-session output as ACP session updates.",
    problem:
      "Resumed parent-session output was not consistently streamed as session/update events.",
    solution:
      "Adds event delivery for resumed sessions; review raised turn-semantics, takeover-race, and terminal-state concerns that remain unresolved.",
    impact:
      "Documents protocol and lifecycle questions still under review; do not present as an accepted fix.",
    domains: ["Developer tooling", "Reliability", "Testing"],
    technologies: ["TypeScript", "ACP"],
    url: "https://github.com/anomalyco/opencode/pull/55834",
    upstreamState: "open",
    validation: "The packet reports 104/104 focused tests and CLI typecheck passing.",
    reviewEvidence: {
      reviewer: "opencode-agent",
      state: "commented",
      summary:
        "Review discussion raised unresolved event ordering and lifecycle concerns; automated review is not a human approval.",
      url: "https://github.com/anomalyco/opencode/pull/55834",
      automated: true,
    },
    verifiedAt: "2026-10-24",
  },
  {
    id: "commaai-connect-911",
    kind: "pull-request",
    number: 911,
    repository: "commaai/connect",
    repositoryUrl: "https://github.com/commaai/connect",
    title: "Clarify file-download segment scope",
    summary:
      "Clarifies that individual file actions apply to the current segment while all-log/all-file actions apply to the selected range.",
    problem: "The scope of file actions across a selected range was unclear.",
    solution: "Clarified current-segment versus selected-range behavior and added focused tests without changing upload/download logic.",
    impact: "Makes the file action scope easier to understand and verify.",
    domains: ["Developer tooling", "Testing"],
    technologies: ["JavaScript", "React"],
    url: "https://github.com/commaai/connect/pull/911",
    upstreamState: "open",
    validation: "The PR reports 76 passing tests and 22 existing App.test.jsx failures.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "megacorp-5390",
    kind: "pull-request",
    number: 5390,
    repository: "megacorp",
    repositoryUrl: "https://github.com/bootdotdev/megacorp",
    title: "Add name_list to the customers CSV",
    summary: "Adds the name_list field to the customer CSV export.",
    problem: "The customer export omitted the name_list field.",
    solution: "Adds the missing field to the CSV data.",
    impact: "Makes the export include the requested customer data.",
    domains: ["Backend correctness"],
    technologies: ["CSV"],
    url: "https://github.com/bootdotdev/megacorp/pull/5390",
    upstreamState: "open",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2642",
    kind: "pull-request",
    number: 2642,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Cancel Docker exec process groups",
    summary:
      "Adds process-group cancellation and cancellation markers so Docker commands and descendants stop on timeout or abort.",
    problem: "A timed-out or aborted Docker command could leave child processes running or appear successful.",
    solution: "Tracks cancellation, terminates the process group, and prevents cancellation from being reported as success.",
    impact: "Improves executor lifecycle handling; the upstream PR was closed without merge.",
    domains: ["Reliability", "Backend correctness", "Testing"],
    technologies: ["TypeScript", "Docker", "Node.js"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2642",
    upstreamState: "closed",
    validation: "The PR added cancellation regression tests.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "traceroot-2611",
    kind: "pull-request",
    number: 2611,
    repository: "TraceRoot",
    repositoryUrl: "https://github.com/traceroot-ai/traceroot",
    title: "Reconcile orphaned Docker sandboxes",
    summary: "Proposed discovery and cleanup of orphaned labeled Docker sandboxes.",
    problem: "Agent startup and shutdown could leave sandbox containers orphaned.",
    solution: "Added label-based discovery, cleanup, and explicit failure reporting.",
    impact: "Proposed safer sandbox lifecycle management; the PR was closed without merge.",
    domains: ["Reliability", "Backend correctness"],
    technologies: ["TypeScript", "Docker"],
    url: "https://github.com/traceroot-ai/traceroot/pull/2611",
    upstreamState: "closed",
    verifiedAt: "2026-10-24",
  },
  {
    id: "opencode-56000",
    kind: "pull-request",
    number: 56000,
    repository: "OpenCode",
    repositoryUrl: "https://github.com/anomalyco/opencode",
    title: "Test UTF-8 characters split across stream chunks",
    summary:
      "Added regression tests for multibyte UTF-8 characters split across streaming chunk boundaries.",
    problem: "A non-stateful decoder can corrupt characters split between incoming byte chunks.",
    solution: "Added chunk-split regression coverage and removed an ineffective EOF case during review.",
    impact: "The tests were reported to catch decoder regressions; the PR was closed without merge.",
    domains: ["Testing", "Developer tooling"],
    technologies: ["TypeScript", "UTF-8", "Streams"],
    url: "https://github.com/anomalyco/opencode/pull/56000",
    upstreamState: "closed",
    validation: "The packet reports 6 focused tests passing across 10 reruns.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-2",
    kind: "pull-request",
    number: 2,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Handle rankless retrieval candidates",
    summary: "Fixed reciprocal-rank fusion handling for candidates without a rank.",
    problem: "Rankless candidates could cause reciprocal-rank fusion to fail.",
    solution: "Added safe handling for candidates without rank values.",
    impact: "The PR was superseded; its work was folded into merged Draco PR #3 and is not a separate merge.",
    domains: ["Backend correctness", "Reliability", "Testing"],
    technologies: ["Python", "Retrieval"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/2",
    upstreamState: "closed",
    verifiedAt: "2026-10-24",
  },
  {
    id: "draco-1",
    kind: "pull-request",
    number: 1,
    repository: "Draco",
    repositoryUrl: "https://github.com/AmartyaRanjan/Draco",
    title: "Close SQLite registry connections deterministically",
    summary: "Proposed deterministic SQLite connection cleanup in the registry.",
    problem: "Registry connections needed explicit lifecycle handling.",
    solution: "Added deterministic connection cleanup.",
    impact: "The PR was superseded; its work was folded into merged Draco PR #3 and is not a separate merge.",
    domains: ["Reliability", "Backend correctness", "Testing"],
    technologies: ["Python", "SQLite"],
    url: "https://github.com/AmartyaRanjan/Draco/pull/1",
    upstreamState: "closed",
    verifiedAt: "2026-10-24",
  },
  {
    id: "commaai-connect-892",
    kind: "pull-request",
    number: 892,
    repository: "commaai/connect",
    repositoryUrl: "https://github.com/commaai/connect",
    title: "Consolidate URL parsing and generation",
    summary:
      "Introduced shared parseLocation and urlFor helpers and migrated route behavior and tests.",
    problem: "URL parsing and generation logic was spread across existing route helpers.",
    solution: "Consolidated the logic in routes.js and migrated/expanded route tests.",
    impact: "Proposed a simpler route implementation; the PR was closed without merge.",
    domains: ["Backend correctness", "Testing"],
    technologies: ["JavaScript", "React"],
    url: "https://github.com/commaai/connect/pull/892",
    upstreamState: "closed",
    validation: "The PR reports 98 passing tests and 22 existing App.test.jsx failures.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "mastra-27319",
    kind: "issue-fork",
    number: 27319,
    repository: "Mastra",
    repositoryUrl: "https://github.com/mastra-ai/mastra",
    title: "Reduce serial storage round trips in Observational Memory",
    summary:
      "Fork work reuses thread records, caches and invalidates cursors/state, skips unchanged token writes, and defers reflector reads.",
    problem:
      "Below the observation threshold, model-call paths performed about 13 sequential Postgres round trips.",
    solution:
      "Prototyped reuse and targeted state reads/writes on a fork branch; the issue requested maintainer triage before opening a PR.",
    impact:
      "Explores a lower-round-trip path; this remains fork work, not an accepted upstream contribution.",
    domains: ["Backend correctness", "Reliability", "Testing"],
    technologies: ["TypeScript", "PostgreSQL", "Mastra"],
    url: "https://github.com/mastra-ai/mastra/issues/27319",
    status: "awaiting-triage",
    forkUrl: "https://github.com/harshitsharmaaaa/mastra/tree/fix/memory-om-serial-roundtrips",
    validation:
      "The packet reports focused OM, Memory, Core processor, agent tests, typecheck, and lint results; unrelated failures were reproduced on baseline.",
    verifiedAt: "2026-10-24",
  },
  {
    id: "mastra-25580",
    kind: "issue-fork",
    number: 25580,
    repository: "Mastra",
    repositoryUrl: "https://github.com/mastra-ai/mastra",
    title: "Version ClickHouse thread rows when deleting messages",
    summary:
      "Fork work proposes replacing ALTER TABLE UPDATE with the existing read-latest/insert-new-version pattern.",
    problem:
      "ClickHouse mutation limits and ambiguous ReplacingMergeTree versions complicate deleteMessages updates.",
    solution:
      "Proposed inserting a new thread version with a strictly newer updatedAt rather than mutating the existing row.",
    impact:
      "The issue later received a release-bot resolution notice, but no upstream PR by this contributor was found; this branch is not credited as shipped.",
    domains: ["Backend correctness", "Reliability"],
    technologies: ["TypeScript", "ClickHouse"],
    url: "https://github.com/mastra-ai/mastra/issues/25580",
    status: "fork-work",
    forkUrl: "https://github.com/harshitsharmaaaa/mastra/tree/fix/clickhouse-deletemessages-no-updatedat",
    verifiedAt: "2026-10-24",
  },
];

export function getContributionStatus(contribution: Contribution): ContributionStatus {
  if (contribution.kind === "issue-fork") return contribution.status;
  if (contribution.upstreamState === "merged") return "merged";
  if (contribution.upstreamState === "closed") return "closed";
  if (
    contribution.reviewEvidence?.state === "approved" &&
    contribution.reviewEvidence.commit === contribution.headCommit
  ) {
    return "approved";
  }
  return "open";
}

export function getContributionStatusLabel(contribution: Contribution): string {
  const status = getContributionStatus(contribution);
  if (status === "merged") return "Merged";
  if (status === "approved") return "Approved · awaiting merge";
  if (status === "closed") return "Closed · not merged";
  if (status === "reviewer-validated") return "Reviewer-validated · upstream pickup pending";
  if (status === "awaiting-triage") return "Fork work · awaiting triage";
  if (status === "fork-work") return "Fork work · upstream landing unverified";
  return "Open · under review";
}

export function getContributionMetrics() {
  const pullRequests = contributions.filter(
    (contribution): contribution is PullRequestContribution =>
      contribution.kind === "pull-request",
  );

  return {
    merged: pullRequests.filter(
      (contribution) => contribution.upstreamState === "merged" && contribution.mergedAt,
    ).length,
    repositories: new Set(pullRequests.map((contribution) => contribution.repositoryUrl)).size,
    open: pullRequests.filter((contribution) => contribution.upstreamState === "open").length,
    approved: pullRequests.filter(
      (contribution) =>
        contribution.upstreamState === "open" &&
        getContributionStatus(contribution) === "approved",
    ).length,
  };
}
