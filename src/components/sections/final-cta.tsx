import { Mail } from "lucide-react";
import { SITE, TRIAL, WHATSAPP } from "@/content/site";
import { Container } from "../ui/primitives";
import { WhatsAppIcon } from "../ui/whatsapp";
import { InquiryForm } from "../inquiry-form";

const STEPS = ["Kurz Firma und Kontakt angeben", "Wir melden uns persönlich bei dir", "Du testest RentBase mit deinen eigenen Fahrzeugen"];

/** Abschluss und Ziel aller „Kostenlos testen“-Knöpfe: Anfrageformular auf dunklem Grund. */
export function FinalCta() {
  return (
    <section id="anfrage" aria-labelledby="cta-title" className="relative isolate scroll-mt-16 overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -top-[20%] -left-[10%] -z-10 h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(201_169_121/0.18),transparent)]" />
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
        <div data-reveal>
          <p className="eyebrow text-gold-300">Kostenlos testen</p>
          <h2 id="cta-title" className="mt-5 max-w-xl font-serif text-[2.5rem] leading-[1.05] font-semibold sm:text-[3.4rem]">
            Bereit für eine einfachere Vermietung?
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70">{TRIAL.note}</p>
          <ol className="mt-8 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold-300/60 text-xs font-semibold text-gold-300 tabular-nums">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-sm text-white/55">Lieber direkt?</p>
            <ul className="mt-3 flex flex-col gap-2 text-[15px] sm:flex-row sm:gap-6">
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
