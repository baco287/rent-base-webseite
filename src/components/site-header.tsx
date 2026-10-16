"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV, SITE, TRIAL } from "@/content/site";
import { Button, Container } from "./ui/primitives";
import { Wordmark } from "./ui/logo";
import { WhatsAppLink } from "./ui/whatsapp";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [past, setPast] = useState(false);
  // Startseite ab 1280 px: Navigation steht im Einstiegsfeld (Referenzbild); diese Kopfzeile gleitet erst beim Scrollen herein
  const home = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPast(window.scrollY > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow,transform,visibility] duration-300 ${home ? `xl:fixed xl:inset-x-0 ${past || open ? "" : "xl:invisible xl:-translate-y-full"}` : ""} ${scrolled || open ? "border-b border-white/[0.07] bg-night/85 backdrop-blur-md" : "border-b border-transparent bg-night"}`}>
      <Container wide className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" aria-label="RentBase – zur Startseite" className="shrink-0 rounded-sm">
          <Wordmark height={25} priority tone="dark" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[14px] font-medium text-white/75">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-2 transition-colors duration-200 hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={SITE.appLoginUrl} variant="ghost" className="text-white/75! hover:text-white!">Anmelden</Button>
          <WhatsAppLink variant="icon" className="text-white hover:bg-white/[0.06]" />
          <Button href={TRIAL.href} variant="outline-gold" arrow className="ml-2">{TRIAL.label}</Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/[0.07] bg-night lg:hidden">
        <Container wide className="flex h-[calc(100dvh-4rem)] flex-col py-6">
          <nav aria-label="Mobile Navigation">
            <ul className="divide-y divide-white/[0.08]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)} className="flex h-14 items-center text-xl font-semibold tracking-[-0.02em] text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pb-4">
            <Button href={TRIAL.href} variant="gold" size="lg" arrow onClick={() => setOpen(false)}>{TRIAL.label}</Button>
            <WhatsAppLink variant="button" className="justify-center border-white/20 text-white hover:border-white/50" />
            <Button href={SITE.appLoginUrl} variant="outline-light" size="lg">Anmelden</Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
