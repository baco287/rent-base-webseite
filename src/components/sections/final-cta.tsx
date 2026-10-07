import { Mail } from "lucide-react";
import { PRODUCT_LINK, SITE, TRIAL, WHATSAPP } from "@/content/site";
import { Button, Container } from "../ui/primitives";
import { WhatsAppIcon } from "../ui/whatsapp";
import { InquiryForm } from "../inquiry-form";

/**
 * Abschluss auf fast schwarzem Grund und Ziel aller „RentBase testen“-Knöpfe. Einzige Stelle, an der das große
 * RB-Monogramm auftaucht: als ruhige Form im Hintergrund, Ton in Ton.
 */
export function FinalCta() {
  return (
    <section id="anfrage" aria-labelledby="cta-title" className="on-dark relative isolate scroll-mt-16 overflow-hidden bg-night">
      <div aria-hidden className="monogram-ghost absolute top-1/2 right-[-12%] -z-10 aspect-[850/467] w-[95%] -translate-y-1/2 lg:right-[-8%] lg:w-[70%]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <Container wide className="grid gap-14 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:py-36">
        <div data-reveal>
          <p className="label flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-gold-300/70" />
            {TRIAL.label}
          </p>
          <h2 id="cta-title" className="display mt-6 text-[2.8rem] sm:text-[4.2rem] lg:text-[5rem]">
            Bereit, deine Vermietung neu zu organisieren?
          </h2>
          <p className="lead mt-7 max-w-md">{TRIAL.note}</p>
          <div className="mt-8">
            <Button href={PRODUCT_LINK.href} variant="outline-light" size="lg">{PRODUCT_LINK.label}</Button>
          </div>
          <div className="mt-12 border-t border-night-line pt-6">
            <p className="font-mono text-[0.7rem] tracking-[0.12em] text-white/45 uppercase">Lieber direkt</p>
            <ul className="mt-3 flex flex-col gap-2 text-[15px] sm:flex-row sm:gap-8">
              <li>
                <a href={TRIAL.mailHref} className="inline-flex items-center gap-2 text-white underline decoration-white/25 underline-offset-4 hover:decoration-gold-300">
                  <Mail aria-hidden className="size-4 text-gold-300" strokeWidth={1.8} />
                  {SITE.contactEmail}
                </a>
              </li>
              <li>
                <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white underline decoration-white/25 underline-offset-4 hover:decoration-[#25D366]">
                  <WhatsAppIcon className="size-4 text-[#25D366]" />
                  WhatsApp {WHATSAPP.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div data-reveal>
          <InquiryForm />
        </div>
      </Container>
    </section>
  );
}
