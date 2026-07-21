type Project = {
  title: string;
  file: string;
  description: string;
  bullets: string[];
  stack: string[];
};

const projects: Project[] = [
  {
    title: "Crypt",
    file: "crypt.wallet.ts",
    description: "Multi-chain HD wallet generator and blockchain explorer.",
    bullets: [
      "Built a multi-chain HD wallet generator for Ethereum and Solana with real BIP39/BIP44 cryptographic key derivation and a fully client-side privacy model.",
      "Implemented BIP39/BIP44 wallet generation for Ethereum and Solana.",
      "Added automatic RPC failover for reliable blockchain queries.",
      "Built mnemonic validation for 12 and 24-word recovery phrases.",
      "Designed a privacy-first flow where private keys never leave the browser.",
    ],
    stack: ["Next.js", "TypeScript", "ethers.js", "@solana/web3.js", "BIP39"],
  },
  {
    title: "Note-Taking DApp",
    file: "solana-notes.anchor.rs",
    description: "Decentralized note-taking application on Solana.",
    bullets: [
      "Built CRUD operations through Anchor smart contracts using PDAs.",
      "Integrated Phantom Wallet for authentication and transaction signing.",
      "Managed on-chain notes with Anchor account queries and real-time UI updates.",
    ],
    stack: ["Next.js", "TypeScript", "Solana", "Anchor", "Rust"],
  },
  {
    title: "AI SaaS Platform",
    file: "ai-saas.realtime.ts",
    description: "Real-time SaaS platform with billing, auth, meetings, and messaging.",
    bullets: [
      "Reduced billing-state synchronization delay to under 2 seconds using Inngest workflows.",
      "Enabled collaboration for 25+ concurrent users with Stream.io meetings and messaging.",
      "Built authentication, billing, and backend services with tRPC, Drizzle ORM, and PostgreSQL.",
      "Deployed the production application on Vercel using Git-based workflows.",
    ],
    stack: ["Next.js", "tRPC", "Drizzle", "PostgreSQL", "Inngest"],
  },
  {
    title: "Modern Company Website",
    file: "company-site.next.tsx",
    description: "Responsive company website optimized for performance and reliability.",
    bullets: [
      "Improved page load performance with lazy loading and optimized rendering.",
      "Reduced production bugs through strict TypeScript and ESLint practices.",
      "Developed responsive UI using Next.js, React, and TypeScript.",
    ],
    stack: ["Next.js", "React", "TypeScript", "ESLint"],
  },
];

const skillGroups = [
  {
    label: "Programming",
    items: ["C++", "JavaScript", "TypeScript", "Solidity", "HTML", "CSS"],
  },
  {
    label: "Blockchain",
    items: ["Ethereum", "Solana", "ethers.js", "@solana/web3.js", "Anchor", "HD Wallets", "Smart Contracts", "ENS"],
  },
  {
    label: "Cryptography",
    items: ["BIP39", "BIP44", "Ed25519", "ECDSA", "Digital Signatures", "Hash Functions"],
  },
  {
    label: "Frameworks & Backend",
    items: ["React.js", "Next.js", "Node.js", "tRPC", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "AWS", "Prisma", "Drizzle ORM", "Vercel", "Netlify", "Bun"],
  },
];

