"use client";

import { useEffect, useMemo, useState } from "react";

type FileKey = "about.tsx" | "projects/crypt.ts" | "projects/solana-notes.ts" | "projects/ai-saas.ts" | "skills.json" | "education.md" | "contact.tsx";
type FolderKey = "portfolio" | "projects";

const files: { key: FileKey; label: string; icon: string; mode: string; folder?: FolderKey }[] = [
  { key: "about.tsx", label: "about.tsx", icon: "⚛", mode: "TypeScript React", folder: "portfolio" },
  { key: "projects/crypt.ts", label: "crypt.ts", icon: "TS", mode: "TypeScript", folder: "projects" },
  { key: "projects/solana-notes.ts", label: "solana-notes.ts", icon: "TS", mode: "TypeScript", folder: "projects" },
  { key: "projects/ai-saas.ts", label: "ai-saas.ts", icon: "TS", mode: "TypeScript", folder: "projects" },
  { key: "skills.json", label: "skills.json", icon: "{}", mode: "JSON", folder: "portfolio" },
  { key: "education.md", label: "education.md", icon: "MD", mode: "Markdown", folder: "portfolio" },
  { key: "contact.tsx", label: "contact.tsx", icon: "⚛", mode: "TypeScript React", folder: "portfolio" },
];

const terminalScript = [
  "$ pnpm dev --portfolio",
  "ready - started server on localhost:3000",
  "$ whoami",
  "Harshit Sharma",
  "$ cat ./contact.tsx",
  "email: harshit.sharma270905@gmail.com",
  "location: Chennai, India",
  "$ git status --short",
  "M projects/crypt.ts  M skills.json  ✓ available for internships / projects",
];

const projectData = {
  "projects/crypt.ts": {
    title: "Crypt",
    stack: ["Next.js", "TypeScript", "ethers.js", "@solana/web3.js", "BIP39", "BIP44"],
    description: "A privacy-first multi-chain HD wallet generator and blockchain explorer for Ethereum and Solana.",
    bullets: ["client-side key generation", "12/24 word mnemonic validation", "automatic RPC failover", "private keys never leave browser"],
    demo: "https://demo.example.com/crypt",
    github: "https://github.com/harshit/crypt",
  },
  "projects/solana-notes.ts": {
    title: "Note-Taking DApp on Solana",
    stack: ["Next.js", "TypeScript", "Anchor", "Rust", "Solana", "Phantom"],
    description: "A decentralized note-taking app powered by Anchor smart contracts and Program Derived Addresses.",
    bullets: ["PDA-based note accounts", "CRUD through smart contracts", "Phantom wallet signing", "real-time account query updates"],
    demo: "https://demo.example.com/solana-notes",
    github: "https://github.com/harshit/solana-notes",
  },
  "projects/ai-saas.ts": {
    title: "AI SaaS Platform",
    stack: ["Next.js", "tRPC", "Drizzle ORM", "PostgreSQL", "Inngest", "Stream.io"],
    description: "A production SaaS platform with real-time collaboration, billing, auth, and event-driven backend workflows.",
    bullets: ["billing sync under 2 seconds", "25+ concurrent users", "meetings and messaging", "Vercel production deployment"],
    demo: "https://demo.example.com/ai-saas",
    github: "https://github.com/harshit/ai-saas",
  },
} as const;

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return <div className="grid grid-cols-[44px_1fr] text-[12px] leading-[22px]"><span className="select-none pr-4 text-right text-[#858585]">{n}</span><code className="min-w-0 whitespace-pre-wrap break-words text-[#d4d4d4]">{children}</code></div>;
}

