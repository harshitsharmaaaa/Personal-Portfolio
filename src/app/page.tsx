"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import DesktopPortfolio from "@/components/desktop/desktop-portfolio";
import MobilePortfolio from "@/components/mobile/mobile-portfolio";

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Home() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Both experiences are rendered in the server HTML so the correct one is visible
  // on the first paint. After hydration only the active experience remains mounted.
  const mobileVisible = !mounted || !isDesktop;
  const desktopVisible = mounted && isDesktop;

  return (
    <>
      <div className={mounted && isDesktop ? "hidden" : "lg:hidden"}>
        {mobileVisible ? <MobilePortfolio active={mounted && !isDesktop} /> : null}
      </div>

      <div
        className={
          mounted && !isDesktop ? "hidden" : "hidden h-screen overflow-hidden lg:block"
        }
      >
        {desktopVisible || !mounted ? <DesktopPortfolio active={desktopVisible} /> : null}
      </div>
    </>
  );
}
