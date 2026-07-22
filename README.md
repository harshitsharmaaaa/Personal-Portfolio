# Harshit Sharma — VS Code Portfolio

A personal portfolio site disguised as a fully interactive **Visual Studio Code** editor. Instead of a boring scroll-page, visitors land inside a simulated VS Code Dark+ environment where every "file" is a piece of my story — about, projects, skills, education, and contact. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

> Live persona: Harshit Sharma — B.Tech CSE (AI & Robotics) @ VIT Chennai, full-stack + Web3 developer.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Content Files](#content-files)
- [Interactive Terminal](#interactive-terminal)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [State Persistence](#state-persistence)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contact](#contact)
- [License](#license)

---

## Overview

This project reimagines the traditional personal portfolio as a developer's native habitat — the code editor. The entire UI mimics VS Code's Dark+ theme, complete with:

- Title bar with traffic-light window controls
- Menu bar (File, Edit, Selection, View, Go, Run, Terminal, Help)
- Activity bar (Explorer, Search, Source Control, Extensions)
- Resizable sidebar file explorer with folders
- Tabbed editor area with syntax-highlighted "source files"
- Integrated terminal that boots and accepts commands
- Minimap, breadcrumbs, and status bar
- Command palette (Ctrl+P)
- Dark / light theme toggle
- Mobile-responsive drawer

The portfolio content itself is rendered as if it were real source code: an `about.tsx` profile object, a `skills.json` config, `projects/*.ts` modules, an `education.md` doc, and a `contact.tsx` component.

---

## Features

### Editor Experience
- **Multi-tab editing** — open, close, and switch between files; right-click a tab for Close / Close Others / Copy Path.
- **Syntax-highlighted content** — each file is hand-tuned with VS Code token colors (keywords, strings, types, comments).
- **Minimap** — decorative code minimap that changes with the active file.
- **Breadcrumbs** — shows `portfolio › projects › file` context.
- **Status bar** — branch, sync indicator, language mode, UTF-8, cursor position, terminal toggle.

### Activity Bar
- **Explorer** — folder tree (`PORTFOLIO`, `PROJECTS`) with collapsible groups.
- **Search** — portfolio search panel.
- **Source Control** — shows mock modified files.
- **Extensions** — lists TypeScript, Tailwind, Solidity, Rust Analyzer.

### Terminal
- Boots with `pnpm dev --portfolio`, `whoami`, `cat contact.tsx`, `git status --short`.
- Accepts live input — see [Interactive Terminal](#interactive-terminal).

### Command Palette
- Press `Ctrl+P` to fuzzy-search and open any file.
- Includes a "Toggle Color Theme" action.

### Theming
- Full **dark** and **light** VS Code themes.
- Theme + layout state persist across reloads via `localStorage`.

### Responsiveness
- Desktop: full multi-pane layout with resizable sidebar and terminal.
- Mobile: hamburger menu opens the sidebar as an overlay drawer.

---

## Tech Stack

| Layer         | Technology                                   |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 16.2.11 (App Router)                 |
| UI Library    | React 19.2.4                                 |
| Language      | TypeScript 5                                 |
| Styling       | Tailwind CSS v4 (`@tailwindcss/postcss`)     |
| Fonts         | Geist, Geist Mono, JetBrains Mono (next/font)|
| Linting       | ESLint 9 + eslint-config-next                |
| Package Mgr   | npm (lockfile included)                      |

---

## Project Structure

```
personal-ai-site-next/
├── public/                 # Static SVG assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css     # Tailwind import + CSS variables + base styles
│       ├── layout.tsx      # Root layout, fonts, metadata (SEO title/description)
│       └── page.tsx        # The entire VS Code portfolio (client component)
├── .gitignore
├── AGENTS.md                # AI agent guidelines for this Next.js version
├── CLAUDE.md                # Points to AGENTS.md
├── README.md                # You are here
├── eslint.config.mjs        # ESLint flat config (core-web-vitals + TS)
├── next.config.ts           # Next.js config (empty defaults)
├── next-env.d.ts            # Next.js TypeScript ambient declarations
├── package.json
├── postcss.config.mjs       # Tailwind PostCSS plugin
└── tsconfig.json            # TS config with `@/*` -> `./src/*` path alias
```

The entire app lives in a single client component (`src/app/page.tsx`) for maximum cohesion — all editor state, terminal logic, theming, and rendering coexist in one file.

---

## Content Files

The portfolio is exposed as "files" inside the simulated editor:

| File                  | Type              | Contents                                                       |
| --------------------- | ----------------- | -------------------------------------------------------------- |
| `about.tsx`           | TypeScript React  | `profile` object: name, education, role, bio, values           |
| `projects/crypt.ts`   | TypeScript        | **Crypt** — multi-chain HD wallet generator (ETH + Solana)     |
| `projects/solana-notes.ts` | TypeScript   | **Note-Taking DApp on Solana** — Anchor + PDAs + Phantom       |
| `projects/ai-saas.ts` | TypeScript        | **AI SaaS Platform** — tRPC, Drizzle, Postgres, Inngest, Stream |
| `skills.json`         | JSON              | Programming, frameworks, databases, web3/crypto skills         |
| `education.md`        | Markdown          | VIT Chennai — B.Tech CSE AI & Robotics (2023–2027)             |
| `contact.tsx`         | TypeScript React  | Contact component: email, phone, location                     |

Each project file includes a **Open Preview** button that launches a modal with the project description, tech stack, live demo, and GitHub links.

---

## Interactive Terminal

The integrated terminal boots on load and accepts the following commands:

| Command              | Output                                                        |
| -------------------- | ------------------------------------------------------------- |
| `whoami`             | `Harshit Sharma — CS AI & Robotics @ VIT Chennai`             |
| `contact`            | Email, phone, and location details                           |
| `git status`         | Branch + portfolio status summary                            |
| `help`               | Lists available commands                                     |
| `open <file>`        | Opens a file tab (e.g. `open about.tsx`)                     |
| `theme`              | Toggles dark/light theme                                     |
| *(anything else)*    | `ready - compiled successfully` + localhost URL              |

---

## Keyboard Shortcuts

| Shortcut         | Action                          |
| ---------------- | ------------------------------- |
| `Ctrl+P` / `Cmd+P` | Open command palette           |
| `Ctrl+B` / `Cmd+B` | Toggle sidebar (explorer)      |
| `Ctrl+J` / `Cmd+J` | Toggle terminal panel          |
| `` Ctrl+` ``        | Toggle terminal panel          |
| `Esc`             | Close palette / context menu / preview |

---

## State Persistence

Layout preferences are saved to `localStorage` under the key `harshit-vscode-state-v2` and restored on next load:

- Active file
- Open tabs
- Sidebar width (180–420px)
- Terminal height (100–420px)
- Theme (dark/light)
- Sidebar open state
- Terminal open state

---

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (recommended 20+)
- **npm** 9+ (ships with Node)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open <http://localhost:3000> in your browser.

---

## Available Scripts

| Script          | Command         | Description                              |
| --------------- | --------------- | ---------------------------------------- |
| `dev`           | `npm run dev`   | Start Next.js dev server (HMR)           |
| `build`         | `npm run build` | Production build                         |
| `start`         | `npm start`     | Run the production build                 |
| `lint`          | `npm run lint`  | Run ESLint (core-web-vitals + TS rules)  |

---

## Customization

All portfolio content is centralized in **`src/app/page.tsx`**. Edit the following to make it yours:

### Identity & Bio
- `about.tsx` editor output — name, education, role, bio, values (search for `export const profile`).
- `contact.tsx` editor output — email, phone, location.

### Projects
Edit the `projects` record in `src/app/page.tsx`:

```ts
const projects: Record<Extract<FileKey, `projects/${string}`>, Project> = {
  "projects/crypt.ts": {
    title: "Crypt",
    stack: ["Next.js", "TypeScript", ...],
    description: "...",
    highlights: ["..."],
    demo: "https://...",
    github: "https://github.com/...",
  },
  // add more files here...
};
```

To add a new project file, you also need to:
1. Add its key to the `FileKey` union type.
2. Add metadata (label, icon, mode, folder, color) to `fileMeta`.
3. Add a rendering branch in `renderEditor()`.

### Skills
Edit the `skills.json` branch in `renderEditor()`.

### Education
Edit the `education.md` branch in `renderEditor()`.

### SEO & Title
Edit `src/app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Your Name — Visual Studio Code",
  description: "Your SEO description here.",
};
```

### Fonts
Configured in `src/app/layout.tsx` via `next/font/google`:
- `Geist` (sans)
- `Geist_Mono` (mono)
- `JetBrains_Mono` (primary monospace for the editor)

### Colors & Theme
- Base CSS variables live in `src/app/globals.css`.
- VS Code token colors are inline Tailwind arbitrary values (e.g. `text-[#569cd6]` for keywords, `text-[#ce9178]` for strings, `text-[#4ec9b0]` for types, `text-[#6a9955]` for comments).

---

## Configuration

### Path Alias
`tsconfig.json` maps `@/*` → `./src/*` for clean imports:

```ts
import { foo } from "@/components/foo";
```

### ESLint
Flat config in `eslint.config.mjs` extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Default ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.

### PostCSS / Tailwind
`postcss.config.mjs` uses `@tailwindcss/postcss` (Tailwind v4). Styles are imported via `@import "tailwindcss";` in `globals.css`.

---

## Deployment

This is a standard Next.js app and deploys cleanly to **Vercel** (recommended) or any Node.js host.

### Vercel (one-click style)
1. Push this repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Framework preset: **Next.js** — no env vars required.
4. Deploy.

### Self-host (Node)
```bash
npm run build
npm start
```

The app runs on port 3000 by default. Set `PORT=<n>` to override.



## License

Private project © Harshit Sharma. All rights reserved.
