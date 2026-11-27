"use client";

import { journeyMilestones } from "@/data/projects";
import Reveal from "./reveal";

const stationColors: Record<string, string> = {
  blue: "#4f8cff",
  green: "#34c78b",
  purple: "#b58cff",
};

export default function JourneySection() {
  return (
    <section id="journey" className="rail-section rail-section--journey" aria-labelledby="journey-heading">
      <Reveal className="rail-section__head">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> STOP 02 <span className="rail-eyebrow__sep">·</span> ROUTE MAP</p>
        <h2 id="journey-heading">The route <span>here.</span></h2>
        <p className="rail-section__intro">
          A real academic and engineering line: foundations at VIT Chennai, systems and isolation,
          threshold cryptography, and verified upstream open-source work.
        </p>
      </Reveal>

      <div className="rail-journey__list" role="list">
        {journeyMilestones.map((item, index) => {
          const color = stationColors[item.routeColor] ?? "#4f8cff";
          return (
            <Reveal key={item.code} delay={index * 70}>
              <article className="rail-journey__station" role="listitem" style={{ "--station-color": color } as React.CSSProperties}>
                <div className="rail-journey__marker" aria-hidden="true"><span /></div>
                <div className="rail-journey__card">
                  <div className="rail-journey__meta">
                    <span className="rail-journey__code">{item.code}</span>
                    <span>{item.phase}</span>
                  </div>
                  <p className="rail-journey__line">{item.station}</p>
                  <h3>{item.title}</h3>
                  <p className="rail-journey__summary">{item.summary}</p>
                  <div className="rail-journey__tags">
                    <span className="rail-block-label">{item.route}</span>
                    <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
