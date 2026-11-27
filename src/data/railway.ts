export type Station = {
  id: string;
  label: string;
  shortLabel: string;
  code: string;
  target: string;
  color: string;
  description: string;
};

/**
 * The five destinations served by the portfolio railway. Each target is a real
 * section id rendered by the mobile experience.
 */
export const stations: Station[] = [
  {
    id: "backend",
    label: "Backend & Systems",
    shortLabel: "Backend",
    code: "01",
    target: "route-blue",
    color: "#4f8cff",
    description: "Sandboxed runtimes, queues and distributed rate limiting",
  },
  {
    id: "ai",
    label: "AI & Automation",
    shortLabel: "AI & Auto",
    code: "02",
    target: "route-red",
    color: "#f05257",
    description: "Collaborative workflow graphs and AI browser automation",
  },
  {
    id: "web3",
    label: "Blockchain & Web3",
    shortLabel: "Web3",
    code: "03",
    target: "route-green",
    color: "#34c78b",
    description: "Threshold ECDSA, HD wallets and on-chain programs",
  },
  {
    id: "projects",
    label: "Projects",
    shortLabel: "Projects",
    code: "04",
    target: "projects",
    color: "#f4c04f",
    description: "Six full case studies with architecture and outcomes",
  },
  {
    id: "open-source",
    label: "Open Source",
    shortLabel: "Open Source",
    code: "05",
    target: "open-source",
    color: "#b58cff",
    description: "Verified upstream fixes across real repositories",
  },
];

export const PROJECT_SELECT_EVENT = "railway:select-project";

/** Ask the projects carousel to show a specific project, then travel there. */
export function selectProject(projectId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(PROJECT_SELECT_EVENT, { detail: projectId }));
  scrollToId("projects");
}

/** Smooth scroll that respects reduced-motion and the sticky header. */
export function scrollToId(id: string, offset = 76) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
}