function Icon({ children, color = "text-[#569cd6]" }: { children: React.ReactNode; color?: string }) {
  return <span className={`grid h-4 min-w-4 place-items-center rounded text-[9px] font-bold ${color}`}>{children}</span>;
}

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileKey>("about.tsx");
  const [openTabs, setOpenTabs] = useState<FileKey[]>(["about.tsx", "projects/crypt.ts", "skills.json"]);
  const [collapsed, setCollapsed] = useState<Record<FolderKey, boolean>>({ portfolio: false, projects: false });
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [mobileExplorer, setMobileExplorer] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Harshit Sharma — Visual Studio Code";
    setTerminalLines([]);
    terminalScript.forEach((line, i) => setTimeout(() => setTerminalLines((current) => [...current, line]), i * 190));
  }, []);

  const current = files.find((file) => file.key === activeFile) ?? files[0];

  const openFile = (key: FileKey) => {
    setActiveFile(key);
    setOpenTabs((tabs) => (tabs.includes(key) ? tabs : [...tabs, key]));
    setMobileExplorer(false);
  };

  const closeTab = (key: FileKey) => {
    setOpenTabs((tabs) => {
      const next = tabs.filter((tab) => tab !== key);
      if (activeFile === key) setActiveFile(next.at(-1) ?? "about.tsx");
      return next.length ? next : ["about.tsx"];
    });
  };

  const editor = useMemo(() => {
    if (activeFile === "about.tsx") return <div className="py-3">
      <Line n={1}><span className="text-[#569cd6]">import</span> &#123; Builder &#125; <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">&quot;@/harshit&quot;</span>;</Line>
      <Line n={2}> </Line>
      <Line n={3}><span className="text-[#569cd6]">export const</span> profile: <span className="text-[#4ec9b0]">Builder</span> = &#123;</Line>
      <Line n={4}>  name: <span className="text-[#ce9178]">&quot;Harshit Sharma&quot;</span>,</Line>
      <Line n={5}>  education: <span className="text-[#ce9178]">&quot;B.Tech CSE (AI & Robotics), VIT Chennai, 2027&quot;</span>,</Line>
      <Line n={6}>  role: <span className="text-[#ce9178]">&quot;Full-stack developer with deep Web3 work&quot;</span>,</Line>
      <Line n={7}>  stack: [<span className="text-[#ce9178]">&quot;Next.js&quot;</span>, <span className="text-[#ce9178]">&quot;TypeScript&quot;</span>, <span className="text-[#ce9178]">&quot;React&quot;</span>, <span className="text-[#ce9178]">&quot;Node.js&quot;</span>],</Line>
      <Line n={8}>  focus: [<span className="text-[#ce9178]">&quot;cryptography&quot;</span>, <span className="text-[#ce9178]">&quot;distributed systems&quot;</span>, <span className="text-[#ce9178]">&quot;blockchain infrastructure&quot;</span>],</Line>
      <Line n={9}>  bio: <span className="text-[#ce9178]">&quot;I build products end-to-end, ship fast, and like understanding the system beneath the abstraction.&quot;</span>,</Line>
      <Line n={10}>&#125;;</Line>
    </div>;

    if (activeFile.startsWith("projects/")) {
      const project = projectData[activeFile as keyof typeof projectData];
      return <div className="py-3">
        <Line n={1}><span className="text-[#569cd6]">export const</span> project = &#123;</Line>
        <Line n={2}>  title: <span className="text-[#ce9178]">&quot;{project.title}&quot;</span>,</Line>
        <Line n={3}>  stack: <span className="text-[#ce9178]">{JSON.stringify(project.stack)}</span>,</Line>
        <Line n={4}>  description: <span className="text-[#ce9178]">&quot;{project.description}&quot;</span>,</Line>
        <Line n={5}>  highlights: <span className="text-[#ce9178]">{JSON.stringify(project.bullets)}</span>,</Line>
        <Line n={6}>  liveDemo: <span className="text-[#ce9178]">&quot;{project.demo}&quot;</span>,</Line>
        <Line n={7}>  github: <span className="text-[#ce9178]">&quot;{project.github}&quot;</span>,</Line>
        <Line n={8}>&#125; <span className="text-[#569cd6]">as const</span>;</Line>
      </div>;
    }

    if (activeFile === "skills.json") return <pre className="p-4 text-[12px] leading-[22px] text-[#d4d4d4]"><span className="text-[#d4d4d4]">&#123;</span>{"\n"}  <span className="text-[#9cdcfe]">&quot;programming&quot;</span>: <span className="text-[#ce9178]">["C++", "JavaScript", "TypeScript", "Solidity"]</span>,{"\n"}  <span className="text-[#9cdcfe]">&quot;frontend_backend&quot;</span>: <span className="text-[#ce9178]">["React", "Next.js", "Node.js", "tRPC"]</span>,{"\n"}  <span className="text-[#9cdcfe]">&quot;databases"</span>: <span className="text-[#ce9178]">["PostgreSQL", "MongoDB", "Redis"]</span>,{"\n"}  <span className="text-[#9cdcfe]">&quot;tools"</span>: <span className="text-[#ce9178]">["Git", "Docker", "AWS", "Prisma", "Drizzle", "Vercel", "Bun"]</span>,{"\n"}  <span className="text-[#9cdcfe]">&quot;crypto_web3"</span>: <span className="text-[#ce9178]">["Ethereum", "Solana", "Anchor", "BIP39", "BIP44", "Ed25519", "ECDSA"]</span>{"\n"}<span>&#125;</span></pre>;

    if (activeFile === "education.md") return <div className="p-4 text-[13px] leading-7"><p className="text-[#569cd6]"># Education</p><p><span className="text-[#dcdcaa]">VIT Chennai</span></p><p>B.Tech in Computer Science, AI & Robotics</p><p className="text-[#6a9955]">Aug 2023 — May 2027</p><p className="mt-3 text-[#d4d4d4]">Relevant coursework: DAA, Computer Networks, Theory of Computation, Compiler Design, DBMS.</p></div>;

    return <div className="py-3">
      <Line n={1}><span className="text-[#569cd6]">export default function</span> <span className="text-[#dcdcaa]">Contact</span>() &#123;</Line>
      <Line n={2}>  <span className="text-[#569cd6]">return</span> &#123;</Line>
      <Line n={3}>    email: <span className="text-[#ce9178]">&quot;harshit.sharma270905@gmail.com&quot;</span>,</Line>
      <Line n={4}>    phone: <span className="text-[#ce9178]">&quot;+91 9145825568&quot;</span>,</Line>
      <Line n={5}>    location: <span className="text-[#ce9178]">&quot;Chennai, India&quot;</span>,</Line>
      <Line n={6}>    github: <span className="text-[#ce9178]">&quot;add-your-github&quot;</span>,</Line>
      <Line n={7}>    linkedin: <span className="text-[#ce9178]">&quot;add-your-linkedin&quot;</span>,</Line>
      <Line n={8}>  &#125;;</Line>
      <Line n={9}>&#125;</Line>
    </div>;
  }, [activeFile]);

  const Explorer = <aside className={`${explorerOpen ? "w-[245px]" : "w-0"} overflow-hidden border-r border-[#3c3c3c] bg-[#252526] transition-all duration-200`}>
    <div className="flex h-9 items-center justify-between px-4 text-[11px] uppercase tracking-wide text-[#bbbbbb]"><span>Explorer</span><button onClick={() => setExplorerOpen(false)} className="text-[#cccccc]">×</button></div>
    <div className="px-2 text-[12px] text-[#cccccc]">
      <button onClick={() => setCollapsed((c) => ({ ...c, portfolio: !c.portfolio }))} className="flex w-full items-center gap-1 py-1 text-left font-bold uppercase"><span>{collapsed.portfolio ? "▸" : "▾"}</span> Portfolio</button>
      {!collapsed.portfolio && files.filter(f => f.folder === "portfolio").map((file) => <button key={file.key} onClick={() => openFile(file.key)} className={`ml-3 flex w-[calc(100%-0.75rem)] items-center gap-2 px-2 py-1 text-left ${activeFile === file.key ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}><Icon color={file.icon === "MD" ? "text-[#519aba]" : "text-[#569cd6]"}>{file.icon}</Icon>{file.label}</button>)}
      <button onClick={() => setCollapsed((c) => ({ ...c, projects: !c.projects }))} className="mt-1 flex w-full items-center gap-1 py-1 text-left font-bold uppercase"><span>{collapsed.projects ? "▸" : "▾"}</span> projects</button>
      {!collapsed.projects && files.filter(f => f.folder === "projects").map((file) => <button key={file.key} onClick={() => openFile(file.key)} className={`ml-3 flex w-[calc(100%-0.75rem)] items-center gap-2 px-2 py-1 text-left ${activeFile === file.key ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}><Icon>TS</Icon>{file.label}</button>)}
    </div>
  </aside>;

  return <main className="h-screen overflow-hidden bg-[#1e1e1e] font-mono text-[#d4d4d4]">
    <div className="flex h-full flex-col">
      <div className="flex h-8 shrink-0 items-center border-b border-[#3c3c3c] bg-[#323233] px-3 text-[12px] text-[#cccccc]">
        <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-[#ff5f57]"/><span className="h-3 w-3 rounded-full bg-[#febc2e]"/><span className="h-3 w-3 rounded-full bg-[#28c840]"/></div>
        <div className="mx-auto hidden sm:block">Harshit Sharma — Visual Studio Code</div>
        <button onClick={() => setMobileExplorer(true)} className="ml-auto sm:hidden">☰</button>
      </div>

      <div className="min-h-0 flex flex-1">
        <nav className="hidden w-12 shrink-0 flex-col items-center gap-4 border-r border-[#3c3c3c] bg-[#333333] py-3 text-xl text-[#cccccc] sm:flex"><button onClick={() => setExplorerOpen((v) => !v)} className={explorerOpen ? "text-white" : "text-[#858585]"}>📁</button><span>🔎</span><span>⑂</span><span>🐞</span><span className="mt-auto">⚙</span></nav>
        <div className={`${mobileExplorer ? "fixed inset-0 z-30 flex sm:hidden" : "hidden"}`}><div className="w-[82vw] bg-[#252526]">{Explorer}</div><button className="flex-1 bg-black/50" onClick={() => setMobileExplorer(false)} /></div>
        <div className="hidden sm:block">{Explorer}</div>

        <section className="flex min-w-0 flex-1 flex-col bg-[#1e1e1e]">
          <div className="flex h-9 shrink-0 overflow-x-auto bg-[#252526]">
            {openTabs.map((tab) => {
              const file = files.find(f => f.key === tab)!;
              return <button key={tab} onClick={() => setActiveFile(tab)} className={`group flex min-w-fit items-center gap-2 border-r border-[#3c3c3c] px-3 text-[12px] transition ${activeFile === tab ? "bg-[#1e1e1e] text-white" : "bg-[#2d2d2d] text-[#969696] hover:bg-[#333333]"}`}><Icon color={file.icon === "{}" ? "text-[#f1c40f]" : file.icon === "MD" ? "text-[#519aba]" : "text-[#569cd6]"}>{file.icon}</Icon>{file.label}<span onClick={(e) => { e.stopPropagation(); closeTab(tab); }} className="rounded px-1 opacity-60 hover:bg-[#454545] group-hover:opacity-100">×</span></button>;
            })}
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-[#1e1e1e]">{editor}</div>
          {terminalOpen && <div className="h-[190px] min-h-[120px] resize-y overflow-auto border-t border-[#3c3c3c] bg-[#1e1e1e]">
            <div className="flex h-8 items-center gap-5 border-b border-[#3c3c3c] px-3 text-[11px] text-[#cccccc]"><span className="border-b border-[#007acc] pb-1 text-white">TERMINAL</span><span>OUTPUT</span><span>DEBUG CONSOLE</span><button onClick={() => setTerminalOpen(false)} className="ml-auto">×</button></div>
            <div className="p-3 text-[12px] leading-5">{terminalLines.map((line, i) => <div key={i} className={line.startsWith("$") ? "text-[#4ec9b0]" : "text-[#d4d4d4]"}>{line}</div>)}<span className="inline-block h-4 w-2 animate-pulse bg-[#d4d4d4]" /></div>
          </div>}
        </section>
      </div>
      <div className="flex h-6 shrink-0 items-center gap-4 bg-[#007acc] px-2 text-[11px] text-white"><span>⑂ main</span><span>✓ synced</span><span>{current.mode}</span><span>Ln 1, Col 1</span><button onClick={() => setTerminalOpen(true)} className="ml-auto">Terminal</button></div>
    </div>
  </main>;
}
