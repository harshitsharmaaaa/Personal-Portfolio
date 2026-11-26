export type ProjectKey =
  | "projects/blackbox.ts"
  | "projects/keymesh.ts"
  | "projects/ai-work-flow.ts"
  | "projects/crypt.ts"
  | "projects/rate-limiter.ts"
  | "projects/solana-notes.ts";

export type Project = {
  id: string;
  key: ProjectKey;
  title: string;
  stack: string[];
  description: string;
  highlights: string[];
  demo: string;
  github: string;
  npm?: string;
  status?: string;
  category?: string;
  subtitle?: string;
  routeColor: "blue" | "red" | "green" | "purple";
  routeLine: string;
  stationCode: string;
  architectureLink?: string;
  securityLink?: string;
  contractsLink?: string;
  rustTssLink?: string;
  rustCoreLink?: string;
  protocolLink?: string;
  sdkLink?: string;
  metrics?: { label: string; value: string }[];
  limitations?: string[];
  whatIBuilt?: string[];
  problem?: string;
  architectureDiagram?: string;
  transactionFlow?: string;
  policyEngine?: string;
  guardianRecovery?: string;
  thresholdEcdsa?: string;
  tssLifecycle?: string;
  securityModel?: string;
  testingDetails?: string[];
  repoStructure?: string;
  executionFlow?: string;
  componentBreakdown?: string[];
  whyAsync?: string;
};

