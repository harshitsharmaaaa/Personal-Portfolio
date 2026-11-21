"use client";

import DesktopPortfolio from "@/components/desktop/desktop-portfolio";
import MobilePortfolio from "@/components/mobile/mobile-portfolio";

export default function Home() {
  return (
    <>
      {/* Mobile & Tablet Experience (Subway Editorial Design) */}
      <div className="block lg:hidden">
        <MobilePortfolio />
      </div>

      {/* Desktop Experience (VS Code Portfolio - Visually & Functionally Identical) */}
      <div className="hidden lg:block h-screen overflow-hidden">
        <DesktopPortfolio />
      </div>
    </>
  );
}
