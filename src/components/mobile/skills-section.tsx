"use client";

import { skillGroups } from "@/data/skills";
import Reveal from "./reveal";

export default function SkillsSection() {
  return (
    <section id="skills" className="rail-section rail-section--skills" aria-labelledby="skills-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> STOP 06 <span className="rail-eyebrow__sep">·</span> THE TOOLKIT</p>
        <h2 id="skills-heading">Tools, grouped <span>by purpose.</span></h2>
        <p className="rail-section__intro">
          The technologies used across the projects and routes above — organised by the job they do.
        </p>
      </Reveal>

      <div className="rail-skills">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 45}>
            <article className="rail-skill-group" style={{ "--group-color": group.color } as React.CSSProperties}>
              <div className="rail-skill-group__head">
                <span className="rail-skill-group__bar" aria-hidden="true" />
                <h3>{group.label}</h3>
                <span>{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <div className="rail-skill-group__items">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