export const projects: Record<ProjectKey, Project> = {
  "projects/blackbox.ts": {
    id: "blackbox",
    key: "projects/blackbox.ts",
    title: "TheBlackBox",
    subtitle: "Secure Untrusted Code Execution Engine",
    category: "Systems / Security / Backend",
    status: "Implemented",
    routeColor: "blue",
    routeLine: "Blue Line · Backend & Systems",
    stationCode: "BX-01",
    stack: [
      "Bun",
      "Turborepo",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "Linux",
      "Nginx",
    ],
    description:
      "An asynchronous, sandboxed code-execution engine designed to safely execute untrusted Python, Node.js, C++, and Java programs.",
    highlights: [
      "Asynchronous non-blocking architecture powered by Redis & BullMQ task queues",
      "Ephemeral Docker sandbox execution with strict memory, CPU, and process limits",
      "Multi-language support: Python, Node.js, C++, and Java runner environments",
      "Network isolation, non-root execution, read-only file mounts, and syscall restrictions",
      "PostgreSQL execution persistence via Prisma ORM for status & log tracking",
      "Nginx reverse proxy for SSL termination, request routing, and rate limiting",
      "Future architecture roadmap: Firecracker microVM isolation integration",
    ],
    demo: "",
    github: "https://github.com/harshitsharmaaaa/BlackBox",
    architectureLink: "https://github.com/harshitsharmaaaa/BlackBox",
    securityLink: "https://github.com/harshitsharmaaaa/BlackBox",
    metrics: [
      { label: "Languages", value: "4 Supported" },
      { label: "Architecture", value: "Async Queue" },
      { label: "Isolation", value: "Docker / Linux" },
      { label: "ORM", value: "Prisma" },
      { label: "Queue", value: "BullMQ / Redis" },
    ],
    problem:
      "Executing arbitrary user code presents critical security and stability threats: infinite loops, memory exhaustion, fork bombs, excessive stdout streaming, unauthorized host filesystem access, network exfiltration, SSRF, and worker thread starvation. TheBlackBox isolates untrusted workloads and decouples submission from execution.",
    architectureDiagram: `                    TheBlackBox
                       |
                     Client
                       |
                     Nginx (SSL / Proxy / Limit)
                       |
                  Express API Server
                  ├── PostgreSQL (Prisma State)
                  └── Redis / BullMQ Task Queue
                        |
                     Worker Engine
                        |
             Ephemeral Docker Sandbox
             ├── Python Runner Container
             ├── Node.js Runner Container
             ├── C++ Runner Container
             └── Java Runner Container`,
    executionFlow:
      "Client -> POST /execute -> Express API validation -> Persist record in PostgreSQL (QUEUED) -> Enqueue job in BullMQ -> Worker picks job (RUNNING) -> Spin up ephemeral Docker container with resource/security limits -> Execute or compile code -> Capture stdout/stderr & exit code -> Destroy container -> Update PostgreSQL status (COMPLETED / FAILED / TIMEOUT / MEMORY_LIMIT / OUTPUT_LIMIT) -> Client polls GET /executions/:id or receives webhook",
    whyAsync:
      "Executing untrusted code synchronously locks web worker threads, risks HTTP request timeouts under heavy load or long computations, and exposes the API server to Denial-of-Service attacks. An asynchronous queue decouples job submission from resource-heavy compilation/execution, enabling rate throttling, concurrency control, and backpressure management.",
    componentBreakdown: [
      "Nginx: Edge reverse proxy providing SSL termination, client payload limits, and request throttling.",
      "Express Backend: API layer validating execution requests, enforcing rate limits, and managing database records.",
      "PostgreSQL & Prisma: Persistent relational database storing execution metadata, status updates, wall time, and execution logs.",
      "Redis & BullMQ: High-throughput async message queue decoupling incoming HTTP requests from heavy container workloads.",
      "Worker Engine: Distributed background consumer that pulls jobs, builds runtime commands, and manages container lifecycles.",
      "Docker Sandbox Runtime: Ephemeral container runners (Python, Node.js, C++, Java) configured with read-only root filesystems, memory caps, CPU quotas, process limits (pids-limit), and disabled network access.",
      "Firecracker (Planned / Future Architecture): Lightweight microVM hypervisor isolation layer designed for multi-tenant microVM boundary security.",
    ],
    testingDetails: [
      "Automated unit & integration tests across API routes and queue handlers",
      "Sandboxed environment security validation: network isolation, memory limit enforcement, and timeout kills",
      "Multi-language code execution test suites for Python, Node.js, C++, and Java",
      "Error state captures for SyntaxError, TimeLimitExceeded, MemoryLimitExceeded, and RuntimeException",
    ],
    limitations: [
      "Docker container isolation used in production — Firecracker microVM integration is a planned future architectural milestone",
      "Requires Linux kernel cgroups v2 and seccomp support for max container containment",
      "Heavy concurrent execution requires horizontal scaling of worker nodes and Docker hosts",
    ],
    whatIBuilt: [
      "Complete asynchronous microservices architecture with Express, BullMQ, Redis, and PostgreSQL",
      "Multi-language Docker sandbox engine with strict resource quotas and security constraints",
      "Worker pool execution pipeline handling compilation, execution, timeouts, and log streaming",
      "API validation, Prisma schema design, Nginx infrastructure configuration, and local Turborepo setup",
    ],
    repoStructure: `apps/
  api/
  worker/
packages/
  sandbox/
  database/
  types/
docker/
  python/
  nodejs/
  cpp/
  java/
firecracker/ (future)
docker-compose.yml
nginx.conf
turbo.json`,
  },
  "projects/keymesh.ts": {
    id: "keymesh",
    key: "projects/keymesh.ts",
    title: "KEYMESH",
    subtitle: "Threshold-ECDSA Digital Asset Authorization Protocol",
    category: "Blockchain / Cryptography",
    status: "Research",
    routeColor: "green",
    routeLine: "Green Line · Blockchain & Web3",
    stationCode: "KM-02",
    stack: [
      "Rust",
      "Solidity",
      "TypeScript",
      "Ethereum",
      "Foundry",
      "Bun",
      "Turborepo",
      "TSS/MPC",
      "Vitest",
      "Zod",
      "Tokio",
      "k256",
      "synedrion",
      "manul",
    ],
    description:
      "Research-grade Ethereum authorization protocol combining programmable transaction policies, guardian-governed recovery, and 2-of-3 threshold ECDSA.",
    highlights: [
      "Separation of Signing, Policy, and Recovery Authority",
      "Canonical KEYMESH_TX_V1 transaction binding",
      "2-of-3 Threshold ECDSA off-chain signing producing standard Ethereum ECDSA (r,s,v)",
      "PolicyManager with strict selector, destination, value, and version checks",
      "RecoveryManager with guardian quorum, timelocks, and atomic device replacement",
      "268+ Foundry contract tests (13 suites), 90 TS tests, 52 Rust Core tests, 30 TSS Light tests",
      "Solidity invariant & fuzz testing across cross-language vector suites",
    ],
    demo: "",
    github: "https://github.com/harshitsharmaaaa/KeyMesh",
    architectureLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/docs/architecture",
    securityLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/docs/security",
    contractsLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/contracts/ethereum",
    rustTssLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/crates/keymesh-tss",
    rustCoreLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/crates/keymesh-core",
    protocolLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/packages/protocol",
    sdkLink: "https://github.com/harshitsharmaaaa/KeyMesh/tree/main/packages/sdk",
    metrics: [
      { label: "Foundry Tests", value: "268+" },
      { label: "TypeScript Tests", value: "90" },
      { label: "Rust Core Tests", value: "52" },
      { label: "TSS Light Tests", value: "30" },
      { label: "Threshold ECDSA", value: "2-of-3" },
    ],
    problem:
      "Traditional wallets rely on a single private key, presenting a single point of failure where a stolen key loses funds, a lost key causes permanent loss, and transaction signing lacks fine-grained governance. KEYMESH separates WHO (device/guardians), WHAT (PolicyManager), and HOW (Single/Threshold ECDSA) while preserving native Ethereum ecrecover compatibility.",
    architectureDiagram: `                    KEYMESH
                       |
       +---------------+---------------+
       |               |               |
    Signing         Policy         Recovery
       |               |               |
 Device / TSS     PolicyManager  RecoveryManager
       |               |               |
       +---------------+---------------+
                       |
                       v
                  KeymeshWallet
                       |
                       v
                    Ethereum

ThresholdEcdsaProvider -> synedrion / CGGMP'24 -> 2-of-3 -> ECDSA (r,s,v)`,
    transactionFlow:
      "Transaction -> KEYMESH_TX_V1 -> Canonical digest -> Signing -> Policy classification -> Guardian authorization if required -> KeymeshWallet -> ECDSA recovery -> Nonce & expiry checks -> Execution.",
    policyEngine:
      "Precedence: 1. Admin selector, 2. Restricted selector, 3. Restricted destination, 4. Value threshold, 5. Default. Classifies into DEVICE_ONLY or DEVICE_PLUS_GUARDIANS.",
    guardianRecovery:
      "State lifecycle: None -> Pending -> QuorumReached -> Executable -> Executed (with cancellation). Guardians govern recovery & atomic device replacement; they never sign transactions directly.",
    thresholdEcdsa:
      "2-of-3 threshold ECDSA off-chain MPC (Participants A, B, C; valid pairs A+B, A+C, B+C). Jointly generates ONE standard secp256k1 signature (r,s,v) validated via ecrecover on Ethereum.",
    tssLifecycle:
      "DKG -> Active -> Refresh (same-set KeyResharing + AuxGen) -> Active -> Rotation (participant resharing) -> Active -> Retirement.",
    securityModel:
      "Bound by replay protection, cross-wallet & cross-chain isolation, nonce binding, expiry, policy versioning, timelocks, session binding, and lifecycle locking. A malicious coordinator can affect liveness but not authorization safety.",
    testingDetails: [
      "268+ Foundry tests across 13 contract test suites",
      "90 TypeScript SDK & protocol tests",
      "52 Rust keymesh-core tests",
      "30 TSS light tests",
      "Fuzzing, property testing, and Solidity state invariants",
      "Cross-language canonical vector verification",
    ],
    limitations: [
      "Research-grade protocol — not externally audited or formally verified",
      "No production HSM or production multi-process Synedrion runtime implemented",
      "TSS multi-process runtime intentionally deferred (installed synedrion/manul APIs do not expose participant process runtime)",
      "Public testnet TSS E2E not demonstrated",
      "Not supported or ready for mainnet production custody deployment",
    ],
    whatIBuilt: [
      "Protocol architecture & key separation model",
      "Solidity authorization, KeymeshWallet, PolicyManager, & RecoveryManager smart contracts",
      "Rust cryptographic integration & TSS provider interfaces",
      "SDK, cross-language canonical KEYMESH_TX_V1 serialization, & testing pipelines",
      "CGGMP-family cryptographic primitives/protocol implementation are provided through synedrion/manul; KEYMESH integrates and builds the surrounding authorization, lifecycle, and application architecture.",
    ],
    repoStructure: `apps/
  dashboard/
packages/
  sdk/
  protocol/
  types/
  config/
crates/
  keymesh-core/
  keymesh-tss/
  keymesh-tss-proto/
contracts/
  ethereum/
docs/`,
  },
  "projects/ai-work-flow.ts": {
    id: "ai-work-flow",
    key: "projects/ai-work-flow.ts",
    title: "AI Work Flow",
    subtitle: "AI Workflow Automation Platform",
    category: "AI / Automation / Full-Stack",
    status: "Production",
    routeColor: "red",
    routeLine: "Red Line · AI & Automation",
    stationCode: "AW-03",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "React Flow",
      "Liveblocks",
      "Trigger.dev",
      "Browserbase",
      "Stagehand",
      "Clerk",
      "Drizzle ORM",
      "Neon PostgreSQL",
    ],
    description:
      "Visual drag-and-drop workflow editor with real-time multi-user editing, graph validation, topological execution, retries, execution history, asynchronous background jobs, browser automation with AI-driven web interaction, structured data extraction, browser replay, organization authentication, billing, and workflow persistence.",
    highlights: [
      "Visual drag-and-drop workflow editor",
      "React Flow with Liveblocks real-time sync",
      "Multi-user editing with node dependency management",
      "Trigger.dev for async background jobs",
      "Graph validation and topological execution with retries",
      "Execution history",
      "Browserbase + Stagehand for AI browser automation",
      "Structured data extraction and browser replay",
      "Clerk org auth + billing",
      "Drizzle ORM + Neon PostgreSQL persistence",
    ],
    demo: "https://aiwork-flow.netlify.app/",
    github: "https://github.com/harshitsharmaaaa/ai-work-flow",
    problem:
      "Creating multi-step automated workflows with browser interactions requires orchestrating complex directed graphs, coordinating multi-tenant permissions, safely scheduling long-running headless browser sessions, and managing real-time collaborative state across teams without execution deadlocks.",
  },
  "projects/crypt.ts": {
    id: "crypt",
    key: "projects/crypt.ts",
    title: "Crypt",
    subtitle: "Multi-Chain HD Wallet Generator & Blockchain Explorer",
    category: "Blockchain / Cryptography",
    status: "Live App",
    routeColor: "green",
    routeLine: "Green Line · Blockchain & Web3",
    stationCode: "CR-04",
    stack: [
      "Ethereum",
      "Solana",
      "TypeScript",
      "BIP39",
      "BIP44",
      "Ed25519",
      "ECDSA",
      "ENS",
      "ethers.js",
      "@solana/web3.js",
    ],
    description:
      "Privacy-first multi-chain HD wallet generator and blockchain explorer for Ethereum and Solana. Private keys never leave the browser. Features client-side cryptography, secure mnemonic validation, deterministic wallet recovery, ENS resolution, RPC failover, and resilient public RPC endpoints.",
    highlights: [
      "Client-side key generation - private keys never leave browser",
      "BIP39/BIP44 compliant mnemonic validation",
      "Ed25519 (Solana) and ECDSA (Ethereum) support",
      "ENS resolution and RPC failover",
      "Deterministic wallet recovery",
      "Resilient public RPC endpoints",
      "Blockchain explorer for both chains",
    ],
    demo: "https://crypt-block.netlify.app/",
    github: "https://github.com/harshitsharmaaaa/Crypt",
    problem:
      "Centralized custodial wallet solutions expose user secrets to server compromise and data leaks. Crypt guarantees deterministic derivation strictly client-side using standards-compliant BIP39/BIP44 algorithms without server transmission.",
  },
  "projects/rate-limiter.ts": {
    id: "rate-limiter",
    key: "projects/rate-limiter.ts",
    title: "RateLimiter",
    subtitle: "Rate-Limiting API & Published npm SDK",
    category: "Backend / Distributed Systems",
    status: "Published SDK",
    routeColor: "blue",
    routeLine: "Blue Line · Backend & Systems",
    stationCode: "RL-05",
    stack: [
      "TypeScript",
      "Fastify",
      "Prisma",
      "Redis",
      "PostgreSQL",
      "Docker Compose",
      "JWT",
    ],
    description:
      "Production-grade rate-limiting API with multiple algorithms and a published npm SDK. Supports Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket algorithms with JWT authentication, SHA-256 API key hashing, API key management, comprehensive analytics endpoints, timeline/status/performance/per-endpoint analytics, Prisma migrations, and health checks.",
    highlights: [
      "4 algorithms: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket",
      "JWT authentication with SHA-256 API key hashing",
      "API key enable/disable/regenerate",
      "Analytics: timeline, status, performance, per-endpoint",
      "Prisma migrations and health checks",
      "Published npm SDK: ratelimiter-sdk",
      "Docker Compose for local development",
    ],
    demo: "",
    github: "https://github.com/harshitsharmaaaa/Rate-Limiter",
    npm: "https://www.npmjs.com/package/ratelimiter-sdk",
    problem:
      "High-throughput APIs require strict abuse prevention without degrading latency. RateLimiter provides 4 distinct algorithmic strategies tailored to bursts versus smooth throttling with Redis-backed atomic tracking and a zero-config SDK.",
  },
  "projects/solana-notes.ts": {
    id: "solana-notes",
    key: "projects/solana-notes.ts",
    title: "Note-Taking DApp on Solana",
    subtitle: "Fully On-Chain Smart Contract Application",
    category: "Blockchain / Web3",
    status: "Live Demo",
    routeColor: "green",
    routeLine: "Green Line · Blockchain & Web3",
    stationCode: "SN-06",
    stack: [
      "Next.js",
      "Anchor",
      "Solana",
      "Rust",
      "Phantom Wallet",
      "@solana/web3.js",
    ],
    description:
      "Fully on-chain note-taking decentralized application built with Anchor smart contracts. Features Program Derived Addresses for note accounts, full CRUD operations via smart contracts, Phantom Wallet authentication, and real-time blockchain state synchronization via Solana RPC APIs.",
    highlights: [
      "Program Derived Addresses for note accounts",
      "Fully on-chain CRUD via Anchor smart contracts",
      "Phantom Wallet authentication",
      "Solana RPC APIs for state sync",
      "Real-time account query updates",
    ],
    demo: "https://note-dapp.netlify.app/",
    github: "https://github.com/harshitsharmaaaa/noteTaking-Dapp",
    problem:
      "Decentralized apps often sacrifice user experience or rely on hybrid off-chain databases. This project achieves complete on-chain state persistence on Solana with deterministic PDA derivation and sub-second transaction finality.",
  },
};

