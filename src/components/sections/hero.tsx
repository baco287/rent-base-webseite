import Image from "next/image";
import { CircleCheck, MonitorSmartphone, ServerCog } from "lucide-react";
import { NAV, PRODUCT_LINK, SITE, TRIAL } from "@/content/site";
import heroNacht from "../../../public/bilder/hero-nacht.webp";
import { Button } from "../ui/primitives";
import { Wordmark } from "../ui/logo";
import { WhatsAppLink } from "../ui/whatsapp";
import { Parallax } from "../ui/parallax";
import { Laptop3D } from "../mockups/laptop-3d";
import { PhoneDamage } from "../mockups/device-screens";

// Nur belegbare Vorteile: Zielgruppe, Web-App auf allen Geräten, Server bei Hetzner in Deutschland.
const PERKS = [
  { icon: CircleCheck, text: "Für professionelle Fahrzeugvermieter" },
  { icon: MonitorSmartphone, text: "Desktop, Tablet und Smartphone" },
  { icon: ServerCog, text: "Hosting in Deutschland" },
];

/**
 * Einstieg als dunkle Collage-Fläche nach dem Referenzbild: Nachtfoto mit warmem Licht (KI-Bild), Navigation im Feld
 * (ab 1280 px; darunter übernimmt die normale Kopfzeile), links Headline, rechts Laptop in Perspektive und Smartphone.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] w-full flex-col overflow-hidden bg-night xl:min-h-svh">
      <Image src={heroNacht} alt="" priority sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover object-right opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0d0f_0%,rgb(11_13_15/0.92)_34%,rgb(11_13_15/0.35)_70%,rgb(11_13_15/0.15)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night/80 to-transparent" />

      {/* Navigation im Feld (nur breite Bildschirme, wie im Referenzbild) */}
      <nav aria-label="Hauptnavigation" className="mx-auto hidden w-full max-w-[1680px] items-center justify-between gap-6 px-10 pt-7 xl:flex 2xl:px-16">
        <Wordmark height={24} priority tone="dark" />
        <ul className="flex items-center gap-7 text-[14px] font-medium text-white/75">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition-colors duration-200 hover:text-white">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button href={SITE.appLoginUrl} variant="ghost" className="text-white/75! hover:text-white!">Anmelden</Button>
          <WhatsAppLink variant="icon" className="text-white hover:bg-white/[0.06]" />
          <Button href={TRIAL.href} variant="outline-gold" arrow className="ml-1">{TRIAL.label}</Button>
        </div>
      </nav>

      <div className="@container mx-auto flex w-full max-w-[1680px] flex-1 items-center px-6 pt-12 pb-14 sm:px-10 sm:pt-16 xl:pt-10 xl:pb-12 2xl:px-16">
        <div className="grid w-full items-center gap-12 @4xl:grid-cols-[0.9fr_1.1fr] @4xl:gap-10">
          <div className="relative z-10 min-w-0">
            <p className="label label-dark" data-reveal>Software für Fahrzeugvermieter</p>
            <h1 id="hero-title" className="display mt-5 text-[clamp(2.1rem,4.4cqw,4.4rem)]" data-reveal>
              Fahrzeugvermietung.
              <br />
              <span className="text-gold-gradient">Neu organisiert.</span>
            </h1>
            <p className="lead mt-6 max-w-[28rem]" data-reveal>Buchungen, Fahrzeuge, Kunden, Verträge, Übergaben, Rückgaben und Abrechnung in einem System.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Button href={TRIAL.href} variant="gold" size="lg" arrow className="w-full sm:w-auto">{TRIAL.label}</Button>
              <Button href={PRODUCT_LINK.href} variant="outline-light" size="lg" className="w-full sm:w-auto">{PRODUCT_LINK.label}</Button>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5" data-reveal>
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[13px] leading-snug text-white/75">
                  <Icon aria-hidden className="size-6 shrink-0 text-gold-300" strokeWidth={1.4} />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Produktbühne: Laptop in Perspektive, Smartphone davor */}
          <div className="relative min-w-0 pb-[12%] @4xl:pr-[2%]" data-reveal>
            <Parallax amount={16}>
              <Laptop3D className="drop-shadow-[0_30px_50px_rgb(0_0_0/0.6)]" />
            </Parallax>
            <div className="absolute right-[3%] bottom-0 w-[27%] @4xl:right-[8%]">
              <Parallax amount={40}>
                <div className="rotate-[-3deg] rounded-[2em] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.85)]">
                  <PhoneDamage />
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
