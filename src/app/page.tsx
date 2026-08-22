"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type FileKey = "about.tsx" | "projects/crypt.ts" | "projects/solana-notes.ts" | "projects/ai-work-flow.ts" | "projects/rate-limiter.ts" | "skills.json" | "education.md" | "contact.tsx";
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
};

const STORAGE_KEY = "harshit-vscode-state-v2";

const fileMeta: Record<FileKey, { label: string; icon: string; mode: string; folder: FolderKey; color: string }> = {
  "about.tsx": { label: "about.tsx", icon: "⚛", mode: "TypeScript React", folder: "portfolio", color: "text-[#61dafb]" },
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
  const [openTabs, setOpenTabs] = useState<FileKey[]>(["about.tsx", "projects/ai-work-flow.ts", "skills.json"]);
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
      : cmd.includes("contact") ? ["email: harshit.sharma270905@gmail.com", "phone: +91 9145825568", "location: Chennai, India"]
      : cmd.includes("git status") ? ["On branch main", "Changes: AI Work Flow featured, RateLimiter added, all project URLs verified", "No runtime errors detected"]
      : cmd.includes("help") ? ["Commands: whoami, contact, git status, open about.tsx, open skills.json, theme"]
      : cmd.startsWith("open ") ? (allFiles.includes(cmd.replace("open ", "") as FileKey) ? (openFile(cmd.replace("open ", "") as FileKey), [`Opened ${cmd.replace("open ", "")}`]) : ["File not found"])
      : cmd.includes("theme") ? (setTheme((t) => t === "dark" ? "light" : "dark"), ["Theme toggled"])
      : ["ready - compiled successfully", "Local: http://localhost:3000"];
    setTerminalLines((lines) => [...lines, `${boot ? "$" : "harshit@portfolio:~$"} ${cmd}`, ...response]);
    setTerminalInput("");
  };

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
    {preview && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"><div className="max-w-xl rounded-lg border border-[#3c3c3c] bg-[#252526] p-5 shadow-2xl"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-white">{preview.title}</h2><button onClick={() => setPreview(null)}>×</button></div><p className="text-sm leading-6 text-[#d4d4d4]">{preview.description}</p><div className="mt-4 flex flex-wrap gap-2">{preview.stack.map((s) => <span key={s} className="rounded bg-[#37373d] px-2 py-1 text-xs">{s}</span>)}</div><div className="mt-5 flex gap-3">{preview.demo && <a href={preview.demo} target="_blank" rel="noopener noreferrer" className="rounded bg-[#007acc] px-3 py-2 text-sm text-white">Live demo</a>}<a href={preview.github} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-2 text-sm">GitHub</a>{preview.npm && <a href={preview.npm} target="_blank" rel="noopener noreferrer" className="rounded border border-[#555] px-3 py-2 text-sm">npm</a>}</div></div></div>}
  </main>;
}

function SidePanel({ activity, activeFile, openFile, folders, setFolders }: { activity: Activity; activeFile: FileKey; openFile: (f: FileKey) => void; folders: Record<FolderKey, boolean>; setFolders: React.Dispatch<React.SetStateAction<Record<FolderKey, boolean>>> }) {
  if (activity === "search") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Search"/><div className="p-3"><input className="w-full border border-[#3c3c3c] bg-[#3c3c3c] px-2 py-1 text-[12px] outline-none" placeholder="Search Harshit portfolio"/><p className="mt-3 text-[12px] text-[#858585]">3 results in projects, skills, contact.</p></div></aside>;
  if (activity === "source") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Source Control"/><div className="p-3 text-[12px]"><p className="mb-2 text-[#cccccc]">CHANGES</p>{["about.tsx", "projects/ai-work-flow.ts", "projects/rate-limiter.ts", "skills.json"].map((f) => <p key={f} className="py-1 text-[#d4d4d4]">M {f}</p>)}</div></aside>;
  if (activity === "extensions") return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Extensions"/><div className="space-y-2 p-3 text-[12px]"><p>✓ TypeScript</p><p>✓ Tailwind CSS IntelliSense</p><p>✓ Solidity</p><p>✓ Rust Analyzer</p></div></aside>;
  return <aside className="h-full border-r border-[#3c3c3c] bg-[#252526]"><PanelTitle title="Explorer"/><div className="px-2 text-[12px]"><Folder name="PORTFOLIO" open={folders.portfolio} toggle={() => setFolders((f) => ({ ...f, portfolio: !f.portfolio }))}/>{folders.portfolio && (["about.tsx", "skills.json", "education.md", "contact.tsx"] as FileKey[]).map((file) => <FileRow key={file} file={file} active={activeFile === file} openFile={openFile}/>)}<Folder name="PROJECTS" open={folders.projects} toggle={() => setFolders((f) => ({ ...f, projects: !f.projects }))}/>{folders.projects && (["projects/ai-work-flow.ts", "projects/crypt.ts", "projects/rate-limiter.ts", "projects/solana-notes.ts"] as FileKey[]).map((file) => <FileRow key={file} file={file} active={activeFile === file} openFile={openFile}/>)}</div></aside>;
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
    { label: "Preferences", shortcut: "Ctrl+,", submenu: "preferences" },
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
    { label: "Appearance", submenu: "appearance" },
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

function Dropdown({ menu, items, explorerOpen, setExplorerOpen, terminalOpen, setTerminalOpen, paletteOpen, setPaletteOpen, setPaletteQuery, theme, setTheme, setActiveMenu }: { menu: string; items: { label: string; shortcut?: string; action?: () => void; submenu?: string }[]; explorerOpen: boolean; setExplorerOpen: (v: boolean) => void; terminalOpen: boolean; setTerminalOpen: (v: boolean) => void; paletteOpen: boolean; setPaletteOpen: (v: boolean) => void; setPaletteQuery: (q: string) => void; theme: Theme; setTheme: (t: Theme) => void; setActiveMenu: (m: string | null) => void }) {
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
  if (activeFile.startsWith("projects/")) { const p = projects[activeFile as keyof typeof projects]; return <div className="py-3"><Line n={1}><span className="text-[#569cd6]">export const</span> project = &#123;</Line><Line n={2}>  title: <span className="text-[#ce9178]">"{p.title}"</span>,</Line><Line n={3}>  stack: <span className="text-[#ce9178]">{JSON.stringify(p.stack)}</span>,</Line><Line n={4}>  description: <span className="text-[#ce9178]">"{p.description}"</span>,</Line><Line n={5}>  highlights: <span className="text-[#ce9178]">{JSON.stringify(p.highlights)}</span>,</Line><Line n={6}>  liveDemo: <span className="text-[#ce9178]">"{p.demo}"</span>,</Line><Line n={7}>  github: <span className="text-[#ce9178]">"{p.github}"</span>,</Line><Line n={8}>&#125; <span className="text-[#569cd6]">as const</span>;</Line><div className="ml-12 mt-4"><button onClick={() => setPreview(p)} className="rounded bg-[#007acc] px-3 py-1.5 text-[12px] text-white hover:bg-[#0e86d4]">Open Preview</button></div></div>; }
  if (activeFile === "skills.json") return <pre className="p-4 text-[12px] leading-[22px]"><span>&#123;</span>{"\n"}  <span className="text-[#9cdcfe]">"languages"</span>: <span className="text-[#ce9178]">["C++", "TypeScript", "JavaScript", "Solidity", "SQL", "HTML", "CSS"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"frontend"</span>: <span className="text-[#ce9178]">["React.js", "Next.js 16", "Tailwind CSS", "React Flow", "Liveblocks"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"backend"</span>: <span className="text-[#ce9178]">["Node.js", "tRPC", "REST APIs", "Server Actions", "Trigger.dev", "Fastify"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"ai_automation"</span>: <span className="text-[#ce9178]">["AI Agents", "Browserbase", "Stagehand", "Workflow Automation", "Resend"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"databases"</span>: <span className="text-[#ce9178]">["PostgreSQL", "Neon", "MongoDB", "Redis"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"orms"</span>: <span className="text-[#ce9178]">["Drizzle ORM", "Prisma"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"blockchain"</span>: <span className="text-[#ce9178]">["Ethereum", "Solana", "ethers.js", "@solana/web3.js", "Anchor", "Smart Contracts", "BIP39", "BIP44", "ECDSA", "Ed25519"]</span>,{"\n"}  <span className="text-[#9cdcfe]">"cloud_tools"</span>: <span className="text-[#ce9178]">["Git", "GitHub", "Docker", "AWS", "Railway", "Netlify", "Vercel", "Bun"]</span>{"\n"}<span>&#125;</span></pre>;
  if (activeFile === "education.md") return <div className="p-4 text-[13px] leading-7"><p className="text-[#569cd6]"># Education</p><p><span className="text-[#dcdcaa]">VIT Chennai</span></p><p>B.Tech in Computer Science, AI & Robotics</p><p className="text-[#6a9955]">Aug 2023 — May 2027</p><p>Coursework: DAA, Computer Networks, TOC, Compiler Design, DBMS.</p></div>;
  return <div className="py-3"><Line n={1}><span className="text-[#569cd6]">export default function</span> <span className="text-[#dcdcaa]">Contact</span>() &#123;</Line><Line n={2}>  <span className="text-[#569cd6]">return</span> &#123;</Line><Line n={3}>    email: <span className="text-[#ce9178]">"harshit.sharma270905@gmail.com"</span>,</Line><Line n={4}>    phone: <span className="text-[#ce9178]">"+91 9145825568"</span>,</Line><Line n={5}>    location: <span className="text-[#ce9178]">"Chennai, India"</span>,</Line><Line n={6}>  &#125;;</Line><Line n={7}>&#125;</Line></div>;
}