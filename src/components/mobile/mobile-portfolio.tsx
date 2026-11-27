"use client";

import SiteHeader from "./site-header";
import HeroSection from "./hero-section";
import JourneySection from "./journey-section";
import RoutesSection from "./routes-section";
import ProjectsSection from "./projects-section";
import SkillsSection from "./skills-section";
import OpenSourceSection from "./opensource-section";
import MetricsSection from "./metrics-section";
import ContactSection from "./contact-section";
import { MobileActiveProvider } from "./experience-context";
import { MobileThemeProvider, useTheme } from "./theme-context";

function RailwayExperience({ active }: { active: boolean }) {
  const { theme } = useTheme();

  return (
    <MobileActiveProvider active={active}>
      <div
        className="railway-experience"
        data-theme={theme}
        data-active={active ? "true" : "false"}
      >
        <SiteHeader />
        <main>
          <HeroSection />
          <JourneySection />
          <RoutesSection />
          <ProjectsSection />
          <OpenSourceSection />
          <SkillsSection />
          <MetricsSection />
          <ContactSection />
        </main>
      </div>
    </MobileActiveProvider>
  );
}

export default function MobilePortfolio({ active = true }: { active?: boolean }) {
  return (
    <MobileThemeProvider>
      <RailwayExperience active={active} />
    </MobileThemeProvider>
  );
}
