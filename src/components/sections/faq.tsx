import { Plus } from "lucide-react";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";
import { WhatsAppLink } from "../ui/whatsapp";
import { Container, SectionHead } from "../ui/primitives";

/** Minimalistisches Akkordeon mit nativem details/summary: tastaturbedienbar, ohne JavaScript, für Suchmaschinen sichtbar. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-canvas py-24 lg:py-36">
      <Container wide className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="faq-title" no="10" label="FAQ" title="Fragen." />
          <p className="mt-6 text-[15px] leading-relaxed text-ink-2">
            Nicht dabei? Schreib an{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="font-medium whitespace-nowrap text-ink underline decoration-gold-300 underline-offset-4 hover:decoration-gold-600">
              {SITE.contactEmail}
            </a>{" "}
            oder <WhatsAppLink variant="md" className="h-auto! border-0! px-0! text-ink underline decoration-[#25D366]/50 underline-offset-4 hover:decoration-[#25D366]">per WhatsApp</WhatsAppLink>.
          </p>
        </div>
        <div className="border-t border-ink">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-gold-700 [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus aria-hidden className="size-5 shrink-0 text-gold-500 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
