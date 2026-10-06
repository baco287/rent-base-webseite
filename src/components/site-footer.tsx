import Link from "next/link";
import { SITE, TRIAL, WHATSAPP } from "@/content/site";
import { Container } from "./ui/primitives";
import { Wordmark } from "./ui/logo";

// Nur echte Ziele: keine Social-Media-Links, solange es keine Konten gibt.
const COLUMNS = [
  {
    title: "Produkt",
    links: [
      { href: "/#funktionen", label: "Funktionen" },
      { href: "/#preise", label: "Preise" },
      { href: SITE.appLoginUrl, label: "Anmelden" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { href: `mailto:${SITE.contactEmail}`, label: "Kontakt" },
      { href: WHATSAPP.href, label: `WhatsApp ${WHATSAPP.display}` },
      { href: TRIAL.href, label: "Testzugang anfragen" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark height={30} />
          <p className="mt-4 text-sm leading-relaxed text-ink-3">Software für Fahrzeugvermieter: Buchung, Vertrag, Übergabe, Rückgabe und Abrechnung in einem System.</p>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">{c.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-ink-2 transition-colors hover:text-ink">{l.label}</Link>
                  ) : (
                    <a href={l.href} {...(l.href.startsWith("https://wa.me/") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-ink-2 transition-colors hover:text-ink">{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RentBase</p>
          <p>Hosting in Deutschland</p>
        </Container>
      </div>
    </footer>
  );
}
