"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/projects";
import { scrollToId, stations, type Station } from "@/data/railway";
import BoardingPanel from "./boarding-panel";
import StationStops from "./station-stops";

export default function HeroSection() {
  const [activeId, setActiveId] = useState(stations[0].id);
  const [activeColor, setActiveColor] = useState(stations[0].color);

  const selectStation = (station: Station) => {
    setActiveId(station.id);
    setActiveColor(station.color);
    scrollToId(station.target);
  };

  const showStations = () => {
    window.setTimeout(() => {
      document.querySelector<HTMLButtonElement>(".rail-stations__stop.is-active")?.focus();
    }, 420);
  };

  return (
    <section
      id="hero"
      className="rail-hero"
      style={{ "--rail-active": activeColor } as React.CSSProperties}
      aria-labelledby="rail-hero-title"
    >
      {/* Hand-drawn night city, painted across the whole first screen */}
      <div className="rail-city" aria-hidden="true">
        <Image
          src="/images/railway-city-scene.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="rail-city__image"
          unoptimized
        />
      </div>
      <div className="rail-hero__scrim" aria-hidden="true" />
      <div className="rail-hero__top-glow" aria-hidden="true" />

      <div className="rail-hero__content">
        <div className="rail-hero__intro">
          <p className="rail-eyebrow rail-enter" style={{ animationDelay: "80ms" }}>
            <span className="rail-eyebrow__dot" aria-hidden="true" />
            PORTFOLIO / 2026 <span className="rail-eyebrow__sep">·</span> {profile.location.toUpperCase()}
          </p>

          <h1 id="rail-hero-title" className="rail-hero__title rail-enter" style={{ animationDelay: "180ms" }}>
            Hi, I&apos;m <span>Harshit.</span>
          </h1>

          <p className="rail-hero__lead rail-enter" style={{ animationDelay: "280ms" }}>
            I build full-stack products, backend systems and AI-powered workflows, turning complex
            engineering problems into practical software.
          </p>

          <p className="rail-hero__subline rail-enter" style={{ animationDelay: "360ms" }}>
            {profile.role}
            <span aria-hidden="true"> · </span>
            VIT Chennai, 2023—2027
          </p>
        </div>

        {/* Train, platform and the five working destinations */}
        <div className="rail-hero__scene rail-enter" style={{ animationDelay: "420ms" }}>
          <div className="rail-train" aria-hidden="true">
            <Image
              src="/images/railway-train.svg"
              alt=""
              fill
              priority
              sizes="150vw"
              className="rail-train__image"
              unoptimized
            />
          </div>
          <div className="rail-hero__route-glow" aria-hidden="true" />
          <StationStops activeId={activeId} onSelect={selectStation} />
        </div>

        <BoardingPanel onShowMe={showStations} />
      </div>
    </section>
  );
}