export const allProjectList: Project[] = Object.values(projects);

export const profile = {
  name: "Harshit Sharma",
  role: "Full-Stack Developer · Systems & Web3 Engineer",
  tagline: "Building high-assurance systems, sandboxed runtimes, and decentralized protocols.",
  bio: "I build products end-to-end with Next.js, TypeScript, React, Node.js, Rust, and blockchain systems.",
  education: "B.Tech in Computer Science (AI & Robotics), VIT Chennai (2023 — 2027)",
  coursework: "Data Structures & Algorithms, Computer Networks, Theory of Computation, Compiler Design, DBMS",
  location: "Chennai, India",
  email: "harshitjob0027@gmail.com",
  phone: "+91 9145825568",
  resume: "https://drive.google.com/file/d/1wS3CkyxfTZw1rLHuu3ZULIuC1gVvRXNA/view?usp=sharing",
  github: "https://github.com/harshitsharmaaaa/",
  linkedin: "https://www.linkedin.com/in/harshit-sharma-46a210341/",
  twitter: "https://x.com/Harshit_Codess",
  values: ["ship fast", "understand deeply", "avoid unnecessary process"],
} as const;

export const routesData = [
  {
    id: "route-blue",
    name: "Blue Line",
    slug: "backend-systems",
    title: "Backend & Systems Engineering",
    color: "#3b82f6",
    badgeBg: "bg-blue-600",
    badgeBorder: "border-blue-400",
    description:
      "High-throughput async task queues, sandboxed untrusted code execution, distributed rate limiting, and database engineering.",
    technologies: [
      "Rust",
      "Bun",
      "Node.js",
      "Docker",
      "Linux cgroups",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Fastify",
      "Nginx",
    ],
    projectKeys: ["projects/blackbox.ts", "projects/rate-limiter.ts"] as ProjectKey[],
  },
  {
    id: "route-red",
    name: "Red Line",
    slug: "ai-automation",
    title: "AI & Automation",
    color: "#ef4444",
    badgeBg: "bg-rose-600",
    badgeBorder: "border-rose-400",
    description:
      "Collaborative workflow graphs, AI browser automation, real-time synchronization, and durable agent execution lifecycles.",
    technologies: [
      "Next.js 16",
      "React 19",
      "React Flow",
      "Trigger.dev",
      "Liveblocks",
      "Browserbase",
      "Stagehand",
      "LangGraph",
      "Drizzle ORM",
      "Neon",
    ],
    projectKeys: ["projects/ai-work-flow.ts"] as ProjectKey[],
  },
  {
    id: "route-green",
    name: "Green Line",
    slug: "blockchain-web3",
    title: "Blockchain & Web3",
    color: "#10b981",
    badgeBg: "bg-emerald-600",
    badgeBorder: "border-emerald-400",
    description:
      "Threshold cryptography (2-of-3 TSS ECDSA), Foundry invariant suites, multi-chain HD wallets, and Solana on-chain Anchor programs.",
    technologies: [
      "Rust",
      "Solidity",
      "Ethereum",
      "Solana",
      "Foundry",
      "Anchor",
      "TSS/CGGMP'24",
      "ethers.js",
      "@solana/web3.js",
      "BIP39",
    ],
    projectKeys: ["projects/keymesh.ts", "projects/crypt.ts", "projects/solana-notes.ts"] as ProjectKey[],
  },
] as const;

