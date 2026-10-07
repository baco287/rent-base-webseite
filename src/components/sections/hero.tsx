import { PRODUCT_LINK, TRIAL } from "@/content/site";
import { Button, Container } from "../ui/primitives";
import { Parallax } from "../ui/parallax";
import { DashboardScreen } from "../mockups/desktop-screens";
import { TabletDamage } from "../mockups/device-screens";

/**
 * Einstieg: fast schwarz, große Typografie, darunter die echte RentBase-Oberfläche, die über den Rand des dunklen
 * Bereichs in die helle Seite hineinragt. Kein Logo-Monogramm hier, das Produkt ist der Star.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--color-night)_0,var(--color-night)_calc(100%-15vw),var(--color-warm-2)_calc(100%-15vw))] max-sm:bg-[linear-gradient(to_bottom,var(--color-night)_0,var(--color-night)_calc(100%-26vw),var(--color-warm-2)_calc(100%-26vw))]"
    >
      <div aria-hidden className="engineering-grid absolute inset-x-0 top-0 -z-10 h-[78%]" />
      <div aria-hidden className="absolute top-[30%] left-1/2 -z-10 h-[60%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_178_122/0.10),transparent)]" />

      <Container wide className="pt-10 sm:pt-20 lg:pt-20">
        <p className="label flex items-center gap-3" data-reveal>
          <span aria-hidden className="h-px w-8 bg-gold-300/70" />
          Software für Fahrzeugvermieter
        </p>

        <h1 id="hero-title" className="display mt-6 sm:mt-8 text-[clamp(2.05rem,9.3vw,6.6rem)] lg:mt-8" data-reveal>
          Fahrzeugvermietung.
          <br />
          <span className="text-white/42">Neu organisiert.</span>
        </h1>
        <div className="mt-7 grid gap-7 sm:mt-10 sm:gap-8 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16" data-reveal>
          <p className="lead max-w-xl">RentBase verbindet Buchungen, Fahrzeuge, Kunden, Verträge, Übergaben, Rückgaben und Abrechnung in einem System.</p>
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={TRIAL.href} variant="light" size="lg" arrow className="w-full sm:w-auto">{TRIAL.label}</Button>
              <Button href={PRODUCT_LINK.href} variant="outline-light" size="lg" className="w-full sm:w-auto">{PRODUCT_LINK.label}</Button>
            </div>
            <p className="mt-5 hidden font-mono text-[0.7rem] tracking-[0.12em] text-white/45 uppercase sm:block lg:text-right">Für professionelle Fahrzeugvermieter.</p>
          </div>
        </div>

        {/* Produktbühne: Desktop dominant, Tablet mit der Übergabe davor. Mobil: vergrößerter Ausschnitt des Dashboards. */}
        <div className="relative mt-10 sm:mt-16 lg:mt-16" data-reveal>
          <Parallax amount={28}>
            <div className="overflow-hidden rounded-[10px] shadow-product max-sm:-mr-5">
              <div className="max-sm:w-[175%]">
                <DashboardScreen />
              </div>
            </div>
          </Parallax>
          <div className="absolute bottom-[-7%] left-[2%] hidden w-[34%] sm:block lg:w-[29%]">
            <Parallax amount={64}>
              <div className="rounded-[1.6em] shadow-product">
                <TabletDamage />
              </div>
            </Parallax>
          </div>
        </div>
      </Container>
      <div className="h-16 sm:h-24 lg:h-32" />
    </section>
  );
}
