const stats = [
  { label: "Projects shipped", value: "24+" },
  { label: "Learners helped", value: "10k+" },
  { label: "Years building", value: "5" },
];

const work = [
  {
    title: "AI Product Studio",
    description:
      "I turn raw ideas into fast, elegant web products with strategy, design, and production-ready code.",
    tags: ["Next.js", "TypeScript", "AI"],
  },
  {
    title: "Creator Operating System",
    description:
      "A content-first dashboard for launches, cohorts, community touchpoints, and reusable playbooks.",
    tags: ["Design Systems", "SaaS", "Automation"],
  },
  {
    title: "Learning Experiences",
    description:
      "Interactive learning journeys that make technical topics feel practical, friendly, and memorable.",
    tags: ["Education", "UX", "Frontend"],
  },
];

const testimonials = [
  "The rare builder who can explain, design, and ship with the same level of clarity.",
  "Every screen feels intentional. The final product was faster and sharper than expected.",
  "A calm, practical approach that turns complicated ideas into something people actually use.",
];

const socials = ["YouTube", "GitHub", "LinkedIn", "X / Twitter"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#111111] text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.16),transparent_26%),radial-gradient(circle_at_80%_0%,rgba(251,146,60,0.12),transparent_25%),linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,auto,42px_42px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-amber-300 font-black text-zinc-950 shadow-[0_0_40px_rgba(251,191,36,0.35)]">
            Y
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">your.name</span>
            <span className="block text-xs text-stone-400">Visual Studio Code</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-stone-300 md:flex">
          <a className="hover:text-amber-200" href="#about">About</a>
          <a className="hover:text-amber-200" href="#work">Work</a>
          <a className="hover:text-amber-200" href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-semibold text-amber-100 backdrop-blur hover:bg-amber-300 hover:text-zinc-950">
          Let&apos;s talk
        </a>
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-300">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Available for select projects
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            I build useful digital products and teach what I learn.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Replace this with your story. This site is a personal-brand homepage for a creator, developer, educator, or founder who wants a warm, code-inspired online presence.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#work" className="rounded-full bg-amber-300 px-7 py-4 text-center font-bold text-zinc-950 shadow-[0_18px_60px_rgba(251,191,36,0.28)] hover:bg-amber-200">
              Explore my work
            </a>
            <a href="mailto:hello@example.com" className="rounded-full border border-white/15 px-7 py-4 text-center font-bold text-white hover:border-amber-200 hover:text-amber-100">
              hello@example.com
            </a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-black text-amber-200">{stat.value}</div>
                <div className="mt-1 text-xs text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-6 rounded-[3rem] bg-amber-300/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#1e1e1e] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#181818] px-5 py-4">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-stone-400">portfolio.tsx</span>
            </div>
            <div className="grid grid-cols-[56px_1fr]">
              <aside className="space-y-4 border-r border-white/10 bg-[#171717] px-4 py-6 text-center text-stone-500">
                <div>⌘</div><div>⌕</div><div>⑂</div><div>⚙</div>
              </aside>
              <div className="p-6 font-mono text-sm leading-7 text-stone-300 sm:p-8">
                <p><span className="text-purple-300">const</span> creator = &#123;</p>
                <p className="pl-5"><span className="text-sky-300">name</span>: <span className="text-amber-200">&quot;Your Name&quot;</span>,</p>
                <p className="pl-5"><span className="text-sky-300">role</span>: <span className="text-amber-200">&quot;Developer & Creator&quot;</span>,</p>
                <p className="pl-5"><span className="text-sky-300">focus</span>: [<span className="text-amber-200">&quot;web&quot;</span>, <span className="text-amber-200">&quot;ai&quot;</span>, <span className="text-amber-200">&quot;teaching&quot;</span>],</p>
                <p className="pl-5"><span className="text-sky-300">mission</span>: <span className="text-amber-200">&quot;make tech feel simple&quot;</span></p>
                <p>&#125;;</p>
                <div className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 font-sans">
                  <p className="text-sm font-semibold text-amber-100">Current signal</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-white">Building in public, one useful thing at a time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-4xl font-black tracking-tight text-white">About the builder</h2>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-lg leading-8 text-stone-300">
            <p>
              Use this section to introduce yourself in a human way: what you build, who you help, and why your work matters. The vibe is friendly, technical, and creator-led.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Product Strategy", "Frontend", "AI Workflows", "Content", "Community"].map((skill) => (
                <span key={skill} className="rounded-full bg-white/10 px-4 py-2 text-sm text-stone-200">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Selected work</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">Things I can help you ship</h2>
          </div>
          <p className="max-w-xl text-stone-400">Swap these cards with your projects, services, courses, case studies, or open-source work.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {work.map((item) => (
            <article key={item.title} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-amber-200/50 hover:bg-white/[0.07]">
              <div className="mb-8 h-32 rounded-3xl bg-gradient-to-br from-amber-200 via-orange-300 to-zinc-800 opacity-80" />
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-stone-400">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((quote, index) => (
            <blockquote key={quote} className="rounded-[2rem] border border-white/10 bg-[#1a1a1a] p-7 text-stone-300">
              <p className="text-4xl text-amber-200">“</p>
              <p className="mt-2 leading-7">{quote}</p>
              <footer className="mt-6 text-sm text-stone-500">Person {index + 1} · Client / Student</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-amber-200/20 bg-amber-300 p-8 text-zinc-950 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.3em]">Contact</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">Let&apos;s build your next useful thing.</h2>
              <p className="mt-6 max-w-2xl text-lg text-zinc-800">Tell me your name, role, tagline, links, and favorite colors. I&apos;ll personalize the whole site around you.</p>
            </div>
            <div className="space-y-3">
              {socials.map((social) => (
                <a key={social} href="#" className="flex items-center justify-between rounded-2xl bg-zinc-950 px-5 py-4 font-bold text-white hover:bg-zinc-800">
                  {social}<span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
