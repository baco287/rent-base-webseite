"use client";

import { useEffect } from "react";

/**
 * Dezentes Einblenden aller Elemente mit data-reveal. Die Klasse reveal-ready wird erst gesetzt, wenn JavaScript läuft;
 * ohne JavaScript oder bei „weniger Bewegung“ bleibt alles sofort sichtbar.
 * Robust gegen Sprünge (Ankerlinks, Zurück-Navigation): Alles, was oberhalb oder im sichtbaren Bereich liegt, wird
 * sofort sichtbar, auch wenn es nie „ins Bild gescrollt“ wurde.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (pending.length === 0) return;

    const sweep = () => {
      const limit = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (pending.length === 0) window.removeEventListener("scroll", onScroll);
    };
    // Bewusst ohne requestAnimationFrame: In Hintergrund-Tabs pausiert es, Inhalte dürfen aber nie unsichtbar bleiben.
    // Die Liste schrumpft mit jedem sichtbaren Element, die Prüfung bleibt billig.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      sweep();
      clearTimeout(timer);
      timer = setTimeout(sweep, 120);
    };

    // Was beim Laden schon im Bild ist, erscheint ohne Animation
    sweep();
    root.classList.add("reveal-ready");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
