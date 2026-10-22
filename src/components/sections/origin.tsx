import Link from "next/link";
import { Code2, Headset, Landmark, ServerCog } from "lucide-react";
import { COMPANY } from "@/content/company";
import { Container } from "../ui/primitives";
import { GermanyMark } from "../ui/germany-mark";

// Herkunft, sauber getrennt nach Entwicklung, Unternehmenssitz, Hosting und Ansprechpartner (siehe ORIGIN in content/site.ts).
// Keine Zertifikate, keine Siegel, keine Aussage „DSGVO-konform“.
const FACTS = [
  { icon: Code2, label: "Entwicklung", value: "In Deutschland", detail: "RentBase wird in Berlin entwickelt und weiterentwickelt." },
  { icon: Landmark, label: "Unternehmenssitz", value: "Berlin", detail: `${COMPANY.name}, ${COMPANY.registerCourt.replace(" (Berlin)", "")} ${COMPANY.registerNumber}` },
  { icon: ServerCog, label: "Hosting", value: "Server in Deutschland", detail: "Website und Anwendung laufen bei der Hetzner Online GmbH in Deutschland." },
  { icon: Headset, label: "Ansprechpartner", value: "Auf Deutsch", detail: "Einrichtung und Fragen per E-Mail oder WhatsApp, direkt mit uns." },
];

/** Vertrauensbereich „Entwickelt in Deutschland“: ruhig, ohne Flagge und Siegel, mit belegbaren Einzelangaben. */
export function Origin() {
  return (
    <section aria-labelledby="origin-title" className="on-dark relative isolate overflow-hidden bg-night py-20 lg:py-28">
      {/* feine Linie in Schwarz, Rot, Gold als einziger Farbakzent */}
      <div aria-hidden className="absolute inset-x-0 top-0 flex h-[3px]">
        <span className="flex-1 bg-[#2a2e33]" />
        <span className="flex-1 bg-[#c8102e]/85" />
        <span className="flex-1 bg-[#e3b33b]/90" />
      </div>
      <div aria-hidden className="absolute top-[-30%] left-[-10%] -z-10 h-[90%] w-[60%] bg-[radial-gradient(closest-side,rgb(201_161_91/0.10),transparent)]" />
      <Container wide className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div data-reveal>
          <p className="label label-dark flex items-center gap-3">
            <GermanyMark tone="dark" />
            Software aus Deutschland
          </p>
          <h2 id="origin-title" className="display mt-5 text-[clamp(2.1rem,4vw,3.5rem)]">
            Entwickelt in Deutschland.
            <br />
            <span className="text-gold-gradient">Gemacht für Fahrzeugvermieter.</span>
          </h2>
          <p className="lead mt-6 max-w-lg">RentBase wird in Deutschland entwickelt und orientiert sich an den Anforderungen professioneller Fahrzeugvermietungen.</p>
          <p className="mt-6 text-sm text-white/45">
            Angaben zu Anbieter und Registereintrag im{" "}
            <Link href="/impressum" className="text-white/70 underline decoration-white/25 underline-offset-4 hover:decoration-gold-300">Impressum</Link>.
          </p>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-[14px] bg-white/[0.08] sm:grid-cols-2" data-reveal>
          {FACTS.map(({ icon: Icon, label, value, detail }) => (
            <div key={label} className="bg-night-2 p-7 sm:p-8">
              <Icon aria-hidden className="size-6 text-gold-300" strokeWidth={1.4} />
              <dt className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">{label}</dt>
              <dd className="mt-1.5">
                <span className="block text-[1.25rem] font-bold tracking-[-0.02em] text-white">{value}</span>
                <span className="mt-2 block text-sm leading-relaxed text-white/60">{detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