export const journeyMilestones = [
  {
    station: "Station 01 // Foundations",
    code: "VIT",
    phase: "2023 — 2027",
    title: "Computer Science (AI & Robotics) at VIT Chennai",
    route: "Central Junction",
    routeColor: "blue",
    summary:
      "Deep theoretical grounding in Data Structures & Algorithms, Computer Networks, Theory of Computation, Compiler Design, and Database Systems.",
    tags: ["VIT Chennai", "CS & Robotics", "DAA", "Networks", "DBMS"],
  },
  {
    station: "Station 02 // Systems & Isolation",
    code: "SYS",
    phase: "SYSTEMS TRACK",
    title: "Sandboxed Execution & High-Throughput Engines",
    route: "Blue Line Connection",
    routeColor: "blue",
    summary:
      "Engineered TheBlackBox: asynchronous task queuing with BullMQ & Redis, isolating untrusted user code in ephemeral Docker containers with strict Linux cgroup memory and CPU quotas.",
    tags: ["Docker", "Linux cgroups", "BullMQ", "Redis", "TypeScript"],
  },
  {
    station: "Station 03 // Cryptographic Protocols",
    code: "CRY",
    phase: "CRYPTO TRACK",
    title: "Threshold ECDSA & Multi-Chain Architecture",
    route: "Green Line Connection",
    routeColor: "green",
    summary:
      "Researched and built KEYMESH: 2-of-3 Threshold ECDSA off-chain signing producing canonical Ethereum signatures, validated with 268+ Foundry invariant tests. Built client-side multi-chain HD wallet (Crypt) and Anchor smart contracts on Solana.",
    tags: ["Rust", "Solidity", "Foundry", "TSS", "Solana", "Ethereum"],
  },
  {
    station: "Station 04 // Open-Source & Production Tooling",
    code: "OSS",
    phase: "UPSTREAM TRACK",
    title: "Upstream Production Hardening Across Ecosystems",
    route: "Purple Express Line",
    routeColor: "purple",
    summary:
      "Contributed 17 merged upstream PRs across Conductor, Draco, Backstage, TraceRoot, and self-healing-hybrid-RAG, plus reviewer-validated work in Hono. Draco #9 and #11 cover overlapping hardening.",
    tags: ["Conductor", "Draco", "Backstage", "TraceRoot", "Hono"],
  },
] as const;
