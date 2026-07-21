"use client";

import { useEffect, useMemo, useState } from "react";

type FileKey = "about.tsx" | "projects.tsx" | "skills.json" | "education.md" | "contact.env";

type Project = {
  title: string;
  description: string;
  stack: string[];
  bullets: string[];
};

const fileTree: { name: FileKey; folder: string }[] = [
  { folder: "About", name: "about.tsx" },
  { folder: "Projects", name: "projects.tsx" },
  { folder: "Skills", name: "skills.json" },
  { folder: "Education", name: "education.md" },
  { folder: "Contact", name: "contact.env" },
];

const projects: Project[] = [
  {
    title: "Crypt",
    description: "Multi-chain HD wallet generator and blockchain explorer for Ethereum + Solana.",
    stack: ["Next.js", "TypeScript", "ethers.js", "Solana web3.js", "BIP39/BIP44"],
    bullets: [
      "Real BIP39/BIP44 cryptographic key derivation from mnemonic phrases.",
      "Fully client-side architecture so private keys never leave the browser.",
      "Automatic RPC failover for reliable Ethereum and Solana blockchain queries.",
    ],
  },
  {
    title: "Solana Notes DApp",
    description: "Decentralized note-taking app using Anchor smart contracts and PDAs.",
    stack: ["Next.js", "TypeScript", "Anchor", "Solana", "Phantom"],
    bullets: [
      "CRUD operations through Program Derived Addresses.",
      "Phantom wallet authentication and transaction signing.",
      "Real-time UI updates from Anchor account queries.",
    ],
  },
  {
    title: "AI SaaS Platform",
    description: "Real-time SaaS with billing, messaging, meetings, and event-driven workflows.",
    stack: ["tRPC", "Drizzle", "PostgreSQL", "Inngest", "Stream.io"],
    bullets: [
      "Billing sync reduced to under 2 seconds using Inngest workflows.",
      "Collaboration support for 25+ concurrent users.",
      "Authentication, billing, backend services, and Vercel deployment.",
    ],
  },
];

const skills = {
  programming: ["C++", "JavaScript", "TypeScript", "Solidity", "HTML", "CSS"],
  frontend_backend: ["React", "Next.js", "Node.js", "tRPC", "Prisma", "Drizzle ORM"],
  databases_tools: ["PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Git", "Vercel", "Bun"],
  blockchain_crypto: ["Ethereum", "Solana", "Anchor", "HD Wallets", "BIP39", "BIP44", "Ed25519", "ECDSA"],
};

