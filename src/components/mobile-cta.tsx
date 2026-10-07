"use client";

import { useEffect, useState } from "react";
import { TRIAL, WHATSAPP } from "@/content/site";
import { WhatsAppIcon } from "./ui/whatsapp";

/**
 * Feste Aktionsleiste unten auf Handy und Tablet: erscheint nach dem ersten Bildschirm und verschwindet,
 * sobald das Anfrageformular oder der Footer im Bild ist (dort gibt es die Knöpfe ohnehin).
 */
export function MobileCta() {
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCovered(visible.size > 0);
    });
    document.querySelectorAll("#anfrage, footer").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = scrolled && !covered;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a href={TRIAL.href} tabIndex={show ? 0 : -1} className="inline-flex h-12 flex-1 items-center justify-center rounded-md bg-ink text-[15px] font-medium text-white">
          {TRIAL.label}
        </a>
        <a
          href={WHATSAPP.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          aria-label={`${WHATSAPP.label} (${WHATSAPP.display})`}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white"
        >
          <WhatsAppIcon className="size-6 text-[#25D366]" />
        </a>
      </div>
    </div>
  );
}
