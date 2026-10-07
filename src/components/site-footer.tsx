import Link from "next/link";
import { COMPANY } from "@/content/company";
import { SITE, WHATSAPP } from "@/content/site";
import { Container } from "./ui/primitives";
import { Wordmark } from "./ui/logo";

// Reduzierter Footer: nur echte Ziele, keine Social-Media-Links, solange es keine Konten gibt.
const MAIN = [
  { href: "/#produkt", label: "Produkt" },
  { href: "/#preise", label: "Preise" },
  { href: `mailto:${SITE.contactEmail}`, label: "Kontakt" },
  { href: SITE.appLoginUrl, label: "Anmelden" },
];
const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
];

const linkCls = "transition-colors duration-200 hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="bg-warm-2">
      <Container wide className="py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Wordmark height={30} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-3">Software für Fahrzeugvermieter.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium text-ink-2">
              {MAIN.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className={linkCls}>{l.label}</Link>
                  ) : (
                    <a href={l.href} className={linkCls}>{l.label}</a>
                  )}
                </li>
              ))}
              <li>
                <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RentBase · {COMPANY.name}</p>
          <ul className="flex gap-6">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