const terminalBoot = [
  "$ whoami",
  "Harshit Sharma — full-stack + Web3 developer",
  "$ cat focus.txt",
  "Next.js • TypeScript • React • Node.js • Solana • Ethereum • distributed systems",
  "$ npm run portfolio",
  "Compiled: about.tsx, projects.tsx, skills.json, education.md, contact.env",
  "$ contact --email",
  "harshit.sharma270905@gmail.com",
];

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3 leading-6">
      <span className="select-none text-right text-[11px] text-slate-600">{n}</span>
      <div className="min-w-0 text-slate-300">{children}</div>
    </div>
  );
}

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileKey>("about.tsx");
  const [openTabs, setOpenTabs] = useState<FileKey[]>(["about.tsx", "projects.tsx", "skills.json"]);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    setTerminalLines([]);
    terminalBoot.forEach((line, index) => {
      window.setTimeout(() => {
        setTerminalLines((current) => [...current, line]);
      }, index * 220);
    });
  }, []);

  const openFile = (file: FileKey) => {
    setActiveFile(file);
    setOpenTabs((tabs) => (tabs.includes(file) ? tabs : [...tabs, file]));
  };

  const closeTab = (file: FileKey) => {
    setOpenTabs((tabs) => {
      const next = tabs.filter((tab) => tab !== file);
      if (activeFile === file) setActiveFile(next.at(-1) ?? "about.tsx");
      return next.length ? next : ["about.tsx"];
    });
  };

  const content = useMemo(() => {
    if (activeFile === "about.tsx") {
      return (
        <div className="p-4 text-[13px] sm:p-5">
          <CodeLine n={1}><span className="text-purple-300">export default function</span> <span className="text-yellow-200">About</span>() &#123;</CodeLine>
          <CodeLine n={2}>  <span className="text-purple-300">const</span> profile = &#123;</CodeLine>
          <CodeLine n={3}>    name: <span className="text-amber-200">&quot;Harshit Sharma&quot;</span>,</CodeLine>
          <CodeLine n={4}>    role: <span className="text-amber-200">&quot;Full-stack Developer + Web3 Builder&quot;</span>,</CodeLine>
          <CodeLine n={5}>    college: <span className="text-amber-200">&quot;VIT Chennai, CSE AI & Robotics, 2027&quot;</span>,</CodeLine>
          <CodeLine n={6}>    stack: [<span className="text-amber-200">&quot;Next.js&quot;</span>, <span className="text-amber-200">&quot;TypeScript&quot;</span>, <span className="text-amber-200">&quot;React&quot;</span>, <span className="text-amber-200">&quot;Node.js&quot;</span>],</CodeLine>
          <CodeLine n={7}>  &#125;;</CodeLine>
          <CodeLine n={8}> </CodeLine>
          <CodeLine n={9}>  <span className="text-slate-500">// Bio</span></CodeLine>
          <CodeLine n={10}>  <span className="text-emerald-300">return</span> <span className="text-amber-200">&quot;I build products end-to-end, with deep interest in cryptography, distributed systems, and blockchain infrastructure. I like shipping fast, but I also care about understanding the system beneath the abstraction.&quot;</span>;</CodeLine>
          <CodeLine n={11}>&#125;</CodeLine>
        </div>
      );
    }

    if (activeFile === "projects.tsx") {
      return (
        <div className="grid gap-3 p-4 text-[13px] sm:grid-cols-3 sm:p-5">
          {projects.map((project) => (
            <article key={project.title} className="rounded-xl border border-white/10 bg-[#111827] p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h2 className="text-base font-bold text-white">{project.title}</h2>
                <span className="rounded bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">built</span>
              </div>
              <p className="text-xs leading-5 text-slate-300">{project.description}</p>
              <ul className="mt-3 space-y-1.5 text-[11px] leading-5 text-slate-400">
                {project.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-[10px] text-sky-200">{tech}</span>)}
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeFile === "skills.json") {
      return (
        <pre className="overflow-auto p-4 text-[12px] leading-6 text-slate-300 sm:p-5">
          <span className="text-slate-500">&#123;</span>{"\n"}
          {Object.entries(skills).map(([key, values], index) => (
            <span key={key}>  <span className="text-sky-300">&quot;{key}&quot;</span>: <span className="text-amber-200">{JSON.stringify(values)}</span>{index < Object.keys(skills).length - 1 ? "," : ""}{"\n"}</span>
          ))}
          <span className="text-slate-500">&#125;</span>
        </pre>
      );
    }

    if (activeFile === "education.md") {
      return (
        <div className="p-4 text-[13px] leading-7 text-slate-300 sm:p-5">
          <h1 className="text-xl font-bold text-white"># Education</h1>
          <p className="mt-3"><span className="text-amber-200">VIT Chennai</span> — B.Tech Computer Science, AI & Robotics</p>
          <p>Timeline: Aug 2023 → May 2027</p>
          <p className="mt-3 text-slate-400">Relevant coursework: Design and Analysis of Algorithms, Computer Networks, Theory of Computation, Compiler Design, Database Management Systems.</p>
        </div>
      );
    }

    return (
      <div className="p-4 text-[13px] leading-7 sm:p-5">
        <CodeLine n={1}>EMAIL=<span className="text-amber-200">harshit.sharma270905@gmail.com</span></CodeLine>
        <CodeLine n={2}>LOCATION=<span className="text-amber-200">Chennai, India</span></CodeLine>
        <CodeLine n={3}>GITHUB=<span className="text-slate-500">add-your-github-link</span></CodeLine>
        <CodeLine n={4}>LINKEDIN=<span className="text-slate-500">add-your-linkedin-link</span></CodeLine>
      </div>
    );
  }, [activeFile]);

  return (
    <main className="h-screen overflow-hidden bg-[#0d1117] p-2 text-slate-100 sm:p-3">
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-[#181818] px-3">
          <span className="size-2.5 rounded-full bg-[#ff5f56]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 truncate text-[11px] text-slate-400">harshit-sharma-portfolio — VS Code</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[210px_1fr]">
          <aside className="hidden border-r border-white/10 bg-[#161b22] sm:block">
            <div className="border-b border-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Explorer</div>
            <div className="p-2">
              {fileTree.map((file) => (
                <button key={file.name} onClick={() => openFile(file.name)} className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] ${activeFile === file.name ? "bg-[#24324a] text-white" : "text-slate-300 hover:bg-white/10"}`}>
                  <span className="text-sky-300">▸</span>
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex min-w-0 flex-col">
            <div className="flex shrink-0 overflow-x-auto border-b border-white/10 bg-[#111827]">
              <div className="flex sm:hidden">
                {fileTree.map((file) => (
                  <button key={file.name} onClick={() => openFile(file.name)} className="border-r border-white/10 px-3 py-2 text-[11px] text-slate-300">{file.name}</button>
                ))}
              </div>
              {openTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveFile(tab)} className={`group flex items-center gap-2 border-r border-white/10 px-3 py-2 text-[12px] ${activeFile === tab ? "bg-[#1e1e1e] text-white" : "text-slate-400 hover:bg-white/5"}`}>
                  <span>{tab}</span>
                  <span onClick={(event) => { event.stopPropagation(); closeTab(tab); }} className="rounded px-1 text-slate-500 hover:bg-white/10 hover:text-white">×</span>
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-[#0d1117]">
              {content}
            </div>

            <div className="h-[26vh] min-h-36 shrink-0 border-t border-white/10 bg-[#080c12]">
              <div className="flex h-8 items-center gap-4 border-b border-white/10 px-3 text-[11px] text-slate-400">
                <span className="border-b border-sky-300 pb-1 text-sky-200">TERMINAL</span>
                <span>PROBLEMS 0</span>
                <span>OUTPUT</span>
              </div>
              <div className="h-[calc(100%-2rem)] overflow-auto p-3 font-mono text-[11px] leading-5 text-slate-300">
                {terminalLines.map((line, index) => (
                  <div key={`${line}-${index}`} className={line.startsWith("$") ? "text-emerald-300" : "text-slate-300"}>{line}</div>
                ))}
                <span className="inline-block h-4 w-2 animate-pulse bg-slate-300 align-middle" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