const explorerFiles = [
  "about.harshit.ts",
  "education.vit.md",
  "crypt.wallet.ts",
  "solana-notes.anchor.rs",
  "ai-saas.realtime.ts",
  "skills.json",
  "contact.env",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(251,191,36,0.12),transparent_24%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:auto,auto,36px_36px,36px_36px]" />

      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#1e1e1e] shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#181818] px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-xs text-slate-400">harshit-sharma-portfolio — Visual Studio Code</span>
          </div>

          <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 lg:grid-cols-[260px_1fr]">
            <aside className="border-b border-white/10 bg-[#161b22] lg:border-b-0 lg:border-r">
              <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Explorer
              </div>
              <div className="p-4">
                <p className="mb-3 text-xs font-bold uppercase text-slate-500">Harshit Sharma</p>
                <div className="space-y-1 text-sm">
                  {explorerFiles.map((file) => (
                    <a key={file} href={file.includes("contact") ? "#contact" : file.includes("skills") ? "#skills" : file.includes("education") ? "#education" : file.includes("about") ? "#about" : "#projects"} className="flex items-center gap-2 rounded-lg px-2 py-2 text-slate-300 hover:bg-white/10 hover:text-white">
                      <span className="text-amber-300">▸</span>
                      {file}
                    </a>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 p-4 text-xs leading-6 text-slate-400">
                <p>📍 Chennai, India</p>
                <p>🎓 VIT Chennai</p>
                <p>🤖 CSE, AI & Robotics</p>
              </div>
            </aside>

            <div className="flex min-w-0 flex-col">
              <nav className="flex overflow-x-auto border-b border-white/10 bg-[#111827] text-sm">
                {["about.harshit.ts", "projects.ts", "skills.json", "contact.env"].map((tab, index) => (
                  <a key={tab} href={index === 0 ? "#about" : index === 1 ? "#projects" : index === 2 ? "#skills" : "#contact"} className="border-r border-white/10 px-5 py-3 text-slate-300 hover:bg-white/5">
                    {tab}
                  </a>
                ))}
              </nav>

              <div className="flex-1 overflow-hidden">
                <section id="about" className="grid gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
                  <div>
                    <p className="font-mono text-sm text-sky-300">const developer = &#123;</p>
                    <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
                      Harshit Sharma
                    </h1>
                    <p className="mt-5 text-2xl font-semibold text-amber-200">
                      Computer Science student building blockchain, AI SaaS, and real-time web systems.
                    </p>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                      I build products end-to-end, mostly with Next.js, TypeScript, React, and Node.js, with a strong secondary focus on Web3 and blockchain systems. I care about understanding systems deeply, especially cryptography and distributed systems, and shipping fast without unnecessary process.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a className="rounded-full bg-sky-400 px-6 py-3 font-bold text-slate-950 hover:bg-sky-300" href="mailto:harshit.sharma270905@gmail.com">Email me</a>
                      <a className="rounded-full border border-white/15 px-6 py-3 font-bold text-white hover:border-amber-200 hover:text-amber-100" href="#projects">View projects</a>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#0d1117] p-5 font-mono text-sm leading-7 shadow-xl">
                    <p><span className="text-purple-300">export const</span> harshit = &#123;</p>
                    <p className="pl-5"><span className="text-sky-300">location</span>: <span className="text-amber-200">&quot;Chennai, India&quot;</span>,</p>
                    <p className="pl-5"><span className="text-sky-300">college</span>: <span className="text-amber-200">&quot;VIT Chennai&quot;</span>,</p>
                    <p className="pl-5"><span className="text-sky-300">degree</span>: <span className="text-amber-200">&quot;B.Tech CSE, AI & Robotics&quot;</span>,</p>
                    <p className="pl-5"><span className="text-sky-300">focus</span>: [<span className="text-amber-200">&quot;blockchain&quot;</span>, <span className="text-amber-200">&quot;ai-saas&quot;</span>, <span className="text-amber-200">&quot;web3&quot;</span>],</p>
                    <p className="pl-5"><span className="text-sky-300">email</span>: <span className="text-amber-200">&quot;harshit.sharma270905@gmail.com&quot;</span></p>
                    <p>&#125;;</p>
                  </div>
                </section>

                <section id="education" className="border-t border-white/10 px-5 py-10 md:px-8">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-300">Education</p>
                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <h2 className="text-3xl font-black text-white">VIT Chennai</h2>
                        <p className="mt-2 text-slate-300">B.Tech in Computer Science, AI & Robotics</p>
                      </div>
                      <p className="text-amber-200">Aug 2023 — May 2027</p>
                    </div>
                    <p className="mt-5 text-slate-400">Relevant coursework: Design and Analysis of Algorithms, Computer Networks, Theory of Computation, Compiler Design, Database Management Systems.</p>
                  </div>
                </section>

                <section id="projects" className="border-t border-white/10 px-5 py-10 md:px-8">
                  <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-200">Projects</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight text-white">Production-minded builds</h2>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-2">
                    {projects.map((project) => (
                      <article key={project.title} className="rounded-3xl border border-white/10 bg-[#0d1117] p-6 transition hover:-translate-y-1 hover:border-sky-300/50">
                        <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div>
                            <h3 className="text-2xl font-black text-white">{project.title}</h3>
                            <p className="mt-1 text-sm text-sky-300">{project.file}</p>
                          </div>
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">built</span>
                        </div>
                        <p className="text-slate-300">{project.description}</p>
                        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
                          {project.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.stack.map((tech) => <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">{tech}</span>)}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="skills" className="border-t border-white/10 px-5 py-10 md:px-8">
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-300">Skills</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight text-white">Technical stack</h2>
                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {skillGroups.map((group) => (
                      <div key={group.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                        <h3 className="font-mono text-lg font-bold text-amber-200">{group.label}</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.items.map((item) => <span key={item} className="rounded-full bg-[#0d1117] px-3 py-2 text-sm text-slate-300">{item}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="contact" className="border-t border-white/10 px-5 py-10 md:px-8">
                  <div className="rounded-3xl border border-amber-300/30 bg-amber-300 p-7 text-slate-950 md:p-10">
                    <p className="font-mono font-bold">terminal</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight">Want to collaborate or review my work?</h2>
                    <div className="mt-6 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
                      <p><span className="text-emerald-300">harshit@portfolio</span>:~$ contact --email</p>
                      <p className="text-amber-200">harshit.sharma270905@gmail.com</p>
                      <p><span className="text-emerald-300">harshit@portfolio</span>:~$ location</p>
                      <p className="text-sky-300">Chennai, India</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href="mailto:harshit.sharma270905@gmail.com" className="rounded-full bg-slate-950 px-6 py-3 font-bold text-white">Send email</a>
                      <a href="#" className="rounded-full border border-slate-950 px-6 py-3 font-bold">GitHub</a>
                      <a href="#" className="rounded-full border border-slate-950 px-6 py-3 font-bold">LinkedIn</a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
