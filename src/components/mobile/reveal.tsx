"use client";

import { useEffect, useRef, useState } from "react";
import { useMobileActive } from "./experience-context";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const active = useMobileActive();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div
      ref={ref}
      className={`rail-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
}
