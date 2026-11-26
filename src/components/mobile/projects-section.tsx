"use client";

import { useState } from "react";
import { allProjectList, type Project } from "@/data/projects";
import Reveal from "./reveal";

const routeBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-600", text: "text-blue-400", border: "border-blue-500/40" },
  red: { bg: "bg-rose-600", text: "text-rose-400", border: "border-rose-500/40" },
  green: { bg: "bg-emerald-600", text: "text-emerald-400", border: "border-emerald-500/40" },
  purple: { bg: "bg-purple-600", text: "text-purple-400", border: "border-purple-500/40" },
};

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const badgeStyle = routeBadgeStyles[project.routeColor] || routeBadgeStyles.blue;
  const panelId = `project-${project.id}-details`;
  const hasDeepDive =
    Boolean(project.architectureDiagram) ||
    Boolean(project.executionFlow) ||
    Boolean(project.whyAsync) ||
    Boolean(project.componentBreakdown) ||
    Boolean(project.policyEngine) ||
    Boolean(project.guardianRecovery) ||
    Boolean(project.thresholdEcdsa) ||
    Boolean(project.tssLifecycle) ||
    Boolean(project.securityModel) ||
    Boolean(project.testingDetails) ||
    Boolean(project.limitations) ||
    Boolean(project.whatIBuilt) ||
    Boolean(project.repoStructure);

  return (
    <article
      id={`project-${project.id}`}
      className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0d162b] p-5 sm:p-7 shadow-xl backdrop-blur-sm"
    >
      {/* Top Station Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black text-white ${badgeStyle.bg}`}
          >
            {project.stationCode.slice(0, 2)}
          </span>
          <span className="font-mono text-xs font-bold text-amber-300">
            STATION {project.stationCode}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            · {project.routeLine}
          </span>
        </div>

        {project.status && (
          <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
            {project.status}
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="mt-4">
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-1 font-mono text-xs font-semibold text-slate-300 sm:text-sm">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Verified Metrics Strip (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-[#070b16] p-3 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center p-1">
              <div className="font-mono text-base font-extrabold text-amber-400">
                {m.value}
              </div>
              <div className="font-mono text-[10px] text-slate-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#f3f1eb]">
        {project.description}
      </p>

      {/* Purpose and Problem Addressed */}
      {project.problem && (
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-950/20 p-3 sm:p-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Problem & Challenge Addressed:
          </span>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">
            {project.problem}
          </p>
        </div>
      )}

      {/* Technical Stack Chips */}
      <div className="mt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
          Technical Stack:
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-md border border-slate-700/80 bg-slate-900/90 px-2.5 py-1 font-mono text-[11px] text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="mt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
          Key Engineering Highlights:
        </span>
        <ul className="mt-2 space-y-1.5 pl-4 text-xs sm:text-sm text-slate-300 list-disc marker:text-amber-400">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="leading-relaxed">
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* External Action Links */}
      <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-[#0a0f1d] transition hover:bg-amber-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            <span>GitHub Repository</span>
            <span>↗</span>
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/60 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-900/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <span>Live Demo</span>
            <span>↗</span>
          </a>
        )}

        {project.npm && (
          <a
            href={project.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-rose-500/50 bg-rose-950/60 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-900/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-400"
          >
            <span>npm Package</span>
            <span>↗</span>
          </a>
        )}

        {project.architectureLink && (
          <a
            href={project.architectureLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:text-white active:scale-95"
          >
            <span>Architecture Docs</span>
            <span>↗</span>
          </a>
        )}

        {project.securityLink && (
          <a
            href={project.securityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:text-white active:scale-95"
          >
            <span>Security Model</span>
            <span>↗</span>
          </a>
        )}

        {project.contractsLink && (
          <a
            href={project.contractsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:text-white active:scale-95"
          >
            <span>Smart Contracts</span>
            <span>↗</span>
          </a>
        )}

        {project.rustTssLink && (
          <a
            href={project.rustTssLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:text-white active:scale-95"
          >
            <span>Rust TSS Crates</span>
            <span>↗</span>
          </a>
        )}

        {project.sdkLink && (
          <a
            href={project.sdkLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:text-white active:scale-95"
          >
            <span>TypeScript SDK</span>
            <span>↗</span>
          </a>
        )}
      </div>

      {/* Expandable Deep Dive for Architecture & Execution Flow */}
      {hasDeepDive && (
        <div className="mt-5 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-left text-xs font-bold text-amber-300 transition hover:bg-slate-800 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-amber-400"
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            <span className="font-mono uppercase tracking-wider">
              {expanded ? "▾ Collapse Architecture Deep Dive" : "▸ View Full Architecture & Execution Details"}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {expanded ? "Hide" : "Expand"}
            </span>
          </button>

          <div
            id={panelId}
            hidden={!expanded}
            className="mt-4 space-y-4 rounded-xl border border-slate-700/60 bg-[#070b16] p-4 text-xs sm:text-sm"
          >
              {project.architectureDiagram && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-400">
                    System Architecture Diagram:
                  </h4>
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-800 bg-black/60 p-3 font-mono text-[11px] leading-snug text-amber-200">
                    {project.architectureDiagram}
                  </pre>
                </div>
              )}

              {project.executionFlow && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Execution Pipeline Flow:
                  </h4>
                  <p className="mt-1.5 rounded-lg border border-slate-800 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
                    {project.executionFlow}
                  </p>
                </div>
              )}

              {project.whyAsync && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-400">
                    Why Asynchronous Architecture:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.whyAsync}
                  </p>
                </div>
              )}

              {project.componentBreakdown && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-400">
                    Component Breakdown:
                  </h4>
                  <ul className="mt-1.5 list-disc pl-4 space-y-1 text-slate-300">
                    {project.componentBreakdown.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.transactionFlow && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Transaction Flow:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.transactionFlow}
                  </p>
                </div>
              )}

              {project.policyEngine && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Policy Engine Hierarchy:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.policyEngine}
                  </p>
                </div>
              )}

              {project.guardianRecovery && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Guardian Recovery Mechanism:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.guardianRecovery}
                  </p>
                </div>
              )}

              {project.thresholdEcdsa && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    2-of-3 Threshold ECDSA:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.thresholdEcdsa}
                  </p>
                </div>
              )}

              {project.tssLifecycle && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    TSS Key Lifecycle:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.tssLifecycle}
                  </p>
                </div>
              )}

              {project.securityModel && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Security Model & Invariants:
                  </h4>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {project.securityModel}
                  </p>
                </div>
              )}

              {project.testingDetails && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Testing Verification & Test Suites:
                  </h4>
                  <ul className="mt-1.5 list-disc pl-4 space-y-1 text-slate-300">
                    {project.testingDetails.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.whatIBuilt && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    What I Built:
                  </h4>
                  <ul className="mt-1.5 list-disc pl-4 space-y-1 text-slate-300">
                    {project.whatIBuilt.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.limitations && (
                <div className="rounded-lg border border-amber-500/40 bg-amber-950/30 p-3">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Security Boundaries & Known Limitations:
                  </h4>
                  <ul className="mt-1.5 list-disc pl-4 space-y-1 text-slate-300">
                    {project.limitations.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.repoStructure && (
                <div>
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Monorepo Directory Structure:
                  </h4>
                  <pre className="mt-1.5 overflow-x-auto rounded-lg border border-slate-800 bg-black/60 p-3 font-mono text-[11px] text-slate-300">
                    {project.repoStructure}
                  </pre>
                </div>
              )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0a0f1d] px-4 py-12 text-slate-100 sm:px-6 sm:py-16"
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>STOP 04 // SELECTED PROJECTS</span>
        </div>

        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          SELECTED <span className="text-amber-400">PROJECTS</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {allProjectList.length} full-stack, systems, and cryptographic implementations. Preserved
          in full detail with underlying architecture, verified metrics, execution flows, and
          repository links.
        </p>
      </Reveal>

      {/* Projects Vertical Stack */}
      <div className="mx-auto mt-8 max-w-3xl space-y-8">
        {allProjectList.map((project, index) => (
          <Reveal key={project.id} delay={index * 40}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
