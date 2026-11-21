"use client";

import SubwayNav from "./subway-nav";
import HeroSection from "./hero-section";
import JourneySection from "./journey-section";
import RoutesSection from "./routes-section";
import ProjectsSection from "./projects-section";
import OpenSourceSection from "./opensource-section";
import MetricsSection from "./metrics-section";
import ContactSection from "./contact-section";

export default function MobilePortfolio() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0f1d] font-sans text-slate-100 selection:bg-amber-400 selection:text-black">
      {/* Sticky Transit Navigation */}
      <SubwayNav />

      {/* Main Subway Station Stops */}
      <main className="flex flex-col">
        {/* Stop 01: Hero — The First Stop */}
        <HeroSection />

        {/* Stop 02: My Route Into Engineering */}
        <JourneySection />

        {/* Stop 03: Three Engineering Routes */}
        <RoutesSection />

        {/* Stop 04: Selected Projects */}
        <ProjectsSection />

        {/* Stop 05: Open-Source Journey */}
        <OpenSourceSection />

        {/* Stop 06: Engineering at a Glance */}
        <MetricsSection />

        {/* Stop 07: Final Stop — Let's Build Something */}
        <ContactSection />
      </main>
    </div>
  );
}
