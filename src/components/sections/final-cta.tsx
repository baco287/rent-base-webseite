import { TRIAL } from "@/content/site";
import { Button, Container } from "../ui/primitives";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-ink text-white">
      <Container className="py-24 text-center lg:py-32">
        <div data-reveal>
          <p className="eyebrow text-gold-300">RentBase</p>
          <h2 id="cta-title" className="mx-auto mt-5 max-w-3xl font-serif text-[2.5rem] leading-[1.05] font-semibold sm:text-[3.4rem]">
            Bereit für eine einfachere Vermietung?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">Teste RentBase und verwalte deine Fahrzeugvermietung zentral, digital und übersichtlich.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={TRIAL.href} size="lg" arrow className="w-full bg-white! text-ink! hover:bg-gold-50! sm:w-auto">
              RentBase kostenlos testen
            </Button>
            <Button href="#funktionen" size="lg" variant="ghost" className="w-full border border-white/25 text-white! hover:border-white/60 sm:w-auto">
              Funktionen ansehen
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/55">{TRIAL.note}</p>
        </div>
      </Container>
    </section>
  );
}
