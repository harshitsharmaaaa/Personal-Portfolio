"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/projects";
import { scrollToId } from "@/data/railway";
import Reveal from "./reveal";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
  }, []);

  const handleCopyEmail = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      success = true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = profile.email;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        success = true;
      } catch {
        // Copy is best-effort.
      }
      document.body.removeChild(textArea);
    }
    if (success) {
      setCopied(true);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="rail-section rail-section--contact" aria-labelledby="contact-heading">
      <div className="rail-contact__convergence" aria-hidden="true">
        <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMax slice">
          <path d="M20 0 C 90 120, 160 210, 200 280" fill="none" stroke="#4f8cff" strokeWidth="3" />
          <path d="M200 0 V280" fill="none" stroke="#f4c04f" strokeWidth="3" />
          <path d="M380 0 C 310 120, 240 210, 200 280" fill="none" stroke="#34c78b" strokeWidth="3" />
          <circle cx="200" cy="280" r="14" fill="#f4c04f" stroke="#fff3d6" strokeWidth="3" />
        </svg>
      </div>

      <Reveal className="rail-contact__inner">
        <p className="rail-eyebrow"><span className="rail-eyebrow__dot" aria-hidden="true" /> FINAL STOP <span className="rail-eyebrow__sep">·</span> TERMINAL</p>
        <h2 id="contact-heading">End of the line.<br /><span>Let&apos;s build something.</span></h2>
        <p className="rail-contact__intro">
          Have a system to design, an upstream bug to fix, or a role in mind? The next departure is
          one conversation away.
        </p>

        <div className="rail-contact__destinations">
          <a href={`mailto:${profile.email}`} className="rail-contact__main">
            <span className="rail-contact__main-label">EMAIL</span>
            <span className="rail-contact__main-value">{profile.email}</span>
            <span className="rail-contact__main-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="rail-contact__side">
            <button type="button" onClick={handleCopyEmail}>
              {copied ? "COPIED ✓" : "COPY ADDRESS"}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Email address copied to clipboard." : ""}
            </span>
          </div>
        </div>

        <div className="rail-contact__links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <span>GitHub</span><span aria-hidden="true">↗</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span><span aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${profile.email}`}>
            <span>Email</span><span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="rail-contact__secondary">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
          <a href={profile.twitter} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
        </div>

        <button type="button" className="rail-contact__return" onClick={() => scrollToId("hero", 0)}>
          <span aria-hidden="true">↑</span> RETURN TO DEPARTURE
        </button>

        <footer className="rail-footer">
          <span>© Harshit Sharma · Railway Edition</span>
          <span>Built with Next.js 16 · React 19 · TypeScript · Tailwind CSS 4</span>
          <span>
            Night skyline photo:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Night_in_San_Francisco_Bay_2016-04-29.jpg" target="_blank" rel="noopener noreferrer">
              From81 / Wikimedia Commons
            </a>{" "}
            · CC BY 3.0
          </span>
        </footer>
      </Reveal>
    </section>
  );
}
