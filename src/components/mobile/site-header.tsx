"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/projects";
import { scrollToId } from "@/data/railway";
import { useMobileActive } from "./experience-context";
import { useTheme } from "./theme-context";

const navItems = [
  { id: "hero", label: "Departure", meta: "01 · Intro" },
  { id: "journey", label: "The Journey", meta: "02 · Route" },
  { id: "routes", label: "Three Lines", meta: "03 · Practice" },
  { id: "projects", label: "Case Studies", meta: "04 · Work" },
  { id: "open-source", label: "Open Source", meta: "05 · Upstream" },
  { id: "skills", label: "Toolkit", meta: "06 · Skills" },
  { id: "metrics", label: "Milestones", meta: "07 · Numbers" },
  { id: "contact", label: "Final Stop", meta: "08 · Contact" },
] as const;

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="rail-header__glyph" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

function ThemeGlyph({ dawn }: { dawn: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="rail-header__glyph" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dawn ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      ) : (
        <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.3 8.3 0 1 0 10.5 10.5Z" />
      )}
    </svg>
  );
}

export default function SiteHeader() {
  const active = useMobileActive();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    const onScroll = () => {
      for (let i = navItems.length - 1; i >= 0; i -= 1) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.getBoundingClientRect().top <= 150) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  };

  const travel = (id: string) => {
    closeMenu();
    // Let the drawer unmount before scrolling so offsets stay stable.
    window.setTimeout(() => scrollToId(id), 0);
  };

  return (
    <header className="rail-header">
      <div className="rail-header__stripe" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="rail-header__inner">
        <button type="button" className="rail-header__brand" onClick={() => travel("hero")} aria-label="Harshit Sharma — return to the top">
          <span className="rail-header__monogram" aria-hidden="true">HS</span>
          <span className="rail-header__identity">
            <span className="rail-header__name">{profile.name}</span>
            <span className="rail-header__role">Full-stack · Systems · Web3 engineer</span>
          </span>
        </button>

        <div className="rail-header__controls">
          <button
            type="button"
            className="rail-header__icon-button"
            onClick={toggleTheme}
            aria-label={theme === "night" ? "Switch to dawn theme" : "Switch to night theme"}
            aria-pressed={theme === "dawn"}
            title={theme === "night" ? "Dawn theme" : "Night theme"}
          >
            <ThemeGlyph dawn={theme === "dawn"} />
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className={`rail-header__menu-button ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="railway-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
            <MenuGlyph open={isOpen} />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="rail-header__scrim" onClick={closeMenu} aria-hidden="true" />
          <nav id="railway-navigation" className="rail-header__drawer" aria-label="Portfolio sections">
            <div className="rail-header__drawer-head">
              <span>Journey map</span>
              <span>08 STOPS</span>
            </div>
            <ul>
              {navItems.map((item, index) => {
                const isCurrent = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      ref={index === 0 ? firstLinkRef : undefined}
                      type="button"
                      className={`rail-header__nav-link ${isCurrent ? "is-current" : ""}`}
                      onClick={() => travel(item.id)}
                      aria-current={isCurrent ? "location" : undefined}
                    >
                      <span className="rail-header__nav-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="rail-header__nav-label">{item.label}</span>
                      <span className="rail-header__nav-meta">{item.meta}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
