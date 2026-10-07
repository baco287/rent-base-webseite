"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sehr dezente Tiefenwirkung für große Produktdarstellungen: verschiebt den Inhalt beim Scrollen um höchstens
 * `amount` Pixel. Nur transform, kein Layout. Bei „weniger Bewegung“ oder ohne JavaScript bleibt alles ruhig.
 */
export function Parallax({ amount = 40, className = "", children }: { amount?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // -1 (Element unten im Bild) … 1 (Element oben aus dem Bild)
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / vh));
      el.style.transform = `translate3d(0, ${(-p * amount).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
