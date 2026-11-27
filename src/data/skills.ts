/**
 * Technology groups are derived from the project stacks and route technologies
 * already recorded in `projects.ts`. No extra skills are claimed here.
 */
export type SkillGroup = {
  id: string;
  label: string;
  color: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend & Systems",
    color: "#4f8cff",
    items: ["Node.js", "TypeScript", "Rust", "Bun", "Fastify", "Express", "Redis", "BullMQ", "Docker", "Linux cgroups", "Nginx"],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#f4c04f",
    items: ["Next.js 16", "React 19", "React Flow", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    color: "#f05257",
    items: ["Trigger.dev", "Liveblocks", "Browserbase", "Stagehand", "LangGraph", "Drizzle ORM"],
  },
  {
    id: "data",
    label: "Databases & Infrastructure",
    color: "#9db4d8",
    items: ["PostgreSQL", "Neon", "Prisma", "Redis", "ClickHouse", "SQLite", "Docker Compose", "GitHub Actions"],
  },
  {
    id: "chain",
    label: "Blockchain & Cryptography",
    color: "#34c78b",
    items: ["Solidity", "Foundry", "Ethereum", "Solana", "Anchor", "TSS / CGGMP'24", "BIP39", "ECDSA", "Ed25519", "ethers.js", "@solana/web3.js"],
  },
  {
    id: "tooling",
    label: "Developer Tooling",
    color: "#b58cff",
    items: ["Turborepo", "Vitest", "Jest", "Zod", "Foundry", "Bun", "Git", "npm"],
  },
];
