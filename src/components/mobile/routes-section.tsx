"use client";

import { projects, routesData } from "@/data/projects";
import { selectProject } from "@/data/railway";
import Reveal from "./reveal";

const categoryLabels: Record<string, string> = {
  "backend-systems": "Backend & systems engineering",
  "ai-automation": "AI & automation engineering",
  "blockchain-web3": "Blockchain & Web3 engineering",
};

export default function RoutesSection() {
  return (
    <section id="routes" className="rail-section rail-section--routes" aria-labelledby="routes-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> THREE LINES <span className="rail-eyebrow__sep">·</span> ONE PRACTICE</p>
        <h2 id="routes-heading">Three lines, <span>one practice.</span></h2>
        <p className="rail-section__intro">
          Systems, automation and cryptography are not side projects here. They are three connected
          disciplines with the same engineering standard.
        </p>
      </Reveal>

      <div className="rail-routes">
        {routesData.map((route, index) => (
          <Reveal key={route.id} delay={index * 90}>
            <article
              id={route.id}
              className="rail-route"
              style={{ "--route-color": route.color } as React.CSSProperties}
              aria-labelledby={`${route.id}-title`}
            >
              <div className="rail-route__edge" aria-hidden="true"><span /></div>

              <div className="rail-route__masthead">
                <span className="rail-route__number">0{index + 1}</span>
                <div className="rail-route__identity">
                  <span className="rail-route__line">{route.name.toUpperCase()}</span>
                  <span className="rail-route__category">{categoryLabels[route.slug]}</span>
                </div>
                <span className="rail-route__badge">
                  {route.projectKeys.length} {route.projectKeys.length === 1 ? "STOP" : "STOPS"}
                </span>
              </div>

              <h3 id={`${route.id}-title`}>{route.title}</h3>
              <p className="rail-route__description">{route.description}</p>

              <div className="rail-route__tech">
                <span className="rail-block-label">CORE TECHNOLOGIES</span>
                <div>{route.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>

              <div className="rail-route__stops">
                <span className="rail-block-label">CONNECTED STOPS</span>
                <div>
                  {route.projectKeys.map((key) => {
                    const project = projects[key];
                    if (!project) return null;
                    return (
                      <button key={project.id} type="button" onClick={() => selectProject(project.id)}>
                        <span className="rail-route__stop-code">{project.stationCode}</span>
                        <span>{project.title}</span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="rail-route__action"
                onClick={() => {
                  const first = projects[route.projectKeys[0]];
                  if (first) selectProject(first.id);
                }}
              >
                <span>RIDE THIS LINE</span>
                <svg viewBox="0 0 24 24" className="rail-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
