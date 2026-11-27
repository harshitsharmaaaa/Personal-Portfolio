"use client";

import { useEffect, useState } from "react";
import { allProjectList, type Project } from "@/data/projects";
import { PROJECT_SELECT_EVENT } from "@/data/railway";
import ProjectArtwork from "./project-artwork";
import Reveal from "./reveal";

const routeColors: Record<Project["routeColor"], string> = {
  blue: "#4f8cff",
  red: "#f05257",
  green: "#34c78b",
  purple: "#b58cff",
};

const extraLinks: { key: keyof Project; label: string }[] = [
  { key: "architectureLink", label: "Architecture" },
  { key: "securityLink", label: "Security model" },
  { key: "contractsLink", label: "Smart contracts" },
  { key: "rustTssLink", label: "Rust TSS" },
  { key: "rustCoreLink", label: "Rust core" },
  { key: "protocolLink", label: "Protocol" },
  { key: "sdkLink", label: "TypeScript SDK" },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="rail-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="M19 12H6M11 6l-6 6 6 6" /> : <path d="M5 12h13M13 6l6 6-6 6" />}
    </svg>
  );
}

function DeepDive({ project }: { project: Project }) {
  return (
    <div className="rail-case__deep-grid">
      {project.architectureDiagram && (
        <div className="rail-case__block rail-case__block--wide">
          <h4>System architecture</h4>
          <pre>{project.architectureDiagram}</pre>
        </div>
      )}
      {project.executionFlow && (
        <div className="rail-case__block rail-case__block--wide">
          <h4>Execution flow</h4>
          <p>{project.executionFlow}</p>
        </div>
      )}
      {project.whyAsync && (
        <div className="rail-case__block rail-case__block--wide">
          <h4>Why asynchronous</h4>
          <p>{project.whyAsync}</p>
        </div>
      )}
      {project.componentBreakdown && (
        <div className="rail-case__block">
          <h4>Component breakdown</h4>
          <ul>{project.componentBreakdown.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
      {project.transactionFlow && (
        <div className="rail-case__block">
          <h4>Transaction flow</h4>
          <p>{project.transactionFlow}</p>
        </div>
      )}
      {project.policyEngine && (
        <div className="rail-case__block">
          <h4>Policy engine</h4>
          <p>{project.policyEngine}</p>
        </div>
      )}
      {project.guardianRecovery && (
        <div className="rail-case__block">
          <h4>Guardian recovery</h4>
          <p>{project.guardianRecovery}</p>
        </div>
      )}
      {project.thresholdEcdsa && (
        <div className="rail-case__block">
          <h4>Threshold ECDSA</h4>
          <p>{project.thresholdEcdsa}</p>
        </div>
      )}
      {project.tssLifecycle && (
        <div className="rail-case__block">
          <h4>TSS lifecycle</h4>
          <p>{project.tssLifecycle}</p>
        </div>
      )}
      {project.securityModel && (
        <div className="rail-case__block">
          <h4>Security model</h4>
          <p>{project.securityModel}</p>
        </div>
      )}
      {project.testingDetails && (
        <div className="rail-case__block">
          <h4>Testing &amp; verification</h4>
          <ul>{project.testingDetails.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
      {project.whatIBuilt && (
        <div className="rail-case__block">
          <h4>What I built</h4>
          <ul>{project.whatIBuilt.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
      {project.repoStructure && (
        <div className="rail-case__block rail-case__block--wide">
          <h4>Repository structure</h4>
          <pre>{project.repoStructure}</pre>
        </div>
      )}
      {project.limitations && (
        <div className="rail-case__block rail-case__block--wide rail-case__block--caution">
          <h4>Boundaries &amp; limitations</h4>
          <ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const [openCase, setOpenCase] = useState(false);
  const project = allProjectList[index];
  const color = routeColors[project.routeColor];
  const count = allProjectList.length;

  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const found = allProjectList.findIndex((item) => item.id === id);
      if (found >= 0) {
        setIndex(found);
        setOpenCase(false);
      }
    };
    window.addEventListener(PROJECT_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(PROJECT_SELECT_EVENT, onSelect);
  }, []);

  const move = (step: number) => {
    setIndex((current) => (current + step + count) % count);
    setOpenCase(false);
  };

  return (
    <section id="projects" className="rail-section rail-section--projects" aria-labelledby="projects-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> SELECTED WORK <span className="rail-eyebrow__sep">·</span> 0{count} CASE STUDIES</p>
        <h2 id="projects-heading">Work built to <span>hold up.</span></h2>
        <p className="rail-section__intro">
          Each project below is documented with the problem, the engineering decisions, the stack and
          the verified outcomes recorded in the repository.
        </p>
      </Reveal>

      <Reveal className="rail-case" style={{ "--case-color": color } as React.CSSProperties}>
        <div className="rail-case__stage">
          <ProjectArtwork projectId={project.id} color={color} title={project.title} />
          <div className="rail-case__stage-top">
            <span className="rail-case__tag">{project.category ?? project.routeLine}</span>
            <span className="rail-case__code">{project.stationCode}</span>
          </div>
          <div className="rail-case__counter" aria-live="polite">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="rail-case__counter-sep">/</span>
            <span>{String(count).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="rail-case__body">
          <div className="rail-case__title-row">
            <div>
              <p className="rail-case__kicker">{project.routeLine}</p>
              <h3>{project.title}</h3>
              {project.subtitle && <p className="rail-case__subtitle">{project.subtitle}</p>}
            </div>
            {project.status && <span className="rail-case__status">{project.status}</span>}
          </div>

          <p className="rail-case__description">{project.description}</p>

          <div className="rail-case__pair">
            <div>
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4>What was implemented</h4>
              <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="rail-case__outcomes">
              <h4>Verified outcomes</h4>
              <div>
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rail-case__stack">
            <h4>Stack</h4>
            <div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>

          <div className="rail-case__links">
            {project.github && (
              <a className="rail-button rail-button--gold" href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub repository <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.demo && (
              <a className="rail-button rail-button--outline" href={project.demo} target="_blank" rel="noopener noreferrer">
                Live demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.npm && (
              <a className="rail-button rail-button--outline" href={project.npm} target="_blank" rel="noopener noreferrer">
                npm package <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <div className="rail-case__secondary-links">
            {extraLinks.map(({ key, label }) => {
              const href = project[key];
              return typeof href === "string" && href ? (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
              ) : null;
            })}
          </div>

          <button
            type="button"
            className="rail-case__disclosure"
            onClick={() => setOpenCase((open) => !open)}
            aria-expanded={openCase}
            aria-controls="rail-case-deep-dive"
          >
            <span>{openCase ? "Close full case study" : "Open full case study"}</span>
            <span aria-hidden="true">{openCase ? "−" : "+"}</span>
          </button>

          <div id="rail-case-deep-dive" className="rail-case__deep" hidden={!openCase}>
            {openCase && <DeepDive project={project} />}
          </div>

          <div className="rail-case__nav">
            <button type="button" onClick={() => move(-1)} aria-label={`Previous project: ${allProjectList[(index - 1 + count) % count].title}`}>
              <ArrowIcon direction="left" />
              <span>PREV</span>
            </button>
            <p>{project.title}</p>
            <button type="button" onClick={() => move(1)} aria-label={`Next project: ${allProjectList[(index + 1) % count].title}`}>
              <span>NEXT</span>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
