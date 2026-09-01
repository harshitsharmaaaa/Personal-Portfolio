"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type FileKey = "about.tsx" | "projects/blackbox.ts" | "projects/keymesh.ts" | "projects/crypt.ts" | "projects/solana-notes.ts" | "projects/ai-work-flow.ts" | "projects/rate-limiter.ts" | "skills.json" | "education.md" | "contact.tsx";
type FolderKey = "portfolio" | "projects";
type Activity = "explorer" | "search" | "source" | "extensions";
type Theme = "dark" | "light";

type Project = {
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

const STORAGE_KEY = "harshit-vscode-state-v2";

const fileMeta: Record<FileKey, { label: string; icon: string; mode: string; folder: FolderKey; color: string }> = {
  "about.tsx": { label: "about.tsx", icon: "⚛", mode: "TypeScript React", folder: "portfolio", color: "text-[#61dafb]" },
  "projects/blackbox.ts": { label: "blackbox.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "projects/keymesh.ts": { label: "keymesh.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "projects/ai-work-flow.ts": { label: "ai-work-flow.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "projects/crypt.ts": { label: "crypt.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "projects/rate-limiter.ts": { label: "rate-limiter.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "projects/solana-notes.ts": { label: "solana-notes.ts", icon: "TS", mode: "TypeScript", folder: "projects", color: "text-[#3178c6]" },
  "skills.json": { label: "skills.json", icon: "{}", mode: "JSON", folder: "portfolio", color: "text-[#f1c40f]" },
  "education.md": { label: "education.md", icon: "MD", mode: "Markdown", folder: "portfolio", color: "text-[#519aba]" },
  "contact.tsx": { label: "contact.tsx", icon: "⚛", mode: "TypeScript React", folder: "portfolio", color: "text-[#61dafb]" },
};

const allFiles = Object.keys(fileMeta) as FileKey[];

const projects: Record<Extract<FileKey, `projects/${string}`>, Project> = {
  "projects/blackbox.ts": {
    title: "TheBlackBox",
    subtitle: "Secure Untrusted Code Execution Engine",
    category: "Systems / Security / Backend",
    status: "Implemented",
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
    description: "An asynchronous, sandboxed code-execution engine designed to safely execute untrusted Python, Node.js, C++, and Java programs.",
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
    problem: "Executing arbitrary user code presents critical security and stability threats: infinite loops, memory exhaustion, fork bombs, excessive stdout streaming, unauthorized host filesystem access, network exfiltration, SSRF, and worker thread starvation. TheBlackBox isolates untrusted workloads and decouples submission from execution.",
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
    executionFlow: `Client -> POST /execute -> Express API validation -> Persist record in PostgreSQL (QUEUED) -> Enqueue job in BullMQ -> Worker picks job (RUNNING) -> Spin up ephemeral Docker container with resource/security limits -> Execute or compile code -> Capture stdout/stderr & exit code -> Destroy container -> Update PostgreSQL status (COMPLETED / FAILED / TIMEOUT / MEMORY_LIMIT / OUTPUT_LIMIT) -> Client polls GET /executions/:id or receives webhook`,
    whyAsync: "Executing untrusted code synchronously locks web worker threads, risks HTTP request timeouts under heavy load or long computations, and exposes the API server to Denial-of-Service attacks. An asynchronous queue decouples job submission from resource-heavy compilation/execution, enabling rate throttling, concurrency control, and backpressure management.",
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
    title: "KEYMESH",
    subtitle: "Threshold-ECDSA Digital Asset Authorization Protocol",
    category: "Blockchain / Cryptography",
    status: "Research",
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
    description: "Research-grade Ethereum authorization protocol combining programmable transaction policies, guardian-governed recovery, and 2-of-3 threshold ECDSA.",
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
    problem: "Traditional wallets rely on a single private key, presenting a single point of failure where a stolen key loses funds, a lost key causes permanent loss, and transaction signing lacks fine-grained governance. KEYMESH separates WHO (device/guardians), WHAT (PolicyManager), and HOW (Single/Threshold ECDSA) while preserving native Ethereum ecrecover compatibility.",
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
    transactionFlow: "Transaction -> KEYMESH_TX_V1 -> Canonical digest -> Signing -> Policy classification -> Guardian authorization if required -> KeymeshWallet -> ECDSA recovery -> Nonce & expiry checks -> Execution.",
    policyEngine: "Precedence: 1. Admin selector, 2. Restricted selector, 3. Restricted destination, 4. Value threshold, 5. Default. Classifies into DEVICE_ONLY or DEVICE_PLUS_GUARDIANS.",
    guardianRecovery: "State lifecycle: None -> Pending -> QuorumReached -> Executable -> Executed (with cancellation). Guardians govern recovery & atomic device replacement; they never sign transactions directly.",
    thresholdEcdsa: "2-of-3 threshold ECDSA off-chain MPC (Participants A, B, C; valid pairs A+B, A+C, B+C). Jointly generates ONE standard secp256k1 signature (r,s,v) validated via ecrecover on Ethereum.",
    tssLifecycle: "DKG -> Active -> Refresh (same-set KeyResharing + AuxGen) -> Active -> Rotation (participant resharing) -> Active -> Retirement.",
    securityModel: "Bound by replay protection, cross-wallet & cross-chain isolation, nonce binding, expiry, policy versioning, timelocks, session binding, and lifecycle locking. A malicious coordinator can affect liveness but not authorization safety.",
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
    title: "AI Work Flow — AI Workflow Automation Platform",
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
    description: "Visual drag-and-drop workflow editor with real-time multi-user editing, graph validation, topological execution, retries, execution history, asynchronous background jobs, browser automation with AI-driven web interaction, structured data extraction, browser replay, organization authentication, billing, and workflow persistence.",
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
  },
  "projects/crypt.ts": {
    title: "Crypt — Multi-Chain HD Wallet Generator & Blockchain Explorer",
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
    description: "Privacy-first multi-chain HD wallet generator and blockchain explorer for Ethereum and Solana. Private keys never leave the browser. Features client-side cryptography, secure mnemonic validation, deterministic wallet recovery, ENS resolution, RPC failover, and resilient public RPC endpoints.",
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
  },
  "projects/rate-limiter.ts": {
    title: "RateLimiter — Rate-Limiting API & Published npm SDK",
    stack: [
      "TypeScript",
      "Fastify",
      "Prisma",
      "Redis",
      "PostgreSQL",
      "Docker Compose",
      "JWT",
    ],
    description: "Production-grade rate-limiting API with multiple algorithms and a published npm SDK. Supports Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket algorithms with JWT authentication, SHA-256 API key hashing, API key management, comprehensive analytics endpoints, timeline/status/performance/per-endpoint analytics, Prisma migrations, and health checks.",
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
  },
  "projects/solana-notes.ts": {
    title: "Note-Taking DApp on Solana",
    stack: [
      "Next.js",
      "Anchor",
      "Solana",
      "Rust",
      "Phantom Wallet",
      "@solana/web3.js",
    ],
    description: "Fully on-chain note-taking decentralized application built with Anchor smart contracts. Features Program Derived Addresses for note accounts, full CRUD operations via smart contracts, Phantom Wallet authentication, and real-time blockchain state synchronization via Solana RPC APIs.",
    highlights: [
      "Program Derived Addresses for note accounts",
      "Fully on-chain CRUD via Anchor smart contracts",
      "Phantom Wallet authentication",
      "Solana RPC APIs for state sync",
      "Real-time account query updates",
    ],
    demo: "https://note-dapp.netlify.app/",
    github: "https://github.com/harshitsharmaaaa/noteTaking-Dapp",
  },
};

const terminalBoot = ["pnpm dev --portfolio", "whoami", "cat contact.tsx", "git status --short"];

function Line({ n, active, children }: { n: number; active?: boolean; children: React.ReactNode }) {
  return <div className={`grid grid-cols-[48px_1fr] text-[12px] leading-[22px] ${active ? "bg-[#2a2d2e]" : ""}`}><span className="select-none pr-4 text-right text-[#858585]">{n}</span><code className="min-w-0 whitespace-pre-wrap break-words text-[#d4d4d4]">{children}</code></div>;
}

function FileIcon({ file }: { file: FileKey }) {
  const meta = fileMeta[file];
  return <span className={`grid h-4 min-w-5 place-items-center rounded text-[9px] font-bold ${meta.color}`}>{meta.icon}</span>;
}

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileKey>("about.tsx");
  const [openTabs, setOpenTabs] = useState<FileKey[]>(["about.tsx", "projects/keymesh.ts", "projects/ai-work-flow.ts", "skills.json"]);
  const [activity, setActivity] = useState<Activity>("explorer");
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [folders, setFolders] = useState<Record<FolderKey, boolean>>({ portfolio: true, projects: true });
  const [sidebarWidth, setSidebarWidth] = useState(252);
  const [terminalHeight, setTerminalHeight] = useState(188);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [preview, setPreview] = useState<Project | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [context, setContext] = useState<{ x: number; y: number; file: FileKey } | null>(null);
  const [mobilePanel, setMobilePanel] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const resizing = useRef<"sidebar" | "terminal" | null>(null);

  const openFile = (file: FileKey) => {
    setOpenTabs((tabs) => tabs.includes(file) ? tabs : [...tabs, file]);
    setActiveFile(file);
    setPaletteOpen(false);
    setMobilePanel(false);
  };

  const closeTab = (file: FileKey) => {
    setOpenTabs((tabs) => {
      const next = tabs.filter((tab) => tab !== file);
      if (activeFile === file) setActiveFile(next.at(-1) ?? "about.tsx");
      return next.length ? next : ["about.tsx"];
    });
  };

  const executeCommand = (command: string, boot = false) => {
    const cmd = command.trim();
    if (!cmd) return;
    const response = cmd.includes("whoami") ? ["Harshit Sharma — CS AI & Robotics @ VIT Chennai"]
      : cmd.includes("contact") ? ["email: harshitjob0027@gmail.com" ,"phone: +91 9145825568", "location: Chennai, India"]
      : cmd.includes("git status") ? ["On branch main", "Changes: KEYMESH featured, AI Work Flow updated, all project URLs verified", "No runtime errors detected"]
      : cmd.includes("help") ? ["Commands: whoami, contact, git status, open keymesh.ts, open about.tsx, open skills.json, theme"]
      : cmd.startsWith("open ") ? (allFiles.includes(cmd.replace("open ", "") as FileKey) ? (openFile(cmd.replace("open ", "") as FileKey), [`Opened ${cmd.replace("open ", "")}`]) : ["File not found"])
      : cmd.includes("theme") ? (setTheme((t) => t === "dark" ? "light" : "dark"), ["Theme toggled"])
      : ["ready - compiled successfully", "Local: http://localhost:3000"];
    setTerminalLines((lines) => [...lines, `${boot ? "$" : "harshit@portfolio:~$"} ${cmd}`, ...response]);
    setTerminalInput("");
  };

  useEffect(() => {
    document.title = "Harshit Sharma — Visual Studio Code";
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Partial<{ activeFile: FileKey; openTabs: FileKey[]; sidebarWidth: number; terminalHeight: number; theme: Theme; terminalOpen: boolean; explorerOpen: boolean }>;
        if (saved.activeFile && allFiles.includes(saved.activeFile)) setActiveFile(saved.activeFile);
        if (saved.openTabs?.every((f) => allFiles.includes(f))) setOpenTabs(saved.openTabs.length ? saved.openTabs : ["about.tsx"]);
        if (saved.sidebarWidth) setSidebarWidth(saved.sidebarWidth);
        if (saved.terminalHeight) setTerminalHeight(saved.terminalHeight);
        if (saved.theme) setTheme(saved.theme);
        if (typeof saved.terminalOpen === "boolean") setTerminalOpen(saved.terminalOpen);
        if (typeof saved.explorerOpen === "boolean") setExplorerOpen(saved.explorerOpen);
      } catch {}
    }
    let delay = 0;
    terminalBoot.forEach((cmd) => {
      setTimeout(() => executeCommand(cmd, true), delay);
      delay += 650;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeFile, openTabs, sidebarWidth, terminalHeight, theme, terminalOpen, explorerOpen }));
  }, [activeFile, openTabs, sidebarWidth, terminalHeight, theme, terminalOpen, explorerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const ctrl = event.ctrlKey || event.metaKey;
      if (ctrl && event.key.toLowerCase() === "p") { event.preventDefault(); setPaletteOpen(true); }
      if (ctrl && event.key.toLowerCase() === "b") { event.preventDefault(); setExplorerOpen((v) => !v); }
      if (ctrl && (event.key.toLowerCase() === "j" || event.key === "`")) { event.preventDefault(); setTerminalOpen((v) => !v); }
      if (event.key === "Escape") { setPaletteOpen(false); setContext(null); setPreview(null); }
    };
    const onMove = (event: MouseEvent) => {
      if (resizing.current === "sidebar") setSidebarWidth(Math.min(420, Math.max(180, event.clientX - 48)));
      if (resizing.current === "terminal") setTerminalHeight(Math.min(420, Math.max(100, window.innerHeight - event.clientY - 24)));
    };
    const onUp = () => { resizing.current = null; };
    const onDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-menu-trigger]")) setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mousedown", onDocumentClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); document.removeEventListener("mousedown", onDocumentClick); };
  }, []);

  const editor = useMemo(() => renderEditor(activeFile, setPreview), [activeFile]);
  const paletteItems = allFiles.filter((file) => file.toLowerCase().includes(paletteQuery.toLowerCase()));
  const bg = theme === "dark" ? "bg-[#1e1e1e] text-[#d4d4d4]" : "bg-[#fffffe] text-[#1f2328]";

  return <main className={`h-screen overflow-hidden font-mono ${bg}`} onClick={() => setContext(null)}>
    <div className="flex h-full flex-col">
      <header className="flex h-8 shrink-0 items-center border-b border-[#3c3c3c] bg-[#323233] px-3 text-[12px] text-[#cccccc]">
        <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-[#ff5f57]"/><span className="h-3 w-3 rounded-full bg-[#febc2e]"/><span className="h-3 w-3 rounded-full bg-[#28c840]"/></div>
        <button onClick={() => setPaletteOpen(true)} className="mx-auto hidden rounded border border-[#5a5a5a] bg-[#3c3c3c] px-28 py-0.5 text-[#cccccc] hover:bg-[#454545] md:block">Harshit Sharma — Visual Studio Code</button>
        <button onClick={() => setMobilePanel(true)} className="ml-auto md:hidden">☰</button>
      </header>

      <MenuBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuRef={menuRef} explorerOpen={explorerOpen} setExplorerOpen={setExplorerOpen} terminalOpen={terminalOpen} setTerminalOpen={setTerminalOpen} paletteOpen={paletteOpen} setPaletteOpen={setPaletteOpen} setPaletteQuery={setPaletteQuery} theme={theme} setTheme={setTheme} />

      <div className="min-h-0 flex flex-1">
        <nav className="hidden w-12 shrink-0 flex-col items-center border-r border-[#3c3c3c] bg-[#333333] py-2 text-[20px] text-[#858585] md:flex">
          {([ ["explorer","📁"], ["search","🔎"], ["source","⑂"], ["extensions","▦"] ] as [Activity,string][]).map(([key, icon]) => <button key={key} onClick={() => { setActivity(key); setExplorerOpen(true); }} className={`mb-3 w-full border-l-2 py-1 ${activity === key ? "border-white text-white" : "border-transparent hover:text-[#cccccc]"}`}>{icon}</button>)}
          <button onClick={() => setTheme((t) => t === "dark" ? "light" : "dark")} className="mt-auto py-2">◐</button>
          <button className="py-2">⚙</button>
        </nav>

        {mobilePanel && <div className="fixed inset-0 z-40 flex md:hidden"><div className="w-[84vw] bg-[#252526]"><SidePanel activity={activity} activeFile={activeFile} openFile={openFile} folders={folders} setFolders={setFolders} /></div><button aria-label="Close sidebar" className="flex-1 bg-black/50" onClick={() => setMobilePanel(false)} /></div>}

        {explorerOpen && <div className="relative hidden shrink-0 md:block" style={{ width: sidebarWidth }}><SidePanel activity={activity} activeFile={activeFile} openFile={openFile} folders={folders} setFolders={setFolders} /><div onMouseDown={() => { resizing.current = "sidebar"; }} className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-[#007acc]" /></div>}

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-9 shrink-0 overflow-x-auto bg-[#252526]">
            {openTabs.map((tab) => <button key={tab} onClick={() => openFile(tab)} onContextMenu={(e) => { e.preventDefault(); setContext({ x: e.clientX, y: e.clientY, file: tab }); }} className={`group flex min-w-fit items-center gap-2 border-r border-[#3c3c3c] px-3 text-[12px] transition ${activeFile === tab ? "bg-[#1e1e1e] text-white" : "bg-[#2d2d2d] text-[#969696] hover:bg-[#333333]"}`}><FileIcon file={tab}/>{fileMeta[tab].label}<span onClick={(e) => { e.stopPropagation(); closeTab(tab); }} className="rounded px-1 opacity-60 hover:bg-[#454545] group-hover:opacity-100">×</span></button>)}
          </div>
          <div className="flex h-7 shrink-0 items-center gap-1 border-b border-[#2b2b2b] bg-[#1e1e1e] px-3 text-[11px] text-[#858585]"><span>portfolio</span><span>›</span><span>{activeFile.includes("/") ? "projects ›" : ""}</span><span className="text-[#cccccc]">{fileMeta[activeFile].label}</span></div>
          <div className="grid min-h-0 flex-1 grid-cols-[1fr_86px] overflow-hidden bg-[#1e1e1e]"><div className="overflow-auto selection:bg-[#264f78]">{editor}</div><Minimap file={activeFile}/></div>
          {terminalOpen && <div className="relative shrink-0 overflow-hidden border-t border-[#3c3c3c] bg-[#1e1e1e]" style={{ height: terminalHeight }}><div onMouseDown={() => { resizing.current = "terminal"; }} className="absolute left-0 top-0 h-1 w-full cursor-row-resize hover:bg-[#007acc]"/><div className="flex h-8 items-center gap-5 border-b border-[#3c3c3c] px-3 text-[11px] text-[#cccccc]"><span className="border-b border-[#007acc] pb-1 text-white">TERMINAL</span><span>PROBLEMS 0</span><span>OUTPUT</span><button onClick={() => setTerminalOpen(false)} className="ml-auto">×</button></div><div className="h-[calc(100%-2rem)] overflow-auto p-3 text-[12px] leading-5">{terminalLines.map((line, i) => <div key={i} className={line.includes("$") ? "text-[#4ec9b0]" : "text-[#d4d4d4]"}>{line}</div>)}<form onSubmit={(e) => { e.preventDefault(); executeCommand(terminalInput); }} className="flex"><span className="text-[#4ec9b0]">harshit@portfolio:~$&nbsp;</span><input aria-label="Terminal command" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} className="flex-1 bg-transparent outline-none" placeholder="try: help"/><span className="animate-pulse">▌</span></form></div></div>}
        </section>
      </div>
      <footer className="flex h-6 shrink-0 items-center gap-4 bg-[#007acc] px-2 text-[11px] text-white"><span>⑂ main</span><span>$(sync)</span><span>{fileMeta[activeFile].mode}</span><span>UTF-8</span><span>Ln 1, Col 1</span><button onClick={() => setTerminalOpen(true)} className="ml-auto">Terminal</button></footer>
    </div>

    {paletteOpen && <div className="fixed inset-0 z-50 bg-black/30 pt-16"><div className="mx-auto w-[min(680px,92vw)] overflow-hidden rounded-md border border-[#454545] bg-[#252526] shadow-2xl"><input autoFocus aria-label="Command palette" value={paletteQuery} onChange={(e) => setPaletteQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && paletteItems[0]) openFile(paletteItems[0]); }} className="w-full border-b border-[#3c3c3c] bg-[#3c3c3c] px-4 py-3 text-sm outline-none" placeholder="Type a file name or command..." />{paletteItems.map((file) => <button key={file} onClick={() => openFile(file)} className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-[#094771]"><FileIcon file={file}/>{file}</button>)}<button onClick={() => setTheme((t) => t === "dark" ? "light" : "dark")} className="flex w-full px-4 py-2 text-left text-sm hover:bg-[#094771]">Toggle Color Theme</button></div></div>}
    {context && <div className="fixed z-50 w-44 rounded border border-[#454545] bg-[#252526] py-1 text-[12px] shadow-xl" style={{ left: context.x, top: context.y }}><button onClick={() => closeTab(context.file)} className="block w-full px-3 py-1.5 text-left hover:bg-[#094771]">Close</button><button onClick={() => setOpenTabs([context.file])} className="block w-full px-3 py-1.5 text-left hover:bg-[#094771]">Close Others</button><button onClick={() => navigator.clipboard?.writeText(context.file)} className="block w-full px-3 py-1.5 text-left hover:bg-[#094771]">Copy Path</button></div>}
    {preview && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"><div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#3c3c3c] bg-[#252526] p-6 shadow-2xl"><div className="mb-4 flex items-center justify-between border-b border-[#3c3c3c] pb-3"><h2 className="text-xl font-bold text-white">{preview.title}</h2><button onClick={() => setPreview(null)} className="text-gray-400 hover:text-white text-xl">×</button></div>{preview.title === "Contact" ? <div className="space-y-3 text-sm"><a href="mailto:harshitjob0027@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">📧 harshitjob0027@gmail.com</a><a href="tel:+919145825568" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">📱 +91 9145825568</a><span className="text-[#ce9178] flex items-center gap-2">📍 Chennai, India</span><a href="https://drive.google.com/file/d/1wS3CkyxfTZw1rLHuu3ZULIuC1gVvRXNA/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">📄 Resume</a><a href="https://github.com/harshitsharmaaaa/" target="_blank" rel="noopener noreferrer" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">🐙 GitHub</a><a href="https://www.linkedin.com/in/harshit-sharma-46a210341/" target="_blank" rel="noopener noreferrer" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">💼 LinkedIn</a><a href="https://x.com/Harshit_Codess" target="_blank" rel="noopener noreferrer" className="text-[#ce9178] hover:text-[#4ec9b0] flex items-center gap-2">𝕏 Twitter</a></div> : <div className="space-y-6">{preview.subtitle && <p className="text-sm font-semibold text-[#4ec9b0]">{preview.subtitle}</p>}{preview.status && <div className="flex items-center gap-2"><span className="rounded bg-[#0e639c] px-2 py-0.5 text-xs text-white font-medium">{preview.status}</span>{preview.category && <span className="text-xs text-[#858585]">• {preview.category}</span>}</div>}{preview.metrics && <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 bg-[#1e1e1e] p-3 rounded border border-[#3c3c3c]">{preview.metrics.map((m) => <div key={m.label} className="text-center"><div className="text-lg font-bold text-[#4ec9b0]">{m.value}</div><div className="text-[11px] text-[#858585]">{m.label}</div></div>)}</div>}<p className="text-sm leading-6 text-[#d4d4d4]">{preview.description}</p><div className="flex flex-wrap gap-2">{preview.stack.map((s) => <span key={s} className="rounded bg-[#37373d] px-2 py-1 text-xs text-[#ce9178] border border-[#454545]">{s}</span>)}</div><div className="flex flex-wrap gap-2 pt-1">{preview.github && <a href={preview.github} target="_blank" rel="noopener noreferrer" className="rounded bg-[#007acc] px-3 py-1.5 text-xs text-white font-semibold hover:bg-[#0e86d4]">GitHub</a>}{preview.architectureLink && <a href={preview.architectureLink} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs hover:bg-[#333]">Architecture</a>}{preview.securityLink && <a href={preview.securityLink} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs hover:bg-[#333]">Security</a>}{preview.contractsLink && <a href={preview.contractsLink} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs hover:bg-[#333]">Contracts</a>}{preview.rustTssLink && <a href={preview.rustTssLink} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs hover:bg-[#333]">Rust TSS</a>}{preview.sdkLink && <a href={preview.sdkLink} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs hover:bg-[#333]">SDK</a>}{preview.demo && <a href={preview.demo} target="_blank" rel="noopener noreferrer" className="rounded bg-[#007acc] px-3 py-1.5 text-xs text-white hover:bg-[#0e86d4]">Live Demo</a>}{preview.npm && <a href={preview.npm} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-1.5 text-xs">npm</a>}</div>{preview.problem && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Problem & Threats Addressed</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.problem}</p></div>}{preview.architectureDiagram && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Architecture Diagram</h3><pre className="p-3 bg-[#1e1e1e] rounded text-[11px] font-mono text-[#ce9178] overflow-x-auto border border-[#3c3c3c]">{preview.architectureDiagram}</pre></div>}{preview.executionFlow && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Complete Execution Flow</h3><p className="text-xs text-[#d4d4d4] leading-5 bg-[#1e1e1e] p-3 rounded border border-[#3c3c3c] font-mono text-[#4ec9b0]">{preview.executionFlow}</p></div>}{preview.whyAsync && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Why Asynchronous Execution?</h3><p className="text-xs text-[#d4d4d4] leading-5 bg-[#1e1e1e] p-3 rounded border border-[#3c3c3c]">{preview.whyAsync}</p></div>}{preview.componentBreakdown && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Architecture Component Breakdown</h3><ul className="list-disc pl-4 text-xs text-[#d4d4d4] space-y-1.5">{preview.componentBreakdown.map((c, idx) => <li key={idx}>{c}</li>)}</ul></div>}{preview.transactionFlow && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Transaction Flow</h3><p className="text-xs text-[#d4d4d4] leading-5 bg-[#1e1e1e] p-2 rounded border border-[#3c3c3c]">{preview.transactionFlow}</p></div>}{preview.policyEngine && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Policy Engine</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.policyEngine}</p></div>}{preview.guardianRecovery && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Guardian Recovery</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.guardianRecovery}</p></div>}{preview.thresholdEcdsa && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Threshold ECDSA</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.thresholdEcdsa}</p></div>}{preview.tssLifecycle && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">TSS Key Lifecycle</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.tssLifecycle}</p></div>}{preview.securityModel && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Security Model</h3><p className="text-xs text-[#d4d4d4] leading-5">{preview.securityModel}</p></div>}{preview.testingDetails && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Testing & Invariants</h3><ul className="list-disc pl-4 text-xs text-[#d4d4d4] space-y-1">{preview.testingDetails.map((t, idx) => <li key={idx}>{t}</li>)}</ul></div>}{preview.whatIBuilt && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">What I Built</h3><ul className="list-disc pl-4 text-xs text-[#d4d4d4] space-y-1">{preview.whatIBuilt.map((w, idx) => <li key={idx}>{w}</li>)}</ul></div>}{preview.limitations && <div className="space-y-1 rounded border border-[#d7ba7d] bg-[#2d2a1e] p-3"><h3 className="text-xs uppercase font-bold text-[#d7ba7d] tracking-wider">Security Boundaries & Current Limitations</h3><ul className="list-disc pl-4 text-xs text-[#d4d4d4] space-y-1">{preview.limitations.map((l, idx) => <li key={idx}>{l}</li>)}</ul></div>}{preview.repoStructure && <div className="space-y-1"><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider">Repository Structure</h3><pre className="p-3 bg-[#1e1e1e] rounded text-[11px] font-mono text-[#9cdcfe] border border-[#3c3c3c]">{preview.repoStructure}</pre></div>}<div><h3 className="text-xs uppercase font-bold text-[#569cd6] tracking-wider mb-2">Key Highlights</h3><ul className="list-disc pl-4 text-xs text-[#d4d4d4] space-y-1">{preview.highlights.map((h) => <li key={h}>{h}</li>)}</ul></div></div>}</div></div>}
  </main>;
}

function SidePanel({ activity, activeFile, openFile, folders, setFolders }: { activity: Activity; activeFile: FileKey; openFile: (f: FileKey) => void; folders: Record<FolderKey, boolean>; setFolders: React.Dispatch<React.SetStateAction<Record<FolderKey, boolean>>> }) {
  if (activity === "search") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Search"/><div className="p-3"><input className="w-full border border-[#3c3c3c] bg-[#3c3c3c] px-2 py-1 text-[12px] outline-none" placeholder="Search Harshit portfolio"/><p className="mt-3 text-[12px] text-[#858585]">5 results in projects, skills, contact.</p></div></aside>;
  if (activity === "source") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Source Control"/><div className="p-3 text-[12px]"><p className="mb-2 text-[#cccccc]">CHANGES</p>{["about.tsx", "projects/blackbox.ts", "projects/keymesh.ts", "projects/ai-work-flow.ts", "skills.json"].map((f) => <p key={f} className="py-1 text-[#d4d4d4]">M {f}</p>)}</div></aside>;
  if (activity === "extensions") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Extensions"/><div className="space-y-2 p-3 text-[12px]"><p>✓ TypeScript</p><p>✓ Tailwind CSS IntelliSense</p><p>✓ Docker</p><p>✓ Prisma</p></div></aside>;
  return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Explorer"/><div className="px-2 text-[12px]"><Folder name="PORTFOLIO" open={folders.portfolio} toggle={() => setFolders((f) => ({ ...f, portfolio: !f.portfolio }))}/>{folders.portfolio && (["about.tsx", "skills.json", "education.md", "contact.tsx"] as FileKey[]).map((file) => <FileRow key={file} file={file} active={activeFile === file} openFile={openFile}/>)}<Folder name="PROJECTS" open={folders.projects} toggle={() => setFolders((f) => ({ ...f, projects: !f.projects }))}/>{folders.projects && (["projects/blackbox.ts", "projects/keymesh.ts", "projects/ai-work-flow.ts", "projects/crypt.ts", "projects/rate-limiter.ts", "projects/solana-notes.ts"] as FileKey[]).map((file) => <FileRow key={file} file={file} active={activeFile === file} openFile={openFile}/>)}</div></aside>;
}

function PanelTitle({ title }: { title: string }) { return <div className="h-9 px-4 py-2 text-[11px] uppercase tracking-wide text-[#bbbbbb]">{title}</div>; }
function Folder({ name, open, toggle }: { name: string; open: boolean; toggle: () => void }) { return <button onClick={toggle} className="flex w-full items-center gap-1 py-1 text-left font-bold uppercase text-[#cccccc]"><span>{open ? "▾" : "▸"}</span>{name}</button>; }
function FileRow({ file, active, openFile }: { file: FileKey; active: boolean; openFile: (f: FileKey) => void }) { return <button onClick={() => openFile(file)} className={`ml-3 flex w-[calc(100%-0.75rem)] items-center gap-2 px-2 py-1 text-left ${active ? "bg-[#37373d] text-white" : "text-[#cccccc] hover:bg-[#2a2d2e]"}`}><FileIcon file={file}/>{fileMeta[file].label}</button>; }
function Minimap({ file }: { file: FileKey }) { return <aside className="hidden border-l border-[#2b2b2b] bg-[#1e1e1e] p-2 opacity-70 lg:block">{Array.from({ length: 38 }).map((_, i) => <div key={i} className={`mb-1 h-1 rounded ${i % 5 === 0 ? "bg-[#569cd6]" : i % 3 === 0 ? "bg-[#ce9178]" : "bg-[#6a9955]"}`} style={{ width: `${30 + ((i * file.length) % 44)}px` }}/>)}</aside>; }

const menuItems: Record<string, { label: string; shortcut?: string; action?: () => void; submenu?: string }[]> = {
  File: [
    { label: "New File", shortcut: "Ctrl+N" },
    { label: "Open File...", shortcut: "Ctrl+O" },
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save All", shortcut: "Ctrl+Shift+S" },
    { label: "---" },
    { label: "Preferences", shortcut: "Ctrl+," },
  ],
  Edit: [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Redo", shortcut: "Ctrl+Shift+Z" },
    { label: "---" },
    { label: "Cut", shortcut: "Ctrl+X" },
    { label: "Copy", shortcut: "Ctrl+C" },
    { label: "Paste", shortcut: "Ctrl+V" },
    { label: "---" },
    { label: "Find", shortcut: "Ctrl+F" },
    { label: "Replace", shortcut: "Ctrl+H" },
  ],
  Selection: [
    { label: "Select All", shortcut: "Ctrl+A" },
    { label: "Copy Line Up", shortcut: "Ctrl+Shift+↑" },
    { label: "Copy Line Down", shortcut: "Ctrl+Shift+↓" },
  ],
  View: [
    { label: "Command Palette", shortcut: "Ctrl+Shift+P" },
    { label: "Quick Open", shortcut: "Ctrl+P" },
    { label: "---" },
    { label: "Toggle Sidebar", shortcut: "Ctrl+B" },
    { label: "Toggle Panel", shortcut: "Ctrl+J" },
    { label: "Appearance" },
    { label: "---" },
    { label: "Reload", shortcut: "Ctrl+R" },
  ],
  Go: [
    { label: "Go to File...", shortcut: "Ctrl+P" },
    { label: "Go to Definition", shortcut: "F12" },
    { label: "Go Back", shortcut: "Alt+←" },
    { label: "Go Forward", shortcut: "Alt+→" },
  ],
  Run: [
    { label: "Start Debugging", shortcut: "F5" },
    { label: "Run Without Debugging", shortcut: "Ctrl+F5" },
    { label: "Toggle Breakpoint", shortcut: "F9" },
  ],
  Terminal: [
    { label: "New Terminal", shortcut: "Ctrl+`" },
    { label: "Toggle Terminal", shortcut: "Ctrl+J" },
    { label: "---" },
    { label: "Run Task...", shortcut: "Ctrl+Shift+B" },
  ],
  Help: [
    { label: "Welcome", shortcut: "" },
    { label: "---" },
    { label: "Check for Updates", shortcut: "" },
    { label: "About", shortcut: "" },
  ],
};

function MenuBar({ activeMenu, setActiveMenu, menuRef, explorerOpen, setExplorerOpen, terminalOpen, setTerminalOpen, paletteOpen, setPaletteOpen, setPaletteQuery, theme, setTheme }: { activeMenu: string | null; setActiveMenu: (m: string | null) => void; menuRef: React.RefObject<HTMLDivElement | null>; explorerOpen: boolean; setExplorerOpen: (v: boolean) => void; terminalOpen: boolean; setTerminalOpen: (v: boolean) => void; paletteOpen: boolean; setPaletteOpen: (v: boolean) => void; setPaletteQuery: (q: string) => void; theme: Theme; setTheme: (t: Theme) => void }) {
  const menus = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];
  return <nav ref={menuRef} className="flex h-9 shrink-0 items-center gap-1 border-b border-[#3c3c3c] bg-[#323233] px-2 text-[12px] text-[#cccccc]">
    {menus.map((menu) => <div key={menu} className="relative">
      <button data-menu-trigger onClick={() => setActiveMenu(activeMenu === menu ? null : menu)} className={`px-2.5 py-1 rounded ${activeMenu === menu ? "bg-[#0e639c] text-white" : "hover:bg-[#3c3c3c]"}`}>{menu}</button>
      {activeMenu === menu && <Dropdown menu={menu} items={menuItems[menu]} explorerOpen={explorerOpen} setExplorerOpen={setExplorerOpen} terminalOpen={terminalOpen} setTerminalOpen={setTerminalOpen} paletteOpen={paletteOpen} setPaletteOpen={setPaletteOpen} setPaletteQuery={setPaletteQuery} theme={theme} setTheme={setTheme} setActiveMenu={setActiveMenu} />}
    </div>)}
  </nav>;
}

function Dropdown({ items, explorerOpen, setExplorerOpen, terminalOpen, setTerminalOpen, setPaletteOpen, setPaletteQuery, theme, setTheme, setActiveMenu }: { menu: string; items: { label: string; shortcut?: string; action?: () => void; submenu?: string }[]; explorerOpen: boolean; setExplorerOpen: (v: boolean) => void; terminalOpen: boolean; setTerminalOpen: (v: boolean) => void; paletteOpen: boolean; setPaletteOpen: (v: boolean) => void; setPaletteQuery: (q: string) => void; theme: Theme; setTheme: (t: Theme) => void; setActiveMenu: (m: string | null) => void }) {
  const runAction = (item: { label: string; shortcut?: string; action?: () => void; submenu?: string }) => {
    if (item.label === "Toggle Sidebar") setExplorerOpen(!explorerOpen);
    else if (item.label === "Toggle Panel") setTerminalOpen(!terminalOpen);
    else if (item.label === "Command Palette") { setPaletteOpen(true); setPaletteQuery(""); }
    else if (item.label === "Quick Open" || item.label === "Go to File...") { setPaletteOpen(true); setPaletteQuery(""); }
    else if (item.label === "New Terminal" || item.label === "Toggle Terminal") setTerminalOpen(true);
    else if (item.label === "Preferences" || item.label === "Appearance") setActiveMenu("preferences");
    else if (item.label === "Toggle Color Theme") setTheme(theme === "dark" ? "light" : "dark");
    item.action?.();
  };
  return <div className="absolute top-9 left-0 z-50 min-w-52 overflow-hidden rounded-md border border-[#454545] bg-[#252526] py-1 text-[12px] shadow-xl">
    {items.map((item, index) => item.label === "---" ? <div key={index} className="h-px bg-[#3c3c3c] my-1"></div> : <button key={item.label} onClick={() => runAction(item)} className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[#094771]"><span>{item.label}</span>{item.shortcut && <span className="text-[#858585]">{item.shortcut}</span>}</button>)}
  </div>;
}


function renderEditor(activeFile: FileKey, setPreview: (p: Project) => void) {
  if (activeFile === "about.tsx") return <div className="py-3"><Line n={1}><span className="text-[#569cd6]">import</span> &#123; Builder &#125; <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">"@/harshit"</span>;</Line><Line n={2}> </Line><Line n={3} active><span className="text-[#569cd6]">export const</span> profile: <span className="text-[#4ec9b0]">Builder</span> = &#123;</Line><Line n={4}>  name: <span className="text-[#ce9178]">"Harshit Sharma"</span>,</Line><Line n={5}>  education: <span className="text-[#ce9178]">"B.Tech CSE (AI & Robotics), VIT Chennai, 2027"</span>,</Line><Line n={6}>  role: <span className="text-[#ce9178]">"Full-stack developer with deep Web3 work"</span>,</Line><Line n={7}>  bio: <span className="text-[#ce9178]">"I build products end-to-end with Next.js, TypeScript, React, Node.js, and blockchain systems."</span>,</Line><Line n={8}>  values: [<span className="text-[#ce9178]">"ship fast"</span>, <span className="text-[#ce9178]">"understand deeply"</span>, <span className="text-[#ce9178]">"avoid unnecessary process"</span>],</Line><Line n={9}>&#125;;<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#d4d4d4] align-middle" /></Line></div>;
  if (activeFile.startsWith("projects/")) {
    const p = projects[activeFile as keyof typeof projects];
    return <div className="py-3">
      <Line n={1}><span className="text-[#569cd6]">export const</span> project = &#123;</Line>
      <Line n={2}>  title: <span className="text-[#ce9178]">"{p.title}"</span>,</Line>
      {p.subtitle && <Line n={3}>  subtitle: <span className="text-[#ce9178]">"{p.subtitle}"</span>,</Line>}
      {p.status && <Line n={4}>  status: <span className="text-[#ce9178]">"{p.status}"</span>,</Line>}
      <Line n={5}>  stack: <span className="text-[#ce9178]">{JSON.stringify(p.stack)}</span>,</Line>
      <Line n={6}>  description: <span className="text-[#ce9178]">"{p.description}"</span>,</Line>
      <Line n={7}>  highlights: <span className="text-[#ce9178]">{JSON.stringify(p.highlights)}</span>,</Line>
      {p.demo && <Line n={8}>  liveDemo: <span className="text-[#ce9178]">"{p.demo}"</span>,</Line>}
      <Line n={9}>  github: <span className="text-[#ce9178]">"{p.github}"</span>,</Line>
      <Line n={10}>&#125; <span className="text-[#569cd6]">as const</span>;</Line>
      <div className="ml-12 mt-4"><button onClick={() => setPreview(p)} className="rounded bg-[#007acc] px-3 py-1.5 text-[12px] text-white hover:bg-[#0e86d4]">Open Preview</button></div>
    </div>;
  }
  if (activeFile === "skills.json") return <pre className="p-4 text-[12px] leading-[22px]"><span>&#123;</span>{"\n"}  <span className="text-[#9cdcfe]">"languages"</span>: <span className="text-[#ce9178]">["Rust", "C++", "TypeScript", "JavaScript", "Solidity", "SQL", "HTML", "CSS"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"sandboxed_execution"</span>: <span className="text-[#ce9178]">["Docker Sandboxing", "Linux Kernel cgroups/seccomp", "BullMQ Async Queues", "Redis", "Nginx Proxy", "Firecracker microVM (roadmap)"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"cryptography_tss"</span>: <span className="text-[#ce9178]">["Threshold ECDSA (2-of-3)", "CGGMP'24", "synedrion", "manul", "k256", "secp256k1", "Tokio"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"blockchain"</span>: <span className="text-[#ce9178]">["Ethereum", "Foundry", "Solana", "ethers.js", "@solana/web3.js", "Anchor", "Smart Contracts", "BIP39", "BIP44", "ECDSA", "Ed25519"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"frontend"</span>: <span className="text-[#ce9178]">["React.js", "Next.js 16", "Tailwind CSS", "React Flow", "Liveblocks"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"backend"</span>: <span className="text-[#ce9178]">["Node.js", "Bun", "Turborepo", "Express", "tRPC", "REST APIs", "Server Actions", "Trigger.dev", "Fastify"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"ai_automation"</span>: <span className="text-[#ce9178]">["AI Agents", "Browserbase", "Stagehand", "Workflow Automation", "Resend"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"databases"</span>: <span className="text-[#ce9178]">["PostgreSQL", "Neon", "MongoDB", "Redis"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"orms"</span>: <span className="text-[#ce9178]">["Drizzle ORM", "Prisma"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"cloud_tools"</span>: <span className="text-[#ce9178]">["Git", "GitHub", "Docker", "AWS", "Railway", "Netlify", "Vercel"]</span>{"\n"}<span>&#125;</span></pre>;
  if (activeFile === "education.md") return <div className="p-4 text-[13px] leading-7"><p className="text-[#569cd6]"># Education</p><p><span className="text-[#dcdcaa]">VIT Chennai</span></p><p>B.Tech in Computer Science, AI & Robotics</p><p className="text-[#6a9955]">Aug 2023 — May 2027</p><p>Coursework: DAA, Computer Networks, TOC, Compiler Design, DBMS.</p></div>;
  if (activeFile === "contact.tsx") return <div className="py-3"><Line n={1}><span className="text-[#569cd6]">export default function</span> <span className="text-[#dcdcaa]">Contact</span>() &#123;</Line><Line n={2}>  <span className="text-[#569cd6]">return</span> &#123;</Line><Line n={3}>    email: <span className="text-[#ce9178]">"harshitjob0027@gmail.com"</span>,</Line><Line n={4}>    phone: <span className="text-[#ce9178]">"+91 9145825568"</span>,</Line><Line n={5}>    location: <span className="text-[#ce9178]">"Chennai, India"</span>,</Line><Line n={6}>    resume: <span className="text-[#ce9178]">"https://drive.google.com/file/d/1wS3CkyxfTZw1rLHuu3ZULIuC1gVvRXNA/view?usp=sharing"</span>,</Line><Line n={7}>    github: <span className="text-[#ce9178]">"https://github.com/harshitsharmaaaa/"</span>,</Line><Line n={8}>    linkedin: <span className="text-[#ce9178]">"https://www.linkedin.com/in/harshit-sharma-46a210341/"</span>,</Line><Line n={9}>    twitter: <span className="text-[#ce9178]">"https://x.com/Harshit_Codess"</span>,</Line><Line n={10}>  &#125;;</Line><Line n={11}>&#125;</Line><div className="ml-12 mt-4"><button onClick={() => setPreview({ title: "Contact", description: "Get in touch via email, social media, or view my resume.", stack: [], demo: "", github: "", highlights: [] } as Project)} className="rounded bg-[#007acc] px-3 py-1.5 text-[12px] text-white hover:bg-[#0e86d4]">Open Preview</button></div></div>;
}